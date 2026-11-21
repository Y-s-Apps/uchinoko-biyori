#!/usr/bin/env python3
"""うちのこラン（仮）：ホーム画面版で レースの「こうえん」を 走らせて、iPhone の はばの スクリーンショットと 走る GIF を とる（P2〜）。

ビルドずみの ルート（sh src/build.sh）を 手元で 配信して ひらき（CSP の ランの ファイルの URL だけ 手元に かえる＝tools/smoke.py と 同じ）、
「あそぶ」→「ラン」→ はしる → 3・2・1 → 走る（自動の 操作：まがりかどで スワイプ・ハードルで ジャンプ・おやつの レーンへ・20こで ダッシュ）
→ ゴール を とおす。時計は Playwright の clock で とめておき、レースは ページの 中で 1/60秒ずつ すすめてから 1こまだけ 描く
（ヘッドレスの 3D〈SwiftShader〉は おそいので、こまを とばさずに 走る ところを とる ため）。

  python3 tools/run/run_shots.py                 # smoke-out/run/ に 画面と run-park.gif
  python3 tools/run/run_shots.py --dark          # ダークで
  python3 tools/run/run_shots.py --size 375x667  # 画面の 大きさ
  python3 tools/run/run_shots.py --cat           # ねこの 子（キジトラ）で
  python3 tools/run/run_shots.py --no-gif        # GIF なし（はやい）

ページの エラー・CSP の 違反が 1件でも あれば 終了コード 1。
"""
import argparse, asyncio, datetime, io, json, os, sys, time

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..'))
from smoke import ROOT, CHROMIUM_ARGS, LOOKS_JS, sample_state, serve, poll  # noqa: E402

# 自動の 操作（ページの 中で 30ms ごと）。window.__autoOff に 名前を 入れると その 操作だけ しない（'turn0' など）
AUTO_JS = r'''(() => {
  window.__autoOff = window.__autoOff || {};
  window.__auto = () => {
    const c = typeof RunUI !== 'undefined' && RunUI.ctl, sim = c && c.sim;
    if (!sim || sim.status !== 'running') return;
    const p = sim.player, cue = sim.turnCue, off = window.__autoOff;
    if (cue && cue.active && !cue.armed && !off['turn' + cue.id]) { sim.input(cue.direction); return; }
    const reach = p.boost > 0 ? 5.6 : 3.7;
    const o = sim.layout.obstacles.find(o => o.s > p.s && o.s - p.s < 12 && Math.abs(p.x - o.lane * 2) < 1.1);
    if (o && o.type === 'hurdle' && o.s - p.s < reach && p.jumpElapsed === null) { sim.input('jump'); return; }
    if (sim.gauge >= 20 && !(p.boost > 0) && !cue && !off.dash) { sim.input('dash'); return; }
    if (cue || o || sim.inTunnel(p) || p.jumpElapsed !== null) return;
    const t = sim.layout.treats.find(t => t.s > p.s + 2.5 && !sim.collected.has(t.id));
    if (t && t.s - p.s < 9 && t.lane !== p.lane) sim.input(t.lane < p.lane ? 'left' : 'right');
  };
  setInterval(() => window.__auto(), 30);   /* 時計を すすめる（clock.run_for）あいだ */
  /* ms だけ レースを すすめる（30ms ごとに 自動の 操作）。描くのは そのあとの 1こま */
  window.__ff = (ms, until) => {
    const sim = RunUI.ctl.sim, n = Math.round(ms * .06);
    for (let i = 0; i < n && sim.status !== 'finished' && sim.status !== 'paused'; i++){
      if (until != null && sim.player.s >= until) break;
      if (i % 2 === 0) window.__auto();
      sim.step(1 / 60);
    }
    return { s: sim.player.s, status: sim.status };
  };
})()'''


async def main(a):
    from playwright.async_api import async_playwright
    out = a.out
    os.makedirs(out, exist_ok=True)
    httpd, port = serve(ROOT)
    errors, shots, looks = [], [], []
    vw, vh = (int(x) for x in a.size.lower().split('x'))
    async with async_playwright() as p:
        browser = await p.chromium.launch(args=CHROMIUM_ARGS)
        ctx = await browser.new_context(viewport={'width': vw, 'height': vh}, device_scale_factor=2, is_mobile=True, has_touch=True,
                                        timezone_id='Asia/Tokyo', locale='ja-JP', color_scheme='dark' if a.dark else 'light', service_workers='block')
        page = await ctx.new_page()
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.on('console', lambda m: errors.append('CSP: ' + m.text) if m.type == 'error' and 'Content Security Policy' in m.text else None)
        await ctx.route('https://fonts.googleapis.com/**', lambda r: r.abort())
        await ctx.route('https://fonts.gstatic.com/**', lambda r: r.abort())
        st = sample_state()
        st['pet']['name'] = 'だいず'
        st['last'] = st['updated'] = int(time.time() * 1000)
        if a.cat:
            st['pet'].update({'name': 'こむぎ', 'species': 'cat', 'breedId': 'kijitora', 'look': {'species': 'cat', 'breedId': 'kijitora'}, 'colorName': 'キジトラ'})
        else:
            # だいず：クリームの ポメラニアン（P1 の 見くらべと 同じ 色）
            st['pet']['look'] = {'species': 'dog', 'breedId': 'pomeranian', 'colors': {'main': '#F3DDB3', 'body': '#F3DDB3', 'ear': '#F3DDB3', 'tail': '#F3DDB3', 'face': '#FBEFD9', 'chest': '#FBEFD9', 'paws': '#F3DDB3'}}
        await page.add_init_script("if(!sessionStorage.getItem('shots')){localStorage.setItem('uchinoko-biyori:v1', %s);sessionStorage.setItem('shots','1')}"
                                   % json.dumps(json.dumps(st, ensure_ascii=False)))
        t0 = datetime.datetime.now(datetime.timezone.utc)
        await page.clock.install(time=t0)
        await page.clock.pause_at(t0)

        async def tick(ms):
            await page.clock.run_for(ms)

        async def ff(ms, until=None):
            """レースを ms すすめて 1こま 描く"""
            r = await page.evaluate('([ms, until]) => window.__ff(ms, until)', [ms, until])
            await tick(17)
            return r

        async def snap(name, full=False):
            path = os.path.join(out, f'{len(shots) + 1:02d}_{name}.png')
            await page.screenshot(path=path, full_page=full)
            shots.append(path)
            for x in await page.evaluate(LOOKS_JS):
                looks.append(f'{name}：{x}')

        await page.goto(f'http://127.0.0.1:{port}/')
        await tick(2500)
        for _ in range(6):
            b = await page.query_selector('.levelup .btn.primary')
            if not b:
                break
            await b.click(); await tick(700)
        await page.click('#actPlay'); await tick(500)
        await page.wait_for_timeout(400)   # シートの うごき（CSS は ほんとうの 時計）
        await snap('pick')
        await page.click('[data-play="run"]')
        ok = False
        for _ in range(200):
            await tick(100)
            if await page.evaluate('() => !!(RunUI.ctl && RunUI.ctl.frames > 1)'):
                ok = True
                break
        if not ok:
            errors.append('ランが はじまりません')
        await tick(400)
        await snap('ready')
        await page.click('#runPage [data-run="help"]'); await tick(400)
        await snap('help')
        await page.click('#runPage [data-m="ok"]'); await tick(300)
        await page.evaluate(AUTO_JS)
        if a.wait_turn:
            await page.evaluate("() => { window.__autoOff.turn0 = true; }")
        await page.click('#runPage [data-m="go"]'); await tick(17)
        await ff(1300)
        await snap('countdown')
        await ff(1900); await tick(120)
        await snap('start')

        async def run_to(s):
            r = await ff(200000, s)
            await tick(120)   # HUD（0.08秒ごと）
            return r

        await run_to(84)
        await snap('turn_cue')
        if a.wait_turn:
            await run_to(91)
            await ff(600)
            await tick(120)
            await snap('turn_wait')
            await page.evaluate("() => { delete window.__autoOff.turn0; }")
        await run_to(150)
        info = await page.evaluate('() => { const m = RunUI.ctl.sim; return { s: m.player.s, treats: m.treatCount, gauge: m.gauge, hits: m.player.hits, rank: m.rank }; }')
        print('とちゅう：', info)
        # ひとやすみ（アプリを はなれた まね）
        await page.evaluate("() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')); }")
        await tick(300)
        paused = await page.evaluate('() => RunUI.ctl.sim.status')
        await page.evaluate("() => { delete document.hidden; }")
        await snap('pause')
        if paused != 'paused':
            errors.append(f'アプリを はなれても とまりません（{paused}）')
        s0 = await page.evaluate('() => RunUI.ctl.sim.player.s')
        await tick(1500)
        s1 = await page.evaluate('() => RunUI.ctl.sim.player.s')
        if s1 != s0:
            errors.append('ひとやすみ なのに すすんでいます')
        await page.click('#runPage [data-m="resume"]'); await tick(17)
        await run_to(a.tunnel_at)
        await snap('tunnel')
        dash = await page.evaluate('() => RunUI.ctl.sim.dashCount')
        await run_to(9999)
        await tick(600)
        res = await page.evaluate('() => { const m = RunUI.ctl.sim; return m.result; }')
        print('ゴール：', json.dumps(res, ensure_ascii=False) if res else None, 'ダッシュ', dash)
        if not res:
            errors.append('ゴール できません')
        await snap('result')
        await page.evaluate("() => { const d = document.querySelector('#runPage details'); if (d) d.open = true; }")
        await tick(200)
        await snap('result_order')
        await page.click('#runPage [data-m="exit"]'); await tick(800)
        left = await page.evaluate("() => ({ page: !!document.querySelector('#runPage'), canvas: document.querySelectorAll('canvas').length, inert: !!document.querySelector('#app').inert, say: document.querySelector('#bubble').textContent })")
        print('とじた あと：', left)
        if left['page'] or left['canvas'] or left['inert']:
            errors.append(f'とじても のこっています：{left}')
        await snap('after')
        # GIF：はじめの まがりかどの 前から あと（と ハードル）まで。15こ／秒。こまかさ 1 の べつの 画面で、時計を ほんとうに すすめて とる
        # （ひとことの 1.3秒・カメラの うごきも ほんとうと 同じ）
        frames = []
        if not a.no_gif:
            g = await browser.new_context(viewport={'width': vw, 'height': vh}, device_scale_factor=1, is_mobile=True, has_touch=True,
                                          timezone_id='Asia/Tokyo', locale='ja-JP', color_scheme='dark' if a.dark else 'light', service_workers='block')
            gp = await g.new_page()
            gp.on('pageerror', lambda e: errors.append('GIF: ' + str(e)))
            await g.route('https://fonts.googleapis.com/**', lambda r: r.abort())
            await g.route('https://fonts.gstatic.com/**', lambda r: r.abort())
            await gp.add_init_script("if(!sessionStorage.getItem('shots')){localStorage.setItem('uchinoko-biyori:v1', %s);sessionStorage.setItem('shots','1')}"
                                     % json.dumps(json.dumps(st, ensure_ascii=False)))
            await gp.clock.install(time=t0)
            await gp.clock.pause_at(t0)
            await gp.goto(f'http://127.0.0.1:{port}/')
            await gp.clock.run_for(2500)
            await gp.evaluate("() => { document.querySelectorAll('.levelup').forEach(e => e.remove()); Modal.q = []; Modal.busy = false; RunUI.open(); }")
            for _ in range(200):
                await gp.clock.run_for(100)
                if await gp.evaluate('() => !!(RunUI.ctl && RunUI.ctl.frames > 1)'):
                    break
            await gp.evaluate(AUTO_JS)
            await gp.click('#runPage [data-m="go"]')
            await gp.clock.run_for(17)
            await gp.evaluate('until => window.__ff(200000, until)', a.gif_from)
            await gp.clock.run_for(1400)   # ひとこと（1.3秒）が きえて、HUD が いまの 数に なるまで
            for _ in range(int(a.gif_seconds * 15)):
                await gp.clock.run_for(66)
                frames.append(await gp.screenshot(type='png'))
            await g.close()
        await browser.close()
    httpd.shutdown()
    if frames:
        from PIL import Image
        imgs = []
        for buf in frames:
            im = Image.open(io.BytesIO(buf)).convert('RGB')
            w = 360
            imgs.append(im.resize((w, round(im.height * w / im.width)), Image.LANCZOS))
        pal = [im.quantize(colors=200, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE) for im in imgs]
        gif = os.path.join(out, 'run-park.gif')
        pal[0].save(gif, save_all=True, append_images=pal[1:], duration=66, loop=0, optimize=True)
        shots.append(gif)
    print('screenshots:')
    for s in shots:
        print('  ' + s)
    for x in looks:
        print('  見た目 ' + x)
    print(f'page errors: {len(errors)}')
    for e in errors:
        print('  ' + e)
    return 1 if errors or looks else 0


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--out', default=os.path.join(ROOT, 'smoke-out', 'run'))
    ap.add_argument('--dark', action='store_true')
    ap.add_argument('--cat', action='store_true')
    ap.add_argument('--size', default='390x844')
    ap.add_argument('--no-gif', action='store_true')
    ap.add_argument('--gif-seconds', type=float, default=5)
    ap.add_argument('--gif-from', type=float, default=46, help='GIF を はじめる ところ（スタートからの きょり）')
    ap.add_argument('--tunnel-at', type=float, default=314, help='トンネルの 画面を とる ところ')
    ap.add_argument('--wait-turn', action='store_true', help='はじめの まがりかどで わざと スワイプしない（「ストップ！」の 画面）')
    raise SystemExit(asyncio.run(main(ap.parse_args())))
