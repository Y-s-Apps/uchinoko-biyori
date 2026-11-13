# 引き継ぎメモ（いまの状況）

このファイルは、チャットのいちばん最後に毎回まるごと書き直します。次のチャットは、ここを読めば続きから始められます。オーナーは、更新のたびにプロジェクトナレッジのGitHubを「同期」し、作業ごとに新しいチャットへ移ります（`CLAUDE.md` の作業の流れ 7）。

- 最終更新：2026-11-13（4回目）
- リポジトリ：`Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。ホーム画面版：https://y-s-apps.github.io/uchinoko-biyori/
- ホーム画面版の公開中の版：`sw.js` のキャッシュ名 `uchinoko-29c51138fd`（2026-11-12 から変わっていない）
- Claude版：https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs は**バージョン21**（`047f1e0` の中身）。いまの main で作っても中身は同じ
- LINE版の画面：Cloudflare Pages（main の push で自動ビルド。このチャットでは画面を変えていない）
  - 本番用 https://uchinoko-biyori.pages.dev/ 、審査用 https://uchinoko-biyori.pages.dev/review/ 、開発用 https://uchinoko-biyori.pages.dev/dev/ （同じページ。ひらいた場所で LIFF ID をえらぶ）
  - LIFF URL：開発用 https://miniapp.line.me/2012410263-cuCI7vQS ／審査用 https://miniapp.line.me/2012410264-JD4WhzAb （審査担当者だけ）／本番用 https://miniapp.line.me/2012410265-PutgsCLS （未認証なので URL を知っている人は開ける）
  - チャネルID：開発用 `2012410263`・審査用 `2012410264`・本番用 `2012410265`
  - プライバシーポリシー https://uchinoko-biyori.pages.dev/privacy.html 、利用規約 https://uchinoko-biyori.pages.dev/terms.html 、お問い合わせフォーム https://forms.gle/aywxktpPZettxFSS7
- LINE版のサーバー：Supabase のプロジェクト「uchinoko-biyori」（`ftakgswltcavwixqxpzi`、東京、組織 `Yuthy's` の無料プラン）。Edge Function `api` は Supabase の画面で**バージョン11**（`23cfaa3` の `index.ts`、2026-11-11 3:13 のデプロイ。変えていない）。MCP の `list_edge_functions` では version 15 と出るが、中身の場所は `_11` のまま。`deno.json` は `game.js` をコミット `2dca6cf` に固定したまま
- **サーバーを起こす：** GitHub Actions「サーバーを起こす」（`.github/workflows/keepalive.yml`、状態は active）。cron `23 18 */3 * *`＝日本時間 3:23 ごろ、1・4・7…31日の あくる日。**手で動かした回（2026-11-13 11:06）は成功**（`health: 200`、`db: 401 {"error":"nosession"}`）。**予定の実行は まだ来ていない**（はじめては 2026-11-14 3:23 ごろ）
- Secrets：`ANTHROPIC_API_KEY`・`LINE_CHANNEL_SECRET`（開発用）・`LINE_CHANNEL_SECRET_2012410264`（審査用）・`LINE_CHANNEL_SECRET_2012410265`（本番用）
- 本物の DB：会員・ひもづけ・セッション・セーブ・AIの回数は **0件**（2026-11-13）。表のマイグレーションは `app_schema`・`pg_net_for_checks`・`ai_usage`・`ai_usage_member_idx` まで（変えていない）
- LINE Developers：Scope は `openid` だけ。多言語対応（英語）と所在国「日本」は入った。「シェアターゲットピッカー」は**まだ有効にしていない**（うちのこカードを作るときに オーナーが有効にする）。**認証審査は まだ申請しない**（未認証でリリース → 個人事業主 → 申請、の順。オーナー決定）
- LINE版の計画書：https://claude.ai/artifact/AgKkCkHCsWAywKGV6VFxwK （Claude Docs。読むときは Claude Docs の `read`。うちのこカードの順番〈4章「進める順番」・3章「推奨」〉は まだ古いまま＝認証のあと、と書いてある。完成の前に あわせる）

## 直近のチャットでやったこと（2026-11-13、4回目）

- **「サーバーを起こす」の確認：** 予定の実行は まだ来ていなかった（はじめては 11/14 3:23 ごろ）。手で動かした回（11/13 11:06）の記録を見て、`/health` 200 と DB の 401 `nosession` を確かめた。
- **リリースまでに やること（「完成」の中身）を決めた（オーナー決定。PROJECT.md 10章「決めたこと（2026-11-13、完成の中身）」）：**
  - 足す：① **写真立てのイラスト**（写真の控えがない子は、写真立てに きせかえなしの イラストを かざる）② **うちのこカード**（`liff.shareTargetPicker()` で Flex Message。きせかえを着たイラスト＋季節のわくの画像を 端末で作り、Supabase Storage〈読みとりだけ公開〉に置く。名前・なかよしLvと呼び名・れんぞく日数・「うちのこ日和で あそぶ」ボタン〈本番用 LIFF URL〉。写真は入れない。画像は送ってから1年で消す・けすと すぐ消す・1人1日3枚。ボタンは プロフィールだけ）。どちらも LINE版だけ。
  - 足さない：LINE版の おたすけは **7日のまま**（だいずは引っこすと 7日に1回になる。オーナー了承）／色ひろいは **いまのまま**（案A）／Android は **未確認のまま出す**（見られないため）／公式アカウントは 認証のあと。
  - 調べたこと：未認証ミニアプリでも シェア（カスタムアクションボタン）・公式アカウントの友だち追加・決済・広告は使える。`shareTargetPicker` は Scope が いらない（内部チャネルごとに有効にする。同意の画面あり）。

### その前のチャット（2026-11-13、1〜3回目）

- 認証は 法人と個人事業主だけと分かり、「未認証でリリース → 個人事業主 → 認証審査」の順に決めた。約束①②を `CLAUDE.md` に記録。審査の補足資料の文、申請前の確認、GitHub Actions「サーバーを起こす」。Secrets の名前の確認、「LINEの データを けす」の実機の確認、Scope・英語の説明・所在国。

## 保留・オーナーの判断待ち（つぎのチャットのはじめに）

1. **「サーバーを起こす」の予定の実行が動いたか**（2026-11-14 3:23 ごろ より あと）：`gh api 'repos/Y-s-Apps/uchinoko-biyori/actions/runs?per_page=10'` で `event` が `schedule` の回を見る。成功なら ログに `health: 200` と `db: 401 {"error":"nosession"}`。失敗なら Supabase が止まっていないか `get_project`（止まっていたら `restore_project`）。まだ来ていなければ（11/14 3:23 より前なら）、そう伝えて つぎへ。
2. **① 写真立てのイラスト を作る**（小さい。LINE版だけ。`js_line.js` で包む。ホーム画面版の `index.html`・`sw.js` が変わらないことを ビルドの前後で確かめる）。
3. **② うちのこカード を作る**（数回のチャット）。くわしい決めごとは PROJECT.md 10章。作りながら決める細かいこと（画像の大きさ・PNG か JPEG・Storage のバケット名・カードの記録の表・1年で消す処理を どこで動かすか など）は、ソーイが ふつうの形で決めて、PROJECT.md に書く。変えると オーナーの体験が変わることだけ、作業の前に聞く。
   - 順番の目安：サーバー（`/card` の口、カードの記録の表、Storage の公開バケット、`/leave` と2年の削除で画像も消す、1年で消す）→ 画面（カードの画像を作る、プロフィールのボタン、`shareTargetPicker`）→ ポリシーと規約（改定日）→ オーナーに「シェアターゲットピッカー」を 開発用・審査用・本番用で有効にしてもらう → iPhone の LINE（Tester、開発用）で 実機の確認。
   - Storage のバケットを作るのは 表の変更と同じく `supabase/migrations/` に足して `apply_migration`（止められたら オーナーに理由を伝える）。`get_advisors` で確かめる。
4. **完成の前に：** 補足資料の文（PROJECT.md 10章）に カードを送る手順を足す。計画書（Claude Docs）の うちのこカードの順番を いまの決めごとに あわせる。
5. **完成したら：約束①（Claude Fable 5.2 の診断とレビュー）を ソーイから伝え、Fable 5.2 のチャットに貼るプロンプトを作る**（`CLAUDE.md` の「オーナーとの約束」。見てほしい範囲に うちのこカード〈`/card`・Storage・画像の確かめ〉も足す）。直すことが見つかったら直してから リリース。
6. **リリースしたら：約束②（個人事業主の申請のための別プロジェクトのプロンプト）を ソーイから伝える。**
- おたすけ：ホーム画面版は1日おき（2026-11-12）。Claude版・LINE版は「前回から7日」のまま（2026-11-13 に LINE版は7日のままと決めた）。

## 次にやること

- 上の保留（予定の実行の確認 → 写真立てのイラスト → うちのこカード → 補足資料と計画書 → 完成 → 約束①の診断 → 直す → リリース → 約束② → 個人事業主 → 認証審査の申請）。
- 認証審査を申請したら：審査は1〜2週間、「審査中」は取り消しも変更も できない（画面とサーバーも変えない）。認証されたら：「検索可能にする」は 承認から30日以内に押す（押さないと31日目の9:00に自動で検索できるようになる）。
- 認証のあと：公式アカウント（友だち追加）、ほかのアイデア。
- **公開の日：** オーナーの iPhone の LINE には ためしの子「こむぎ」が ゲストとして のこっているので、本番用の LIFF URL を LINE で ひらいて「こむぎを LINEに つれてくる？」が出たら**「やめておく」**→ はじめての画面の「引っこしコード」で だいずを取りこむ（取りこみは1人1回）。ホーム画面版で「引っこし・バックアップ」→「ファイルで保存」の控えも とっておく。開発用・審査用・本番用は 同じサーバーと DB。うちのこカードの ためしで 開発用に作った会員・カードの画像は、公開の前に「LINEの データを けす」で消す（だいずの取りこみの前に）。
  - だいずは LINE版へ引っこすと、おたすけが 1日おき → 7日に1回 になる（オーナー了承）。
  - できれば、テスターでない人（家族など）の LINE で 本番用の LIFF URL が ひらけるか 見てもらう（Android の人なら なおよい）。

## 気をつけること

- いま育てている子は「だいず」（クリームのポメラニアン、ホーム画面版）。セーブをこわす変更はしない（`CLAUDE.md` の「守ること」）。LINE版だけの変更では、ビルドの前後でホーム画面版の `index.html`・`sw.js` が同じか確かめる。
- **（あとで）認証審査を申請したら、審査中は LINE版の画面とサーバーを変えない**（審査の人が ためしている最中に 動きが変わると困る。直すなら 審査の結果のあと）。
- LINE版の画面は3か所（`/`・`/review/`・`/dev/`）とも同じファイル。ページの中から ほかのファイルを読むときは、いちばん上からのパス（`/privacy.html` など）にする（相対パスだと `/dev/privacy.html` になる）。うちのこカードの「あそぶ」ボタンは、どこから送っても 本番用の LIFF URL。
- Scope は `openid` だけ。画面で `liff.getProfile()` など `openid` 以外の権限が要るものを呼ばない（呼ぶと「アクセス許可要求画面」が出る）。`shareTargetPicker` は Scope が いらない。
- 認証されたあとに 本番用の エンドポイントURL・ポリシーと規約の URL・アイコン・チャネル名・説明・多言語対応・Scope・友だち追加オプション・**シェアターゲットピッカー**を変えると再審査。開発用・審査用の エンドポイントURL は自由に変えられる。チャネル説明を変えるときは 日本語と英語を そろえる。
- ポリシーに書いたこと（取る情報・送り先・保存期間・外部サービス・回数の上限）を変えたら、`src/legal/` も同じコミットで直す（`CLAUDE.md`）。うちのこカードで、Storage・カードの画像・1年・1日3枚が ふえる。
- ルールの時刻・日付・偶然は `Clock` だけ。ルールや `js_onboard.js` の `buildPrompt`/`parseAI` を変えたらサーバーも作り直す（`build_server.py` → push → `--pin` → デプロイ）。`game.js` が変わらないときは、`deno.json` の固定はそのままでよい（`--check` で確かめる）。
- LINE版のサーバーは、おせわの数字を画面から受けとらない。AIの返事は `parseAI()` を通した形だけを画面にわたす。写真・AIの返事・トークンはログに出さない。カードの画像も 中身をログに出さない。
- LINE版の画面で、サーバーへ送るものは `LineSync.queue` で1つずつ。queue の中から queue を使う処理（`reload` など）を まつと止まるので、またない。むかえた子は `pushPending` で おせわより先に。
- 端末のキー `line-owner`・`line-guest`・`line-left` は消さない。やめたあとは `LineServer.call` が つながない（新しい会員を作らない）。また開けば ふつうにログインする。
- `index.html` は CSP のハッシュつきなので、手で直さず `sh src/build.sh` で作る。LINE版の CSP（`line_head.html`）で、カードの画像を画面に出すなら `img-src` に Storage の URL が要る（`connect-src` は いまの supabase.co で足りる）。
- 組織 Y-s-Apps のほかの Pages サイトとは、セーブとキャッシュを共有する。LINE版は `y-s-apps.github.io` に置かない。
- LIFF SDK は v2.20.0〜v2.31.0 に脆弱性があり、2026-11-24ごろ利用制限の予定。エッジパスのまま使う。
- このセッションの外への通信は、パッケージの置き場と GitHub だけ。`*.pages.dev`・`*.github.io`・`supabase.co`・LINE・Anthropic には直接届かない。本物のサーバーと画面は `execute_sql` から pg_net（`net.http_get` / `net.http_post`、返事は `net._http_response`）で確かめる。サーバーのようすは `query_logs`（`function_edge_logs` で呼ばれたパスと状態、`function_logs` で `console.error`）でも見られる。ウェブのページは WebSearch のあとの WebFetch で読む（URL を直接 WebFetch すると、オーナーの許可待ちで止まることがある）。
- ブラウザ：アプリ内ブラウザは LINE Developers に ログインしていない（2026-11-13）。コンソールを見るときは オーナーにログインしてもらうか、スクリーンショットをお願いする。LINE Developers・Supabase の設定を変えるのは オーナーの許可をもらってから。**シークレットが出るページ（LINE Developers の「チャネル基本設定」）は本文ごと読まない・画面全体を写さない**（`find` で ほしいところだけ読む）。
- 本物の DB に ためしの会員やセッションを `execute_sql` で書きこまない。サーバー側の通しは `line_e2e.py`（PGlite）で確かめ、本物は 読むだけ＋セッションなしの呼び出しにする。実機の確認はオーナーにお願いする。
- Edge Function のデプロイは `index.ts` を丸ごと送るので、送ったあと `get_edge_function` で中身を見て、手元と同じか確かめる（とくに正規表現の `\`）。
- 表を変える `apply_migration` は、作業環境の確認で止められることがある。止められたら、オーナーに理由を伝えて判断してもらう（回り道で DDL を流さない）。
- Supabase の無料プランは、DB の動きが1週間ほど少ないと止まる（止まる1週間ほど前にメール）。GitHub Actions「サーバーを起こす」で3日ごとに起こしている。止まっていたら MCP の `restore_project` で戻す。GitHub は 60日 リポジトリに動きがないと 予定の仕事を止める（Actions の画面で 有効にしなおす）。Storage の無料の枠は 1GB（カードの画像は 1人1日3枚・1年で消す）。
- Cloudflare のビルド結果は、GitHub のコミットのチェック（「Cloudflare Pages」）で確かめられる（`gh api repos/Y-s-Apps/uchinoko-biyori/commits/<SHA>/check-runs`）。
