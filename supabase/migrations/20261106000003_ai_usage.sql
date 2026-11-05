-- AIの読みとり（写真から種類・毛色・耳やしっぽの形）を使った回数。日本時間の日付ごと・会員ごと
-- 写真や読みとった中身は置かない（回数だけ）。1人1日の上限と、全員あわせた1日の上限を数えるため。
-- 古い日の行は、Edge Function `api` が読みとりのたびに消す（7日より前）。
create table app.ai_usage (
  day date not null,
  member_id uuid not null references app.members(id) on delete cascade,
  n int not null default 0 check (n >= 0),
  primary key (day, member_id)
);
comment on table app.ai_usage is 'AIの読みとりの回数（日本時間の日付ごと・会員ごと）。写真や結果は置かない';

alter table app.ai_usage enable row level security;
revoke all on app.ai_usage from public, anon, authenticated;
