# 引き継ぎメモ（いまの状況）

このファイルは、チャットのいちばん最後に毎回まるごと書き直します。次のチャットは、ここを読めば続きから始められます。オーナーは、更新のたびにプロジェクトナレッジのGitHubを「同期」し、作業ごとに新しいチャットへ移ります（`CLAUDE.md` の作業の流れ 7）。

- 最終更新：2026-11-14（11回目：約束①の直し かたまり C）
- リポジトリ：`Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。ホーム画面版：https://y-s-apps.github.io/uchinoko-biyori/
- ホーム画面版の公開中の版：`sw.js` のキャッシュ名 **`uchinoko-eb072f3057`**（かたまり B＝`3933abe` のまま。かたまり C では かわらない。pg_net で 公開中の `index.html`・`sw.js` の md5 が 手元と同じ＝`78062f5a…`・`0662bf7e…`）
- Claude版：https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs は**バージョン24**（`3933abe` の中身。かたまり C では かわらない）。公開するときは `src/out/uchinoko-claude.html` の前に いまの版と同じ1行目（`<!doctype html><html><head><meta charset=utf8><meta name=viewport …><style>…</style></head><body>` ＋改行）を、うしろに `</body></html>` ＋改行 を つけて `publish_files`（`capabilities` は はぶいて 引きつぐ）
- LINE版の画面：Cloudflare Pages（main の push で自動ビルド。`1a8a9b3` で pg_net で `/`・`/dev/`・`/review/` の md5 が 手元の `src/out/line/index.html` と同じ＝`0968d82b…`）
  - 本番用 https://uchinoko-biyori.pages.dev/ 、審査用 https://uchinoko-biyori.pages.dev/review/ 、開発用 https://uchinoko-biyori.pages.dev/dev/ （同じページ。ひらいた場所で LIFF ID をえらぶ）
  - **ヘッダー（`_headers`、かたまり C）：** ぜんぶ（`/*`）に `Referrer-Policy: no-referrer`・`X-Content-Type-Options: nosniff`・`Content-Security-Policy: frame-ancestors 'none'`・`X-Frame-Options: DENY`（枠の制限は はじめ 開発用だけ → オーナーが iPhone の LINE で ひらけるのを 確かめて 2026-11-14 に ぜんぶへ）
  - LIFF URL：開発用 https://miniapp.line.me/2012410263-cuCI7vQS ／審査用 https://miniapp.line.me/2012410264-JD4WhzAb （審査担当者だけ）／本番用 https://miniapp.line.me/2012410265-PutgsCLS （未認証なので URL を知っている人は開ける）
  - チャネルID：開発用 `2012410263`・審査用 `2012410264`・本番用 `2012410265`
  - プライバシーポリシー https://uchinoko-biyori.pages.dev/privacy.html （2026-11-14 改定。かたまり C で その日の回数の書き方を 直した）、利用規約 https://uchinoko-biyori.pages.dev/terms.html （2026-11-14 改定）、お問い合わせフォーム https://forms.gle/aywxktpPZettxFSS7
- LINE版のサーバー：Supabase のプロジェクト「uchinoko-biyori」（`ftakgswltcavwixqxpzi`、東京、組織 `Yuthy's` の無料プラン）。Edge Function `api` は **MCP の version 19**（`index.ts` は `1a8a9b3`。`get_edge_function` で 手元と同じ）。`deno.json` は `game.js` を コミット **`3933abe`** に固定のまま（`game.js` は かわらない。`--check` 同じ）
- 表：`app` スキーマに members・line_accounts・sessions・saves・cards・save_backups・**day_quota・error_counts・chores**（かたまり C で足した）。**`ai_usage` は 消した**（`day_quota` へ）
- 役：**`uchinoko_api`**（かたまり C。`app` の表だけ 読み書き、RLS は この役の ポリシー `api_role_all`）。**2026-11-14 5:35 に オーナーが パスワードと Secrets の `APP_DB_PASSWORD` を入れ、サーバーは この役で つないでいる**（`pg_stat_activity` に `uchinoko_api` の postgres.js、`db_role` の エラーなし）
- Storage：バケット `cards`（公開・PNG だけ・1MB まで、ポリシーなし）
- サーバーを起こす：GitHub Actions「サーバーを起こす」（`.github/workflows/keepalive.yml`、active）。cron `23 18 */3 * *`＝日本時間 3:23 ごろ。**かたまり C から `/health` の `errors`（3日の エラーの数）が 10以上でも 失敗にする**。手で動かした回：2026-11-13 11:06 成功、2026-11-14 5:19 成功（`health: 200`・`db: 401 {"error":"nosession"}`・`errors (3 days): 0`）。**予定の実行（schedule）は まだ 1回も ない**（下の 保留1）
- Secrets：`ANTHROPIC_API_KEY`・`LINE_CHANNEL_SECRET`（開発用）・`LINE_CHANNEL_SECRET_2012410264`（審査用）・`LINE_CHANNEL_SECRET_2012410265`（本番用）・`APP_DB_PASSWORD`（`uchinoko_api` の パスワード。2026-11-14）
- 本物の DB：このチャットでも 本物の DB に ためしの会員などは 書いていない（会員・カード・ひかえ・エラーの数は 0件）
- LINE Developers：Scope は `openid` だけ。「シェアターゲットピッカー」は 有効（2026-11-13）。認証審査は まだ申請しない（未認証でリリース → 個人事業主 → 申請）
- **診断レポート（約束①）：https://claude.ai/artifact/8kuQtwwyAD9RJ42PPy7GU6 （Claude Docs。段階0〜6、42こ。番号 1-1〜5-11 で よぶ。表の「リリースの前」の欄に「→ 済み（コミット）」を書きたしている。いまの rev 46）**
- LINE版の計画書：https://claude.ai/artifact/AgKkCkHCsWAywKGV6VFxwK （Claude Docs）
- オーナーの事情（約束②で使う）：claude.ai の このプロジェクトの資料 `claude/owner-notes.md`（非公開。公開リポジトリには書かない）

## 直近のチャットでやったこと（2026-11-14、11回目：かたまり C）

かたまり C（LINE版とサーバー）の 11こを、`229129f`（と サーバーの説明だけの `1a8a9b3`）の push・マイグレーション 1つ・デプロイ 1回（version 19）で 済ませた。ホーム画面版・Claude版・`game.js` は かわらない。くわしくは `docs/PROJECT.md` 10章「しくみ（約束①の直し かたまり C）」と 7章。

| 番号 | 直したこと |
| --- | --- |
| 3-2 | 引っこし・バックアップに「この端末に とっておいた子」（コードをコピー・LINEに つれてくる〈1回〉）。`line-guest` を 5ひきまで ためる形に（前の形も読める）。つれてくると いれかわる LINEの子も とっておく（見本を見て オーナー決定 案A） |
| 3-8 | 「新しい子」・コードの子が とどかないまま とじたら、つぎに ひらいたとき「◯◯は LINEに とどいていませんでした」［△△に もどる］［◯◯を おくる］（オーナー決定 案A。名前が ながいと ボタンを たてに）。しるし `line-unsent` |
| 3-3 | `/act`・`/import` に 番号 `rid`。サーバーは さいごの 番号と 答えを `srv.rq` に のこし、同じ番号は 数えなおさない（adopt・import も） |
| 1-5 | 書きこみ 10秒20回・1日3000回（`srv.rt`。こえたら `/act` は busy、`/save`・adopt は 429）、`/login` 1人 1分6回、同じ IDトークンは 30分 LINE に きかない、取りこみの しるしは 400・2000 まで |
| 1-6 | その日の AI・カードの回数を その日だけの しるし（種類:日付:sub の SHA-256）で `app.day_quota` に。やめても その日の分は もどらない（2日で消す）。ポリシー改定 |
| 1-8 | ログインのとき 1日1回（`app.chores`）、Storage の一覧と `app.cards` を くらべて 1時間より前の まいごの画像を消す |
| 1-9 | `readBody` は 上限で 読むのを やめる・こわれた UTF-8 は 400 |
| 1-10 | 役 `uchinoko_api`（`APP_DB_PASSWORD` が あれば その役で つなぐ。ない・まちがいは 持ち主に もどして `db_role` を数える）（オーナー決定）。オーナーが パスワードを入れ、この役で つながるのを 確かめた |
| 2-2 | `_headers`：nosniff・no-referrer・枠の制限（はじめ `/dev/` だけ → オーナーが iPhone の LINE で 確かめて ぜんぶへ） |
| 5-2 | `app.error_counts`（日付・種類・数）・`/health` の `errors`・サーバーを起こすが 10以上で 失敗 |
| 5-3 | このまま（返事は もう gzip。1年 育てた子で 13.8KB → 3.5KB。オーナー決定。7章） |

- 確かめの場面（5-10）：`api_test.ts` に rid・rate・day quota・daily sweep・body・errors・role（197こ ぜんぶ通った）。`line_e2e.py` に 17（とっておいた子）・18（とどかないまま とじた子：もどる／おくる）・19（返事だけ なくした おせわは 1回）。`line_e2e.py` に `lose`（サーバーには とどけて 返事だけ なくす）。`linebreak.py --line` に とっておいた子の シート3つ・つれてくる前・とどいていませんでした 3つ。
- 動かしたもの：`line_e2e.py`（ルール・サーバー・画面 ぜんぶ通った、page errors 0）、`smoke.py --line --android-inset 48`・`--line --dark`（エラー0）、`linebreak.py --line`（375・390px で 244場面 0件）、`build_server.py --check`（同じ）。ホーム画面版の `index.html`・`sw.js` は md5 が かわらない（`compare_home.py` は いらない：共有の JS は さわっていない）。
- 本物：`apply_migration`（`quota_errors_role`）→ `get_advisors`（security 0件・performance は 使われていない索引の INFO だけ）→ デプロイ version 19 → pg_net で `/health`（errors 0）・401・`badtoken`・3か所の md5 と ヘッダー → 「サーバーを起こす」を 手で動かして 成功。
- 診断レポートの表に 12か所 書きたした（1-5・1-6・1-8・1-9・1-10・2-2・3-2・3-3・3-8・5-2・5-3〈このままでよい〉・5-10）。

## 保留・オーナーの判断待ち（つぎのチャットのはじめに）

1. **「サーバーを起こす」の予定の実行が まだ 1回も ない**（2026-11-14 3:23 の予定は 5:21 の時点で なし。`event=schedule` の回は 0）。手で動かすと 成功する。かたまり C で `keepalive.yml` を push したので、予定が 登録しなおされるかも。**つぎの予定は 11-17 3:23 ごろ（UTC 11-16 18:23）**：`gh api 'repos/Y-s-Apps/uchinoko-biyori/actions/workflows/keepalive.yml/runs?per_page=5&event=schedule'`。11-17 も 動かなければ、GitHub の予定が はたらいていない（オーナーに Actions の画面で「サーバーを起こす」を いちど Disable → Enable してもらう。それでも だめなら Supabase Cron など べつの しくみ を 考える）。そのあいだも DB が 1週間 しずかだと Supabase が 止まるので、チャットの はじめに `get_project` を見る（止まっていたら `restore_project`）。
2. ~~2-2 の 枠の制限を ぜんぶに 広げる~~ → 済み（2026-11-14。オーナーが iPhone の LINE で 開発用が ひらけるのを 確かめたので `/*` に。pg_net で 3か所の ヘッダーを 確かめた）。
3. ~~1-10 の 役に パスワードを 入れる~~ → 済み（2026-11-14 5:35 オーナー。サーバーは `uchinoko_api` で つないでいる）。Secrets の `APP_DB_PASSWORD` を かえるときは、先に SQL エディタで `alter role` → そのあと Secrets（あいだは 持ち主に もどって `db_role` が 数えられる）。
4. **約束①の直し（リリースの前に 42こ ぜんぶ）。かたまり A・B・C は済み。つぎは かたまり D（書類）：**
   - **1-12／5-11：** PROJECT.md 10章「しくみ（本人確認とセーブ）」の 古い説明（`POST /save {data, baseRev}` と 409。いまは `/save {pet}`、ぶつかりは 行のロック）を いまの しくみに。ついでに 同じ章の「サーバー単体の36項目」「9つの場面」など 古い数も（いまは api_test 197こ・e2e 1〜19）。Supabase の ログに IP と ブラウザの種類が のこる ことの ポリシーの書き方も 段階5の とおりか 見る。
   - **5-6：** ポリシー 1. の「取得する情報」に「会員を作った日時」を足す（`app.members.created_at`）。「大事な変更は 本サービスの中でも知らせます」「終えるときは30日前に」に こたえる アプリの中の お知らせの しくみ（例：サーバーの `/health` か `/login` に お知らせを のせて ポップアップ。通知の「画面の中の お知らせ」と いっしょに 作れるか）を 案にして オーナーに 聞く。
   - **5-8：** カードの ボタンの色（`#4FAE9A`）を かえてよいか、LINE の「カスタムシェアメッセージ」の 資料（https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/ ）で 確かめる。
   - **1-11：** 全員の AI の上限（いま 1日300回、月の予算5ドル）を 150回に するか オーナーに 聞く（`AI_ALL_PER_DAY` は Secrets で かえられる）。
   - **コードでは 直せないもの：** 5-7（法律の判断＝専門家に確かめる。約束②の別プロジェクトへ）。5-1 は 1-3（セーブの ひかえ）で そなえた。**「このままでよい」と書いたもの：** 2-3、4-6、5-9、5-3。
   - 1つ片づけるたびに、診断レポートの表の「リリースの前」の欄に「→ 済み（コミット）」と書きたす（Claude Docs の `update`、セルの中の `find`。表の id は 1-x＝`mjmrg2w6vyg.1104`、2-x＝`.5625`、3-x＝`.8484`、4-x＝`.12109`、5-x＝`.14473`。列は 6、行は 番号の じゅん〈0 は 見出し〉）。ぜんぶ片づいたら、`CLAUDE.md` の約束① と PROJECT.md 10章に 書く（約束①の「済み」は Fable の さいごのチェックの あと）。
5. **通知（2026-11-14 オーナー決定。42この直しの あとに作る）：** LINE版は **LINE公式アカウント（Messaging API）**で 夜に、きょうの おねがいが のこっている人だけ（オン・オフつき）。**3つの版に 画面の中の お知らせ**（ひらいているとき、夜に のこっていたら ひとこと）。ホーム画面版の Web Push・LINE の サービスメッセージは 見送り。くわしくは PROJECT.md 10章「決めたこと（2026-11-14、通知）」。
   - 作るときに決めること（見本を見せて）：時刻（例 21時）、条件、オン・オフの はじめ、文言、公式アカウントの 名前・アイコン・あいさつ、送る しくみ（Supabase Cron＋Edge Function）、ポリシー・規約。
   - オーナーに おねがいすること：公式アカウントを ミニアプリと **同じプロバイダー**に作る → Messaging API を有効にする（プロバイダーは あとから 変えられない）→ チャネルアクセストークンを Supabase の Secrets に入れる（チャットに貼らない）。
6. **さいごのチェック（2026-11-14 オーナーから）：直し（42こ）と 通知が できたら、リリースの前に もう一度 Claude Fable 5.2 の 新しいチャットで チェックする。** ソーイは そのチャットに貼る プロンプトを `docs/REVIEW_PROMPT.md` に作りなおして伝える（見る範囲：診断のコミット `f22d9a6` より あとに変えたところ ぜんぶ〈かたまり C の rid・回数の制限・day_quota・error_counts・まいごの掃除・`uchinoko_api` 役・`_headers` も〉、通知の しくみ、42こが 片づいたか、新しい穴が できていないか。診断レポートに「さいごのチェック」の章を書きたす）。Fable の発売記念の枠は 日本時間 11/17（火）16:59 まで。間にあわなければ、ふつうの上限の中で行うか オーナーに聞く。
7. **さいごのチェックが終わったら リリース**（未認証のまま。下の「公開の日」）。
8. **リリースしたら：約束②（個人事業主の申請のための別プロジェクトのプロンプト）を ソーイから伝える。** 中身は プロジェクトの資料 `claude/owner-notes.md`（診断 5-7 も入っている）。
- おたすけ：ホーム画面版は1日おき（2026-11-12）。Claude版・LINE版は「前回から7日」のまま。

## 次にやること

- 上の保留（予定の実行の確認 → かたまり D → 通知 → Fable の さいごのチェック → リリース → 約束② → 個人事業主 → 認証審査の申請）。
- 認証審査を申請したら：審査は1〜2週間、「審査中」は取り消しも変更も できない（画面とサーバーも変えない）。認証されたら：「検索可能にする」は 承認から30日以内に押す。
- **公開の日：** オーナーの iPhone の LINE には ためしの子「こむぎ」が ゲストとして のこっているので、本番用の LIFF URL を LINE で ひらいて「こむぎを LINEに つれてくる？」が出たら**「やめておく」**→ はじめての画面の「引っこしコード」で だいずを取りこむ（取りこみは1人1回）。こむぎは「引っこし・バックアップ」の「この端末に とっておいた子」に 出る（かたまり C）。ホーム画面版で「引っこし・バックアップ」→「ファイルで保存」の控えも とっておく。開発用・審査用・本番用は 同じサーバーと DB。ためしで作った会員・カードの画像は、公開の前に けす（`app.cards`・`app.save_backups` と Storage の `cards` が0件か確かめる。`app.day_quota`・`app.error_counts` は 2日・60日で 消えるので のこっていてよい）。公開の日に、本番用で「うちのこカードを おくる」が出るかも だいずで見る。
  - ピンチ（おたすけ まち）の日に 引っこしても、まっている れんぞくは 運ばれる（3-6、`3933abe`）。念のため、ピンチなら おたすけを かなえてから 引っこしても よい。
  - だいずは LINE版へ引っこすと、おたすけが 1日おき → 7日に1回 になる（オーナー了承）。
  - リリースから1週間は、チャットの はじめに サーバーのログ（無料プランは1日分）と `app.error_counts`（`/health` の `errors`）を見る（診断 5-2）。
  - **実機で見る：** LINE での見え方・動き、ひらいたまま つぎの日に もどったとき（3-1）、カードの PNG の大きさ（Storage で。600KB を こえると 576×768 で作りなおす）、こい みどりの ボタンの文字・バッジの色（かたまり B）、「この端末に とっておいた子」の カード（かたまり C）。
  - できれば、テスターでない人（家族など）の LINE で 本番用の LIFF URL が ひらけるか 見てもらう。

## 気をつけること

- **色：** 文字と地の色の差は ふつう 4.5・大きい 3 より大きく。`tools/smoke.py` と `--dark` が 数えて、足りないと エラーに する（ロゴ `.brand` は のぞく）。小さい ピンクの文字は `--berry-ink`、ミントの ボタンの文字は `--on-mint`、バッジは `--badge`。文字は 11px 以上。新しい ポップアップや シートを 足したら、smoke.py・linebreak.py の場面にも 入るか 見る。
- **改行と見た目：** 画面ぜんたいが `keep-all＋anywhere`。新しい文にも 文節の スペースを入れ、`tools/linebreak.py`（`--line`）で 0件か、スマホ幅のスクリーンショットで 目で確かめてから push。トーストで 切れ目を決めたいときは `\n`（`white-space:pre-line`）。せまいところの名前は `softName()`、カタカナの長い名前を足したら `SOFT_WORDS`。ボタンの中に 名前（10文字まで）が 入るときは、ながい名前で 名前の まんなかで 切れないか 見る（かたまり C の 3-8 は たてに ならべた）。`linebreak.py` の フォントは `cd tools/fonts && npm install`。`linebreak.py --line` は 1回 10分ほど かかり、出力は さいごに まとめて出る。
- **名前などの短い文字は `cleanText(v, max)`**（文字で切る。`slice` で切らない）。**表の ID を見るときは `hasId(表, id)`**（`表[id]` の「あるか」だけに しない）。
- いま育てている子は「だいず」（クリームのポメラニアン、ホーム画面版）。セーブをこわす変更はしない。LINE版だけの変更では、ビルドの前後でホーム画面版の `index.html`・`sw.js` が同じか確かめる（`md5sum`。いまは `78062f5a…`・`0662bf7e…`）。
- 正規表現に 日本語の文字を そのまま書かない（`ぁ` のように）。Claude版を 文字コードなしで ひらくと、正規表現が こわれて スクリプトが まるごと止まる。正規表現の うしろ読み（`(?<!…)`）も 古い iPhone で 止まるので 使わない（`Object.hasOwn` も 古い iPhone に ないので `hasId`）。
- `js_line.js` は `js_onboard.js` の boot の**あと**に読まれる。`renderHeader` などを包むときは、包んだあとに いまの画面にも1回あてる。
- **`line-guest` は `{ v:2, kids:[…] }`（5ひき）。** 読むのは `LineSync.keepList()`、ためるのは `stash()`（同じ子は 新しいほうに 置きかえ）、LINEへ つれていった子は `keepBrought()`（`b:1`＝一覧に 出さないだけ）。キーごと 消す処理は 書かない。`line-unsent` は `markUnsent()` で 書く・空にする。
- **おせわ・取りこみを サーバーへ おくるのは `LineSync.send`**（`rid` を つけ、とどかなければ 900ms あとに 同じ `rid` で 1回 おくりなおす）。`LineServer.call` を じかに よぶ（カード・AI・やめる）ものには `rid` は つかない（おくりなおさないため）。
- Claude版の `Persist.connect` は `window.claude` が ないと すぐ もどる（ホーム画面版・LINE版は 動きが かわらない）。`Onboard.commit` と 引っこしの `take` は async（クラウドを まつため）。
- **ためしの DB（PGlite）は、同時の問い合わせが まざる・トランザクションの あいだに べつの つなぎで 書くと 止まる。** サーバーでは DB の問い合わせは 1つずつ順に、トランザクションの中で エラーを数えるときは `oops(kind, detail, tx)`（tx を わたす）。日付の 引き算に パラメータを つかうときは `${n}::int`（つけないと `date - unknown` で エラー）。
- **サーバーの 回数の制限は ためしでは ゆるめている**（`api_test.ts` は `LOGIN_PER_MIN=1000`・`ACT_PER_WINDOW=100000`、`line_e2e.py` の env も `LOGIN_PER_MIN=1000`）。制限を 確かめる場面だけ しぼる（よぶたびに env を読む）。
- **うちのこカードのメッセージは LINE の「カスタムシェアメッセージ」の決まり**（標準タイプ。バブル1つ、アクションは ボタンと下の行だけ、決まりに書いていない プロパティは 変えない、下の行の矢印の画像は 変えない）。本文を変えるときは https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/ を見なおす。ボタンと矢印は 本番用の LIFF URL。カードの ボタンの色（`#4FAE9A`）は LINE が かく ので、かたまり B の `--on-mint` とは べつ（5-8 で 決まりを 確かめる）。
- カードの絵の中では ページの CSS が効かない（表情は SVG の中の `<style>`）。サーバーの画像は 画面に出していない（CSP の `img-src` に supabase.co は ない。出すなら足す）。
- 補足資料の文（PROJECT.md 10章）に出てくる 画面の文言（「写真からむかえる」…「うちのこカードを おくる」「おくる」「LINEの データを けす」）を変えたら、補足資料も直す。
- **（あとで）認証審査を申請したら、審査中は LINE版の画面とサーバーを変えない**。
- LINE版の画面は3か所（`/`・`/review/`・`/dev/`）とも同じファイル。ページの中から ほかのファイルを読むときは、いちばん上からのパスにする。IDトークンが切れたときの ひらきなおし先も その画面の LIFF ID（`LINE_CFG.liffId`）。Cloudflare の ヘッダーは `build.sh` が 出す `_headers`（パスごと）。
- Scope は `openid` だけ。`shareTargetPicker` は Scope が いらない。
- 認証されたあとに 本番用の エンドポイントURL・ポリシーと規約の URL・アイコン・チャネル名・説明・多言語対応・Scope・友だち追加オプション・リンクされたLINE公式アカウント・シェアターゲットピッカーを変えると再審査。
- ポリシーに書いたこと（取る情報・送り先・保存期間・外部サービス・回数の上限）を変えたら、`src/legal/` も同じコミットで直す。
- ルールの時刻・日付・偶然は `Clock` だけ。ルールや `buildPrompt`/`parseAI`・`cleanText`・`ensureState`・`hasId`（`js_pet.js`）を変えたらサーバーも作り直す（`build_server.py` → push → `--pin` → デプロイ）。`game.js` が変わらないときは、`deno.json` の固定はそのままでよい（`--check`）。
- LINE版のサーバーは、おせわの数字を画面から受けとらない。写真・AIの返事・トークン・カードの画像の中身はログに出さない（`oops()` の detail にも 入れない）。
- LINE版の画面で、サーバーへ送るものは `LineSync.queue` で1つずつ（queue の中から queue を使う処理を またない）。カードの `POST /card` は queue に入れない（`LineServer.call` を直接）。
- 端末のキー `line-owner`・`line-guest`・`line-left` は消さない（`line-reopen` は ひらきなおしの時刻だけ、`line-unsent` は とちゅうの しるし）。
- `index.html` は CSP のハッシュつきなので、手で直さず `sh src/build.sh` で作る。ページは https のときだけ Service Worker を入れる（`smoke.py` は http なので 手で入れて 確かめる）。
- 組織 Y-s-Apps のほかの Pages サイトとは、セーブとキャッシュを共有する。LINE版は `y-s-apps.github.io` に置かない。
- LIFF SDK は v2.20.0〜v2.31.0 に脆弱性があり、2026-11-24ごろ利用制限の予定。エッジパスのまま使う。
- このセッションの外への通信は、パッケージの置き場と GitHub だけ（Playwright の WebKit も 入れられない）。本物のサーバーと画面は `execute_sql` から pg_net（`net.http_get` / `net.http_post`、返事は `net._http_response`。`md5(convert_to(content,'UTF8'))` で 手元と くらべる。ヘッダーは `headers->>'…'`。PNG を読むときは `content` を文字にしない）で確かめる。サーバーの返事は gzip で とどくので、`Accept-Encoding` を つけると 中身は 読めない（つけない）。Cloudflare の ポリシー・規約の ページは 手元と md5 が ちがう（配信で 少し足される）ので、中身の文で確かめる。
- **Supabase の `apply_migration` と `deploy_edge_function` は、作業環境の確認で止められることがある**。止められたら、オーナーに理由と中身を伝えて「もう一度ためしてよいか」を聞く。
- Edge Function のデプロイは `index.ts` を丸ごと送るので、送ったあと `get_edge_function` の 結果（ファイルに 保存される）を python で 手元と くらべる（同じか）。
- ブラウザ：アプリ内ブラウザは LINE Developers に ログインしていない。LINE Developers・Supabase の設定を変えるのは オーナーの許可をもらってから。**シークレットが出るページ（「チャネル基本設定」）は本文ごと読まない・画面全体を写さない**。
- 本物の DB に ためしの会員やセッションを `execute_sql` で書きこまない。実機の確認はオーナーにお願いする。
- Supabase の無料プランは、DB の動きが1週間ほど少ないと止まる（「サーバーを起こす」で3日ごと）。止まっていたら `restore_project`。Storage の無料の枠は 1GB（カードは ぜんぶで3000まいまで）。Edge Function は 月50万回（先に いっぱいに なるのは これ。5-3）。
- Cloudflare のビルド結果は `gh api repos/Y-s-Apps/uchinoko-biyori/commits/<SHA>/check-runs`。「サーバーを起こす」を 手で動かすのは `gh workflow run keepalive.yml --ref main`、ログは `gh run view <id> --log`。
