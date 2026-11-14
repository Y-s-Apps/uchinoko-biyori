-- うちのこ日和（LINE版）：よるの おしらせ（通知。2026-11-14 オーナー決定）
--
-- きょうの おねがいが のこっている 日の 21時（日本時間）に、LINE公式アカウント「うちのこ日和」（Messaging API）から
-- メッセージを おくる。うけとるのは 自分で オンに した人だけ（はじめは オフ）。くわしくは docs/PROJECT.md 10章「しくみ（よるの おしらせ）」。
--
-- members.notify      … うけとるか（null＝まだ きいていない・true＝オン・false＝オフ）。変えるのは 本人だけ（POST /notify）
-- members.notify_at   … オン・オフを かえた日時
-- members.notified_on … さいごに おしらせを おくった日（日本時間）。同じ日に 2通 おくらない
-- 会員を消すと（「LINEの データを けす」・2年）、いっしょに消える。
alter table app.members add column if not exists notify boolean;
alter table app.members add column if not exists notify_at timestamptz;
alter table app.members add column if not exists notified_on date;
create index if not exists members_notify_idx on app.members (id) where notify;

-- 毎日の 送る回（日本時間の 日付ごとに 1行）。cron（app.notify_kick、つぎの マイグレーション）が 1回きりの 合いことばの ハッシュを書き、
-- `api` の POST /notify/run が それを つかって（used_at。ハッシュは 消す）、おくった数・とばした数・しっぱいの数を のこす。
-- だれに おくったかは 入れない。60日で消す
create table if not exists app.notify_runs (
  day date primary key,
  nonce_hash bytea check (nonce_hash is null or length(nonce_hash) = 32),
  made_at timestamptz not null default now(),
  used_at timestamptz,
  done_at timestamptz,
  sent int not null default 0 check (sent >= 0),
  skipped int not null default 0 check (skipped >= 0),
  failed int not null default 0 check (failed >= 0),
  note text check (note is null or note ~ '^[a-z0-9_]{1,40}$')
);
comment on table app.notify_runs is 'よるの おしらせを おくった回（日付ごと）。合いことばは ハッシュだけ・つかったら 消す。数だけで だれかは 入れない。60日で消す';
alter table app.notify_runs enable row level security;
revoke all on app.notify_runs from public, anon, authenticated;
grant select, insert, update, delete on app.notify_runs to uchinoko_api;
do $$ begin
  if not exists (select 1 from pg_policies where schemaname = 'app' and tablename = 'notify_runs' and policyname = 'api_role_all') then
    create policy api_role_all on app.notify_runs for all to uchinoko_api using (true) with check (true);
  end if;
end $$;
