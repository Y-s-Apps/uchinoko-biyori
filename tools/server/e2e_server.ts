/* LINE版の通し確認（tools/line_e2e.py）用のサーバー。
 * supabase/functions/api/index.ts をそのまま動かし、DB は PGlite（メモリの中の Postgres）、
 * LINE の IDトークンの検証（api.line.me）だけを、ここでまねる（本物のサーバーにはこのしくみは入らない）。
 *   ためしのIDトークン：<base64url({})>.<base64url({aud:"2012410263", sub:"U…"})>.test
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
await admin.unsafe(await Deno.readTextFile(MIG));

const realFetch = globalThis.fetch;
globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = String(input instanceof Request ? input.url : input);
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
