# 引き継ぎメモ（いまの状況）

このファイルは、チャットのいちばん最後に毎回まるごと書き直します。次のチャットは、ここを読めば続きから始められます。オーナーは、更新のたびにプロジェクトナレッジのGitHubを「同期」し、作業ごとに新しいチャットへ移ります（`CLAUDE.md` の作業の流れ 7）。

- 最終更新：2026-11-13（7回目）
- リポジトリ：`Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。ホーム画面版：https://y-s-apps.github.io/uchinoko-biyori/
- ホーム画面版の公開中の版：`sw.js` のキャッシュ名 **`uchinoko-e98616883d`**（2026-11-13、改行の きまり。`a7c7824`。pg_net で 公開中の `index.html`・`sw.js` の md5 が 手元と同じことを確かめた）
- Claude版：https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs は**バージョン22**（`a7c7824` の中身。`capabilities` は 引きついだ）。公開するときは `src/out/uchinoko-claude.html` の前に いまの版と同じ1行目（`<!doctype html><html><head><meta charset=utf8>…<body>`）を、うしろに `</body></html>` を つけて `publish_files`（このチャットでは `/home/claude/work/claude-page/index.html` に作った）
- LINE版の画面：Cloudflare Pages（main の push で自動ビルド。`a7c7824` で pg_net で `/`・`/dev/`・`/review/` の md5 が 手元の `src/out/line/index.html` と同じ＝`8bd5ccd9…`）
  - 本番用 https://uchinoko-biyori.pages.dev/ 、審査用 https://uchinoko-biyori.pages.dev/review/ 、開発用 https://uchinoko-biyori.pages.dev/dev/ （同じページ。ひらいた場所で LIFF ID をえらぶ）
  - LIFF URL：開発用 https://miniapp.line.me/2012410263-cuCI7vQS ／審査用 https://miniapp.line.me/2012410264-JD4WhzAb （審査担当者だけ）／本番用 https://miniapp.line.me/2012410265-PutgsCLS （未認証なので URL を知っている人は開ける）
  - チャネルID：開発用 `2012410263`・審査用 `2012410264`・本番用 `2012410265`
  - プライバシーポリシー https://uchinoko-biyori.pages.dev/privacy.html 、利用規約 https://uchinoko-biyori.pages.dev/terms.html （どちらも 2026-11-13 改定）、お問い合わせフォーム https://forms.gle/aywxktpPZettxFSS7
- LINE版のサーバー：Supabase のプロジェクト「uchinoko-biyori」（`ftakgswltcavwixqxpzi`、東京、組織 `Yuthy's` の無料プラン）。Edge Function `api` は **MCP の version 16**（`30b3c99` の `index.ts`。このチャットでも変えていない）。`deno.json` は `game.js` をコミット `2dca6cf` に固定したまま（`--check` で同じ。改行の直しは `game.js` に入らない画面の文だけ）
- Storage：バケット `cards`（公開・PNG だけ・2MB まで、ポリシーなし）
- サーバーを起こす：GitHub Actions「サーバーを起こす」（`.github/workflows/keepalive.yml`、active）。cron `23 18 */3 * *`＝日本時間 3:23 ごろ。手で動かした回（2026-11-13 11:06）は成功。**予定の実行は まだ来ていない**（このチャットの はじめ 11/13 13:48 に確かめた。はじめては 2026-11-14 3:23 ごろ）
- Secrets：`ANTHROPIC_API_KEY`・`LINE_CHANNEL_SECRET`（開発用）・`LINE_CHANNEL_SECRET_2012410264`（審査用）・`LINE_CHANNEL_SECRET_2012410265`（本番用）
- 本物の DB：会員・カードなどは 2026-11-13 13:30ごろ **0件**（このチャットでは 本物の DB に書いていない。pg_net で 公開中のページを読んだだけ）
- LINE Developers：Scope は `openid` だけ。「シェアターゲットピッカー」は 有効（2026-11-13）。認証審査は まだ申請しない（未認証でリリース → 個人事業主 → 申請）
- LINE版の計画書：https://claude.ai/artifact/AgKkCkHCsWAywKGV6VFxwK （Claude Docs。2026-11-13 に 3章「推奨」・4章「進める順番」・9章を いまの決めごとに あわせた）

## 直近のチャットでやったこと（2026-11-13、7回目）

- 「サーバーを起こす」の予定の実行：まだ来ていなかった（はじめては 11/14 3:23 ごろ）。
- **改行の きまりを 画面ぜんたいに（済み、`a7c7824`。直す前と後の見本を見て オーナー決定）：**
  - `head.html` の `body` に `word-break:keep-all; overflow-wrap:anywhere`（LINE版だけの `.cardprev p,.toast` は まとめて消した）。
  - はじめての画面・引っこし・おねがい・おたすけ・イベント・プロフィール・LINE版の ことわり書き などの文に 文節の スペース（意味は かえない。ボタンの文言は 変えていない＝補足資料と あう）。
  - タイルの名前は `softName()`（`js_app.js`）で `<wbr>`（ひらがな→カタカナ・「の」のあと・「ちいさな」のあと・`SOFT_WORDS`）。データ・サーバーは 変えない。正規表現の中の文字は `\u` で書いた（Claude版を 文字コードなしで ひらくと 正規表現が こわれて 全部 止まるため）。
  - トーストは `width:max-content`（前は おへやの はば半分に おしこまれていた）。イベントの「プレゼント」の行を `<span>` に まとめた。
  - 新しい道具 `tools/linebreak.py`（375・390px、ホーム画面版194場面・LINE版214場面・`--claude`）と `tools/webfonts.py`・`tools/fonts/`（Zen Maru Gothic・Mochiy Pop One を @fontsource から）。ことばの まんなかの改行：ホーム画面版126・LINE版153 → 3つの版とも0。
  - `smoke.py`・`smoke.py --line --android-inset 48` エラー0、`line_e2e.py` 86項目ぜんぶ通った（文言の かわった2つの確かめを直した）、`compare_home.py` おなじ、`build_server.py --check` 同じ。
- **補足資料の文に うちのこカードの手順（7）を足した**（「けす」は 8、カードの絵も消える。オーナー決定）。**計画書の順番を いまの決めごとに**（うちのこカードは リリースの前・認証審査は 個人事業主に なってから。提案を見せて オーナーが OK → 受け入れた）。
- **完成**（LINE版の「完成」の中身が そろった）→ **約束①を オーナーに伝え、Fable 5.2 のチャットに貼るプロンプトを `docs/REVIEW_PROMPT.md` に作った**（診断は これから）。

## 保留・オーナーの判断待ち（つぎのチャットのはじめに）

1. **「サーバーを起こす」の予定の実行が動いたか**（2026-11-14 3:23 ごろ より あと）：`gh api 'repos/Y-s-Apps/uchinoko-biyori/actions/runs?per_page=10'` で `event` が `schedule` の回を見る。成功なら ログに `health: 200` と `db: 401 {"error":"nosession"}`。失敗なら Supabase が止まっていないか `get_project`（止まっていたら `restore_project`）。
2. **約束①：Claude Fable 5.2 の診断とレビュー**（モデルを Fable 5.2 にした 新しいチャットで、`docs/REVIEW_PROMPT.md` の「ここから」〜「ここまで」を貼る）。セキュリティ・不具合・UI・速さ・運用・決まりと書類・保守の ぜんぶを 段階0〜6で。まず読んで一覧にするだけ → どれを直すか・どのチャットで直すか オーナーが決める → 直す。終わったら `CLAUDE.md` の約束① と PROJECT.md 10章に「済み」。
   - **オーナーは Claude Pro。** Fable は ふだん 使用量クレジット（従量）だが、発売記念で **日本時間 11/17（火）16:59 まで** 週の上限の50%まで 追加の料金なし（＋Fable の上限リセット1回）。それまでに 診断を終える。直すのは いつもの Opus 5.5 のチャットが おすすめ。段階ごとの エフォートの目安は `docs/REVIEW_PROMPT.md` の表（サーバー・画面の守り・不具合は High、ほかは Medium、Extra high・Max は使わない）。
3. **直したら リリース**（未認証のまま。下の「公開の日」）。
4. **リリースしたら：約束②（個人事業主の申請のための別プロジェクトのプロンプト）を ソーイから伝える。**
- おたすけ：ホーム画面版は1日おき（2026-11-12）。Claude版・LINE版は「前回から7日」のまま。

## 次にやること

- 上の保留（予定の実行の確認 → 約束①の診断 → 直す → リリース → 約束② → 個人事業主 → 認証審査の申請）。
- 認証審査を申請したら：審査は1〜2週間、「審査中」は取り消しも変更も できない（画面とサーバーも変えない）。認証されたら：「検索可能にする」は 承認から30日以内に押す。
- 認証のあと：公式アカウント（友だち追加）、ほかのアイデア。
- **公開の日：** オーナーの iPhone の LINE には ためしの子「こむぎ」が ゲストとして のこっているので、本番用の LIFF URL を LINE で ひらいて「こむぎを LINEに つれてくる？」が出たら**「やめておく」**→ はじめての画面の「引っこしコード」で だいずを取りこむ（取りこみは1人1回）。ホーム画面版で「引っこし・バックアップ」→「ファイルで保存」の控えも とっておく。開発用・審査用・本番用は 同じサーバーと DB。ためしで作った会員・カードの画像は、公開の前に けす（`app.cards` と Storage の `cards` が0件か確かめる）。公開の日に、本番用で「うちのこカードを おくる」が出るかも だいずで見る。
  - だいずは LINE版へ引っこすと、おたすけが 1日おき → 7日に1回 になる（オーナー了承）。
  - できれば、テスターでない人（家族など）の LINE で 本番用の LIFF URL が ひらけるか 見てもらう。

## 気をつけること

- **改行と見た目：** 画面ぜんたいが `keep-all＋anywhere`。新しい文にも 文節の スペースを入れ、`tools/linebreak.py`（`--line`）で 0件か、スマホ幅のスクリーンショットで 目で確かめてから push。せまいところの名前は `softName()`、カタカナの長い名前を足したら `SOFT_WORDS`。`linebreak.py` の フォントは `cd tools/fonts && npm install`。
- いま育てている子は「だいず」（クリームのポメラニアン、ホーム画面版）。セーブをこわす変更はしない。LINE版だけの変更では、ビルドの前後でホーム画面版の `index.html`・`sw.js` が同じか確かめる（`md5sum`。いまは `e73a5d48…`・`8b807216…`）。
- 正規表現に 日本語の文字を そのまま書かない（`ぁ` のように）。Claude版を 文字コードなしで ひらくと、正規表現が こわれて スクリプトが まるごと止まる。
- `js_line.js` は `js_onboard.js` の boot の**あと**に読まれる。`renderHeader` などを包むときは、包んだあとに いまの画面にも1回あてる。
- **うちのこカードのメッセージは LINE の「カスタムシェアメッセージ」の決まり**（標準タイプ。バブル1つ、アクションは ボタンと下の行だけ、決まりに書いていない プロパティは 変えない、下の行の矢印の画像は 変えない）。本文を変えるときは https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/ を見なおす。ボタンと矢印は 本番用の LIFF URL。
- カードの絵の中では ページの CSS が効かない（表情は SVG の中の `<style>`）。サーバーの画像は 画面に出していない（CSP の `img-src` に supabase.co は ない。出すなら足す）。
- 補足資料の文（PROJECT.md 10章）に出てくる 画面の文言（「写真からむかえる」…「うちのこカードを おくる」「おくる」「LINEの データを けす」）を変えたら、補足資料も直す。
- **（あとで）認証審査を申請したら、審査中は LINE版の画面とサーバーを変えない**。
- LINE版の画面は3か所（`/`・`/review/`・`/dev/`）とも同じファイル。ページの中から ほかのファイルを読むときは、いちばん上からのパスにする。
- Scope は `openid` だけ。`shareTargetPicker` は Scope が いらない。
- 認証されたあとに 本番用の エンドポイントURL・ポリシーと規約の URL・アイコン・チャネル名・説明・多言語対応・Scope・友だち追加オプション・シェアターゲットピッカーを変えると再審査。
- ポリシーに書いたこと（取る情報・送り先・保存期間・外部サービス・回数の上限）を変えたら、`src/legal/` も同じコミットで直す。
- ルールの時刻・日付・偶然は `Clock` だけ。ルールや `buildPrompt`/`parseAI` を変えたらサーバーも作り直す（`build_server.py` → push → `--pin` → デプロイ）。`game.js` が変わらないときは、`deno.json` の固定はそのままでよい（`--check`）。
- LINE版のサーバーは、おせわの数字を画面から受けとらない。写真・AIの返事・トークン・カードの画像の中身はログに出さない。
- LINE版の画面で、サーバーへ送るものは `LineSync.queue` で1つずつ（queue の中から queue を使う処理を またない）。カードの `POST /card` は queue に入れない（`LineServer.call` を直接）。
- 端末のキー `line-owner`・`line-guest`・`line-left` は消さない。
- `index.html` は CSP のハッシュつきなので、手で直さず `sh src/build.sh` で作る。
- 組織 Y-s-Apps のほかの Pages サイトとは、セーブとキャッシュを共有する。LINE版は `y-s-apps.github.io` に置かない。
- LIFF SDK は v2.20.0〜v2.31.0 に脆弱性があり、2026-11-24ごろ利用制限の予定。エッジパスのまま使う。
- このセッションの外への通信は、パッケージの置き場と GitHub だけ（Playwright の WebKit も 入れられない）。本物のサーバーと画面は `execute_sql` から pg_net（`net.http_get` / `net.http_post`、返事は `net._http_response`。PNG を読むときは `content` を文字にしない）で確かめる。
- **Supabase の `apply_migration` と `deploy_edge_function` は、作業環境の確認で止められることがある**。止められたら、オーナーに理由と中身を伝えて「もう一度ためしてよいか」を聞く。
- Edge Function のデプロイは `index.ts` を丸ごと送るので、送ったあと `get_edge_function` で中身を見て、手元と同じか確かめる。
- ブラウザ：アプリ内ブラウザは LINE Developers に ログインしていない。LINE Developers・Supabase の設定を変えるのは オーナーの許可をもらってから。**シークレットが出るページ（「チャネル基本設定」）は本文ごと読まない・画面全体を写さない**。
- 本物の DB に ためしの会員やセッションを `execute_sql` で書きこまない。実機の確認はオーナーにお願いする。
- Supabase の無料プランは、DB の動きが1週間ほど少ないと止まる（「サーバーを起こす」で3日ごと）。止まっていたら `restore_project`。Storage の無料の枠は 1GB。
- Cloudflare のビルド結果は `gh api repos/Y-s-Apps/uchinoko-biyori/commits/<SHA>/check-runs`。
