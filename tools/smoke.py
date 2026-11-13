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
  python3 tools/smoke.py --claude   # Claude版（src/out/uchinoko-claude.html）：クラウドの セーブの まねで、はじめての画面の とちゅうに
                                    # クラウドの子が 届いたとき（診断 3-7）

見た目の確かめ（どの画面でも）：文字と地の色の差（ふつうの文字 4.5・大きい文字 3 より小さい）、11px より小さい文字、
シートの「とじる」の さわれる所（44px より小さい）を数える（診断 4-1・4-2・4-4）。ホーム画面版では、Service Worker が
自分のキャッシュだけを見るか（組織の ほかのアプリが 同じ URL を とっていても、オフラインで うちのこ日和が ひらく。診断 2-4）、
右上の ボタンの名前が むかえた日だけ 出るか（診断 4-5）も見る。

必要なもの：pip install playwright（Chromium はインストール済みのものを使います）
ページエラーか CSP の違反が1件でもあれば終了コード1で終わります。
"""
import argparse, asyncio, functools, http.server, json, os, socketserver, threading, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def serve(root=ROOT):
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=root)
    handler.log_message = lambda *a, **k: None
    httpd = socketserver.TCPServer(('127.0.0.1', 0), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, httpd.server_address[1]


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
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2,
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
        await page.click('#actFeed'); await page.wait_for_timeout(5500)
        await close_popups()
        await snap('after_meal')
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


async def claude_cloud(args):
    """Claude版：はじめての端末で、クラウドの セーブが 届く前に はじめての画面を 進めても、クラウドの子を 上書きしない（診断 3-7）"""
    from playwright.async_api import async_playwright
    import tempfile
    root = tempfile.mkdtemp(prefix='uchinoko-claude-')
    with open(os.path.join(ROOT, 'src', 'out', 'uchinoko-claude.html'), encoding='utf-8') as f, \
            open(os.path.join(root, 'index.html'), 'w', encoding='utf-8') as g:
        g.write('<meta charset="utf-8">\n' + f.read())
    httpd, port = serve(root)
    errors, results = [], []
    os.makedirs(args.out, exist_ok=True)

    def ok(cond, label, info=None):
        results.append(cond)
        print(('  ok   ' if cond else '  FAIL ') + label + ('' if cond or info is None else '  ' + json.dumps(info, ensure_ascii=False)[:300]))

    cloud_pet = sample_state()
    cloud_pet['pet']['name'] = 'クラウド'
    async with async_playwright() as p:
        browser = await p.chromium.launch()

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
    a = ap.parse_args()
    raise SystemExit(asyncio.run(claude_cloud(a) if a.claude else main(a)))
