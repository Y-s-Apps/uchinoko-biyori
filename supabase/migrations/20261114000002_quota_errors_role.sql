-- うちのこ日和（LINE版）：その日の回数・エラーの数・ときどきの掃除・app だけ さわれる役（約束①の診断 1-6・5-2・1-8・1-10、2026-11-14）
--
-- 1-6：AIの読みとりと うちのこカードの「1人1日」の回数は、会員ではなく その日だけの しるしで数える。
--      しるし（who）は「種類:日付:LINE の sub」の SHA-256（日ごとに かわり、もとに もどせない）。
--      会員の行と つながっていないので、「LINEの データを けす」で やめて また はじめても、その日の上限は もどらない。
--      `api` が きのうより前の行を消す（2日だけ のこる。プライバシーポリシー 6.）。
--      全員の1日の上限（AI 300回）も ここから数える。前の app.ai_usage（会員ごと）は 使わなくなったので消す。
create table if not exists app.day_quota (
  day date not null,                                        -- 日本時間の日付
  kind text not null check (kind in ('ai', 'card')),        -- AIの読みとり・うちのこカード（新しい絵）
  who bytea not null check (length(who) = 32),              -- その日だけの しるし（SHA-256）
  n int not null default 0 check (n >= 0),
  primary key (day, kind, who)
);
comment on table app.day_quota is 'その日の AI・カードの回数。しるしは 種類と日付と LINE の sub の SHA-256（日ごとに かわる）。2日で消す';
alter table app.day_quota enable row level security;
revoke all on app.day_quota from public, anon, authenticated;

drop table if exists app.ai_usage;

-- 5-2：サーバーの エラーの数（日本時間の日付・種類ごとに 1行。数だけで、中身は のこさない）。
--      GET /health が この3日の合計を返し、GitHub Actions「サーバーを起こす」が 多ければ 失敗にする（メールが とどく）。60日で消す
create table if not exists app.error_counts (
  day date not null,
  kind text not null check (kind ~ '^[a-z0-9_]{1,40}$'),
  n int not null default 0 check (n >= 0),
  primary key (day, kind)
);
comment on table app.error_counts is 'サーバーの エラーの数（日付・種類ごと）。中身は のこさない。60日で消す';
alter table app.error_counts enable row level security;
revoke all on app.error_counts from public, anon, authenticated;

-- 1-8：ときどきの 掃除（まいごの カードの画像を消す など）を さいごに した日時。だれかの ログインのとき、1日1回まで
create table if not exists app.chores (
  name text primary key check (name ~ '^[a-z_]{1,40}$'),
  done_at timestamptz not null default now()
);
comment on table app.chores is 'ときどきの 掃除を さいごに した日時（1日1回まで）';
alter table app.chores enable row level security;
revoke all on app.chores from public, anon, authenticated;

-- 1-10：Edge Function `api` が つなぐための、app の表だけ 読み書きできる役。
--      パスワードは ここでは つけない（公開リポジトリに 書かないため）。オーナーが SQL エディタで
--        alter role uchinoko_api with password '…';
--      を して、同じ文字を Edge Function の Secrets の APP_DB_PASSWORD に入れると、`api` は この役で つなぐ
--      （パスワードが ない・つなげないあいだは、いままでどおり SUPABASE_DB_URL＝持ち主 で つなぐ）。
--      Storage・pg_net・auth など app の ほかには さわれない。RLS は この役のための ポリシーで ひらく（ほかの役には ひらかない）。
do $$ begin
  if not exists (select 1 from pg_roles where rolname = 'uchinoko_api') then
    create role uchinoko_api with login noinherit nocreatedb nocreaterole noreplication connection limit 20;
  end if;
end $$;
grant usage on schema app to uchinoko_api;
grant select, insert, update, delete on
  app.members, app.line_accounts, app.sessions, app.saves, app.cards, app.save_backups, app.day_quota, app.error_counts, app.chores
  to uchinoko_api;

do $$
declare t text;
begin
  foreach t in array array['members', 'line_accounts', 'sessions', 'saves', 'cards', 'save_backups', 'day_quota', 'error_counts', 'chores'] loop
    if not exists (select 1 from pg_policies where schemaname = 'app' and tablename = t and policyname = 'api_role_all') then
      execute format('create policy api_role_all on app.%I for all to uchinoko_api using (true) with check (true)', t);
    end if;
  end loop;
end $$;
