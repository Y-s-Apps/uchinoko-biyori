#!/usr/bin/env python3
"""うちのこの 体勢と 動き（docs/MOTION_DESIGN.md）の 確かめ：2D の 絵（renderPet・よこむきの renderPetSide）を 一覧に して、前の 版と 1px で くらべる。

いまの src/（js_data*.js・js_pet.js・js_wear.js と head.html の CSS）と、くらべる 版（--ref。既定は HEAD）の 同じ ファイルで
1まいの ページを 2つ 作り、同じ 場面を 同じ 時刻で とめて スクリーンショットを とり、1px でも ちがえば しらせる。

  場面：41種 ×（きせかえ なし・あたま／かお／くびの 組みあわせ）、きせかえ 48こ を 1つずつ（だいず〈クリームの ポメラニアン〉と 猫）、
        表情（ex-*）・ねる（pose-sleep）・げい（tr-*）・くびかしげ（tilt）・しっぽ（wag-fast）・しぐさ（g-*。2026-11-26 だんかい 1）・
        体勢（ふせる・おねだり・ごろん。2026-11-27 だんかい 2）を、アニメの とちゅうの いくつかの 時刻で。CSS なしの 絵（うちのこカード CardArt と 同じ 形）も。
        よこむきの 絵（renderPetSide。だんかい 2）も 同じ 41種 × きせかえで：たつ・あるく（とちゅうの コマ）・のび・くんくん・耳ぴく・しっぽ・はぁはぁ・表情（名前は s-*）。
        うしろすがた（renderPetBack。だんかい 4）も 同じ 41種 × きせかえで：すわる・見あげる・ふせる・あるく（とちゅうの コマ）・耳ぴく・きょろきょろ・かしげる（名前は b-*）。
        くらべる 版の head.html に ない クラスの 場面（あたらしい しぐさ・体勢）は くらべず「あたらしい」と 出す（一覧の PNG で 目で 見る）。
  ほかに 数える もの（いまの 版だけ）：絵が わく（viewBox 240）から どれだけ はみ出すか（--max-out）、
        体勢と 頭を うごかす しぐさの 場面で 首（pv-neck-g）が 頭（pv-head-g）と どれだけ ずれるか（--max-neck。きせかえの 首が ずれない ように）。

  python3 tools/poses.py                    # HEAD と くらべる。一覧の PNG は smoke-out/poses/
  python3 tools/poses.py --ref b5e13c4      # くらべる 版
  python3 tools/poses.py --no-ref           # くらべない（一覧と はみだし・首の ずれ だけ）
  python3 tools/poses.py --dark             # ダーク（prefers-color-scheme: dark）
  python3 tools/poses.py --only sit,sleep   # 場面を しぼる
  python3 tools/poses.py --changed down,sleep   # 見た目を かえる つもりの 場面（ちがっても NG に しない。一覧の PNG と diff で 目で 見る）

必要なもの：pip install playwright pillow（Chromium）。ちがい・はみだし・ずれ・ページの エラーが 1つでも あれば 終了コード 1。
"""
import argparse, asyncio, io, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JS_FILES = ['js_data.js', 'js_data2.js', 'js_data3.js', 'js_pet.js', 'js_wear.js']
# ソフトウェアで 1つずつ 描く（GPU や 並べての 描画だと、同じ 版どうしでも ふちの 色が すこし ゆれて くらべられない）
CHROMIUM_ARGS = ['--disable-gpu', '--disable-gpu-compositing', '--disable-partial-raster', '--num-raster-threads=1',
                 '--disable-threaded-animation', '--disable-lcd-text', '--disable-skia-runtime-opts']

# 場面：(名前, 入れものの クラス, とめる 時刻〈ミリ秒〉のリスト, 首と 頭の ずれを 数えるか〈体勢と 頭を うごかす しぐさ〉[, 'side'＝よこむきの 絵・'back'＝うしろすがた])
# くらべる 版の head.html に その クラスが ない 場面（あたらしい しぐさ など）・くらべる 版に ない 絵（よこむき）は くらべない（一覧と はみだし・首の ずれ だけ）
# 体勢の 部品（pvx-*）は 0.35秒で ふわっと 出る（pvxIn）ので、体勢の 場面は 400ms より あとで とめる
STATES = [
    ('sit',       '',                     [0, 450, 900, 1700, 5160], True),
    ('happy',     'ex-happy',             [0],                       False),
    ('sad',       'ex-sad',               [0],                       False),
    ('sleepface', 'ex-sleep',             [0],                       False),
    ('eat',       'ex-eat',               [0, 160, 320],             False),
    ('wagfast',   'wag-fast',             [95, 190],                 False),
    ('tilt',      'tilt',                 [175, 350, 500, 800],      False),
    ('sleep',     'pose-sleep ex-sleep',  [400, 2300],               True),
    ('down',      'tr-down',              [400],                     True),
    ('paw',       'tr-paw',               [320, 600, 1200],          False),
    ('high',      'tr-high',              [400, 800],                False),
    ('punch',     'tr-punch',             [175, 350],                False),
    ('bow',       'tr-bow',               [420, 700],                False),
    ('dance',     'tr-dance',             [180, 450, 1300],          False),
    # しぐさ（だんかい 1。2026-11-26）。g-shake の からだの ゆれは #petArt（わくの 外がわ）なので ここには 出ない
    ('g-ear',     'g-ear',                [100, 250, 420],           False),
    ('g-look',    'g-look',               [450, 1250],               True),
    ('g-yawn',    'g-yawn',               [600, 1000],               True),
    ('g-shake',   'g-shake',              [150, 250],                False),
    ('g-scratch', 'g-scratch',            [300, 800, 1400],          True),
    ('g-groom',   'g-groom',              [500, 1100, 1400, 1800],   True),
    ('g-sway',    'g-sway',               [600, 1200],               False),
    ('g-tailup',  'g-tailup',             [500],                     False),
    ('g-pant',    'g-pant',               [0, 130],                  True),
    ('g-lick',    'g-lick',               [250, 480, 620],           False),
    ('g-yawn-sad', 'g-yawn ex-sad',       [800],                     True),
    ('g-ear-sleep', 'g-ear pose-sleep ex-sleep', [400],              True),
    # 体勢（だんかい 2。2026-11-27）：ふせる・おねだり・ごろん（A おなか＝正面の 絵を さかさに）
    ('p-down',    'pose-down',            [400, 1700],               True),
    ('p-down-look', 'pose-down g-look',   [450],                     True),
    ('p-beg',     'pose-beg',             [400, 850],                True),
    ('p-side',    'pose-side',            [400, 850],                True),
    ('p-side-sad', 'pose-side ex-sad',    [400],                     True),
    # よこむきの 絵（だんかい 2）
    ('s-stand',   '',                     [0, 1700, 5200],           False, 'side'),
    ('s-walk',    'pose-walk',            [0, 140, 280, 420],        False, 'side'),
    ('s-happy',   'ex-happy',             [0],                       False, 'side'),
    ('s-sleepface', 'ex-sleep',           [0],                       False, 'side'),
    ('s-tilt',    'tilt',                 [400],                     False, 'side'),
    ('s-ear',     'g-ear',                [110],                     False, 'side'),
    ('s-tailup',  'g-tailup',             [500],                     False, 'side'),
    ('s-sway',    'g-sway',               [1200],                    False, 'side'),
    ('s-pant',    'g-pant',               [0],                       False, 'side'),
    ('s-sniff',   'g-sniff',              [300, 900],                False, 'side'),
    ('s-stretch', 'g-stretch',            [500, 1000],               False, 'side'),
    # だんかい 3（2026-11-27）：ばんざい・前のめり・ふせて 見あげる・見あげる（正面）、あそぼ・とびつく・げい「のびー」（よこむき）
    ('p-cheer',   'pose-cheer',           [400, 610],                True),
    ('p-cheer-leave', 'leave-cheer',      [120],                     False),
    ('p-lean',    'pose-lean',            [600],                     True),
    ('p-down-up', 'pose-down ex-sad look-up', [450],                 True),
    ('g-lookup',  'g-lookup',             [500],                     True),
    ('s-bow',     'pose-bow',             [600],                     False, 'side'),
    ('s-pounce',  'g-pounce',             [230],                     False, 'side'),
    ('s-trstretch', 'view-side tr-stretch', [600],                   False, 'side'),
    # うしろすがた（だんかい 4。2026-11-27）。首の きせかえは 頭の 外（うなじ）なので 首の ずれは 数えない
    ('b-sit',     '',                     [0, 650, 1300],            False, 'back'),
    ('b-up',      'pose-bup',             [600],                     False, 'back'),
    ('b-down',    'pose-bdown',           [600],                     False, 'back'),
    ('b-walk',    'pose-bwalk',           [0, 140, 280, 420],        False, 'back'),
    ('b-ear',     'g-ear',                [150],                     False, 'back'),
    ('b-look',    'g-look',               [450, 1250],               False, 'back'),
    ('b-tilt',    'tilt',                 [400],                     False, 'back'),
    ('b-wag',     'wag-fast',             [95],                      False, 'back'),
]
# はみだしの 上限を 場面ごとに ゆるめる ところ（--max-out の かわり。はかり方は 形ごとの 外わくなので、まわした 形は 大きめに 出る）。
# 2026-11-27 に ピクセルで はかった ほんとうの はみだし：ごろん 40（下。うさぎのみみ・大きい 耳が さかさで ゆかの 前へ。体勢は 止まった まま＝
# svg ごと まわすので グループが わくの 外へ うごく アニメでは ない）、のび 17（右。みじかい足の 前足の 先）、くんくん 0
OUT_OK = {'p-side': 50, 'p-side-sad': 50, 's-sniff': 36, 's-stretch': 40, 's-bow': 40, 's-pounce': 40, 's-trstretch': 40}
CARD_CSS = '.pv-eyes-open,.pv-eyes-closed,.pv-brow-sad,.pv-mouth-w{display:none}.pv-cheek{opacity:.8}'   # js_line.js の CardArt と 同じ

HARNESS_CSS = r'''
html,body{margin:0!important;padding:0!important;background:#F4EFE8!important;min-height:0!important}
#psxGrid,#psxSide,#psxBack{display:grid;grid-template-columns:repeat(12,120px);padding:8px;width:max-content;background:#F4EFE8}
.psx-cell{width:120px;height:136px;position:relative}
.psx-w{position:absolute;left:10px;top:8px;width:100px;height:100px}
.psx-w .pet-svg{display:block;width:100%;height:100%;overflow:visible}
.psx-lb{position:absolute;left:0;right:0;bottom:2px;text-align:center;font:10px/1.1 monospace;color:#555;white-space:nowrap;overflow:hidden;word-break:normal}
@media (prefers-color-scheme: dark){html,body,#psxGrid,#psxSide,#psxBack{background:#1B1922!important}.psx-lb{color:#bbb}}
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
  /* おへやと 同じに 正面の 絵は .view-f の 中（ごろん は svg ごと まわす）。よこむきの 絵（renderPetSide）は べつの 一覧（くらべる 版に なければ 空） */
  const g = document.getElementById('psxGrid');
  g.innerHTML = cases.map(c => `<div class="psx-cell"><div class="psx-w"><div class="view-f">${renderPet(c.look, c.wear ? { wear:c.wear } : {})}</div></div><div class="psx-lb">${c.label}</div></div>`).join('');
  const side = typeof renderPetSide === 'function';
  document.getElementById('psxSide').innerHTML = side ? cases.map(c => `<div class="psx-cell"><div class="psx-w">${renderPetSide(c.look, c.wear ? { wear:c.wear } : {})}</div><div class="psx-lb">${c.label}</div></div>`).join('') : '';
  const back = typeof renderPetBack === 'function';
  document.getElementById('psxBack').innerHTML = back ? cases.map(c => `<div class="psx-cell"><div class="psx-w">${renderPetBack(c.look, c.wear ? { wear:c.wear } : {})}</div><div class="psx-lb">${c.label}</div></div>`).join('') : '';
  window.psx = {
    n: cases.length,
    side, back,
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
    measure(grid){
      let out = { v:0, at:'' }, neck = { v:0, at:'' };
      const ws = document.querySelectorAll('#' + (grid || 'psxGrid') + ' .psx-w');
      ws.forEach((w, i) => {
        const wr = w.getBoundingClientRect(), k = 240 / wr.width;
        const a = w.querySelector('.pv-all,.ps-all,.pb-all');
        if (a){
          /* 見えている 形（path・ellipse など）ごとの 外わくを あわせる（グループの 外わくは まわした 形の 外わくの 外わくに なって 大きく 出すぎるため） */
          let L = Infinity, T = Infinity, R = -Infinity, B = -Infinity;
          a.querySelectorAll('path,ellipse,rect,circle,polygon').forEach(e => {
            const r = e.getBoundingClientRect();
            if (!r.width && !r.height) return;
            L = Math.min(L, r.left); T = Math.min(T, r.top); R = Math.max(R, r.right); B = Math.max(B, r.bottom);
          });
          if (R > L){
            const o = Math.max(wr.left - L, R - wr.right, wr.top - T, B - wr.bottom, 0) * k;
            if (o > out.v) out = { v:o, at:cases[i].label };
          }
        }
        /* 内がわ（*-g）の CTM は 外がわ（体勢）も ふくむ：体勢と しぐさの 両方で 首が 頭に ついてくるか */
        const h = w.querySelector('.pv-head-g') || w.querySelector('.pv-head'), n = w.querySelector('.pv-neck-g') || w.querySelector('.pv-neck');
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
            f'<body><div id="psxGrid"></div><div id="psxSide"></div><div id="psxBack"></div><script>{js}\n{HARNESS_JS}</script></body></html>')


async def shoot(page, cls, t, grid='psxGrid'):
    await page.evaluate('cls => psx.set(cls)', cls)
    await page.evaluate('t => psx.freeze(t)', t)
    await page.evaluate('() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))')
    await page.evaluate('t => psx.freeze(t)', t)   # 2回め：クラスを かえた あとに 生まれた アニメも
    return await steady(page, grid)


async def steady(page, grid='psxGrid'):
    """2回 つづけて 同じに なるまで とる（念のため。5回まで）"""
    el = await page.query_selector('#' + grid)
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
        ref_css = '' if a.no_ref else read_src('head.html', a.ref)
        same = total = fresh_n = 0
        changed = set((a.changed or '').split(',')) - {''}
        old_side = old is not None and await old.evaluate('psx.side')
        old_back = old is not None and await old.evaluate('!!psx.back')
        for st in states:
            name, cls, times, pose = st[:4]
            grid = {'side': 'psxSide', 'back': 'psxBack'}.get(st[4] if len(st) > 4 else '', 'psxGrid')
            # くらべる 版に ない クラス（あたらしい しぐさ・体勢）・ない 絵（よこむき）の 場面は くらべない
            fresh = old is not None and (any(not re.search(r'\.' + re.escape(c) + r'(?![\w-])', ref_css) for c in cls.split())
                                         or (grid == 'psxSide' and not old_side) or (grid == 'psxBack' and not old_back))
            for i, t in enumerate(times):
                img = await shoot(new, cls, t, grid)
                with open(os.path.join(out, f'poses-{name}.png' if i == 0 else f'poses-{name}-{t}.png'), 'wb') as f:
                    f.write(img)
                m = await new.evaluate('g => psx.measure(g)', grid)
                if m['out']['v'] > OUT_OK.get(name, a.max_out):
                    problems.append(f'{name}@{t}ms：わくから {m["out"]["v"]:.1f} はみだす（{m["out"]["at"]}）')
                if pose and m['neck']['v'] > a.max_neck:
                    problems.append(f'{name}@{t}ms：首と 頭が {m["neck"]["v"]:.1f} ずれる（{m["neck"]["at"]}）')
                note = f'はみだし {m["out"]["v"]:.1f}' + (f'・首 {m["neck"]["v"]:.1f}' if pose else '')
                if fresh:
                    fresh_n += 1
                    print(f'  {name:10s} {t:5d}ms  あたらしい  {note}')
                elif old is not None:
                    total += 1
                    n_px, d = diff(await shoot(old, cls, t, grid), img)
                    if n_px == 0:
                        same += 1
                        print(f'  {name:10s} {t:5d}ms  おなじ   {note}')
                    elif name in changed:
                        print(f'  {name:10s} {t:5d}ms  かわった（--changed） {n_px}px  {note}')
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
        print(f'くらべた：{total} とおり、おなじ {same}' + (f'（あたらしい 場面 {fresh_n} とおりは くらべない）' if fresh_n else ''))
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
    ap.add_argument('--changed', help='見た目を かえる つもりの 場面の 名前（カンマで いくつも）。前の 版と ちがっても NG に しない')
    ap.add_argument('--max-out', type=float, default=30, help='わくから はみだして よい 大きさ（viewBox の 単位。240 が わく）')
    ap.add_argument('--max-neck', type=float, default=2, help='体勢の 場面で 首と 頭が ずれて よい 大きさ（viewBox の 単位）')
    sys.exit(asyncio.run(main(ap.parse_args())))
