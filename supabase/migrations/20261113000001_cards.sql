-- うちのこカード（LINE版）：カードの画像の記録と、画像を置く Storage の公開バケット `cards`
-- 画像（きせかえを着た うちのこのイラスト＋季節のわく。写真・名前の文字は入れない）は、端末で作って
-- Edge Function `api` の POST /card から送られ、`api` が Storage に置く（推測できない名前。URL を知っている人は見られる）。
-- この表は、だれのカードか・同じ絵か（sha）・作った日（1人1日の枚数）・さいごに使った日時（1年で消す）だけを持つ。
-- 会員を消すと member_id は null になり（on delete set null）、`api` が Storage の画像を消してから行を消す
-- （Storage に届かなかったときも、行が のこるので あとで消しなおせる）。
create table app.cards (
  name text primary key check (name ~ '^[A-Za-z0-9_-]{32}\.png$'),   -- Storage の中の名前（ランダム。会員IDは入れない）
  member_id uuid references app.members(id) on delete set null,
  sha bytea not null check (length(sha) = 32),                       -- 画像の SHA-256（同じ絵なら つくりなおさない）
  day date not null,                                                 -- 作った日（日本時間）。1人1日の枚数を数える
  created_at timestamptz not null default now(),
  used_at timestamptz not null default now()                         -- さいごに使った（送ろうとした）日時。ここから1年で消す
);
create unique index cards_member_sha_idx on app.cards (member_id, sha);
create index cards_member_day_idx on app.cards (member_id, day);
create index cards_used_idx on app.cards (used_at);
comment on table app.cards is 'うちのこカードの画像の記録（画像は Storage の cards バケット）。1年使わない・会員が消えた行は、画像を消してから消す';

alter table app.cards enable row level security;
revoke all on app.cards from public, anon, authenticated;

-- 画像の置き場所：読みとりだけ公開のバケット（PNG だけ・2MB まで）。
-- storage.objects に ポリシーは足さない＝公開の URL で読むことしか できない（一覧・アップロード・削除は `api` の秘密の鍵だけ）。
-- ためしの DB（tools/server の PGlite）には storage スキーマがないので、あるときだけ作る。
do $$ begin
  if to_regclass('storage.buckets') is not null then
    insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    values ('cards', 'cards', true, 2097152, array['image/png'])
    on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
  end if;
end $$;
