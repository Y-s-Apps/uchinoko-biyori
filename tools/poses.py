#!/usr/bin/env python3
"""うちのこの 体勢と 動き（docs/MOTION_DESIGN.md）の 確かめ：2D の 絵（renderPet）を 一覧に して、前の 版と 1px で くらべる。

いまの src/（js_data*.js・js_pet.js・js_wear.js と head.html の CSS）と、くらべる 版（--ref。既定は HEAD）の 同じ ファイルで
1まいの ページを 2つ 作り、同じ 場面を 同じ 時刻で とめて スクリーンショットを とり、1px でも ちがえば しらせる。

  場面：41種 ×（きせかえ なし・あたま／かお／くびの 組みあわせ）、きせかえ 48こ を 1つずつ（だいず〈クリームの ポメラニアン〉と 猫）、
        表情（ex-*）・ねる（pose-sleep）・げい（tr-*）・くびかしげ（tilt）・しっぽ（wag-fast）を、アニメの とちゅうの いくつかの 時刻で。
        CSS なしの 絵（うちのこカード CardArt と 同じ 形）も。
  ほかに 数える もの（いまの 版だけ）：絵が わく（viewBox 240）から どれだけ はみ出すか（--max-out）、
        体勢の 場面で 首（pv-neck）が 頭（pv-head）と どれだけ ずれるか（--max-neck。きせかえの 首が ずれない ように）。

  python3 tools/poses.py                    # HEAD と くらべる。一覧の PNG は smoke-out/poses/
  python3 tools/poses.py --ref b5e13c4      # くらべる 版
  python3 tools/poses.py --no-ref           # くらべない（一覧と はみだし・首の ずれ だけ）
  python3 tools/poses.py --dark             # ダーク（prefers-color-scheme: dark）
  python3 tools/poses.py --only sit,sleep   # 場面を しぼる

必要なもの：pip install playwright pillow（Chromium）。ちがい・はみだし・ずれ・ページの エラーが 1つでも あれば 終了コード 1。
"""
import argparse, asyncio, io, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JS_FILES = ['js_data.js', 'js_data2.js', 'js_data3.js', 'js_pet.js', 'js_wear.js']
# ソフトウェアで 1つずつ 描く（GPU や 並べての 描画だと、同じ 版どうしでも ふちの 色が すこし ゆれて くらべられない）
CHROMIUM_ARGS = ['--disable-gpu', '--disable-gpu-compositing', '--disable-partial-raster', '--num-raster-threads=1',
                 '--disable-threaded-animation', '--disable-lcd-text', '--disable-skia-runtime-opts']

# 場面：(名前, 入れものの クラス, とめる 時刻〈ミリ秒〉のリスト, 体勢か〈首と 頭の ずれを 数える〉)
STATES = [
    ('sit',       '',                     [0, 450, 900, 1700, 5160], True),
    ('happy',     'ex-happy',             [0],                       False),
    ('sad',       'ex-sad',               [0],                       False),
    ('sleepface', 'ex-sleep',             [0],                       False),
    ('eat',       'ex-eat',               [0, 160, 320],             False),
    ('wagfast',   'wag-fast',             [95, 190],                 False),
    ('tilt',      'tilt',                 [175, 350, 500, 800],      False),
    ('sleep',     'pose-sleep ex-sleep',  [0, 2300],                 True),
    ('down',      'tr-down',              [0],                       True),
    ('paw',       'tr-paw',               [320, 600, 1200],          False),
    ('high',      'tr-high',              [400, 800],                False),
    ('punch',     'tr-punch',             [175, 350],                False),
    ('bow',       'tr-bow',               [420, 700],                False),
    ('dance',     'tr-dance',             [180, 450, 1300],          False),
]
CARD_CSS = '.pv-eyes-open,.pv-eyes-closed,.pv-brow-sad,.pv-mouth-w{display:none}.pv-cheek{opacity:.8}'   # js_line.js の CardArt と 同じ

HARNESS_CSS = r'''
html,body{margin:0!important;padding:0!important;background:#F4EFE8!important;min-height:0!important}
#psxGrid{display:grid;grid-template-columns:repeat(12,120px);padding:8px;width:max-content;background:#F4EFE8}
.psx-cell{width:120px;height:136px;position:relative}
.psx-w{position:absolute;left:10px;top:8px;width:100px;height:100px}
.psx-w .pet-svg{display:block;width:100%;height:100%;overflow:visible}
.psx-lb{position:absolute;left:0;right:0;bottom:2px;text-align:center;font:10px/1.1 monospace;color:#555;white-space:nowrap;overflow:hidden;word-break:normal}
@media (prefers-color-scheme: dark){html,body,#psxGrid{background:#1B1922!important}.psx-lb{color:#bbb}}
'''

HARNESS_JS = r'''
(() => {
  const daizu = { species:'dog', breedId:'pomeranian', ear:'small', coat:'fluffy', muzzle:'short', tail:'plume', face:'lower',
    colors:{ main:'#F3DDB3', face:'#FBF1DD', chest:'#FBF1DD' } };
  const cat = BREEDS.find(b => b.sp === 'cat');
  const catLook = Object.assign({ species:'cat', breedId:cat.id }, cat.look);
  const by = s => WEAR.filter(w => w.slot === s);
  const H = by('head'), F = by('face'), N = by('neck');
  const cases = [{ label:'daizu', look:daizu, wear:{ head:null, face:null, neck:'scarf_tri' } }];
  BREEDS.forEach((b, i) => {
    const look = Object.assign({ species:b.sp, breedId:b.id }, b.look);
    cases.push({ label:b.id, look, wear:null });
    cases.push({ label:b.id + '+', look, wear:{ head:H[i % H.length].id, face:i % 3 === 0 ? F[i % F.length].id : null, neck:N[(i * 5) % N.length].id } });
  });
  WEAR.forEach(w => {
    cases.push({ label:'d:' + w.id, look:daizu, wear:{ head:null, face:null, neck:null, [w.slot]:w.id } });
    cases.push({ label:'c:' + w.id, look:catLook, wear:{ head:null, face:null, neck:null, [w.slot]:w.id } });
  });
  const g = document.getElementById('psxGrid');
  g.innerHTML = cases.map(c => `<div class="psx-cell"><div class="psx-w">${renderPet(c.look, c.wear ? { wear:c.wear } : {})}</div><div class="psx-lb">${c.label}</div></div>`).join('');
  window.psx = {
    n: cases.length,
    labels: cases.map(c => c.label),
    set(cls){ document.querySelectorAll('.psx-w').forEach(w => { w.className = 'psx-w' + (cls ? ' ' + cls : ''); }); },
    /* アニメは その 時刻で とめる。transition（体勢の うつりかわり）は おわりまで */
    freeze(t){
      for (const a of document.getAnimations()){
        if (typeof CSSTransition !== 'undefined' && a instanceof CSSTransition) a.finish();
        else { a.pause(); a.currentTime = t; }
      }
    },
    /* わく（viewBox 240）からの はみだし（いちばん 大きい ところ）と、首と 頭の ずれ */
    measure(){
      let out = { v:0, at:'' }, neck = { v:0, at:'' };
      const ws = document.querySelectorAll('.psx-w');
      ws.forEach((w, i) => {
        const wr = w.getBoundingClientRect(), k = 240 / wr.width;
        const a = w.querySelector('.pv-all');
        if (a){
          const r = a.getBoundingClientRect();
          const o = Math.max(wr.left - r.left, r.right - wr.right, wr.top - r.top, r.bottom - wr.bottom, 0) * k;
          if (o > out.v) out = { v:o, at:cases[i].label };
        }
        const h = w.querySelector('.pv-head'), n = w.querySelector('.pv-neck');
        if (h && n && h.getScreenCTM && n.getScreenCTM()){
          const hm = h.getScreenCTM(), nm = n.getScreenCTM();
          for (const [x, y] of [[120, 146], [120, 100], [80, 150], [160, 150]]){
            const px = (m) => ({ x:m.a * x + m.c * y + m.e, y:m.b * x + m.d * y + m.f });
            const p = px(hm), q = px(nm), d = Math.hypot(p.x - q.x, p.y - q.y) * k;
            if (d > neck.v) neck = { v:d, at:cases[i].label };
          }
        }
      });
      return { out, neck };
    },
  };
})();
'''


def read_src(name, ref):
    if ref is None:
        with open(os.path.join(ROOT, 'src', name), encoding='utf-8') as f:
            return f.read()
    return subprocess.run(['git', '-C', ROOT, 'show', f'{ref}:src/{name}'], check=True, capture_output=True).stdout.decode('utf-8')


def page_html(ref, css=True, extra_css=''):
    head = read_src('head.html', ref)
    styles = '\n'.join(re.findall(r'<style[^>]*>(.*?)</style>', head, re.S)) if css else ''
    js = '\n'.join(read_src(f, ref) for f in JS_FILES)
    js = js.replace('</script', '<\\/script')
    return (f'<!doctype html><html><head><meta charset="utf-8"><style>{styles}</style><style>{HARNESS_CSS}{extra_css}</style></head>'
            f'<body><div id="psxGrid"></div><script>{js}\n{HARNESS_JS}</script></body></html>')


async def shoot(page, cls, t):
    await page.evaluate('cls => psx.set(cls)', cls)
    await page.evaluate('t => psx.freeze(t)', t)
    await page.evaluate('() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))')
    await page.evaluate('t => psx.freeze(t)', t)   # 2回め：クラスを かえた あとに 生まれた アニメも
    return await steady(page)


async def steady(page):
    """2回 つづけて 同じに なるまで とる（念のため。5回まで）"""
    el = await page.query_selector('#psxGrid')
    prev = await el.screenshot()
    for _ in range(4):
        cur = await el.screenshot()
        if cur == prev:
            break
        prev = cur
    return prev


def diff(a, b):
    from PIL import Image, ImageChops
    # RGB で くらべる（RGBA の getbbox() は 透明度だけを 見るので、色の ちがいを 見のがす）
    A, B = Image.open(io.BytesIO(a)).convert('RGB'), Image.open(io.BytesIO(b)).convert('RGB')
    if A.size != B.size:
        return -1, None
    d = ImageChops.difference(A, B)
    if not d.getbbox():
        return 0, None
    r, g, b = d.split()
    m = ImageChops.lighter(ImageChops.lighter(r, g), b).point(lambda v: 255 if v else 0)   # どれかの 色が 1 でも ちがう 点
    return m.histogram()[255], m


async def main(a):
    from playwright.async_api import async_playwright
    out = a.out
    os.makedirs(out, exist_ok=True)
    states = [s for s in STATES if not a.only or s[0] in a.only.split(',')]
    errors, problems = [], []
    async with async_playwright() as p:
        browser = await p.chromium.launch(args=CHROMIUM_ARGS)
        ctx = await browser.new_context(viewport={'width': 1500, 'height': 1000}, device_scale_factor=1,
                                        color_scheme='dark' if a.dark else 'light', reduced_motion='no-preference')

        async def open_page(ref, css=True, extra=''):
            pg = await ctx.new_page()
            pg.on('pageerror', lambda e: errors.append(f'{ref or "いま"}: {e}'))
            await pg.set_content(page_html(ref, css, extra))
            await pg.wait_for_function('window.psx && psx.n > 0')
            return pg

        new = await open_page(None)
        old = None if a.no_ref else await open_page(a.ref)
        n = await new.evaluate('psx.n')
        if old is not None and n != await old.evaluate('psx.n'):
            problems.append('場面の 数が ちがう（ためしの 作り方の まちがい）')
        print(f'場面：{n} こ × {sum(len(s[2]) for s in states)} とおり（{a.ref if old else "くらべない"}）')
        same = total = 0
        for name, cls, times, pose in states:
            for i, t in enumerate(times):
                img = await shoot(new, cls, t)
                if i == 0:
                    with open(os.path.join(out, f'poses-{name}.png'), 'wb') as f:
                        f.write(img)
                m = await new.evaluate('psx.measure()')
                if m['out']['v'] > a.max_out:
                    problems.append(f'{name}@{t}ms：わくから {m["out"]["v"]:.1f} はみだす（{m["out"]["at"]}）')
                if pose and m['neck']['v'] > a.max_neck:
                    problems.append(f'{name}@{t}ms：首と 頭が {m["neck"]["v"]:.1f} ずれる（{m["neck"]["at"]}）')
                note = f'はみだし {m["out"]["v"]:.1f}' + (f'・首 {m["neck"]["v"]:.1f}' if pose else '')
                if old is not None:
                    total += 1
                    n_px, d = diff(await shoot(old, cls, t), img)
                    if n_px == 0:
                        same += 1
                        print(f'  {name:10s} {t:5d}ms  おなじ   {note}')
                    else:
                        problems.append(f'{name}@{t}ms：前と {n_px} px ちがう')
                        print(f'  {name:10s} {t:5d}ms  ちがう {n_px}px  {note}')
                        if d is not None:
                            d.save(os.path.join(out, f'diff-{name}-{t}.png'))
                else:
                    print(f'  {name:10s} {t:5d}ms  {note}')
        # CSS なし（うちのこカードと 同じ。ページの CSS が 効かない ところ）
        if old is not None and not a.only:
            for label, extra in (('nocss', ''), ('card', CARD_CSS)):
                pn, po = await open_page(None, False, extra), await open_page(a.ref, False, extra)
                n_px, d = diff(await steady(po), await steady(pn))
                total += 1
                if n_px == 0:
                    same += 1
                    print(f'  {label:10s}          おなじ')
                else:
                    problems.append(f'{label}：前と {n_px} px ちがう')
                    print(f'  {label:10s}          ちがう {n_px}px')
                await pn.close(); await po.close()
        await browser.close()
    if old is not None:
        print(f'くらべた：{total} とおり、おなじ {same}')
    for e in errors:
        print('ERROR', e, file=sys.stderr)
    for q in problems:
        print('NG', q, file=sys.stderr)
    print(f'一覧：{out}')
    return 1 if errors or problems else 0


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--ref', default='HEAD', help='くらべる 版（git の コミット。既定 HEAD）')
    ap.add_argument('--no-ref', action='store_true', help='くらべない')
    ap.add_argument('--out', default=os.path.join(ROOT, 'smoke-out', 'poses'))
    ap.add_argument('--dark', action='store_true')
    ap.add_argument('--only', help='場面の 名前（カンマで いくつも）')
    ap.add_argument('--max-out', type=float, default=30, help='わくから はみだして よい 大きさ（viewBox の 単位。240 が わく）')
    ap.add_argument('--max-neck', type=float, default=2, help='体勢の 場面で 首と 頭が ずれて よい 大きさ（viewBox の 単位）')
    sys.exit(asyncio.run(main(ap.parse_args())))
