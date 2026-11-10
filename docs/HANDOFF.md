# 引き継ぎメモ（いまの状況）

このファイルは、チャットのいちばん最後に毎回まるごと書き直します。次のチャットは、ここを読めば続きから始められます。オーナーは、更新のたびにプロジェクトナレッジのGitHubを「同期」し、作業ごとに新しいチャットへ移ります（`CLAUDE.md` の作業の流れ 7）。

- 最終更新：2026-11-10
- リポジトリ：`Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。ホーム画面版：https://y-s-apps.github.io/uchinoko-biyori/
- ホーム画面版の公開中の版：`sw.js` のキャッシュ名 `uchinoko-df2f01ac7a`（`047f1e0` から中身は変わっていない。2026-11-07〜10 の変更も LINE版とサーバーだけ）
- Claude版：https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs は**バージョン21**（`047f1e0` の中身）。いまの main で作っても中身は同じ
- LINE版：画面は https://uchinoko-biyori.pages.dev/ （Cloudflare Pages、main の push で自動ビルド。`3e163f4` のビルドは成功）。プライバシーポリシー https://uchinoko-biyori.pages.dev/privacy.html 、利用規約 https://uchinoko-biyori.pages.dev/terms.html （2026-11-10 公開。pg_net で 200・フォームのリンク入りを確かめた）。お問い合わせフォーム https://forms.gle/aywxktpPZettxFSS7。開発用の LIFF URL は https://miniapp.line.me/2012410263-cuCI7vQS
- LINE版のサーバー：Supabase のプロジェクト「uchinoko-biyori」（`ftakgswltcavwixqxpzi`、東京、組織 `Yuthy's` の無料プラン）。Edge Function `api` は Supabase の数え方で**バージョン10**（前のチャットまで「バージョン5」と呼んでいたのは、Supabase では 9 だった）。2年で消すのが入った `186c192` の `index.ts`。`deno.json` は `game.js` をコミット `2dca6cf` に固定したまま（`game.js` は変わっていない。`build_server.py --check` で同じと確認ずみ）
- Secrets：`ANTHROPIC_API_KEY` と `LINE_CHANNEL_SECRET`（開発用の内部チャネル）は、オーナーが 2026-11-07 に入れた
- 表のマイグレーション：`app_schema`・`pg_net_for_checks`・`ai_usage`・`ai_usage_member_idx` まで本物に入っている（このチャットでは表を変えていない）
- LINE版の計画書：https://claude.ai/artifact/AgKkCkHCsWAywKGV6VFxwK

## 直近のチャットでやったこと

- **実機の確認（iPhone の LINE、Tester）：** ごはん・おやつ・あそぶで メーターが動きの おわりに動く＝OK。AIの読みとり＝OK（`app.ai_usage` が1）。サーバーは読むだけで確かめた（`/health` 200、関数の中身は手元と同じ）。
- **不具合を直した（`718e9b7`）：** LINEに子がいるときに「新しい子をむかえる」と、前の子（なかよしLvなど）に もどっていた。むかえた直後に「ひらいた」（`/act open`）が先にサーバーへ とどき、前の子のセーブが返ってきて画面が もどっていたため。引っこしシートで コードを受け取ったときも同じだった。`LineSync.pushPending` で、むかえた子（`adopt`・`/import`）を おせわより先に送るようにした。送れなかったときは つなぎなおしたときに先に送る。取りこみを ことわられたときの読みなおしが止まる（queue の中で reload を まっていた）のも直した。`line_e2e.py` に 12・12b。オーナーが実機で確かめた（「こむぎ」がなかよし0から）。
- **認証審査の準備（`aa05dca`・`186c192`）：** オーナーと決めたこと＝提供者は「Y's Apps」（プロバイダー名と同じ）／長く ひらかない人は2年で消す／問い合わせは Googleフォーム（2026-11-10 に専用メールから変更。Googleアカウントの電話番号の確認が上限になったため）／アイコンは「クリーム」。くわしくは `docs/PROJECT.md` 10章「決めたこと（2026-11-07、認証審査の準備）」「しくみ（プライバシーポリシー・利用規約・アイコン）」。
  - プライバシーポリシーと利用規約：`src/legal/privacy.html`・`terms.html`。`build.sh` が `CONTACT`（Googleフォームの URL）を入れて `out/line/` に出す。**`CONTACT` が空のあいだは ページもアプリのリンクも出さない**。2026-11-10 にフォームの URL を入れて公開した（`3e163f4`、制定日 2026年11月10日）。Anthropic のデータの扱い（初期設定で学習に使わない・30日以内に削除）は 2026-11-07 に公式ページで確かめて書いた。
  - アプリのリンク（LINE版だけ）：プロフィールの いちばん下と「AIで 読みとる？」。LINEの中では `liff.openWindow`。`CONTACT=https://forms.gle/… sh src/build.sh` で出ることを確かめた（2026-11-10 に「おといあわせ」のリンクも足した：`15a63b4`）。お問い合わせの保存期間は「対応が終わってから1年」（オーナー決定）。
  - アイコン：`src/icons/line-icon-130.png`（130×130、`render_line.py` で作る）。オーナーにはファイルをわたした。
  - サーバー：最後に ひらいてから `MEMBER_KEEP_DAYS`（既定730日、30日より短くしない）たった会員を、ログインのたびに消す。デプロイして `/health` 200・`/ai` 401・`/login`（でたらめ）401 を確かめた。
- 確認：`line_e2e.py`（ルール・サーバー・画面の通し、12・12b と サーバーの keep を足した）、`smoke.py`（ホーム・`--line --android-inset 48`・`--line --fresh`）すべてOK、ページエラー0件。ホーム画面版の `index.html`・`sw.js` は ビルドの前後で同じ。

## 保留・オーナーの判断待ち（つぎのチャットのはじめに）

1. **お問い合わせフォームの手直し（オーナーの作業）：** フォームは公開ずみ。ただ、メールアドレスの欄が2つある（「メールアドレスを収集する」の「Email」と、自分で足した「メールアドレス」）。足したほうを消してもらう。「Sign in to Google」は進み具合を保存するための任意の案内で、ログインなしで送れる。オーナーに LINEの中で ポリシー・規約・おといあわせを開いて読んでもらう（プロフィールの いちばん下）。
2. **LINE Developers に入れる（オーナーの作業。1のあと）：** LINEミニアプリチャネル →「チャネル基本設定」に プライバシーポリシーURL・サービス利用規約URL・チャネルアイコン（`src/icons/line-icon-130.png`）。チャネル説明は計画書7章の案。認証されたあとに URL やアイコンを変えると再審査。
3. **審査用・本番用の内部チャネル（前のチャットから）：** LINEミニアプリチャネルの中は 開発用・審査用・本番用の3つ（チャネルシークレットと LIFF ID も それぞれ別）。審査の前に、審査用・本番用のチャネルID（秘密ではない）を教えてもらい、Secrets の `LINE_CHANNEL_IDS` に足す（足さないと その内部チャネルの IDトークンが `badtoken`）。deauthorize も、アクセストークンを `GET /oauth2/v2.1/verify?access_token=` で確かめて `client_id` を知り、その内部チャネルのシークレットで ステートレスのトークンをもらうように直す（いまは `CHANNELS[0]` と `LINE_CHANNEL_SECRET` 1つだけ）。シークレットを複数 Secrets に入れる形（例：`LINE_CHANNEL_SECRET_<チャネルID>`）も決める。LIFF ID も内部チャネルごとに ちがうので、画面の `LINE_CFG.liffId` を どう切りかえるか（ドメインか、ビルドで分けるか）も決める。
4. **「LINEの データを けす」の実機の確認（公開の前に）：** 「こむぎ」（いまのTesterの子）が消える。消したあと `execute_sql` で `app.members` などが0件か、もう一度ひらくと「つれてくる？」が出るか。シークレットが入っているので、LINEの「設定」→「アカウント」→「連動アプリ」から うちのこ日和が消えるかも見る。
5. **アイデア（迷っている）：AIを使わないときの色ひろいを よくする。** 案A：いまのまま＝おすすめ（LINE版は AIで読める）。案B：地面らしい色を よけるように直す（ホーム画面版の `index.html` も変わり、だいずのアプリが更新される）。
- Android は未確認。
- おたすけの「週に1回」は「前回から7日」のまま（曜日区切りは希望があれば）。

## 次にやること

- 上の保留（LINE Developers に入力、内部チャネル3つの対応、けすの実機）。
- そのあと：認証審査の申請（チャネル説明、審査用の補足）、うちのこカード、公式アカウント、ほかの端末の写真立て（写真がないときにイラストを出す）。
- **公開の前に：** 試しの会員とセーブ（「こむぎ」も）を消してから（「LINEの データを けす」でも消せる）、だいずを引っこしコードで取りこむ（取りこみは1人1回）。

## 気をつけること

- いま育てている子は「だいず」（クリームのポメラニアン、ホーム画面版）。セーブをこわす変更はしない（`CLAUDE.md` の「守ること」）。LINE版だけの変更では、ビルドの前後でホーム画面版の `index.html`・`sw.js` が同じか確かめる。
- ポリシーに書いたこと（取る情報・送り先・保存期間・外部サービス・回数の上限）を変えたら、`src/legal/` も同じコミットで直す（`CLAUDE.md`）。
- ルールの時刻・日付・偶然は `Clock` だけ。ルールや `js_onboard.js` の `buildPrompt`/`parseAI` を変えたらサーバーも作り直す（`build_server.py` → push → `--pin` → デプロイ）。`game.js` が変わらないときは、`deno.json` の固定はそのままでよい（`--check` で確かめる）。
- LINE版のサーバーは、おせわの数字を画面から受けとらない。AIの返事は `parseAI()` を通した形だけを画面にわたす。写真・AIの返事・トークンはログに出さない。
- LINE版の画面で、サーバーへ送るものは `LineSync.queue` で1つずつ。queue の中から queue を使う処理（`reload` など）を まつと止まるので、またない。むかえた子は `pushPending` で おせわより先に。
- 端末のキー `line-owner`・`line-guest`・`line-left` は消さない。やめたあとは `LineServer.call` が つながない（新しい会員を作らない）。また開けば ふつうにログインする。
- `index.html` は CSP のハッシュつきなので、手で直さず `sh src/build.sh` で作る。
- 組織 Y-s-Apps のほかの Pages サイトとは、セーブとキャッシュを共有する。LINE版は `y-s-apps.github.io` に置かない。
- LIFF SDK は v2.20.0〜v2.31.0 に脆弱性があり、2026-11-24ごろ利用制限の予定。エッジパスのまま使う。
- このセッションの外への通信は、パッケージの置き場と GitHub だけ。`*.pages.dev`・`*.github.io`・`supabase.co`・LINE・Anthropic には直接届かない。本物のサーバーは `execute_sql` から pg_net（`net.http_get` / `net.http_post`、返事は `net._http_response`）で確かめる。ウェブのページは WebSearch のあとの WebFetch で読む（URL を直接 WebFetch すると、オーナーの許可待ちで止まることがある）。
- 本物の DB に ためしの会員やセッションを `execute_sql` で書きこまない。サーバー側の通しは `line_e2e.py`（PGlite）で確かめ、本物は 読むだけ＋セッションなしの呼び出しにする。実機の確認はオーナーにお願いする。
- Edge Function のデプロイは `index.ts` を丸ごと送るので、送ったあと `get_edge_function` で中身を見て、手元と同じか確かめる（とくに正規表現の `\`）。
- 表を変える `apply_migration` は、作業環境の確認で止められることがある。止められたら、オーナーに理由を伝えて判断してもらう（回り道で DDL を流さない）。
- Supabase の無料プランは、使われない日が1週間ほど続くとプロジェクトが止まる。止まっていたら MCP の `restore_project` で戻す。
- Cloudflare のビルド結果は、GitHub のコミットのチェック（「Cloudflare Pages」）で確かめられる。
