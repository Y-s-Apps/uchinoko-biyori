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
// ---- fake LINE token / deauthorize（やめる人） ----
// 内部チャネル：開発用 2012410263（LINE_CHANNEL_SECRET）・審査用 2012410264（シークレットなし）・本番用 2012410265（LINE_CHANNEL_SECRET_2012410265）
Deno.env.set('LINE_CHANNEL_SECRET', 'test-secret');
Deno.env.set('LINE_CHANNEL_SECRET_2012410265', 'prod-secret');
const SECRETS: Record<string, string[]> = { '2012410263':['test-secret', 'dev-secret-new'], '2012410265':['prod-secret'] };
/* アクセストークン → どの内部チャネルのものか（GET /oauth2/v2.1/verify?access_token= の client_id） */
const ACCESS: Record<string, string> = { 'carol-access-token':'2012410263', 'frank-access-token':'2012410263', 'gina-access-token':'2012410263',
  'nora-access-token':'2012410263', 'lena-review-token':'2012410264', 'mia-prod-token':'2012410265', 'otto-other-token':'1111111111' };
const LINE = { tokenCalls:0, deauthCalls:0, atVerifyCalls:0, auth:'', last:null as any, client:'', secret:'', mode:'ok' };
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
// ---- fake Supabase Storage（うちのこカードの画像） ----
Deno.env.set('SUPABASE_URL', 'https://store.test');
Deno.env.set('SUPABASE_SECRET_KEYS', JSON.stringify({ default:'sb_secret_test' }));
const STORE = { mode:'ok', objects:new Map<string, Uint8Array>(), puts:0, dels:0, headers:null as any, cache:'' };
globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = String(input instanceof Request ? input.url : input);
  if (url.startsWith('https://store.test/storage/v1/object/cards')){
    if (STORE.mode === 'down') throw new Error('network');
    STORE.headers = new Headers(init!.headers);
    if (STORE.mode === 'error') return new Response(JSON.stringify({ error:'internal' }), { status:500 });
    if (init?.method === 'POST'){
      STORE.puts++;
      const name = url.slice('https://store.test/storage/v1/object/cards/'.length);
      if (STORE.objects.has(name)) return new Response(JSON.stringify({ error:'Duplicate' }), { status:409 });
      STORE.objects.set(name, new Uint8Array(init!.body as Uint8Array));
      STORE.cache = STORE.headers.get('cache-control') || '';
      return new Response(JSON.stringify({ Key:'cards/' + name }), { status:200 });
    }
    if (init?.method === 'DELETE'){
      STORE.dels++;
      const gone = (JSON.parse(String(init!.body)).prefixes as string[]).filter(n => STORE.objects.delete(n));
      return new Response(JSON.stringify(gone.map(n => ({ name:n }))), { status:200 });
    }
    return new Response('{}', { status:405 });
  }
  if (url === 'https://api.anthropic.com/v1/messages'){
    AI.calls++;
    AI.last = JSON.parse(String(init!.body));
    AI.headers = new Headers(init!.headers);
    return aiReply();
  }
  if (url === 'https://api.line.me/oauth2/v3/token'){
    /* ステートレスチャネルアクセストークン（やめる人の許可の取り消しに使う） */
    LINE.tokenCalls++;
    const p = new URLSearchParams(String(init!.body));
    LINE.client = p.get('client_id') || ''; LINE.secret = p.get('client_secret') || '';
    if (p.get('grant_type') !== 'client_credentials' || !(SECRETS[LINE.client] || []).includes(LINE.secret)){
      return new Response(JSON.stringify({ error:'invalid_client' }), { status:400 });
    }
    return new Response(JSON.stringify({ token_type:'Bearer', access_token:'chan-token-' + LINE.client, expires_in:900 }), { status:200 });
  }
  if (url.startsWith('https://api.line.me/oauth2/v2.1/verify?access_token=')){
    /* アクセストークンの確かめ（やめる人：どの内部チャネルのトークンかを知る） */
    LINE.atVerifyCalls++;
    if (LINE.mode === 'down') throw new Error('network');
    if ((init?.method || 'GET') !== 'GET') return new Response(JSON.stringify({ error:'invalid_request' }), { status:405 });
    const ch = ACCESS[new URL(url).searchParams.get('access_token') || ''];
    if (!ch) return new Response(JSON.stringify({ error:'invalid_request', error_description:'access token expired' }), { status:400 });
    return new Response(JSON.stringify({ scope:'openid profile', client_id:ch, expires_in:3600 }), { status:200 });
  }
  if (url === 'https://api.line.me/user/v1/deauthorize'){
    LINE.deauthCalls++;
    LINE.auth = new Headers(init!.headers).get('authorization') || '';
    LINE.last = JSON.parse(String(init!.body));
    if (LINE.mode === 'down') throw new Error('network');
    if (LINE.last.userAccessToken === 'already-gone-token') return new Response(JSON.stringify({ message:'invalid token' }), { status:400 });
    return new Response(null, { status:204 });
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
r = await call('POST', '/login', { idToken:mkToken('pat-dev', '2012410263', 'Upat') });
const patId = r.data.member.id;
r = await call('POST', '/login', { idToken:mkToken('pat-review', '2012410264', 'Upat') });
ok(r.status === 200 && r.data.member.id === patId, '審査用の内部チャネル（2012410264）も通る → 同じ会員（sub はプロバイダーごと）', r);
r = await call('POST', '/login', { idToken:mkToken('pat-prod', '2012410265', 'Upat') });
ok(r.status === 200 && r.data.member.id === patId, '本番用の内部チャネル（2012410265）も通る → 同じ会員', r);
r = await call('POST', '/login', { idToken:mkToken('wrongaud2', '2012410266') });
ok(r.status === 401 && r.data.error === 'badtoken', 'となりの番号のチャネルは通らない', r);

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

console.log('names (1-4：絵文字の まんなかで 切らない・制御文字と かたわれの絵文字を とる。jsonb が ことわるため)');
const emo = (await call('POST', '/login', { idToken:mkToken('emo', '2012410263', 'Uemo') })).data;
const emoId = emo.member.id as string;
const backup = async (id: string) => (await db`select data->'pet'->>'name' as name, reason, rev::int as rev from app.save_backups where member_id = ${id}`)[0] || null;
r = await call('POST', '/act', { type:'adopt', pet:{ ...pet, name:'あいうえおかきくけ😀', colorName:'くり\u0000ーむ' } }, emo.token);
ok(r.status === 200 && r.data.save.data.pet.name === 'あいうえおかきくけ😀' && r.data.save.data.pet.colorName === 'くりーむ', 'adopt: an emoji at the 10th letter stays whole, \\u0000 removed', r.data);
ok(await backup(emoId) === null, 'the first child: no backup (nothing was overwritten)');
r = await call('POST', '/save', { pet:{ ...pet, name:'a\u0000b\ud83dcdefghijkl😀' } }, emo.token);
ok(r.status === 200 && r.data.save.data.pet.name === 'abcdefghij', '/save: control chars and a half emoji removed, cut by letters', r.data);
ok(await backup(emoId) === null, '/save (name and look) is not a backup');
const codeEmo = { ...save1, pet:{ ...pet, name:'かきくけこさしすせ😀😀' }, album:[{ t:t0, k:'home', ti:'x'.repeat(39) + '😀😀', su:'a\u0000b', ic:'home' }] };
r = await call('POST', '/import', { code:enc(codeEmo) }, emo.token);
const emoSave = r.data && r.data.save && r.data.save.data;
ok(r.status === 200 && emoSave.pet.name === 'かきくけこさしすせ😀' && emoSave.album[0].ti === 'x'.repeat(39) + '😀' && emoSave.album[0].su === 'ab',
   '/import: name and album text cut by letters (no half emoji, no control chars)', emoSave && { name:emoSave.pet.name, album:emoSave.album[0] });

console.log('backup (1-3：上書きの前の セーブを 1人1つ とっておく)');
let bk = await backup(emoId);
ok(bk && bk.name === 'abcdefghij' && bk.reason === 'import', 'import over a child → the previous save is kept (reason import)', bk);
r = await call('POST', '/act', { type:'adopt', pet:{ ...pet, name:'つぎのこ' } }, emo.token);
bk = await backup(emoId);
ok(r.status === 200 && bk && bk.name === 'かきくけこさしすせ😀' && bk.reason === 'adopt', 'adopt over a child → the previous save replaces the backup (1 per member)', bk);
const [{ nb }] = await db`select count(*)::int as nb from app.save_backups where member_id = ${emoId}`;
ok(nb === 1, 'only one backup per member', nb);
await db`alter table app.save_backups rename to save_backups_away`;   /* 表が まだないとき（マイグレーションの前） */
r = await call('POST', '/act', { type:'adopt', pet:{ ...pet, name:'ひょうなし' } }, emo.token);
ok(r.status === 200 && r.data.save.data.pet.name === 'ひょうなし', 'no backup table: adopt still works', r.status);
await db`alter table app.save_backups_away rename to save_backups`;
await db`update app.save_backups set created_at = now() - interval '31 days' where member_id = ${emoId}`;
const keepBk = (await call('POST', '/login', { idToken:mkToken('bkeep', '2012410263', 'Ubkeep') })).data;
await call('POST', '/act', { type:'adopt', pet }, keepBk.token);
await call('POST', '/act', { type:'adopt', pet:{ ...pet, name:'にばんめ' } }, keepBk.token);
await db`update app.save_backups set created_at = now() - interval '29 days' where member_id = ${keepBk.member.id}`;
await call('POST', '/login', { idToken:mkToken('emo2', '2012410263', 'Uemo') });
ok(await backup(emoId) === null && (await backup(keepBk.member.id)) !== null, 'backups older than 30 days are deleted at someone\'s login; 29 days stay');

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
const [{ c }] = await db`select count(*)::int c from app.line_accounts where sub in ('Ualice', 'Ubob', 'Upat')`;
ok(c === 3, 'three LINE accounts: alice・bob・pat（内部チャネルが ちがっても 1つ。no token stored）', c);
const cols = await db`select column_name from information_schema.columns where table_schema='app'`;
ok(!cols.some((x: any) => /token$|id_token/.test(x.column_name)), 'no raw token columns');

console.log('leave (やめる：すぐに ぜんぶ消す・LINE の許可も取り消す)');
const rows = async (id: string) => (await db`select
  (select count(*) from app.members where id = ${id})::int as m, (select count(*) from app.line_accounts where member_id = ${id})::int as a,
  (select count(*) from app.sessions where member_id = ${id})::int as s, (select count(*) from app.saves where member_id = ${id})::int as v,
  (select count(*) from app.ai_usage where member_id = ${id})::int as u`)[0];
async function joiner(name: string, aud = '2012410263'){
  const lr = await call('POST', '/login', { idToken:mkToken(name, aud, 'U' + name) });
  await call('POST', '/act', { type:'adopt', pet }, lr.data.token);
  await db`insert into app.ai_usage (day, member_id, n) values (${jst(Date.now())}::date, ${lr.data.member.id}, 1)`;
  return { token:lr.data.token as string, id:lr.data.member.id as string };
}
const carol = await joiner('carol');
const bobLogin = await call('POST', '/login', { idToken:mkToken('bob3', '2012410263', 'Ubob') });
const bobRev = (await call('GET', '/save', undefined, bobLogin.data.token)).data.save.rev;
let rc = await rows(carol.id);
ok(rc.m === 1 && rc.a === 1 && rc.s === 1 && rc.v === 1 && rc.u === 1, 'carol has a member, LINE link, session, save and AI count', rc);
r = await call('POST', '/leave', { confirm:'leave' });
ok(r.status === 401, 'leave needs a session', r);
r = await call('POST', '/leave', {}, carol.token);
ok(r.status === 400 && r.data.error === 'noconfirm' && (await rows(carol.id)).m === 1, 'leave needs confirm:"leave" (nothing deleted)', r);
r = await call('POST', '/leave', { confirm:'leave', accessToken:'carol-access-token' }, carol.token);
rc = await rows(carol.id);
ok(r.status === 200 && r.data.ok === true && r.data.deauth === 'done', 'leave: ok, deauthorized', r.data);
ok(rc.m === 0 && rc.a === 0 && rc.s === 0 && rc.v === 0 && rc.u === 0, 'every row of carol is gone at once', rc);
ok(LINE.atVerifyCalls === 1 && LINE.tokenCalls === 1 && LINE.client === '2012410263' && LINE.secret === 'test-secret' && LINE.auth === 'Bearer chan-token-2012410263'
   && LINE.last.userAccessToken === 'carol-access-token', 'deauthorize: access token → 開発用 → LINE_CHANNEL_SECRET の stateless token + the user\'s access token', LINE);
r = await call('GET', '/save', undefined, carol.token);
ok(r.status === 401 && r.data.error === 'nosession', 'the old session no longer works', r);
r = await call('GET', '/save', undefined, bobLogin.data.token);
ok(r.status === 200 && r.data.save.rev === bobRev, 'other members are untouched', r.data && r.data.save && r.data.save.rev);
r = await call('POST', '/login', { idToken:mkToken('carol2', '2012410263', 'Ucarol') });
ok(r.status === 200 && r.data.member.id !== carol.id && r.data.member.importable === true && r.data.save === null, 'logging in again starts fresh (new member, import allowed)', r.data);
const dave = await joiner('dave');
r = await call('POST', '/leave', { confirm:'leave', accessToken:'already-gone-token' }, dave.token);
ok(r.data.ok && r.data.deauth === 'already' && (await rows(dave.id)).m === 0, 'already deauthorized: still deleted', r.data);
const erin = await joiner('erin');
r = await call('POST', '/leave', { confirm:'leave', accessToken:null }, erin.token);
ok(r.data.ok && r.data.deauth === 'notoken' && (await rows(erin.id)).m === 0, 'no access token: deleted, nothing sent to LINE', r.data);
const frank = await joiner('frank');
LINE.mode = 'down';
r = await call('POST', '/leave', { confirm:'leave', accessToken:'frank-access-token' }, frank.token);
ok(r.data.ok && r.data.deauth === 'failed' && (await rows(frank.id)).m === 0, 'LINE unreachable: still deleted', r.data);
LINE.mode = 'ok';
const gina = await joiner('gina');
Deno.env.delete('LINE_CHANNEL_SECRET');
const tc = LINE.tokenCalls;
r = await call('POST', '/leave', { confirm:'leave', accessToken:'gina-access-token' }, gina.token);
ok(r.data.ok && r.data.deauth === 'nosecret' && LINE.tokenCalls === tc && (await rows(gina.id)).m === 0, 'no channel secret: deleted, LINE not called', r.data);
Deno.env.set('LINE_CHANNEL_SECRET', 'test-secret');
const hank = await joiner('hank');
r = await call('POST', '/leave', { confirm:'leave', accessToken:'bad token with spaces' }, hank.token);
ok(r.data.ok && r.data.deauth === 'notoken' && (await rows(hank.id)).m === 0, 'odd access token is not sent', r.data);
console.log('leave（内部チャネルごとの シークレット）');
const mia = await joiner('mia', '2012410265');
r = await call('POST', '/leave', { confirm:'leave', accessToken:'mia-prod-token' }, mia.token);
ok(r.data.ok && r.data.deauth === 'done' && LINE.client === '2012410265' && LINE.secret === 'prod-secret' && LINE.auth === 'Bearer chan-token-2012410265'
   && LINE.last.userAccessToken === 'mia-prod-token' && (await rows(mia.id)).m === 0, '本番用のトークン → LINE_CHANNEL_SECRET_2012410265 で取り消す', { d:r.data, c:LINE.client, a:LINE.auth });
const lena = await joiner('lena', '2012410264');
let tc2 = LINE.tokenCalls, dc2 = LINE.deauthCalls;
r = await call('POST', '/leave', { confirm:'leave', accessToken:'lena-review-token' }, lena.token);
ok(r.data.ok && r.data.deauth === 'nosecret' && LINE.tokenCalls === tc2 && LINE.deauthCalls === dc2 && (await rows(lena.id)).m === 0,
   '審査用のシークレットがない → nosecret（ほかのチャネルのシークレットは使わない）・データは消す', r.data);
const otto = await joiner('otto');
tc2 = LINE.tokenCalls; dc2 = LINE.deauthCalls;
r = await call('POST', '/leave', { confirm:'leave', accessToken:'otto-other-token' }, otto.token);
ok(r.data.ok && r.data.deauth === 'failed' && LINE.tokenCalls === tc2 && LINE.deauthCalls === dc2 && (await rows(otto.id)).m === 0,
   'ほかのチャネルのトークン → 取り消さない（failed）・データは消す', r.data);
Deno.env.set('LINE_CHANNEL_SECRET_2012410263', 'dev-secret-new');
const nora = await joiner('nora');
r = await call('POST', '/leave', { confirm:'leave', accessToken:'nora-access-token' }, nora.token);
ok(r.data.ok && r.data.deauth === 'done' && LINE.client === '2012410263' && LINE.secret === 'dev-secret-new',
   '開発用は LINE_CHANNEL_SECRET_2012410263 があれば そちらを使う', { d:r.data, s:LINE.secret });
Deno.env.delete('LINE_CHANNEL_SECRET_2012410263');
console.log('keep (最後に ひらいてから 2年で消す)');
const ivy = await joiner('ivy'), jay = await joiner('jay');
await db`update app.members set last_seen_at = now() - interval '731 days' where id = ${ivy.id}`;
await db`update app.members set last_seen_at = now() - interval '729 days' where id = ${jay.id}`;
r = await call('POST', '/login', { idToken:mkToken('kim', '2012410263', 'Ukim') });
ok(r.status === 200 && (await rows(ivy.id)).m === 0 && (await rows(ivy.id)).v === 0 && (await rows(ivy.id)).u === 0, '2年より前の会員は、だれかの ログインで ぜんぶ消える', await rows(ivy.id));
ok((await rows(jay.id)).m === 1 && (await rows(jay.id)).v === 1, '2年より みじかい会員は のこる', await rows(jay.id));
await db`update app.members set last_seen_at = now() - interval '800 days' where id = ${jay.id}`;
r = await call('POST', '/login', { idToken:mkToken('jay2', '2012410263', 'Ujay') });
ok(r.status === 200 && r.data.member.id !== jay.id && r.data.save === null && r.data.member.importable === true && (await rows(jay.id)).m === 0,
   '2年ぶりに ひらいた人は、消してから あたらしい会員に', r.data);
console.log('card (うちのこカード：Storage に画像・1人1日3枚・1年で消す)');
/* ためしの PNG（中身の画像データは でたらめ。サーバーは形・たて・よこ・チャンクだけを見る） */
function png(w: number, h: number, seed = 1, o: { text?: boolean; tail?: boolean; noEnd?: boolean; firstNotIhdr?: boolean; sig?: boolean; pad?: number } = {}){
  const chunk = (type: string, data: Uint8Array) => {
    const c = new Uint8Array(12 + data.length), dv = new DataView(c.buffer);
    dv.setUint32(0, data.length); for (let i = 0; i < 4; i++) c[4 + i] = type.charCodeAt(i);
    c.set(data, 8); return c;
  };
  const ihdr = new Uint8Array(13), dv = new DataView(ihdr.buffer);
  dv.setUint32(0, w); dv.setUint32(4, h); ihdr[8] = 8; ihdr[9] = 6;
  const idat = new Uint8Array(o.pad || 200).map((_, i) => (i * 31 + seed * 7) & 255);
  const parts = [new Uint8Array(o.sig ? [1, 2, 3, 4, 5, 6, 7, 8] : [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])];
  if (o.firstNotIhdr) parts.push(chunk('tEXt', new TextEncoder().encode('a')));
  parts.push(chunk('IHDR', ihdr));
  if (o.text) parts.push(chunk('tEXt', new TextEncoder().encode('Comment\0secret-note')));
  parts.push(chunk('IDAT', idat));
  if (!o.noEnd) parts.push(chunk('IEND', new Uint8Array(0)));
  if (o.tail) parts.push(new TextEncoder().encode('TRAILING-DATA'));
  const all = new Uint8Array(parts.reduce((n, p) => n + p.length, 0)); let k = 0;
  for (const p of parts){ all.set(p, k); k += p.length; }
  let bin = ''; for (const b of all) bin += String.fromCharCode(b);
  return 'data:image/png;base64,' + btoa(bin);
}
const cardRows = async (id: string) => (await db`select count(*)::int as n from app.cards where member_id = ${id}`)[0].n as number;
r = await call('GET', '/card');
ok(r.status === 401, 'card needs a session', r);
const lc = await call('POST', '/login', { idToken:mkToken('cara', '2012410263', 'Ucara') });
ok(lc.data.card && lc.data.card.on === true && lc.data.card.left === 3 && lc.data.card.perDay === 3, 'login tells the card status (on, 3 a day)', lc.data.card);
const cara = { token:lc.data.token as string, id:lc.data.member.id as string };
r = await call('POST', '/card', { image:png(800, 800) }, cara.token);
ok(r.status === 409 && r.data.error === 'nosave', 'no child yet → nosave', r);
await call('POST', '/act', { type:'adopt', pet }, cara.token);
for (const [label, image] of [['not a data URL', 'https://evil.example/x.png'], ['jpeg', 'data:image/jpeg;base64,' + btoa('\xFF\xD8\xFF' + 'x'.repeat(600))],
    ['svg', 'data:image/svg+xml;base64,' + btoa('<svg/>')], ['bad signature', png(800, 800, 1, { sig:true })], ['too small (100px)', png(100, 100)],
    ['too big (2000px)', png(2000, 800)], ['no IEND', png(800, 800, 1, { noEnd:true })], ['first chunk is not IHDR', png(800, 800, 1, { firstNotIhdr:true })],
    ['not a string', 12345]] as [string, unknown][]){
  r = await call('POST', '/card', { image }, cara.token);
  ok(r.status === 400 && r.data.error === 'badimage', 'bad image: ' + label, r);
}
r = await call('POST', '/card', { image:'data:image/png;base64,' + 'A'.repeat(2_100_000) }, cara.token);
ok(r.status === 413 || (r.status === 400 && r.data.error === 'badimage'), 'too large body is refused', r.status);
ok(STORE.puts === 0 && await cardRows(cara.id) === 0, 'nothing stored for refused images');
r = await call('POST', '/card', { image:png(800, 800, 1, { text:true, tail:true }) }, cara.token);
const name1 = r.data && r.data.url ? String(r.data.url).split('/').pop()! : '';
ok(r.status === 200 && r.data.ok === true && /^https:\/\/store\.test\/storage\/v1\/object\/public\/cards\/[A-Za-z0-9_-]{32}\.png$/.test(r.data.url)
   && r.data.w === 800 && r.data.h === 800 && r.data.card.left === 2, 'card: stored, public URL, size, 2 left', r.data);
const stored = String.fromCharCode(...(STORE.objects.get(name1) || new Uint8Array()));
ok(stored.startsWith('\x89PNG') && stored.includes('IDAT') && stored.slice(-8, -4) === 'IEND' && !stored.includes('secret-note') && !stored.includes('TRAILING'),
   'stored PNG keeps only image chunks (text and trailing data dropped)', stored.length);
ok(STORE.headers.get('apikey') === 'sb_secret_test' && !STORE.headers.get('authorization') && STORE.headers.get('content-type') === 'image/png'
   && STORE.headers.get('x-upsert') === 'false' && STORE.cache === 'max-age=3600', 'storage: new secret key on apikey only, image/png, no upsert, cache 1h',
   Object.fromEntries(STORE.headers));
r = await call('POST', '/card', { image:png(800, 800, 1) }, cara.token);
ok(r.data.ok && String(r.data.url).endsWith(name1) && r.data.card.left === 2 && STORE.puts === 1, 'the same picture again → same URL, not counted, not uploaded again', r.data);
r = await call('POST', '/card', { image:png(800, 600, 2) }, cara.token);
ok(r.data.ok && r.data.w === 800 && r.data.h === 600 && r.data.card.left === 1, 'another picture → 1 left', r.data);
STORE.mode = 'error';
r = await call('POST', '/card', { image:png(800, 800, 3) }, cara.token);
ok(r.data.ok === false && r.data.why === 'unavailable' && r.data.card.left === 1 && await cardRows(cara.id) === 2, 'storage error → unavailable, the count is given back', r.data);
STORE.mode = 'down';
r = await call('POST', '/card', { image:png(800, 800, 3) }, cara.token);
ok(r.data.ok === false && r.data.why === 'unavailable' && r.data.card.left === 1, 'storage unreachable → unavailable', r.data);
STORE.mode = 'ok';
r = await call('POST', '/card', { image:png(800, 800, 3) }, cara.token);
ok(r.data.ok && r.data.card.left === 0, 'third picture → 0 left', r.data);
r = await call('POST', '/card', { image:png(800, 800, 4) }, cara.token);
ok(r.data.ok === false && r.data.why === 'limit' && r.data.card.left === 0 && STORE.objects.size === 3, '4th new picture in a day → limit', r.data);
r = await call('POST', '/card', { image:png(800, 800, 1) }, cara.token);
ok(r.data.ok && String(r.data.url).endsWith(name1), 'a picture made before can still be sent at the limit', r.data);
r = await call('GET', '/card', undefined, cara.token);
ok(r.status === 200 && r.data.card.on && r.data.card.left === 0, 'GET /card', r.data);
await db`update app.cards set day = day - 1 where member_id = ${cara.id}`;
r = await call('GET', '/card', undefined, cara.token);
ok(r.data.card.left === 3, 'next day (Japan time) → 3 again', r.data);
const bea = await joiner('bea');
r = await call('POST', '/card', { image:png(800, 800, 1) }, bea.token);
ok(r.data.ok && !String(r.data.url).endsWith(name1), 'another member with the same picture gets their own image', r.data);
const bobCard = String(r.data.url).split('/').pop()!;
// 1年 使わない画像は、だれかの ログインで消える（365日より前）。364日は のこる
await db`update app.cards set used_at = now() - interval '366 days' where name = ${name1}`;
const keepName = (await db`select name from app.cards where member_id = ${cara.id} and name <> ${name1} limit 1`)[0].name as string;
await db`update app.cards set used_at = now() - interval '364 days' where name = ${keepName}`;
r = await call('POST', '/login', { idToken:mkToken('cara2', '2012410263', 'Ucara') });
const left1 = (await db`select name from app.cards where name in (${name1}, ${keepName})`).map((x: any) => x.name);
ok(!STORE.objects.has(name1) && !left1.includes(name1) && STORE.objects.has(keepName) && left1.includes(keepName), 'unused for a year → image and row are deleted at someone\'s login; 364 days stay', left1);
// やめると、その人のカードの画像も すぐ消える（ほかの人のは のこる）
const caraNames = (await db`select name from app.cards where member_id = ${cara.id}`).map((x: any) => x.name as string);
r = await call('POST', '/leave', { confirm:'leave', accessToken:null }, r.data.token);
ok(r.data.ok && r.data.cards === 'done' && caraNames.length === 2 && caraNames.every(n => !STORE.objects.has(n)) && (await db`select count(*)::int as n from app.cards where name in ${db(caraNames)}`)[0].n === 0
   && STORE.objects.has(bobCard), 'leave: that member\'s images are deleted at once (others stay)', { d:r.data, caraNames });
// やめるときに Storage に届かなくても、データは消え、画像は あとの掃除で消える
const dora = await joiner('dora');
r = await call('POST', '/card', { image:png(640, 640, 9) }, dora.token);
const doraName = String(r.data.url).split('/').pop()!;
STORE.mode = 'down';
r = await call('POST', '/leave', { confirm:'leave', accessToken:null }, dora.token);
const orphan = (await db`select member_id from app.cards where name = ${doraName}`)[0];
ok(r.data.ok && r.data.cards === 'later' && (await rows(dora.id)).m === 0 && orphan && orphan.member_id === null && STORE.objects.has(doraName),
   'leave while storage is unreachable: data deleted, the image row is kept (member_id null) to retry', { d:r.data, orphan });
STORE.mode = 'ok';
await call('POST', '/login', { idToken:mkToken('cara3', '2012410263', 'Ucara') });
ok(!STORE.objects.has(doraName) && !(await db`select 1 from app.cards where name = ${doraName}`).length, 'the next login deletes the left-over image');
// 2年 ひらかない会員の画像も消える
const ezra = await joiner('ezra');
r = await call('POST', '/card', { image:png(640, 640, 10) }, ezra.token);
const ezraName = String(r.data.url).split('/').pop()!;
await db`update app.members set last_seen_at = now() - interval '731 days' where id = ${ezra.id}`;
await call('POST', '/login', { idToken:mkToken('cara4', '2012410263', 'Ucara') });
ok((await rows(ezra.id)).m === 0 && !STORE.objects.has(ezraName) && !(await db`select 1 from app.cards where name = ${ezraName}`).length, 'members gone after 2 years: their images go too');
// Storage の鍵がないときは休み（古い service_role の鍵なら Authorization にも入れる）
Deno.env.delete('SUPABASE_SECRET_KEYS');
r = await call('GET', '/card', undefined, bea.token);
const h0 = await call('GET', '/health');
ok(r.data.card.on === false && h0.data.cards === false, 'no storage key → cards off (GET /card, /health)', { c:r.data, h:h0.data });
r = await call('POST', '/card', { image:png(640, 640, 11) }, bea.token);
ok(r.data.ok === false && r.data.why === 'off', 'no storage key → POST /card is off', r.data);
Deno.env.set('SUPABASE_SERVICE_ROLE_KEY', 'legacy.jwt.key');
r = await call('POST', '/card', { image:png(640, 640, 11) }, bea.token);
ok(r.data.ok && STORE.headers.get('apikey') === 'legacy.jwt.key' && STORE.headers.get('authorization') === 'Bearer legacy.jwt.key', 'legacy service_role key → apikey and Authorization', r.data);
Deno.env.delete('SUPABASE_SERVICE_ROLE_KEY');
Deno.env.set('SUPABASE_SECRET_KEYS', JSON.stringify({ default:'sb_secret_test' }));
const h1 = await call('GET', '/health');
ok(h1.data.cards === true, '/health tells cards are on');
console.log('card caps (1-2：1人 新しい30まい・全員で1日100まい・ぜんぶで3000まい)');
const fay = await joiner('fay');
const fake = (i: number) => 'f' + String(i).padStart(31, '0') + '.png';
const shaOf = (i: number) => i.toString(16).padStart(64, '0');
for (let i = 0; i < 30; i++){
  await db`insert into app.cards (name, member_id, sha, day, used_at) values (${fake(i)}, ${fay.id}, decode(${shaOf(i + 1)}, 'hex'), current_date - 2, now() - make_interval(mins => ${100 - i}))`;
  STORE.objects.set(fake(i), new Uint8Array([1]));
}
r = await call('POST', '/card', { image:png(640, 640, 21) }, fay.token);
const fayRows = (await db`select name from app.cards where member_id = ${fay.id}`).map((x: any) => x.name as string);
ok(r.data.ok && fayRows.length === 30 && !fayRows.includes(fake(0)) && !STORE.objects.has(fake(0)) && fayRows.includes(fake(1)) && STORE.objects.has(fake(1)),
   'the 31st card → the oldest one (by last use) is deleted with its image', { ok:r.data.ok, n:fayRows.length });
r = await call('POST', '/card', { image:png(640, 640, 22) }, fay.token);
ok(r.data.ok && !STORE.objects.has(fake(1)), 'another new card → the next oldest goes');
const gus = await joiner('gus');
await db`insert into app.cards (name, member_id, sha, day) select 'g' || lpad(g::text, 31, '0') || '.png', ${fay.id}::uuid, decode(lpad(to_hex(1000 + g), 64, '0'), 'hex'), ${jst(Date.now())}::date
  from generate_series(1, 100) as g`;
r = await call('POST', '/card', { image:png(640, 640, 23) }, gus.token);
ok(r.data.ok === false && r.data.why === 'busy' && r.data.card.left === 3, '100 new cards today (everyone) → busy (not counted for the member)', r.data);
await db`delete from app.cards where name like 'g%'`;
await db`insert into app.cards (name, member_id, sha, day, used_at) select 'h' || lpad(g::text, 31, '0') || '.png', ${fay.id}::uuid, decode(lpad(to_hex(5000 + g), 64, '0'), 'hex'), current_date - 3, now()
  from generate_series(1, 3000) as g`;
r = await call('POST', '/card', { image:png(640, 640, 24) }, gus.token);
ok(r.data.ok === false && r.data.why === 'busy', '3000 cards kept (everyone) → busy', r.data);
await db`delete from app.cards where name like 'h%'`;
r = await call('POST', '/card', { image:png(640, 640, 24) }, gus.token);
ok(r.data.ok === true, 'below the caps again → ok', r.data);
r = await call('POST', '/card', { image:png(800, 800, 25, { pad:600_003 }) }, gus.token);
ok(r.status === 400 && r.data.error === 'badimage', 'a PNG over 600KB is refused', r);
await db.end();

console.log(fails ? `\n${fails} FAILED` : '\nall passed');
Deno.exit(fails ? 1 : 0);
