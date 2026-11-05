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
                                        is_mobile=True, has_touch=True, timezone_id='Asia/Tokyo', locale='ja-JP')
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
        await browser.close()
    httpd.shutdown()
    print('screenshots:')
    for s in shots:
        print('  ' + s)
    print(f'page errors: {len(errors)}')
    for e in errors:
        print('  ' + e)
    return 1 if errors else 0


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--fresh', action='store_true')
    ap.add_argument('--out', default=os.path.join(ROOT, 'smoke-out'))
    ap.add_argument('--line', action='store_true')
    ap.add_argument('--android-inset', type=int, default=0)
    raise SystemExit(asyncio.run(main(ap.parse_args())))
