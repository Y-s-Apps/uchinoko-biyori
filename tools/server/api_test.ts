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
const STORE = { mode:'ok', objects:new Map<string, Uint8Array>(), created:new Map<string, number>(), puts:0, dels:0, lists:0, headers:null as any, cache:'' };
// ---- fake LINE Messaging API（よるの おしらせ：プッシュメッセージ） ----
const PUSH = { mode:'ok', flaked:false, calls:[] as { auth: string | null; key: string | null; body: any }[] };
Deno.env.set('NOTIFY_HOUR', '0');   /* ためしは いつ うごかしても 送る回が とおるように（early は 下で しぼって 確かめる） */
/* 回数の制限（1-5）は ふだんは ゆるく（ためしは つづけて たくさん よぶ）。下の rate で しぼって 確かめる */
Deno.env.set('LOGIN_PER_MIN', '1000');
Deno.env.set('ACT_PER_WINDOW', '100000');
globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = String(input instanceof Request ? input.url : input);
  if (url === 'https://store.test/storage/v1/object/list/cards'){
    /* 一覧（まいごの画像の掃除。1-8）：名前の じゅんに offset から limit こ */
    STORE.lists++;
    if (STORE.mode === 'down') throw new Error('network');
    const b = JSON.parse(String(init!.body));
    const all = [...STORE.objects.keys()].sort().map(name => ({ name, id:'id-' + name, created_at:new Date(STORE.created.get(name) ?? Date.now()).toISOString(), metadata:{} }));
    return new Response(JSON.stringify(all.slice(b.offset || 0, (b.offset || 0) + (b.limit || 100))), { status:200 });
  }
  if (url.startsWith('https://store.test/storage/v1/object/cards')){
    if (STORE.mode === 'down') throw new Error('network');
    STORE.headers = new Headers(init!.headers);
    if (STORE.mode === 'error') return new Response(JSON.stringify({ error:'internal' }), { status:500 });
    if (init?.method === 'POST'){
      STORE.puts++;
      const name = url.slice('https://store.test/storage/v1/object/cards/'.length);
      if (STORE.objects.has(name)) return new Response(JSON.stringify({ error:'Duplicate' }), { status:409 });
      STORE.objects.set(name, new Uint8Array(init!.body as Uint8Array));
      STORE.created.set(name, Date.now());
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
  if (url === 'https://api.line.me/v2/bot/message/push'){
    const h = new Headers(init!.headers);
    PUSH.calls.push({ auth:h.get('authorization'), key:h.get('x-line-retry-key'), body:JSON.parse(String(init!.body)) });
    if (PUSH.mode === 'down') throw new Error('network');
    if (PUSH.mode === 'limit') return new Response(JSON.stringify({ message:'You have reached your monthly limit.' }), { status:429 });
    if (PUSH.mode === 'auth') return new Response(JSON.stringify({ message:'Authentication failed. Confirm that the access token in the authorization header is valid.' }), { status:401 });
    if (PUSH.mode === 'busy429') return new Response(JSON.stringify({ message:'The API rate limit has been exceeded. Try again later.' }), { status:429 });
    if (PUSH.mode === 'flaky' && !PUSH.flaked){ PUSH.flaked = true; return new Response(JSON.stringify({ message:'internal' }), { status:500 }); }
    return new Response(JSON.stringify({ sentMessages:[{ id:'461230966842064897' }] }), { status:200 });
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
/* サーバーと 同じ ルール（同じ import map なので 同じ もの）。notify で 1人の セーブが 例外を 出す まねに つかう（F2-2） */
const { Rules, RUN } = await import('uchinoko-game') as any;

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
await db`alter table app.day_quota rename to day_quota_away`;   /* 回数の表がまだないとき（マイグレーション前） */
r = await call('GET', '/ai', undefined, alice);
ok(r.status === 200 && r.data.ai.on === false, 'no usage table: AI is off (nothing breaks)', r.data);
r = await read();
ok(r.status === 200 && r.data.ok === false && r.data.why === 'off' && AI.calls === 0, 'no usage table: /read is off, AI not called', r.data);
await db`alter table app.day_quota_away rename to day_quota`;
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
const aiCols = (await db`select column_name from information_schema.columns where table_schema='app' and table_name='day_quota' order by column_name`).map((x: any) => x.column_name);
ok(aiCols.join() === 'day,kind,n,who', 'day_quota keeps only day, kind, the day\'s mark and count (no member, no photo)', aiCols);
const [{ oldt }] = await db`select count(*)::int as oldt from information_schema.tables where table_schema='app' and table_name='ai_usage'`;
ok(oldt === 0, 'the old per-member ai_usage table is gone', oldt);
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
  (select count(*) from app.save_backups where member_id = ${id})::int as u`)[0];
async function joiner(name: string, aud = '2012410263'){
  const lr = await call('POST', '/login', { idToken:mkToken(name, aud, 'U' + name) });
  await call('POST', '/act', { type:'adopt', pet }, lr.data.token);
  await call('POST', '/act', { type:'adopt', pet:{ ...pet, name:pet.name + '2' } }, lr.data.token);   /* 上書きの ひかえも 1つ */
  return { token:lr.data.token as string, id:lr.data.member.id as string };
}
const carol = await joiner('carol');
const bobLogin = await call('POST', '/login', { idToken:mkToken('bob3', '2012410263', 'Ubob') });
const bobRev = (await call('GET', '/save', undefined, bobLogin.data.token)).data.save.rev;
let rc = await rows(carol.id);
ok(rc.m === 1 && rc.a === 1 && rc.s === 1 && rc.v === 1 && rc.u === 1, 'carol has a member, LINE link, session, save and a backup', rc);
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
await db`update app.day_quota set day = day - 1 where kind = 'card'`;
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
console.log('card caps (1-2：1人 新しい30まい・全員で1日100まい・ぜんぶで1500まい〈F1-1〉)');
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
  from generate_series(1, 1500) as g`;
r = await call('POST', '/card', { image:png(640, 640, 24) }, gus.token);
ok(r.data.ok === false && r.data.why === 'busy', '1500 cards kept (everyone) → busy (F1-1: 1500 × 600KB fits the free 1GB)', r.data);
await db`delete from app.cards where name like 'h%'`;
r = await call('POST', '/card', { image:png(640, 640, 24) }, gus.token);
ok(r.data.ok === true, 'below the caps again → ok', r.data);
r = await call('POST', '/card', { image:png(800, 800, 25, { pad:600_003 }) }, gus.token);
ok(r.status === 400 && r.data.error === 'badimage', 'a PNG over 600KB is refused', r);
console.log('rid (3-3：おせわの番号。返事だけ とどかなくて おくりなおしても 2回 数えない)');
const rina = await joiner('rina');
await patch(rina.id, d => { d.stats.full = 40; });
let r1 = await call('POST', '/act', { type:'feed', rid:'rid-feed-0001' }, rina.token);
let r2 = await call('POST', '/act', { type:'feed', rid:'rid-feed-0001' }, rina.token);
ok(r1.data.ok && r2.data.ok && r2.data.dup === true && r2.data.save.data.counts.meals === 1 && r2.data.save.rev === r1.data.save.rev
   && JSON.stringify(r2.data.ev) === JSON.stringify(r1.data.ev), 'the same feed again (within 2.5s) → the first answer, counted once, not busy', { r1:r1.data.ok, r2:r2.data });
await rest(rina.id);
r2 = await call('POST', '/act', { type:'feed', rid:'rid-feed-0002' }, rina.token);
ok(r2.data.ok && !r2.data.dup && r2.data.save.data.counts.meals === 2, 'another number → counted', r2.data.save && r2.data.save.data.counts);
await rest(rina.id);
await patch(rina.id, d => { d.stats.full = 40; });
r2 = await call('POST', '/act', { type:'feed', rid:'bad rid!' }, rina.token);
ok(r2.data.ok && r2.data.save.data.counts.meals === 3, 'an odd number is ignored (counted as usual)', r2.data);
const bk0 = await backup(rina.id);
const ad1 = await call('POST', '/act', { type:'adopt', pet:{ ...pet, name:'にばんめ' }, rid:'rid-adopt-0001' }, rina.token);
const bk1 = await backup(rina.id);
const ad2 = await call('POST', '/act', { type:'adopt', pet:{ ...pet, name:'にばんめ' }, rid:'rid-adopt-0001' }, rina.token);
const bk2 = await backup(rina.id);
ok(ad1.data.ok && ad2.data.ok && ad2.data.dup && ad2.data.save.rev === ad1.data.save.rev && ad2.data.save.data.created === ad1.data.save.data.created
   && bk1 && bk2 && bk1.rev === bk2.rev && bk1.name !== 'にばんめ' && bk0 && bk0.rev !== bk1.rev, 'the same adopt again → not made twice, the backup keeps the child before', { ad1:ad1.data.save.rev, ad2:ad2.data, bk0, bk1, bk2 });
const codeR = enc({ ...codePet, pet:{ ...pet, name:'りなのコード' } });
const im1 = await call('POST', '/import', { code:codeR, rid:'rid-import-001' }, rina.token);
const im2 = await call('POST', '/import', { code:codeR, rid:'rid-import-001' }, rina.token);
ok(im1.status === 200 && im2.status === 200 && im2.data.save.rev === im1.data.save.rev && im2.data.save.data.pet.name === 'りなのコード' && im2.data.importable === false,
   'the same import again → the imported child (not "only once")', { im1:im1.status, im2:im2.data });
const im3 = await call('POST', '/import', { code:codeR, rid:'rid-import-002' }, rina.token);
ok(im3.status === 409 && im3.data.error === 'already', 'a new import with another number → only once', im3);
r = await call('POST', '/act', { type:'open', rid:'rid-open-0001' }, rina.token);
ok(r.data.ok && r.data.save.data.srv.rq.id === 'rid-open-0001' && !('save' in r.data.save.data.srv.rq.r), 'the save keeps only the last number and its answer (no save inside)', r.data.save && r.data.save.data.srv);

console.log('puzzle (2026-11-15：パズル。たねと 手順だけ うけとり、サーバーが 再生して クリアと ほうびの 1日3回を 決める)');
{
  const { Puzzle, PUZZLE } = await import('uchinoko-game') as any;
  const pz = await joiner('puzu');
  const solveP = (seed: number) => {
    const g = Puzzle.start(seed), moves: number[] = [];
    while (!g.end){
      let pickC = -1, pickN = 0;
      for (let c = 0; c < 2 * PUZZLE.w * PUZZLE.w; c++){
        const pr = Puzzle.pair(c); if (!pr) continue;
        const n = Puzzle.lines(Puzzle.swapped(g.b, pr[0], pr[1])).length;
        if (n > pickN){ pickN = n; pickC = c; }
      }
      Puzzle.move(g, pickC); moves.push(pickC);
    }
    return { moves, clear:g.clear, score:g.score };
  };
  const saveP = async () => (await call('GET', '/save', undefined, pz.token)).data.save;
  /* つぎの 1回が クリアできる たねに なるまで 回数を すすめる（ためしの ため） */
  const nextClear = async () => {
    for (let i = 0; i < 400; i++){
      const sv = await saveP(); const seed = Puzzle.seed(sv.data); const sl = solveP(seed);
      if (sl.clear) return { seed, moves:sl.moves, score:sl.score };
      await patch(pz.id, d => { d.puzzle.games++; });
    }
    throw new Error('no clearable seed');
  };
  const sv0 = await saveP();
  ok(sv0.data.puzzle && sv0.data.puzzle.games === 0 && sv0.data.puzzle.n === 0, 'a new child has the puzzle record (ensureState)', sv0.data.puzzle);
  const love0 = sv0.data.stats.love;
  for (let i = 0; i < 4; i++){
    const x = await nextClear();
    const pr = await call('POST', '/act', { type:'puzzle', seed:x.seed, moves:x.moves, rid:'rid-puzzle-00' + i, score:999999, reward:true, n:0, left:3 }, pz.token);
    ok(pr.data.ok && pr.data.clear && pr.data.score === x.score && pr.data.reward === (i < 3) && pr.data.save.data.puzzle.n === Math.min(3, i + 1)
       && pr.data.save.data.puzzle.best >= x.score && pr.data.save.data.puzzle.best < 999999,
       i < 3 ? `clear ${i + 1} → a reward (the score is the server's replay, not the one sent)` : 'clear 4 → no reward (still playable)', pr.data);
  }
  const sv1 = await saveP();
  ok(Math.abs(sv1.data.stats.love - love0 - 3 * PUZZLE.love) < 1e-9 && sv1.data.album.some((a: any) => a.k === 'puzzle'), `love only for 3 clears (+${3 * PUZZLE.love})・the best score in the album`, { love:sv1.data.stats.love - love0 });
  const x = await nextClear();
  const d1 = await call('POST', '/act', { type:'puzzle', seed:x.seed, moves:x.moves, rid:'rid-puzzle-dup1' }, pz.token);
  const d2 = await call('POST', '/act', { type:'puzzle', seed:x.seed, moves:x.moves, rid:'rid-puzzle-dup1' }, pz.token);
  ok(d1.data.ok && d2.data.ok && d2.data.dup === true && d2.data.save.rev === d1.data.save.rev && d2.data.save.data.puzzle.games === d1.data.save.data.puzzle.games
     && d2.data.score === d1.data.score, 'the same rid again → the first answer, counted once', { d1:d1.data.save.data.puzzle, d2:d2.data });
  const d3 = await call('POST', '/act', { type:'puzzle', seed:x.seed, moves:x.moves, rid:'rid-puzzle-dup2' }, pz.token);
  ok(d3.status === 200 && d3.data.ok === false && d3.data.why === 'stale' && d3.data.save.rev === d1.data.save.rev, 'the same game with another rid → stale (the seed moved on), nothing written', d3.data);
  const d4 = await call('POST', '/act', { type:'puzzle', seed:Puzzle.seed(d1.data.save.data), moves:[0, 1, 2] }, pz.token);
  ok(d4.data.ok === false && (d4.data.why === 'bad') && d4.data.save.rev === d1.data.save.rev, 'moves that do not end the game / do not match → bad, nothing written', d4.data);
  /* 日本時間の 0時：きのうの 3回は もどる */
  await patch(pz.id, d => { d.puzzle.day = jst(Date.now() - 864e5); d.puzzle.n = 3; });
  const y = await nextClear();
  const m1 = await call('POST', '/act', { type:'puzzle', seed:y.seed, moves:y.moves }, pz.token);
  ok(m1.data.ok && m1.data.reward && m1.data.save.data.puzzle.n === 1 && m1.data.save.data.puzzle.day === jst(Date.now()), "yesterday's count (3) → today starts again (Japan time)", m1.data.save && m1.data.save.data.puzzle);
  /* おせわの 2.5秒には 数えない（あそぶの すぐあとでも ことわらない） */
  await patch(pz.id, d => { d.stats.full = 60; });
  const pl = await call('POST', '/act', { type:'play' }, pz.token);
  const z = await nextClear();
  const m2 = await call('POST', '/act', { type:'puzzle', seed:z.seed, moves:z.moves }, pz.token);
  ok(pl.data.ok && m2.data.ok && m2.data.why !== 'busy', 'right after a play → not busy (the puzzle is not a care action)', m2.data);
}

console.log('run (2026-11-22 P6：うちのこラン。走りだし runStart の サーバーの 時刻から いちばん はやい タイムより はやい ゴールは ほうびなし)');
{
  const rn = await joiner('runner');
  const getS = async () => (await call('GET', '/save', undefined, rn.token)).data.save;
  /* 走りだしから ms ミリ秒 たった ことに する（サーバーの 時計は そのまま、srv.run.t を 前に ずらす） */
  const ago = (ms: number) => patch(rn.id, d => { if (d.srv && d.srv.run) d.srv.run.t -= ms; });
  const go = (course: string, rid: string) => call('POST', '/act', { type:'runStart', course, rid }, rn.token);
  const goal = (course: string, rid: string, extra: Record<string, unknown> = {}) => call('POST', '/act', { type:'run', course, ms:36580, misses:0, rank:1, rid, ...extra }, rn.token);
  const sv0 = await getS();
  ok(sv0.data.run && sv0.data.run.games === 0 && sv0.data.run.n === 0 && JSON.stringify(sv0.data.run.best) === '{}', 'a new child has the run record (ensureState)', sv0.data.run);
  const love0 = sv0.data.stats.love;
  /* 走りだし：サーバーの 時刻を srv.run に。数字は かえない */
  let x = await go('park', 'rid-run-start-1');
  const sv1 = await getS();
  ok(x.status === 200 && x.data.ok && x.data.course === 'park' && sv1.data.srv.run && sv1.data.srv.run.c === 'park' && Math.abs(sv1.data.srv.run.t - Date.now()) < 5000
     && sv1.data.run.games === 0 && sv1.data.stats.love === love0 && sv1.rev === sv0.rev + 1, 'runStart → srv.run = { c, t } (server time), nothing else changes', { r:x.data, srv:sv1.data.srv });
  x = await go('park', 'rid-run-start-1');
  ok(x.data.ok && x.data.dup === true && (await getS()).rev === sv1.rev, 'the same runStart rid again → the first answer, not written twice', x.data);
  x = await go('nowhere', 'rid-run-start-bad');
  ok(x.status === 200 && x.data.ok === false && x.data.why === 'course' && (await getS()).rev === sv1.rev, 'runStart with an unknown course → refused, nothing written', x.data);
  x = await go('constructor', 'rid-run-start-ctor');
  ok(x.data.ok === false && x.data.why === 'course', 'runStart: constructor is not a course', x.data);
  /* はやすぎる ゴール（走りだしから min より 前）：きろく（回数・ベスト）は するが ほうびなし。ありえない タイムは min に 切る */
  x = await goal('park', 'rid-run-goal-fast', { ms:1 });
  ok(x.data.ok && x.data.reward === false && x.data.noreward === 'fast' && x.data.left === 3 && x.data.ms === RUN.courses.park.min && x.data.save.data.run.n === 0
     && x.data.save.data.run.games === 1 && x.data.save.data.run.best.park === RUN.courses.park.min && x.data.save.data.stats.love === love0 && !x.data.save.data.srv.run,
     'goal faster than RUN.min after runStart → recorded (best is cut to min) but no reward・left stays 3・the start is used up', x.data);
  /* 走りだしが ない（つかいおわった）ゴール：ほうびなし */
  x = await goal('park', 'rid-run-goal-nostart');
  ok(x.data.ok && x.data.reward === false && x.data.noreward === 'start' && x.data.save.data.run.n === 0 && x.data.save.data.run.games === 2, 'goal without a runStart → no reward', x.data);
  /* ちがう コースの 走りだし */
  await go('beach', 'rid-run-start-2'); await ago(60_000);
  x = await goal('park', 'rid-run-goal-other');
  ok(x.data.ok && x.data.reward === false && x.data.noreward === 'start' && !x.data.save.data.srv.run, 'goal on another course than the runStart → no reward (and the start is used up)', x.data);
  /* ふつうの ゴール：走りだしから min より あと → ほうび（ごきげん+5・なかよし+2）・ベスト・アルバム。CARE（2.5秒）には 数えない */
  await patch(rn.id, d => { d.stats.full = 60; });
  const pl = await call('POST', '/act', { type:'play' }, rn.token);
  x = await go('park', 'rid-run-start-3');
  ok(pl.data.ok && x.data.ok && x.data.why !== 'busy', 'runStart right after a play → not busy (not a care action)', x.data);
  await ago(RUN.courses.park.min + 3000);
  const before = (await getS()).data;
  const g1 = await goal('park', 'rid-run-goal-1', { ms:36580, score:9, reward:true, n:0, left:3, best:{ park:1 } });
  ok(g1.data.ok && g1.data.reward === true && !g1.data.noreward && g1.data.left === 2 && g1.data.save.data.run.n === 1 && g1.data.ms === 36580
     && Math.abs(g1.data.save.data.stats.love - before.stats.love - RUN.love) < 1e-9 && g1.data.save.data.run.best.park === RUN.courses.park.min,
     'a fair goal (after RUN.min) → reward・left 2・the extra fields sent are ignored・the best stays the faster one', g1.data);
  const g1b = await goal('park', 'rid-run-goal-1');
  ok(g1b.data.ok && g1b.data.dup === true && g1b.data.reward === true && g1b.data.save.rev === g1.data.save.rev && g1b.data.save.data.run.n === 1, 'the same goal rid again → the first answer, counted once', g1b.data);
  const g1c = await goal('park', 'rid-run-goal-1x');
  ok(g1c.data.ok && g1c.data.reward === false && g1c.data.noreward === 'start' && g1c.data.save.data.run.n === 1, 'another goal for the same runStart → no reward (one start, one reward)', g1c.data);
  /* アジリティ（ミスの 数・順位なし）と 1日3回（レース＋アジリティ）。パズルの 回数は かわらない */
  const pz0 = (await getS()).data.puzzle;
  for (const [i, c] of [[2, 'balance'], [3, 'zigzag'], [4, 'first-field']] as [number, string][]){
    await go(c, 'rid-run-start-a' + i); await ago(RUN.courses[c].min + 3000);
    x = await call('POST', '/act', { type:'run', course:c, ms:RUN.courses[c].min + 9000, misses:i === 2 ? 0 : 2, rid:'rid-run-goal-a' + i }, rn.token);
    ok(x.data.ok && x.data.reward === (i <= 3) && !x.data.noreward && x.data.save.data.run.n === Math.min(3, i) && x.data.left === Math.max(0, 3 - i),
       i <= 3 ? `agility goal ${i} → reward (race + agility together)` : 'the 4th goal today → no reward (the daily limit), no noreward mark', x.data);
  }
  const sv2 = await getS();
  ok(JSON.stringify(sv2.data.puzzle) === JSON.stringify(pz0) && sv2.data.run.clears >= 2 && sv2.data.album.some((a: any) => a.k === 'run:balance'), 'the puzzle count is untouched・no-miss goals are clears・the best is in the album', { run:sv2.data.run });
  /* ほうびなしでも きょうの 回数は のこる（きのうの 3回 → きょうは 0 から） */
  await patch(rn.id, d => { d.run.day = jst(Date.now() - 864e5); d.run.n = 3; });
  x = await goal('park', 'rid-run-goal-y');
  ok(x.data.ok && x.data.reward === false && x.data.noreward === 'start' && x.data.left === 3 && x.data.save.data.run.n === 0 && x.data.save.data.run.day === jst(Date.now()),
     "a no-reward goal on a new day → today's count is 0 (not yesterday's 3, not the fake 3)", x.data);
  /* こわれた 値：知らない コース・タイムが 数で ない → なにも 書かない */
  const rev3 = (await getS()).rev;
  x = await call('POST', '/act', { type:'run', course:'moon', ms:30000, rid:'rid-run-goal-bad1' }, rn.token);
  const y = await call('POST', '/act', { type:'run', course:'park', ms:'fast', rid:'rid-run-goal-bad2' }, rn.token);
  ok(x.data.ok === false && x.data.why === 'course' && y.data.ok === false && y.data.why === 'bad' && (await getS()).rev === rev3, 'an unknown course / a time that is not a number → refused, nothing written', { x:x.data, y:y.data });
  /* 走りだしの しるしが こわれていたら（未来の 時刻・知らない コース）すてる */
  await patch(rn.id, d => { d.srv.run = { c:'park', t:Date.now() + 864e5 }; });
  x = await goal('park', 'rid-run-goal-future');
  ok(x.data.ok && x.data.noreward === 'start', 'a runStart time in the future is thrown away → no reward', x.data);
  await patch(rn.id, d => { d.srv.run = { c:'__proto__', t:1 }; });
  x = await goal('park', 'rid-run-goal-proto');
  ok(x.data.ok && x.data.noreward === 'start', 'an odd runStart course is thrown away → no reward', x.data);
}

console.log('rate (1-5：会員ごとの 回数の制限)');
const tom = await joiner('tom');
Deno.env.set('ACT_PER_WINDOW', '5');
let okN = 0, busyN = 0;
const revT0 = (await call('GET', '/save', undefined, tom.token)).data.save.rev;
for (let i = 0; i < 7; i++){
  const x = await call('POST', '/act', { type:'open' }, tom.token);
  if (x.data.ok) okN++; else if (x.data.why === 'busy') busyN++;
}
const revT1 = (await call('GET', '/save', undefined, tom.token)).data.save.rev;
ok(okN === 4 && busyN === 3 && revT1 === revT0 + 4, 'writes: 5 in 10 seconds (the 2nd adopt counted) → then busy, nothing written', { okN, busyN, revT0, revT1 });
r = await call('POST', '/save', { pet:{ ...pet, name:'かえたい' } }, tom.token);
ok(r.status === 429 && r.data.error === 'slow', '/save over the window → 429 slow', r);
await patch(tom.id, d => { d.srv.rt.w -= 11_000; });
r = await call('POST', '/act', { type:'open' }, tom.token);
ok(r.data.ok, '10 seconds later → ok again', r.data);
await patch(tom.id, d => { d.srv.rt.w -= 11_000; d.srv.rt.dn = 3000; });
r = await call('POST', '/act', { type:'open' }, tom.token);
ok(r.data.ok === false && r.data.why === 'busy', '3000 writes in a day → busy', r.data);
Deno.env.set('ACT_PER_WINDOW', '100000');
await patch(tom.id, d => { d.srv.rt.dn = 0; });
Deno.env.set('LOGIN_PER_MIN', '3');
const lous = [];
for (let i = 0; i < 4; i++) lous.push(await call('POST', '/login', { idToken:mkToken('lou' + i, '2012410263', 'Ulou') }));
ok(lous.slice(0, 3).every(x => x.status === 200) && lous[3].status === 429 && lous[3].data.error === 'slow', 'login: 3 a minute per member, then 429 slow', lous.map(x => x.status));
await db`update app.sessions set created_at = created_at - interval '2 minutes' where member_id = ${lous[0].data.member.id}`;
r = await call('POST', '/login', { idToken:mkToken('lou9', '2012410263', 'Ulou') });
ok(r.status === 200, 'a minute later → login ok', r.status);
const same = mkToken('samet', '2012410263', 'Usame');
const vc0 = verifyCalls;
const sames = [];
for (let i = 0; i < 4; i++) sames.push((await call('POST', '/login', { idToken:same })).status);
ok(verifyCalls === vc0 + 1 && sames.join() === '200,200,200,429', 'the same ID token: LINE is asked once; over 3 a minute → 429 before LINE', { calls:verifyCalls - vc0, sames });
Deno.env.set('LOGIN_PER_MIN', '1000');
const ms = Object.fromEntries(Array.from({ length:1000 }, (_, i) => ['m' + i, true]));
const seen = Object.fromEntries(Array.from({ length:3000 }, (_, i) => ['halloween:' + (1000 + i), 1000 + i]));
const capper = (await call('POST', '/login', { idToken:mkToken('capper', '2012410263', 'Ucapper') })).data;
r = await call('POST', '/import', { code:enc({ ...save1, pet:{ ...pet, name:'おおきい' }, milestones:ms, events:{ got:[], seen } }) }, capper.token);
const capSave = r.data && r.data.save && r.data.save.data;
ok(r.status === 200 && Object.keys(capSave.milestones).length === 400 && Object.keys(capSave.events.seen).length === 2000
   && capSave.events.seen['halloween:3999'] && !capSave.events.seen['halloween:1000'], 'import: milestones up to 400, seen events up to 2000 (the newest)',
   capSave && { m:Object.keys(capSave.milestones).length, s:Object.keys(capSave.events.seen).length });

console.log('day quota (1-6：その日の AI・カードは、やめて また はじめても もどらない)');
await db`delete from app.day_quota where kind = 'ai'`;   /* 全員の1日（ためしは5回）を あける */
AI.mode = 'ok';
let quinn = await joiner('quinn');
for (let i = 0; i < 3; i++) await read(quinn.token);
r = await read(quinn.token);
ok(r.data.ok === false && r.data.why === 'limit', 'quinn used 3 reads today', r.data);
for (let i = 0; i < 3; i++) await call('POST', '/card', { image:png(640, 640, 300 + i) }, quinn.token);
r = await call('GET', '/card', undefined, quinn.token);
ok(r.data.card.left === 0, 'quinn made 3 cards today', r.data);
const [{ qrows }] = await db`select count(*)::int as qrows from app.day_quota where day = ${jst(Date.now())}::date`;
r = await call('POST', '/leave', { confirm:'leave', accessToken:null }, quinn.token);
const [{ qrows2 }] = await db`select count(*)::int as qrows2 from app.day_quota where day = ${jst(Date.now())}::date`;
ok(r.data.ok && qrows2 === qrows && qrows >= 2, 'leave: the day\'s counts stay (no member in them)', { qrows, qrows2 });
const q2 = (await call('POST', '/login', { idToken:mkToken('quinn2', '2012410263', 'Uquinn') })).data;
ok(q2.member.id !== quinn.id && q2.ai.left === 0 && q2.card.left === 0, 'logging in again (a new member) → the same day\'s AI and cards are still used up', { ai:q2.ai, card:q2.card });
await call('POST', '/act', { type:'adopt', pet }, q2.token);
r = await read(q2.token);
const r2c = await call('POST', '/card', { image:png(640, 640, 310) }, q2.token);
ok(r.data.why === 'limit' && r2c.data.why === 'limit', 'reads and new cards → limit', { ai:r.data, card:r2c.data });
const w1 = (await db`select encode(who, 'hex') as h from app.day_quota where kind = 'ai' order by n desc limit 1`)[0].h as string;
ok(!/quinn|Uquinn/.test(w1) && w1.length === 64, 'the mark is a SHA-256, not the LINE id', w1);

console.log('daily sweep (1-6・5-2・1-8：1日1回の 掃除。まいごの カードの画像も)');
await db`insert into app.day_quota (day, kind, who, n) values (${jst(Date.now() - 2 * 864e5)}::date, 'ai', decode(repeat('ab', 32), 'hex'), 2)`;
await db`insert into app.day_quota (day, kind, who, n) values (${jst(Date.now() - 864e5)}::date, 'ai', decode(repeat('ac', 32), 'hex'), 1)`;
await db`insert into app.error_counts (day, kind, n) values (${jst(Date.now() - 61 * 864e5)}::date, 'server', 4), (${jst(Date.now() - 59 * 864e5)}::date, 'server', 1)`;
const lostOld = 'o' + '1'.repeat(31) + '.png', lostNew = 'o' + '2'.repeat(31) + '.png', oddName = 'notes.txt';
for (const [nm, ago] of [[lostOld, 2 * 3600e3], [lostNew, 10 * 60e3], [oddName, 5 * 3600e3]] as [string, number][]){ STORE.objects.set(nm, new Uint8Array([1])); STORE.created.set(nm, Date.now() - ago); }
const keptCard = (await db`select name from app.cards limit 1`)[0].name as string;
STORE.created.set(keptCard, Date.now() - 5 * 3600e3);
await db`update app.chores set done_at = now() - interval '2 days'`;
const lists0 = STORE.lists;
await call('POST', '/login', { idToken:mkToken('sweeper', '2012410263', 'Usweeper') });
const qd = (await db`select encode(who, 'hex') as h from app.day_quota where who in (decode(repeat('ab', 32), 'hex'), decode(repeat('ac', 32), 'hex'))`).map((x: any) => x.h.slice(0, 2));
const ed = (await db`select n from app.error_counts where kind = 'server' and day < ${jst(Date.now() - 30 * 864e5)}::date`).map((x: any) => x.n);
ok(qd.join() === 'ac', 'the day\'s counts: yesterday stays, the day before is deleted', qd);
ok(ed.join() === '1', 'error counts older than 60 days are deleted', ed);
ok(STORE.lists > lists0 && !STORE.objects.has(lostOld) && STORE.objects.has(lostNew) && STORE.objects.has(keptCard) && STORE.objects.has(oddName),
   'a lost image (not in the table, over 1 hour) is deleted; a new one, a known card and other names stay', { old:STORE.objects.has(lostOld), nw:STORE.objects.has(lostNew), kept:STORE.objects.has(keptCard) });
const lostOld2 = 'o' + '3'.repeat(31) + '.png';
STORE.objects.set(lostOld2, new Uint8Array([1])); STORE.created.set(lostOld2, Date.now() - 2 * 3600e3);
const lists1 = STORE.lists;
await call('POST', '/login', { idToken:mkToken('sweeper2', '2012410263', 'Usweeper') });
ok(STORE.lists === lists1 && STORE.objects.has(lostOld2), 'only once a day (the next login does not sweep again)', STORE.lists - lists1);

console.log('body (1-9：上限まで 読んだら やめる)');
let pulls = 0;
const stream = new ReadableStream({ pull(c){ pulls++; if (pulls > 200) c.close(); else c.enqueue(new TextEncoder().encode('{"idToken":"' + 'a'.repeat(1000))); } });
const resBig = await handler(new Request('https://x.supabase.co/api/login', { method:'POST', headers:{ origin:ORIGIN, 'content-type':'application/json' }, body:stream, duplex:'half' } as RequestInit));
ok(resBig.status === 413 && pulls < 20, 'no content-length: stops reading at the limit (413)', { status:resBig.status, pulls });
const resBad = await handler(new Request('https://x.supabase.co/api/login', { method:'POST', headers:{ origin:ORIGIN, 'content-type':'application/json' }, body:new Uint8Array([0x7b, 0xff, 0x7d]) }));
ok(resBad.status === 400, 'broken UTF-8 → 400', resBad.status);

console.log('errors (5-2：エラーの数を 数えて /health で返す)');
const e0 = (await call('GET', '/health')).data.errors;
const bea2 = await joiner('bea2');
STORE.mode = 'error';
await call('POST', '/card', { image:png(640, 640, 400) }, bea2.token);
STORE.mode = 'ok';
await db`alter table app.saves rename to saves_away`;
r = await call('GET', '/save', undefined, bea2.token);
await db`alter table app.saves_away rename to saves`;
const e1 = (await call('GET', '/health')).data.errors;
const ek = (await db`select kind, n from app.error_counts where day = ${jst(Date.now())}::date order by kind`).map((x: any) => x.kind);
ok(r.status === 500 && r.data.error === 'server' && typeof e0 === 'number' && e1 >= e0 + 2 && ek.includes('server') && ek.includes('card_storage'),
   'a server error and a storage error are counted (/health: errors in 3 days)', { e0, e1, ek });
const ecols = (await db`select column_name from information_schema.columns where table_schema='app' and table_name='error_counts' order by column_name`).map((x: any) => x.column_name);
ok(ecols.join() === 'day,kind,n', 'error counts keep only the day, the kind and the number', ecols);
await db`alter table app.error_counts rename to error_counts_away`;
const hx = await call('GET', '/health');
await db`alter table app.error_counts_away rename to error_counts`;
ok(hx.status === 200 && hx.data.ok && hx.data.errors === null, 'no error table → /health still ok (errors null)', hx.data);

console.log('notify (よるの おしらせ：オン・オフ・21時に のこっている人だけ 1通)');
{
  const today = jst(Date.now()), yesterday = jst(Date.now() - 864e5), dayBefore = jst(Date.now() - 2 * 864e5);
  const hexOf2 = async (s: string) => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s))), b => b.toString(16).padStart(2, '0')).join('');
  /* cron（app.notify_kick）の まね：きょうの行に 1回きりの 合いことばの ハッシュを 書く */
  const word = async (ageSecs = 0) => {
    const w = Array.from(crypto.getRandomValues(new Uint8Array(32)), b => b.toString(16).padStart(2, '0')).join('');
    await db`insert into app.notify_runs (day, nonce_hash, made_at) values (${today}::date, decode(${await hexOf2(w)}, 'hex'), now() - make_interval(secs => ${ageSecs}))
      on conflict (day) do update set nonce_hash = excluded.nonce_hash, made_at = excluded.made_at, used_at = null, done_at = null, sent = 0, skipped = 0, failed = 0, note = null`;
    return w;
  };
  const run = async (w?: string) => {
    const res = await handler(new Request('https://x.supabase.co/api/notify/run', { method:'POST', headers:w === undefined ? {} : { 'x-notify':w, 'content-type':'application/json' }, body:'{}' }));
    const text = await res.text(); let data: any = null; try { data = JSON.parse(text); } catch { data = text; }
    return { status:res.status, data };
  };
  const runRow = async () => (await db`select used_at is not null as used, done_at is not null as done, sent, skipped, failed, note, nonce_hash is null as cleared from app.notify_runs where day = ${today}::date`)[0];
  const nina = await joiner('nina');
  r = await call('POST', '/login', { idToken:mkToken('nina2', '2012410263', 'Unina') });
  ok(r.status === 200 && r.data.notify && r.data.notify.on === null && r.data.notify.ready === false && r.data.notify.hour === 0,
     'login: not asked yet (null), not ready without the Messaging API token', r.data.notify);
  Deno.env.set('LINE_MESSAGING_TOKEN', 'push-token');
  r = await call('GET', '/notify', undefined, nina.token);
  ok(r.status === 200 && r.data.notify.ready === true && r.data.notify.on === null, 'GET /notify: ready once the token is set', r.data);
  ok((await call('GET', '/health')).data.notify === true, '/health: notify true (the token is set)');
  r = await call('GET', '/notify');
  ok(r.status === 401, 'GET /notify needs a session', r);
  r = await call('POST', '/notify', { on:'yes' }, nina.token);
  ok(r.status === 400 && r.data.error === 'badnotify', 'on must be true or false', r);
  r = await call('POST', '/notify', { on:true }, nina.token);
  ok(r.status === 200 && r.data.notify.on === true, 'turn on', r.data);
  r = await call('POST', '/notify', { on:false }, nina.token);
  ok(r.status === 429 && r.data.error === 'slow', 'once a second at most', r);
  await db`update app.members set notify_at = now() - interval '5 seconds' where id = ${nina.id}`;
  r = await call('POST', '/notify', { on:false }, nina.token);
  ok(r.status === 200 && r.data.notify.on === false, 'turn off', r.data);
  await db`update app.members set notify_at = now() - interval '5 seconds' where id = ${nina.id}`;
  r = await call('POST', '/notify', { on:true }, nina.token);
  ok(r.status === 200 && r.data.notify.on === true, 'turn on again', r.data);
  const [nm] = await db`select notify, notify_at is not null as at, notified_on from app.members where id = ${nina.id}`;
  ok(nm.notify === true && nm.at && nm.notified_on === null, 'stored on the member: on, when, not sent yet', nm);

  /* みんなの ようす：nina＝れんぞく 12日（きのうまで）・きょうは まだ / omar＝きょう ぜんぶ かなえた / quin＝ピンチ（おととい まで 7日）/
     rex＝20日 ひらいていない / sue＝オフ / tom＝きょう もう おくった / vic＝まだ きいていない（null） */
  const omar = await joiner('omar'), quin = await joiner('quin'), rex = await joiner('rex'), sue = await joiner('sue'), tom = await joiner('tom'), vic = await joiner('vic');
  const old = { day:'2000-01-01', list:[], all:false };
  await patch(nina.id, d => { d.daily = old; d.streak = { last:yesterday, n:12, best:12 }; });
  await patch(omar.id, d => { d.daily = { day:today, list:[{ type:'meal', n:2, got:2, done:true }, { type:'play', n:2, got:2, done:true }, { type:'pet', n:10, got:10, done:true }], all:true };
    d.streak = { last:today, n:3, best:3 }; });
  await patch(quin.id, d => { d.daily = old; d.streak = { last:dayBefore, n:7, best:7 }; d.rescued = []; });
  for (const m of [rex, sue, tom, vic]) await patch(m.id, d => { d.daily = old; });
  await db`update app.members set notify = true where id in (${omar.id}, ${quin.id}, ${rex.id}, ${tom.id})`;
  await db`update app.members set notify = false where id = ${sue.id}`;
  await db`update app.members set last_seen_at = now() - interval '20 days' where id = ${rex.id}`;
  await db`update app.members set notified_on = ${today}::date where id = ${tom.id}`;

  r = await run();
  ok(r.status === 403, 'no word → 403', r);
  r = await run('x'.repeat(64));
  ok(r.status === 403, 'a malformed word → 403', r);
  let w = await word();
  r = await run('ab'.repeat(32));
  ok(r.status === 403 && (await runRow()).used === false, 'a wrong word → 403 (the real word is not used)', r);
  w = await word(20 * 60);
  r = await run(w);
  ok(r.status === 403 && PUSH.calls.length === 0, 'an old word (20 minutes) → 403', r);
  if (new Date(Date.now() + 9 * 3600e3 + 180e3).getUTCHours() < 23){   /* 2分の ゆとり（F2-1）より 前のときだけ */
    Deno.env.set('NOTIFY_HOUR', '23');
    w = await word();
    r = await run(w);
    ok(r.status === 409 && r.data.error === 'early' && (await runRow()).used === false && PUSH.calls.length === 0, 'before the hour → 409 early (the word stays)', r);
    Deno.env.set('NOTIFY_HOUR', '0');
  }
  /* 21時の 少し前（2分まで）は ゆとりで うけつける（DB と サーバーの 時計の ずれ。F2-1）。サーバーの 時計を まねて ずらす */
  {
    const realNow = Date.now;
    const at = (h: number, m: number) => Date.parse(`${today}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00+09:00`);
    Deno.env.set('NOTIFY_HOUR', '21');
    const n0 = PUSH.calls.length;
    w = await word();
    let r57: any, r59: any, used57 = true;
    try {
      Date.now = () => at(20, 57);
      r57 = await run(w);
      used57 = (await runRow()).used;
      Date.now = () => at(20, 59);
      r59 = await run(w);
    } finally { Date.now = realNow; Deno.env.set('NOTIFY_HOUR', '0'); }
    const row59 = await runRow();
    ok(r57.status === 409 && r57.data.error === 'early' && !used57 && r59.status === 200 && row59.used && row59.done && PUSH.calls.length === n0 + 2,
       '3 minutes before 21:00 → 409 early (the word stays); 1 minute before → accepted (2 minutes of slack)', { r57, r59, row59 });
    /* この回で おくった 2人を もとに もどす（下の 21時の回で もう一度 たしかめる） */
    PUSH.calls.length = n0;
    await db`update app.members set notified_on = null where id in (${nina.id}, ${quin.id})`;
  }
  w = await word();
  r = await run(w);
  const row1 = await runRow();
  const to = PUSH.calls.map(c => c.body.to).sort();
  ok(r.status === 200 && r.data.ok && r.data.day === today, 'the run: 200', r);
  ok(to.join() === 'Unina,Uquin', 'sent only to members who are on, opened in 14 days, not sent today, with requests left (nina・quin)', to);
  ok(row1.used && row1.done && row1.cleared && row1.sent === 2 && row1.skipped === 1 && row1.failed === 0 && row1.note === null,
     'the run row: used (hash cleared), done, 2 sent, 1 skipped (omar: all done)', row1);
  const pn = PUSH.calls.find(c => c.body.to === 'Unina')!, pq = PUSH.calls.find(c => c.body.to === 'Uquin')!;
  const flat = (o: any) => JSON.stringify(o);
  ok(pn.auth === 'Bearer push-token' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(pn.key || '') && pn.key !== pq.key,
     'the token from Secrets, a retry key (UUID) per member and day', { auth:pn.auth, key:pn.key });
  const m0 = pn.body.messages[0];
  ok(pn.body.messages.length === 1 && m0.type === 'flex' && m0.altText === 'ためし2：きょうのおねがい、あと3つ'
     && flat(m0).includes('🌙 ためし2より') && flat(m0).includes('きょうのおねがいが、あと3つのこっているよ。ねるまえに、すこしあいにきてね')
     && flat(m0).includes('"れんぞく12日"') && flat(m0).includes('https://miniapp.line.me/2012410265-PutgsCLS') && flat(m0).includes('うちのこ日和をひらく') && !/ (おねがい|あと|のこって|まえに|すこし|ひらく)/.test(flat(m0)),
     'nina: the name, 3 left, the streak chip, the button to the mini app', m0);
  ok(!flat(pn.body).includes(nina.id) && !flat(pn.body).includes('photo'), 'no member id or photo in the message');
  ok(flat(pq.body).includes('れんぞく7日がピンチ！おたすけのおねがいもいれて、あと4つ。きょうのうちに、あいにきてね') && !flat(pq.body).includes('"れんぞく7日"'),
     'quin (pinch): the rescue request counts (4 left), no chip', pq.body.messages[0].contents.body);
  const sentOn = (await db`select id::text as id, notified_on::text as d from app.members where id in (${nina.id}, ${omar.id}, ${quin.id}, ${rex.id})`)
    .reduce((o: any, x: any) => (o[x.id] = x.d, o), {});
  ok(sentOn[nina.id] === today && sentOn[quin.id] === today && sentOn[omar.id] === null && sentOn[rex.id] === null, 'marked as sent today only where sent', sentOn);
  const [{ saves }] = await db`select count(*)::int as saves from app.saves where member_id = ${nina.id} and data->'daily'->>'day' = ${today}`;
  ok(saves === 0, 'the run does not change the saves (it only reads them)', saves);
  r = await run(w);
  ok(r.status === 403, 'the same word again → 403 (once)', r);
  const n1 = PUSH.calls.length;
  w = await word();
  r = await run(w);
  ok(r.status === 200 && PUSH.calls.length === n1 && (await runRow()).sent === 0, 'another run the same day → nobody gets a second one', { calls:PUSH.calls.length - n1 });

  /* つぎの日の まね（notified_on を きのうに）：月の 通数の 上限 → そこで やめる */
  await db`update app.members set notified_on = ${yesterday}::date where id in (${nina.id}, ${quin.id})`;
  PUSH.mode = 'limit';
  const n2 = PUSH.calls.length;
  w = await word();
  r = await run(w);
  const row2 = await runRow();
  const lim = (await db`select n from app.error_counts where day = ${today}::date and kind = 'notify_limit'`)[0];
  ok(r.status === 200 && PUSH.calls.length === n2 + 1 && row2.failed === 1 && row2.sent === 0 && row2.note === 'limit' && lim && lim.n >= 1,
     'monthly limit (429) → stops after the first, counted as notify_limit', { row2, calls:PUSH.calls.length - n2 });
  /* 500 は 同じ キーで 1回 おくりなおす */
  await db`update app.members set notified_on = ${yesterday}::date where id in (${nina.id}, ${quin.id})`;
  PUSH.mode = 'flaky'; PUSH.flaked = false;
  const n3 = PUSH.calls.length;
  w = await word();
  r = await run(w);
  const tries = PUSH.calls.slice(n3);
  const row3 = await runRow();
  ok(row3.sent === 2 && row3.failed === 0 && tries.length === 3 && tries[0].key === tries[1].key, 'a 500 is retried once with the same retry key', { row3, keys:tries.map(t => t.key && t.key.slice(0, 8)) });
  PUSH.mode = 'ok';
  /* 回数の 制限の 429（月の 上限で ないもの）は おくりなおさず、その人を しっぱいに 数えて つぎの人へ（F4-1） */
  await db`update app.members set notified_on = ${yesterday}::date where id in (${nina.id}, ${quin.id})`;
  PUSH.mode = 'busy429';
  const n5 = PUSH.calls.length;
  const p0 = Number(((await db`select n from app.error_counts where day = ${today}::date and kind = 'notify_push'`)[0] || { n:0 }).n);
  w = await word();
  r = await run(w);
  const row5 = await runRow();
  const p1 = Number(((await db`select n from app.error_counts where day = ${today}::date and kind = 'notify_push'`)[0] || { n:0 }).n);
  ok(row5.done && row5.failed === 2 && row5.sent === 0 && row5.note === null && PUSH.calls.length === n5 + 2 && p1 === p0 + 2,
     'a rate-limit 429 (not the monthly limit) is not retried: each counted as failed (notify_push), the run goes on', { row5, calls:PUSH.calls.length - n5, p0, p1 });
  PUSH.mode = 'ok';
  /* 1人の セーブで ルールが 例外を 出しても、その人だけ とばして ほかの人には おくる（F2-2） */
  await db`update app.members set notified_on = ${yesterday}::date where id in (${nina.id}, ${quin.id})`;
  await patch(nina.id, d => { d.pet.name = 'こわれ'; });
  const rl = Rules.reqLeft;
  Rules.reqLeft = function(st: any){ if (st && st.pet && st.pet.name === 'こわれ') throw new Error('boom'); return rl.apply(this, arguments as any); };
  const n6 = PUSH.calls.length;
  let row6: any;
  try {
    w = await word();
    r = await run(w);
    row6 = await runRow();
  } finally { Rules.reqLeft = rl; }
  const one = (await db`select n from app.error_counts where day = ${today}::date and kind = 'notify_one'`)[0];
  const to6 = PUSH.calls.slice(n6).map(c => c.body.to);
  ok(r.status === 200 && row6.done && row6.sent === 1 && row6.failed === 1 && row6.note === null && to6.join() === 'Uquin' && one && one.n >= 1,
     'a save that makes the rules throw → that member is skipped (failed・notify_one), the others still get theirs', { row6, to6, one });
  await patch(nina.id, d => { d.pet.name = 'ためし2'; });
  /* トークンが ない → おくらない */
  await db`update app.members set notified_on = ${yesterday}::date where id in (${nina.id}, ${quin.id})`;
  Deno.env.set('LINE_MESSAGING_TOKEN', '');
  const n4 = PUSH.calls.length;
  w = await word();
  r = await run(w);
  ok(r.status === 200 && PUSH.calls.length === n4 && (await runRow()).note === 'notoken', 'no token → nothing sent (note notoken)', await runRow());
  r = await call('GET', '/notify', undefined, nina.token);
  ok(r.data.notify.ready === false && r.data.notify.on === true, 'GET /notify: not ready without the token (the switch stays on)', r.data.notify);
  Deno.env.set('LINE_MESSAGING_TOKEN', 'push-token');
  /* /health：この3日（きのうから）の 回が おわったか・合図だけ（だれか・何人かは 出さない。F2-3） */
  {
    Deno.env.set('NOTIFY_SINCE', '2000-01-01');   /* ほんとうは はじめた日（2026-11-14）より 前の 日は 見ない */
    const d1 = jst(Date.now() - 864e5), d2 = jst(Date.now() - 2 * 864e5), d3 = jst(Date.now() - 3 * 864e5);
    await db`delete from app.notify_runs where day in (${d1}::date, ${d2}::date, ${d3}::date)`;
    await db`insert into app.notify_runs (day, made_at, used_at, done_at, sent, note) values
      (${d1}::date, now(), now(), now(), 3, null), (${d2}::date, now(), null, null, 0, null), (${d3}::date, now(), now(), now(), 0, 'notoken')`;
    const hd = (await call('GET', '/health')).data.notifyDays as any[];
    const want = [{ day:d1, kicked:true, ran:true, done:true, note:null }, { day:d2, kicked:true, ran:false, done:false, note:null }, { day:d3, kicked:true, ran:true, done:true, note:'notoken' }];
    ok(JSON.stringify(hd) === JSON.stringify(want), '/health notifyDays: the last 3 days (ran・done・note), no counts or ids', hd);
    await db`delete from app.notify_runs where day = ${d1}::date`;
    const hd2 = (await call('GET', '/health')).data.notifyDays as any[];
    ok(hd2[0].day === d1 && hd2[0].kicked === false && hd2[0].ran === false && hd2[0].done === false, '/health notifyDays: a day with no run row (cron did not run) shows kicked false', hd2);
    ok(!JSON.stringify(hd).match(/sent|member|sub/), '/health notifyDays: nothing about who or how many');
    Deno.env.set('NOTIFY_SINCE', jst(Date.now()));
    ok(JSON.stringify((await call('GET', '/health')).data.notifyDays) === '[]', '/health notifyDays: days before the start (NOTIFY_SINCE) are not shown');
    Deno.env.delete('NOTIFY_SINCE');
    await db`delete from app.notify_runs where day in (${d2}::date, ${d3}::date)`;
  }
  /* やめると いっしょに 消える */
  await call('POST', '/leave', { confirm:'leave' }, quin.token);
  const [{ q }] = await db`select count(*)::int as q from app.members where id = ${quin.id}`;
  ok(q === 0, 'leave removes the notify setting with the member', q);
  /* 60日より前の 回は 1日1回の 掃除で 消える */
  await db`insert into app.notify_runs (day, sent) values (${jst(Date.now() - 70 * 864e5)}::date, 1), (${jst(Date.now() - 10 * 864e5)}::date, 1) on conflict do nothing`;
  await db`update app.chores set done_at = now() - interval '2 days'`;
  await call('POST', '/login', { idToken:mkToken('sweeper3', '2012410263', 'Usweeper') });
  const keptRuns = (await db`select day::text as d from app.notify_runs where day < ${today}::date order by day`).map((x: any) => x.d);
  ok(keptRuns.join() === jst(Date.now() - 10 * 864e5), 'runs older than 60 days are swept', keptRuns);
  const ncols = (await db`select column_name from information_schema.columns where table_schema='app' and table_name='notify_runs' order by column_name`).map((x: any) => x.column_name);
  ok(!ncols.some((c: string) => /member|sub|user/.test(c)), 'the run rows keep no member or LINE id', ncols);
}

console.log('role (1-10：app の表だけ さわれる役 uchinoko_api)');
await db`create table if not exists public.not_app (x int)`;
const can: Record<string, boolean> = {};
try {
  await db.begin(async (tx: any) => {
    await tx`set local role uchinoko_api`;
    const tryIt = async (k: string, f: (q: any) => Promise<unknown>) => { try { await tx.savepoint(f); can[k] = true; } catch { can[k] = false; } };
    await tryIt('read saves', async q => { const [x] = await q`select count(*)::int as n from app.saves`; if (!(x.n > 0)) throw new Error('rls hides rows'); });
    await tryIt('new member', q => q`insert into app.members default values`);
    await tryIt('lock', q => q`select pg_advisory_xact_lock(hashtextextended('x', 0))`);
    await tryIt('quota', q => q`insert into app.day_quota (day, kind, who, n) values (current_date, 'card', decode(repeat('cd', 32), 'hex'), 1)`);
    await tryIt('errors', q => q`insert into app.error_counts (day, kind, n) values (current_date, 'role_test', 1)`);
    await tryIt('chores', q => q`update app.chores set done_at = now()`);
    await tryIt('cards', q => q`select count(*) from app.cards`);
    await tryIt('backups', q => q`select count(*) from app.save_backups`);
    await tryIt('notify runs', q => q`update app.notify_runs set note = null where false`);
    await tryIt('delete member (cascade)', q => q`delete from app.members where id = (select member_id from app.saves limit 1)`);
    await tryIt('other schema', q => q`select * from public.not_app`);
    await tryIt('create table', q => q`create table app.evil (x int)`);
    await tryIt('drop table', q => q`drop table app.saves`);
    throw new Error('rollback');
  });
} catch { /* もどす */ }
ok(can['read saves'] && can['new member'] && can['lock'] && can['quota'] && can['errors'] && can['chores'] && can['cards'] && can['backups'] && can['notify runs'] && can['delete member (cascade)']
   && !can['other schema'] && !can['create table'] && !can['drop table'], 'the role reads and writes app tables (RLS opened only for it), nothing else', can);
const [{ anonp }] = await db`select count(*)::int as anonp from pg_policies where schemaname = 'app' and not ('uchinoko_api' = any(roles))`;
ok(anonp === 0, 'no policy for other roles (anon・authenticated see nothing)', anonp);
await db.end();

console.log(fails ? `\n${fails} FAILED` : '\nall passed');
Deno.exit(fails ? 1 : 0);
