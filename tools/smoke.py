#!/usr/bin/env python3
"""うちのこ日和：スマホ幅での動作確認。

リポジトリのルート（ビルド済みの index.html）をローカルで配信し、iPhone 相当の画面（390x844）で
主要な画面を順に開いて、スクリーンショットとページエラーを集めます。

  python3 tools/smoke.py            # サンプルの子（ポメラニアン、Lv20前後）で確認
  python3 tools/smoke.py --fresh    # はじめて開いたとき（オンボーディング）を確認
  python3 tools/smoke.py --out DIR  # スクリーンショットの保存先（既定：smoke-out/）
  python3 tools/smoke.py --line     # LINE版（src/out/line/）を確認。LIFF SDK は読みこめない前提（ゲストで動くか）
  python3 tools/smoke.py --line --android-inset 48
                                    # Android版LINEの edge-to-edge（下のナビゲーションバー48px）をまねる
  python3 tools/smoke.py --dark     # ダークモードで（--line・--fresh と いっしょにも使える）
  python3 tools/smoke.py --claude   # Claude版（src/out/claude/＝アーティファクトに 出す 形）：クラウドの セーブの まねで、はじめての画面の
                                    # とちゅうに クラウドの子が 届いたとき（診断 3-7）と、うちのこラン（P5：レースの こうえん・アジリティの バランス →
                                    # ほうび・ベストが クラウドの セーブに 入る・ひらきなおしても・はじめての 端末でも のこる）
  python3 tools/smoke.py --size 375x667   # ちがう 大きさの 画面で（既定は 390x844。パズルの 画面が スクロールなしで 入るかも 見る）

見た目の確かめ（どの画面でも）：文字と地の色の差（ふつうの文字 4.5・大きい文字 3 より小さい）、11px より小さい文字、
シートの「とじる」の さわれる所（44px より小さい）を数える（診断 4-1・4-2・4-4）。ホーム画面版では、Service Worker が
自分のキャッシュだけを見るか（組織の ほかのアプリが 同じ URL を とっていても、オフラインで うちのこ日和が ひらく。診断 2-4）、
右上の ボタンの名前が むかえた日だけ 出るか（診断 4-5）も見る。

必要なもの：pip install playwright（Chromium はインストール済みのものを使います）
ページエラーか CSP の違反が1件でもあれば終了コード1で終わります。
"""
import argparse, asyncio, functools, http.server, json, os, socketserver, threading, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HOME_ORIGIN = 'https://y-s-apps.github.io/uchinoko-biyori/'
# ブラウザを うしろで 動かす ときも 3D（WebGL 2）が 動く ように（うちのこラン。SwiftShader）
CHROMIUM_ARGS = ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']


class Handler(http.server.SimpleHTTPRequestHandler):
    """ルートの ファイルを 出す。ホーム画面版の index.html だけ、CSP に 書いた うちのこランの ファイルの URL（公開 URL・パスまで）の
    はじめの 部分を この 手元の URL に かえる（ファイルの 名前と integrity は そのまま。CSP の 形も 同じ）"""
    def log_message(self, *a):
        pass

    def do_GET(self):
        path = self.path.split('?')[0]
        idx = os.path.join(self.directory, 'index.html')
        if path in ('/', '/index.html') and os.path.isfile(idx):
            body = open(idx, 'rb').read().replace((HOME_ORIGIN + 'run-').encode(), ('http://%s/run-' % self.headers.get('Host', '')).encode())
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        return super().do_GET()


def serve(root=ROOT):
    httpd = socketserver.ThreadingTCPServer(('127.0.0.1', 0), functools.partial(Handler, directory=root))
    httpd.daemon_threads = True
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, httpd.server_address[1]


async def poll(page, js, timeout=60000, step=100):
    """page.wait_for_function は CSP（unsafe-eval なし）に とめられるので、evaluate で くりかえし 見る"""
    for _ in range(max(1, timeout // step)):
        if await page.evaluate(js):
            return True
        await page.wait_for_timeout(step)
    return False


# 文字と地の色の差：テキストの まわりの 背景色を 親へ たどって 重ね（opacity も）、WCAG の比を出す。背景が 画像・グラデーションの所（おへや）は 見ない
LOOKS_JS = r'''(() => {
  const parse = s => {
    let m = s.match(/rgba?\(([^)]+)\)/);
    if (m){ const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]; }
    m = s.match(/color\(srgb ([^)]+)\)/);
    if (m){ const p = m[1].split(/[ \/]+/).filter(Boolean).map(Number); return [p[0] * 255, p[1] * 255, p[2] * 255, p.length > 3 ? p[3] : 1]; }
    return null;
  };
  const over = (c, b) => { const a = c[3]; return [c[0] * a + b[0] * (1 - a), c[1] * a + b[1] * (1 - a), c[2] * a + b[2] * (1 - a), 1]; };
  const blend = (o, c, b) => [c[0] * o + b[0] * (1 - o), c[1] * o + b[1] * (1 - o), c[2] * o + b[2] * (1 - o), 1];
  const lum = c => { const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }; return .2126 * f(c[0]) + .7152 * f(c[1]) + .0722 * f(c[2]); };
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
  const out = [], seen = new Set();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walker.nextNode())){
    if (!n.textContent.trim()) continue;
    const el = n.parentElement;
    if (!el || seen.has(el)) continue;
    seen.add(el);
    /* ロゴ（.brand）は 決まりの外（WCAG も ロゴの文字は のぞく）。えらべない ボタン・おへやの絵の上も 見ない */
    if (el.closest('[hidden],svg,script,style,textarea,.stage,.miniroom,.brand,[disabled],.act[aria-disabled="true"]')) continue;
    const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
    if (!r.width || !r.height || r.bottom < 0 || r.top > innerHeight || cs.visibility === 'hidden' || cs.display === 'none') continue;
    let top = el; for (let a = el; a; a = a.parentElement) if (Number(getComputedStyle(a).opacity) < 1) top = a;
    const path = [];
    let e = el, base = null, bad = false, passed = top === el;
    while (e){
      if (e === top) passed = true;
      const s = getComputedStyle(e);
      path.unshift(e);
      if (s.backgroundImage !== 'none'){ bad = true; break; }
      const bg = parse(s.backgroundColor);
      if (bg && bg[3] >= .999 && passed && e !== top){ base = bg; break; }
      e = e.parentElement;
    }
    if (bad) continue;
    base = base || [255, 255, 255, 1];
    let back = base;
    const rec = i => {
      const E = path[i], s = getComputedStyle(E), o = Number(s.opacity);
      const b1 = i === 0 ? base : over(parse(s.backgroundColor) || [0, 0, 0, 0], back);
      const save = back; back = b1;
      const [t, b] = i === path.length - 1 ? [over(parse(s.color), b1), b1] : rec(i + 1);
      back = save;
      return [blend(o, t, back), blend(o, b, back)];
    };
    const [tc, bc] = rec(0);
    const size = parseFloat(cs.fontSize), w = Number(cs.fontWeight);
    const need = size >= 24 || (size >= 18.66 && w >= 700) ? 3 : 4.5;
    const cr = Math.round(ratio(tc, bc) * 100) / 100;
    if (cr < need) out.push(`色の差 ${cr}（${need}より小さい）${size}px「${n.textContent.trim().slice(0, 16)}」`);
    if (size < 11) out.push(`${size}px の文字「${n.textContent.trim().slice(0, 16)}」`);
  }
  /* シートの「とじる」など：まわりを さわっても ボタンに とどく はば（見た目より 広くてよい） */
  for (const b of document.querySelectorAll('.closebtn')){
    const r = b.getBoundingClientRect();
    if (!r.width || r.bottom < 0 || r.top > innerHeight) continue;
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const hit = (x, y) => { const e = document.elementFromPoint(x, y); return !!e && (e === b || b.contains(e)); };
    if (!hit(cx, cy)) continue;   /* ポップアップの 下に かくれている ボタン（パズルの 画面の 上に「あそびかた」など）は 見ない */
    if (!(hit(cx - 21.5, cy) && hit(cx + 21.5, cy) && hit(cx, cy - 21.5) && hit(cx, cy + 21.5)))
      out.push(`「${b.getAttribute('aria-label') || b.textContent.trim()}」の さわれる所が 44px より小さい`);
  }
  return [...new Set(out)];
})()'''


# ほかのアプリの キャッシュを 先に 作り、同じ URL（index.html）に ちがうページを 入れる（caches.match は 作った順に さがす）
SW_OTHER_JS = r'''async () => {
  const names = await caches.keys(), mine = names.find(n => n.startsWith('uchinoko-'));
  if (!mine) return null;
  const c = await caches.open(mine), kept = [];
  for (const r of await c.keys()) kept.push([r, await c.match(r)]);
  await caches.delete(mine);
  const o = await caches.open('other-app-v1');
  await o.put(new URL('index.html', location.href).href, new Response('<!doctype html><p id=otherApp>other app</p>', { headers:{ 'content-type':'text/html' } }));
  const c2 = await caches.open(mine);
  for (const [r, res] of kept) await c2.put(r, res);
  return mine;
}'''


def sample_state():
    t = int(time.time() * 1000)
    return {
        "v": 1,
        "pet": {"name": "テスト", "species": "dog", "breedId": "pomeranian", "colorName": "クリーム",
                "look": {"species": "dog", "breedId": "pomeranian"}, "photo": None,
                "wear": {"head": None, "face": None, "neck": "scarf_tri"}},
        "stats": {"full": 60, "mood": 80, "love": 1500},
        "counts": {"meals": 10, "treats": 5, "pets": 20, "plays": 4},
        "recentTreats": [], "last": t - 4 * 3600e3, "created": t - 10 * 864e5, "updated": t,
    }


async def main(args):
    from playwright.async_api import async_playwright
    os.makedirs(args.out, exist_ok=True)
    httpd, port = serve(os.path.join(ROOT, 'src', 'out', 'line') if args.line else ROOT)
    errors, shots = [], []
    async with async_playwright() as p:
        browser = await p.chromium.launch(args=CHROMIUM_ARGS)
        vw, vh = (int(x) for x in args.size.lower().split('x'))
        ctx = await browser.new_context(viewport={'width': vw, 'height': vh}, device_scale_factor=2,
                                        is_mobile=True, has_touch=True, timezone_id='Asia/Tokyo', locale='ja-JP',
                                        color_scheme='dark' if args.dark else 'light')
        page = await ctx.new_page()
        page.on('pageerror', lambda e: errors.append(str(e)))
        # CSP にとめられたもの（ホーム画面版の Content-Security-Policy）もエラーとして数える
        page.on('console', lambda m: errors.append('CSP: ' + m.text)
                if m.type == 'error' and 'Content Security Policy' in m.text else None)
        if args.line:
            # LIFF SDK は外へ読みにいかず、読みこめなかったときと同じにする（ゲストで遊べることを確かめる）
            await page.route('https://static.line-scdn.net/**', lambda r: r.abort())
        if args.android_inset:
            # Android版LINEが入れる変数をまねる（どの要素に置かれても効くかを見るため body にも置く）
            await page.add_init_script(
                "document.addEventListener('DOMContentLoaded',()=>{for(const e of [document.documentElement,document.body])"
                "e.style.setProperty('--android-safe-area-inset-bottom','%dpx')})" % args.android_inset)
        if not args.fresh:
            await page.add_init_script(
                "if(!sessionStorage.getItem('smoke')){localStorage.setItem('uchinoko-biyori:v1', %s);sessionStorage.setItem('smoke','1')}"
                % json.dumps(json.dumps(sample_state())))

        async def snap(name):
            path = os.path.join(args.out, f'{len(shots) + 1:02d}_{name}.png')
            await page.screenshot(path=path)
            shots.append(path)
            for x in await page.evaluate(LOOKS_JS):
                errors.append(f'見た目（{name}）：{x}')

        async def close_popups():
            for _ in range(6):
                await page.wait_for_timeout(600)
                btn = await page.query_selector('.levelup .btn.primary')
                if not btn:
                    return
                await snap('popup')
                await btn.click()

        async def close_sheet():
            await page.click('#sheet [data-close]')
            await page.wait_for_timeout(350)

        await page.goto(f'http://127.0.0.1:{port}/')
        await page.wait_for_timeout(1500)
        if args.fresh:
            await snap('welcome')
            await page.click('#obManual'); await page.wait_for_timeout(300)
            await page.click('[data-g="shiba"]'); await page.fill('#edName', 'テスト')
            await snap('edit')
            await page.click('#edGo'); await page.wait_for_timeout(1200)
        await close_popups()
        await snap('room')
        # 右上の ボタンの名前は むかえた日だけ（--fresh は きょう むかえた子、ふつうは 10日まえの子。診断 4-5）
        names = await page.evaluate("[...document.querySelectorAll('.top .iconname')].map(e => getComputedStyle(e).display !== 'none' ? e.textContent : '').join('/')")
        want = 'おねがい/アルバム/メニュー' if args.fresh else '//'
        print('右上の ボタンの名前：', names.strip('/') or '(なし)')
        if names != want:
            errors.append(f'右上の ボタンの名前が ちがいます：{names!r}（{want!r} のはず）')
        if not args.fresh:
            # よるの ひとこと（通知：画面の中の お知らせ）：21時を すぎて おねがいが のこっていたら、うちのこが ふきだしで 1日1回
            # うちのこが おへやの 右はし（ベッド）に いても、ふきだしは おへやの 中に おさまる
            await page.evaluate("() => { clearTimeout(idleT); Pet.el.style.transition = 'none'; Pet.x = 80; Pet.y = 84; Pet.apply(); }")
            await page.wait_for_timeout(300)
            await page.evaluate("() => { window.__hour = Clock.hour; Clock.hour = () => 21; localStorage.removeItem('uchinoko-biyori:nudge-day'); Nudge.shown = ''; Nudge.check(); }")
            await page.wait_for_timeout(900)
            first = await page.evaluate('''() => { const b = document.querySelector('#bubble').getBoundingClientRect(), s = document.querySelector('#stage').getBoundingClientRect();
                return { say: document.querySelector('#bubble').textContent, show: document.querySelector('#bubble').classList.contains('show'), badge: document.querySelector('#reqBadge').classList.contains('nudge'),
                  day: localStorage.getItem('uchinoko-biyori:nudge-day') === dayKey(), n: reqLeft(), inside: b.left >= s.left && b.right <= s.right }; }''')
            await snap('nudge')
            await page.wait_for_timeout(3200)
            second = await page.evaluate("() => document.querySelector('#bubble').textContent")
            await page.evaluate("() => { Nudge.check(); window.__again = document.querySelector('#bubble').textContent; }")
            again = await page.evaluate("() => { Clock.hour = window.__hour; if (!Clock.hour) delete Clock.hour; return window.__again; }")
            print('よるの ひとこと：', first['say'], '→', second)
            if not (first['say'] == 'もうすぐ きょうが おわるよ' and first['show'] and first['badge'] and first['day'] and first['inside'] and second == f"おねがい、あと{first['n']}つ！" and again == second):
                errors.append(f'よるの ひとこと が ちがいます：{first} {second!r} {again!r}')
        if args.line:
            info = await page.evaluate('''() => ({
                sw: !!(navigator.serviceWorker && navigator.serviceWorker.controller),
                manifest: !!document.querySelector('link[rel=manifest]'),
                line: document.documentElement.dataset.line || null,
                dockGap: Math.round(document.scrollingElement.scrollHeight - document.querySelector('.dock').getBoundingClientRect().bottom - scrollY),
            })''')
            print('line:', info)
            if info['manifest'] or info['sw']:
                errors.append('LINE版に manifest か Service Worker が入っています')
            # LIFF SDK はとめてあるので、LIFF ID があれば failed（ゲスト）、なければ off になるはず（SDK の読みこみは js_line.js から）
            if info['line'] not in ('off', 'failed'):
                errors.append('LINE版の LIFF の状態が想定外です: %s' % info['line'])
            if args.android_inset and info['dockGap'] < args.android_inset:
                errors.append('下の5つのボタンがナビゲーションバーと重なります（すき間 %dpx）' % info['dockGap'])
        steps = [
            ('requests', '#reqBtn', []),
            ('tricks', '#actTrick', []),
            ('treats', '#actTreat', []),
            ('dress', '#actDress', []),
            ('room_tab', '#actDress', ['[data-slot="room"]']),
            ('album_diary', '#albumBtn', ['[data-at="diary"]']),
            ('album_souvenir', '#albumBtn', ['[data-at="souv"]']),
            ('album_stamp', '#albumBtn', ['[data-at="stamp"]']),
            ('profile', '#menuBtn', []),
            ('play_pick', '#actPlay', []),
        ]
        for name, opener, clicks in steps:
            await page.click(opener); await page.wait_for_timeout(450)
            for c in clicks:
                await page.click(c); await page.wait_for_timeout(300)
            await snap(name)
            if args.line and name == 'profile':
                st = await page.evaluate("(document.querySelector('#sheet .line-status') || {}).textContent || ''")
                print('line status:', st or '(なし)')
            if args.android_inset and name == 'treats':
                # シートの中身の下に、ナビゲーションバーの分のすき間があるか
                pad = await page.evaluate("parseFloat(getComputedStyle(document.querySelector('#sheet')).paddingBottom)")
                print('sheet padding-bottom:', pad)
                if pad < 22 + args.android_inset:
                    errors.append('シートの下のすき間が足りません（%spx）' % pad)
            await close_sheet()
        # パズル（2026-11-15。2026-11-16 から ページごと うつる 画面）：盤も おわりの 知らせも スクロールなしで 画面に 入るか。
        # タップで 1手（えらぶ → となり）、のこりは いちばん多く けせる手で さいごまで。おわりの 知らせと ほうび
        await page.click('#actPlay'); await page.wait_for_timeout(450)
        await page.click('[data-play="puzzle"]'); await page.wait_for_timeout(600)
        await snap('puzzle')
        fit_js = '''() => { const pg = document.querySelector('#pzPage'), r = s => { const e = pg.querySelector(s); return e && !e.hidden ? e.getBoundingClientRect() : null; };
            const b = r('#pzBoard'), t = r('.pz-t'), c = r('.pz-card'), h = r('.pz-hero'), pad = parseFloat(getComputedStyle(pg).paddingBottom);
            return { vh: innerHeight, vw: innerWidth, board: [Math.round(b.left), Math.round(b.top), Math.round(b.right), Math.round(b.bottom)], tile: Math.round(t.width * 10) / 10, hero: Math.round(h.height),
                     card: c ? [Math.round(c.top), Math.round(c.bottom)] : null, scroll: [pg.scrollHeight, pg.clientHeight, document.scrollingElement.scrollTop], tight: pg.classList.contains('tight'), pad: pad,
                     sheet: document.querySelector('#sheetWrap').classList.contains('open') }; }'''
        fit = await page.evaluate(fit_js)
        print('パズルの 画面：', fit)
        if not (not fit['sheet'] and not fit['tight'] and fit['scroll'][0] <= fit['scroll'][1] and fit['board'][0] >= 0 and fit['board'][2] <= fit['vw']
                and fit['board'][3] <= fit['vh'] - args.android_inset and fit['tile'] >= 44 and fit['hero'] >= 90):
            errors.append(f'パズルの 画面が 入りきっていません：{fit}')
        tap = await page.evaluate('''() => { for (let c = 0; c < 2 * PUZZLE.w * PUZZLE.w; c++){ const p = Puzzle.pair(c); if (p && Puzzle.lines(Puzzle.swapped(PuzzleUI.g.b, p[0], p[1])).length) return p; } return null; }''')
        love0 = await page.evaluate('S.stats.love')
        await page.click(f'.pz-t[data-i="{tap[0]}"]'); await page.wait_for_timeout(200)
        await snap('puzzle_select')
        await page.click(f'.pz-t[data-i="{tap[1]}"]'); await page.wait_for_timeout(1600)
        # とちゅうで ×：1回 たしかめる（つづける）
        await page.click('#pzQuit'); await page.wait_for_timeout(400)
        await snap('puzzle_quit')
        asked = await page.evaluate("document.querySelector('#pzEnd').textContent")
        await page.click('#pzPage [data-pz="stay"]'); await page.wait_for_timeout(300)
        # 「？」：あそびかた
        await page.click('#pzHelp'); await page.wait_for_timeout(500)
        await snap('puzzle_help')
        helped = await page.evaluate("(document.querySelector('.levelup') || {}).textContent || ''")
        await page.click('.levelup [data-close]'); await page.wait_for_timeout(400)
        if 'とちゅうで やめる？' not in asked or 'あそびかた' not in helped:
            errors.append(f'パズルの「×」の たしかめ か「？」が 出ません：{asked!r} {helped[:20]!r}')
        played = await page.evaluate('''async () => {
            const U = PuzzleUI, used = U.moves.length;
            for (let guard = 0; guard < 40 && !U.g.end; guard++){
              let best = -1, bn = 0;
              for (let c = 0; c < 2 * PUZZLE.w * PUZZLE.w; c++){ const p = Puzzle.pair(c); if (!p) continue; const n = Puzzle.lines(Puzzle.swapped(U.g.b, p[0], p[1])).length; if (n > bn){ bn = n; best = c; } }
              const p = Puzzle.pair(best); await U.tryMove(p[0], p[1]);
            }
            for (let i = 0; i < 60 && !document.querySelector('#pzEnd .btnrow'); i++) await new Promise(r => setTimeout(r, 100));
            return { tapped: used, end: U.g.end, clear: U.g.clear, score: U.g.score, text: document.querySelector('#pzEnd').textContent, best: S.puzzle.best, n: S.puzzle.n, games: S.puzzle.games, left: document.querySelectorAll('.pz-t').length,
                     shown: [+document.querySelector('#pzGot').textContent, +document.querySelector('#pzLeft').textContent, +document.querySelector('#pzScore').textContent], g: [Math.min(U.g.got, PUZZLE.goal), U.g.left, U.g.score] };
        }''')
        await page.wait_for_timeout(1500)
        await close_popups()
        await snap('puzzle_end')
        love1 = await page.evaluate('S.stats.love')
        fit = await page.evaluate(fit_js)
        print('パズル：', played, f'なかよし +{round(love1 - love0, 1)}', fit['card'])
        if not (played['tapped'] == 1 and played['end'] and played['games'] == 1 and played['left'] == 36 and played['best'] == played['score']
                and (played['n'] == 1) == played['clear'] and played['text'].strip().startswith('クリア！') == played['clear'] and played['shown'] == played['g']):
            errors.append(f'パズルの おわりが ちがいます：{played}')
        if not (fit['card'] and fit['card'][0] >= fit['board'][1] and fit['card'][1] <= fit['board'][3] and fit['scroll'][0] <= fit['scroll'][1]):
            errors.append(f'パズルの おわりの 知らせが 盤の 中に 入っていません：{fit}')
        await page.click('#pzPage [data-pz="close"]'); await page.wait_for_timeout(600)
        if await page.evaluate("!!document.querySelector('#pzPage') || document.documentElement.classList.contains('pz-open') || !!document.querySelector('#app').inert"):
            errors.append('パズルの 画面が とじません')
        if not args.line:
            await run_checks(page, ctx, snap, errors, args, port)
        await page.click('#actFeed'); await page.wait_for_timeout(5500)
        await close_popups()
        await snap('after_meal')
        # なでる（指の まね）：うちのこを 下に こすると なでた ことに なり、タップは へんじ。さわった ところで ブラウザの 動きを
        # とめている（LINE の 中で ページごと 引っぱられない ように。P5-1）
        cdp = await ctx.new_cdp_session(page)
        px, py = await page.evaluate('''() => { clearTimeout(idleT);
            window.__pt = { ev: 0, still: 0, stroke: 0, tap: 0, y0: scrollY };
            for (const t of ['touchstart', 'touchmove']) document.addEventListener(t, e => { __pt.ev++; if (e.defaultPrevented) __pt.still++; });
            const s = window.onStroke, t = window.onTap;
            window.onStroke = e => { __pt.stroke++; return s(e); };
            window.onTap = () => { __pt.tap++; return t(); };
            const r = Pet.el.getBoundingClientRect(); return [Math.round(r.left + r.width / 2), Math.round(r.top + r.height * .3)]; }''')
        async def finger(kind, x, y):
            await cdp.send('Input.dispatchTouchEvent', {'type': kind, 'touchPoints': [] if kind == 'touchEnd' else [{'x': x, 'y': y}]})
        await finger('touchStart', px, py)
        for i in range(1, 9):
            await finger('touchMove', px, py + i * 12); await page.wait_for_timeout(16)
        await finger('touchEnd', 0, 0); await page.wait_for_timeout(200)
        await finger('touchStart', px, py); await finger('touchEnd', 0, 0); await page.wait_for_timeout(300)
        pt = await page.evaluate('Object.assign(__pt, { y1: scrollY })')
        print('なでる（指）：', pt)
        if not (pt['stroke'] >= 1 and pt['tap'] == 1 and pt['ev'] >= 10 and pt['still'] == pt['ev'] and pt['y1'] == pt['y0']):
            errors.append(f'なでる（指）が ちがいます：{pt}')
        if not args.line and not args.fresh:
            # 組織の ほかのアプリの キャッシュに 同じ URL（index.html）が あっても、オフラインで ひらくのは うちのこ日和（診断 2-4）
            # ページは https のときだけ Service Worker を入れるので、ここ（http://127.0.0.1）では 手で入れる
            await page.evaluate("async () => { await navigator.serviceWorker.register('sw.js'); for (let i = 0; i < 80 && !navigator.serviceWorker.controller; i++) await new Promise(r => setTimeout(r, 100)); }")
            mine = await page.evaluate(SW_OTHER_JS)
            await ctx.set_offline(True)
            await page.reload(); await page.wait_for_timeout(1500)
            other = await page.evaluate("!!document.getElementById('otherApp')")
            app = await page.evaluate("!!document.getElementById('stage')")
            print('オフライン：', 'うちのこ日和' if app else ('ほかのアプリ' if other else 'ひらけない'), f'（キャッシュ {mine}）')
            if not mine or other or not app:
                errors.append('オフラインで うちのこ日和が ひらけません（自分の キャッシュだけを 見ていない？）')
            # うちのこランの ファイル（RUN_SRC）も とっておく（オフラインでも あそべる）
            run_kept = await page.evaluate("async () => typeof RUN_SRC === 'undefined' ? 'なし' : !!(await (await caches.open(%s)).match(RUN_SRC))" % json.dumps(mine or ''))
            print('オフライン：ランの ファイル', run_kept)
            if run_kept is not True and run_kept != 'なし':
                errors.append('ランの ファイルが Service Worker に とっておかれていません')
            await ctx.set_offline(False)
        await browser.close()
    httpd.shutdown()
    print('screenshots:')
    for s in shots:
        print('  ' + s)
    print(f'page errors: {len(errors)}')
    for e in errors:
        print('  ' + e)
    return 1 if errors else 0


RUN_FIT_JS = r'''() => { const pg = document.querySelector('#runPage'), r = s => { const e = pg.querySelector(s); return e && !e.hidden && e.getClientRects().length ? e.getBoundingClientRect() : null; };
  const c = r('.run-card'), x = r('[data-run="x"]'), b = r('.run-bottom');
  return { vh: innerHeight, vw: innerWidth, card: c ? [Math.round(c.left), Math.round(c.top), Math.round(c.right), Math.round(c.bottom)] : null,
           x: x ? [Math.round(x.top), Math.round(x.bottom)] : null, bottom: b ? Math.round(b.bottom) : null,
           xHit: !!x && !!document.elementFromPoint(x.left + x.width / 2, x.top + x.height / 2).closest('[data-run="x"]'),
           sheet: document.querySelector('#sheetWrap').classList.contains('open'), inert: !!document.querySelector('#app').inert,
           scroll: document.scrollingElement.scrollWidth > innerWidth + 1 }; }'''
RUN_SEL_JS = r'''() => { const pg = document.querySelector('#runPage'), b = pg.querySelector('.run-sel-body'), x = pg.querySelector('[data-s="x"]').getBoundingClientRect();
  const last = [...pg.querySelectorAll('.run-course')].pop().getBoundingClientRect();
  return { title: (pg.querySelector('.run-title') || {}).textContent, courses: [...pg.querySelectorAll('[data-course]')].map(e => e.dataset.course),
           maps: pg.querySelectorAll('.run-map svg').length, best: [...pg.querySelectorAll('.run-cb')].map(e => e.textContent.replace(/\s+/g, ' ').trim()),
           note: (pg.querySelector('.run-sel-note') || {}).textContent, fit: last.bottom <= innerHeight && last.left >= 0 && last.right <= innerWidth,
           scroll: document.scrollingElement.scrollWidth > innerWidth + 1 || b.scrollWidth > b.clientWidth + 1, inert: !!document.querySelector('#app').inert, ctl: !!RunUI.ctl,
           canvas: pg.querySelectorAll('canvas').length, xHit: !!document.elementFromPoint(x.left + x.width / 2, x.top + x.height / 2).closest('[data-s="x"]') }; }'''
RUN_TILE_JS = r'''() => { const b = document.querySelector('#sheet [data-play="run"]');
  return { off: b ? b.getAttribute('aria-disabled') : 'none', text: b ? b.textContent.replace(/\s+/g, ' ').trim() : '',
           note: [...document.querySelectorAll('#sheet .note')].map(n => n.textContent).join('|') }; }'''
RUN_SPY_JS = r'''() => { window.__rt = { ev: 0, still: 0, y0: scrollY, inputs: [] };
  for (const t of ['touchstart', 'touchmove']) document.addEventListener(t, e => { __rt.ev++; if (e.defaultPrevented) __rt.still++; });
  const sim = RunUI.ctl.sim, inp = sim.input.bind(sim); sim.input = a => { const r = inp(a); __rt.inputs.push(a + ':' + r); return r; }; }'''
# タップ（ポインターの イベントを じかに。ヘッドレスの 3D が おそいと 指の イベントが おくれて 350ms を こえるため）
RUN_TAP_JS = r'''() => { const c = document.querySelector('#runPage .run-canvas'), o = { pointerId: 77, isPrimary: true, pointerType: 'touch', clientX: 195, clientY: 520, bubbles: true };
  c.dispatchEvent(new PointerEvent('pointerdown', o)); c.dispatchEvent(new PointerEvent('pointerup', o)); }'''
NO_WEBGL_JS = "{ const g = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function(t, ...a){ return /webgl/i.test(t) ? null : g.call(this, t, ...a); }; }"


async def run_checks(page, ctx, snap, errors, args, port):
    """うちのこラン（ホーム画面版だけ。2026-11-21 P2・2026-11-22 P3・P4）：「あそぶ」の「ラン」→ ページ #runPage の コースを えらぶ 画面（3コース・あそびかた）→
    こうえんの スタート → 指の スワイプ・タップ → アプリを はなれたら ひとやすみ → ゴール（ほうび・ベスト・アルバム。はやすぎる タイムは 切る）→
    つぎの コースへ（うみべ）→ コースを えらぶ（ベストが 出る）→ こうえん → × → とじたら ぜんぶ 片づく。WebGL が ない 端末・ファイルが よめない（integrity が あわない）とき。
    ゴールまでの 通しは tools/run/run_shots.py（時計を とめて とる）"""
    if not await page.evaluate("typeof RunUI !== 'undefined'"):
        print('ラン：この版には ない（RUN_HOME=0）')
        return
    await page.click('#actPlay'); await page.wait_for_timeout(450)
    tile = await page.evaluate(RUN_TILE_JS)
    if tile['off'] is not None:
        errors.append(f'「あそぶ」に ランが ありません：{tile}')
        await page.click('#sheet [data-close]'); await page.wait_for_timeout(350)
        return
    await page.click('[data-play="run"]')
    if not await poll(page, "() => !!document.querySelector('#runPage .run-sel .run-course')", 90000):
        errors.append('ランの コースを えらぶ 画面が 出ません：' + await page.evaluate("() => (document.querySelector('#runPage') || {}).textContent || ''"))
        await page.evaluate('() => RunUI.close()')
        return
    await page.wait_for_timeout(300)
    await snap('run_select')
    sel = await page.evaluate(RUN_SEL_JS)
    print('ランの コースを えらぶ 画面：', sel)
    if not (sel['title'] == 'うちのこラン' and sel['courses'] == ['park', 'beach', 'forest'] and sel['maps'] == 3 and sel['fit'] and not sel['scroll']
            and sel['inert'] and not sel['ctl'] and sel['xHit'] and 'まだ きろく なし' in sel['best'][0] and 'あと3回' in sel['note']):
        errors.append(f'ランの コースを えらぶ 画面が ちがいます：{sel}')
    await page.click('#runPage [data-s="help"]'); await page.wait_for_timeout(400)
    await snap('run_select_help')
    hp = await page.evaluate("() => { const c = document.querySelector('#runPage .run-over .run-card'), r = c && c.getBoundingClientRect(); return r ? [Math.round(r.top), Math.round(r.bottom), innerHeight] : null; }")
    if not (hp and hp[0] >= 0 and hp[1] <= hp[2]):
        errors.append(f'ランの あそびかた（コースを えらぶ 画面）が 入りきっていません：{hp}')
    await page.click('#runPage [data-s="ok"]'); await page.wait_for_timeout(300)
    await page.click('#runPage [data-course="park"]')
    if not await poll(page, '() => !!(RunUI.ctl && RunUI.ctl.frames > 1)', 90000):
        errors.append('ランが はじまりません：' + await page.evaluate("() => (document.querySelector('#runPage') || {}).textContent || ''"))
        await page.evaluate('() => RunUI.close()')
        return
    await page.wait_for_timeout(300)
    await snap('run_ready')
    fit = await page.evaluate(RUN_FIT_JS)
    fit['select'] = await page.evaluate("() => !!document.querySelector('#runPage [data-m=\"select\"]')")
    print('ランの 画面：', fit)
    if not (fit['card'] and fit['card'][0] >= 0 and fit['card'][2] <= fit['vw'] and fit['card'][3] <= fit['vh'] and fit['x'] and fit['x'][0] >= 0
            and fit['xHit'] and not fit['sheet'] and fit['inert'] and not fit['scroll'] and fit['bottom'] <= fit['vh'] - args.android_inset and fit['select']):
        errors.append(f'ランの 画面が 入りきっていません：{fit}')
    await page.click('#runPage [data-run="help"]'); await page.wait_for_timeout(400)
    await snap('run_help')
    fit = await page.evaluate(RUN_FIT_JS)
    if not (fit['card'] and fit['card'][1] >= 0 and fit['card'][3] <= fit['vh']):
        errors.append(f'ランの あそびかたが 入りきっていません：{fit}')
    await page.click('#runPage [data-m="ok"]'); await page.wait_for_timeout(300)
    await page.click('#runPage [data-m="go"]')
    await page.wait_for_timeout(700)
    await snap('run_countdown')
    if not await poll(page, "() => RunUI.ctl.sim.status === 'running'", 90000, 30):
        errors.append('ランの 3・2・1 が おわりません')
    # 指（ヘッドレスの 3D は おそく、指の イベントは こまに あわせて とどくので、この あいだだけ うちのこの 足を とめて まがりかどの 前で ためす）：左へ スワイプで レーンを うつる・うえへ スワイプで ジャンプ・タップ（おやつが たまっていないので ダッシュしない）。ページは うごかない
    cdp = await ctx.new_cdp_session(page)

    async def finger(kind, x, y):
        await cdp.send('Input.dispatchTouchEvent', {'type': kind, 'touchPoints': [] if kind == 'touchEnd' else [{'x': x, 'y': y}]})

    async def swipe(dx, dy):
        cx, cy = 195, 520
        await finger('touchStart', cx, cy)
        for i in range(1, 6):
            await finger('touchMove', cx + dx * i / 5, cy + dy * i / 5); await page.wait_for_timeout(12)
        await finger('touchEnd', 0, 0); await page.wait_for_timeout(60)
    await page.evaluate(RUN_SPY_JS)
    await page.evaluate('() => { RunUI.ctl.sim.player.speed = 0; }')
    lane0 = await page.evaluate('() => RunUI.ctl.sim.player.lane')
    await swipe(-70, 6)
    lane1 = await page.evaluate('() => RunUI.ctl.sim.player.lane')
    await page.wait_for_timeout(80)
    await swipe(4, -70)
    await page.wait_for_timeout(80)
    await page.evaluate(RUN_TAP_JS)                                      # おやつが たまっていない：ダッシュしない
    await page.evaluate('() => { RunUI.ctl.sim.gauge = 20; }')
    await page.evaluate(RUN_TAP_JS)                                      # 20こ：ダッシュ
    rt = await page.evaluate('() => Object.assign(__rt, { y1: scrollY, dash: RunUI.ctl.sim.dashCount, boost: RunUI.ctl.sim.player.boost > 0, s: RunUI.ctl.sim.player.s })')
    await page.evaluate('() => { RunUI.ctl.sim.player.speed = 9.6; }')
    print('ランの 指：', {'lane': [lane0, lane1], **rt})
    if not (rt['s'] < 58 and lane1 == max(-1, lane0 - 1) and rt['inputs'][:4] == ['left:true', 'jump:true', 'dash:false', 'dash:true'] and rt['dash'] == 1
            and rt['boost'] and rt['ev'] >= 10 and rt['still'] == rt['ev'] and rt['y1'] == rt['y0']):
        errors.append(f'ランの 指の 操作が ちがいます：lane {lane0}→{lane1} {rt}')
    await snap('run_running')
    # アプリを はなれた（visibilitychange）→ ひとやすみ。もどっても 時計は すすまない（「つづける」を おすまで）
    await page.evaluate("() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')); }")
    await page.wait_for_timeout(300)
    t0 = await page.evaluate('() => [RunUI.ctl.sim.status, RunUI.ctl.sim.time]')
    await page.evaluate("() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); }")
    await page.wait_for_timeout(900)
    t1 = await page.evaluate('() => [RunUI.ctl.sim.status, RunUI.ctl.sim.time]')
    await snap('run_pause')
    if not (t0[0] == 'paused' and t1[0] == 'paused' and t1[1] == t0[1]):
        errors.append(f'アプリを はなれても ランが とまりません：{t0} {t1}')
    await page.click('#runPage [data-m="resume"]'); await page.wait_for_timeout(500)
    # ゴール（ゴールの すこし 前へ とばす＝タイムが ありえないほど はやい → いちばん はやい タイムに 切る）：ほうび・ベスト・アルバム・ゴールの カード
    s0 = await page.evaluate('() => ({ love: S.stats.love, run: JSON.parse(JSON.stringify(S.run)), album: S.album.length, puzzle: Rules.puzzleLeft(S) })')
    await page.evaluate('() => { const sim = RunUI.ctl.sim; sim.player.s = sim.layout.length - 1.5; sim.waitingTurn = null; }')
    if not await poll(page, "() => RunUI.ctl.sim.status === 'finished' && !!document.querySelector('#runPage .run-rec .run-rec-h')", 60000, 30):
        errors.append('ランが ゴールしません：' + await page.evaluate("() => RunUI.ctl.sim.status"))
    await page.wait_for_timeout(300)
    await snap('run_result')
    fin = await page.evaluate('''() => ({ love: S.stats.love, run: JSON.parse(JSON.stringify(S.run)), min: RUN.courses.park.min, album: S.album.slice(0, 3).map(a => a.ti),
        rec: document.querySelector('#runPage .run-rec').textContent.replace(/\\s+/g, ' ').trim(), puzzle: Rules.puzzleLeft(S),
        next: (document.querySelector('#runPage [data-m="next"]') || {}).textContent || '', select: !!document.querySelector('#runPage [data-m="select"]'),
        saved: JSON.parse(localStorage.getItem('uchinoko-biyori:v1') || '{}').run })''')
    print('ランの ゴール：', {k: v for k, v in fin.items() if k != 'saved'})
    if not (fin['run']['games'] == s0['run']['games'] + 1 and fin['run']['n'] == s0['run']['n'] + 1 and fin['run']['best'].get('park') == fin['min']
            and abs(fin['love'] - s0['love'] - 2) < 1e-6 and 'はじめての きろく' in fin['rec'] and 'ごきげん+5' in fin['rec'] and fin['puzzle'] == s0['puzzle']
            and 'はじめての ラン' in fin['album'] and any('こうえんで さいこう きろく' in a for a in fin['album']) and 'うみべ' in fin['next'] and fin['select']):
        errors.append(f'ランの ゴールの ほうび・きろくが ちがいます：{s0} → {fin}')
    # レベルアップの ポップアップが 出ていたら けす（ランの ページの 上に 出る）
    await page.evaluate("() => { document.querySelectorAll('.levelup').forEach(e => e.remove()); Modal.q = []; Modal.busy = false; }")
    # つぎの コースへ（うみべの スタート）→ コースを えらぶ（こうえんの ベストが 出る）→ こうえん
    await page.click('#runPage [data-m="next"]')
    if not await poll(page, "() => !!(RunUI.ctl && RunUI.ctl.course === 'beach' && RunUI.ctl.frames > 1)", 90000):
        errors.append('つぎの コース（うみべ）が はじまりません')
    await page.wait_for_timeout(300)
    await snap('run_ready_beach')
    await page.click('#runPage [data-m="select"]')
    if not await poll(page, "() => !!document.querySelector('#runPage .run-sel .run-course') && !RunUI.ctl", 30000):
        errors.append('「コースを えらぶ」で もどりません')
    sel2 = await page.evaluate(RUN_SEL_JS)
    if not (sel2['best'][0].startswith('ベスト') and 'まだ きろく なし' in sel2['best'][1] and sel2['canvas'] == 0 and 'あと2回' in sel2['note']):
        errors.append(f'コースを えらぶ 画面に ベストが 出ません・3D が のこっています：{sel2}')
    await page.click('#runPage [data-course="park"]')
    if not await poll(page, '() => !!(RunUI.ctl && RunUI.ctl.frames > 1)', 90000):
        errors.append('こうえんが もういちど はじまりません')
    await page.click('#runPage [data-m="go"]')
    if not await poll(page, "() => RunUI.ctl.sim.status === 'running'", 90000, 30):
        errors.append('ランの 3・2・1 が おわりません（2回め）')
    st = await page.evaluate('() => RunUI.ctl.sim.status')
    # ×：走っている ときは ひとやすみ、もう1回で とじる。とじたら 描く ループ・WebGL・ページ・リスナーが のこらない
    await page.click('#runPage [data-run="x"]'); await page.wait_for_timeout(300)
    st2 = await page.evaluate('() => RunUI.ctl.sim.status')
    await page.evaluate('() => { window.__gl = RunUI.ctl.renderer.getContext(); window.__ctl = RunUI.ctl; }')
    await page.click('#runPage [data-run="x"]'); await page.wait_for_timeout(500)
    f0 = await page.evaluate('() => window.__ctl.frames')
    await page.wait_for_timeout(600)
    left = await page.evaluate('''() => ({ page: !!document.querySelector('#runPage'), canvas: document.querySelectorAll('canvas').length,
        cls: document.documentElement.classList.contains('run-open'), inert: !!document.querySelector('#app').inert, ctl: !!RunUI.ctl,
        lost: window.__gl.isContextLost(), frames: window.__ctl.frames, focus: document.activeElement && document.activeElement.id })''')
    print('ランを とじた：', {'resume': st, 'x': st2, 'frames0': f0, **left})
    if not (st == 'running' and st2 == 'paused' and not left['page'] and left['canvas'] == 0 and not left['cls'] and not left['inert'] and not left['ctl']
            and left['lost'] and left['frames'] == f0 and left['focus'] == 'actPlay'):
        errors.append(f'ランを とじても のこっています：{st} {st2} {f0} {left}')
    # アジリティ（P4）：えらぶ（切りかえ）→ バランス → シーソーで とまる（指）→ まつ → タップ（指）→ ゴール（ほうび・ベスト）
    await agility_checks(page, ctx, snap, errors, args)
    # WebGL 2 が ない 端末：「この端末では あそべません」で ひらかない（ファイルも 読まない）
    p2 = await ctx.new_page()
    p2.on('pageerror', lambda e: errors.append('WebGLなし：' + str(e)))
    await p2.add_init_script(NO_WEBGL_JS)
    await p2.goto(f'http://127.0.0.1:{port}/'); await p2.wait_for_timeout(1500)
    await p2.evaluate("() => { document.querySelectorAll('.levelup').forEach(e => e.remove()); Modal.q = []; Modal.busy = false; }")
    await p2.click('#actPlay'); await p2.wait_for_timeout(500)
    nogl = await p2.evaluate(RUN_TILE_JS)
    await p2.screenshot(path=os.path.join(args.out, 'run_nogl.png'))
    await p2.click('[data-play="run"]', force=True); await p2.wait_for_timeout(600)   # aria-disabled（Playwright は おせないと みる）
    nogl['open'] = await p2.evaluate("() => !!document.querySelector('#runPage') || !!document.querySelector('script[src^=\"run-\"]')")
    print('ラン（WebGL なし）：', nogl)
    if not (nogl['off'] == 'true' and 'あそべません' in nogl['text'] and 'あそべません' in nogl['note'] and not nogl['open']):
        errors.append(f'WebGL が ない ときの ランの 出かたが ちがいます：{nogl}')
    await p2.close()
    # ファイルが こわれていた（integrity が あわない）：読まずに「よみこめませんでした」→ とじる
    p3 = await ctx.new_page()
    p3.on('pageerror', lambda e: errors.append('こわれた ファイル：' + str(e)))

    async def broken(route):
        r = await route.fetch()
        await route.fulfill(response=r, body=(await r.body()) + b'\n;window.__tampered = 1;\n')
    await p3.route('**/run-*.js', broken)
    await p3.goto(f'http://127.0.0.1:{port}/'); await p3.wait_for_timeout(1500)
    await p3.evaluate("() => { document.querySelectorAll('.levelup').forEach(e => e.remove()); Modal.q = []; Modal.busy = false; RunUI.open(); }")
    await poll(p3, "() => /よみこめません/.test((document.querySelector('#runPage') || {}).textContent || '')", 20000)
    bad = await p3.evaluate("() => ({ text: (document.querySelector('#runPage') || {}).textContent || '', run: typeof UchinokoRun !== 'undefined', tampered: !!window.__tampered })")
    await p3.screenshot(path=os.path.join(args.out, 'run_loadfail.png'))
    await p3.click('#runPage .btn.primary'); await p3.wait_for_timeout(400)
    bad['closed'] = not await p3.evaluate("() => !!document.querySelector('#runPage')")
    print('ラン（ファイルが こわれていた）：', {k: (v.strip()[:30] if isinstance(v, str) else v) for k, v in bad.items()})
    if not ('よみこめませんでした' in bad['text'] and not bad['run'] and not bad['tampered'] and bad['closed']):
        errors.append(f'こわれた ランの ファイルを 止められません：{bad}')
    await p3.close()


RUN_AGI_JS = r"""() => { const c = RunUI.ctl, sim = c && c.sim, b = sim && sim.activeSeesaw, cue = document.querySelector('#runPage .run-cue'), stop = document.querySelector('#runPage .run-stop');
  return c ? { mode: c.mode, course: c.course, status: sim.status, stopped: sim.stopped, phase: b ? b.state.phase : null, s: Math.round(sim.player.s * 100) / 100,
    cue: cue && !cue.hidden ? cue.textContent.replace(/\s+/g, ' ').trim() : '', stop: !!stop && !stop.hidden, steps: [...document.querySelectorAll('#runPage .run-step')].map(e => e.dataset.state),
    results: [...sim.results.entries()] } : null; }"""
RUN_AGI_HOLD_JS = r"""() => { const sim = RunUI.ctl.sim, o = sim.layout.obstacles[1], st = sim.seesaws.get(o.id), step = sim.step.bind(sim);
  window.__agiHold = true; sim.step = dt => { if (!window.__agiHold) step(dt); };
  sim.results.set(0, true); sim.cleared = 1;
  st.phase = 'approach'; Object.assign(sim.player, { s: o.s - .3, lane: o.lane, x: o.lane * 2 });
  /* 1こまだけ すすめて いたの 上の 高さ・かたむきを いれる */
  window.__agiHold = false; sim.step(.001); window.__agiHold = true; }"""
RUN_AGI_FIN_JS = r"""() => ({ love: S.stats.love, run: JSON.parse(JSON.stringify(S.run)), min: RUN.courses.balance.min, album: S.album.slice(0, 2).map(a => a.ti + '／' + a.su),
  card: document.querySelector('#runPage .run-card').textContent.replace(/\s+/g, ' ').trim(), puzzle: Rules.puzzleLeft(S), result: RunUI.ctl.sim.result,
  next: (document.querySelector('#runPage [data-m="next"]') || {}).textContent || '', saved: JSON.parse(localStorage.getItem('uchinoko-biyori:v1') || '{}').run })"""


async def agility_checks(page, ctx, snap, errors, args):
    """アジリティ（2026-11-22 P4。ホーム画面版だけ）：ひらく → 「アジリティ」に 切りかえ（4コース）→ バランスの スタート → はしる →
    シーソーの 手前で したに スワイプ（指）で とまる → いたが さがるまで まつ → タップ（指）で すすむ → シーソーは クリア → したで とまる（「とまっているよ」）→
    ゴール（合計は いちばん はやい タイムに 切る・ほうび・ノーミス・ベスト・アルバム）→ コースを えらぶ（アジリティの まま・ベスト）→ とじる"""
    await page.evaluate("() => { document.querySelectorAll('.levelup').forEach(e => e.remove()); Modal.q = []; Modal.busy = false; RunUI.open(); }")
    if not await poll(page, "() => !!document.querySelector('#runPage .run-sel .run-course')", 90000):
        errors.append('アジリティ：コースを えらぶ 画面が 出ません')
        await page.evaluate('() => RunUI.close()')
        return
    await page.click('#runPage [data-mode="agility"]'); await page.wait_for_timeout(400)
    await snap('agi_select')
    sel = await page.evaluate(RUN_SEL_JS)
    sel['pressed'] = await page.evaluate("() => [...document.querySelectorAll('#runPage [data-mode]')].map(b => b.dataset.mode + ':' + b.getAttribute('aria-pressed'))")
    print('アジリティの コースを えらぶ 画面：', sel)
    if not (sel['courses'] == ['first-field', 'zigzag', 'balance', 'hill-field'] and sel['maps'] == 4 and not sel['scroll'] and sel['xHit'] and not sel['ctl']
            and sel['pressed'] == ['race:false', 'agility:true'] and all('まだ きろく なし' in b for b in sel['best'])):
        errors.append(f'アジリティの コースを えらぶ 画面が ちがいます：{sel}')
    await page.click('#runPage [data-course="balance"]')
    if not await poll(page, "() => !!(RunUI.ctl && RunUI.ctl.mode === 'agility' && RunUI.ctl.course === 'balance' && RunUI.ctl.frames > 1)", 90000):
        errors.append('アジリティ（バランス）が はじまりません')
        await page.evaluate('() => RunUI.close()')
        return
    await page.wait_for_timeout(300)
    await snap('agi_ready')
    fit = await page.evaluate(RUN_FIT_JS)
    print('アジリティの 画面：', fit)
    if not (fit['card'] and fit['card'][0] >= 0 and fit['card'][2] <= fit['vw'] and fit['card'][3] <= fit['vh'] and fit['xHit'] and fit['inert'] and not fit['scroll']
            and fit['bottom'] <= fit['vh'] - args.android_inset):
        errors.append(f'アジリティの 画面が 入りきっていません：{fit}')
    await page.click('#runPage [data-m="go"]')
    if not await poll(page, "() => RunUI.ctl.sim.status === 'running'", 90000, 30):
        errors.append('アジリティの 3・2・1 が おわりません')
    # ヘッドレスの 3D は おそいので、はじめの 障害物（わっか）は クリアした ことにして、シーソーの いたの 上（まんなかの すこし 手前）へ。
    # 指の あいだは うちのこを とめておく（step を とめる。指の 入力は すぐ ルールに とどく）
    await page.evaluate(RUN_AGI_HOLD_JS)
    await page.wait_for_timeout(400)
    await snap('agi_seesaw_brake')
    a0 = await page.evaluate(RUN_AGI_JS)
    cdp = await ctx.new_cdp_session(page)

    async def finger(kind, x, y):
        await cdp.send('Input.dispatchTouchEvent', {'type': kind, 'touchPoints': [] if kind == 'touchEnd' else [{'x': x, 'y': y}]})
    cx, cy = 195, 520
    await finger('touchStart', cx, cy)
    for i in range(1, 6):
        await finger('touchMove', cx + 2 * i / 5, cy + 70 * i / 5); await page.wait_for_timeout(12)
    await finger('touchEnd', 0, 0); await page.wait_for_timeout(300)
    a1 = await page.evaluate(RUN_AGI_JS)
    await snap('agi_seesaw_wait')                                       # とまった まま（いたが さがるまで まってね）
    await page.evaluate('() => { window.__agiHold = false; }')
    if not await poll(page, "() => { const b = RunUI.ctl.sim.activeSeesaw; return !!b && b.state.phase === 'ready'; }", 60000, 30):
        errors.append('シーソーの いたが さがりません')
    await page.wait_for_timeout(250)
    await snap('agi_seesaw_tap')
    a3 = await page.evaluate(RUN_AGI_JS)
    await page.evaluate(RUN_TAP_JS)                                      # タップ：また すすむ
    await page.wait_for_timeout(100)
    a4 = await page.evaluate(RUN_AGI_JS)
    if not await poll(page, '() => RunUI.ctl.sim.results.has(1)', 60000, 30):
        errors.append('シーソーを とおりぬけません')
    await page.wait_for_timeout(250)
    a5 = await page.evaluate(RUN_AGI_JS)
    print('アジリティの シーソー：', {'brake': a0, 'swipe': a1, 'ready': a3, 'tap': a4, 'after': a5})
    if not (a0['phase'] == 'approach' and 'したに スワイプ' in a0['cue'] and a1['stopped'] and a1['phase'] == 'hold' and not a1['stop'] and 'まってね' in a1['cue']
            and a3['phase'] == 'ready' and 'タップで すすむ' in a3['cue'] and not a3['stop']
            and not a4['stopped'] and a4['phase'] in ('exit', None) and [1, True] in a5['results'] and a5['steps'][:2] == ['clear', 'clear'] and a5['steps'][2] == 'next'):
        errors.append(f'シーソー（とまる・まつ・タップ）が ちがいます：{a0} {a1} {a3} {a4} {a5}')
    # したで とまる（シーソーの 外）→「とまっているよ タップで すすむ」→ タップで また すすむ（この あいだも うちのこの 足は とめておく。
    # ヘッドレスは おそく、そのあいだに つぎの 障害物〈トンネル〉を とおりすぎて ミスに なるため）
    await page.evaluate("() => { window.__agiHold = true; RunUI.ctl.sim.input('brake'); }")
    await page.wait_for_timeout(300)
    a6 = await page.evaluate(RUN_AGI_JS)
    await snap('agi_stopped')
    await page.evaluate(RUN_TAP_JS)
    await page.wait_for_timeout(150)
    a7 = await page.evaluate(RUN_AGI_JS)
    if not (a6['stopped'] and a6['stop'] and not a7['stopped'] and not a7['stop']):
        errors.append(f'「とまっているよ」が ちがいます：{a6} {a7}')
    # ゴール（ゴールの すこし 前へ とばす＝合計が ありえないほど はやい → バランスの いちばん はやい タイムに 切る）
    s0 = await page.evaluate('() => ({ love: S.stats.love, run: JSON.parse(JSON.stringify(S.run)), puzzle: Rules.puzzleLeft(S) })')
    # ゴールの すこし 前へ とばすので、とちゅうの 障害物は クリアした ことに する（とばした シーソーは「とまれなかった」ミスに なるため）
    await page.evaluate('() => { const sim = RunUI.ctl.sim; for (const o of sim.layout.obstacles) if (!sim.results.has(o.id)){ sim.results.set(o.id, true); sim.cleared++; } sim.player.s = sim.layout.length - 1.5; window.__agiHold = false; }')
    if not await poll(page, "() => RunUI.ctl.sim.status === 'finished' && !!document.querySelector('#runPage .run-rec .run-rec-h')", 60000, 30):
        errors.append('アジリティが ゴールしません：' + await page.evaluate("() => RunUI.ctl.sim.status"))
    await page.wait_for_timeout(300)
    await snap('agi_result')
    fin = await page.evaluate(RUN_AGI_FIN_JS)
    print('アジリティの ゴール：', {k: v for k, v in fin.items() if k not in ('saved', 'card')}, fin['card'][:90])
    ok_reward = (fin['run']['n'] == s0['run']['n'] + 1 and abs(fin['love'] - s0['love'] - 2) < 1e-6) if s0['run']['n'] < 3 else fin['run']['n'] == 3
    if not (fin['run']['games'] == s0['run']['games'] + 1 and fin['run']['clears'] == s0['run']['clears'] + 1 and fin['run']['best'].get('balance') == fin['min']
            and ok_reward and fin['puzzle'] == s0['puzzle'] and 'ノーミスで ゴール！' in fin['card'] and 'ごうけい' in fin['card'] and 'はじめての きろく' in fin['card']
            and any(a.startswith('バランスで さいこう きろく') and 'ノーミス' in a for a in fin['album']) and 'おかの ひろば' in fin['next']
            and fin['saved'] and fin['saved']['best'].get('balance') == fin['min']):
        errors.append(f'アジリティの ゴールの ほうび・きろくが ちがいます：{s0} → {fin}')
    await page.evaluate("() => { document.querySelectorAll('.levelup').forEach(e => e.remove()); Modal.q = []; Modal.busy = false; }")
    # コースを えらぶ（アジリティの まま・ベスト）→ とじる（ぜんぶ 片づく）
    await page.click('#runPage [data-m="select"]')
    if not await poll(page, "() => !!document.querySelector('#runPage .run-sel .run-course') && !RunUI.ctl", 30000):
        errors.append('アジリティ：「コースを えらぶ」で もどりません')
    sel2 = await page.evaluate(RUN_SEL_JS)
    if not (sel2['courses'] == ['first-field', 'zigzag', 'balance', 'hill-field'] and sel2['best'][2].startswith('ベスト') and sel2['canvas'] == 0):
        errors.append(f'アジリティの コースを えらぶ 画面に ベストが 出ません：{sel2}')
    await page.click('#runPage [data-s="x"]'); await page.wait_for_timeout(500)
    left = await page.evaluate("() => ({ page: !!document.querySelector('#runPage'), canvas: document.querySelectorAll('canvas').length, inert: !!document.querySelector('#app').inert, ctl: !!RunUI.ctl })")
    if left['page'] or left['canvas'] or left['inert'] or left['ctl']:
        errors.append(f'アジリティを とじても のこっています：{left}')


# Claude版のクラウド（window.claude の db・user）の まね。__cloud.doc＝クラウドの セーブ、delay＝get の 返事まで（ミリ秒）、sets＝書いたもの
CLAUDE_MOCK = r'''(() => {
  const C = window.__cloud = JSON.parse(sessionStorage.getItem('cloud') || 'null') || { doc:null, delay:0, sets:[] };
  const keep = () => sessionStorage.setItem('cloud', JSON.stringify(C));
  window.claude = { use: async name => {
    if (name === 'db') return { doc: path => ({
      get: async () => { await new Promise(r => setTimeout(r, C.delay)); return { exists: !!C.doc, data: () => JSON.parse(JSON.stringify(C.doc)) }; },
      set: async v => { C.sets.push({ name: v.pet && v.pet.name, created: v.created }); C.doc = JSON.parse(JSON.stringify(v)); keep(); },
    }) };
    if (name === 'user') return { id: async () => 'u-smoke' };
    throw Object.assign(new Error('not in this test'), { code:'not_granted' });
  } };
})();'''


CLAUDE_ROOT = os.path.join(ROOT, 'src', 'out', 'claude')   # build.sh が 作る Claude版（アーティファクトに 出す 形：index.html と run-<ハッシュ>.js）


async def claude_cloud(args):
    """Claude版：はじめての端末で、クラウドの セーブが 届く前に はじめての画面を 進めても、クラウドの子を 上書きしない（診断 3-7）。
    うちのこラン（P5）：ホーム画面版と 同じ ためし（run_checks・agility_checks）と、ほうび・ベストが クラウドの セーブに 入るか"""
    from playwright.async_api import async_playwright
    if not os.path.isfile(os.path.join(CLAUDE_ROOT, 'index.html')):
        print('src/out/claude/index.html が ありません（sh src/build.sh）')
        return 1
    httpd, port = serve(CLAUDE_ROOT)
    errors, results = [], []
    os.makedirs(args.out, exist_ok=True)

    def ok(cond, label, info=None):
        results.append(cond)
        print(('  ok   ' if cond else '  FAIL ') + label + ('' if cond or info is None else '  ' + json.dumps(info, ensure_ascii=False)[:300]))

    cloud_pet = sample_state()
    cloud_pet['pet']['name'] = 'クラウド'
    async with async_playwright() as p:
        browser = await p.chromium.launch(args=CHROMIUM_ARGS)

        async def open_page(doc, delay, name):
            ctx = await browser.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True,
                                            has_touch=True, timezone_id='Asia/Tokyo', locale='ja-JP', service_workers='block')
            page = await ctx.new_page()
            page.on('pageerror', lambda e: errors.append(f'{name}: {e}'))
            await page.add_init_script("if(!sessionStorage.getItem('cloud'))sessionStorage.setItem('cloud', %s);" %
                                       json.dumps(json.dumps({'doc': doc, 'delay': delay, 'sets': []})) + CLAUDE_MOCK)
            await page.goto(f'http://127.0.0.1:{port}/')
            await page.wait_for_timeout(400)
            return ctx, page

        async def state(page):
            return await page.evaluate('''() => ({ name: S && S.pet && S.pet.name, onboard: !document.getElementById('onboard').hidden,
                checking: Persist.checking, line: (() => { const e = document.getElementById('obCheck'); return e && !e.hidden ? e.textContent : ''; })(),
                go: (() => { const e = document.getElementById('edGo'); return e ? e.textContent : ''; })(),
                toast: document.getElementById('toast').classList.contains('show') ? document.getElementById('toast').textContent : '',
                sets: window.__cloud.sets.map(s => s.name), cloud: window.__cloud.doc && window.__cloud.doc.pet.name })''')

        async def new_child(page, go=True):
            await page.click('#obManual'); await page.wait_for_timeout(300)
            await page.click('[data-g="shiba"]'); await page.fill('#edName', 'あたらしい')
            if go:
                await page.click('#edGo'); await page.wait_for_timeout(300)

        print('A. クラウドが 答える前に「この子とくらす」を 押した（クラウドに 子が いる）')
        ctx, page = await open_page(cloud_pet, 3000, 'A')
        s = await state(page)
        ok(s['onboard'] and s['checking'] and 'たしかめています' in s['line'], 'はじめての画面に「たしかめています」の 1行', s)
        await new_child(page)
        s = await state(page)
        ok(s['onboard'] and 'たしかめています' in s['go'], '「この子とくらす」は まつ（ボタンに「たしかめています…」）', s)
        await page.screenshot(path=os.path.join(args.out, 'claude_A_wait.png'))
        await page.wait_for_timeout(3500)
        s = await state(page)
        ok(not s['onboard'] and s['name'] == 'クラウド' and 'あたらしい' not in s['sets'] and s['cloud'] == 'クラウド',
           'クラウドの子で はじまり、クラウドは 上書きしない', s)
        await page.screenshot(path=os.path.join(args.out, 'claude_A_cloud.png'))
        await ctx.close()

        print('B. はじめての画面の とちゅうで クラウドの子が 届いた')
        ctx, page = await open_page(cloud_pet, 2500, 'B')
        await new_child(page, go=False)
        await page.wait_for_timeout(2600)
        s = await state(page)
        ok(not s['onboard'] and s['name'] == 'クラウド' and 'クラウドに いた クラウドと あえたよ' in s['toast'], 'はじめての画面を とじて クラウドの子で はじめる（ひとこと）', s)
        await page.screenshot(path=os.path.join(args.out, 'claude_B_met.png'))
        await page.wait_for_timeout(1800)
        s = await state(page)
        ok('あたらしい' not in s['sets'] and s['cloud'] == 'クラウド', 'クラウドは 上書きしない', s)
        await ctx.close()

        print('C. クラウドに 子が いない')
        ctx, page = await open_page(None, 1500, 'C')
        await new_child(page)
        await page.wait_for_timeout(3500)
        s = await state(page)
        ok(not s['onboard'] and s['name'] == 'あたらしい' and s['cloud'] == 'あたらしい', '新しい子で はじめて クラウドにも 書く', s)
        await ctx.close()

        print('D. クラウドの 返事が とても おそい（8秒より あと）')
        ctx, page = await open_page(cloud_pet, 10000, 'D')
        await new_child(page)
        await page.wait_for_timeout(8600)
        s = await state(page)
        ok(not s['onboard'] and s['name'] == 'あたらしい', '8秒 まって 新しい子で はじめる', s)
        await page.wait_for_timeout(2500)
        s = await state(page)
        ok(s['name'] == 'クラウド' and 'あたらしい' not in s['sets'] and s['cloud'] == 'クラウド', 'あとから 届いても クラウドの子が 先（クラウドは 上書きしない）', s)
        await ctx.close()

        print('E. この端末に セーブが ある（いままでどおり）')
        ctx, page = await open_page(cloud_pet, 500, 'E')
        st = sample_state(); st['pet']['name'] = 'たんまつ'; st['updated'] = cloud_pet['updated'] + 3600e3
        await page.evaluate("v => { localStorage.setItem('uchinoko-biyori:v1', v); }", json.dumps(st))
        await page.reload(); await page.wait_for_timeout(2500)
        s = await state(page)
        ok(s['name'] == 'たんまつ' and s['cloud'] == 'たんまつ', 'この端末の 新しい セーブを クラウドに 書く', s)
        await ctx.close()

        print('F. うちのこラン（P5）：えらぶ → こうえん → ゴール、アジリティの バランス（シーソー）→ ゴール。ほうび・ベストが クラウドに 入る')
        ctx, page = await open_page(cloud_pet, 300, 'F')
        await page.wait_for_timeout(1500)
        await page.evaluate("() => { document.querySelectorAll('.levelup').forEach(e => e.remove()); Modal.q = []; Modal.busy = false; }")
        shots, n0 = [], len(errors)

        async def snap(name):
            path = os.path.join(args.out, f'claude_{len(shots) + 1:02d}_{name}.png')
            await page.screenshot(path=path)
            shots.append(path)
            for x in await page.evaluate(LOOKS_JS):
                errors.append(f'見た目（{name}）：{x}')
        mode = await page.evaluate("() => [Persist.mode, typeof RunUI, typeof RUN_SRC !== 'undefined' && RUN_SRC, !!(navigator.serviceWorker && navigator.serviceWorker.controller)]")
        ok(mode[0] == 'cloud' and mode[1] == 'object' and str(mode[2]).startswith('run-') and not mode[3],
           'クラウドの 保存・ランの 入口が ある・Service Worker なし', mode)
        await snap('room')
        await run_checks(page, ctx, snap, errors, args, port)
        await page.evaluate("() => { document.querySelectorAll('.levelup').forEach(e => e.remove()); Modal.q = []; Modal.busy = false; }")
        await page.wait_for_timeout(1600)   # クラウドへの 書きこみ（1.2秒 まとめて）
        ok(len(errors) == n0, 'ランの ためし（ホーム画面版と 同じ）', errors[n0:])
        c = await page.evaluate("() => ({ run: window.__cloud.doc && window.__cloud.doc.run, min: { park: RUN.courses.park.min, balance: RUN.courses.balance.min }, local: S.run, album: (window.__cloud.doc.album || []).slice(0, 4).map(a => a.ti) })")
        print('  クラウドの S.run：', json.dumps(c['run'], ensure_ascii=False))
        cr = c['run'] or {}
        ok(cr.get('best') == c['min'] and cr.get('games') == 2 and cr.get('n') == 2 and cr.get('clears') == 2 and cr == c['local']
           and any('こうえんで さいこう きろく' in a for a in c['album']) and any(a.startswith('バランスで さいこう きろく') for a in c['album']),
           'ほうびの 回数・ベスト・アルバムが クラウドの セーブに 入った', c)
        await page.reload(); await page.wait_for_timeout(2500)
        r = await page.evaluate("() => S.run")
        ok(r == cr, 'ひらきなおしても のこる', r)
        await ctx.close()
        # はじめての 端末（この端末に セーブが ない）：クラウドの子と いっしょに ベストも くる。コースを えらぶ 画面に ベスト
        ctx, page = await open_page(dict(cloud_pet, run=cr), 300, 'F2')
        await page.wait_for_timeout(2500)
        await page.evaluate("() => { document.querySelectorAll('.levelup').forEach(e => e.remove()); Modal.q = []; Modal.busy = false; RunUI.open(); }")
        await poll(page, "() => !!document.querySelector('#runPage .run-sel .run-course')", 60000)
        await page.wait_for_timeout(300)
        b = await page.evaluate("() => ({ run: S.run, park: 'ベスト ' + runSec(RUN.courses.park.min), best: [...document.querySelectorAll('#runPage .run-cb')].map(e => e.textContent.replace(/\\s+/g, ' ').trim()), note: document.querySelector('#runPage .run-sel-note').textContent })")
        await snap('select_cloud')
        ok(b['run'] == cr and b['best'][0] == b['park'] and 'あと1回' in b['note'], 'はじめての 端末でも クラウドの ベストと きょうの 回数', b)
        await page.evaluate("() => RunUI.close()")
        await ctx.close()
        print('  スクリーンショット：' + ', '.join(os.path.basename(x) for x in shots))
        await browser.close()
    httpd.shutdown()
    print(f'page errors: {len(errors)}')
    for e in errors:
        print('  ' + e)
    return 0 if all(results) and not errors else 1


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--fresh', action='store_true')
    ap.add_argument('--out', default=os.path.join(ROOT, 'smoke-out'))
    ap.add_argument('--line', action='store_true')
    ap.add_argument('--android-inset', type=int, default=0)
    ap.add_argument('--dark', action='store_true')
    ap.add_argument('--claude', action='store_true')
    ap.add_argument('--size', default='390x844', help='画面の 大きさ（はば x たかさ）。iPhone SE は 375x667、LINE の 中の SE は 375x603 くらい')
    a = ap.parse_args()
    raise SystemExit(asyncio.run(claude_cloud(a) if a.claude else main(a)))
