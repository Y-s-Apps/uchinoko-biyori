# 引き継ぎメモ（いまの状況）

このファイルは、チャットのいちばん最後に毎回まるごと書き直します。次のチャットは、ここを読めば続きから始められます。オーナーは、更新のたびにプロジェクトナレッジのGitHubを「同期」し、作業ごとに新しいチャットへ移ります（`CLAUDE.md` の作業の流れ 7）。

- 最終更新：2026-11-06
- リポジトリ：`Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。ホーム画面版：https://y-s-apps.github.io/uchinoko-biyori/
- ホーム画面版の公開中の版：`sw.js` のキャッシュ名 `uchinoko-3b339fd590`（アプリの中身は `ba98c72` から変わっていない。今回も `index.html`・`sw.js` はビルドの前後で同じ）
- Claude版：https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs はバージョン20（`ba98c72` と同じ中身）。今回は変更なし
- LINE版：画面は https://uchinoko-biyori.pages.dev/ （Cloudflare Pages、main の push で自動ビルド）。開発用の LIFF URL は https://miniapp.line.me/2012410263-cuCI7vQS
- LINE版のサーバー：Supabase のプロジェクト「uchinoko-biyori」（`ftakgswltcavwixqxpzi`、東京、組織 `Yuthy's` の無料プラン）。Edge Function `api` はバージョン2（`deno.json` が `game.js` をコミット `1534159` に固定）
- LINE版の計画書：https://claude.ai/artifact/AgKkCkHCsWAywKGV6VFxwK

## 直近のチャットでやったこと（LINE版のタスク2：完了）

- オーナーと決めて、Supabase に うちのこ日和用のプロジェクト「uchinoko-biyori」を新しく作った（「Yuthy's Project」は記事・曲のアプリで使用中のため同居させない。無料プランの枠は2つともうまった）。
- 表（`supabase/migrations/`）：`app` スキーマに `members`（自前の会員ID、取りこみ済みの日時）、`line_accounts`（LINE の sub → 会員ID）、`sessions`（トークンの SHA-256、24時間、1人10個まで）、`saves`（セーブ丸ごと、写真なし、`rev`）。Data API には出さない。`get_advisors` は「RLS 有効・ポリシーなし」の INFO だけ（わざと：関数からしかさわらない）。確認用に pg_net を入れた。
- Edge Function `api`（`supabase/functions/api/index.ts`）：`POST /login`（IDトークンを LINE の verify で検証 → 会員ID → セッション）、`GET /save`・`POST /save`（`ensureState()` を通し写真は null、`baseRev` がちがえば 409）、`POST /import`（引っこしコード、1人1回）、`GET /health`。画面と同じ `ensureState` などは `tools/build_server.py` が src/ から `game.js` に組み立てる。
- LINE版の画面（`src/js_line.js`、`src/line_head.html` の CSP）：LINEの中で開くとログインしてサーバーにも保存。セッションはメモリだけ。サーバーに子がいなければ、この端末の子がはじめてのセーブ。ちがう子がいるときはサーバーの子に会い、この端末の子はとっておいて「つれてくる／やめておく」を聞く。引っこしコードは1回だけ。書きこみのぶつかりは新しいほう。届かないときは端末だけ。
- 確認：`tools/line_e2e.py`（サーバー36項目＋画面9場面）すべてOK、ページエラー・CSP違反0件。`tools/smoke.py`（ホーム画面版、`--line --android-inset 48`、`--line --fresh`）エラー0件。本物の Supabase でも pg_net から `/health`・ログイン（にせのトークンは 401）・保存・ぶつかり・取りこみ1回を確認し、ためしの会員は消した（いまは会員0人）。

## 保留・オーナーの判断待ち

- **実機での確認（つぎのチャットのはじめにお願いする）：** iPhone の LINE（Tester のアカウント）で開発用の LIFF URL を開き、メニュー（プロフィール）のいちばん下が「LINEと つながっています」、その上が「あなたのアカウントに保存しています…」になっているか。そのあと Supabase で会員1人・セーブ1つになっているかを `execute_sql` で確かめる（sub や中身は表示しない。数と rev と pet の名前くらい）。
- Android は未確認（端末で見られる機会があれば）。
- ナレッジ：ルートに `supabase/` を足したので、プロジェクトのナレッジのファイル選択に `/supabase/` を追加してもらう（`tools/` は今までどおり入れていない）。
- おたすけの「週に1回」の数え方は、いまは「前回から7日」。月曜〜日曜の区切りにする案は、オーナーが希望したら変える。

## 次にやること

- **タスク3：時計に頼る処理をサーバーへ（第1弾）。** 日付の区切りは日本時間（サーバーの `dayKey()` はもう日本時間）。
  - いまの `now()` と `dayKey()` を外から渡せる形にして、同じ関数をサーバーでも使う（ホーム画面版の動きは変えない。`index.html` がビルドの前後で同じか、変わるならだいずへの影響を確かめてオーナーに伝える）。
  - 操作API：ごはん・おやつ・あそぶ・なでる・おねがい。サーバーが、おなか・ごきげんの減り、おやつ30分5回、おみやげ（不在時間・回数・抽選）、きょうのおねがい、連続記録とおたすけを判定して、状態を返す。演出は画面のまま。
  - いまの `POST /save`（丸ごと）は、時計・乱数で決まる項目を受けとらない形にしぼる（見た目の項目だけ、など）。
  - 季節イベント・記念日・げいの上限は第2弾。
- そのあと：AIの読みとり（Edge Function から Claude、1日の上限、予算をオーナーと決める。APIの鍵はオーナーに Supabase の画面で入れてもらう）、やめる人への対応（退会・データを消す・LINE の deauthorize）、認証審査の準備（プライバシーポリシー、利用規約、アイコン130×130）、うちのこカード、公式アカウント、ほかの端末の写真立て（写真がないときにイラストを出す）。
- **公開の前に：** 試しの会員とセーブを消してから、だいずを引っこしコードで取りこむ（取りこみは1人1回）。

## 気をつけること

- いま育てている子は「だいず」（クリームのポメラニアン、ホーム画面版）。セーブをこわす変更はしない（`CLAUDE.md` の「守ること」）。LINE版の変更でホーム画面版の `index.html` が変わっていないか、ビルドの前後で比べる。
- `index.html` は CSP のハッシュつきなので、手で直さず `sh src/build.sh` で作る。
- 組織 Y-s-Apps のほかの Pages サイトとは、セーブとキャッシュを共有する。LINE版は `y-s-apps.github.io` に置かない。
- iPhoneのSafariでは、SVGが枠の外へ動くと残像が出る。体ごと大きく動くアニメは `#petArt` に付ける。
- LIFF SDK は v2.20.0〜v2.31.0 に脆弱性があり、2026-11-24ごろ利用制限の予定。エッジパスのまま使う（いまの最新は v2.31.2）。
- このセッションの外への通信は、パッケージの置き場と GitHub だけ。`*.pages.dev`・`supabase.co`・LINE には直接届かない。本物のサーバーは `execute_sql` から pg_net（`net.http_get` / `net.http_post`、返事は `net._http_response`）で呼んで確かめる。pg_net には PUT がないので、API の書きこみは POST にしてある。
- サーバーのデプロイは「`build_server.py` → push → `--pin <SHA>` → `index.ts` と `deno.json` をデプロイ（`verify_jwt: false`）」の順（`CLAUDE.md` の作業の流れ 3）。src/ の `ensureState` などを変えたら、サーバーも作り直す。
- Supabase の無料プランは、使われない日が1週間ほど続くとプロジェクトが止まる。止まっていたら MCP の `restore_project` で戻す（LINE版は止まっていてもゲストで遊べる）。
- Cloudflare のビルド結果は、GitHub のコミットのチェック（「Cloudflare Pages」）で確かめられる。
