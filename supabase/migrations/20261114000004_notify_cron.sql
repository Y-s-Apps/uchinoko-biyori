-- うちのこ日和（LINE版）：よるの おしらせを 毎日 21時（日本時間）＝ 12:00（UTC）に はじめる（Supabase Cron＝pg_cron と pg_net）
--
-- 1回きりの 合いことば（32バイトの でたらめ）は DB の中で作り、ハッシュだけを app.notify_runs に のこして、
-- Edge Function `api` の POST /notify/run に ヘッダー x-notify で わたす。`api` は きょうの行の ハッシュと くらべて、
-- 10分の うちの 1回だけ うけつける（つかったら ハッシュを消す）。鍵や トークンは つかわないので、Vault にも 何も置かない。
-- もう おくった日（used_at が ある）は なにもしない。
-- この ファイルは ためし（PGlite）では 読まない（tools/line_e2e.py。pg_cron・pg_net が ないため）。
create extension if not exists pg_cron with schema pg_catalog;

create or replace function app.notify_kick() returns bigint
language plpgsql
set search_path = ''
as $$
declare
  w text := encode(extensions.gen_random_bytes(32), 'hex');
  d date := (now() at time zone 'Asia/Tokyo')::date;
begin
  insert into app.notify_runs (day, nonce_hash, made_at) values (d, extensions.digest(w, 'sha256'), now())
    on conflict (day) do update set nonce_hash = excluded.nonce_hash, made_at = excluded.made_at
    where app.notify_runs.used_at is null;
  if not found then
    return null;
  end if;
  return net.http_post(
    url := 'https://ftakgswltcavwixqxpzi.supabase.co/functions/v1/api/notify/run',
    body := '{}'::jsonb,
    headers := jsonb_build_object('content-type', 'application/json', 'x-notify', w),
    timeout_milliseconds := 30000
  );
end $$;
comment on function app.notify_kick() is 'よるの おしらせを はじめる（毎日 21時 JST の cron から）。1回きりの 合いことばを 作って /notify/run を よぶ';
revoke all on function app.notify_kick() from public, anon, authenticated, uchinoko_api;

do $$ begin
  if exists (select 1 from cron.job where jobname = 'uchinoko-notify') then
    perform cron.unschedule('uchinoko-notify');
  end if;
end $$;
select cron.schedule('uchinoko-notify', '0 12 * * *', 'select app.notify_kick()');
