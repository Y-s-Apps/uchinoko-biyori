#!/usr/bin/env python3
"""うちのこの 体勢と しぐさの 見本（docs/MOTION_DESIGN.md 10章）を 1まいの HTML に する。

  python3 tools/motion_sample/build.py      # → smoke-out/motion-sample/index.html（アーティファクト「うちのこの 体勢と しぐさ」に そのまま 出せる）

正面の 絵は src/ の いまの コード（js_data*.js・js_pet.js・js_wear.js と head.html の うちのこの CSS）。
よこむきの 絵 side.js・体勢用の 部品 extra.js・うごき motion.css・おへやと カード main.js は この フォルダの 下書き（実装の ときに src/ へ）。
"""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
src = lambda n: open(os.path.join(ROOT, 'src', n), encoding='utf-8').read()
own = lambda n: open(os.path.join(HERE, n), encoding='utf-8').read()

def pet_css():
    h = src('head.html')
    css = h[h.index('.pet .pet-svg{'):h.index('.bubble{')]
    return css.replace('#petArt', '.art').replace('.pet.', '.pp.').replace('.pet ', '.pp ')

SPLIT_JS = r'''
const LOOKS = {
  daizu:{ species:'dog', breedId:'pomeranian', ear:'small', coat:'fluffy', muzzle:'short', tail:'plume', face:'lower', colors:{ main:'#F3DDB3', face:'#FBF1DD', chest:'#FBF1DD' } },
};
function breedLook(id){ const b = BREED_BY_ID[id]; return Object.assign({ species:b.sp, breedId:b.id }, b.look); }
'''
esc = lambda s: s.replace('</script', '<\\/script')
pet_js = '\n'.join(src(f) for f in ['js_data.js', 'js_data2.js', 'js_data3.js', 'js_pet.js', 'js_wear.js'])
t = own('template.html')
t = t.replace('/*PET_CSS*/', pet_css()).replace('/*MOTION_CSS*/', own('motion.css'))
t = t.replace('/*PET_JS*/', esc(pet_js)).replace('/*SIDE_JS*/', esc(own('side.js'))).replace('/*EXTRA_JS*/', esc(own('extra.js')))
t = t.replace('/*SPLIT_JS*/', SPLIT_JS).replace('/*MAIN_JS*/', esc(own('main.js')))
out = os.path.join(ROOT, 'smoke-out', 'motion-sample')
os.makedirs(out, exist_ok=True)
open(os.path.join(out, 'index.html'), 'w', encoding='utf-8').write(t)
print(os.path.join(out, 'index.html'), len(t.encode()), 'bytes')
