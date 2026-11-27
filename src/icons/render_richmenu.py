"""LINE公式アカウントの リッチメニューの 画像（2500×843・小・1つの エリア）を 作る（2026-11-27）。

公式アカウントは おしらせ専用で、友だち追加しても ミニアプリを ひらく 入口が なかった（オーナーの お父さんが あそべなかった）。
LINE Official Account Manager の［トークルーム管理］→［リッチメニュー］で この 画像を アップロードし、
アクションを「リンク」・URL を 本番用の LIFF URL（https://miniapp.line.me/2012410265-PutgsCLS）に する。

  python3 src/icons/render_richmenu.py   → src/icons/richmenu-2500x843.png
はじめに cd tools/fonts && npm install（Mochiy Pop One・Zen Maru Gothic。アプリと 同じ フォント）。
"""
import asyncio
import pathlib
import tempfile

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent.parent
FONTS = ROOT / 'tools' / 'fonts' / 'node_modules' / '@fontsource'
OUT = HERE / 'richmenu-2500x843.png'
ICON = ROOT / 'icon-512.png'

HTML = '''<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="{f}/mochiy-pop-one/japanese-400.css">
<link rel="stylesheet" href="{f}/mochiy-pop-one/latin-400.css">
<link rel="stylesheet" href="{f}/zen-maru-gothic/japanese-700.css">
<link rel="stylesheet" href="{f}/zen-maru-gothic/latin-700.css">
<style>
html,body{{margin:0;padding:0}}
.m{{width:2500px;height:843px;position:relative;overflow:hidden;
  background:radial-gradient(rgba(255,255,255,.65) 7px,transparent 8px) 0 0/66px 66px,#FFF3DF;
  font-family:'Zen Maru Gothic',sans-serif;color:#4A3B52}}
.ic{{position:absolute;left:150px;top:131px;width:540px;height:540px;border-radius:120px;
  box-shadow:0 18px 0 rgba(74,59,82,.12);overflow:hidden;border:10px solid #fff}}
.ic img{{width:100%;height:100%;display:block}}
.tx{{position:absolute;left:800px;top:150px;right:120px}}
.t1{{font-family:'Mochiy Pop One',sans-serif;font-size:150px;line-height:1.1;letter-spacing:2px}}
.t2{{margin-top:34px;font-size:72px;font-weight:700;color:#6B5A73}}
.btn{{position:absolute;left:800px;bottom:118px;height:150px;padding:0 90px;border-radius:75px;background:#E2557A;color:#fff;
  font-family:'Mochiy Pop One',sans-serif;font-size:84px;display:flex;align-items:center;gap:30px;box-shadow:0 14px 0 #B83A5C}}
.tri{{position:absolute;left:0;right:0;bottom:0;height:34px;display:flex}}
.tri i{{flex:1}}
</style></head><body>
<div class="m">
  <div class="ic"><img src="{icon}"></div>
  <div class="tx"><div class="t1">うちのこ日和で あそぶ</div><div class="t2">タップすると アプリが ひらくよ</div></div>
  <div class="btn">あそぶ <span style="font-size:70px">▶</span></div>
  <div class="tri"><i style="background:#1F4FA0"></i><i style="background:#fff"></i><i style="background:#D7263D"></i></div>
</div></body></html>
'''


async def main():
    from playwright.async_api import async_playwright
    with tempfile.TemporaryDirectory() as d:
        page_path = pathlib.Path(d) / 'richmenu.html'
        page_path.write_text(HTML.format(f=FONTS.as_uri(), icon=ICON.as_uri()), encoding='utf-8')
        async with async_playwright() as p:
            b = await p.chromium.launch(args=['--allow-file-access-from-files'])
            pg = await b.new_page(viewport={'width': 2500, 'height': 843})
            await pg.goto(page_path.as_uri())
            await pg.evaluate('document.fonts.ready')
            await pg.wait_for_timeout(800)
            fams = await pg.evaluate("[...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family))]")
            if len(fams) < 2:
                raise SystemExit('フォントが 読めません（cd tools/fonts && npm install）：' + repr(fams))
            await pg.screenshot(path=str(OUT), clip={'x': 0, 'y': 0, 'width': 2500, 'height': 843})
            await b.close()
    size = OUT.stat().st_size
    print(OUT, size, 'バイト')
    if size > 1024 * 1024:
        raise SystemExit('1MB より 大きい（LINE の 上限）')


asyncio.run(main())
