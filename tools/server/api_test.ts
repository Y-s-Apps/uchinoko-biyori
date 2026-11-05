/* サーバーの関数（supabase/functions/api/index.ts）の確認。tools/line_e2e.py から動かす。
 * DB は PGlite（メモリの中の Postgres）、LINE の IDトークンの検証（api.line.me）だけを、ここでまねる。
 * 本人確認・セーブ（rev のぶつかり、ensureState、写真を置かない）・取りこみ（1回だけ）・セッションの上限と期限を見る。 */
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
const pet = { name:'ためし', species:'dog', breedId:'pom', look:{ species:'dog', breedId:'pom' }, photo:'data:image/jpeg;base64,AAAA', colorName:'クリーム', wear:{ head:null, face:null, neck:'scarf_tri' } };
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

console.log('save');
r = await call('GET', '/save');
ok(r.status === 401 && r.data.error === 'nosession', 'no session', r);
r = await call('GET', '/save', undefined, 'A'.repeat(43));
ok(r.status === 401, 'unknown session', r);
r = await call('GET', '/save', undefined, alice);
ok(r.status === 200 && r.data.save === null && r.data.importable === true, 'empty save', r);
r = await call('POST', '/save', { data:save1, baseRev:null }, alice);
ok(r.status === 200 && r.data.rev === 1, 'first save', r);
r = await call('GET', '/save', undefined, alice2);
ok(r.status === 200 && r.data.save.rev === 1 && r.data.save.data.pet.photo === null && r.data.save.data.pet.name === 'ためし'
  && r.data.save.data.room && Array.isArray(r.data.save.data.stamps) && r.data.save.data.stats.love === 120, 'read back (photo stripped, ensureState applied)', r.data);
r = await call('POST', '/save', { data:save1, baseRev:null }, alice);
ok(r.status === 409 && r.data.error === 'conflict' && r.data.save.rev === 1, 'create again → conflict', r);
r = await call('POST', '/save', { data:{ ...save1, stats:{ full:'x', mood:999, love:-5 } }, baseRev:1 }, alice);
ok(r.status === 200 && r.data.rev === 2, 'update with baseRev', r);
r = await call('GET', '/save', undefined, alice);
ok(r.data.save.data.stats.full === 70 && r.data.save.data.stats.mood === 100 && r.data.save.data.stats.love === 0, 'numbers coerced like ensureState', r.data.save.data.stats);
r = await call('POST', '/save', { data:save1, baseRev:1 }, alice);
ok(r.status === 409 && r.data.save.rev === 2, 'stale baseRev → conflict with current', r);
r = await call('POST', '/save', { data:{ v:1 }, baseRev:2 }, alice);
ok(r.status === 400 && r.data.error === 'badsave', 'no pet → badsave', r);
r = await call('POST', '/save', { data:save1, baseRev:'2' }, alice);
ok(r.status === 400 && r.data.error === 'badrev', 'string rev → badrev', r);
r = await call('GET', '/save', undefined, bob);
ok(r.data.save === null, 'bob cannot see alice', r);
const big = { ...save1, album:Array.from({ length:300 }, (_, i) => ({ t:i, k:'x', ti:'あ'.repeat(40), su:'い'.repeat(5000), ic:'' })) };
r = await call('POST', '/save', { data:big, baseRev:2 }, alice);
ok(r.status === 413 || r.status === 200, 'big save handled (413 or trimmed)', { status:r.status });

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

console.log('sessions');
const db = postgres(DB, { prepare:false, max:1 });
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
