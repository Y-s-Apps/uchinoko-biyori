# リリース前の診断とレビュー（約束①）：Claude Fable 5.2 のチャットに貼るプロンプト

2026-11-13 にソーイが作成。モデルを **Claude Fable 5.2** にした新しいチャット（プロジェクト「uchinoko-biyori」の中）に、下の「ここから」〜「ここまで」をそのまま貼ります。

---ここから---

うちのこ日和の LINE版を リリース（未認証のまま公開）する直前の、**セキュリティを含めた 全体の診断とレビュー**をお願いします（オーナーとの約束①。CLAUDE.md の「オーナーとの約束」）。アプリは「完成」の中身が そろったところで、診断で 直すことが見つかったら 直してから リリースします。

## はじめに
1. GitHub の `Y-s-Apps/uchinoko-biyori` を push できる形でつなぎ、`CLAUDE.md`・`docs/PROJECT.md`（とくに 6章「安全のための決まり」と 10章 LINE版）・`docs/HANDOFF.md` を読んでください。ナレッジと GitHub がちがうときは GitHub を優先します。
2. ついでに、`docs/HANDOFF.md` の保留1（GitHub Actions「サーバーを起こす」の 予定の実行が 2026-11-14 3:23 ごろ 動いたか）も確かめて、結果を一言ください。

## 見てほしい範囲
- **3つの版の画面と `src/`**：ホーム画面版（GitHub Pages、`*.github.io` を組織のほかのサイトと共有）・Claude版（アーティファクト）・LINE版（Cloudflare Pages の `/`・`/review/`・`/dev/`）。`esc()` と `safePhoto()` の通し方、`innerHTML` に入るもの、`softName()`、外から来るデータ（セーブ・引っこしコード・AIの返事・サーバーの返事）の扱い、Service Worker（`sw.js`）。
- **CSP**：`src/home_head.html`（スクリプトのハッシュは `build.sh` が入れる）、`src/line_head.html`（LIFF SDK はエッジパス、`connect-src`・`img-src`・`frame-src`）。
- **サーバー `supabase/`**：`functions/api/index.ts` の 本人確認（IDトークンを LINE で検証、3つの内部チャネル）・自前のセッション（トークンは画面のメモリだけ、DB はハッシュ）・`/act`・`/save`・`/import`（1人1回）・`/read`（AI）・`/leave`（すぐ消す＋deauthorize）・`/card` と Storage の公開バケット `cards`（PNG の確かめと作り直し、名前、1人1日3まい、1年・やめたとき・2年ひらかない会員の画像の消し方）、2年ひらかない会員の削除、ログに出すもの。`game.js` は `tools/build_server.py` が src/ から作る（手で直さない）。
- **DB の権限と RLS**：`supabase/migrations/`、`app` スキーマが Data API に出ていないこと、anon・authenticated に権限がないこと、`storage.objects` のポリシー。
- **Secrets の扱い**：`ANTHROPIC_API_KEY`・`LINE_CHANNEL_SECRET`・`LINE_CHANNEL_SECRET_<チャネルID>`、`SUPABASE_SECRET_KEYS`（中身は読まない・チャットに出さない）。
- **AIへの送り方と回数の上限**：端末で 768px にしてから送る、保存・ログなし、1人1日3回・全員で1日300回・月の予算、返事の確かめ（`parseAI`）。
- **引っこしコードとセーブの移行**：`readMoveCode`・`decodeMovePayload`・`ensureState`・`carryExtras`、保存キー、ひかえ（backup・broken）、LINE版の端末のキー（line-owner・line-guest・line-left）。
- **プライバシーポリシーと利用規約**（`src/legal/`）が いまの動き（取る情報・送り先・保存期間・外部サービス・回数の上限・カードの絵）と あっているか。
- **`.github/workflows/`**（「サーバーを起こす」：権限・外の Action を使っていないか）。
- そのほか気づいたこと（LINE の決まり＝LINEミニアプリポリシー・カスタムシェアメッセージ、ドメイン共有、依存しているもの）。

## すすめかた
- まずは **読んで しらべるだけ**（コードを変えない・push しない）。本物の DB には書きこまない（`execute_sql` は 読むだけ。ためしの会員やセッションを作らない）。Supabase の MCP は `get_advisors`・`list_tables`・`get_edge_function`・`get_logs` などの 読むものを使ってよい。公開中のページは `execute_sql` から pg_net（`net.http_get`）で 読める（作業環境の外への通信は GitHub とパッケージの置き場だけ）。
- シークレットが見えるページや 値は 読まない・写さない。
- 見つけたことは **一覧**にしてください：重さ（高・中・低・情報）／場所（ファイルと行）／なにが起きうるか／直し方の案／リリースの前に直すべきか。よいところ（守れていること）も短く。長くなるなら Claude Docs のドキュメントにまとめてください。
- 一覧を見せたら、**どれを直すか オーナーに聞いてから** 直します。直すときは CLAUDE.md の「作業の流れ」と「守ること」どおり（`src/` を直す → `sh src/build.sh` → `smoke.py`・`linebreak.py`・`line_e2e.py`・必要なら `compare_home.py` → 日本語のコミットで main に push。サーバーを変えるときは `build_server.py` → push → `--pin` → デプロイ → `--check` → pg_net で確かめる）。見た目や文言が変わるときは 見本を見せてから。
- 終わったら、CLAUDE.md の「オーナーとの約束」の ① と `docs/PROJECT.md` 10章「決めたこと（2026-11-13、リリースと認証の順番）」に「済み」と書き、`docs/HANDOFF.md` を書き直して、「完了」と 次のチャット用のプロンプト（リリース＝`docs/HANDOFF.md` の「公開の日」へ）をください。

---ここまで---
