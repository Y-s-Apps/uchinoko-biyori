# うちのこ日和：開発メモ（Claude向け）

スマホ向けのペット育成Webアプリです。写真の犬・猫をそっくりなイラストのペットにして、ごはん・おやつ・なでなでで、のんびり育てます。年齢、寿命、死はありません。

- 公開URL：https://y-s-apps.github.io/uchinoko-biyori/（オーナーはiPhoneのホーム画面に追加して毎日使っています）
- リポジトリ：GitHub の `Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。
- `main` ブランチのルートが、そのまま GitHub Pages で公開されます。
- 仕様、数値、決めたこと、更新履歴は `docs/PROJECT.md` にあります。作業の前にかならず読んでください。

## ファイル構成

| 場所 | 中身 |
| --- | --- |
| `src/head.html` | `<title>`、フォント、すべてのCSS（色はトークン＋ダークモード） |
| `src/body.html` | 画面のHTML（ヘッダー、おへや、メーター、下の5ボタン、シート、オンボーディング） |
| `src/home_head.html` | ホーム画面版だけの `<head>`（manifest、apple-touch-icon、safe-area） |
| `src/line_head.html` | LINE版だけの `<head>`（LIFF SDK、CSP、Android版LINEの下のすき間） |
| `src/js_data.js` | 犬種・猫種（41種）、毛色スウォッチ、名前候補 |
| `src/js_data2.js` | Lv上限・関係の呼び名、おやつ（犬猫各18）とアイコン、きせかえ（38＋イベント10） |
| `src/js_data3.js` | げい、季節イベント、おみやげ（22）、もようがえ（5カテゴリ） |
| `src/js_pet.js` | ペットのSVG描画 `renderPet(look, {wear})` と色ユーティリティ |
| `src/js_wear.js` | きせかえの描画 `wearSvg()` |
| `src/js_rules.js` | おせわのルール `Rules`（画面にさわらない。セーブ `st` を変えて、できごと `ev` を返す）と時計 `Clock`（`now()`・`dayKey()`・乱数）。LINE版のサーバーでも同じものを使う |
| `src/js_app.js` | 状態 `S`、保存、ペットの動き、おせわの画面（`Act.run` で判定をたのみ、`playEvents` で出す）、シート、引っこしコード、`Game.start` |
| `src/js_features.js` | `ensureState`（セーブの移行）、おねがい・おたすけ・おみやげ・イベント・記念日のポップアップ、もようがえ、げい、アルバム |
| `src/js_onboard.js` | 写真から迎える流れ、種類・色・名前の編集、起動処理（boot） |
| `src/js_home.js` | ホーム画面版だけのJS（`build.sh` が `js_rules.js` のすぐあとに入れる）。いまは `HomeRescue`：前の きびしいルールで きょう れんぞくが1にもどった子に、おたすけを出しなおす |
| `src/js_line.js` | LINE版だけのJS（LIFF の準備、サーバーでの本人確認とセーブ、AIの読みとり `LineAI`、やめる `LineLeave`、写真立ての イラスト `LineFrame`、うちのこカード `CardArt`・`LineCard`〈絵を PNG に → `POST /card` → `liff.shareTargetPicker()`〉。`LINE_CFG.liffIds`（内部チャネルごと。ひらいた場所 `/`・`/review/`・`/dev/` で えらぶ）・`LINE_CFG.api`） |
| `src/sw.js` | オフライン用のService Worker（`__VER__` はビルド時に置きかわる） |
| `src/build.sh` | 組み立て。`../index.html` と `../sw.js`（ホーム画面版）、`out/uchinoko-claude.html`（Claude版）、`out/line/`（LINE版。本番用＝いちばん上、審査用＝`review/`、開発用＝`dev/` に同じページ。うちのこカードの メッセージに出す `line-icon.png` も）を出力 |
| `src/icons/` | アイコンの元データ（1024px）と描画スクリプト。LINE用（130px）は `line_icon.js`・`render_line.py` → `line-icon-130.png` |
| `src/legal/` | LINE版のプライバシーポリシー・利用規約（`build.sh` が お問い合わせ先 `CONTACT`＝Googleフォームの URL を入れて `out/line/` に出す。空なら出さない） |
| `tools/smoke.py` | スマホ幅での動作確認とスクリーンショット |
| `tools/linebreak.py` | 改行の確認：375・390px で シート・ポップアップ・トースト・はじめての画面を出し、ことばの まんなかの改行と 横はみだしを数える（`--line` LINE版、`--claude` Claude版、`--shots DIR` で スクリーンショット） |
| `tools/webfonts.py`・`tools/fonts/` | 確認用に Google Fonts と同じフォント（@fontsource）を手元から出す（はじめに `cd tools/fonts && npm install`。`linebreak.py` が使う） |
| `supabase/migrations/` | LINE版のサーバー（Supabase「uchinoko-biyori」）の表。`app` スキーマ（Data API に出さない） |
| `supabase/functions/api/index.ts` | LINE版のサーバーの関数（本人確認・おせわの判定 `/act`・名前とみための `/save`・引っこしコードの取りこみ・AIの読みとり `/read`・やめる `/leave`・うちのこカードの画像 `/card`〈Storage のバケット `cards`〉） |
| `supabase/functions/api/game.js` | サーバーで使う `ensureState`・`Rules`・AIの `buildPrompt`/`parseAI` など（`tools/build_server.py` が src/ から作る。手で直さない） |
| `supabase/functions/api/deno.json` | `uchinoko-game` が、push したコミットの `game.js` を指す（`--pin` で書きかえる） |
| `tools/build_server.py` | `game.js` を作る・確かめる（`--check`）・コミットに固定する（`--pin <SHA>`） |
| `tools/line_e2e.py` | LINE版のルール・サーバー・画面の通し確認（`tools/rules_test.mjs` も動かす。`tools/server/` の Deno と PGlite を使う。はじめに `cd tools/server && npm install`） |
| `tools/rules_test.mjs` | ルール（`js_rules.js`）を時計を動かして確かめる（れんぞく・おたすけ・日本時間の0時・おみやげ・げい・イベント・記念日） |
| `tools/compare_home.py` | ホーム画面版の動きが前の版と同じかをくらべる（`python3 tools/compare_home.py [コミット]`、既定は HEAD） |
| `docs/REVIEW_PROMPT.md` | 約束①（Claude Fable 5.2 の診断とレビュー）の チャットに貼るプロンプト |
| `.github/workflows/keepalive.yml` | GitHub Actions「サーバーを起こす」：3日ごとに LINE版のサーバーの `/health` と、DB を1回読む呼び出し（でたらめのセッションで 401）をして、Supabase の無料プランが止まらないようにする（`docs/PROJECT.md` の10章） |
| ルートの `index.html` `sw.js` `manifest.webmanifest` `*.png` | 公開ファイル（ビルド結果なので手で直さない） |

JSは1つの `<script>` に `build.sh` の順でつなげられます。`const HOME = true/false` で、ホーム画面版とClaude版の差を切り替えます。LINE版は `HOME = true` に `js_line.js` を足したものです（`docs/PROJECT.md` の10章）。

## 作業の流れ

1. `src/` だけを編集します。ルートの `index.html` は手で直しません。
2. `sh src/build.sh` を実行します。`node --check` 相当の構文チェックは、ビルド結果を `node --check` に通して確認します。
3. `python3 tools/smoke.py` で、スマホ幅（390×844）の主要画面を確認します。スクリーンショットを見て、ページエラーが0件であることを確かめます。文言や CSS を変えたときは `python3 tools/linebreak.py`（LINE版は `--line` も）で、ことばの まんなかの改行が0件か確かめます。LINE版にかかわる変更では `python3 tools/smoke.py --line --android-inset 48` と `python3 tools/line_e2e.py`（サーバーと画面の通し確認）も通します。
   - **おせわのルール（`js_rules.js`）や おせわの画面を、動きを変えるつもりなしに直したとき：** `python3 tools/compare_home.py` で、ホーム画面版の最後のセーブが前の版（HEAD）と同じか確かめます。
   - **サーバー（`supabase/`）や、サーバーでも使う関数（`ensureState`・`carryExtras`・引っこしコードの読みとり、`js_rules.js`、データのファイル）を変えたとき：** `python3 tools/build_server.py` → `python3 tools/line_e2e.py` → main に push → `python3 tools/build_server.py --pin <そのコミットのSHA>` → Supabase の MCP で `api` に `index.ts` と `deno.json` をデプロイ（`verify_jwt: false`、`import_map_path: deno.json`）→ `--check` → `execute_sql` から pg_net（`net.http_get` / `net.http_post`）で `/health` などを確かめる → deno.json を含めてもう一度 push。表を変えるときは `supabase/migrations/` に足して `apply_migration` し、`get_advisors` で確かめます（`docs/PROJECT.md` の10章）。
4. 日本語のコミットメッセージで `main` に push します。1〜2分で GitHub Pages に反映されます（Actions の「pages build and deployment」で確認できます）。
5. 仕様や決めたことが変わったら、`docs/PROJECT.md` の該当箇所と「更新履歴」も同じコミットで更新します。`docs/PROJECT.md` の先頭の「最終更新」の日付も、push のたびに更新します。
6. 最後に、オーナーへ「プロジェクトのナレッジで『Sync now』（同期）を押してください」と一言添えます。ナレッジは自動では更新されず、同期した時点の GitHub の中身に置きかわります。新しいフォルダをルートに足したときは、ナレッジのファイル選択にも追加してもらいます（`supabase/` は 2026-11-06 に追加をお願いずみ）。
7. ひとまとまりの作業が終わったら、オーナーに「完了」と伝え、`docs/HANDOFF.md` を書き直したうえで、新しいチャットで続きから始めるためのプロンプト（コピーして貼れる形）を作ります。オーナーは作業ごとに新しいチャットへ移ります。

## オーナーとの約束（その時が来たら、ソーイから伝える）

2026-11-13 にオーナーと約束したこと。作業のはじめに、いまが「その時」か確かめ、そうなら作業の前にオーナーへ伝えます。迷ったら（リリースや公開の話が出たら）一言たずねます。終わったら、ここと `docs/PROJECT.md` 10章「決めたこと（2026-11-13、リリースと認証の順番）」に「済み」と書きます。

1. **リリースの直前：Claude Fable 5.2 による全体の診断とレビュー。** うちのこ日和が完成して、LINE版をリリース（公開）する直前になったら、Fable 5.2 でセキュリティも含めた全体の診断とレビューを行うことを伝えます。診断は、モデルを Claude Fable 5.2 にした新しいチャットで行うので、ソーイはそのチャットに貼るプロンプト（見てほしい範囲：3つの版の画面と `src/`、サーバー `supabase/`（本人確認・セッション・`/act`・`/import`・`/read`・`/leave`・`/card` と Storage の公開バケット・カードの画像の確かめと消し方）、DB の権限と RLS、Secrets の扱い、AIへの送り方と回数の上限、CSP、引っこしコード、セーブの移行、プライバシーポリシーと利用規約、`.github/workflows/`）を作ります。直すことが見つかったら、直してからリリースします。→ **2026-11-13：完成したので伝えて、プロンプトを `docs/REVIEW_PROMPT.md` に作った（診断は これから。診断が終わったら「済み」）。** → **2026-11-13：診断 済み（レポート：https://claude.ai/artifact/8kuQtwwyAD9RJ42PPy7GU6 。42こ＝中6・低20・情報16、「必ず」は0。リリースの前に 42こ ぜんぶ 片づける＝オーナー決定（かたまりは docs/HANDOFF.md）。片づいたら 約束①は「済み」）。** → **2026-11-14 オーナーから：直しに くわえて「1日の おわりが近づいたら 知らせる」通知を どの版にも入れたい。直しと通知が できたら、リリースの前に もう一度 Claude Fable 5.2 で さいごのチェックをする（新しいチャット。ソーイが プロンプトを `docs/REVIEW_PROMPT.md` に作りなおして伝える。見るのは 診断のあとに変えたところと 通知）。約束①が「済み」になるのは、この さいごのチェックが終わったとき。**
2. **リリースのあと：個人事業主の申請などのための、別のプロジェクトのプロンプト。** LINE版をリリースしたら、Claude で別のプロジェクトを作って個人事業主の申請（開業届など）を進めるための、プロジェクトの指示とはじめのプロンプトを作って伝えます。オーナーは ふだん会社員（副業として始める）。そのプロジェクトで相談したいこと：開業届と屋号「Y's Apps」、会社員の副業として気をつけること、確定申告、LINEミニアプリの認証審査に出す事業証明書（開業届の控えなど）、あとで入れるアプリ内課金・広告に要るもの（特定商取引法の表示など）。ソーイは税理士・弁護士ではないので、専門家への確認もすすめます。個人事業主になったら、LINEミニアプリの認証審査を申請します（補足資料の文は `docs/PROJECT.md` 10章）。

## 守ること

- **セーブをこわさない。** 保存データ `S` にフィールドを足すときは、`ensureState()` に既定値と移行を書きます。引っこしコードで運ぶものは `carryExtras()` にも足します。保存キー `uchinoko-biyori:v1` と引っこしコードの形式 `UCHINOKO2:<長さ>:<base64>` は変えません（`UCHINOKO1` も読めるまま残します）。端末の中には、毎日のひかえ `uchinoko-biyori:backup`（と `:backup-day`）と、読めなかったセーブの `uchinoko-biyori:broken` もあります。これらを消す処理は書きません。配列に上限をつけるときは、毎日たまるもの（スタンプなど）が何年使っても切れない大きさにします。
- **ドメインは共有。** `*.github.io` は、同じアカウント（組織）のほかの Pages サイトと localStorage と Service Worker のキャッシュを共有します。保存キーとキャッシュ名はアプリ名ではじめ、`localStorage.clear()` や、ほかのアプリのキャッシュを消す処理は書きません。
- **CSP。** ホーム画面版は CSP で、`index.html` の中のスクリプト1つと Google Fonts だけを読みこめます（ハッシュは `build.sh` が入れるので、`index.html` を手で直すと動かなくなります）。`onclick="…"` や `javascript:` は使わず `addEventListener` で書きます。外から読みこむものを足すときは `src/home_head.html` の CSP と `src/sw.js` もそろえ、`tools/smoke.py` で CSP の違反が0件か確かめます。
- **IDは消さない。** きせかえなどを入れ替えるときは、`WEAR_RENAMED` で古いIDを新しいIDへつなぎます。
- **スマホ優先。** 390px幅で横スクロールが出ないこと。タップしやすい大きさにします。iPhoneのSafariで残像が出るので、体ごと大きく動くアニメは `#petArt` に付けます（SVG内のグループで枠の外まで動かさない）。
- **文言。** やさしいひらがな多めにし、メインメニューの言葉にそろえます（例：「げい」「◯日」）。
- **改行と見た目。** 日本語の文が ことばの まんなかで 切れないようにします（「カ／ード」のように切れない）。CSS は 画面ぜんたいに `word-break:keep-all; overflow-wrap:anywhere`（`head.html` の `body`）なので、新しい文にも 文節の あいだに スペースを入れます（スペースが ないと 長い文は どこでも切れる）。見出しや のこり回数など、切れ目を決めたいところは `<br>` で 行を分けます。タイルなど せまいところの名前は `softName()`（`js_app.js`）で出し、カタカナの長い名前を足したら `SOFT_WORDS` に つなぎめを足します。新しい機能や直しでは、`tools/linebreak.py` と スマホ幅のスクリーンショットで 改行・配置・色を 目で確かめてから push します（2026-11-13 オーナーから。画面ぜんたいに入れたのも 2026-11-13）。
- **色。** `head.html` の `:root` トークンを使い、ライトとダークの両方で読めるようにします。
- **デザイン。** 実在のチームやブランドのデザイン（ユニフォームなど）は再現しません。トリコロールの色づかいはOKです。
- **Claude版。** https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs に `src/out/uchinoko-claude.html` を同じURLのまま公開し直します。`capabilities` ははぶいて、いまの宣言（db のルール、user・sample・downloads）を引きつぎます。権限を足すときは、`docs/PROJECT.md` の「安全のための決まり」にある宣言を全部書いたうえで足します。
- **LINE版。** LINE版だけの変更は `src/line_head.html` と `src/js_line.js` に書き、ホーム画面版の `index.html`・`sw.js` を変えないようにします（変わると、だいずのアプリが更新されます。ビルドの前後で比べる）。LIFF SDK はエッジパスのまま使い、古い版に固定しません。LINE のユーザーIDやプロフィールの値を本人確認に使わず、IDトークンをサーバーで検証します。写真の控え（160px）はサーバーに送りません。AIの読みとりで写真を送るときは、端末で小さくしてからサーバー経由で送り、保存もログもしません。AIの鍵は Supabase の Secrets の `ANTHROPIC_API_KEY` だけに置き、回数の上限はサーバーで数えます（`docs/PROJECT.md` の10章）。
- **ルールは1か所。** おせわの数字・上限・日付・偶然は `src/js_rules.js` に書き、時刻は `now()`/`dayKey()`（`Clock`）、偶然は `Clock.rand()` を使います（`Date.now()`・`new Date()`・`Math.random()` を ルールの中で直接使わない。見た目だけの処理は そのままでよい）。例外：おたすけの間隔は、ホーム画面版だけ `build.sh` の `HOME_RESCUE_EVERY`（2＝1日おき）で `RESCUE_EVERY` を置きかえます（`js_rules.js` の `const RESCUE_EVERY = 7;` の行の形を変えると、ビルドが止まります）。画面の処理（`$`・`Pet`・`Modal` など）はルールに入れません（サーバーで動かないため）。
- **LINE版のサーバー。** おせわの数字や記録は画面から受けとりません（判定は `/act`、`/save` は名前・みためだけ、はじめての子は `adopt` か取りこみ）。表は `app` スキーマに置き、Data API に出しません（`public` に置かない。anon・authenticated に権限をあたえない）。読み書きは Edge Function `api` からだけ。セッションのトークンは画面のメモリだけに置き（localStorage に保存しない）、DB にはハッシュだけ。ログにトークン・IDトークン・セーブの中身を出しません。チャネルシークレットや APIの鍵が要るときは、チャットに貼ってもらわず、Supabase の画面で入れてもらいます（`create_edge_function_secret`）。LINE版の端末のキー `uchinoko-biyori:line-owner`・`uchinoko-biyori:line-guest`・`uchinoko-biyori:line-left` も消す処理は書きません（やめた人の端末の子は、`line-left` で ゲストにする）。やめる人のデータはサーバーから すぐに消し、LINE の deauthorize で許可も取り消します（チャネルシークレットは内部チャネルごとに Secrets の `LINE_CHANNEL_SECRET_<チャネルID>`。開発用は `LINE_CHANNEL_SECRET` でもよい）。LIFF ID と チャネルID は 開発用・審査用・本番用で べつ（`docs/PROJECT.md` の10章「内部チャネル」）。サーバーの URL を変えるときは `LINE_CFG.api` と `line_head.html` の CSP（`connect-src`）をそろえます。
- **ポップアップ。** 画面全体を暗くして中央に出します（`Modal.show`）。同時に複数あるときは順番に出ます。
- **ポリシーと規約。** 取る情報・送り先・保存期間・使う外部サービス・回数の上限などを変えたら、`src/legal/privacy.html`（と `terms.html`）も同じコミットで直し、制定日の下に改定日を足します。認証されたあとに ポリシー・規約の URL やアイコンを変えると再審査になります（`docs/PROJECT.md` の10章）。
