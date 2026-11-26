#!/usr/bin/env python3
"""うちのこの 体勢 だんかい 3 の 見本（docs/MOTION_DESIGN.md 13章）を 1まいの HTML に する。

  python3 tools/motion_sample3/build.py      # → smoke-out/motion-sample3/index.html（アーティファクト「うちのこ だんかい 3 見本」に そのまま 出せる）

うちのこの 絵と CSS は src/ の いまの コード（js_data*.js・js_pet.js・js_wear.js と head.html の うちのこの CSS。#petArt は .art に）。
だんかい 3 の 体勢の CSS は src/head.html に 入った（stage3.css は 下書きの とき だけ。いまは ない）、main.js は ミニの 画面と 場面。
"""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
src = lambda n: open(os.path.join(ROOT, 'src', n), encoding='utf-8').read()
own = lambda n: open(os.path.join(HERE, n), encoding='utf-8').read()

def pet_css():
    h = src('head.html')
    css = h[h.index('.pet .pet-svg{'):h.index('.bubble{')]
    return css.replace('#petArt', '.art')

SPLIT_JS = r'''
const LOOKS = {
  daizu:{ species:'dog', breedId:'pomeranian', ear:'small', coat:'fluffy', muzzle:'short', tail:'plume', face:'lower', colors:{ main:'#F3DDB3', face:'#FBF1DD', chest:'#FBF1DD' } },
};
function breedLook(id){ const b = BREED_BY_ID[id]; return Object.assign({ species:b.sp, breedId:b.id }, b.look); }
'''
esc = lambda s: s.replace('</script', '<\\/script')
pet_js = '\n'.join(src(f) for f in ['js_data.js', 'js_data2.js', 'js_data3.js', 'js_pet.js', 'js_wear.js'])
stage3 = own('stage3.css') if os.path.exists(os.path.join(HERE, 'stage3.css')) else ''
t = own('template.html')
t = t.replace('/*PET_CSS*/', pet_css()).replace('/*STAGE3_CSS*/', stage3.replace('#petArt', '.art'))
t = t.replace('/*PET_JS*/', esc(pet_js)).replace('/*SPLIT_JS*/', SPLIT_JS).replace('/*MAIN_JS*/', esc(own('main.js')))
out = os.path.join(ROOT, 'smoke-out', 'motion-sample3')
os.makedirs(out, exist_ok=True)
open(os.path.join(out, 'index.html'), 'w', encoding='utf-8').write(t)
print(os.path.join(out, 'index.html'), len(t.encode()), 'bytes')
