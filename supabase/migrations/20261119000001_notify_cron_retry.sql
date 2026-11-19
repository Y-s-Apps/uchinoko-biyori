-- うちのこ日和（LINE版）：よるの おしらせの 21:05 の やりなおしを、とちゅうで 止まった回にも きかせる（2026-11-19）
--
-- 2026-11-16 の 21:00 は、サーバーの 関数が 合いことばを うけつけた（used_at を 書いた）直後に 落ちて（503）、
-- おくる しごと（notifySend）が はじまらず、done_at が 空の ままだった。前の app.notify_kick() は used_at が ある日は
-- なにも しないので、21:05 も 動かず、その日は だれにも おしらせが 出なかった（「サーバーを起こす」が 11-17 に 失敗にして 気づけた）。
--
-- いまは、used_at が あっても done_at が 空で、うけつけてから 3分 より 前なら「とちゅうで 止まった」と みて、
-- used_at を 空に もどし、合いことばを 作りなおして よびなおす。
-- - 3分：Edge Function は 無料プランで 150秒（有料でも 400秒）で 止まるので、3分 たって おわっていない回は もう 動いていない。
-- - 2通 とどかない：サーバーは おくる前に 会員ごとに その日の しるし（members.notified_on）を つけ、LINE の
--   リトライキー（会員と 日付）も 同じなので、前の回で とどいた人には もう おくらない。
-- - 21:00 の 回が ぶじに おわった日（done_at が ある）は、いままでどおり なにも しない。
-- この ファイルは ためし（PGlite）では 読まない（名前に cron。tools/line_e2e.py）。
create or replace function app.notify_kick() returns bigint
language plpgsql
set search_path = ''
as $$
declare
  w text := encode(extensions.gen_random_bytes(32), 'hex');
  d date := (now() at time zone 'Asia/Tokyo')::date;
begin
  insert into app.notify_runs (day, nonce_hash, made_at) values (d, extensions.digest(w, 'sha256'), now())
    on conflict (day) do update set nonce_hash = excluded.nonce_hash, made_at = excluded.made_at, used_at = null
    where app.notify_runs.used_at is null
       or (app.notify_runs.done_at is null and app.notify_runs.used_at < now() - interval '3 minutes');
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
comment on function app.notify_kick() is 'よるの おしらせを はじめる（毎日 21時・21時5分 JST の cron から）。1回きりの 合いことばを 作って /notify/run を よぶ。21時5分は 21時の回が とどかなかった・ことわられた・とちゅうで 止まった日だけ';
revoke all on function app.notify_kick() from public, anon, authenticated, uchinoko_api;
