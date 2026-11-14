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
 *   POST /leave   { confirm:'leave', accessToken }
 *                                    やめる（退会）：この会員のデータ（会員・LINEのひもづけ・セッション・セーブと その ひかえ・カード）を すぐに ぜんぶ消し
 *                                    （その日の AI・カードの回数は 会員と つながっていないので 2日 のこる）、
 *                                    LINE の deauthorize で、うちのこ日和に あたえた許可も取り消す（その内部チャネルのシークレットがあるとき）
 *   GET  /card                       うちのこカードが作れるか・きょうの のこり枚数
 *   POST /card    { image }          うちのこカードの画像（端末で作った PNG：きせかえを着た うちのこ＋季節のわく。写真・文字は入れない）を
 *                                    Storage の公開バケットに置き、URL を返す。1人1日 CARD_PER_DAY 枚まで（同じ絵なら つくりなおさず、数えない）。
 *                                    さいごに使ってから CARD_KEEP_DAYS 日（既定 365＝1年）で消す。やめる人・2年ひらかない人の画像も消す。
 *                                    1人が とっておけるのは 新しい CARD_KEEP_PER_MEMBER 枚（既定30。こえたら 古いものから消す）。
 *                                    全員で1日 CARD_ALL_PER_DAY 枚・ぜんぶで CARD_ALL_MAX 枚まで（Storage の無料の枠を こえないように）
 *   GET  /notify                     よるの おしらせ（LINE の メッセージ）を うけとるか（on：null＝まだ きいていない）・おくれるか
 *   POST /notify  { on }             よるの おしらせの オン・オフ（本人だけ）
 *   POST /notify/run                 毎日 21時（日本時間）に Supabase Cron（app.notify_kick）が よぶ。ヘッダー x-notify の 1回きりの
 *                                    合いことばを app.notify_runs の ハッシュと くらべ、オンの人の セーブを ルールで みて、
 *                                    きょうの おねがいが のこっている人だけに LINE公式アカウントから 1通（同じ日に 2通 おくらない）
 *   GET  /health                     動いているか・サーバーの時刻
 *
 * - おなか・ごきげんの減り、おやつの回数、おみやげ、きょうのおねがい、連続記録とおたすけ、季節のイベント、
 *   記念日、げいの上限、なでなでのなかよしは、ぜんぶここ（画面と同じ js_rules.js の Rules）で決める。
 *   画面の時計や数字は使わないので、端末の時計を動かしても得をしない。
 * - おせわ（ごはん・おやつ・あそぶ・げい）は、前のおせわから 2.5 秒あける（画面の動きより短い）。
 * - IDトークンは https://api.line.me/oauth2/v2.1/verify で検証し、sub だけを使う（プロフィールの値は使わない）。
 *   LINEミニアプリチャネルの中の 開発用・審査用・本番用（内部チャネル）は チャネルIDが べつなので、3つとも通す（LINE_CHANNEL_IDS）。
 *   sub はプロバイダーごとなので、どの内部チャネルから ひらいても 同じ会員になる。
 *   LINE のトークンは保存しない。セッションのトークンは端末のメモリだけに置き、DB にはハッシュだけを持つ。
 * - セッションは x-session ヘッダーで受けとる（Authorization は Supabase の入口が JWT として読むので使わない）。
 * - セーブは画面と同じ ensureState() を通し、写真の控えは null にする。
 *   game.js は tools/build_server.py が src/ から作り、deno.json の "uchinoko-game" が
 *   GitHub に push したコミットの game.js を指す（デプロイで送るのは index.ts と deno.json だけ）。
 * - ログにトークンやセーブの中身、写真、AIの返事を出さない。
 * - AIの鍵（ANTHROPIC_API_KEY）は Supabase の Edge Function の秘密（Secrets）にだけ置く。ないときは読みとりを休む。
 * - 内部チャネルのチャネルシークレットも Secrets にだけ置く（LINE_CHANNEL_SECRET_<チャネルID>。開発用は いままでの LINE_CHANNEL_SECRET でもよい）。
 *   やめる人の許可の取り消し（deauthorize）だけに使う。アクセストークンを LINE で確かめて、どの内部チャネルのものかを知ってから えらぶ。
 *   ないときも データは消す（許可は、LINEの設定から本人が外せる）。
 * - 最後に ひらいてから MEMBER_KEEP_DAYS 日（既定 730＝2年）たった会員は、だれかの ログインのときに ぜんぶ消す。
 * - 新しい子（adopt）と 取りこみ（/import）で セーブを 上書きする前に、いまの セーブを 1人1つ とっておく（app.save_backups）。
 *   SAVE_BACKUP_DAYS 日（既定 30）で消す。もどすのは お問い合わせのとき、オーナーが SQL で（docs/PROJECT.md 10章）。
 * - うちのこカードの画像は Storage（SUPABASE_URL）に、Edge Function の秘密の鍵（SUPABASE_SECRET_KEYS、なければ SUPABASE_SERVICE_ROLE_KEY）で置く・消す。
 *   画像の中身はログに出さない。PNG は形を確かめ、IHDR・PLTE・tRNS・IDAT・IEND のほか（文字やメタデータ）は すてて置く。
 * - デプロイは verify_jwt: false（自前のセッションで確かめるため）。
 * - おせわ（/act）と 取りこみ（/import）は、画面が つけた番号（rid）を セーブの srv.rq に のこし、とどかなくて おくりなおした
 *   同じ番号は 2回 数えない（前の答えを かえす。診断 3-3）。
 * - 会員ごとの 回数の制限：/act と /save の 書きこみは 10秒に ACT_PER_WINDOW 回・1日 ACT_PER_DAY 回まで（srv.rt）、
 *   /login は 1分に LOGIN_PER_MIN 回まで。同じ IDトークンは しばらく LINE に きかない（診断 1-5）。
 * - AIの読みとり・カードの「1人1日」は、会員ではなく その日だけの しるし（種類:日付:sub の SHA-256）で数える（app.day_quota。
 *   やめて また はじめても その日の上限は もどらない。2日で消す。診断 1-6）。
 * - エラーの数を app.error_counts に 日付・種類ごとに数え、/health が この3日の合計を返す（診断 5-2）。
 * - だれかの ログインのとき 1日1回、Storage の cards と 表を くらべて、表に ない「まいご」の画像を消す（診断 1-8）。
 * - DB へは app の表だけ さわれる役 uchinoko_api で つなぐ（Secrets の APP_DB_PASSWORD があるとき。ないとき・つなげないときは
 *   SUPABASE_DB_URL＝持ち主。診断 1-10）。
 * - よるの おしらせ（2026-11-14）：Messaging API の チャネルアクセストークンは Secrets の LINE_MESSAGING_TOKEN だけに置く（ないときは おくらない）。
 *   おくり先は app.line_accounts の sub（公式アカウントの Messaging API チャネルが ミニアプリと 同じプロバイダーなので、同じ ユーザーID）。
 *   友だちで ない・ブロックしている人には LINE が とどけない（通数にも 数えない）。友だちかどうかは 見ない（profile の スコープを つかわない）。
 *   メッセージに 入れるのは 子の名前・のこりの数・れんぞくの日数と、ミニアプリを ひらく ボタンだけ。ログに ユーザーIDを 出さない。
 */
import postgres from 'npm:postgres@3.4.5';
import { cleanText, ensureState, readMoveCode, MOVE_MAX, dayKey, Rules, newState, normalizeLook, buildPrompt, parseAI } from 'uchinoko-game';

const env = (k: string, d = '') => (Deno.env.get(k) ?? d).trim();
/* LINEミニアプリチャネルの内部チャネル（開発用・審査用・本番用）のチャネルID（LIFF ID の前半）。秘密ではない。カンマで複数。
   先頭は開発用（シークレットが LINE_CHANNEL_SECRET だけのとき、それを開発用のものとして使う） */
const CHANNELS = env('LINE_CHANNEL_IDS', '2012410263,2012410264,2012410265').split(',').map(s => s.trim()).filter(s => /^\d{6,12}$/.test(s));
/* 画面の置き場所。Cloudflare Pages のプレビュー（<hash>.uchinoko-biyori.pages.dev）も通す */
const ORIGINS = env('ALLOWED_ORIGINS', 'https://uchinoko-biyori.pages.dev').split(',').map(s => s.trim()).filter(Boolean);
const PREVIEW = /^https:\/\/[a-z0-9-]+\.uchinoko-biyori\.pages\.dev$/;
const LINE_VERIFY = 'https://api.line.me/oauth2/v2.1/verify';
const LINE_TOKEN = 'https://api.line.me/oauth2/v3/token';          /* ステートレスチャネルアクセストークン（15分） */
const LINE_DEAUTH = 'https://api.line.me/user/v1/deauthorize';    /* 本人が あたえた許可を取り消す */
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
/* うちのこカード。枚数と とっておく日数は Secrets（環境変数）で変えられる。Storage の鍵がなければ休み（画面にボタンを出さない） */
const CARD_PER_DAY = intEnv('CARD_PER_DAY', 3, 50);         /* 1人1日（日本時間の0時で戻る）。同じ絵は数えない */
const CARD_KEEP_DAYS = Math.max(30, intEnv('CARD_KEEP_DAYS', 365, 3650));   /* さいごに使ってから この日数で消す（プライバシーポリシーの「1年」） */
const CARD_KEEP_PER_MEMBER = Math.max(3, intEnv('CARD_KEEP_PER_MEMBER', 30, 1000));  /* 1人が とっておける枚数（さいごに使った 新しいものから。プライバシーポリシーの「30まい」） */
const CARD_ALL_PER_DAY = intEnv('CARD_ALL_PER_DAY', 100, 100_000);   /* 全員あわせて 1日に作れる 新しい絵 */
const CARD_ALL_MAX = intEnv('CARD_ALL_MAX', 3000, 1_000_000);       /* 全員あわせて とっておく枚数（1まい 0.2MB ほど。Storage の無料の枠 1GB を こえないように） */
const CARD_BUCKET = 'cards';
/* PNG のバイト数の上限。はかった大きさは 768×1024 で 0.14〜0.2MB（Chromium、季節・イベント・おへや 70とおり）。
   iPhone の WebKit は 大きめに なりうるので 3倍。こえたら 画面が 576×768 で作りなおす（js_line.js の cardMax と そろえる）。バケットは 1MB まで */
const CARD_MAX = 600_000;
const CARD_B64_MAX = Math.ceil(CARD_MAX / 3) * 4;
const CARD_SIDE = { min:240, max:1024 } as const;   /* 画像の たて・よこ（px）。LINE の Flex Message の画像は 1024px まで */
const BODY_MAX = { login:8_000, save:8_000, act:8_000, import:MOVE_MAX + 2_000, read:IMAGE_MAX + 2_000, leave:8_000, card:CARD_B64_MAX + 2_000, notify:2_000 } as const;
const CARE = new Set(['feed', 'treat', 'play', 'trick']);
const CARE_GAP_MS = 2_500;
const STROKE_MAX = 12;
/* 長く ひらかない人：最後に ひらいて（ログインして）から この日数で、会員ごと ぜんぶ消す（プライバシーポリシーの「2年」）。
   だれかが ログインするたびに、まとめて消す（その人自身が 2年ぶりなら、消してから あたらしい会員にする）。まちがえて小さくしても30日より短くしない */
const KEEP_DAYS = Math.max(30, intEnv('MEMBER_KEEP_DAYS', 730, 3650));
/* 上書きの前の セーブの ひかえ（1人1つ）を とっておく日数（プライバシーポリシーの「30日」） */
const BACKUP_DAYS = Math.max(7, intEnv('SAVE_BACKUP_DAYS', 30, 365));
/* 会員ごとの 回数の制限（診断 1-5）。ふつうの使い方では とどかない大きさ。Secrets で変えられる（よぶたびに読む） */
const ACT_WINDOW_MS = 10_000;
const actPerWindow = () => Math.max(5, intEnv('ACT_PER_WINDOW', 20, 10_000));   /* /act と /save の 書きこみ：10秒に */
const actPerDay = () => Math.max(500, intEnv('ACT_PER_DAY', 3000, 1_000_000));  /* 1日に（日本時間） */
const loginPerMin = () => Math.max(3, intEnv('LOGIN_PER_MIN', 6, 10_000));       /* /login：1人 1分に */
/* 取りこみで 運べる 記念日の しるし・見た季節イベントの数（1つ1つは 知っている形だけ。何年 使っても とどかない大きさ） */
const MILESTONES_MAX = 400;
const SEEN_MAX = 2000;
/* おせわの番号（画面が つける。とどかなくて おくりなおしたときに 2回 数えないため。診断 3-3） */
const RID_RE = /^[A-Za-z0-9_-]{8,40}$/;
/* その日の回数（app.day_quota）を とっておく日数：きょうと きのう（プライバシーポリシーの「2日」） */
const QUOTA_DAYS = 2;
/* エラーの数（app.error_counts）を とっておく日数・/health で 合計する日数 */
const ERROR_KEEP_DAYS = 60;
const ERROR_SUM_DAYS = 3;
/* よるの おしらせ（2026-11-14 オーナー決定）。時刻は 日本時間。Secrets（環境変数）で変えられる（よぶたびに読む） */
const LINE_PUSH = 'https://api.line.me/v2/bot/message/push';
const notifyToken = () => env('LINE_MESSAGING_TOKEN');                            /* Messaging API の チャネルアクセストークン（長期） */
const notifyHour = () => intEnv('NOTIFY_HOUR', 21, 23);                           /* この時より前に よばれても おくらない（cron は 21:00） */
const notifyIdleDays = () => Math.max(1, intEnv('NOTIFY_IDLE_DAYS', 14, 365));    /* この日数 ひらいていない人には おくらない（月200通の 無料の枠） */
const notifyMax = () => Math.max(1, intEnv('NOTIFY_MAX', 300, 5000));             /* 1回に 見る人数 */
const NOTIFY_OPEN = env('NOTIFY_OPEN_URL', 'https://miniapp.line.me/2012410265-PutgsCLS');   /* ボタンで ひらく 本番用の LIFF URL */
const NOTIFY_WORD_SECS = 600;      /* 合いことばが 有効な 秒数（作ってから） */
const NOTIFY_KEEP_DAYS = 60;       /* app.notify_runs を とっておく日数 */

/* ----- DB（診断 1-10）-----
   app の表だけ さわれる役 uchinoko_api で つなぐ。パスワードは Secrets の APP_DB_PASSWORD（オーナーが入れる。
   SUPABASE_DB_URL の ユーザーと パスワードだけ 入れかえる）。ない・まちがっている（28…）ときは、いままでの SUPABASE_DB_URL（持ち主）で つなぐ */
const DB_OPT = { prepare:false, max:3, idle_timeout:20, connect_timeout:10 } as const;
function appDbUrl(): string | null {
  const pw = env('APP_DB_PASSWORD'), base = env('SUPABASE_DB_URL');
  if (!pw || !base) return null;
  try {
    const u = new URL(base);
    const m = /^postgres(\.[\w-]+)?$/.exec(decodeURIComponent(u.username));
    if (!m || !u.host) return null;
    u.username = 'uchinoko_api' + (m[1] || '');
    u.password = pw;
    return u.href;
  } catch { return null; }
}
async function openDb(): Promise<{ sql: postgres.Sql; note: string }> {
  const url = appDbUrl();
  if (url){
    const s = postgres(url, DB_OPT);
    try { await s`select 1`; return { sql:s, note:'' }; }
    catch (e) {
      const code = String((e as { code?: unknown })?.code ?? ''), msg = e instanceof Error ? e.message : '';
      /* パスワード・役の まちがいの ときだけ 持ち主に もどす（DB が ねている・とどかない ときは この役のまま。つぎの問い合わせで また つなぐ） */
      if (/^28/.test(code) || /password|authentication|tenant or user/i.test(msg)){
        console.error('db_role: app role refused, using the owner');
        try { await s.end({ timeout:1 }); } catch { /* そのまま */ }
        return { sql:postgres(env('SUPABASE_DB_URL'), DB_OPT), note:'db_role' };
      }
      return { sql:s, note:'' };
    }
  }
  return { sql:postgres(env('SUPABASE_DB_URL'), DB_OPT), note:'' };
}
const db = await openDb();
const sql = db.sql;

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

/* ----- エラーの数（診断 5-2）-----
   ログ（無料プランは1日分）に 出すのと いっしょに、app.error_counts に 日付・種類ごとに 数える（中身は のこさない）。
   数えられなくても 止めない。1つずつ順に（ためしの DB は 同時の問い合わせが まざるため、まってから つづける）。
   トランザクションの中からは その tx を わたす（べつの つなぎで 書くと、ためしの DB では まちあって 止まる） */
async function oops(kind: string, detail = '', q: postgres.Sql | postgres.TransactionSql = sql): Promise<void> {
  console.error(kind + (detail ? ': ' + detail : ''));
  if (!/^[a-z0-9_]{1,40}$/.test(kind)) return;
  try {
    await q`insert into app.error_counts (day, kind, n) values (${dayKey()}::date, ${kind}, 1)
      on conflict (day, kind) do update set n = app.error_counts.n + 1`;
  } catch { /* 表が ない・DB に とどかない */ }
}
async function errorTotal(): Promise<number | null> {
  try {
    const [r] = await sql`select coalesce(sum(n), 0)::int as n from app.error_counts where day > ${dayKey()}::date - ${ERROR_SUM_DAYS}::int`;
    return Number(r.n);
  } catch { return null; }
}
if (db.note) await oops(db.note);

/* 体は 上限まで 読んだら やめる（content-length の ない 送り方でも、ぜんぶ読んでから 大きさを見ない。診断 1-9） */
async function readBody(req: Request, max: number): Promise<Record<string, unknown>> {
  const len = Number(req.headers.get('content-length') || 0);
  if (len > max) throw new HttpError(413, 'toolarge');
  if (!req.body) throw new HttpError(400, 'badjson');
  const reader = req.body.getReader();
  const parts: Uint8Array[] = [];
  let size = 0;
  for (;;){
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > max){ try { await reader.cancel(); } catch { /* そのまま */ } throw new HttpError(413, 'toolarge'); }
    parts.push(value);
  }
  const buf = new Uint8Array(size);
  let at = 0;
  for (const p of parts){ buf.set(p, at); at += p.byteLength; }
  let text = '';
  try { text = new TextDecoder('utf-8', { fatal:true }).decode(buf); } catch { throw new HttpError(400, 'badjson'); }
  let v: unknown = null;
  try { v = JSON.parse(text); } catch { throw new HttpError(400, 'badjson'); }
  if (!v || typeof v !== 'object' || Array.isArray(v)) throw new HttpError(400, 'badjson');
  return v as Record<string, unknown>;
}

const hexOf = (buf: ArrayBuffer) => Array.from(new Uint8Array(buf), b => b.toString(16).padStart(2, '0')).join('');
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

/* 同じ IDトークンで くりかえし ログインされても、LINE に きくのは 1回（この関数の うごいている あいだ・トークンの期限まで）。
   1つのトークンで 1分に LOGIN_PER_MIN 回より 多いと、LINE に きかずに ことわる（診断 1-5。中身は メモリだけ、トークンは ハッシュ） */
const seenTokens = new Map<string, { sub: string; exp: number; t: number; n: number }>();
async function verifyLine(idToken: unknown): Promise<string> {
  if (typeof idToken !== 'string' || idToken.length > 4096 || !/^[\w-]+\.[\w-]+\.[\w-]*$/.test(idToken)) throw new HttpError(401, 'badtoken');
  const aud = tokenAud(idToken);
  if (!aud || !CHANNELS.includes(aud)) throw new HttpError(401, 'badtoken');
  const key = await sha256hex(idToken);
  const now = Date.now();
  const seen = seenTokens.get(key);
  if (seen && seen.exp > now){
    if (now - seen.t > 60_000){ seen.t = now; seen.n = 0; }
    if (++seen.n > loginPerMin()) throw new HttpError(429, 'slow');
    return seen.sub;
  }
  const v = await verifyAtLine(idToken, aud);
  if (seenTokens.size >= 500) for (const k of [...seenTokens.keys()].slice(0, 100)) seenTokens.delete(k);
  seenTokens.set(key, { sub:v.sub, exp:Math.min(now + 30 * 60e3, v.exp), t:now, n:1 });
  return v.sub;
}
/* LINE の IDトークンを LINE のサーバーで検証して sub と期限を返す。aud はどのチャネルで確かめるかを選ぶためだけに読む */
async function verifyAtLine(idToken: string, aud: string): Promise<{ sub: string; exp: number }> {
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
  return { sub, exp:Number(v.exp) * 1000 };
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
    await tx`delete from app.members where last_seen_at < now() - make_interval(days => ${KEEP_DAYS})`;
    const [acc] = await tx`select member_id from app.line_accounts where sub = ${sub}`;
    let member = acc ? acc.member_id as string : null;
    if (!member){
      const [m] = await tx`insert into app.members default values returning id`;
      member = m.id as string;
      await tx`insert into app.line_accounts (sub, member_id) values (${sub}, ${member})`;
    } else {
      /* 1人 1分に LOGIN_PER_MIN 回まで（ふつうは ひらくたびに 1回。診断 1-5） */
      const [rc] = await tx`select count(*)::int as n from app.sessions where member_id = ${member} and created_at > now() - interval '1 minute'`;
      if (Number(rc.n) >= loginPerMin()) throw new HttpError(429, 'slow');
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
  /* 1年 使わない・会員が消えた カードの画像と、30日たった セーブの ひかえを消す（2年の削除と同じく、だれかの ログインのとき）。
     1日1回：きのうより前の その日の回数・60日より前の エラーの数・まいごの カードの画像 */
  await later((async () => { await sweepCards(); await sweepBackups(); if (await chore('daily', 20 * 3600e3)) await sweepDaily(); })());   /* 1つずつ順に */
  return { token, expiresAt:out.expiresAt, member:{ id:out.member, importable:out.importable }, save:out.save,
    ai:await aiStatus(out.member), card:await cardStatus(out.member), notify:await notifyStatus(out.member), now:Date.now() };
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
  /* 文字（コードポイント）で切り、制御文字と かたわれの絵文字を取りのぞく（jsonb が ことわる \u0000 と サロゲートの片方を 入れない） */
  const name = cleanText(String(p.name ?? '').trim(), 10).trim() || 'うちのこ';
  return { name, species:look.species, breedId:look.breedId, look, colorName:typeof p.colorName === 'string' ? cleanText(p.colorName, 14) : '' };
}

/* サーバーだけが使う控え（画面には関係ない）：なでなでのなかよしの残り（pb）、前のおせわの時刻（cd）、
   さいごに うけとった おせわの番号と その答え（rq。診断 3-3）、書きこみの回数（rt：10秒の まど w・n と その日 d・dn。診断 1-5） */
type Rq = { id: string; r: Record<string, unknown> };
type Rt = { w: number; n: number; d: string; dn: number };
type Srv = { pb: { left: number; t: number }; cd: number; rq?: Rq; rt: Rt };
function srvOf(st: Record<string, unknown>, t: number): Srv {
  const o = (st.srv && typeof st.srv === 'object' ? st.srv : {}) as Record<string, unknown>;
  const pb = (o.pb && typeof o.pb === 'object' ? o.pb : {}) as Record<string, unknown>;
  const rt = (o.rt && typeof o.rt === 'object' ? o.rt : {}) as Record<string, unknown>;
  const rq = (o.rq && typeof o.rq === 'object' ? o.rq : null) as Record<string, unknown> | null;
  const n = (v: unknown, d: number, lo: number, hi: number) => { const x = Number(v); return Number.isFinite(x) ? Math.min(hi, Math.max(lo, x)) : d; };
  const srv: Srv = {
    pb:{ left:n(pb.left, STROKE_MAX, 0, STROKE_MAX), t:n(pb.t, t, 0, t) }, cd:n(o.cd, 0, 0, t),
    rt:{ w:n(rt.w, 0, 0, t), n:n(rt.n, 0, 0, 1e9), d:typeof rt.d === 'string' ? rt.d : '', dn:n(rt.dn, 0, 0, 1e9) },
  };
  if (rq && typeof rq.id === 'string' && RID_RE.test(rq.id) && rq.r && typeof rq.r === 'object') srv.rq = { id:rq.id, r:rq.r as Record<string, unknown> };
  st.srv = srv;
  return srv;
}
/* おせわの番号（なければ null） */
const ridOf = (body: Record<string, unknown>) => typeof body.rid === 'string' && RID_RE.test(body.rid) ? body.rid : null;
/* セーブが その番号の おせわを もう うけとっているか */
function ridDone(data: unknown, rid: string | null): boolean {
  if (!rid || !data || typeof data !== 'object') return false;
  const srv = (data as Record<string, unknown>).srv as Record<string, unknown> | undefined;
  const rq = srv && typeof srv === 'object' ? srv.rq as Record<string, unknown> | undefined : undefined;
  return !!rq && rq.id === rid;
}
/* 答えを とっておく形（セーブは のぞく。大きすぎるときは 結果だけ） */
function answerOf(r: Record<string, unknown>): Record<string, unknown> {
  const o: Record<string, unknown> = { ...r };
  delete o.save; delete o.now;
  return JSON.stringify(o).length <= 6000 ? o : { ok:r.ok, why:r.why, ev:[] };
}
/* 書きこみの回数：10秒に ACT_PER_WINDOW 回・1日 ACT_PER_DAY 回まで。こえたら true（このときは 書かない） */
function overRate(srv: Srv, t: number): boolean {
  const rt = srv.rt, day = dayKey();
  if (rt.d !== day){ rt.d = day; rt.dn = 0; }
  if (t - rt.w >= ACT_WINDOW_MS || t < rt.w){ rt.w = t; rt.n = 0; }
  if (rt.n >= actPerWindow() || rt.dn >= actPerDay()) return true;
  rt.n++; rt.dn++;
  return false;
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
  const rid = ridOf(body);
  if (type === 'adopt') return await adopt(member, cleanPet(body.pet), rid);
  return await sql.begin(async tx => {
    const [sv] = await tx<SaveRow[]>`select data, rev::int as rev, updated_at from app.saves where member_id = ${member} for update`;
    if (!sv) throw new HttpError(409, 'nosave');
    const st = sv.data as Record<string, unknown>;
    ensureState(st);
    const t = Date.now();
    const srv = srvOf(st, t);
    /* 同じ番号を もう うけとっていたら（返事だけ とどかなかった）、数えなおさずに 前の答えと いまの セーブを返す */
    if (rid && srv.rq && srv.rq.id === rid) return { ...srv.rq.r, dup:true, save:saveOut(sv), now:t };
    if (CARE.has(type) && t - srv.cd < CARE_GAP_MS) return { ok:false, why:'busy', ev:[], save:saveOut(sv), now:t };
    if (overRate(srv, t)) return { ok:false, why:'busy', ev:[], save:saveOut(sv), now:t };
    const away = Math.max(0, t - Number(st.last || t));
    const p: Record<string, unknown> = {};
    for (const k of ['id', 'n', 'slot', 'cat', 'on']) if (k in body) p[k] = body[k];
    const r = Rules.act(st, type, p, { away, budget:srv.pb }) as Record<string, unknown>;
    if (r.why === 'unknown') throw new HttpError(400, 'badtype');
    if (!r.ok && type !== 'open') return { ...r, save:saveOut(sv), now:t };
    if (r.ok && CARE.has(type)) srv.cd = t;
    if (rid) srv.rq = { id:rid, r:answerOf(r) };
    return { ...r, save:await writeSave(tx, member, st), now:t };
  });
}

/* 上書き（新しい子・取りこみ）の前の セーブを 1人1つ とっておく（まちがいや 画面の不具合で 置きかわっても、お問い合わせで もどせるように）。
   前の ひかえは 置きかえる。表が まだないなどで 書けないときは とばす（上書きは とめない） */
async function keepBackup(tx: postgres.TransactionSql, member: string, why: 'adopt' | 'import') {
  try {
    await tx.savepoint(async sp => {
      await sp`insert into app.save_backups (member_id, data, rev, reason)
        select member_id, data, rev, ${why} from app.saves where member_id = ${member}
        on conflict (member_id) do update set data = excluded.data, rev = excluded.rev, reason = excluded.reason, created_at = now()`;
    });
  } catch { await oops('backup', 'table unavailable', tx); }
}
async function sweepBackups() {
  try { await sql`delete from app.save_backups where created_at < now() - make_interval(days => ${BACKUP_DAYS})`; }
  catch { await oops('sweep', 'backups'); }
}

/* 新しい子をむかえる：名前・みためから、まっさらのセーブを作る（数字や記録は画面から受けとらない）。前の子の セーブは ひかえに。
   同じ番号を もう うけとっていたら、作りなおさない（ひかえも 上書きしない） */
async function adopt(member: string, pet: Pet, rid: string | null) {
  const t = Date.now();
  const st = newState({ ...pet, photo:null, wear:{ head:null, face:null, neck:null } }, t) as Record<string, unknown>;
  ensureState(st);
  const out = await sql.begin(async tx => {
    const [cur] = await tx<SaveRow[]>`select data, rev::int as rev, updated_at from app.saves where member_id = ${member} for update`;
    if (cur && ridDone(cur.data, rid)) return { dup:cur };
    /* 回数の制限は 前の子から 引きつぐ（新しい子を くりかえし 作っても まどは もどらない） */
    const srv = srvOf(st, t);
    if (cur){
      const old = srvOf(cur.data as Record<string, unknown>, t);
      srv.rt = old.rt;
      if (overRate(srv, t)) throw new HttpError(429, 'slow');
    }
    if (rid) srv.rq = { id:rid, r:{ ok:true, ev:[] } };
    await keepBackup(tx, member, 'adopt');
    const [w] = await tx<SaveRow[]>`insert into app.saves (member_id, data) values (${member}, ${sql.json(st as Json)})
      on conflict (member_id) do update set data = excluded.data, rev = app.saves.rev + 1, updated_at = now()
      returning data, rev::int as rev, updated_at`;
    return { row:w };
  });
  if ('dup' in out) return { ok:true, ev:[], dup:true, save:saveOut(out.dup), now:t };
  return { ok:true, ev:[], save:saveOut(out.row), now:t };
}

/* 名前・みためを変える（書きこみの回数は おせわと いっしょに数える。こえたら 429） */
async function putSave(req: Request, member: string) {
  const body = await readBody(req, BODY_MAX.save);
  const pet = cleanPet(body.pet);
  return await sql.begin(async tx => {
    const [sv] = await tx<SaveRow[]>`select data, rev::int as rev, updated_at from app.saves where member_id = ${member} for update`;
    if (!sv) throw new HttpError(409, 'nosave');
    const st = sv.data as Record<string, unknown>;
    ensureState(st);
    if (overRate(srvOf(st, Date.now()), Date.now())) throw new HttpError(429, 'slow');
    Object.assign(st.pet as Record<string, unknown>, pet);
    return { save:await writeSave(tx, member, st), now:Date.now() };
  });
}

/* 取りこみで 運ぶ しるしの数を おさえる（1つ1つは carryExtras が 知っている形だけに している。診断 1-5） */
function capKeys(o: unknown, max: number, newestFirst = false) {
  if (!o || typeof o !== 'object') return;
  const rec = o as Record<string, unknown>;
  let keys = Object.keys(rec);
  if (keys.length <= max) return;
  if (newestFirst) keys = keys.sort((a, b) => Number(rec[b]) - Number(rec[a]));
  for (const k of keys.slice(max)) delete rec[k];
}

async function importCode(req: Request, member: string) {
  const body = await readBody(req, BODY_MAX.import);
  if (typeof body.code !== 'string') throw new HttpError(400, 'badcode', { reason:'empty' });
  const rid = ridOf(body);
  const r = readMoveCode(body.code);
  if (!r.st) throw new HttpError(400, 'badcode', { reason:r.reason });
  const data = cleanSave(r.st) as Record<string, unknown>;
  capKeys(data.milestones, MILESTONES_MAX);
  capKeys(data.events && typeof data.events === 'object' ? (data.events as Record<string, unknown>).seen : null, SEEN_MAX, true);
  delete data.srv;
  if (rid) data.srv = { rq:{ id:rid, r:{ ok:true } } };
  const out = await sql.begin(async tx => {
    const [mem] = await tx`select imported_at from app.members where id = ${member} for update`;
    if (!mem) throw new HttpError(401, 'nosession');
    if (mem.imported_at){
      /* 同じ番号の 取りこみが もう 入っていたら（返事だけ とどかなかった）、「1回だけ」ではなく 入った子を返す */
      const [cur] = await tx<SaveRow[]>`select data, rev::int as rev, updated_at from app.saves where member_id = ${member}`;
      if (cur && ridDone(cur.data, rid)) return cur;
      throw new HttpError(409, 'already');
    }
    await keepBackup(tx, member, 'import');   /* いまの子（あれば）は ひかえに */
    const [sv] = await tx<SaveRow[]>`insert into app.saves (member_id, data) values (${member}, ${sql.json(data as Json)})
      on conflict (member_id) do update set data = excluded.data, rev = app.saves.rev + 1, updated_at = now()
      returning data, rev::int as rev, updated_at`;
    await tx`update app.members set imported_at = now() where id = ${member}`;
    return sv;
  });
  return { save:saveOut(out), importable:false };
}

/* ----- その日の回数（AIの読みとり・うちのこカード。診断 1-6）-----
   会員ではなく、その日だけの しるし（「種類:日付:LINE の sub」の SHA-256）で数える。会員の行と つながらないので、
   やめて また はじめても その日の上限は もどらない。日ごとに かわり、もとの sub には もどせない。QUOTA_DAYS 日で消す */
type Quota = 'ai' | 'card';
async function quotaKey(q: postgres.Sql | postgres.TransactionSql, member: string, kind: Quota, day: string): Promise<string> {
  const [a] = await q`select sub from app.line_accounts where member_id = ${member}`;
  return await sha256hex(kind + ':' + day + ':' + (a ? String(a.sub) : 'member:' + member));
}
async function quotaUsed(q: postgres.Sql | postgres.TransactionSql, kind: Quota, day: string, key: string): Promise<number> {
  const [r] = await q`select n from app.day_quota where day = ${day}::date and kind = ${kind} and who = decode(${key}, 'hex')`;
  return r ? Number(r.n) : 0;
}
async function quotaAdd(q: postgres.Sql | postgres.TransactionSql, kind: Quota, day: string, key: string, by: 1 | -1) {
  if (by > 0){
    await q`insert into app.day_quota (day, kind, who, n) values (${day}::date, ${kind}, decode(${key}, 'hex'), 1)
      on conflict (day, kind, who) do update set n = app.day_quota.n + 1`;
  } else {
    await q`update app.day_quota set n = greatest(n - 1, 0) where day = ${day}::date and kind = ${kind} and who = decode(${key}, 'hex')`;
  }
}

/* ----- AIの読みとり ----- */
type AiStatus = { on: boolean; left: number; perDay: number };
async function aiStatus(member: string): Promise<AiStatus> {
  if (!AI_KEY) return { on:false, left:0, perDay:AI_PER_DAY };
  try {
    const day = dayKey();
    const used = await quotaUsed(sql, 'ai', day, await quotaKey(sql, member, 'ai', day));
    return { on:true, left:Math.max(0, AI_PER_DAY - used), perDay:AI_PER_DAY };
  } catch {
    /* 回数の表が読めないときは、読みとりを休む（ログインやおせわは止めない） */
    await oops('ai_table', 'usage table unavailable');
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
async function aiReserve(key: string, day: string): Promise<'limit' | 'busy' | null> {
  return await sql.begin(async tx => {
    await tx`select pg_advisory_xact_lock(hashtextextended(${'ai:' + day}, 0))`;
    if (await quotaUsed(tx, 'ai', day, key) >= AI_PER_DAY) return 'limit';
    const [all] = await tx`select coalesce(sum(n), 0)::int as n from app.day_quota where day = ${day}::date and kind = 'ai'`;
    if (Number(all.n) >= AI_ALL_PER_DAY) return 'busy';
    await quotaAdd(tx, 'ai', day, key, 1);
    return null;
  });
}
/* AIに届かなかった（料金がかからなかった）ときは、1回分を返す */
async function aiRefund(key: string, day: string) {
  try { await quotaAdd(sql, 'ai', day, key, -1); } catch { await oops('ai_table', 'refund failed'); }
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
  let held: 'limit' | 'busy' | null, key = '';
  try { key = await quotaKey(sql, member, 'ai', day); held = await aiReserve(key, day); }
  catch { await oops('ai_table', 'usage table unavailable'); return { ok:false, why:'off', ai:{ on:false, left:0, perDay:AI_PER_DAY } }; }
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
    await aiRefund(key, day);
    await oops('ai_reply', 'no reply');
    return { ok:false, why:'unavailable', ai:await aiStatus(member) };
  }
  let v: Record<string, unknown> = {};
  try { v = await res.json(); } catch { /* 下で弾く */ }
  if (!res.ok){
    await aiRefund(key, day);
    const kind = v && typeof v.error === 'object' && v.error ? String((v.error as Record<string, unknown>).type || '').slice(0, 40) : '';
    await oops('ai_http', res.status + (kind ? ' ' + kind : ''));
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

/* ----- うちのこカード ----- */
/* Storage への鍵（Edge Function に はじめから入っている秘密）。新しい鍵（sb_secret_…）は apikey だけ、古い service_role は Authorization にも */
function storageAuth(): Record<string, string> | null {
  if (!/^https:\/\/[\w.-]+(:\d+)?\/?$/.test(env('SUPABASE_URL'))) return null;
  let key = '';
  try {
    const o = JSON.parse(env('SUPABASE_SECRET_KEYS') || '{}') as Record<string, unknown>;
    const v = typeof o.default === 'string' ? o.default : Object.values(o).find(x => typeof x === 'string');
    key = typeof v === 'string' ? v.trim() : '';
  } catch { /* 下へ */ }
  if (key) return { apikey:key };
  const legacy = env('SUPABASE_SERVICE_ROLE_KEY');
  return legacy ? { apikey:legacy, Authorization:'Bearer ' + legacy } : null;
}
const storageBase = () => env('SUPABASE_URL').replace(/\/+$/, '') + '/storage/v1';
const cardUrl = (name: string) => storageBase() + '/object/public/' + CARD_BUCKET + '/' + name;

type CardStatus = { on: boolean; left: number; perDay: number };
async function cardStatus(member: string): Promise<CardStatus> {
  if (!storageAuth()) return { on:false, left:0, perDay:CARD_PER_DAY };
  try {
    const day = dayKey();
    const used = await quotaUsed(sql, 'card', day, await quotaKey(sql, member, 'card', day));
    return { on:true, left:Math.max(0, CARD_PER_DAY - used), perDay:CARD_PER_DAY };
  } catch {
    await oops('card_table', 'table unavailable');
    return { on:false, left:0, perDay:CARD_PER_DAY };
  }
}

/* カードの画像は data:image/png;base64,… の PNG だけ。たて・よこを確かめ、画像に要る チャンク（IHDR・PLTE・tRNS・IDAT・IEND）だけで作り直す
   （文字・メタデータ・IEND のうしろは すてる） */
const PNG_RE = /^data:image\/png;base64,([A-Za-z0-9+/]+={0,2})$/;
const PNG_SIG = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];
const PNG_KEEP = new Set(['IHDR', 'PLTE', 'tRNS', 'IDAT', 'IEND']);
function cleanPng(raw: unknown): { bytes: Uint8Array<ArrayBuffer>; w: number; h: number } {
  const bad = () => new HttpError(400, 'badimage');
  if (typeof raw !== 'string' || raw.length > CARD_B64_MAX + 40) throw bad();
  const m = raw.match(PNG_RE);
  if (!m || m[1].length % 4) throw bad();
  let b: Uint8Array;
  try { b = Uint8Array.from(atob(m[1]), c => c.charCodeAt(0)); } catch { throw bad(); }
  if (b.length < 8 + 25 + 12 + 12 || b.length > CARD_MAX || PNG_SIG.some((v, i) => b[i] !== v)) throw bad();
  const dv = new DataView(b.buffer, b.byteOffset, b.byteLength);
  const keep: Uint8Array[] = [b.subarray(0, 8)];
  let i = 8, w = 0, h = 0, idat = 0, end = false;
  while (i + 12 <= b.length){
    const len = dv.getUint32(i);
    const type = String.fromCharCode(b[i + 4], b[i + 5], b[i + 6], b[i + 7]);
    if (!/^[A-Za-z]{4}$/.test(type) || len > b.length - i - 12) throw bad();
    if (i === 8){
      if (type !== 'IHDR' || len !== 13) throw bad();
      w = dv.getUint32(i + 8); h = dv.getUint32(i + 12);
    } else if (type === 'IHDR') throw bad();
    if (type === 'IDAT') idat++;
    if (PNG_KEEP.has(type)) keep.push(b.subarray(i, i + 12 + len));
    i += 12 + len;
    if (type === 'IEND'){ end = true; break; }
  }
  if (!end || !idat || w < CARD_SIDE.min || h < CARD_SIDE.min || w > CARD_SIDE.max || h > CARD_SIDE.max) throw bad();
  const out = new Uint8Array(keep.reduce((n, c) => n + c.length, 0));
  let o = 0;
  for (const c of keep){ out.set(c, o); o += c.length; }
  return { bytes:out, w, h };
}

/* Storage の画像を消す（ない画像は そのまま通る）。届かなかったら false（表の行は のこして、あとで消しなおす） */
async function dropCardObjects(names: string[]): Promise<boolean> {
  if (!names.length) return true;
  const auth = storageAuth();
  if (!auth) return false;
  try {
    const res = await fetch(storageBase() + '/object/' + CARD_BUCKET, {
      method:'DELETE',
      headers:{ ...auth, 'content-type':'application/json' },
      body:JSON.stringify({ prefixes:names }),
      signal:AbortSignal.timeout(15_000),
    });
    await res.body?.cancel();
    if (!res.ok){ await oops('card_storage', 'delete ' + res.status); return false; }
    return true;
  } catch {
    await oops('card_storage', 'unavailable');
    return false;
  }
}
/* カードの画像を消して、表の行も消す。names がないときは、会員が消えた行と CARD_KEEP_DAYS 日 使っていない行（100こまで） */
async function sweepCards(names?: string[]): Promise<'none' | 'done' | 'later'> {
  try {
    const list = names ?? (await sql`select name from app.cards
      where member_id is null or used_at < now() - make_interval(days => ${CARD_KEEP_DAYS}) order by used_at limit 100`).map(r => String(r.name));
    if (!list.length) return 'none';
    if (!await dropCardObjects(list)) return 'later';
    await sql`delete from app.cards where name in ${sql(list)}`;
    return 'done';
  } catch {
    await oops('sweep', 'cards');
    return 'later';
  }
}
/* ときどきの 掃除を してよいか（さいごから everyMs たっていたら、いまを 書いて true。1日1回などに するため） */
async function chore(name: string, everyMs: number): Promise<boolean> {
  try {
    const [r] = await sql`insert into app.chores (name, done_at) values (${name}, now())
      on conflict (name) do update set done_at = now() where app.chores.done_at < now() - make_interval(secs => ${Math.round(everyMs / 1000)})
      returning name`;
    return !!r;
  } catch { return false; }
}
/* 1日1回の 掃除：きのうより前の その日の回数、ERROR_KEEP_DAYS 日より前の エラーの数、まいごの カードの画像 */
async function sweepDaily() {
  const day = dayKey();
  try { await sql`delete from app.day_quota where day <= ${day}::date - ${QUOTA_DAYS}::int`; } catch { await oops('sweep', 'quota'); }
  try { await sql`delete from app.error_counts where day <= ${day}::date - ${ERROR_KEEP_DAYS}::int`; } catch { /* 数えられなくても よい */ }
  try { await sql`delete from app.notify_runs where day <= ${day}::date - ${NOTIFY_KEEP_DAYS}::int`; } catch { /* 表が ない */ }
  await sweepOrphans();
}
/* まいごの カードの画像（診断 1-8）：Storage の cards に あるのに 表に 行が ない画像（カードを置くのと やめるのが 同時だった、
   時間切れのあとに 置かれた など）。置いている さいちゅうの ものを 消さないように、1時間より前の ものだけ。1回 200まいまで。消した数を返す */
async function sweepOrphans(): Promise<number> {
  const auth = storageAuth();
  if (!auth) return 0;
  const found: string[] = [];
  try {
    for (let offset = 0; offset <= CARD_ALL_MAX * 2; offset += 1000){
      const res = await fetch(storageBase() + '/object/list/' + CARD_BUCKET, {
        method:'POST',
        headers:{ ...auth, 'content-type':'application/json' },
        body:JSON.stringify({ prefix:'', limit:1000, offset, sortBy:{ column:'name', order:'asc' } }),
        signal:AbortSignal.timeout(15_000),
      });
      if (!res.ok){ await res.body?.cancel(); await oops('card_orphans', 'list ' + res.status); return 0; }
      const list = await res.json() as unknown;
      if (!Array.isArray(list)) break;
      for (const o of list as Record<string, unknown>[]){
        const t = Date.parse(String(o?.created_at ?? ''));
        if (o && typeof o.name === 'string' && /^[A-Za-z0-9_-]{32}\.png$/.test(o.name) && t && Date.now() - t > 3600e3) found.push(o.name);
      }
      if (list.length < 1000) break;
    }
  } catch { await oops('card_orphans', 'list unavailable'); return 0; }
  if (!found.length) return 0;
  try {
    const known = new Set((await sql`select name from app.cards where name in ${sql(found)}`).map(r => String(r.name)));
    const lost = found.filter(n => !known.has(n)).slice(0, 200);
    if (!lost.length) return 0;
    return await dropCardObjects(lost) ? lost.length : 0;
  } catch { await oops('card_orphans', 'table'); return 0; }
}
/* 返事のあとも つづける（Supabase の EdgeRuntime.waitUntil）。ためしの環境（ない）では まつ */
function later(p: Promise<unknown>): Promise<unknown> {
  const er = (globalThis as unknown as { EdgeRuntime?: { waitUntil?: (p: Promise<unknown>) => void } }).EdgeRuntime;
  if (er && typeof er.waitUntil === 'function'){ er.waitUntil(p); return Promise.resolve(); }
  return p;
}

async function makeCard(req: Request, member: string) {
  const body = await readBody(req, BODY_MAX.card);
  const png = cleanPng(body.image);
  const auth = storageAuth();
  if (!auth) return { ok:false, why:'off', card:await cardStatus(member) };
  const sha = hexOf(await crypto.subtle.digest('SHA-256', png.bytes));
  const day = dayKey();
  const name = b64url(crypto.getRandomValues(new Uint8Array(24))) + '.png';
  let got: { reuse?: string; limit?: boolean; busy?: boolean; cap?: boolean }, key = '';
  try {
    key = await quotaKey(sql, member, 'card', day);
    got = await sql.begin(async tx => {
      /* 全員の1日の枚数も 数えるので、日付で ロックして 1まいずつ順に */
      await tx`select pg_advisory_xact_lock(hashtextextended(${'card:' + day}, 0))`;
      const [sv] = await tx`select 1 as x from app.saves where member_id = ${member}`;
      if (!sv) throw new HttpError(409, 'nosave');
      /* 同じ絵は つくりなおさない（枚数にも数えない）。使った日時を新しくして、そこから1年 */
      const [old] = await tx`update app.cards set used_at = now() where member_id = ${member} and sha = decode(${sha}, 'hex') returning name`;
      if (old) return { reuse:String(old.name) };
      /* 1人1日は その日だけの しるしで数える（やめて また はじめても もどらない。診断 1-6）。全員の1日・ぜんぶは 表の行で */
      if (await quotaUsed(tx, 'card', day, key) >= CARD_PER_DAY) return { limit:true };
      const [c] = await tx`select count(*)::int as everyone from app.cards where day = ${day}::date`;
      if (Number(c.everyone) >= CARD_ALL_PER_DAY) return { busy:true };
      const [all] = await tx`select count(*)::int as n from app.cards`;
      if (Number(all.n) >= CARD_ALL_MAX) return { busy:true, cap:true };
      await tx`insert into app.cards (name, member_id, sha, day) values (${name}, ${member}, decode(${sha}, 'hex'), ${day}::date)`;
      await quotaAdd(tx, 'card', day, key, 1);
      return {};
    });
  } catch (e) {
    if (e instanceof HttpError) throw e;
    await oops('card_table', 'table unavailable');
    return { ok:false, why:'off', card:{ on:false, left:0, perDay:CARD_PER_DAY } };
  }
  if (got.cap) await oops('card_cap', 'storage cap reached');
  if (got.limit) return { ok:false, why:'limit', card:await cardStatus(member) };
  if (got.busy) return { ok:false, why:'busy', card:await cardStatus(member) };
  if (got.reuse) return { ok:true, url:cardUrl(got.reuse), w:png.w, h:png.h, card:await cardStatus(member) };
  let put = false;
  try {
    const res = await fetch(storageBase() + '/object/' + CARD_BUCKET + '/' + name, {
      method:'POST',
      headers:{ ...auth, 'content-type':'image/png', 'cache-control':'max-age=3600', 'x-upsert':'false' },
      body:png.bytes,
      signal:AbortSignal.timeout(15_000),
    });
    await res.body?.cancel();
    put = res.ok;
    if (!put) await oops('card_storage', 'put ' + res.status);
  } catch { await oops('card_storage', 'unavailable'); }
  if (!put){
    /* 置けなかったら、枚数を返す */
    await sql`delete from app.cards where name = ${name}`;
    await quotaAdd(sql, 'card', day, key, -1);
    return { ok:false, why:'unavailable', card:await cardStatus(member) };
  }
  /* 1人が とっておけるのは 新しい CARD_KEEP_PER_MEMBER 枚まで。こえた古いものは 画像ごと消す（返事のあとに うしろで） */
  try {
    const extra = (await sql`select name from app.cards where member_id = ${member}
      order by used_at desc, created_at desc offset ${CARD_KEEP_PER_MEMBER}`).map(r => String(r.name));
    if (extra.length) await later(sweepCards(extra));
  } catch { await oops('card_table', 'trim failed'); }
  return { ok:true, url:cardUrl(name), w:png.w, h:png.h, card:await cardStatus(member) };
}

/* ----- よるの おしらせ（2026-11-14 オーナー決定） -----
   きょうの おねがいが のこっている 日の 21時（日本時間）に、LINE公式アカウント「うちのこ日和」から 1通。
   うけとるのは 本人が オンに した人だけ（members.notify。はじめは null＝まだ きいていない）。友だちに なっていない・ブロックしている人には
   LINE が とどけない（通数にも 数えない）。NOTIFY_IDLE_DAYS 日 ひらいていない人・おねがいを ぜんぶ かなえた人には おくらない */
type NotifyStatus = { on: boolean | null; ready: boolean; hour: number };
async function notifyStatus(member: string): Promise<NotifyStatus> {
  try {
    const [m] = await sql`select notify from app.members where id = ${member}`;
    return { on:m && typeof m.notify === 'boolean' ? m.notify : null, ready:!!notifyToken(), hour:notifyHour() };
  } catch {
    await oops('notify_table', 'unavailable');
    return { on:null, ready:false, hour:notifyHour() };
  }
}
/* オン・オフ（本人だけ。1秒に 1回まで） */
async function setNotify(req: Request, member: string) {
  const body = await readBody(req, BODY_MAX.notify);
  if (typeof body.on !== 'boolean') throw new HttpError(400, 'badnotify');
  let row: Record<string, unknown> | undefined;
  try {
    [row] = await sql`update app.members set notify = ${body.on}, notify_at = now()
      where id = ${member} and (notify_at is null or notify_at < now() - interval '1 second') returning id`;
  } catch {
    await oops('notify_table', 'unavailable');
    throw new HttpError(503, 'unavailable');
  }
  if (!row){
    const [m] = await sql`select 1 as x from app.members where id = ${member}`;
    throw m ? new HttpError(429, 'slow') : new HttpError(401, 'nosession');
  }
  return { notify:await notifyStatus(member), now:Date.now() };
}

/* 日本時間の 時（0〜23） */
const jstHour = (t = Date.now()) => new Date(t + 9 * 3600e3).getUTCHours();
const pause = (ms: number) => new Promise(r => setTimeout(r, ms));

/* セーブから メッセージを作る（おくらない人は null）。ルールは 画面と同じ Rules（サーバーの時計＝日本時間）で、セーブは かえない */
type NotifyText = { name: string; left: number; text: string; chip: string };
function notifyText(raw: unknown): NotifyText | null {
  let st: Record<string, unknown>;
  try {
    st = JSON.parse(JSON.stringify(raw));
    if (!st || typeof st !== 'object' || !st.pet) return null;
    ensureState(st);
  } catch { return null; }
  const left = Number(Rules.reqLeft(st));
  if (!(left > 0)) return null;
  const si = Rules.streakInfo(st) as { n: number; pinch: boolean };
  const pet = st.pet as Record<string, unknown>;
  const name = cleanText(String(pet.name || ''), 10).trim() || 'うちのこ';
  const daily = st.daily as { list?: { done?: boolean }[] } | undefined;
  const threeDone = !!(daily && Array.isArray(daily.list) && daily.list.length && daily.list.every(r => r && r.done));
  if (si.pinch){
    return { name, left, chip:'', text:threeDone
      ? `れんぞく${si.n}日がピンチ！のこりは、おたすけのおねがい1つ。きょうのうちに、あいにきてね`
      : `れんぞく${si.n}日がピンチ！おたすけのおねがいもいれて、あと${left}つ。きょうのうちに、あいにきてね` };
  }
  return { name, left, chip:si.n >= 2 ? `れんぞく${si.n}日` : '', text:`きょうのおねがいが、あと${left}つのこっているよ。ねるまえに、すこしあいにきてね` };
}
/* LINE の Flex Message（見本 L2：見出し・ひとこと・れんぞくの しるし・ミニアプリを ひらく ボタン）。通知の 文は altText。
   LINE は 改行の 位置を えらべないので、画面の 文と ちがって ことばの あいだに スペースを 入れない（読点で 区切る。2026-11-14 オーナー） */
function notifyFlex(t: NotifyText) {
  const body: Record<string, unknown>[] = [
    { type:'text', text:`🌙 ${t.name}より`, weight:'bold', size:'lg', color:'#111111', wrap:true },
    { type:'text', text:t.text, size:'sm', color:'#444444', wrap:true },
  ];
  if (t.chip) body.push({ type:'box', layout:'horizontal', contents:[
    { type:'box', layout:'vertical', flex:0, backgroundColor:'#F6E3E9', cornerRadius:'12px', paddingStart:'10px', paddingEnd:'10px', paddingTop:'2px', paddingBottom:'2px',
      contents:[{ type:'text', text:t.chip, size:'xs', color:'#B93B5E', weight:'bold' }] },
    { type:'filler' },
  ] });
  return {
    type:'flex', altText:`${t.name}：きょうのおねがい、あと${t.left}つ`,
    contents:{
      type:'bubble',
      body:{ type:'box', layout:'vertical', spacing:'md', contents:body },
      footer:{ type:'box', layout:'vertical', contents:[
        { type:'button', style:'primary', height:'sm', color:'#2A7F6D', action:{ type:'uri', label:'うちのこ日和をひらく', uri:NOTIFY_OPEN } },
      ] },
    },
  };
}
/* 同じ人・同じ日の おくりなおしは LINE が 1回に まとめる（X-Line-Retry-Key。UUID の形） */
async function notifyKey(member: string, day: string): Promise<string> {
  const h = await sha256hex('notify:' + member + ':' + day);
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-${'89ab'[parseInt(h[16], 16) & 3]}${h.slice(17, 20)}-${h.slice(20, 32)}`;
}
/* 1通 おくる。'ok'（とどけた・もう うけつけていた 409）・'limit'（月の 通数の 上限）・'auth'（トークンが ちがう）・ほかは しっぱいの 合図 */
async function linePush(token: string, to: string, msg: unknown, key: string): Promise<string> {
  for (let i = 0; i < 2; i++){
    let res: Response;
    try {
      res = await fetch(LINE_PUSH, {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Authorization':'Bearer ' + token, 'X-Line-Retry-Key':key },
        body:JSON.stringify({ to, messages:[msg] }),
        signal:AbortSignal.timeout(10_000),
      });
    } catch {
      if (i === 0){ await pause(800); continue; }
      return 'net';
    }
    if (res.ok || res.status === 409){ await res.body?.cancel(); return 'ok'; }
    let v: Record<string, unknown> = {};
    try { v = await res.json(); } catch { /* 下へ */ }
    if (res.status === 429 && /monthly limit/i.test(String(v.message || ''))) return 'limit';
    if (res.status === 401 || res.status === 403) return 'auth';
    if ((res.status >= 500 || res.status === 429) && i === 0){ await pause(1000); continue; }
    return 'http' + res.status;
  }
  return 'net';
}
/* cron から：合いことばを たしかめて（1回だけ）、おくるのは 返事の あとに うしろで */
async function notifyRun(req: Request) {
  const word = req.headers.get('x-notify') || '';
  if (!/^[0-9a-f]{64}$/.test(word)) throw new HttpError(403, 'forbidden');
  if (jstHour() < notifyHour()) throw new HttpError(409, 'early');
  const day = dayKey();
  const hex = await sha256hex(word);
  let run: Record<string, unknown> | undefined;
  try {
    [run] = await sql`update app.notify_runs set used_at = now(), nonce_hash = null
      where day = ${day}::date and nonce_hash = decode(${hex}, 'hex') and used_at is null
        and made_at > now() - make_interval(secs => ${NOTIFY_WORD_SECS}) returning day`;
  } catch {
    await oops('notify_table', 'run');
    throw new HttpError(503, 'unavailable');
  }
  if (!run) throw new HttpError(403, 'forbidden');
  await later(notifySend(day));
  return { ok:true, day };
}
/* オンの人を 50人ずつ 見て、のこっている人に おくる。おくる前に その日の しるし（notified_on）を つける（2通 おくらない）。
   月の 通数の 上限・トークンの まちがいは そこで やめる。数だけを app.notify_runs に のこす */
async function notifySend(day: string) {
  const tally = { sent:0, skipped:0, failed:0, note:'' };
  const token = notifyToken();
  if (!token) tally.note = 'notoken';
  else {
    try {
      let after = '', seen = 0;
      outer: while (seen < notifyMax()){
        const rows = await sql`select m.id::text as id, a.sub, s.data from app.members m
          join app.line_accounts a on a.member_id = m.id join app.saves s on s.member_id = m.id
          where m.notify is true and (m.notified_on is null or m.notified_on < ${day}::date)
            and m.last_seen_at > now() - make_interval(days => ${notifyIdleDays()}) and m.id::text > ${after}
          order by m.id::text limit 50`;
        if (!rows.length) break;
        for (const row of rows){
          after = String(row.id);
          if (++seen > notifyMax()) break outer;
          const t = notifyText(row.data);
          if (!t){ tally.skipped++; continue; }
          const [claim] = await sql`update app.members set notified_on = ${day}::date
            where id = ${row.id} and notify is true and (notified_on is null or notified_on < ${day}::date) returning id`;
          if (!claim){ tally.skipped++; continue; }
          const r = await linePush(token, String(row.sub), notifyFlex(t), await notifyKey(String(row.id), day));
          if (r === 'ok'){ tally.sent++; continue; }
          tally.failed++;
          if (r === 'limit' || r === 'auth'){ tally.note = r; await oops('notify_' + r, r === 'limit' ? 'monthly limit' : 'token refused'); break outer; }
          await oops('notify_push', r);
        }
      }
    } catch {
      tally.note = 'error';
      await oops('notify_send', 'stopped');
    }
  }
  try {
    await sql`update app.notify_runs set done_at = now(), sent = ${tally.sent}, skipped = ${tally.skipped}, failed = ${tally.failed}, note = ${tally.note || null}
      where day = ${day}::date`;
  } catch { await oops('notify_table', 'record'); }
  return tally;
}

/* ----- やめる（退会） ----- */
/* LINE に、この人が うちのこ日和に あたえた許可を取り消してもらう。結果は 'done'（取り消した）・'already'（もう取り消されていた／トークンが切れている）・
   'nosecret'（その内部チャネルのシークレットがない）・'notoken'（アクセストークンが来なかった）・'failed'（LINE に届かない・ほかのチャネルのトークン など）。
   開発用・審査用・本番用で チャネルIDとシークレットが べつなので、まずアクセストークンを LINE で確かめて client_id（チャネルID）を知る */
function channelSecret(ch: string): string {
  return env('LINE_CHANNEL_SECRET_' + ch) || (ch === CHANNELS[0] ? env('LINE_CHANNEL_SECRET') : '');   /* Secrets。使うときだけ読む */
}
async function deauthorize(userAccessToken: string | null): Promise<string> {
  if (!userAccessToken) return 'notoken';
  try {
    const v = await fetch(LINE_VERIFY + '?access_token=' + encodeURIComponent(userAccessToken), { signal:AbortSignal.timeout(8000) });
    if (v.status === 400 || v.status === 401) return 'already';
    let vv: Record<string, unknown> = {};
    try { vv = await v.json(); } catch { /* 下で弾く */ }
    const ch = String(vv.client_id ?? '');
    if (!v.ok || !(Number(vv.expires_in) > 0)){ if (!v.ok) await oops('leave_line', 'verify ' + v.status); return v.ok ? 'already' : 'failed'; }
    if (!CHANNELS.includes(ch)){ console.error('leave: token of another channel'); return 'failed'; }
    const secret = channelSecret(ch);
    if (!secret){ await oops('leave_secret', 'no channel secret ' + ch); return 'nosecret'; }
    const t = await fetch(LINE_TOKEN, {
      method:'POST',
      headers:{ 'Content-Type':'application/x-www-form-urlencoded' },
      body:new URLSearchParams({ grant_type:'client_credentials', client_id:ch, client_secret:secret }),
      signal:AbortSignal.timeout(8000),
    });
    let tv: Record<string, unknown> = {};
    try { tv = await t.json(); } catch { /* 下で弾く */ }
    if (!t.ok || typeof tv.access_token !== 'string'){ await oops('leave_line', 'channel token ' + t.status); return 'failed'; }
    const r = await fetch(LINE_DEAUTH, {
      method:'POST',
      headers:{ 'Authorization':'Bearer ' + tv.access_token, 'Content-Type':'application/json' },
      body:JSON.stringify({ userAccessToken }),
      signal:AbortSignal.timeout(8000),
    });
    if (r.status === 204 || r.ok) return 'done';
    if (r.status === 400) return 'already';
    await oops('leave_line', 'deauthorize ' + r.status);
    return 'failed';
  } catch {
    await oops('leave_line', 'line unavailable');
    return 'failed';
  }
}

async function leave(req: Request, member: string) {
  const body = await readBody(req, BODY_MAX.leave);
  if (body.confirm !== 'leave') throw new HttpError(400, 'noconfirm');
  const at = typeof body.accessToken === 'string' && /^[\w.~+/=-]{10,4096}$/.test(body.accessToken) ? body.accessToken : null;
  let cards: string[] = [];
  try { cards = (await sql`select name from app.cards where member_id = ${member}`).map(r => String(r.name)); }
  catch { await oops('card_table', 'table unavailable'); }   /* カードの表が読めなくても、やめる人のデータは消す */
  /* 会員の行を消すと、LINEのひもづけ・セッション・セーブ・セーブの ひかえも いっしょに消える（on delete cascade。その日の AI・カードの回数は のこる）。
     カードの行は member_id が null になり、ここで Storage の画像ごと消す（届かなければ、あとの掃除で消す） */
  const [gone] = await sql`delete from app.members where id = ${member} returning id`;
  if (!gone) throw new HttpError(401, 'nosession');
  const deauth = await deauthorize(at);   /* 1つずつ順に（エラーの数も DB に書くため） */
  const card = await sweepCards(cards);
  return { ok:true, deauth, cards:card };
}

async function route(req: Request): Promise<unknown> {
  const path = new URL(req.url).pathname.replace(/^.*?\/api(?=\/|$)/, '') || '/';
  const m = req.method;
  /* errors：この ERROR_SUM_DAYS 日の サーバーの エラーの数（数えられないときは null。診断 5-2） */
  if (path === '/health' && m === 'GET') return { ok:true, now:Date.now(), day:dayKey(), cards:!!storageAuth(), notify:!!notifyToken(), errors:await errorTotal() };
  if (path === '/login' && m === 'POST') return await login(req);
  if (path === '/save' && m === 'GET') return await getSave(await sessionMember(req));
  if (path === '/save' && m === 'POST') return await putSave(req, await sessionMember(req));
  if (path === '/act' && m === 'POST') return await act(req, await sessionMember(req));
  if (path === '/import' && m === 'POST') return await importCode(req, await sessionMember(req));
  if (path === '/ai' && m === 'GET') return { ai:await aiStatus(await sessionMember(req)), now:Date.now() };
  if (path === '/read' && m === 'POST') return await aiRead(req, await sessionMember(req));
  if (path === '/leave' && m === 'POST') return await leave(req, await sessionMember(req));
  if (path === '/card' && m === 'GET') return { card:await cardStatus(await sessionMember(req)), now:Date.now() };
  if (path === '/card' && m === 'POST') return await makeCard(req, await sessionMember(req));
  if (path === '/notify' && m === 'GET') return { notify:await notifyStatus(await sessionMember(req)), now:Date.now() };
  if (path === '/notify' && m === 'POST') return await setNotify(req, await sessionMember(req));
  if (path === '/notify/run' && m === 'POST') return await notifyRun(req);
  throw new HttpError(404, 'notfound');
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get('origin');
  if (req.method === 'OPTIONS') return new Response(null, { status:204, headers:corsHeaders(origin) });
  try {
    return json(await route(req), 200, origin);
  } catch (e) {
    if (e instanceof HttpError) return json({ error:e.code, ...e.extra }, e.status, origin);
    await oops('server', e instanceof Error ? e.name + ': ' + e.message.slice(0, 200) : 'unknown');
    return json({ error:'server' }, 500, origin);
  }
});
