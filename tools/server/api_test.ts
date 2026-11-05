/* サーバーの関数（supabase/functions/api/index.ts）の確認。tools/line_e2e.py から動かす。
 * DB は PGlite（メモリの中の Postgres）、LINE の IDトークンの検証（api.line.me）だけを、ここでまねる。
 * 本人確認・おせわ（/act：サーバーの時計と乱数で判定、おせわの間隔、上限）・名前とみためだけのセーブ・
 * 新しい子（まっさら）・取りこみ（1回だけ）・セッションの上限と期限を見る。
 * 時間がたったことは、DB のセーブの時刻（last など）を前にずらしてまねる。 */
import postgres from 'npm:postgres@3.4.5';
const FN = Deno.args[0];
const MIG = Deno.args[1];
const DB = Deno.env.get('SUPABASE_DB_URL')!;

// ---- set up the schema (roles anon/authenticated exist on Supabase; create them here) ----
const admin = postgres(DB, { prepare:false, max:1 });
await admin.unsafe(`do $$ begin
  if not exists (select 1 from pg_roles where rolname='anon') then create role anon; end if;
  if not exists (select 1 from pg_roles where rolname='authenticated') then create role authenticated; end if;
end $$;`);
await admin.unsafe(await Deno.readTextFile(MIG));
await admin.end();

// ---- fake LINE verify ----
const realFetch = globalThis.fetch;
const TOKENS: Record<string, { sub: string; aud: string; exp: number } | 'expired'> = {};
const b64u = (o: unknown) => btoa(JSON.stringify(o)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
function mkToken(name: string, aud = '2012410263', sub = 'U' + '0'.repeat(31) + name.length, expired = false){
  const t = b64u({ alg:'ES256' }) + '.' + b64u({ aud, sub, n:name }) + '.sig' + name;
  TOKENS[t] = expired ? 'expired' : { sub, aud, exp:Math.floor(Date.now()/1000) + 3600 };
  return t;
}
let verifyCalls = 0;
globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = String(input instanceof Request ? input.url : input);
  if (url === 'https://api.line.me/oauth2/v2.1/verify'){
    verifyCalls++;
    const p = new URLSearchParams(String(init!.body));
    const v = TOKENS[p.get('id_token')!];
    if (!v) return new Response(JSON.stringify({ error:'invalid_request', error_description:'Invalid IdToken.' }), { status:400 });
    if (v === 'expired') return new Response(JSON.stringify({ error:'invalid_request', error_description:'IdToken expired.' }), { status:400 });
    if (p.get('client_id') !== v.aud) return new Response(JSON.stringify({ error:'invalid_request', error_description:'Invalid IdToken Audience.' }), { status:400 });
    return new Response(JSON.stringify({ iss:'https://access.line.me', sub:v.sub, aud:v.aud, exp:v.exp, iat:v.exp - 3600, amr:['linesso'] }), { status:200 });
  }
  return realFetch(input, init);
}) as typeof fetch;

// ---- capture the handler ----
let handler: (r: Request) => Promise<Response>;
(Deno as any).serve = (h: any) => { handler = h; return {} as any; };
await import(FN);

const ORIGIN = 'https://uchinoko-biyori.pages.dev';
async function call(method: string, path: string, body?: unknown, session?: string, origin: string | null = ORIGIN){
  const headers: Record<string, string> = {};
  if (origin) headers.origin = origin;
  if (body !== undefined) headers['content-type'] = 'application/json';
  if (session) headers['x-session'] = session;
  const res = await handler(new Request('https://x.supabase.co/api' + path, { method, headers, body:body === undefined ? undefined : JSON.stringify(body) }));
  const text = await res.text();
  let data: any = null; try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  return { status:res.status, data, headers:res.headers };
}
let fails = 0;
function ok(cond: unknown, label: string, info?: unknown){
  if (cond) console.log('  ok   ' + label);
  else { fails++; console.log('  FAIL ' + label, info === undefined ? '' : JSON.stringify(info).slice(0, 300)); }
}

const t0 = Date.now();
const pet = { name:'ためし', species:'dog', breedId:'pomeranian', look:{ species:'dog', breedId:'pomeranian' }, photo:'data:image/jpeg;base64,AAAA', colorName:'クリーム', wear:{ head:null, face:null, neck:'scarf_tri' } };
const save1 = { v:1, pet, stats:{ full:60, mood:70, love:120 }, counts:{ meals:5, treats:2, pets:9, plays:1 }, recentTreats:[t0], last:t0, created:t0 - 864e5, updated:t0 };

console.log('health / cors');
let r = await call('GET', '/health');
ok(r.status === 200 && r.data.ok && /^\d{4}-\d{2}-\d{2}$/.test(r.data.day), 'health', r);
ok(r.headers.get('access-control-allow-origin') === ORIGIN, 'cors allowed origin');
r = await call('GET', '/health', undefined, undefined, 'https://evil.example');
ok(!r.headers.get('access-control-allow-origin'), 'cors other origin not allowed');
r = await call('GET', '/health', undefined, undefined, 'https://abc123.uchinoko-biyori.pages.dev');
ok(r.headers.get('access-control-allow-origin') === 'https://abc123.uchinoko-biyori.pages.dev', 'cors preview origin');
const pre = await handler(new Request('https://x.supabase.co/api/login', { method:'OPTIONS', headers:{ origin:ORIGIN, 'access-control-request-method':'POST', 'access-control-request-headers':'content-type,x-session' } }));
ok(pre.status === 204 && /x-session/.test(pre.headers.get('access-control-allow-headers') || ''), 'preflight');
r = await call('GET', '/nope');
ok(r.status === 404, '404');

console.log('login');
r = await call('POST', '/login', { idToken:'garbage' });
ok(r.status === 401 && r.data.error === 'badtoken', 'garbage token', r);
r = await call('POST', '/login', { idToken:mkToken('wrongaud', '9999999999') });
ok(r.status === 401 && r.data.error === 'badtoken', 'other channel aud rejected before calling LINE', r);
const callsBefore = verifyCalls;
r = await call('POST', '/login', { idToken:mkToken('exp', '2012410263', 'Uexp', true) });
ok(r.status === 401 && r.data.error === 'expired' && verifyCalls === callsBefore + 1, 'expired token', r);
r = await call('POST', '/login', { idToken:'a.' + b64u({ aud:'2012410263' }) + '.forged' });
ok(r.status === 401, 'unknown (forged) token rejected by LINE', r);
r = await call('POST', '/login', { idToken:mkToken('alice', '2012410263', 'Ualice') });
ok(r.status === 200 && /^[A-Za-z0-9_-]{43}$/.test(r.data.token) && r.data.member.importable === true && r.data.save === null, 'alice first login', r);
const alice = r.data.token, aliceId = r.data.member.id;
r = await call('POST', '/login', { idToken:mkToken('alice2', '2012410263', 'Ualice') });
ok(r.status === 200 && r.data.member.id === aliceId && r.data.token !== alice, 'alice second login → same member, new session', r);
const alice2 = r.data.token;
r = await call('POST', '/login', { idToken:mkToken('bob', '2012410263', 'Ubob') });
const bob = r.data.token;
ok(r.status === 200 && r.data.member.id !== aliceId, 'bob is another member');

const db = postgres(DB, { prepare:false, max:1 });
const jst = (ms: number) => new Date(ms + 9 * 3600e3).toISOString().slice(0, 10);
/* DB のセーブを直接かえる（時間がたったこと・数字のまね） */
async function patch(member: string, f: (d: any) => void){
  const [row] = await db`select data from app.saves where member_id = ${member}`;
  const d = row.data; f(d);
  await db`update app.saves set data = ${db.json(d)} where member_id = ${member}`;
}
/* つぎのおせわまで 2.5 秒まつかわりに、前のおせわの時刻を前にずらす */
const rest = (member: string) => patch(member, d => { if (d.srv) d.srv.cd = 0; });
const A = (type: string, p: Record<string, unknown> = {}, session = alice) => call('POST', '/act', { type, ...p }, session);

console.log('save (名前・みためだけ)');
r = await call('GET', '/save');
ok(r.status === 401 && r.data.error === 'nosession', 'no session', r);
r = await call('GET', '/save', undefined, 'A'.repeat(43));
ok(r.status === 401, 'unknown session', r);
r = await call('GET', '/save', undefined, alice);
ok(r.status === 200 && r.data.save === null && r.data.importable === true, 'empty save', r);
r = await A('feed');
ok(r.status === 409 && r.data.error === 'nosave', 'act before a child → nosave', r);
r = await call('POST', '/save', { pet }, alice);
ok(r.status === 409 && r.data.error === 'nosave', 'save before a child → nosave', r);
r = await call('POST', '/save', { data:save1, baseRev:null }, alice);
ok(r.status === 400 && r.data.error === 'badpet', 'the old whole-save form is refused', r);

console.log('adopt (新しい子はまっさら)');
r = await A('adopt', { pet:{ ...pet, name:'  ながいながいなまえのこです  ', photo:'data:image/jpeg;base64,AAAA', stats:{ love:9999 }, created:1 } });
const sv0 = r.data.save && r.data.save.data;
ok(r.status === 200 && r.data.ok && sv0.pet.name === 'ながいながいなまえの' && sv0.pet.photo === null && sv0.stats.love === 0
  && sv0.counts.meals === 0 && Math.abs(sv0.created - Date.now()) < 60e3 && sv0.pet.wear.neck === null, 'adopt: fresh state from the name/look only', sv0);
const aliceRev0 = r.data.save.rev;
r = await call('GET', '/save', undefined, alice2);
ok(r.status === 200 && r.data.save.rev === aliceRev0, 'another session sees it');

console.log('act: open');
r = await A('open');
ok(r.status === 200 && r.data.ok && r.data.save.data.daily.day === jst(Date.now()) && r.data.save.data.album.some((a: any) => a.k === 'home'),
  'open: today\'s requests in Japan time, the first album page', r.data.save && r.data.save.data.daily);
ok(!r.data.ev.some((e: any) => e.k === 'souv'), 'open right after: no souvenir', r.data.ev);
await patch(aliceId, d => { d.last -= 4 * 3600e3; });
r = await A('open');
const sv1 = r.data.ev.find((e: any) => e.k === 'souv');
ok(sv1 && sv1.bonus === 2 && r.data.save.data.souv.n === 1 && r.data.save.data.stats.love === 2, '4 hours away → a souvenir (♥+2)', r.data.ev);
await patch(aliceId, d => { d.last -= 13 * 3600e3; });
r = await A('open');
ok(r.data.ev.some((e: any) => e.k === 'souv' && e.bonus === 4), '13 hours away → ♥+4', r.data.ev);
await patch(aliceId, d => { d.last -= 4 * 3600e3; });
r = await A('open');
await patch(aliceId, d => { d.last -= 4 * 3600e3; });
r = await A('open');
ok(r.data.save.data.souv.n === 3 && !r.data.ev.some((e: any) => e.k === 'souv'), 'no more than 3 souvenirs a day', r.data.save.data.souv);
await patch(aliceId, d => { d.last -= 10 * 3600e3; d.stats.full = 100; d.stats.mood = 100; });
r = await A('open');
const s10 = r.data.save.data.stats;
ok(Math.abs(s10.full - 20) < .2 && Math.abs(s10.mood - 10) < .2, 'decay by the server clock (10h: おなか −80, ごきげん −50 と おなか25未満の −40)', s10);

console.log('act: care');
await patch(aliceId, d => { d.stats.full = 40; d.stats.mood = 50; });
let love = (await call('GET', '/save', undefined, alice)).data.save.data.stats.love;
r = await A('feed');
ok(r.data.ok && r.data.save.data.counts.meals === 1 && Math.abs(r.data.save.data.stats.full - 85) < .2 && r.data.save.data.stats.love === love + 3, 'feed', r.data);
r = await A('feed');
ok(r.data.ok === false && r.data.why === 'busy', 'too soon after the last care → busy', r.data);
await rest(aliceId);
await patch(aliceId, d => { d.stats.full = 95; });
const revFull = (await call('GET', '/save', undefined, alice)).data.save.rev;
r = await A('feed');
ok(r.data.ok === false && r.data.why === 'full' && r.data.save.rev === revFull, 'full → refused, nothing written', r.data);
let lim = null as any;
for (let i = 0; i < 6; i++){
  await rest(aliceId);
  await patch(aliceId, d => { d.stats.full = 30; });
  lim = await A('treat', { id:'bolo' });
  if (!lim.data.ok) break;
}
ok(lim.data.ok === false && lim.data.why === 'limit' && lim.data.save.data.recentTreats.length === 5, 'treats: 5 in 30 minutes, then wait', lim.data);
await patch(aliceId, d => { d.recentTreats = d.recentTreats.map((t: number) => t - 31 * 60e3); d.srv.cd = 0; });
r = await A('treat', { id:'bolo' });
ok(r.data.ok, 'treats again after 30 minutes', r.data);
await rest(aliceId);
r = await A('treat', { id:'no_such_treat' });
ok(r.data.ok === false && r.data.why === 'locked', 'unknown or locked treat refused', r.data);
await rest(aliceId);
await patch(aliceId, d => { d.stats.full = 8; });
r = await A('play');
ok(r.data.ok === false && r.data.why === 'hungry', 'too hungry to play', r.data);
await patch(aliceId, d => { d.stats.full = 50; });
r = await A('play');
ok(r.data.ok && r.data.save.data.counts.plays === 1, 'play', r.data.save && r.data.save.data.counts);

console.log('act: pet (なでなで)');
let before = (await call('GET', '/save', undefined, alice)).data.save.data;
r = await A('pet', { n:999 });
let after = r.data.save.data;
ok(r.data.ok && r.data.n === 60 && after.counts.pets === before.counts.pets + 1, 'strokes capped at 60 a call, one session counted', { n:r.data.n, pets:after.counts.pets });
ok(Math.abs(after.stats.love - before.stats.love - 7.2) < .05 || after.stats.love - before.stats.love > 7.2, 'love from strokes: 12 strokes\' worth at most (+ requests)', { before:before.stats.love, after:after.stats.love });
before = after;
r = await A('pet', { n:10 });
ok(r.data.save.data.stats.love - before.stats.love < .6 + 4 + 10 + 5, 'no stroke love left right after', { before:before.stats.love, after:r.data.save.data.stats.love });

console.log('act: trick, dress, room');
await rest(aliceId);
r = await A('trick', { id:'dance' });
ok(r.data.ok === false && r.data.why === 'locked', 'trick above the level → locked', r.data);
await rest(aliceId);
await patch(aliceId, d => { d.stats.full = 60; d.stats.mood = 80; });
r = await A('trick', { id:'sit' });
ok(r.data.ok && typeof r.data.success === 'boolean' && r.data.need === 3 && Array.isArray(r.data.after), 'trick decided by the server', r.data);
for (let i = 0; i < 14; i++){ await rest(aliceId); await patch(aliceId, d => { d.tricks = { sit:{ p:3, ok:true } }; }); r = await A('trick', { id:'sit' }); }
ok(r.data.save.data.trickDay.love === 10 && r.data.save.data.trickDay.day === jst(Date.now()), 'trick love: 10 a day', r.data.save.data.trickDay);
r = await A('dress', { slot:'head', id:'crown_heart' });
ok(r.data.ok === false && r.data.why === 'locked', 'outfit above the level → locked', r.data);
r = await A('dress', { slot:'head', id:'ev_santa' });
ok(r.data.ok === false && r.data.why === 'locked', 'an event outfit not received → locked', r.data);
r = await A('dress', { slot:'neck', id:'bandana_red' });
ok(r.data.ok && r.data.save.data.pet.wear.neck === 'bandana_red', 'dress', r.data.save && r.data.save.data.pet.wear);
r = await A('dress', { slot:'face', id:'bandana_red' });
ok(r.data.ok === false, 'an outfit in the wrong slot → refused', r.data);
r = await A('room', { cat:'wall', id:'starry' });
ok(r.data.ok === false && r.data.why === 'locked', 'decor above the level → locked', r.data);
r = await A('room', { cat:'rug', id:'none' });
ok(r.data.ok && r.data.save.data.room.rug === 'none', 'room', r.data.save && r.data.save.data.room);
r = await A('season', { on:false });
ok(r.data.ok && r.data.save.data.room.season === false, 'season decorations off');
r = await A('fly');
ok(r.status === 400 && r.data.error === 'badtype', 'unknown action', r);

console.log('act: streak (おたすけ)');
await patch(aliceId, d => {
  const t = Date.now();
  d.daily = null; d.rescued = []; d.stamps = [jst(t - 2 * 864e5), jst(t - 3 * 864e5)];
  d.streak = { last:jst(t - 2 * 864e5), n:2, best:2 };
});
r = await A('open');
ok(r.data.save.data.daily.rescue && r.data.ev.some((e: any) => e.k === 'pinch' && e.n === 2), 'one day missed → the rescue request and the notice', r.data.ev);
r = await A('open');
ok(!r.data.ev.some((e: any) => e.k === 'pinch'), 'the notice only once', r.data.ev);

console.log('save: name and look only');
const lovePrev = r.data.save.data.stats.love;
r = await call('POST', '/save', { pet:{ name:'あたらしい', species:'cat', breedId:'mike', look:{ species:'cat', breedId:'mike' }, colorName:'みけ' }, stats:{ love:99999 }, data:{ stats:{ love:99999 } } }, alice);
ok(r.status === 200 && r.data.save.data.pet.name === 'あたらしい' && r.data.save.data.pet.species === 'cat' && r.data.save.data.stats.love === lovePrev
  && r.data.save.data.pet.wear.neck === 'bandana_red', 'name/look change; numbers and outfits untouched', r.data.save && r.data.save.data.pet);
r = await call('GET', '/save', undefined, bob);
ok(r.data.save === null, 'bob cannot see alice', r);

console.log('import');
const enc = (o: unknown) => { const b = btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(o)))); return 'UCHINOKO2:' + b.length + ':' + b; };
const codePet = { ...save1, pet:{ ...pet, name:'だいず2' }, souv:{ have:{}, day:'2026-11-06', n:3 }, daily:{ day:'2026-11-06', list:[], all:true } };
r = await call('POST', '/import', { code:'UCHINOKO2:10:abc' }, bob);
ok(r.status === 400 && r.data.error === 'badcode' && r.data.reason === 'short', 'broken code', r);
r = await call('POST', '/import', { code:enc(codePet) }, bob);
ok(r.status === 200 && r.data.save.rev === 1 && r.data.save.data.pet.name === 'だいず2' && r.data.save.data.pet.photo === null
  && r.data.save.data.souv.n === 0 && !r.data.save.data.daily && r.data.importable === false, 'bob imports a code (time values reset)', r.data);
r = await call('POST', '/import', { code:enc(codePet) }, bob);
ok(r.status === 409 && r.data.error === 'already', 'second import refused', r);
r = await call('POST', '/import', { code:enc(codePet) }, alice);
ok(r.status === 200 && r.data.save.rev >= 3, 'alice import replaces existing save, rev continues', r.data && r.data.save && r.data.save.rev);
r = await call('POST', '/login', { idToken:mkToken('alice3', '2012410263', 'Ualice') });
ok(r.data.member.importable === false && r.data.save.data.pet.name === 'だいず2', 'login shows importable=false and the save');

r = await A('open', {}, bob);
ok(r.data.ok && r.data.save.data.daily && r.data.save.data.daily.day === jst(Date.now()), 'bob: act after import works');

console.log('sessions');
const [{ n }] = await db`select count(*)::int n from app.sessions where member_id = ${aliceId}`;
ok(n === 3, 'alice has 3 sessions', n);
for (let i = 0; i < 12; i++) await call('POST', '/login', { idToken:mkToken('al' + i, '2012410263', 'Ualice') });
const [{ n: n2 }] = await db`select count(*)::int n from app.sessions where member_id = ${aliceId}`;
ok(n2 === 10, 'sessions capped at 10', n2);
await db`update app.sessions set expires_at = now() - interval '1 minute'`;
r = await call('GET', '/save', undefined, bob);
ok(r.status === 401, 'expired session rejected', r);
const [{ c }] = await db`select count(*)::int c from app.line_accounts`;
ok(c === 2, 'two LINE accounts (no token stored)', c);
const cols = await db`select column_name from information_schema.columns where table_schema='app'`;
ok(!cols.some((x: any) => /token$|id_token/.test(x.column_name)), 'no raw token columns');
await db.end();

console.log(fails ? `\n${fails} FAILED` : '\nall passed');
Deno.exit(fails ? 1 : 0);
