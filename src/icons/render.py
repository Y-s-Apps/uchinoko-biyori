import sys, asyncio, os
from playwright.async_api import async_playwright
D = os.path.dirname(os.path.abspath(__file__)); U = os.path.dirname(D)
which = sys.argv[1:] or ['A','B','C','D','E']
src = ''.join(open(os.path.join(U, f)).read() for f in ['js_data.js','js_data2.js','js_pet.js','js_wear.js']) + open(os.path.join(D,'lab.js')).read()
html = f"""<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&display=swap">
<body style="margin:0;background:#888"><div id="out"></div><script>{src}
document.head.insertAdjacentHTML('beforeend','<style>'+CSS+'</style>');
</script></body>"""
open(os.path.join(D,'lab.html'),'w').write(html)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width':1024,'height':1024})
        errs=[]; pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('file://' + os.path.join(D,'lab.html')); await pg.wait_for_timeout(600)
        for k in which:
            await pg.evaluate(f"document.getElementById('out').innerHTML = ICONS['{k}']()")
            await pg.wait_for_timeout(150)
            el = await pg.query_selector('.icon')
            await el.screenshot(path=os.path.join(D, f'icon_{k}.png'))
        print('errors', errs); await b.close()
asyncio.run(main())
