"""LINEミニアプリのアイコン（130×130 の PNG）を作る：python3 src/icons/render_line.py → src/icons/line-icon-130.png
LINE Developers の LINEミニアプリチャネル →「チャネル基本設定」のチャネルアイコンに入れる（変えると再審査）。"""
import asyncio, os
from playwright.async_api import async_playwright
from PIL import Image
D = os.path.dirname(os.path.abspath(__file__)); U = os.path.dirname(D)
src = ''.join(open(os.path.join(U, f)).read() for f in ['js_data.js','js_data2.js','js_pet.js','js_wear.js']) + open(os.path.join(D,'lab.js')).read() + open(os.path.join(D,'line_icon.js')).read()
html = f"""<!doctype html><meta charset="utf-8"><body style="margin:0;background:#888"><div id="out"></div><script>{src}
document.head.insertAdjacentHTML('beforeend','<style>'+CSS+'.icon130{{position:relative;width:1040px;height:1040px;overflow:hidden}}</style>');
document.getElementById('out').innerHTML = LINE_ICON();
</script></body>"""
async def main():
    tmp = os.path.join(D, 'line-lab.html'); big = os.path.join(D, 'line-icon-1040.png')
    open(tmp, 'w').write(html)
    try:
        async with async_playwright() as p:
            b = await p.chromium.launch(); pg = await b.new_page(viewport={'width':1040,'height':1040})
            errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
            await pg.goto('file://' + tmp); await pg.wait_for_timeout(500)
            await (await pg.query_selector('.icon130')).screenshot(path=big)
            await b.close()
        Image.open(big).convert('RGB').resize((130, 130), Image.LANCZOS).save(os.path.join(D, 'line-icon-130.png'), optimize=True)
        print('errors', errs)
    finally:
        for f in (tmp, big):
            if os.path.exists(f): os.remove(f)
asyncio.run(main())
