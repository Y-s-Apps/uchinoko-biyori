/* LINE版の通し確認（tools/line_e2e.py）用のサーバー。
 * supabase/functions/api/index.ts をそのまま動かし、DB は PGlite（メモリの中の Postgres）、
 * LINE の IDトークンの検証（api.line.me）だけを、ここでまねる（本物のサーバーにはこのしくみは入らない）。
 *   ためしのIDトークン：<base64url({})>.<base64url({aud:"2012410263", sub:"U…"})>.test
 * やめる人の LINE の許可の取り消し（oauth2/v3/token・user/v1/deauthorize）と、AIの読みとり（api.anthropic.com）も、ここでまねる（/__debug/ai で返事の種類を変え、届いた写真の大きさを見る）。
 * /__debug/… は確認用（このファイルの中だけ）。
 */
import postgres from 'npm:postgres@3.4.5';

const [FN, MIG, PORT] = Deno.args;
const DB = Deno.env.get('SUPABASE_DB_URL')!;

const admin = postgres(DB, { prepare:false, max:1 });
await admin.unsafe(`do $$ begin
  if not exists (select 1 from pg_roles where rolname='anon') then create role anon; end if;
  if not exists (select 1 from pg_roles where rolname='authenticated') then create role authenticated; end if;
end $$;`);
for (const f of MIG.split(',')) await admin.unsafe(await Deno.readTextFile(f));

Deno.env.set('ANTHROPIC_API_KEY', 'test-key');
Deno.env.set('LINE_CHANNEL_SECRET', 'test-secret');
const LINE = { deauth:0, token:'' };   /* やめる人の許可の取り消し（deauthorize）のまね */
const AI = { mode:'ok', calls:0, media:'', bytes:0, w:0, h:0 };
const AI_OK = { species:'dog', candidates:[{ id:'pomeranian', confidence:0.82 }, { id:'shiba', confidence:0.1 }], colorName:'クリーム', comment:'ふわふわの クリームいろだね',
  look:{ ear:'small', coat:'fluffy', muzzle:'short', tail:'plume', legs:'normal', face:'lower',
    colors:{ main:'#F3DDB3', body:'#F3DDB3', face:'#FBF3E6', chest:'#FBF3E6', paws:'#FBF3E6', eye:'#2B1E1A', nose:'#2E2328', tailTip:null }, marks:{} } };
/* JPEG の大きさ（SOF のところ）を読む */
function jpegSize(b: Uint8Array){
  for (let i = 2; i + 9 < b.length;){
    if (b[i] !== 0xFF){ i++; continue; }
    const m = b[i + 1], len = (b[i + 2] << 8) | b[i + 3];
    if (m >= 0xC0 && m <= 0xC3) return { h:(b[i + 5] << 8) | b[i + 6], w:(b[i + 7] << 8) | b[i + 8] };
    i += 2 + len;
  }
  return { w:0, h:0 };
}
const realFetch = globalThis.fetch;
globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = String(input instanceof Request ? input.url : input);
  if (url === 'https://api.anthropic.com/v1/messages'){
    AI.calls++;
    const src = JSON.parse(String(init!.body)).messages[0].content[0].source;
    const bytes = Uint8Array.from(atob(src.data), c => c.charCodeAt(0));
    Object.assign(AI, { media:src.media_type, bytes:bytes.length }, jpegSize(bytes));
    await new Promise(r => setTimeout(r, 600));
    const text = AI.mode === 'other' ? '{"species":"other"}' : JSON.stringify(AI_OK);
    if (AI.mode === 'down') return new Response('{"type":"error","error":{"type":"api_error"}}', { status:500 });
    return new Response(JSON.stringify({ type:'message', role:'assistant', content:[{ type:'text', text }], stop_reason:'end_turn' }));
  }
  if (url.startsWith('https://api.line.me/oauth2/v2.1/verify?access_token=')){
    /* やめる人のアクセストークンの確かめ（e2e のトークンは 開発用の内部チャネルのもの） */
    if (new URL(url).searchParams.get('access_token') !== 'e2e-access-token') return new Response(JSON.stringify({ error:'invalid_request' }), { status:400 });
    return new Response(JSON.stringify({ scope:'openid profile', client_id:'2012410263', expires_in:3600 }));
  }
  if (url === 'https://api.line.me/oauth2/v3/token'){
    return new Response(JSON.stringify({ token_type:'Bearer', access_token:'chan-token', expires_in:900 }));
  }
  if (url === 'https://api.line.me/user/v1/deauthorize'){
    LINE.deauth++;
    LINE.token = JSON.parse(String(init!.body)).userAccessToken;
    return new Response(null, { status:204 });
  }
  if (url === 'https://api.line.me/oauth2/v2.1/verify'){
    const p = new URLSearchParams(String(init!.body));
    const [, body, sig] = String(p.get('id_token')).split('.');
    try {
      const o = JSON.parse(atob(body.replace(/-/g, '+').replace(/_/g, '/')));
      if (sig === 'test' && o.aud === p.get('client_id') && typeof o.sub === 'string'){
        return new Response(JSON.stringify({ iss:'https://access.line.me', sub:o.sub, aud:o.aud, exp:Math.floor(Date.now() / 1000) + 3600 }));
      }
    } catch { /* 下へ */ }
    return new Response(JSON.stringify({ error:'invalid_request', error_description:'Invalid IdToken.' }), { status:400 });
  }
  return realFetch(input, init);
}) as typeof fetch;

const serve = Deno.serve.bind(Deno);
let handler!: (r: Request) => Promise<Response>;
(Deno as unknown as { serve: unknown }).serve = (h: typeof handler) => { handler = h; return {}; };
await import(FN);

const j = (v: unknown, status = 200) => new Response(JSON.stringify(v), { status, headers:{ 'content-type':'application/json' } });
serve({ port:Number(PORT), hostname:'127.0.0.1', onListen(){ console.log('e2e server ready'); } }, async req => {
  const u = new URL(req.url);
  if (u.pathname === '/__debug/state'){
    const rows = await admin`select a.sub, m.id, m.imported_at is not null as imported, s.rev::int as rev,
      s.data->'pet'->>'name' as name, s.data->'pet'->'photo' as photo, (s.data->>'created')::bigint as created,
      (s.data->'stats'->>'love')::float as love, (s.data->'counts'->>'meals')::int as meals, (s.data->'counts'->>'pets')::int as pets
      from app.line_accounts a join app.members m on m.id = a.member_id left join app.saves s on s.member_id = m.id order by a.sub`;
    return j(rows);
  }
  if (u.pathname === '/__debug/ai'){
    /* AIのまねの返事を変える／届いたものを見る */
    if (req.method === 'POST') Object.assign(AI, await req.json());
    const [{ n }] = await admin`select coalesce(sum(n), 0)::int as n from app.ai_usage`;
    return j({ ...AI, used:n });
  }
  if (u.pathname === '/__debug/line'){
    const [{ n }] = await admin`select count(*)::int as n from app.members`;
    return j({ ...LINE, members:n });
  }
  if (u.pathname === '/__debug/bump'){
    /* べつの端末で遊んだことにする：名前を変え、updated を1時間先に、rev を1つ進める */
    const { sub, name } = await req.json();
    await admin`update app.saves s set data = jsonb_set(jsonb_set(s.data, '{pet,name}', to_jsonb(${name}::text)), '{updated}', to_jsonb(${Date.now() + 3600e3}::bigint)),
      rev = rev + 1 from app.line_accounts a where a.member_id = s.member_id and a.sub = ${sub}`;
    return j({ ok:true });
  }
  if (u.pathname === '/__debug/patch'){
    /* 数字のまね：おなか（と、前のおせわの時刻を前に） */
    const { sub, full } = await req.json();
    await admin`update app.saves s set data = jsonb_set(jsonb_set(s.data, '{stats,full}', to_jsonb(${full}::float)), '{srv}', '{"cd":0}'::jsonb)
      from app.line_accounts a where a.member_id = s.member_id and a.sub = ${sub}`;
    return j({ ok:true });
  }
  return handler(req);
});
