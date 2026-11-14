-- うちのこ日和（LINE版）：よるの おしらせの cron を 1日 2回に する（21:00 と 21:05、日本時間＝12:00・12:05 UTC。さいごのチェック F2-1）
--
-- 前は 21:00 の 1回きりで、その よびだしが サーバーに とどかない（関数の 起動の しっぱい・時間切れ）か、
-- サーバーの 時計が 少し おくれて 409 early に なると、その日は だれにも おしらせが 出なかった。
-- app.notify_kick() は もう 合いことばを うけつけた日（used_at が ある）は なにもしないので、21:05 は 21:00 の回が
-- とどかなかった・ことわられた日だけ 合いことばを 作りなおして よびなおす（だれにも 2通 とどかない）。
-- この ファイルは ためし（PGlite）では 読まない（名前に cron。tools/line_e2e.py）。
do $$ begin
  if exists (select 1 from cron.job where jobname = 'uchinoko-notify') then
    perform cron.unschedule('uchinoko-notify');
  end if;
end $$;
select cron.schedule('uchinoko-notify', '0,5 12 * * *', 'select app.notify_kick()');
