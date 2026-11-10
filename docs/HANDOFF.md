# 引き継ぎメモ（いまの状況）

このファイルは、チャットのいちばん最後に毎回まるごと書き直します。次のチャットは、ここを読めば続きから始められます。オーナーは、更新のたびにプロジェクトナレッジのGitHubを「同期」し、作業ごとに新しいチャットへ移ります（`CLAUDE.md` の作業の流れ 7）。

- 最終更新：2026-11-11
- リポジトリ：`Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。ホーム画面版：https://y-s-apps.github.io/uchinoko-biyori/
- ホーム画面版の公開中の版：`sw.js` のキャッシュ名 `uchinoko-df2f01ac7a`（`047f1e0` から中身は変わっていない。2026-11-07〜11 の変更も LINE版とサーバーだけ）
- Claude版：https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs は**バージョン21**（`047f1e0` の中身）。いまの main で作っても中身は同じ
- LINE版の画面：Cloudflare Pages（main の push で自動ビルド。`23cfaa3` のビルドは成功、3か所とも手元のビルドと同じ md5 を pg_net で確かめた）
  - 本番用 https://uchinoko-biyori.pages.dev/ 、審査用 https://uchinoko-biyori.pages.dev/review/ 、開発用 https://uchinoko-biyori.pages.dev/dev/ （同じページ。ひらいた場所で LIFF ID をえらぶ）
  - LIFF URL：開発用 https://miniapp.line.me/2012410263-cuCI7vQS ／審査用 https://miniapp.line.me/2012410264-JD4WhzAb （審査担当者だけ）／本番用 https://miniapp.line.me/2012410265-PutgsCLS （未認証なので URL を知っている人は開ける）
  - チャネルID：開発用 `2012410263`・審査用 `2012410264`・本番用 `2012410265`
  - プライバシーポリシー https://uchinoko-biyori.pages.dev/privacy.html 、利用規約 https://uchinoko-biyori.pages.dev/terms.html 、お問い合わせフォーム https://forms.gle/aywxktpPZettxFSS7
- LINE版のサーバー：Supabase のプロジェクト「uchinoko-biyori」（`ftakgswltcavwixqxpzi`、東京、組織 `Yuthy's` の無料プラン）。Edge Function `api` は Supabase の数え方で**バージョン11**（`23cfaa3` の `index.ts`。2026-11-11 にデプロイ、`get_edge_function` で中身を見て、pg_net で `/health` 200・でたらめの `/login`（本番用の aud）401・セッションなしの `/leave` 401 を確かめた）。`deno.json` は `game.js` をコミット `2dca6cf` に固定したまま（`game.js` は変わっていない。`build_server.py --check` で同じ）
- Secrets：`ANTHROPIC_API_KEY` と `LINE_CHANNEL_SECRET`（開発用。2026-11-07 にオーナーが入れた）。**審査用・本番用のシークレットはまだ**（下の保留1）
- 表のマイグレーション：`app_schema`・`pg_net_for_checks`・`ai_usage`・`ai_usage_member_idx` まで本物に入っている（このチャットでは表を変えていない）
- LINE版の計画書：https://claude.ai/artifact/AgKkCkHCsWAywKGV6VFxwK

## 直近のチャットでやったこと

- **審査用・本番用の内部チャネルに対応（`23cfaa3`）：** オーナーと決めたこと＝画面は**パスで分ける**（本番用＝いちばん上、審査用＝`/review/`、開発用＝`/dev/`）／シークレットは **`LINE_CHANNEL_SECRET_<チャネルID>`**（開発用は いまの `LINE_CHANNEL_SECRET` でもよい）。くわしくは `docs/PROJECT.md` 10章「決めたこと（2026-11-11、内部チャネル）」「しくみ（内部チャネル）」。
  - 画面（`js_line.js`）：`LINE_CFG.liffIds` に3つの LIFF ID、`LINE_CH`（`prod`・`review`・`dev`）で えらぶ。`<html data-line-ch>`。開発用の画面だけ プロフィールの1行の前に「［開発用］」。ポリシー・規約のリンクと favicon は いちばん上のもの。`build.sh` が `out/line/review/`・`out/line/dev/` に同じ `index.html` をコピー。
  - サーバー（`index.ts`）：`CHANNELS` の既定を3つに（数字だけ通す）。やめる人の取り消しは、アクセストークンを `GET /oauth2/v2.1/verify?access_token=` で確かめて `client_id` を知り、その内部チャネルのシークレットで。シークレットがない内部チャネルは `nosecret`（ほかのシークレットで代わりにしない）、ほかのチャネルのトークンは `failed`、切れたトークンは `already`。
  - LINE Developers の エンドポイントURL：開発用＝`…/dev/`・審査用＝`…/review/`・本番用＝`…/`（オーナーの許可で、ソーイがアプリ内ブラウザから入れ、読みなおして確かめた）。
  - 確認：`line_e2e.py`（13：3か所で それぞれの LIFF ID・同じ会員の子・「［開発用］」・ポリシーと favicon は いちばん上）、`api_test.ts`（審査用・本番用の IDトークンが通り同じ会員、となりの番号 `2012410266` は通らない、内部チャネルごとのシークレット）、`smoke.py`（ホーム・`--line --android-inset 48`・`--line --fresh`）、`compare_home.py` すべてOK、ページエラー0件。ホーム画面版の `index.html`・`sw.js` は ビルドの前後で同じ。
- **気づいたこと（LINE Developers の画面）：** チャネル説明・ポリシーと規約の URL・アイコンは入っていた。審査の申請には「多言語対応」で英語のチャネル名と説明が要る。「会社・事業者の所在国・地域」が未設定。「Scope」が `openid, profile`。
- **ごめんなさい：** 「チャネル基本設定」のページの文字を読みとったとき、チャネルシークレット3つが そのまま表示されていて ソーイにも見えた（どこにも書いていない・使っていない）。念のため3つとも「発行」で新しくしてから Secrets に入れてもらう（保留1）。**次から「チャネル基本設定」のページは `get_page_text` で読まない**（`find` で ほしいところだけ読む）。

## 保留・オーナーの判断待ち（つぎのチャットのはじめに）

1. **シークレットを新しくして Secrets に入れる（オーナーの作業）：** LINE Developers →「チャネル基本設定」→「チャネルシークレット」の 開発用・審査用・本番用を それぞれ「発行」で新しくする → Supabase の画面（プロジェクト uchinoko-biyori → Edge Functions → Secrets）で、`LINE_CHANNEL_SECRET`（開発用の新しいもの に入れかえ）・`LINE_CHANNEL_SECRET_2012410264`（審査用）・`LINE_CHANNEL_SECRET_2012410265`（本番用）。チャットには貼らない。入れたら、ソーイは名前だけ確かめる（値は見ない）。
2. **実機の確認（iPhone の LINE、Tester）：** 開発用の LIFF URL で プロフィールの1行が「［開発用］LINEと つながっています」になるか。本番用の LIFF URL（https://miniapp.line.me/2012410265-PutgsCLS ）で、同じ子（「こむぎ」）が出て、「［開発用］」が出ないか（はじめて ひらくと LINE の同意画面が出るはず）。審査用は審査担当者しか開けない。
3. **「LINEの データを けす」の実機の確認（公開の前に。1のあと）：** 「こむぎ」が消える。消したあと `execute_sql` で `app.members` などが0件か、もう一度ひらくと「つれてくる？」が出るか。LINEの「設定」→「アカウント」→「連動アプリ」から うちのこ日和が消えるかも見る（開発用・本番用の どちらで けしたかで、使うシークレットが変わる）。
4. **審査の申請の前に決めること：** 「Scope」を `openid` だけにするか（いまは名前・アイコンを使わない。友だち機能を足すときに `profile` を足す、が計画書の方針）。英語のチャネル名と説明（案を作る）。「会社・事業者の所在国・地域」（日本）。
5. **アイデア（迷っている）：AIを使わないときの色ひろいを よくする。** 案A：いまのまま＝おすすめ（LINE版は AIで読める）。案B：地面らしい色を よけるように直す（ホーム画面版の `index.html` も変わり、だいずのアプリが更新される）。
- Android は未確認。
- おたすけの「週に1回」は「前回から7日」のまま（曜日区切りは希望があれば）。

## 次にやること

- 上の保留（シークレット、実機の確認、けすの実機、審査の前に決めること）。
- そのあと：認証審査の申請（チャネル説明、英語、審査用の補足資料・テストの手順）、うちのこカード、公式アカウント、ほかの端末の写真立て（写真がないときにイラストを出す）。
- **公開の前に：** 試しの会員とセーブ（「こむぎ」も）を消してから（「LINEの データを けす」でも消せる）、だいずを引っこしコードで取りこむ（取りこみは1人1回）。開発用・審査用・本番用は 同じサーバーと DB なので、どこで消しても同じ。

## 気をつけること

- いま育てている子は「だいず」（クリームのポメラニアン、ホーム画面版）。セーブをこわす変更はしない（`CLAUDE.md` の「守ること」）。LINE版だけの変更では、ビルドの前後でホーム画面版の `index.html`・`sw.js` が同じか確かめる。
- LINE版の画面は3か所（`/`・`/review/`・`/dev/`）とも同じファイル。ページの中から ほかのファイルを読むときは、いちばん上からのパス（`/privacy.html` など）にする（相対パスだと `/dev/privacy.html` になる）。
- 認証されたあとに 本番用の エンドポイントURL・ポリシーと規約の URL・アイコン・チャネル名・説明・Scope を変えると再審査。開発用・審査用の エンドポイントURL は自由に変えられる。
- ポリシーに書いたこと（取る情報・送り先・保存期間・外部サービス・回数の上限）を変えたら、`src/legal/` も同じコミットで直す（`CLAUDE.md`）。
- ルールの時刻・日付・偶然は `Clock` だけ。ルールや `js_onboard.js` の `buildPrompt`/`parseAI` を変えたらサーバーも作り直す（`build_server.py` → push → `--pin` → デプロイ）。`game.js` が変わらないときは、`deno.json` の固定はそのままでよい（`--check` で確かめる）。
- LINE版のサーバーは、おせわの数字を画面から受けとらない。AIの返事は `parseAI()` を通した形だけを画面にわたす。写真・AIの返事・トークンはログに出さない。
- LINE版の画面で、サーバーへ送るものは `LineSync.queue` で1つずつ。queue の中から queue を使う処理（`reload` など）を まつと止まるので、またない。むかえた子は `pushPending` で おせわより先に。
- 端末のキー `line-owner`・`line-guest`・`line-left` は消さない。やめたあとは `LineServer.call` が つながない（新しい会員を作らない）。また開けば ふつうにログインする。
- `index.html` は CSP のハッシュつきなので、手で直さず `sh src/build.sh` で作る。
- 組織 Y-s-Apps のほかの Pages サイトとは、セーブとキャッシュを共有する。LINE版は `y-s-apps.github.io` に置かない。
- LIFF SDK は v2.20.0〜v2.31.0 に脆弱性があり、2026-11-24ごろ利用制限の予定。エッジパスのまま使う。
- このセッションの外への通信は、パッケージの置き場と GitHub だけ。`*.pages.dev`・`*.github.io`・`supabase.co`・LINE・Anthropic には直接届かない。本物のサーバーと画面は `execute_sql` から pg_net（`net.http_get` / `net.http_post`、返事は `net._http_response`）で確かめる。ウェブのページは WebSearch のあとの WebFetch で読む（URL を直接 WebFetch すると、オーナーの許可待ちで止まることがある）。
- LINE Developers は、オーナーが アプリ内ブラウザで ログインすると読める（2026-11-11）。設定を変えるのは オーナーの許可をもらってから。シークレットが出るページは本文ごと読まない。
- 本物の DB に ためしの会員やセッションを `execute_sql` で書きこまない。サーバー側の通しは `line_e2e.py`（PGlite）で確かめ、本物は 読むだけ＋セッションなしの呼び出しにする。実機の確認はオーナーにお願いする。
- Edge Function のデプロイは `index.ts` を丸ごと送るので、送ったあと `get_edge_function` で中身を見て、手元と同じか確かめる（とくに正規表現の `\`）。
- 表を変える `apply_migration` は、作業環境の確認で止められることがある。止められたら、オーナーに理由を伝えて判断してもらう（回り道で DDL を流さない）。
- Supabase の無料プランは、使われない日が1週間ほど続くとプロジェクトが止まる。止まっていたら MCP の `restore_project` で戻す。
- Cloudflare のビルド結果は、GitHub のコミットのチェック（「Cloudflare Pages」）で確かめられる。
