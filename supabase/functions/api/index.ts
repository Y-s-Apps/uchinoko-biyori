/* うちのこ日和（LINE版）のサーバー：本人確認とセーブ
 *
 *   POST /login   { idToken }        LINE の IDトークンを検証 → 会員ID → 自前のセッション（とセーブ）を返す
 *   GET  /save                       セーブを読む
 *   POST /save    { data, baseRev }  セーブを書く（baseRev が今の rev とちがえば 409 と今のセーブ）
 *   POST /import  { code }           引っこしコード（この端末の子も同じ形で送る）を取りこむ。1人1回だけ
 *   GET  /health                     動いているか・サーバーの時刻
 *
 * - IDトークンは https://api.line.me/oauth2/v2.1/verify で検証し、sub だけを使う（プロフィールの値は使わない）。
 *   LINE のトークンは保存しない。セッションのトークンは端末のメモリだけに置き、DB にはハッシュだけを持つ。
 * - セッションは x-session ヘッダーで受けとる（Authorization は Supabase の入口が JWT として読むので使わない）。
 * - セーブは画面と同じ ensureState() を通し、写真の控えは null にする。
 *   game.js は tools/build_server.py が src/ から作り、deno.json の "uchinoko-game" が
 *   GitHub に push したコミットの game.js を指す（デプロイで送るのは index.ts と deno.json だけ）。
 * - ログにトークンやセーブの中身を出さない。
 * - デプロイは verify_jwt: false（自前のセッションで確かめるため）。
 */
import postgres from 'npm:postgres@3.4.5';
import { ensureState, readMoveCode, MOVE_MAX, dayKey } from 'uchinoko-game';

const env = (k: string, d = '') => (Deno.env.get(k) ?? d).trim();
/* LINEミニアプリチャネルのチャネルID（LIFF ID の前半）。秘密ではない。カンマで複数 */
const CHANNELS = env('LINE_CHANNEL_IDS', '2012410263').split(',').map(s => s.trim()).filter(Boolean);
/* 画面の置き場所。Cloudflare Pages のプレビュー（<hash>.uchinoko-biyori.pages.dev）も通す */
const ORIGINS = env('ALLOWED_ORIGINS', 'https://uchinoko-biyori.pages.dev').split(',').map(s => s.trim()).filter(Boolean);
const PREVIEW = /^https:\/\/[a-z0-9-]+\.uchinoko-biyori\.pages\.dev$/;
const LINE_VERIFY = 'https://api.line.me/oauth2/v2.1/verify';
const SESSION_HOURS = 24;
const SESSIONS_PER_MEMBER = 10;
const SAVE_MAX = 1_500_000;          /* セーブの JSON の文字数の上限（写真なしで、ふつうは 100KB より小さい） */
const BODY_MAX = { login:8_000, save:SAVE_MAX + 2_000, import:MOVE_MAX + 2_000 } as const;

const sql = postgres(env('SUPABASE_DB_URL'), { prepare:false, max:3, idle_timeout:20, connect_timeout:10 });

class HttpError extends Error {
  constructor(public status: number, public code: string, public extra: Record<string, unknown> = {}){ super(code); }
}

function corsHeaders(origin: string | null): Record<string, string> {
  const h: Record<string, string> = { 'Vary':'Origin' };
  if (origin && (ORIGINS.includes(origin) || PREVIEW.test(origin))){
    h['Access-Control-Allow-Origin'] = origin;
    h['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    h['Access-Control-Allow-Headers'] = 'content-type, x-session';
    h['Access-Control-Max-Age'] = '600';
  }
  return h;
}
function json(body: unknown, status: number, origin: string | null): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers:{ ...corsHeaders(origin), 'Content-Type':'application/json; charset=utf-8', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff' },
  });
}

async function readBody(req: Request, max: number): Promise<Record<string, unknown>> {
  const len = Number(req.headers.get('content-length') || 0);
  if (len > max) throw new HttpError(413, 'toolarge');
  const text = await req.text();
  if (text.length > max) throw new HttpError(413, 'toolarge');
  let v: unknown = null;
  try { v = JSON.parse(text); } catch { throw new HttpError(400, 'badjson'); }
  if (!v || typeof v !== 'object' || Array.isArray(v)) throw new HttpError(400, 'badjson');
  return v as Record<string, unknown>;
}

const b64url = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
async function sha256hex(s: string): Promise<string> {
  const d = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)));
  return Array.from(d, b => b.toString(16).padStart(2, '0')).join('');
}
function tokenAud(idToken: string): string | null {
  try {
    const p = idToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const o = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(p + '='.repeat((4 - p.length % 4) % 4)), c => c.charCodeAt(0))));
    return typeof o.aud === 'string' ? o.aud : null;
  } catch { return null; }
}

/* LINE の IDトークンを LINE のサーバーで検証して sub を返す。aud はどのチャネルで確かめるかを選ぶためだけに読む */
async function verifyLine(idToken: unknown): Promise<string> {
  if (typeof idToken !== 'string' || idToken.length > 4096 || !/^[\w-]+\.[\w-]+\.[\w-]*$/.test(idToken)) throw new HttpError(401, 'badtoken');
  const aud = tokenAud(idToken);
  if (!aud || !CHANNELS.includes(aud)) throw new HttpError(401, 'badtoken');
  let res: Response;
  try {
    res = await fetch(LINE_VERIFY, {
      method:'POST',
      headers:{ 'Content-Type':'application/x-www-form-urlencoded' },
      body:new URLSearchParams({ id_token:idToken, client_id:aud }),
      signal:AbortSignal.timeout(8000),
    });
  } catch { throw new HttpError(503, 'line_unavailable'); }
  if (res.status >= 500) throw new HttpError(503, 'line_unavailable');
  let v: Record<string, unknown> = {};
  try { v = await res.json(); } catch { /* 下で弾く */ }
  if (!res.ok) throw new HttpError(401, String(v.error_description || '').includes('expired') ? 'expired' : 'badtoken');
  const sub = v.sub;
  if (v.iss !== 'https://access.line.me' || v.aud !== aud || typeof sub !== 'string' || !sub || sub.length > 64 || !(Number(v.exp) * 1000 > Date.now())) {
    throw new HttpError(401, 'badtoken');
  }
  return sub;
}

async function sessionMember(req: Request): Promise<string> {
  const t = req.headers.get('x-session') || '';
  if (!/^[A-Za-z0-9_-]{43}$/.test(t)) throw new HttpError(401, 'nosession');
  const hex = await sha256hex(t);
  const [r] = await sql`select member_id from app.sessions where token_hash = decode(${hex}, 'hex') and expires_at > now()`;
  if (!r) throw new HttpError(401, 'nosession');
  return r.member_id as string;
}

type SaveRow = { data: Record<string, unknown>; rev: number; updated_at: Date };
const saveOut = (r: SaveRow | undefined) => r ? { data:r.data, rev:r.rev, updatedAt:new Date(r.updated_at).getTime() } : null;
async function currentSave(member: string) {
  const [r] = await sql<SaveRow[]>`select data, rev::int as rev, updated_at from app.saves where member_id = ${member}`;
  return saveOut(r);
}

/* 画面と同じ確かめ（ensureState）を通す。写真の控えはサーバーに置かない */
type Json = Parameters<typeof sql.json>[0];
function cleanSave(raw: unknown): Json {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new HttpError(400, 'badsave');
  const st = JSON.parse(JSON.stringify(raw));
  if (!st.pet || typeof st.pet !== 'object' || Array.isArray(st.pet)) throw new HttpError(400, 'badsave');
  ensureState(st);
  st.pet.photo = null;
  if (JSON.stringify(st).length > SAVE_MAX) throw new HttpError(413, 'toolarge');
  return st as Json;
}

async function login(req: Request) {
  const body = await readBody(req, BODY_MAX.login);
  const sub = await verifyLine(body.idToken);
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const token = b64url(bytes);
  const hex = await sha256hex(token);
  const out = await sql.begin(async tx => {
    await tx`select pg_advisory_xact_lock(hashtextextended(${'line:' + sub}, 0))`;
    const [acc] = await tx`select member_id from app.line_accounts where sub = ${sub}`;
    let member = acc ? acc.member_id as string : null;
    if (!member){
      const [m] = await tx`insert into app.members default values returning id`;
      member = m.id as string;
      await tx`insert into app.line_accounts (sub, member_id) values (${sub}, ${member})`;
    } else {
      await tx`update app.members set last_seen_at = now() where id = ${member}`;
    }
    await tx`delete from app.sessions where expires_at < now()`;
    await tx`delete from app.sessions where token_hash in (
      select token_hash from app.sessions where member_id = ${member} order by created_at desc offset ${SESSIONS_PER_MEMBER - 1})`;
    const [s] = await tx`insert into app.sessions (token_hash, member_id, expires_at)
      values (decode(${hex}, 'hex'), ${member}, now() + make_interval(hours => ${SESSION_HOURS})) returning expires_at`;
    const [mem] = await tx`select imported_at from app.members where id = ${member}`;
    const [sv] = await tx<SaveRow[]>`select data, rev::int as rev, updated_at from app.saves where member_id = ${member}`;
    return { member, expiresAt:new Date(s.expires_at).getTime(), importable:!mem.imported_at, save:saveOut(sv) };
  });
  return { token, expiresAt:out.expiresAt, member:{ id:out.member, importable:out.importable }, save:out.save, now:Date.now() };
}

async function getSave(member: string) {
  const [mem] = await sql`select imported_at from app.members where id = ${member}`;
  return { save:await currentSave(member), importable:!!mem && !mem.imported_at, now:Date.now() };
}

async function putSave(req: Request, member: string) {
  const body = await readBody(req, BODY_MAX.save);
  const data = cleanSave(body.data);
  const base = body.baseRev;
  let rows: { rev: number; updated_at: Date }[];
  if (base == null){
    rows = await sql`insert into app.saves (member_id, data) values (${member}, ${sql.json(data)})
      on conflict (member_id) do nothing returning rev::int as rev, updated_at`;
  } else {
    if (!Number.isSafeInteger(base) || (base as number) < 1) throw new HttpError(400, 'badrev');
    rows = await sql`update app.saves set data = ${sql.json(data)}, rev = rev + 1, updated_at = now()
      where member_id = ${member} and rev = ${base as number} returning rev::int as rev, updated_at`;
  }
  if (!rows.length) throw new HttpError(409, 'conflict', { save:await currentSave(member) });
  return { rev:rows[0].rev, updatedAt:new Date(rows[0].updated_at).getTime() };
}

async function importCode(req: Request, member: string) {
  const body = await readBody(req, BODY_MAX.import);
  if (typeof body.code !== 'string') throw new HttpError(400, 'badcode', { reason:'empty' });
  const r = readMoveCode(body.code);
  if (!r.st) throw new HttpError(400, 'badcode', { reason:r.reason });
  const data = cleanSave(r.st);
  const out = await sql.begin(async tx => {
    const [mem] = await tx`select imported_at from app.members where id = ${member} for update`;
    if (!mem) throw new HttpError(401, 'nosession');
    if (mem.imported_at) throw new HttpError(409, 'already');
    const [sv] = await tx<SaveRow[]>`insert into app.saves (member_id, data) values (${member}, ${sql.json(data)})
      on conflict (member_id) do update set data = excluded.data, rev = app.saves.rev + 1, updated_at = now()
      returning data, rev::int as rev, updated_at`;
    await tx`update app.members set imported_at = now() where id = ${member}`;
    return sv;
  });
  return { save:saveOut(out), importable:false };
}

async function route(req: Request): Promise<unknown> {
  const path = new URL(req.url).pathname.replace(/^.*?\/api(?=\/|$)/, '') || '/';
  const m = req.method;
  if (path === '/health' && m === 'GET') return { ok:true, now:Date.now(), day:dayKey() };
  if (path === '/login' && m === 'POST') return await login(req);
  if (path === '/save' && m === 'GET') return await getSave(await sessionMember(req));
  if (path === '/save' && m === 'POST') return await putSave(req, await sessionMember(req));
  if (path === '/import' && m === 'POST') return await importCode(req, await sessionMember(req));
  throw new HttpError(404, 'notfound');
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get('origin');
  if (req.method === 'OPTIONS') return new Response(null, { status:204, headers:corsHeaders(origin) });
  try {
    return json(await route(req), 200, origin);
  } catch (e) {
    if (e instanceof HttpError) return json({ error:e.code, ...e.extra }, e.status, origin);
    console.error('api error:', e instanceof Error ? e.name + ': ' + e.message.slice(0, 200) : 'unknown');
    return json({ error:'server' }, 500, origin);
  }
});
