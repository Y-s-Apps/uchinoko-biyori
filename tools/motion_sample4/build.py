#!/usr/bin/env python3
"""うちのこの だんかい 4（うしろすがた）の 見本 4（docs/MOTION_DESIGN.md 14章）を 1まいの HTML に する。

  python3 tools/motion_sample4/build.py      # → smoke-out/motion-sample4/index.html（アーティファクト「うちのこ だんかい 4 見本」に そのまま 出せる）

うちのこの 絵と CSS は src/ の いまの コード（js_data*.js・js_pet.js・js_wear.js と head.html の うちのこの CSS。#petArt は .art に）。
うしろすがたの 絵 back.js（renderPetBack・wearBack）と CSS back.css は 下書き（実装の ときに js_pet.js の 絵の 行より 下と head.html へ）、main.js は ミニの おへやと 場面。
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
pet_js = '\n'.join(src(f) for f in ['js_data.js', 'js_data2.js', 'js_data3.js', 'js_pet.js', 'js_wear.js']) + '\n' + own('back.js')
t = own('template.html')
t = t.replace('/*PET_CSS*/', pet_css()).replace('/*BACK_CSS*/', own('back.css'))
t = t.replace('/*PET_JS*/', esc(pet_js)).replace('/*SPLIT_JS*/', SPLIT_JS).replace('/*MAIN_JS*/', esc(own('main.js')))
out = os.path.join(ROOT, 'smoke-out', 'motion-sample4')
os.makedirs(out, exist_ok=True)
open(os.path.join(out, 'index.html'), 'w', encoding='utf-8').write(t)
print(os.path.join(out, 'index.html'), len(t.encode()), 'bytes')
