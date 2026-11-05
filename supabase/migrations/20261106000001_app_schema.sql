-- うちのこ日和（LINE版）のサーバーの表
-- すべて app スキーマに置く。app は Data API（PostgREST）に出さないので、
-- 公開されている鍵（publishable / anon）からは読めも書けもしない。
-- 読み書きするのは Edge Function `api` だけ（SUPABASE_DB_URL で直接つなぐ）。

create schema if not exists app;
revoke all on schema app from public, anon, authenticated;

-- 会員：自前で発番する会員ID。ゲームデータの主キーはこれ（LINE の sub ではない）
create table app.members (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  imported_at timestamptz            -- 引っこしコード・この端末の子の取りこみを使った日時（1人1回だけ）
);
comment on table app.members is '会員。自前の会員IDがゲームデータの主キー。LINE の sub は line_accounts に分けて持つ';

-- LINE のアカウントとのひもづけ（sub はプロバイダーごとの LINE ユーザーID）
create table app.line_accounts (
  sub text primary key check (length(sub) between 1 and 64),
  member_id uuid not null unique references app.members(id) on delete cascade,
  created_at timestamptz not null default now()
);
comment on table app.line_accounts is 'LINE の sub と会員IDのひもづけ。IDトークンは LINE の verify で検証してから使う。トークンそのものは保存しない';

-- 自前のセッション。トークンは端末のメモリだけに置き、ここにはハッシュ（SHA-256）だけを持つ
create table app.sessions (
  token_hash bytea primary key check (length(token_hash) = 32),
  member_id uuid not null references app.members(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);
create index sessions_member_idx on app.sessions (member_id);
create index sessions_expires_idx on app.sessions (expires_at);
comment on table app.sessions is '自前のセッション。トークンのSHA-256だけを保存する';

-- セーブ：いまはクライアントの S を丸ごと（写真の控えは入れない）。rev は書きこむたびに1ずつ増える
create table app.saves (
  member_id uuid primary key references app.members(id) on delete cascade,
  data jsonb not null check (jsonb_typeof(data) = 'object'),
  rev bigint not null default 1 check (rev > 0),
  updated_at timestamptz not null default now()
);
comment on table app.saves is 'ペットのセーブ（S を丸ごと。pet.photo はつねに null）。rev で別の端末との書きこみのぶつかりを見つける';

alter table app.members enable row level security;
alter table app.line_accounts enable row level security;
alter table app.sessions enable row level security;
alter table app.saves enable row level security;

revoke all on all tables in schema app from public, anon, authenticated;
alter default privileges in schema app revoke all on tables from public, anon, authenticated;
alter default privileges in schema app revoke all on functions from public, anon, authenticated;
alter default privileges in schema app revoke all on sequences from public, anon, authenticated;
