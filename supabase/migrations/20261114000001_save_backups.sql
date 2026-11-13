-- うちのこ日和（LINE版）：上書きの前の セーブの ひかえ と、カードの上限（約束①の診断 1-3・1-2、2026-11-14）
--
-- 1-3：「新しい子」（POST /act adopt）と 引っこしコードの取りこみ（POST /import）は、いまのセーブを まるごと上書きする。
--      画面の不具合や まちがいで LINE の子が 置きかわっても もどせるように、上書きの前の セーブを 1人1つ とっておく。
--      Supabase の無料プランには 自動バックアップが ないため（診断 5-1）。
--      SAVE_BACKUP_DAYS（既定 30日）で `api` が消す。会員を消すと いっしょに消える（on delete cascade）。
--      もどすのは お問い合わせが来たとき、オーナーが SQL で（docs/PROJECT.md 10章）。画面からは 読まない。
create table if not exists app.save_backups (
  member_id uuid primary key references app.members(id) on delete cascade,
  data jsonb not null check (jsonb_typeof(data) = 'object'),   -- 上書きされる前の セーブ（pet.photo は つねに null）
  rev bigint not null,                                         -- そのときの rev
  reason text not null check (reason in ('adopt', 'import')),  -- なにで 上書きされたか
  created_at timestamptz not null default now()                -- ここから SAVE_BACKUP_DAYS 日で消す
);
create index if not exists save_backups_created_idx on app.save_backups (created_at);
comment on table app.save_backups is '上書き（新しい子・取りこみ）の前のセーブの ひかえ。1人1つ、30日で消す。もどすのは お問い合わせのとき';

alter table app.save_backups enable row level security;
revoke all on app.save_backups from public, anon, authenticated;

-- 1-2：全員の1日の枚数を数えるための索引（1人1日は cards_member_day_idx）
create index if not exists cards_day_idx on app.cards (day);

-- 1-2：カードの画像の置き場所も、サーバーの上限（PNG 600KB）に近づける（2MB → 1MB）。ためしの DB には storage がない
do $$ begin
  if to_regclass('storage.buckets') is not null then
    update storage.buckets set file_size_limit = 1048576 where id = 'cards';
  end if;
end $$;
