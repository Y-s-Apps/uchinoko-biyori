#!/usr/bin/env python3
"""うちのこラン（仮）P1：2D の 絵（renderPet）と 3D の うちのこ（src/run/pet3d.js の makePet3D）の 見くらべ。

リポジトリの ルートを 手元で 配信して tools/run/pet3d_compare.html を ひらき、1まいずつ（.sheet）スクリーンショットを とる。
だいずと 41しゅるい（犬22・ねこ19）・いくつかの 毛色・くびの きせかえ・走る ポーズ。

  python3 tools/run/pet3d_compare.py               # 既定の 保存先：smoke-out/pet3d/
  python3 tools/run/pet3d_compare.py --out DIR
  python3 tools/run/pet3d_compare.py --only daizu,shiba,daizu:scarf_tri --size 600 --out DIR   # 大きく くわしく
  python3 tools/run/pet3d_compare.py --gif daizu:scarf_tri --size 320                          # 走る アニメ（よこ・うしろから）

必要なもの：pip install playwright（Chromium は インストール済みの もの。WebGL は SwiftShader で 動く）、
cd tools/run && npm install（Three.js r170）。ページの エラーが 1件でも あれば 終了コード 1。
"""
import argparse, asyncio, http.server, os, socketserver, sys, threading

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class Quiet(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=ROOT, **k)

    def log_message(self, *a):
        pass


def serve():
    httpd = socketserver.ThreadingTCPServer(('127.0.0.1', 0), Quiet)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, httpd.server_address[1]


async def main(out, query='', gif=None):
    from playwright.async_api import async_playwright
    if not os.path.isfile(os.path.join(ROOT, 'tools', 'run', 'node_modules', 'three', 'build', 'three.module.js')):
        print('Three.js が ありません：cd tools/run && npm install', file=sys.stderr)
        return 1
    os.makedirs(out, exist_ok=True)
    httpd, port = serve()
    errors = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(args=['--use-angle=swiftshader', '--enable-unsafe-swiftshader'])
        page = await browser.new_page(viewport={'width': 800, 'height': 1200}, device_scale_factor=1)
        page.on('pageerror', lambda e: '__only__' not in str(e) and errors.append(str(e)))
        page.on('console', lambda m: m.type == 'error' and errors.append(m.text))
        await page.goto(f'http://127.0.0.1:{port}/tools/run/pet3d_compare.html' + query, wait_until='commit')
        await page.wait_for_function('document.body.dataset.done === "1" || document.getElementById("status").textContent.startsWith("error")', timeout=600000)
        if gif:
            import base64, io
            from PIL import Image
            frames = [Image.open(io.BytesIO(base64.b64decode(u.split(',', 1)[1]))).convert('RGB') for u in await page.evaluate('window.__frames')]
            pal = [f.quantize(colors=200, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE) for f in frames]
            path = os.path.join(out, gif)
            pal[0].save(path, save_all=True, append_images=pal[1:], duration=55, loop=0, optimize=True)
            print(path)
        sheets = [] if gif else await page.query_selector_all('.sheet')
        for i, s in enumerate(sheets, 1):
            path = os.path.join(out, f'pet3d-{i:02d}.png')
            await s.screenshot(path=path)
            print(path)
        await browser.close()
    httpd.shutdown()
    for e in errors:
        print('ERROR', e, file=sys.stderr)
    return 1 if errors else 0


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--out', default=os.path.join(ROOT, 'smoke-out', 'pet3d'))
    ap.add_argument('--only', help='くわしく 見る 子（品種の id か だいず＝daizu。くびは id:くびの id。カンマで いくつも）')
    ap.add_argument('--size', type=int, default=0, help='3D の 1まいの 大きさ（px）')
    ap.add_argument('--gif', help='走る アニメを GIF に（だいず＝daizu か 品種の id。くびは id:くびの id）')
    a = ap.parse_args()
    q = '&'.join(x for x in [a.only and 'only=' + a.only, a.gif and 'anim=' + a.gif, a.size and f'size={a.size}'] if x)
    name = a.gif and 'run-' + a.gif.replace(':', '-') + '.gif'
    sys.exit(asyncio.run(main(a.out, '?' + q if q else '', name)))
