#!/usr/bin/env python3
"""LINE版の本人確認とセーブの通し確認（サーバー＋画面）。

  cd tools/server && npm install && cd ../..   # はじめの1回（Deno と PGlite）
  sh src/build.sh && python3 tools/line_e2e.py

0. おせわのルール（src/js_rules.js）を、時計を動かして確かめる（tools/rules_test.mjs）。
1. サーバーの関数（supabase/functions/api/index.ts）を Deno で動かし、tools/server/api_test.ts で
   本人確認・おせわ（/act）・名前とみためのセーブ・新しい子・取りこみ・セッションを確かめる（DB は PGlite、LINE の検証はまね）。
2. LINE版の画面（src/out/line/）をスマホ幅のブラウザで開き、LIFF をまねて、同じサーバーにつないで
   ・はじめての子（サーバーが まっさらの子を作る） ・LINEにまだ子がいないときの この端末の子（つれてくる＝1回）
   ・ほかの端末の新しいセーブ ・この端末にいた子をつれてくる（1回だけ） ・引っこしコード（1回だけ）
   ・おせわはサーバーで（ほかの端末の変化も返事でとどく） ・端末の時計をずらしても得をしない
   ・サーバーに届かないとき（ゲストの子は遊べる／LINEの子は まってもらう） ・外部ブラウザ を確かめる。
   ページのエラーと CSP の違反が0件であることも見る。スクリーンショットは smoke-out/line-e2e/。

サーバーの URL（LINE_CFG.api）への通信は、ブラウザの中でこのローカルのサーバーへつなぎかえる。本物の Supabase にはさわらない。
"""
import base64, functools, http.server, json, os, socket, socketserver, subprocess, sys, threading, time, asyncio, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOOLS = os.path.join(ROOT, 'tools', 'server')
BIN = os.path.join(TOOLS, 'node_modules', '.bin')
FN = os.path.join(ROOT, 'supabase', 'functions', 'api', 'index.ts')
CFG = os.path.join(ROOT, 'supabase', 'functions', 'api', 'deno.local.json')
MIG = os.path.join(ROOT, 'supabase', 'migrations', '20261106000001_app_schema.sql')
API = 'https://ftakgswltcavwixqxpzi.supabase.co/functions/v1/api'
PAGE_PORT = 8765
OUT = os.path.join(ROOT, 'smoke-out', 'line-e2e')


def free_port():
    s = socket.socket(); s.bind(('127.0.0.1', 0)); p = s.getsockname()[1]; s.close(); return p


def env(db_port):
    e = dict(os.environ)
    e['SUPABASE_DB_URL'] = f'postgres://postgres:postgres@127.0.0.1:{db_port}/postgres'
    e['ALLOWED_ORIGINS'] = f'https://uchinoko-biyori.pages.dev,http://127.0.0.1:{PAGE_PORT}'
    if os.path.exists('/root/.ccr/ca-bundle.crt'):
        e.setdefault('DENO_CERT', '/root/.ccr/ca-bundle.crt')
    return e


def start_db():
    port = free_port()
    p = subprocess.Popen([os.path.join(BIN, 'pglite-server'), '-p', str(port), '-m', '4'], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    for line in p.stdout:
        if 'listening' in line:
            return p, port
    raise SystemExit('PGlite が起動しませんでした')


def deno(*args, **kw):
    return [os.path.join(BIN, 'deno'), 'run', '-A', '--no-lock', '--config', CFG, *args]


def run_api_test():
    db, port = start_db()
    try:
        r = subprocess.run(deno(os.path.join(TOOLS, 'api_test.ts'), FN, MIG), env=env(port), capture_output=True, text=True, timeout=300)
        print(r.stdout.strip().splitlines()[-1] if r.stdout.strip() else r.stderr[-2000:])
        if r.returncode:
            print(r.stdout[-4000:], r.stderr[-2000:])
        return r.returncode == 0
    finally:
        db.terminate()


def token(sub):
    b = lambda o: base64.urlsafe_b64encode(json.dumps(o).encode()).decode().rstrip('=')
    return b({'alg': 'none'}) + '.' + b({'aud': '2012410263', 'sub': sub}) + '.test'


def sample(name, created_days=10, photo=False, updated_ms=None):
    t = int(time.time() * 1000)
    return {
        'v': 1,
        'pet': {'name': name, 'species': 'dog', 'breedId': 'pomeranian', 'colorName': 'クリーム',
                'look': {'species': 'dog', 'breedId': 'pomeranian'},
                'photo': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==' if photo else None,
                'wear': {'head': None, 'face': None, 'neck': 'scarf_tri'}},
        'stats': {'full': 60, 'mood': 80, 'love': 300},
        'counts': {'meals': 10, 'treats': 5, 'pets': 20, 'plays': 4},
        'recentTreats': [], 'last': t - 3600e3, 'created': t - created_days * 864e5 - (hash(name) % 1000), 'updated': updated_ms or t - 60e3,
    }


def code_of(st):
    b = base64.b64encode(json.dumps(st, ensure_ascii=False).encode()).decode()
    return f'UCHINOKO2:{len(b)}:{b}'


async def browser_tests(srv_port):
    from playwright.async_api import async_playwright
    os.makedirs(OUT, exist_ok=True)
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a):
            pass
    handler = functools.partial(Quiet, directory=os.path.join(ROOT, 'src', 'out', 'line'))
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(('127.0.0.1', PAGE_PORT), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    base = f'http://127.0.0.1:{srv_port}'
    dbg = lambda path, body=None: json.loads(urllib.request.urlopen(urllib.request.Request(
        base + path, data=None if body is None else json.dumps(body).encode(), method='GET' if body is None else 'POST',
        headers={'content-type': 'application/json'}), timeout=10).read())
    state = lambda sub: next((r for r in dbg('/__debug/state') if r['sub'] == sub), None)
    fails, n = [], [0]

    def ok(cond, label, info=None):
        print(('  ok   ' if cond else '  FAIL ') + label + ('' if cond or info is None else '  ' + json.dumps(info, ensure_ascii=False, default=str)[:300]))
        if not cond:
            fails.append(label)

    async with async_playwright() as p:
        browser = await p.chromium.launch()

        async def open_page(sub, local=None, external=False, server_down=False, owner=None, skew_ms=0):
            ctx = await browser.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True,
                                            has_touch=True, timezone_id='Asia/Tokyo', locale='ja-JP')
            page = await ctx.new_page()
            errs, calls = [], []
            page.on('pageerror', lambda e: errs.append(str(e)))
            page.on('console', lambda m: errs.append('CSP: ' + m.text) if m.type == 'error' and 'Content Security Policy' in m.text else None)
            liff = ("window.liff={init:()=>Promise.resolve(),isInClient:()=>%s,getOS:()=>'ios',getIDToken:()=>%s};"
                    % ('false' if external else 'true', json.dumps(token(sub))))
            await page.route('https://static.line-scdn.net/**', lambda r: r.fulfill(status=200, content_type='application/javascript', body=liff))

            async def api(route):
                calls.append(route.request.method + ' ' + route.request.url.replace(API, ''))
                if server_down:
                    return await route.abort()
                resp = await route.fetch(url=route.request.url.replace(API, base + '/api'))
                await route.fulfill(response=resp)
            await page.route(API + '/**', api)
            init = []
            if skew_ms:   # 端末の時計をずらす（サーバーの時計は そのまま）
                init_skew = "(()=>{const N=Date.now.bind(Date),k=%d;Date.now=()=>N()+k;})();" % skew_ms
                await page.add_init_script(init_skew)
            if local is not None:
                init.append("localStorage.setItem('uchinoko-biyori:v1', %s);" % json.dumps(json.dumps(local, ensure_ascii=False)))
            if owner:
                init.append("localStorage.setItem('uchinoko-biyori:line-owner', %s);" % json.dumps(owner))
            if init:
                await page.add_init_script("if(!sessionStorage.getItem('e2e')){%s sessionStorage.setItem('e2e','1')}" % ''.join(init))
            await page.goto(f'http://127.0.0.1:{PAGE_PORT}/')
            await page.wait_for_timeout(2200)
            return ctx, page, errs, calls

        async def snap(page, name):
            n[0] += 1
            await page.screenshot(path=os.path.join(OUT, f'{n[0]:02d}_{name}.png'))

        async def info(page):
            return await page.evaluate('''() => ({ name: S && S.pet && S.pet.name, photo: !!(S && S.pet && S.pet.photo),
                meals: S && S.counts && S.counts.meals, love: S && S.stats && S.stats.love, day: S && S.daily && S.daily.day,
                souv: S && S.souv && S.souv.n,
                server: document.documentElement.dataset.lineServer || null, mode: Persist.mode,
                owner: localStorage.getItem('uchinoko-biyori:line-owner'), guest: !!localStorage.getItem('uchinoko-biyori:line-guest'),
                onboard: !document.getElementById('onboard').hidden })''')

        async def close_popups(page):
            for _ in range(6):
                await page.wait_for_timeout(500)
                btn = await page.query_selector('.levelup .btn.primary')
                if not btn:
                    return
                await btn.click()

        async def find_modal(page, sel):
            """ほかのお知らせが先に出ていたら、とじてから"""
            for _ in range(10):
                m = await page.query_selector(sel)
                if m:
                    return m
                btn = await page.query_selector('.levelup .btn.primary')
                if btn:
                    await btn.click()
                await page.wait_for_timeout(500)
            return None

        all_errs = []

        print('1. はじめての子（サーバーは空）')
        ctx, page, errs, calls = await open_page('Uone')
        i = await info(page)
        ok(i['onboard'] and i['server'] == 'on', 'はじめての画面のまま、サーバーにつながる', i)
        await page.click('#obManual'); await page.wait_for_timeout(300)
        await page.click('[data-g="shiba"]'); await page.fill('#edName', 'いちばん')
        await page.click('#edGo'); await page.wait_for_timeout(2600)
        await close_popups(page)
        s = state('Uone')
        ok(s and s['name'] == 'いちばん' and s['rev'] >= 1 and s['photo'] is None and s['love'] == 0, 'むかえた子をサーバーが作る（まっさら・写真なし）', s)
        ok(any('/act' in c for c in calls) and not any(c == 'POST /save' for c in calls), '新しい子は adopt で（セーブ丸ごとは送らない）', calls)
        i = await info(page)
        ok(i['owner'] == s['id'] and i['mode'] == 'cloud', 'この端末のセーブの持ち主が記録される', i)
        await page.click('#menuBtn'); await page.wait_for_timeout(400)
        st = await page.evaluate("(document.querySelector('#sheet .line-status')||{}).textContent||''")
        ok(st == 'LINEと つながっています', 'プロフィールの1行', st)
        await snap(page, 'profile_on')
        all_errs += errs; await ctx.close()

        print('2. LINEにまだ子がいない：この端末で遊んだ子は「つれてくる」で（取りこみの1回）')
        ctx, page, errs, calls = await open_page('Utwo', local=sample('ゲスト', photo=True))
        m = await find_modal(page, '.levelup [data-close="take"]')
        ok(m is not None and not any('/act' in c and 'adopt' in c for c in calls), 'つれてくるかを聞く（だまって入れない）', calls)
        if m:
            await snap(page, 'offer_local')
            await m.click(); await page.wait_for_timeout(1800)
        s = state('Utwo')
        ok(s and s['name'] == 'ゲスト' and s['photo'] is None and s['imported'], 'この端末の子が取りこみ口から入る（写真は送らない）', s)
        i = await info(page)
        ok(i['photo'] and i['name'] == 'ゲスト', 'この端末には写真がのこる', i)
        all_errs += errs; await ctx.close()

        print('2b. やめておくと、あたらしい子をむかえる（この端末の子は とっておく）')
        ctx, page, errs, calls = await open_page('Utwob', local=sample('のこす子'))
        m = await find_modal(page, '.levelup [data-close="no"]')
        if m:
            await m.click(); await page.wait_for_timeout(800)
        i = await info(page)
        ok(i['onboard'] and i['guest'] and state('Utwob')['rev'] is None, 'はじめての画面になり、サーバーには まだ子がいない', {'info': i, 'state': state('Utwob')})
        all_errs += errs; await ctx.close()

        print('3. ほかの端末の新しいセーブ（同じ子）')
        dbg('/__debug/bump', {'sub': 'Utwo', 'name': 'ゲストあたらしい'})
        two = state('Utwo')
        local = sample('ゲスト', photo=True); local['created'] = two['created']
        ctx, page, errs, calls = await open_page('Utwo', local=local, owner=two['id'])
        i = await info(page)
        ok(i['name'] == 'ゲストあたらしい' and i['photo'], 'サーバーの子に会える（写真の控えはのこる）', i)
        all_errs += errs; await ctx.close()

        print('4. この端末にいた子（ちがう子）とLINEの子')
        ctx, page, errs, calls = await open_page('Uone', local=sample('この端末の子', created_days=3, photo=True))
        i = await info(page)
        ok(i['name'] == 'いちばん' and i['guest'], 'LINEの子に会い、この端末の子はとっておく', i)
        modal = await find_modal(page, '.levelup [data-close="take"]')
        ok(modal is not None, 'つれてくるかを聞く')
        if modal:
            await snap(page, 'offer_guest')
            await modal.click(); await page.wait_for_timeout(1800)
        s = state('Uone')
        ok(s['name'] == 'この端末の子' and s['imported'], 'つれてきた子がサーバーに入る（取りこみ済み）', s)
        i = await info(page)
        ok(i['name'] == 'この端末の子' and i['photo'], '画面もその子になる（写真の控えものこる）', i)

        print('5. 引っこしコードは1回だけ')
        await close_popups(page)
        await page.click('#menuBtn'); await page.wait_for_timeout(400)
        await page.click('#mMove'); await page.wait_for_timeout(400)
        note = await page.evaluate("(document.querySelector('#sheet .line-move')||{}).textContent||''")
        ok('受け取りずみ' in note, '受け取りずみの1行', note)
        await page.fill('#mvIn', code_of(sample('コードの子', created_days=50)))
        await page.click('#mvTake'); await page.wait_for_timeout(400)
        err = await page.evaluate("(document.querySelector('#sheet .mverr')||{}).textContent||''")
        ok('1回だけ' in err, '2回目は受け取らない', err)
        await snap(page, 'code_once')
        all_errs += errs; await ctx.close()

        print('6. 引っこしコードで受け取る（はじめて）')
        ctx, page, errs, calls = await open_page('Uthree', local=sample('さんばん'))
        m = await find_modal(page, '.levelup [data-close="no"]')
        if m:
            await m.click(); await page.wait_for_timeout(600)
        await page.click('#obImport'); await page.wait_for_timeout(400)
        note = await page.evaluate("(document.querySelector('#ob .line-move')||{}).textContent||''")
        ok('1回だけ' in note, '1回だけの1行', note)
        await page.fill('#imCode', code_of(sample('コードの子', created_days=50)))
        await page.click('#imGo'); await page.wait_for_timeout(2600)
        s = state('Uthree')
        ok(s['name'] == 'コードの子' and s['imported'], 'コードの子が取りこみ口から入る', s)
        ok(any('/import' in c for c in calls), '/import を使う', calls)

        print('7. おせわはサーバーで（ほかの端末の変化も返事でとどく）')
        await close_popups(page)
        dbg('/__debug/bump', {'sub': 'Uthree', 'name': 'ほかの端末'})
        dbg('/__debug/patch', {'sub': 'Uthree', 'full': 40})
        before = state('Uthree')
        await page.click('#actFeed'); await page.wait_for_timeout(7000)
        await close_popups(page)
        s = state('Uthree')
        i = await info(page)
        ok(s['meals'] == before['meals'] + 1 and i['meals'] == s['meals'], 'ごはんはサーバーが数える（画面も同じ数）', {'before': before, 'after': s, 'info': i})
        ok(i['name'] == 'ほかの端末', 'ほかの端末の名前も返事でとどく', i)
        ok(any(c == 'POST /act' for c in calls[-4:]) and not any(c == 'POST /save' for c in calls[-4:]), '/act だけ（数字は送らない）', calls[-6:])
        await page.focus('#pet')
        for _ in range(6):
            await page.keyboard.press('Enter'); await page.wait_for_timeout(80)
        await page.wait_for_timeout(2500)
        s2 = state('Uthree')
        ok(s2['pets'] == s['pets'] + 1, 'なでなでも手がとまったら サーバーで数える', {'before': s['pets'], 'after': s2['pets']})
        all_errs += errs; await ctx.close()

        print('7b. 端末の時計をずらしても得をしない')
        three = state('Uthree')
        ctx, page, errs, calls = await open_page('Uthree', owner=three['id'], skew_ms=int(3 * 864e5))
        await close_popups(page)
        i = await info(page)
        today = time.strftime('%Y-%m-%d', time.gmtime(time.time() + 9 * 3600))
        ok(i['day'] == today, 'きょうのおねがいは サーバーの日付（日本時間）', {'day': i['day'], 'today': today})
        ok(i['souv'] == 0, 'おみやげは出ない（あけた時間はサーバーの時計で）', i)
        all_errs += errs; await ctx.close()

        print('8. サーバーに届かないとき（ゲストの子）')
        ctx, page, errs, calls = await open_page('Ufour', local=sample('とどかない'), server_down=True)
        i = await info(page)
        ok(i['server'] == 'failed' and i['mode'] == 'local' and i['name'] == 'とどかない', 'この端末に保存して遊べる', i)
        await page.click('#actFeed'); await page.wait_for_timeout(7000)
        i2 = await info(page)
        ok(i2['meals'] == i['meals'] + 1, 'ゲストの子は おせわできる', i2)
        await close_popups(page)
        await page.click('#menuBtn'); await page.wait_for_timeout(400)
        st = await page.evaluate("(document.querySelector('#sheet .line-status')||{}).textContent||''")
        ok('この端末に ほぞん' in st, 'プロフィールの1行', st)
        await snap(page, 'server_down')
        all_errs += errs; await ctx.close()

        print('8b. サーバーに届かないとき（LINEの子は まってもらう）')
        three = state('Uthree')
        mirror = sample('ほかの端末'); mirror['created'] = three['created']
        ctx, page, errs, calls = await open_page('Uthree', local=mirror, owner=three['id'], server_down=True)
        i = await info(page)
        await page.click('#actFeed'); await page.wait_for_timeout(900)
        wait = await page.query_selector('.levelup [data-close="retry"]')
        ok(wait is not None, '「つながっていません」と もういちど つなぐ', i)
        await snap(page, 'wait_offline')
        if wait:
            await page.click('.levelup [data-close]'); await page.wait_for_timeout(400)
        await page.wait_for_timeout(5000)
        i2 = await info(page)
        ok(i2['meals'] == i['meals'], 'ごはんは あげられない（数字はかわらない）', i2)
        await page.focus('#pet'); await page.keyboard.press('Enter'); await page.wait_for_timeout(1500)
        i3 = await info(page)
        ok(i3['love'] == i['love'], 'なでても なかよしはかわらない', i3)
        all_errs += errs; await ctx.close()

        print('9. 外部ブラウザ')
        ctx, page, errs, calls = await open_page('Ufive', local=sample('そと'), external=True)
        ok(not calls, 'サーバーには何も送らない', calls)
        all_errs += errs; await ctx.close()
        ctx, page, errs, calls = await open_page('Ufive', local=sample('そと'), external=True, owner='someone')
        await page.click('#actFeed'); await page.wait_for_timeout(900)
        ok(await page.query_selector('.levelup .card[aria-label="つながるまで まってね"]') is not None and not calls, 'LINEの子は「LINEの中で ひらいてね」', calls)
        all_errs += errs; await ctx.close()

        await browser.close()
    httpd.shutdown()
    print(f'page errors: {len(all_errs)}')
    for e in all_errs:
        print('  ' + e)
    return not fails and not all_errs


def main():
    if not os.path.exists(os.path.join(BIN, 'deno')):
        raise SystemExit('tools/server で npm install をしてください（Deno と PGlite）')
    if not os.path.exists(os.path.join(ROOT, 'src', 'out', 'line', 'index.html')):
        raise SystemExit('先に sh src/build.sh をしてください')
    with open(CFG, 'w') as fh:   # ためしでは game.js を手元のファイルから読む
        json.dump({'imports': {'uchinoko-game': './game.js'}}, fh)
    try:
        print('ルールの確認（rules_test.mjs）')
        r = subprocess.run(['node', os.path.join(ROOT, 'tools', 'rules_test.mjs')], capture_output=True, text=True, timeout=120)
        rules_ok = r.returncode == 0
        print(r.stdout.strip().splitlines()[-1] if r.stdout.strip() else r.stderr[-2000:])
        if not rules_ok:
            print(r.stdout[-4000:], r.stderr[-2000:])
        print('サーバーの確認（api_test.ts）')
        api_ok = run_api_test() and rules_ok
        print('LINE版の画面とサーバーの通し確認')
        db, db_port = start_db()
        srv_port = free_port()
        srv = subprocess.Popen(deno(os.path.join(TOOLS, 'e2e_server.ts'), FN, MIG, str(srv_port)), env=env(db_port),
                               stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        try:
            for line in srv.stdout:
                if 'e2e server ready' in line:
                    break
            else:
                raise SystemExit('e2e のサーバーが起動しませんでした')
            threading.Thread(target=lambda: [print('  [server] ' + l.rstrip()) for l in srv.stdout if 'error' in l.lower()], daemon=True).start()
            e2e_ok = asyncio.run(browser_tests(srv_port))
        finally:
            srv.terminate(); db.terminate()
    finally:
        os.remove(CFG)
    print('\nall passed' if api_ok and e2e_ok else '\nFAILED')
    return 0 if api_ok and e2e_ok else 1


if __name__ == '__main__':
    sys.exit(main())
