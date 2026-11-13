# 引き継ぎメモ（いまの状況）

このファイルは、チャットのいちばん最後に毎回まるごと書き直します。次のチャットは、ここを読めば続きから始められます。オーナーは、更新のたびにプロジェクトナレッジのGitHubを「同期」し、作業ごとに新しいチャットへ移ります（`CLAUDE.md` の作業の流れ 7）。

- 最終更新：2026-11-13（2回目）
- リポジトリ：`Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。ホーム画面版：https://y-s-apps.github.io/uchinoko-biyori/
- ホーム画面版の公開中の版：`sw.js` のキャッシュ名 `uchinoko-29c51138fd`（2026-11-12 から変わっていない）
- Claude版：https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs は**バージョン21**（`047f1e0` の中身）。いまの main で作っても中身は同じ
- LINE版の画面：Cloudflare Pages（main の push で自動ビルド。このチャットでは画面を変えていない）
  - 本番用 https://uchinoko-biyori.pages.dev/ 、審査用 https://uchinoko-biyori.pages.dev/review/ 、開発用 https://uchinoko-biyori.pages.dev/dev/ （同じページ。ひらいた場所で LIFF ID をえらぶ）。2026-11-13 に3つの MD5 が同じ（`f348cccb…`）で、手元のビルドとも同じことを確かめた
  - LIFF URL：開発用 https://miniapp.line.me/2012410263-cuCI7vQS ／審査用 https://miniapp.line.me/2012410264-JD4WhzAb （審査担当者だけ）／本番用 https://miniapp.line.me/2012410265-PutgsCLS （未認証なので URL を知っている人は開ける）
  - チャネルID：開発用 `2012410263`・審査用 `2012410264`・本番用 `2012410265`
  - プライバシーポリシー https://uchinoko-biyori.pages.dev/privacy.html 、利用規約 https://uchinoko-biyori.pages.dev/terms.html 、お問い合わせフォーム https://forms.gle/aywxktpPZettxFSS7
- LINE版のサーバー：Supabase のプロジェクト「uchinoko-biyori」（`ftakgswltcavwixqxpzi`、東京、組織 `Yuthy's` の無料プラン、2026-11-13 は `ACTIVE_HEALTHY`）。Edge Function `api` は Supabase の画面で**バージョン11**（`23cfaa3` の `index.ts`、2026-11-11 3:13 のデプロイ。変えていない）。MCP の `list_edge_functions` では version 15 と出るが、中身の場所は `_11` のまま。`deno.json` は `game.js` をコミット `2dca6cf` に固定したまま
- **サーバーを起こす（2026-11-13 から）：** GitHub Actions「サーバーを起こす」（`.github/workflows/keepalive.yml`）が3日ごと（日本時間 3:23 ごろ）に `/health` と、DB を1回読む `GET /save`（でたらめのセッション → 401 `nosession`）を呼ぶ。サーバーのログに3日ごとの `/save` 401 が出るのは これ。失敗すると Actions に赤く出る
- Secrets：`ANTHROPIC_API_KEY`・`LINE_CHANNEL_SECRET`（開発用）・`LINE_CHANNEL_SECRET_2012410264`（審査用）・`LINE_CHANNEL_SECRET_2012410265`（本番用）
- 本物の DB：会員・ひもづけ・セッション・セーブ・AIの回数は **0件**（2026-11-13）。表のマイグレーションは `app_schema`・`pg_net_for_checks`・`ai_usage`・`ai_usage_member_idx` まで（変えていない）
- LINE Developers：Scope は `openid` だけ。多言語対応（英語：`Uchinoko Biyori`＋英文の説明）と所在国「日本」は入った（2026-11-13、スクリーンショットで確かめた）
- LINE版の計画書：https://claude.ai/artifact/AgKkCkHCsWAywKGV6VFxwK （7章のチェックリストに 確かめたことを足した）

## 直近のチャットでやったこと（2026-11-13、2回目）

- **多言語対応と所在国の確認：** オーナーのスクリーンショットで、英語のチャネル名「Uchinoko Biyori」と説明（PROJECT.md 10章の英文と一字一句おなじ）、「会社・事業者の所在国・地域」＝日本を確かめた。
- **審査用と本番用が同じサービスを映しているか：** `execute_sql` の pg_net で `/`・`/review/`・`/dev/` を読み、3つの MD5 が同じで 手元の `src/out/line/index.html` とも同じ。サーバーの `/health` は 200。エンドポイントURL は 2026-11-11 に入れたまま（このチャットでは コンソールを見ていない。アプリ内ブラウザは LINE にログインしていなかった）。
- **申請前のチェック：** 日本語のチャネル説明は いまのアプリと あっている。ガイドライン（どれも推奨）：セーフエリアは 480px の中央の列なので 横向きでも ノッチにかからない／読み込み中アイコンは使っていない／Lighthouse（モバイル、LINEの外）で パフォーマンス 88点（推奨50以上）。
- **補足資料の文（日本語）：** PROJECT.md 10章「決めたこと（2026-11-13、審査の申請）」に置いた。オーナーが申請フォームの「審査のための補足資料」に貼る（オーナー決定）。
- **サーバーを起こす仕組み：** 審査のあいだに Supabase の無料プランが止まらないように、GitHub Actions で3日ごと（オーナー決定）。アプリ・サーバーの中身は変えない。

### その前のチャット（2026-11-13、1回目）

- Secrets の名前を確かめた。「LINEの データを けす」を iPhone の LINE で確かめた（開発用・本番用とも許可の取り消しまで、サーバーは0件）。審査の前に決めたこと＝Scope は `openid` だけ、英語のチャネル名と説明、所在国は日本。

## 保留・オーナーの判断待ち（つぎのチャットのはじめに）

1. **認証審査の申請（オーナーの作業）：** LINE Developers の「審査申請」タブで、「審査のための補足資料」に PROJECT.md 10章の文を貼って申請する。申請の前に「ウェブアプリ設定」の エンドポイントURL が 審査用＝`…/review/`・本番用＝`…/` のままか 目で確かめる。申請したら、日時と画面のようすを ソーイに知らせてもらう。
   - 審査は1〜2週間。結果は LINE Developers とメールで来る。却下なら、理由を見て直して再申請（数日）。
   - 審査が始まる（「審査中」）と、取り消しも 入力の変更も できない。審査中は 本番用のエンドポイントURL・ポリシーと規約・チャネル説明などを変えない。画面の文言（補足資料に書いたボタンの名前）も変えない。
2. **「サーバーを起こす」が動いたか：** はじめての予定の実行は 2026-11-14 3:23 ごろ（日本時間）。`gh api repos/Y-s-Apps/uchinoko-biyori/actions/runs` で結果を見る（失敗なら Supabase が止まっていないか `get_project`）。
3. **アイデア（迷っている）：AIを使わないときの色ひろいを よくする。** 案A：いまのまま＝おすすめ（LINE版は AIで読める）。案B：地面らしい色を よけるように直す（ホーム画面版の `index.html` も変わり、だいずのアプリが更新される）。
- Android は未確認。
- おたすけ：ホーム画面版は1日おき（2026-11-12）。Claude版・LINE版は「前回から7日」のまま（LINE版も変えるなら、`js_rules.js` を変えてサーバーも作り直す）。

## 次にやること

- 上の保留（申請 → 審査の結果まち。待つあいだは画面とサーバーを変えない）。
- 認証されたら：「検索可能にする」は 承認から30日以内に押す（押さないと31日目の9:00に自動で検索できるようになる）。公開の日の手順は下。
- そのあと：うちのこカード、公式アカウント、ほかの端末の写真立て（写真がないときにイラストを出す）。
- **公開の日：** オーナーの iPhone の LINE には ためしの子「こむぎ」が ゲストとして のこっているので、LINE で ひらいて「こむぎを LINEに つれてくる？」が出たら**「やめておく」**→ はじめての画面の「引っこしコード」で だいずを取りこむ（取りこみは1人1回）。開発用・審査用・本番用は 同じサーバーと DB。審査のあとは 審査の人の会員とセーブが DB に のこるが、だいずの取りこみには ひびかない。

## 気をつけること

- いま育てている子は「だいず」（クリームのポメラニアン、ホーム画面版）。セーブをこわす変更はしない（`CLAUDE.md` の「守ること」）。LINE版だけの変更では、ビルドの前後でホーム画面版の `index.html`・`sw.js` が同じか確かめる。
- **審査中は LINE版の画面とサーバーを変えない**（審査の人が ためしている最中に 動きが変わると困る。直すなら 審査の結果のあと）。
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
- ブラウザ：アプリ内ブラウザは LINE Developers に ログインしていない（2026-11-13）。コンソールを見るときは オーナーにログインしてもらうか、スクリーンショットをお願いする。LINE Developers・Supabase の設定を変えるのは オーナーの許可をもらってから。**シークレットが出るページ（LINE Developers の「チャネル基本設定」）は本文ごと読まない・画面全体を写さない**（`find` で ほしいところだけ読む）。
- 本物の DB に ためしの会員やセッションを `execute_sql` で書きこまない。サーバー側の通しは `line_e2e.py`（PGlite）で確かめ、本物は 読むだけ＋セッションなしの呼び出しにする。実機の確認はオーナーにお願いする。
- Edge Function のデプロイは `index.ts` を丸ごと送るので、送ったあと `get_edge_function` で中身を見て、手元と同じか確かめる（とくに正規表現の `\`）。
- 表を変える `apply_migration` は、作業環境の確認で止められることがある。止められたら、オーナーに理由を伝えて判断してもらう（回り道で DDL を流さない）。
- Supabase の無料プランは、DB の動きが1週間ほど少ないと止まる（止まる1週間ほど前にメール）。GitHub Actions「サーバーを起こす」で3日ごとに起こしている。止まっていたら MCP の `restore_project` で戻す。GitHub は 60日 リポジトリに動きがないと 予定の仕事を止める（Actions の画面で 有効にしなおす）。
- Cloudflare のビルド結果は、GitHub のコミットのチェック（「Cloudflare Pages」）で確かめられる（`gh api repos/Y-s-Apps/uchinoko-biyori/commits/<SHA>/check-runs`）。
