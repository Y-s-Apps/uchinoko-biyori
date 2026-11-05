/* うちのこ日和（LINE版）のサーバー：本人確認、セーブ、おせわの判定
 *
 *   POST /login   { idToken }        LINE の IDトークンを検証 → 会員ID → 自前のセッション（とセーブ）を返す
 *   GET  /save                       セーブを読む
 *   POST /act     { type, … }        おせわ（open・feed・treat・play・pet・trick・dress・room・season）を、
 *                                    サーバーの時刻（日付は日本時間）と乱数で判定して、できごととセーブを返す。
 *                                    adopt { pet } は新しい子（まっさら）をむかえる
 *   POST /save    { pet }            名前・みため（種類・毛色・顔つき）だけを書く。数字や記録は受けとらない
 *   POST /import  { code }           引っこしコード（この端末の子も同じ形で送る）を取りこむ。1人1回だけ
 *   GET  /ai                         AIの読みとりが使えるか・きょうの のこり回数
 *   POST /read    { image }          AIの読みとり：端末で小さくした写真（JPEG）を Claude に送り、種類・毛色・耳やしっぽの形を返す。
 *                                    1人1日 AI_PER_DAY 回・全員で1日 AI_ALL_PER_DAY 回まで（日本時間の日付）。写真も結果も保存しない
 *   GET  /health                     動いているか・サーバーの時刻
 *
 * - おなか・ごきげんの減り、おやつの回数、おみやげ、きょうのおねがい、連続記録とおたすけ、季節のイベント、
 *   記念日、げいの上限、なでなでのなかよしは、ぜんぶここ（画面と同じ js_rules.js の Rules）で決める。
 *   画面の時計や数字は使わないので、端末の時計を動かしても得をしない。
 * - おせわ（ごはん・おやつ・あそぶ・げい）は、前のおせわから 2.5 秒あける（画面の動きより短い）。
 * - IDトークンは https://api.line.me/oauth2/v2.1/verify で検証し、sub だけを使う（プロフィールの値は使わない）。
 *   LINE のトークンは保存しない。セッションのトークンは端末のメモリだけに置き、DB にはハッシュだけを持つ。
 * - セッションは x-session ヘッダーで受けとる（Authorization は Supabase の入口が JWT として読むので使わない）。
 * - セーブは画面と同じ ensureState() を通し、写真の控えは null にする。
 *   game.js は tools/build_server.py が src/ から作り、deno.json の "uchinoko-game" が
 *   GitHub に push したコミットの game.js を指す（デプロイで送るのは index.ts と deno.json だけ）。
 * - ログにトークンやセーブの中身、写真、AIの返事を出さない。
 * - AIの鍵（ANTHROPIC_API_KEY）は Supabase の Edge Function の秘密（Secrets）にだけ置く。ないときは読みとりを休む。
 * - デプロイは verify_jwt: false（自前のセッションで確かめるため）。
 */
import postgres from 'npm:postgres@3.4.5';
import { ensureState, readMoveCode, MOVE_MAX, dayKey, Rules, newState, normalizeLook, buildPrompt, parseAI } from 'uchinoko-game';

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
/* AIの読みとり。モデルと上限は Secrets（環境変数）で変えられる。鍵がなければ読みとりは休み（画面は色ひろい・種類からえらぶ） */
const AI_KEY = env('ANTHROPIC_API_KEY');
const AI_URL = env('AI_URL', 'https://api.anthropic.com/v1/messages');
const AI_MODEL = env('AI_MODEL', 'claude-haiku-5-5');
const intEnv = (k: string, d: number, hi: number) => { const n = Math.floor(Number(env(k, String(d)))); return Number.isFinite(n) ? Math.min(hi, Math.max(0, n)) : d; };
const AI_PER_DAY = intEnv('AI_PER_DAY', 3, 50);           /* 1人1日（日本時間の0時で戻る） */
const AI_ALL_PER_DAY = intEnv('AI_ALL_PER_DAY', 300, 100_000);  /* 全員あわせて1日 */
const AI_TIMEOUT_MS = 45_000;
const IMAGE_MAX = 400_000;           /* 写真（base64）の文字数の上限。端末で はば768pxまでに小さくするので、ふつうは 150KB くらい */
const BODY_MAX = { login:8_000, save:8_000, act:8_000, import:MOVE_MAX + 2_000, read:IMAGE_MAX + 2_000 } as const;
const CARE = new Set(['feed', 'treat', 'play', 'trick']);
const CARE_GAP_MS = 2_500;
const STROKE_MAX = 12;

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
  return { token, expiresAt:out.expiresAt, member:{ id:out.member, importable:out.importable }, save:out.save, ai:await aiStatus(out.member), now:Date.now() };
}

async function getSave(member: string) {
  const [mem] = await sql`select imported_at from app.members where id = ${member}`;
  return { save:await currentSave(member), importable:!!mem && !mem.imported_at, now:Date.now() };
}

/* 名前・みためだけ（引っこしコードの読みとりと同じ形にそろえる）。写真ときせかえは入れない */
type Pet = { name: string; species: string; breedId: string; look: Record<string, unknown>; colorName: string };
function cleanPet(raw: unknown): Pet {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new HttpError(400, 'badpet');
  const p = raw as Record<string, unknown>;
  const look = normalizeLook((p.look && typeof p.look === 'object' ? p.look : p) as Record<string, unknown>);
  const name = String(p.name ?? '').trim().slice(0, 10) || 'うちのこ';
  return { name, species:look.species, breedId:look.breedId, look, colorName:typeof p.colorName === 'string' ? p.colorName.slice(0, 14) : '' };
}

/* サーバーだけが使う控え（画面には関係ない）：なでなでのなかよしの残り、前のおせわの時刻 */
type Srv = { pb: { left: number; t: number }; cd: number };
function srvOf(st: Record<string, unknown>, t: number): Srv {
  const o = (st.srv && typeof st.srv === 'object' ? st.srv : {}) as Record<string, unknown>;
  const pb = (o.pb && typeof o.pb === 'object' ? o.pb : {}) as Record<string, unknown>;
  const n = (v: unknown, d: number, lo: number, hi: number) => { const x = Number(v); return Number.isFinite(x) ? Math.min(hi, Math.max(lo, x)) : d; };
  const srv = { pb:{ left:n(pb.left, STROKE_MAX, 0, STROKE_MAX), t:n(pb.t, t, 0, t) }, cd:n(o.cd, 0, 0, t) };
  st.srv = srv;
  return srv;
}

async function writeSave(tx: postgres.TransactionSql, member: string, st: Record<string, unknown>) {
  (st.pet as Record<string, unknown>).photo = null;
  st.updated = Date.now();
  if (JSON.stringify(st).length > SAVE_MAX) throw new HttpError(413, 'toolarge');
  const [w] = await tx<SaveRow[]>`update app.saves set data = ${sql.json(st as Json)}, rev = rev + 1, updated_at = now()
    where member_id = ${member} returning data, rev::int as rev, updated_at`;
  return saveOut(w);
}

/* おせわ：ルールをサーバーの時計で動かす。セーブの行をロックして、1人ずつ順に */
async function act(req: Request, member: string) {
  const body = await readBody(req, BODY_MAX.act);
  const type = String(body.type || '');
  if (type === 'adopt') return await adopt(member, cleanPet(body.pet));
  return await sql.begin(async tx => {
    const [sv] = await tx<SaveRow[]>`select data, rev::int as rev, updated_at from app.saves where member_id = ${member} for update`;
    if (!sv) throw new HttpError(409, 'nosave');
    const st = sv.data as Record<string, unknown>;
    ensureState(st);
    const t = Date.now();
    const srv = srvOf(st, t);
    if (CARE.has(type) && t - srv.cd < CARE_GAP_MS) return { ok:false, why:'busy', ev:[], save:saveOut(sv), now:t };
    const away = Math.max(0, t - Number(st.last || t));
    const p: Record<string, unknown> = {};
    for (const k of ['id', 'n', 'slot', 'cat', 'on']) if (k in body) p[k] = body[k];
    const r = Rules.act(st, type, p, { away, budget:srv.pb }) as Record<string, unknown>;
    if (r.why === 'unknown') throw new HttpError(400, 'badtype');
    if (!r.ok && type !== 'open') return { ...r, save:saveOut(sv), now:t };
    if (r.ok && CARE.has(type)) srv.cd = t;
    return { ...r, save:await writeSave(tx, member, st), now:t };
  });
}

/* 新しい子をむかえる：名前・みためから、まっさらのセーブを作る（数字や記録は画面から受けとらない） */
async function adopt(member: string, pet: Pet) {
  const t = Date.now();
  const st = newState({ ...pet, photo:null, wear:{ head:null, face:null, neck:null } }, t) as Record<string, unknown>;
  ensureState(st);
  const out = await sql<SaveRow[]>`insert into app.saves (member_id, data) values (${member}, ${sql.json(st as Json)})
    on conflict (member_id) do update set data = excluded.data, rev = app.saves.rev + 1, updated_at = now()
    returning data, rev::int as rev, updated_at`;
  return { ok:true, ev:[], save:saveOut(out[0]), now:t };
}

/* 名前・みためを変える */
async function putSave(req: Request, member: string) {
  const body = await readBody(req, BODY_MAX.save);
  const pet = cleanPet(body.pet);
  return await sql.begin(async tx => {
    const [sv] = await tx<SaveRow[]>`select data, rev::int as rev, updated_at from app.saves where member_id = ${member} for update`;
    if (!sv) throw new HttpError(409, 'nosave');
    const st = sv.data as Record<string, unknown>;
    ensureState(st);
    Object.assign(st.pet as Record<string, unknown>, pet);
    return { save:await writeSave(tx, member, st), now:Date.now() };
  });
}

async function importCode(req: Request, member: string) {
  const body = await readBody(req, BODY_MAX.import);
  if (typeof body.code !== 'string') throw new HttpError(400, 'badcode', { reason:'empty' });
  const r = readMoveCode(body.code);
  if (!r.st) throw new HttpError(400, 'badcode', { reason:r.reason });
  const data = cleanSave(r.st) as Record<string, unknown>;
  delete data.srv;
  const out = await sql.begin(async tx => {
    const [mem] = await tx`select imported_at from app.members where id = ${member} for update`;
    if (!mem) throw new HttpError(401, 'nosession');
    if (mem.imported_at) throw new HttpError(409, 'already');
    const [sv] = await tx<SaveRow[]>`insert into app.saves (member_id, data) values (${member}, ${sql.json(data as Json)})
      on conflict (member_id) do update set data = excluded.data, rev = app.saves.rev + 1, updated_at = now()
      returning data, rev::int as rev, updated_at`;
    await tx`update app.members set imported_at = now() where id = ${member}`;
    return sv;
  });
  return { save:saveOut(out), importable:false };
}

/* ----- AIの読みとり ----- */
type AiStatus = { on: boolean; left: number; perDay: number };
async function aiStatus(member: string): Promise<AiStatus> {
  if (!AI_KEY) return { on:false, left:0, perDay:AI_PER_DAY };
  try {
    const [r] = await sql`select n from app.ai_usage where day = ${dayKey()}::date and member_id = ${member}`;
    return { on:true, left:Math.max(0, AI_PER_DAY - (r ? Number(r.n) : 0)), perDay:AI_PER_DAY };
  } catch {
    /* 回数の表が読めないときは、読みとりを休む（ログインやおせわは止めない） */
    console.error('ai: usage table unavailable');
    return { on:false, left:0, perDay:AI_PER_DAY };
  }
}

/* 写真は data:image/jpeg;base64,… の形だけ（端末のキャンバスで作り直したもの。位置情報などは入っていない） */
const JPEG_RE = /^data:image\/jpeg;base64,([A-Za-z0-9+/]+={0,2})$/;
function jpegData(raw: unknown): string {
  if (typeof raw !== 'string' || raw.length > IMAGE_MAX + 40) throw new HttpError(400, 'badimage');
  const m = raw.match(JPEG_RE);
  if (!m || m[1].length < 400 || m[1].length % 4) throw new HttpError(400, 'badimage');
  let head: Uint8Array;
  try { head = Uint8Array.from(atob(m[1].slice(0, 8)), c => c.charCodeAt(0)); } catch { throw new HttpError(400, 'badimage'); }
  if (head[0] !== 0xFF || head[1] !== 0xD8 || head[2] !== 0xFF) throw new HttpError(400, 'badimage');
  return m[1];
}

/* 1回分をとっておく（とれたら null、上限なら 'limit'（1人）・'busy'（全員））。1日ごとの数は、日付のロックで順番に数える */
async function aiReserve(member: string, day: string): Promise<'limit' | 'busy' | null> {
  return await sql.begin(async tx => {
    await tx`select pg_advisory_xact_lock(hashtextextended(${'ai:' + day}, 0))`;
    const [mine] = await tx`select n from app.ai_usage where day = ${day}::date and member_id = ${member}`;
    if (mine && Number(mine.n) >= AI_PER_DAY) return 'limit';
    const [all] = await tx`select coalesce(sum(n), 0)::int as n from app.ai_usage where day = ${day}::date`;
    if (Number(all.n) >= AI_ALL_PER_DAY) return 'busy';
    await tx`insert into app.ai_usage (day, member_id, n) values (${day}::date, ${member}, 1)
      on conflict (day, member_id) do update set n = app.ai_usage.n + 1`;
    await tx`delete from app.ai_usage where day < ${day}::date - 7`;
    return null;
  });
}
/* AIに届かなかった（料金がかからなかった）ときは、1回分を返す */
async function aiRefund(member: string, day: string) {
  await sql`update app.ai_usage set n = greatest(n - 1, 0) where day = ${day}::date and member_id = ${member}`;
}

/* 返事の文から JSON を1つ取り出す（前後の文やコードのかこみは無視） */
function firstJson(text: string): unknown {
  const a = text.indexOf('{'), b = text.lastIndexOf('}');
  if (a < 0 || b <= a) return null;
  try { return JSON.parse(text.slice(a, b + 1)); } catch { return null; }
}

async function aiRead(req: Request, member: string) {
  const body = await readBody(req, BODY_MAX.read);
  const data = jpegData(body.image);
  if (!AI_KEY) return { ok:false, why:'off', ai:await aiStatus(member) };
  const day = dayKey();
  let held: 'limit' | 'busy' | null;
  try { held = await aiReserve(member, day); }
  catch { console.error('ai: usage table unavailable'); return { ok:false, why:'off', ai:{ on:false, left:0, perDay:AI_PER_DAY } }; }
  if (held) return { ok:false, why:held, ai:await aiStatus(member) };
  let res: Response;
  try {
    res = await fetch(AI_URL, {
      method:'POST',
      headers:{ 'content-type':'application/json', 'x-api-key':AI_KEY, 'anthropic-version':'2023-06-01' },
      body:JSON.stringify({
        model:AI_MODEL,
        max_tokens:1500,
        thinking:{ type:'disabled' },
        output_config:{ effort:'low' },
        messages:[{ role:'user', content:[
          { type:'image', source:{ type:'base64', media_type:'image/jpeg', data } },
          { type:'text', text:buildPrompt() },
        ] }],
      }),
      signal:AbortSignal.timeout(AI_TIMEOUT_MS),
    });
  } catch {
    await aiRefund(member, day);
    console.error('ai: no reply');
    return { ok:false, why:'unavailable', ai:await aiStatus(member) };
  }
  let v: Record<string, unknown> = {};
  try { v = await res.json(); } catch { /* 下で弾く */ }
  if (!res.ok){
    await aiRefund(member, day);
    const kind = v && typeof v.error === 'object' && v.error ? String((v.error as Record<string, unknown>).type || '').slice(0, 40) : '';
    console.error('ai: http ' + res.status + (kind ? ' ' + kind : ''));
    return { ok:false, why:'unavailable', ai:await aiStatus(member) };
  }
  const ai = await aiStatus(member);
  if (v.stop_reason === 'refusal') return { ok:false, why:'refused', ai };
  const text = Array.isArray(v.content) ? (v.content as Record<string, unknown>[]).filter(c => c && c.type === 'text').map(c => String(c.text || '')).join('') : '';
  const out = parseAI(firstJson(text));
  if (!out) return { ok:false, why:'unreadable', ai };
  if (out.species === 'other') return { ok:true, result:{ species:'other' }, ai };
  /* 画面にわたすのは、知っている種類・決まった形の色・短い文字だけ（parseAI が確かめた形） */
  return { ok:true, ai, result:{
    species:out.species,
    candidates:out.cands.map((c: { id: string; conf: number }) => ({ id:c.id, confidence:c.conf })),
    colorName:out.colorName, comment:out.comment, look:out.look,
  } };
}

async function route(req: Request): Promise<unknown> {
  const path = new URL(req.url).pathname.replace(/^.*?\/api(?=\/|$)/, '') || '/';
  const m = req.method;
  if (path === '/health' && m === 'GET') return { ok:true, now:Date.now(), day:dayKey() };
  if (path === '/login' && m === 'POST') return await login(req);
  if (path === '/save' && m === 'GET') return await getSave(await sessionMember(req));
  if (path === '/save' && m === 'POST') return await putSave(req, await sessionMember(req));
  if (path === '/act' && m === 'POST') return await act(req, await sessionMember(req));
  if (path === '/import' && m === 'POST') return await importCode(req, await sessionMember(req));
  if (path === '/ai' && m === 'GET') return { ai:await aiStatus(await sessionMember(req)), now:Date.now() };
  if (path === '/read' && m === 'POST') return await aiRead(req, await sessionMember(req));
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
