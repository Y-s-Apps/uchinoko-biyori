/* サーバーの関数（supabase/functions/api/index.ts）の確認。tools/line_e2e.py から動かす。
 * DB は PGlite（メモリの中の Postgres）、LINE の IDトークンの検証（api.line.me）だけを、ここでまねる。
 * 本人確認・おせわ（/act：サーバーの時計と乱数で判定、おせわの間隔、上限）・名前とみためだけのセーブ・
 * 新しい子（まっさら）・取りこみ（1回だけ）・セッションの上限と期限を見る。
 * AIの読みとり（/read）は、Anthropic の Messages API をまねて、写真の確かめ・1人1日と全員の上限・返事の確かめを見る。
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
for (const f of MIG.split(',')) await admin.unsafe(await Deno.readTextFile(f));
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
// ---- fake Anthropic Messages API（AIの読みとり） ----
Deno.env.set('ANTHROPIC_API_KEY', 'test-key');
Deno.env.set('AI_ALL_PER_DAY', '5');
const AI = { mode:'ok', calls:0, last:null as any, headers:null as any };
const AI_OK = { species:'dog', candidates:[{ id:'pomeranian', confidence:0.82 }, { id:'nope', confidence:0.5 }, { id:'shiba', confidence:0.1 }],
  colorName:'クリーム', comment:'ふわふわの クリームいろ',
  look:{ ear:'small', coat:'fluffy', muzzle:'short', tail:'plume', legs:'normal', face:'lower',
    colors:{ main:'#F3DDB3', body:'#F3DDB3', face:'#FBF3E6', chest:'#FBF3E6', paws:'#FBF3E6', eye:'#2B1E1A', nose:'#2E2328', tailTip:null },
    marks:{ stripes:null } } };
const AI_EVIL = { species:'dog', candidates:[{ id:'<img src=x onerror=alert(1)>', confidence:9 }, { id:'kuro', confidence:1 }],
  colorName:'<script>alert(1)</script>ながいながいいろのなまえ', comment:'x'.repeat(300), look:{ ear:'</svg>', colors:{ main:'url(javascript:1)' } } };
function aiReply(){
  const msg = (text: string, stop = 'end_turn') => new Response(JSON.stringify({ id:'msg_x', type:'message', role:'assistant', model:'claude-haiku-5-5',
    content:text ? [{ type:'text', text }] : [], stop_reason:stop, usage:{ input_tokens:2000, output_tokens:300 } }), { status:200 });
  switch (AI.mode){
    case 'ok': return msg('```json\n' + JSON.stringify(AI_OK) + '\n```');
    case 'evil': return msg('はい：' + JSON.stringify(AI_EVIL));
    case 'other': return msg('{"species":"other"}');
    case 'garbage': return msg('ごめんなさい、わかりません');
    case 'refusal': return msg('', 'refusal');
    case 'http529': return new Response(JSON.stringify({ type:'error', error:{ type:'overloaded_error', message:'Overloaded' } }), { status:529 });
  }
  throw new Error('network');
}
globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = String(input instanceof Request ? input.url : input);
  if (url === 'https://api.anthropic.com/v1/messages'){
    AI.calls++;
    AI.last = JSON.parse(String(init!.body));
    AI.headers = new Headers(init!.headers);
    return aiReply();
  }
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

console.log('AIの読みとり（/read）');
const jpeg = '/9j/4AAQSkZJRgABAQAAAQABAAD' + 'A'.repeat(1200) + '/9k=';
const IMG = 'data:image/jpeg;base64,' + jpeg.slice(0, jpeg.length - jpeg.length % 4);
const read = (session = alice, image: unknown = IMG) => call('POST', '/read', { image }, session);
const aiLeft = async (session = alice) => (await call('GET', '/ai', undefined, session)).data.ai;
r = await call('GET', '/ai');
ok(r.status === 401, '/ai needs a session', r);
await db`alter table app.ai_usage rename to ai_usage_away`;   /* 回数の表がまだないとき（マイグレーション前） */
r = await call('GET', '/ai', undefined, alice);
ok(r.status === 200 && r.data.ai.on === false, 'no usage table: AI is off (nothing breaks)', r.data);
r = await read();
ok(r.status === 200 && r.data.ok === false && r.data.why === 'off' && AI.calls === 0, 'no usage table: /read is off, AI not called', r.data);
await db`alter table app.ai_usage_away rename to ai_usage`;
r = await call('GET', '/ai', undefined, alice);
ok(r.status === 200 && r.data.ai.on === true && r.data.ai.left === 3 && r.data.ai.perDay === 3, '/ai: on, 3 left', r.data);
r = await read(alice, 'data:image/png;base64,iVBORw0KGgo' + 'A'.repeat(800));
ok(r.status === 400 && r.data.error === 'badimage', 'png rejected', r);
r = await read(alice, 'data:image/jpeg;base64,' + btoa('GIF89a') + 'A'.repeat(800));
ok(r.status === 400 && r.data.error === 'badimage', 'not a jpeg (magic bytes)', r);
r = await read(alice, IMG + '"><script>');
ok(r.status === 400, 'odd characters rejected', r);
r = await read(alice, 'data:image/jpeg;base64,/9j/' + 'A'.repeat(420_000));
ok(r.status === 413, 'too large', r);
ok(AI.calls === 0 && (await aiLeft()).left === 3, 'bad images do not reach the AI and are not counted');
AI.mode = 'http529';
r = await read();
ok(r.status === 200 && r.data.ok === false && r.data.why === 'unavailable' && r.data.ai.left === 3 && AI.calls === 1, 'AI error: refunded', r.data);
AI.mode = 'network';
r = await read();
ok(r.data.ok === false && r.data.why === 'unavailable' && r.data.ai.left === 3, 'AI unreachable: refunded', r.data);
await db`insert into app.ai_usage (day, member_id, n) values (${jst(Date.now() - 10 * 864e5)}::date, ${aliceId}, 2)`;
AI.mode = 'ok';
r = await read();
const res = r.data.result;
ok(r.data.ok === true && res.species === 'dog' && res.candidates.map((c: any) => c.id).join() === 'pomeranian,shiba' && res.colorName === 'クリーム'
  && res.look.colors.main.toLowerCase() === '#f3ddb3' && res.look.ear === 'small' && r.data.ai.left === 2, 'reads a pomeranian (known ids only)', r.data);
const L = AI.last;
ok(L.model === 'claude-haiku-5-5' && L.thinking && L.thinking.type === 'disabled' && L.max_tokens <= 2000
  && L.messages[0].content[0].type === 'image' && L.messages[0].content[0].source.media_type === 'image/jpeg' && L.messages[0].content[0].source.data === IMG.split(',')[1]
  && /pomeranian\(ポメラニアン\)/.test(L.messages[0].content[1].text), 'request: model, no thinking, the jpeg, the breed list', { model:L.model, thinking:L.thinking });
ok(AI.headers.get('x-api-key') === 'test-key' && AI.headers.get('anthropic-version') === '2023-06-01', 'request headers (key only on the server)');
const [{ old }] = await db`select count(*)::int old from app.ai_usage where day < ${jst(Date.now() - 7 * 864e5)}::date`;
ok(old === 0, 'old days are removed', old);
AI.mode = 'evil';
r = await read();
const ev = r.data.result;
ok(r.data.ok && ev.candidates.length === 1 && ev.candidates[0].id === 'mix_dog', 'unknown and other-species ids dropped (mix_dog)', ev && ev.candidates);
ok(r.data.ok && ev.colorName.length <= 14 && ev.comment.length <= 60 && ev.look.ear !== '</svg>' && /^#[0-9a-f]{6}$/i.test(ev.look.colors.main) && r.data.ai.left === 1, 'odd text is cut and colours are hex', ev);
AI.mode = 'refusal';
r = await read();
ok(r.data.ok === false && r.data.why === 'refused' && r.data.ai.left === 0, 'refusal (counted)', r.data);
const callsNow = AI.calls;
AI.mode = 'ok';
r = await read();
ok(r.data.ok === false && r.data.why === 'limit' && AI.calls === callsNow, '4th read today: limit, AI not called', r.data);
AI.mode = 'other';
r = await read(bob);
ok(r.data.ok === true && r.data.result.species === 'other', 'not a dog or cat', r.data);
AI.mode = 'garbage';
r = await read(bob);
ok(r.data.ok === false && r.data.why === 'unreadable' && r.data.ai.left === 1, 'unreadable reply (counted)', r.data);
AI.mode = 'ok';
r = await read(bob);
ok(r.data.ok === false && r.data.why === 'busy' && AI.calls === callsNow + 2, 'everyone together: 5 a day (busy)', r.data);
r = await call('POST', '/login', { idToken:mkToken('bob2', '2012410263', 'Ubob') });
ok(r.data.ai && r.data.ai.on === true && r.data.ai.left === 1 && r.data.ai.perDay === 3, 'login tells the AI status', r.data.ai);
const aiCols = (await db`select column_name from information_schema.columns where table_schema='app' and table_name='ai_usage' order by column_name`).map((x: any) => x.column_name);
ok(aiCols.join() === 'day,member_id,n', 'ai_usage keeps only day, member and count (no photo)', aiCols);
const [{ ph }] = await db`select count(*)::int ph from app.saves where data::text like '%/9j/%'`;
ok(ph === 0, 'no photo in any save', ph);

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
