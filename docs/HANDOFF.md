# 引き継ぎメモ（いまの状況）

このファイルは、チャットのいちばん最後に毎回まるごと書き直します。次のチャットは、ここを読めば続きから始められます。オーナーは、更新のたびにプロジェクトナレッジのGitHubを「同期」し、作業ごとに新しいチャットへ移ります（`CLAUDE.md` の作業の流れ 7）。

- 最終更新：2026-11-13
- リポジトリ：`Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。ホーム画面版：https://y-s-apps.github.io/uchinoko-biyori/
- ホーム画面版の公開中の版：`sw.js` のキャッシュ名 `uchinoko-29c51138fd`（2026-11-12 から変わっていない）
- Claude版：https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs は**バージョン21**（`047f1e0` の中身）。いまの main で作っても中身は同じ
- LINE版の画面：Cloudflare Pages（main の push で自動ビルド。2026-11-13 の push もビルド成功。このチャットでは画面を変えていない）
  - 本番用 https://uchinoko-biyori.pages.dev/ 、審査用 https://uchinoko-biyori.pages.dev/review/ 、開発用 https://uchinoko-biyori.pages.dev/dev/ （同じページ。ひらいた場所で LIFF ID をえらぶ）
  - LIFF URL：開発用 https://miniapp.line.me/2012410263-cuCI7vQS ／審査用 https://miniapp.line.me/2012410264-JD4WhzAb （審査担当者だけ）／本番用 https://miniapp.line.me/2012410265-PutgsCLS （未認証なので URL を知っている人は開ける）
  - チャネルID：開発用 `2012410263`・審査用 `2012410264`・本番用 `2012410265`
  - プライバシーポリシー https://uchinoko-biyori.pages.dev/privacy.html 、利用規約 https://uchinoko-biyori.pages.dev/terms.html 、お問い合わせフォーム https://forms.gle/aywxktpPZettxFSS7
- LINE版のサーバー：Supabase のプロジェクト「uchinoko-biyori」（`ftakgswltcavwixqxpzi`、東京、組織 `Yuthy's` の無料プラン）。Edge Function `api` は Supabase の画面で**バージョン11**（`23cfaa3` の `index.ts`、2026-11-11 3:13 のデプロイ）。MCP の `list_edge_functions` では version 15 と出るが、中身の場所は `_11` のまま（Secrets を入れたぶん数がふえたらしい）。`deno.json` は `game.js` をコミット `2dca6cf` に固定したまま
- Secrets（2026-11-13 に名前を確かめた）：`ANTHROPIC_API_KEY`・`LINE_CHANNEL_SECRET`（開発用）・`LINE_CHANNEL_SECRET_2012410264`（審査用）・`LINE_CHANNEL_SECRET_2012410265`（本番用）。シークレット3つは 2026-11-11 3:21〜3:22 に新しいものを入れた
- 本物の DB：会員・ひもづけ・セッション・セーブ・AIの回数は **0件**（2026-11-13、ためしの子を「LINEの データを けす」で消した）。表のマイグレーションは `app_schema`・`pg_net_for_checks`・`ai_usage`・`ai_usage_member_idx` まで（変えていない）
- LINE Developers：Scope は `openid` だけ（2026-11-13）
- LINE版の計画書：https://claude.ai/artifact/AgKkCkHCsWAywKGV6VFxwK （7章のチェックリストに、多言語対応・Scope・所在国の3行を足した）

## 直近のチャットでやったこと（2026-11-13）

- **Secrets の名前：** オーナーの Supabase の画面のスクリーンショットで、4つの名前が正しいことを確かめた（値は見ていない。画面に出るのは名前と SHA256 だけ）。
- **「LINEの データを けす」の実機の確認（iPhone の LINE、Tester）：** 開発用で「［開発用］LINEと つながっています」→ けす（2回）→ 本番用で「こむぎを LINEに つれてくる？」→ つれてくる（「［開発用］」は出ない）→ けす。どちらも「けしました」の画面に「LINEの『設定』から はずせます」の1行が出ず、LINEの「連動アプリ」から うちのこ日和が消えた。ログは login・import・act・leave が すべて 200、`leave:` のエラーは なし。表は5つとも0件。審査用のシークレットは 審査の担当者しか試せないので、名前だけ。
  - 気づいたこと：同じ内部チャネルで けしたあと すぐに また ひらくと、LINE が とっておいた前のトークンで ログインでき、その会員を けすと取り消しは `already`（1行は出ない）。ふつうの動き（直さなくてよい）。
- **審査の前に決めたこと（オーナー決定。`docs/PROJECT.md` 10章「決めたこと（2026-11-13、審査の前）」）：** Scope は `openid` だけ（オーナーが変えたのをスクリーンショットで確かめた）／英語のチャネル名「Uchinoko Biyori」／英語のチャネル説明は日本語の説明と同じ中身（496文字。本文は PROJECT.md）／「会社・事業者の所在国・地域」は日本。
- **しらべたこと（LINE の公式ドキュメント、2026-11-13）：** 2026-01-08 以降に作ったチャネルは「チャネル同意の簡略化」が いつも有効で、同意なしで使えるのは `openid` だけ。チャネル名は20文字まで・説明は500文字まで（ほかの資料）。審査は チャネル説明をもとに行われる。認証されたあとに変えると再審査になる項目は PROJECT.md 10章に書いた。2026-08-26 から、はじめて ひらいたときの「簡略化同意画面」も出なくなった（解説記事。公式のページでは まだ確かめていない）。
- だいずの おたすけ：11/12 のうちに かなえられた（オーナー）。

### その前のチャット（2026-11-12）

- ホーム画面版だけ、おたすけのおねがいを1日おきに（`build.sh` の `HOME_RESCUE_EVERY=2`）。前の版で れんぞくが1にもどった日に、おたすけを出しなおす `src/js_home.js`（`HomeRescue`）。Claude版・LINE版・サーバーは変わらない。

## 保留・オーナーの判断待ち（つぎのチャットのはじめに）

1. **多言語対応と所在国を入れたか（オーナーの作業）：** LINE Developers の「チャネル基本設定」→「多言語対応」に 英語（チャネル名 `Uchinoko Biyori`、説明は PROJECT.md 10章の英文）、「会社・事業者の所在国・地域」を日本に。入れたら、シークレットが写らないところだけ スクリーンショットを見せてもらって確かめる。
2. **認証審査の申請の準備：** 「審査のための補足資料」（審査担当者がためす手順。写真をえらぶ → AIで読みとる／自分でえらぶ → おせわ → 引っこしコード → LINEの データを けす、など）の案を作る。審査用と本番用の LIFF URL が同じサービスを映していることを確かめる。日本語のチャネル説明が いまのアプリと あっているか見なおす。申請はオーナーが LINE Developers で行う。
3. **アイデア（迷っている）：AIを使わないときの色ひろいを よくする。** 案A：いまのまま＝おすすめ（LINE版は AIで読める）。案B：地面らしい色を よけるように直す（ホーム画面版の `index.html` も変わり、だいずのアプリが更新される）。
- Android は未確認。
- おたすけ：ホーム画面版は1日おき（2026-11-12）。Claude版・LINE版は「前回から7日」のまま（LINE版も変えるなら、`js_rules.js` を変えてサーバーも作り直す）。

## 次にやること

- 上の保留（多言語対応と所在国の確認 → 審査の補足資料 → 申請）。
- そのあと：うちのこカード、公式アカウント、ほかの端末の写真立て（写真がないときにイラストを出す）。
- **公開の日：** サーバーは もう0件。オーナーの iPhone の LINE には ためしの子「こむぎ」が ゲストとして のこっているので、LINE で ひらいて「こむぎを LINEに つれてくる？」が出たら**「やめておく」**→ はじめての画面の「引っこしコード」で だいずを取りこむ（取りこみは1人1回）。開発用・審査用・本番用は 同じサーバーと DB。

## 気をつけること

- いま育てている子は「だいず」（クリームのポメラニアン、ホーム画面版）。セーブをこわす変更はしない（`CLAUDE.md` の「守ること」）。LINE版だけの変更では、ビルドの前後でホーム画面版の `index.html`・`sw.js` が同じか確かめる。
- LINE版の画面は3か所（`/`・`/review/`・`/dev/`）とも同じファイル。ページの中から ほかのファイルを読むときは、いちばん上からのパス（`/privacy.html` など）にする（相対パスだと `/dev/privacy.html` になる）。
- Scope は `openid` だけ。画面で `liff.getProfile()` など `openid` 以外の権限が要るものを呼ばない（呼ぶと「アクセス許可要求画面」が出る。Scope にないと使えない）。友だち機能・友だち追加オプションを足すときに Scope を足す（認証のあとなら再審査）。
- 認証されたあとに 本番用の エンドポイントURL・ポリシーと規約の URL・アイコン・チャネル名・説明・多言語対応・Scope・友だち追加オプションを変えると再審査。開発用・審査用の エンドポイントURL は自由に変えられる。チャネル説明を変えるときは 日本語と英語を そろえる。
- ポリシーに書いたこと（取る情報・送り先・保存期間・外部サービス・回数の上限）を変えたら、`src/legal/` も同じコミットで直す（`CLAUDE.md`）。
- ルールの時刻・日付・偶然は `Clock` だけ。ルールや `js_onboard.js` の `buildPrompt`/`parseAI` を変えたらサーバーも作り直す（`build_server.py` → push → `--pin` → デプロイ）。`game.js` が変わらないときは、`deno.json` の固定はそのままでよい（`--check` で確かめる）。
- LINE版のサーバーは、おせわの数字を画面から受けとらない。AIの返事は `parseAI()` を通した形だけを画面にわたす。写真・AIの返事・トークンはログに出さない。
- LINE版の画面で、サーバーへ送るものは `LineSync.queue` で1つずつ。queue の中から queue を使う処理（`reload` など）を まつと止まるので、またない。むかえた子は `pushPending` で おせわより先に。
- 端末のキー `line-owner`・`line-guest`・`line-left` は消さない。やめたあとは `LineServer.call` が つながない（新しい会員を作らない）。また開けば ふつうにログインする。
- `index.html` は CSP のハッシュつきなので、手で直さず `sh src/build.sh` で作る。
- 組織 Y-s-Apps のほかの Pages サイトとは、セーブとキャッシュを共有する。LINE版は `y-s-apps.github.io` に置かない。
- LIFF SDK は v2.20.0〜v2.31.0 に脆弱性があり、2026-11-24ごろ利用制限の予定。エッジパスのまま使う。
- このセッションの外への通信は、パッケージの置き場と GitHub だけ。`*.pages.dev`・`*.github.io`・`supabase.co`・LINE・Anthropic には直接届かない。本物のサーバーと画面は `execute_sql` から pg_net（`net.http_get` / `net.http_post`、返事は `net._http_response`）で確かめる。サーバーのようすは `query_logs`（`function_edge_logs` で呼ばれたパスと状態、`function_logs` で `console.error`）でも見られる。ウェブのページは WebSearch のあとの WebFetch で読む（URL を直接 WebFetch すると、オーナーの許可待ちで止まることがある）。
- ブラウザ：オーナーがスマホだけのときは Claude in Chrome も アプリ内ブラウザも つながらない（2026-11-13 のはじめ）。そのときは オーナーにスクリーンショットをお願いする。LINE Developers・Supabase の設定を変えるのは オーナーの許可をもらってから。**シークレットが出るページ（LINE Developers の「チャネル基本設定」）は本文ごと読まない・画面全体を写さない**（`find` で ほしいところだけ読む）。
- 本物の DB に ためしの会員やセッションを `execute_sql` で書きこまない。サーバー側の通しは `line_e2e.py`（PGlite）で確かめ、本物は 読むだけ＋セッションなしの呼び出しにする。実機の確認はオーナーにお願いする。
- Edge Function のデプロイは `index.ts` を丸ごと送るので、送ったあと `get_edge_function` で中身を見て、手元と同じか確かめる（とくに正規表現の `\`）。
- 表を変える `apply_migration` は、作業環境の確認で止められることがある。止められたら、オーナーに理由を伝えて判断してもらう（回り道で DDL を流さない）。
- Supabase の無料プランは、使われない日が1週間ほど続くとプロジェクトが止まる。止まっていたら MCP の `restore_project` で戻す。公開までは LINE版を ひらく人が いないので、止まりやすい。
- Cloudflare のビルド結果は、GitHub のコミットのチェック（「Cloudflare Pages」）で確かめられる（`gh api repos/Y-s-Apps/uchinoko-biyori/commits/<SHA>/check-runs`）。
