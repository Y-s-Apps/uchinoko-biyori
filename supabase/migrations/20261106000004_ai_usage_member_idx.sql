-- やめる人（退会）の会員の行を消すと、AIの回数の行も いっしょに消える（on delete cascade）。
-- そのとき会員IDで さがせるように、索引を足す（get_advisors の unindexed_foreign_keys）。
create index if not exists ai_usage_member_idx on app.ai_usage (member_id);
