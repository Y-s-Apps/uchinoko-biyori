"""確認用：Google Fonts のかわりに、手元のフォント（tools/fonts の @fontsource）を出す。

作業環境からは Google Fonts に とどかないので、そのままだと ほかのフォントで表示され、改行の位置が iPhone と ちがってしまう。
はじめに `cd tools/fonts && npm install`。フォントがないときは なにもしない（いままでどおり）。
"""
import os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT_DIR = os.path.join(ROOT, 'tools', 'fonts', 'node_modules', '@fontsource')
FAMILIES = [('zen-maru-gothic', ['500', '700', '900']), ('mochiy-pop-one', ['400'])]
CORS = {'access-control-allow-origin': '*'}


def available():
    return all(os.path.isdir(os.path.join(FONT_DIR, pkg)) for pkg, _ in FAMILIES)


def css():
    out = []
    for pkg, weights in FAMILIES:
        for w in weights:
            with open(os.path.join(FONT_DIR, pkg, w + '.css'), encoding='utf-8') as f:
                out.append(f.read().replace('url(./files/', f'url(https://fonts.gstatic.com/__local/{pkg}/files/'))
    return '\n'.join(out)


async def install(ctx):
    """Playwright の context に、Google Fonts の CSS とフォントを手元から返す route を入れる。入れたら True"""
    if not available():
        return False
    body = css()

    async def on_css(route):
        await route.fulfill(status=200, content_type='text/css', body=body, headers=CORS)

    async def on_font(route):
        m = re.search(r'/__local/([a-z-]+)/files/([\w.-]+\.woff2?)$', route.request.url)
        path = m and os.path.join(FONT_DIR, m.group(1), 'files', m.group(2))
        if not path or not os.path.isfile(path):
            return await route.fulfill(status=404, body='', headers=CORS)
        with open(path, 'rb') as f:
            await route.fulfill(status=200, content_type='font/woff2' if path.endswith('2') else 'font/woff',
                                body=f.read(), headers=CORS)

    await ctx.route('https://fonts.googleapis.com/**', on_css)
    await ctx.route('https://fonts.gstatic.com/**', on_font)
    return True
