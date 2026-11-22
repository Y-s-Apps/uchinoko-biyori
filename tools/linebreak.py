#!/usr/bin/env python3
"""うちのこ日和：改行の確認（ことばの まんなかで 切れていないか）。

ビルドずみの画面を スマホ幅（375・390px）で ひらき、シート・ポップアップ・トースト・はじめての画面を 1つずつ出して、
日本語の文が「カ／ード」のように ことばの まんなかで 切れているところを さがします。
スペース・句読点（、。！？」など）・<br>・<wbr> での改行は よい改行として数えません。

  python3 tools/linebreak.py              # ホーム画面版（ルートの index.html）
  python3 tools/linebreak.py --line       # LINE版（src/out/line/。LINEの中で サーバーに つながったときの画面も まねる）
  python3 tools/linebreak.py --claude     # Claude版（src/out/claude/＝アーティファクトに 出す 形を アーティファクトの外で。ゲストの保存。うちのこランの 場面も）
  python3 tools/linebreak.py --shots DIR  # 場面ごとの スクリーンショットも とる（見本づくり用）
  python3 tools/linebreak.py --width 375  # 幅を1つだけ
  python3 tools/linebreak.py --line --only notify --only notice   # 名前に その文字が ある 場面だけ
  python3 tools/linebreak.py --line --height 603   # ひくい 画面（LINE の 中の iPhone SE くらい）。ポップアップの 上が 切れて とどかない
                                                    # ところ・パズルの 画面が 入りきらない ところも「はみだし」に 数える

フォントは tools/fonts（`cd tools/fonts && npm install`）の Zen Maru Gothic・Mochiy Pop One を使います（iPhone と同じ改行に するため）。
ことばの まんなかの改行・横はみだし・ページエラーが 1件でもあれば 終了コード1で終わります。
"""
import argparse, asyncio, json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import webfonts  # noqa: E402
from smoke import sample_state, ROOT, CHROMIUM_ARGS, serve  # noqa: E402


def line_notice_ids():
    """いまの おしらせ（src/js_line.js の LineNotice.list）の id。LINE版を ひらく前に「見た」に しておく
    （おしらせは ひらいて 1.5秒あとに 出るので、おそい 環境では 道具の 片づけ〈1.4秒〉の あとに のこり、つぎの 場面が 止まっていた。
    さいごのチェック F5-1）。おしらせの 場面（line_notice_now・line_notice）は 自分で けしてから 出す"""
    with open(os.path.join(ROOT, 'src', 'js_line.js'), encoding='utf-8') as f:
        m = re.search(r'const LineNotice = \{.*?\n  list:\[(.*?)\],\n', f.read(), re.S)
    return re.findall(r"\bid:'([^']+)'", m.group(1)) if m else []


# ----- ページの中で使う：改行を さがす -----
AUDIT_JS = r"""
(sel) => {
  const WORD = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー々〆ヶA-Za-z0-9０-９Ａ-Ｚａ-ｚ]/u;
  const AFTER = /[、。，．,.!！?？…」』）)］】〕〉》・：:;；%％\-‐〜~／\/♥]/;   // このあとで切れてよい
  const BEFORE = /[「『（(［【〔〈《♥]/;                                    // このまえで切れてよい
  const out = { breaks:[], overflow:[] };
  const roots = [...document.querySelectorAll(sel)].filter(r => r.getClientRects().length);
  const range = document.createRange();
  const path = e => { const a = []; for (let n = e; n && n.nodeType === 1 && a.length < 4; n = n.parentElement) a.unshift(n.tagName.toLowerCase() + (n.id ? '#' + n.id : '') + (n.classList.length ? '.' + [...n.classList].join('.') : '')); return a.join(' > '); };
  for (const root of roots){
    const rootRect = root.getBoundingClientRect();
    const blockOf = n => {
      for (let e = n.parentElement; e; e = e.parentElement){
        const d = getComputedStyle(e).display;
        if (d !== 'inline' && d !== 'contents') return e;
        if (e === root) return e;
      }
      return root;
    };
    const blocks = new Map();
    const push = (b, item) => { if (!blocks.has(b)) blocks.set(b, []); blocks.get(b).push(item); };
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, { acceptNode(n){
      if (n.nodeType === 1){
        if (n.namespaceURI !== 'http://www.w3.org/1999/xhtml') return NodeFilter.FILTER_REJECT;
        if (/^(SCRIPT|STYLE|TEXTAREA|INPUT|SELECT|OPTION)$/.test(n.tagName)) return NodeFilter.FILTER_REJECT;
        const cs = getComputedStyle(n);
        if (cs.display === 'none' || cs.visibility === 'hidden') return NodeFilter.FILTER_REJECT;
        return n.tagName === 'BR' || n.tagName === 'WBR' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
      return NodeFilter.FILTER_ACCEPT;
    }});
    for (let n; (n = w.nextNode());){
      const b = blockOf(n);
      if (n.nodeType === 1){ push(b, n.tagName === 'WBR' ? { sp:true } : { br:true }); continue; }   // <wbr> は 切ってよいところ
      const t = n.data;
      // 横に はみだしても 切りとられる（…で とめる など）ところは かぞえない
      let clip = null;
      for (let e = n.parentElement; e && e !== root; e = e.parentElement){
        const cs = getComputedStyle(e);
        if (cs.overflowX !== 'visible' || cs.textOverflow === 'ellipsis'){ clip = e; break; }
      }
      for (let i = 0; i < t.length;){
        const cp = t.codePointAt(i), len = cp > 0xffff ? 2 : 1, c = t.slice(i, i + len);
        if (/\s/.test(c)){ push(b, { sp:true }); i += len; continue; }
        range.setStart(n, i); range.setEnd(n, i + len);
        const r = range.getClientRects()[0];
        i += len;
        if (!r || (r.width === 0 && r.height === 0)) continue;
        push(b, { c, top:r.top, h:r.height, left:r.left, right:r.right });
        if (!clip && (r.right > rootRect.right + 1.5 || r.left < rootRect.left - 1.5))
          out.overflow.push({ ch:c, where:path(b), text:(b.textContent || '').trim().slice(0, 40) });
      }
    }
    for (const [b, seq] of blocks){
      const text = seq.map(x => x.br ? '⏎' : x.sp ? ' ' : x.c).join('');
      let prev = null, pi = -1, sp = false, br = false;
      seq.forEach((x, i) => {
        if (x.br){ br = true; return; }
        if (x.sp){ sp = true; return; }
        if (prev && x.top > prev.top + prev.h * 0.6){
          const kind = br ? 'br' : sp ? 'space' : (AFTER.test(prev.c) || BEFORE.test(x.c)) ? 'punct'
            : (WORD.test(prev.c) && WORD.test(x.c)) ? 'mid' : 'other';
          if (kind === 'mid' || kind === 'other'){
            const before = text.slice(Math.max(0, pi - 9), pi + 1), after = text.slice(i, i + 9);
            out.breaks.push({ kind, ctx:before + '／' + after, where:path(b) });
          }
        }
        prev = x; pi = i; sp = false; br = false;
      });
    }
  }
  const de = document.scrollingElement || document.documentElement;   /* --claude の ためしの ページ（doctype なし）で body が overflow:hidden だと null */
  if (de.scrollWidth > innerWidth + 1) out.overflow.push({ ch:'', where:'page', text:'横スクロール ' + de.scrollWidth + 'px' });
  return out;
}
"""

# ----- 場面 -----
def puzzle_lines():
    """パズルの 画面で うちのこが 言う ことば（src/js_features.js の PuzzleUI の say(...) と pick([...]) の 文）"""
    src = open(os.path.join(ROOT, 'src', 'js_features.js'), encoding='utf-8').read()
    block = src[src.index('const PuzzleUI = {'):]
    out = []
    for m in re.finditer(r"say\(([^;]*)\);", block):
        for t in re.findall(r"'([^']+)'", m.group(1)):
            if t not in out and re.search(r'[ぁ-んァ-ヶ]', t):
                out.append(t)
    return out


def toast_texts():
    """src の toast(...) に出す文を あつめる（${…} は ためしの値に）"""
    texts = []
    for name in sorted(os.listdir(os.path.join(ROOT, 'src'))):
        if not name.endswith('.js'):
            continue
        src = open(os.path.join(ROOT, 'src', name), encoding='utf-8').read()
        src = re.sub(r"\$\{per \? `([^`]*)` : ''\}", lambda m: m.group(1).replace('${per}', '3'), src)   # 入れ子の `…`
        for m in re.finditer(r'(?:toast|this\.reload)\((.*?)\);', src, re.S):
            for s in re.findall(r"'([^'\n]*[ぁ-んァ-ン一-龥][^'\n]*)'|`([^`\n]*[ぁ-んァ-ン一-龥][^`\n]*)`", m.group(1)):
                texts.append(s[0] or s[1])
    sub = lambda t: re.sub(r'\$\{[^}]*\}', '30', re.sub(r'\$\{(?:S|g)\.pet\.name\}', 'だいず', t)).replace('\\n', '\n')   # \n は 改行（トーストは pre-line）
    out = []
    for t in texts:
        t = sub(t)
        if t not in out:
            out.append(t)
    return out


# うちのこラン（ホーム画面版と Claude版）：ひらいて コースを えらぶ 画面まで まつ・コースの スタート（1こま 描くまで）・自動で ゴールまで
# （描かずに ルールだけ すすめる。fast は ジャンプと ダッシュも＝1位）。pre は ゴールの 前に セーブを かえる JS（ベスト・きょうの 回数）
RUN_SEL = "RunUI.open(); for (let i = 0; i < 400 && !document.querySelector('#runPage .run-sel'); i++) await new Promise(r => setTimeout(r, 100)); "
RUN_FRESH = "S.run = { games:0, clears:0, n:0, day:null, best:{} }; "


def run_open(c='park'):
    return RUN_SEL + "RunUI.start('%s'); for (let i = 0; i < 400 && !(RunUI.ctl && RunUI.ctl.frames > 0); i++) await new Promise(r => setTimeout(r, 100)); " % c


def run_go(c='park'):
    return run_open(c) + "document.querySelector('#runPage [data-m=\"go\"]').click(); const sim = RunUI.ctl.sim; for (let i = 0; i < 200 && sim.status === 'countdown'; i++) sim.step(1 / 60); sim.drainEvents(); "


def run_finish(fast, c='park', pre=''):
    return RUN_FRESH + pre + run_go(c) + """const fast = %s; for (let g = 0; g < 30000 && sim.status === 'running'; g++){
  const p = sim.player, c = sim.turnCue;
  if (c && c.active && !c.armed) sim.input(c.direction);
  else if (fast){ const o = sim.layout.obstacles.find(o => o.s > p.s && o.s - p.s < (p.boost > 0 ? 5.6 : 3.7) && Math.abs(p.x - o.lane * 2) < 1.1);
    if (o && o.type !== 'tunnel' && p.jumpElapsed === null) sim.input('jump'); else if (sim.gauge >= 20 && !(p.boost > 0) && !c) sim.input('dash'); }
  sim.step(1 / 60); }
await new Promise(r => setTimeout(r, 400)); """ % ('true' if fast else 'false')


RUN_OPEN = run_open()
RUN_GO = run_go()

# アジリティ（P4）の 自動の 操作（描かずに ルールだけ）：つぎの 障害物の レーンへ・ハードルと わっかは ジャンプ（miss は はじめの 2つを とばない）・
# スラロームは めじるしの ほう・シーソーは まんなかで とまって、いたが さがったら タップ。noLane・noBrake・noTap で その 操作を しない
AGI_AUTO = """const p = sim.player, o = sim.nextObstacle, b = sim.activeSeesaw, sl = sim.activeSlalom;
  if (b){ const ph = b.state.phase; if (ph === 'approach' && !sim.stopped && p.s - b.obstacle.s >= -0.7 && !noBrake) sim.input('brake'); else if (ph === 'ready' && !noTap) sim.input('dash'); }
  else if (sl){ const i = sl.state.index; if (i < 6){ const w = (sl.obstacle.startSide == null ? -1 : sl.obstacle.startSide) * (i % 2 ? -1 : 1); if (sl.state.side !== w) sim.input(w < 0 ? 'left' : 'right'); } }
  else if (o){ if (p.lane !== o.lane && !sim.rampPass && !sim.inTunnel()){ if (!noLane) sim.input(o.lane < p.lane ? 'left' : 'right'); }
    else if ((o.type === 'hurdle' || o.type === 'hoop') && p.jumpElapsed === null && o.s - p.s > 0 && o.s - p.s <= 5.2 && !(miss && o.id < 2)) sim.input('jump'); }
  sim.step(1 / 60);"""


def agi_flags(miss=False, lane=True, brake=True, tap=True):
    return 'const miss = %s, noLane = %s, noBrake = %s, noTap = %s; ' % tuple('true' if v else 'false' for v in (miss, not lane, not brake, not tap))


def agi_until(c, cond, then='', **kw):
    """アジリティの コース c を cond（sim を つかう JS）まで すすめて、とめる（step を からに＝合図の まま のこす）"""
    return run_go(c) + agi_flags(**kw) + "for (let g = 0; g < 30000 && sim.status === 'running' && !(%s); g++){ %s } %s sim.drainEvents(); sim.step = () => {}; " % (cond, AGI_AUTO, then)


def agi_finish(miss, c='first-field', pre=''):
    return RUN_FRESH + pre + run_go(c) + agi_flags(miss) + "for (let g = 0; g < 40000 && sim.status === 'running'; g++){ %s }\nawait new Promise(r => setTimeout(r, 400)); " % AGI_AUTO


def scenes(line, run=False):
    """(名前, 出すための JS, しらべる場所, 待つms, いまの子が いるか)"""
    S = []
    add = lambda name, js, root, wait=450, pet=True: S.append((name, js, root, wait, pet))
    # はじめての画面（子がいないとき）
    add('ob_welcome', '', '#ob', 300, False)
    add('ob_import', 'Onboard.importView()', '#ob', 300, False)
    add('ob_import_err', "Onboard.importView(moveErrorText({reason:'short', need:52345, got:1200}))", '#ob', 300, False)
    for err in ['この写真は 読みこめませんでした。JPEGか PNGの 写真で ためしてね。',
                '犬か猫が 写っている 写真を えらんでね。顔が はっきり 写っている 写真が おすすめです。',
                'この写真は 読みとれませんでした。ちがう 写真で ためしてね。']:
        add('ob_welcome_err', 'Onboard.welcome(%s)' % json.dumps(err), '#ob', 300, False)
    add('ob_edit', "document.querySelector('#obManual').click(); await new Promise(r => setTimeout(r, 300)); document.querySelector('[data-g=\"shiba\"]').click()", '#ob', 400, False)
    if line:
        add('ob_aiask', "LineSync.state='on'; LineServer.ai={on:true,left:3,perDay:3}; LineServer.call=async()=>({ai:{on:true,left:3,perDay:3}}); LineAI.ask(Onboard,{preview:'data:image/gif;base64,R0lGODlhAQABAAAAACw='})", '#ob', 400, False)
        add('ob_aiask_none', "LineSync.state='on'; LineServer.ai={on:true,left:0,perDay:3}; LineServer.call=async()=>({ai:{on:true,left:0,perDay:3}}); LineAI.ask(Onboard,{preview:'data:image/gif;base64,R0lGODlhAQABAAAAACw='})", '#ob', 400, False)
        add('ob_welcome_ai', "LineSync.state='on'; LineServer.ai={on:true,left:3,perDay:3}; Onboard.welcome(); LineApp.paint()", '#ob', 300, False)
    # おへや・シート
    add('room', '', '.top, .stats, .dock, #hint', 300)
    for name, js in [('requests', 'openRequests()'), ('tricks', 'openTricks()'), ('treats', 'openTreats()'), ('dress', 'openDress()'),
                     ('room_tab', "openDress(); await new Promise(r => setTimeout(r, 300)); document.querySelector('[data-slot=\"room\"]').click()"),
                     ('album_diary', "openAlbum('diary')"), ('album_souv', "openAlbum('souv')"), ('album_stamp', "openAlbum('stamp')"),
                     ('profile', 'openMenu()'), ('profile_new', "openMenu(); await new Promise(r => setTimeout(r, 300)); document.querySelector('#mNew').click()"),
                     ('move', 'openMove()'),
                     ('move_err', "openMove(); await new Promise(r => setTimeout(r, 300)); document.querySelector('#mvIn').value='abc'; document.querySelector('#mvTake').click()"),
                     ('move_ok', "openMove(); await new Promise(r => setTimeout(r, 300)); document.querySelector('#mvIn').value=encodeMoveCode(); document.querySelector('#mvTake').click()")]:
        add(name, js, '#sheet')
    for slot in ['face', 'neck']:
        add('dress_' + slot, "dressSlot='%s'; openDress()" % slot, '#sheet')
    for cat in ['floor', 'rug', 'bed', 'view']:
        add('room_' + cat, "dressSlot='room'; roomCat='%s'; openDress()" % cat, '#sheet')
    add('album_souv_all', "SOUVENIRS.forEach(x => S.souv.have[x.id] = 2); openAlbum('souv')", '#sheet')
    # パズル（2026-11-15。2026-11-16 から ページごと うつる 画面 #pzPage）：えらぶ・はじめ・「？」・×の たしかめ・
    # おわり（クリア・ほうび おわり・クリアできない・つながらない・いそがしい・きろく されない）・ふきだしの ことば（ひくい 画面でも）
    add('play_pick', 'openPlay()', '#sheet')
    add('play_pick_none', "S.puzzle.day=dayKey(); S.puzzle.n=3; S.puzzle.best=1230; openPlay()", '#sheet')
    add('puzzle', 'PuzzleUI.open()', '#pzPage', 600)
    add('puzzle_seen', "S.firsts.puzzle=true; PuzzleUI.open()", '#pzPage', 600)
    add('puzzle_help', "PuzzleUI.open(); await new Promise(r => setTimeout(r, 300)); PuzzleUI.help()", '.levelup', 600)
    add('puzzle_quit', "PuzzleUI.open(); await new Promise(r => setTimeout(r, 300)); PuzzleUI.moves=[0]; PuzzleUI.quit()", '#pzPage', 600)
    for nm, r in [('clear', "{ok:true,clear:true,score:1230,got:56,best:true,reward:true,left:2,ev:[]}"),
                  ('clear_last', "{ok:true,clear:true,score:1230,got:56,best:false,reward:true,left:0,ev:[]}"),
                  ('clear_done', "{ok:true,clear:true,score:880,got:55,best:false,reward:false,left:0,ev:[]}"),
                  ('miss', "{ok:true,clear:false,score:640,got:47,best:false,reward:false,left:3,ev:[]}"),
                  ('offline', "{ok:false,why:'offline',ev:[]}"), ('busy', "{ok:false,why:'busy',ev:[]}"),
                  ('stale', "{ok:false,why:'stale',ev:[]}"), ('bad', "{ok:false,why:'bad',ev:[]}")]:
        add('puzzle_' + nm, "PuzzleUI.open(); await new Promise(r => setTimeout(r, 300)); PuzzleUI.say('クリア！ やったね！'); PuzzleUI.result(%s)" % r, '#pzPage', 600)
    # ひくい 画面（iPhone SE の LINE など）：ふきだしは うちのこの 右。おわりの 知らせも 小さい 盤の 中に
    low = "Object.defineProperty(window, 'visualViewport', { configurable:true, value:{ height:560, scale:1, addEventListener(){}, removeEventListener(){} } }); "
    add('puzzle_low_clear', low + "PuzzleUI.open(); await new Promise(r => setTimeout(r, 300)); PuzzleUI.say('クリア！ やったね！'); PuzzleUI.result({ok:true,clear:true,score:1230,got:56,best:true,reward:true,left:2,ev:[]})", '#pzPage', 600)
    add('puzzle_low_offline', low + "PuzzleUI.open(); await new Promise(r => setTimeout(r, 300)); PuzzleUI.result({ok:false,why:'offline',ev:[]})", '#pzPage', 600)
    for i, t in enumerate(puzzle_lines()):
        add('puzzle_say_%02d' % i, "PuzzleUI.open(); await new Promise(r => setTimeout(r, 200)); PuzzleUI.say(%s)" % json.dumps(t, ensure_ascii=False), '#pzPage', 250)
        add('puzzle_low_say_%02d' % i, low + "PuzzleUI.open(); await new Promise(r => setTimeout(r, 200)); PuzzleUI.say(%s)" % json.dumps(t, ensure_ascii=False), '#pzPage', 250)
    if run:
        # うちのこラン（2026-11-21 P2・2026-11-22 P3。ホーム画面版と Claude版〈P5〉）：えらぶ（WebGL なしも）・コースを えらぶ 画面（ベスト・ほうびの のこり・あそびかた）・
        # スタート（3コース・ベスト）・あそびかた（コースごと）・ひとやすみ・ゴール（1位・ほか・じゅんいを ひらく・はじめての きろく・ベスト こうしん・
        # ベストまで・ほうびは おわり・さいごの コース）・じゅんび・よみこめない・3D が ひらけない・とまった・まがりかどの 合図（まんなかの ひとことは 出さない）
        add('play_pick_nogl', "RunUI.gl = false; openPlay()", '#sheet')
        add('play_pick_run_over', "S.run.n = 3; S.run.day = Clock.dayKey(); openPlay()", '#sheet')
        add('run_select', RUN_FRESH + RUN_SEL, '#runPage', 500)
        add('run_select_best', "S.run = { games:5, clears:2, n:3, day:Clock.dayKey(), best:{ park:36580, beach:41230 } }; " + RUN_SEL, '#runPage', 500)
        add('run_select_help', RUN_SEL + "document.querySelector('#runPage [data-s=\"help\"]').click()", '#runPage', 500)
        add('run_ready', RUN_FRESH + RUN_OPEN, '#runPage', 600)
        add('run_ready_best', "S.run.best = { park:36580 }; " + RUN_OPEN, '#runPage', 600)
        add('run_ready_beach', run_open('beach'), '#runPage', 600)
        add('run_ready_forest', run_open('forest'), '#runPage', 600)
        add('run_help', RUN_OPEN + "document.querySelector('#runPage [data-run=\"help\"]').click()", '#runPage', 600)
        add('run_help_beach', run_open('beach') + "document.querySelector('#runPage [data-run=\"help\"]').click()", '#runPage', 600)
        add('run_help_forest', run_open('forest') + "document.querySelector('#runPage [data-run=\"help\"]').click()", '#runPage', 600)
        add('run_pause', RUN_GO + "RunUI.ctl.pause()", '#runPage', 600)
        add('run_result_first', run_finish(True), '#runPage', 600)
        add('run_result_slow', run_finish(False, pre='S.run.best.park = 30000; '), '#runPage', 600)
        add('run_result_faster', run_finish(True, pre='S.run.best.park = 99000; '), '#runPage', 600)
        add('run_result_over', run_finish(False, pre='S.run.n = 3; S.run.day = Clock.dayKey(); S.run.best.park = 30000; '), '#runPage', 600)
        add('run_result_order', run_finish(False) + "document.querySelector('#runPage details').open = true", '#runPage', 600)
        add('run_result_beach', run_finish(True, 'beach'), '#runPage', 600)
        add('run_result_forest', run_finish(False, 'forest'), '#runPage', 600)
        add('run_result_norec', "const AR = Act.run; Act.run = () => Promise.resolve({ ok:false, why:'bad' }); " + run_finish(True) + "Act.run = AR; ", '#runPage', 600)
        add('run_wait', "const L = RunUI.load; RunUI.load = () => new Promise(() => {}); RunUI.open(); RunUI.load = L", '#runPage', 400)
        add('run_loadfail', "const L = RunUI.load; RunUI.load = () => Promise.reject(new Error('t')); RunUI.open(); RunUI.load = L", '#runPage', 500)
        add('run_glfail', RUN_SEL + "const M = RunUI.R.mountRace; RunUI.R.mountRace = () => { throw new Error('gl'); }; RunUI.start('park'); RunUI.R.mountRace = M", '#runPage', 500)
        add('run_lost', RUN_GO + "document.querySelector('#runPage canvas').dispatchEvent(new Event('webglcontextlost', { cancelable:true }))", '#runPage', 600)
        for nm, at, arm in [('ahead', 60, ''), ('swipe', 72, ''), ('ok', 75, "sim.input('right'); "), ('wait', 400, '')]:
            # はじめの まがりかど（90）の 合図：この さき・スワイプ・OK・とまって まつ（wait は スワイプしない）。走った まま うちのこの 足だけ とめる
            add('run_cue_' + nm, RUN_GO + "for (let g = 0; g < 5000 && sim.player.s < %d && sim.waitingTurn === null; g++) sim.step(1 / 60); %ssim.drainEvents(); sim.player.speed = 0" % (at, arm),
                '#runPage', 500)
    if run:
        # アジリティ（2026-11-22 P4）：コースを えらぶ（切りかえ・ベスト・あそびかた）・スタート（4コース）・あそびかた（4コース）・ひとやすみ・
        # 合図（つぎの 障害物・ジャンプ・レーン・トンネル・スラローム・シーソー〈のる・とまる・まつ・タップ・すすむ〉・Aフレーム）・「とまっているよ」・
        # ゴール（ノーミス・ミス・はやい・おそい・ほうび おわり・さいごの コース・きろく できない）
        AGI = "RunUI.mode = 'agility'; "
        add('agi_select', RUN_FRESH + AGI + RUN_SEL, '#runPage', 500)
        add('agi_select_best', AGI + "S.run = { games:5, clears:2, n:3, day:Clock.dayKey(), best:{ 'first-field':22540, zigzag:28520, balance:31460, 'hill-field':17420 } }; " + RUN_SEL, '#runPage', 500)
        add('agi_select_help', AGI + RUN_SEL + "document.querySelector('#runPage [data-s=\"help\"]').click()", '#runPage', 500)
        add('agi_select_back', AGI + RUN_SEL + "document.querySelector('#runPage [data-mode=\"race\"]').click(); await new Promise(r => setTimeout(r, 200)); document.querySelector('#runPage [data-mode=\"agility\"]').click()", '#runPage', 500)
        for c in ['first-field', 'zigzag', 'balance', 'hill-field']:
            add('agi_ready_' + c, RUN_FRESH + run_open(c), '#runPage', 600)
            add('agi_help_' + c, run_open(c) + "document.querySelector('#runPage [data-run=\"help\"]').click()", '#runPage', 600)
        add('agi_ready_best', "S.run.best = { balance:31460 }; " + run_open('balance'), '#runPage', 600)
        add('agi_pause', run_go('zigzag') + "RunUI.ctl.pause()", '#runPage', 600)
        for nm, c, cond, kw, then in [
                ('ahead', 'first-field', 'sim.player.s >= 5', {}, ''), ('jump', 'first-field', 'sim.player.s >= 20', {}, ''),
                ('lane', 'first-field', 'sim.player.s >= 70', {'lane': False}, ''), ('tunnel', 'first-field', 'sim.player.s >= 124', {}, ''),
                ('stopped', 'first-field', 'sim.player.s >= 40', {}, "sim.input('brake'); for (let g = 0; g < 20; g++) sim.step(1 / 60);"),
                ('slalom', 'zigzag', 'sim.player.s >= 78', {}, ''), ('slalom_out', 'zigzag', 'sim.activeSlalom && sim.activeSlalom.state.index >= 6', {}, ''),
                ('seesaw_in', 'balance', 'sim.player.s >= 73', {}, ''), ('seesaw_brake', 'balance', 'sim.player.s >= 75.5', {'brake': False}, ''),
                ('seesaw_wait', 'balance', "sim.activeSeesaw && sim.activeSeesaw.state.phase === 'tipping'", {}, ''),
                ('seesaw_tap', 'balance', "sim.activeSeesaw && sim.activeSeesaw.state.phase === 'ready'", {'tap': False}, ''),
                ('seesaw_go', 'balance', "sim.activeSeesaw && sim.activeSeesaw.state.phase === 'exit'", {}, ''),
                ('seesaw_early', 'balance', 'sim.player.s >= 73', {}, "sim.input('brake'); for (let g = 0; g < 20; g++) sim.step(1 / 60);"),
                ('aframe', 'hill-field', 'sim.player.s >= 9', {}, ''), ('aframe_on', 'hill-field', 'sim.player.s >= 15', {}, ''),
                ('aframe_off', 'hill-field', 'sim.player.s >= 9', {}, "sim.input('right'); for (let g = 0; g < 30; g++) sim.step(1 / 60);")]:
            add('agi_cue_' + nm, agi_until(c, cond, then, **kw), '#runPage', 500)
        add('agi_result_first', agi_finish(False), '#runPage', 600)
        add('agi_result_miss', agi_finish(True), '#runPage', 600)
        add('agi_result_slow', agi_finish(True, pre="S.run.best['first-field'] = 21600; "), '#runPage', 600)
        add('agi_result_faster', agi_finish(False, pre="S.run.best['first-field'] = 99000; "), '#runPage', 600)
        add('agi_result_over', agi_finish(True, pre="S.run.n = 3; S.run.day = Clock.dayKey(); S.run.best['first-field'] = 21600; "), '#runPage', 600)
        add('agi_result_zigzag', agi_finish(True, 'zigzag'), '#runPage', 600)
        add('agi_result_balance', agi_finish(False, 'balance'), '#runPage', 600)
        add('agi_result_hill', agi_finish(False, 'hill-field'), '#runPage', 600)
        add('agi_result_norec', "const AR = Act.run; Act.run = () => Promise.resolve({ ok:false, why:'bad' }); " + agi_finish(False) + "Act.run = AR; ", '#runPage', 600)
    add('requests_pinch',"S.daily.rescue={type:'treat',n:2,got:0,done:false}; S.streak={last:Clock.dayKey(now()-2*864e5),n:12,best:20}; openRequests()", '#sheet')
    if line:
        on = ("LineSync.state='on'; LineServer.member={id:'x'}; LineSync.created=1; LineServer.card={on:true,left:2,perDay:3}; LineServer.importable=true;"
              "LineApp.state='ready'; LineApp.inClient=true; window.liff=Object.assign(window.liff||{}, {isApiAvailable:()=>true});")
        add('profile_line', on + 'openMenu(); LineApp.paint()', '#sheet')
        # よるの おしらせの スイッチ（オフ・オン）
        add('profile_line_notify_off', on + "LineServer.notify={on:null,ready:true,hour:21}; openMenu(); LineApp.paint()", '#sheet')
        add('profile_line_notify_on', on + "LineServer.notify={on:true,ready:true,hour:21}; openMenu(); LineApp.paint()", '#sheet')
        add('move_line', on + 'openMove(); LineApp.paint()', '#sheet')
        # 引っこし・バックアップの「この端末に とっておいた子」（診断 3-2）。名前の ながい子と みじかい子
        kid = ("(n, c, love) => ({at:1, b:0, st:Object.assign(JSON.parse(JSON.stringify(S)), {created:c, pet:Object.assign({}, S.pet, {name:n, breedId:'shiba', look:{species:'dog', breedId:'shiba'}}),"
               " stats:{full:50, mood:50, love:love}})})")
        keep = "localStorage.setItem(LINE_GUEST_KEY, JSON.stringify({v:2, kids:[(%s)('ながいながいなまえの', 11, 900), (%s)('こむぎ', 12, 30)]}));" % (kid, kid)
        add('move_line_keep', on + keep + 'openMove(); LineApp.paint()', '#sheet')
        add('move_line_keep_used', on + keep + 'LineServer.importable=false; openMove(); LineApp.paint()', '#sheet')
        add('move_line_keep_guest', keep + 'openMove(); LineApp.paint()', '#sheet')
        for st in ['loading', 'failed']:
            add('profile_line_' + st, "LineApp.state='%s'; LineApp.error='timeout'; openMenu(); LineApp.paint()" % st, '#sheet')
        add('profile_line_outside', "LineApp.state='ready'; LineApp.inClient=false; openMenu(); LineApp.paint()", '#sheet')
        add('profile_line_srvfail', "LineApp.state='ready'; LineApp.inClient=true; LineSync.state='failed'; LineSync.error='server'; openMenu(); LineApp.paint()", '#sheet')
        add('profile_line_left', "LineApp.state='ready'; LineApp.inClient=true; LineSync.state='left'; openMenu(); LineApp.paint()", '#sheet')
        # つながれない理由（やさしい ことば。診断 4-3）。LINEの子（line-owner）と ゲストの 両方
        for own in ['', "localStorage.setItem(LINE_OWNER_KEY,'m1');"]:
            for err in ['sdk', 'INIT_FAILED']:
                add('profile_line_liff_' + err, own + "LineApp.state='failed'; LineApp.error='%s'; openMenu(); LineApp.paint()" % err, '#sheet')
            for err in ['unavailable', 'expired', 'badtoken', 'http404', 'later']:
                add('profile_line_srv_' + err, own + "LineApp.state='ready'; LineApp.inClient=true; LineSync.state='failed'; LineSync.error='%s'; openMenu(); LineApp.paint()" % err, '#sheet')
    # ポップアップ
    for lv in range(2, 101):
        add('levelup_%d' % lv, 'celebrate(%d, %d)' % (lv, lv - 1), '.levelup .card', 250)
    add('rescue', 'S.streak.n=13; rescueModal()', '.levelup .card', 1500)
    add('broke', 'brokeModal({next:Clock.dayKey(now()+5*864e5)})', '.levelup .card')
    add('pinch', "S.daily.rescue={type:'treat',n:2,got:0,done:false}; pinchModal({n:12})", '.levelup .card')
    add('alldone', 'S.streak.n=5; allDoneModal({})', '.levelup .card', 1500)
    add('alldone_first', 'S.streak.n=1; allDoneModal({})', '.levelup .card', 1500)
    add('alldone_bridged', 'S.streak.n=13; allDoneModal({bridged:true})', '.levelup .card', 1500)
    add('alldone_waiting', "S.daily.rescue={type:'pet',n:5,got:0,done:false}; S.streak.saved={n:12}; allDoneModal({waiting:true})", '.levelup .card', 1500)
    add('souvenirs', None, '.levelup .card', 0)        # 22こ（下で ひとつずつ）
    add('events', None, '.levelup .card', 0)           # 10こ
    add('anniv', 'annivModal({years:3})', '.levelup .card')
    add('trick_learned', "Modal.show({label:'げいをおぼえた', html:`${petCard()}<h3>げい「${esc('くるっとターン')}」を<br>おぼえた！</h3><p>これからは いつでも見せてくれます。<br>♥+5</p><button class=\"btn primary\" type=\"button\" data-close>すごいね！</button>`})", '.levelup .card')
    add('failnotice', 'Persist.failNoticed=false; Persist.failNotice()', '.levelup .card')
    add('restored', 'Persist.restored=now()-864e5; Persist.restoredNotice()', '.levelup .card')
    if line:
        on = ("LineSync.state='on'; LineServer.member={id:'x'}; LineSync.created=1; LineApp.state='ready'; LineApp.inClient=true;"
              "LineSync.queue=f=>f(); LineSync.left=()=>{};")
        add('line_wait_outside', "LineSync.waitOpen=false; LineSync.waitNotice('outside')", '.levelup .card')
        add('line_wait_server', "LineSync.waitOpen=false; LineSync.waitNotice('server')", '.levelup .card')
        guest = ("localStorage.setItem(LINE_GUEST_KEY, JSON.stringify(Object.assign(JSON.parse(JSON.stringify(S)), {pet:Object.assign({}, S.pet, {name:'こむぎ', breedId:'shiba', look:{species:'dog', breedId:'shiba'}}), stats:{full:50, mood:50, love:900}})));"
                 "LineServer.importable=true; LineSync.samePet=()=>false; LineSync.progressed=()=>true;")
        add('line_offer_guest', guest + 'LineSync.offerGuest()', '.levelup .card')
        add('line_offer_local', 'LineServer.importable=true; LineSync.stash=()=>{}; LineSync.offerLocal()', '.levelup .card')
        add('line_offer_local_used', 'LineServer.importable=false; LineSync.stash=()=>{}; LineSync.offerLocal()', '.levelup .card')
        # 「つれてくる」が 通信で しっぱいした（診断 3-2）
        add('line_bring_failed', "LineServer.importable=true; LineSync.stash=()=>{}; LineSync.bring=async()=>{const e=new Error('unavailable'); e.code='unavailable'; throw e;};"
            "LineSync.offerLocal(); await new Promise(r => setTimeout(r, 400)); document.querySelector('.levelup [data-close=\"take\"]').click()", '.levelup .card', 900)
        # とっておいた子を つれてくる前の たしかめ（3-2）と、とどかないまま とじた子（3-8）
        other = "Object.assign(JSON.parse(JSON.stringify(S)), {created:77, pet:Object.assign({}, S.pet, {name:'ながいながいなまえの', breedId:'shiba', look:{species:'dog', breedId:'shiba'}})})"
        add('line_keep_bring', on + "LineServer.importable=true; LineKeep.bring(%s)" % other, '.levelup .card')
        for k, imp in [('adopt', 'true'), ('import', 'true'), ('import', 'false')]:
            add('line_unsent_%s_%s' % (k, imp), on + "LineServer.importable=%s; LineSync.unsent=()=>({m:'x', c:77, k:'%s'}); LineSync.offerUnsent(%s)" % (imp, k, other), '.levelup .card')
        add('line_leave_1', on + 'LineLeave.busy=false; LineLeave.start()', '.levelup .card')
        add('line_leave_2', on + "LineLeave.busy=false; LineLeave.start(); await new Promise(r => setTimeout(r, 400)); document.querySelector('.levelup [data-close=\"next\"]').click()", '.levelup .card', 700)
        add('line_leave_done', on + "LineServer.call=async()=>({deauth:'none'}); LineLeave.busy=false; LineLeave.run(esc(S.pet.name))", '.levelup .card')
        card = (on + "LineServer.card={on:true,left:%d,perDay:3}; window.liff=Object.assign(window.liff||{}, {isApiAvailable:()=>true});"
                "LineServer.call=async()=>({card:{on:true,left:%d,perDay:3}}); LineCard.busy=false; LineCard.start()")
        add('line_card', card % (2, 2), '.levelup .card', 1500)
        add('line_card_none', card % (0, 0), '.levelup .card', 1500)
        # いまの おしらせ（LineNotice.list の ほんもの。下の 見本で list を 入れかえる前に。いまは 0こ＝F3-3）
        if line_notice_ids():
            add('line_notice_now', "localStorage.removeItem(LINE_NOTICE_KEY); LineNotice.shown=false; LineNotice.check()", '.levelup .card')
        # おしらせ（診断 5-6）：ポリシーを かえるとき・本サービスを終えるとき の 文の 見本
        for n in ["{id:'lb1', title:'プライバシーポリシーを かえます', when:'2027年1月15日から', text:'AIの 読みとりに つかう 会社を かえます。くわしくは プライバシーポリシーを 見てね。', link:'privacy'}",
                  "{id:'lb2', title:'うちのこ日和を おわります', when:'2027年3月31日まで', text:'それまでに「引っこし・バックアップ」の 引っこしコードで、ホーム画面の アプリなどへ つれていけます。', link:'terms'}",
                  "{id:'lb3', title:'利用規約を かえました'}"]:
            add('line_notice', "localStorage.removeItem(LINE_NOTICE_KEY); LineNotice.list=[%s]; LineNotice.shown=false; LineNotice.check()" % n, '.levelup .card')
    if line:
        # よるの おしらせの さそい（ぜんぶ かなえた あとに 1回）と、いまの おしらせ（LineNotice.list の ほんもの）
        add('line_notify_invite', on + "LineServer.notify={on:null,ready:true,hour:21}; LineNotify.asked=false; LineNotify.invite()", '.levelup .card')
        for t in ['よるの おしらせを オンに したよ。\n21時に LINEで おしらせします', 'よるの おしらせを オフに したよ', 'いまは かえられませんでした。\nすこし あとで ためしてね']:
            add('toast', 'toast(%s)' % json.dumps(t), '#toast', 450)
    # トースト
    for t in toast_texts():
        add('toast', 'toast(%s)' % json.dumps(t), '#toast', 450)
    return S


# スクロールしても とどかない ところ：まんなかに そろえた ポップアップが 画面より 高いと 上が 切れる（スクロールは 下にしか のびない）、
# シートが 画面の 上に はみだす、パズルの 画面が スクロールする（盤の 上では スクロールできない）
REACH_JS = r"""() => {
  const out = [], vh = innerHeight;
  const m = document.querySelector('.levelup');
  if (m){
    const c = m.querySelector('.card');
    if (c){
      m.scrollTop = 0;
      const top = c.getBoundingClientRect().top;
      m.scrollTop = m.scrollHeight;
      const bottom = c.getBoundingClientRect().bottom;
      m.scrollTop = 0;
      if (top < -1) out.push({ where:'.levelup .card', text:'ポップアップの 上が ' + Math.round(-top) + 'px 切れて とどかない（高さ ' + Math.round(c.getBoundingClientRect().height) + '／画面 ' + vh + '）' });
      if (bottom > vh + 1) out.push({ where:'.levelup .card', text:'ポップアップの 下が ' + Math.round(bottom - vh) + 'px とどかない' });
    }
  }
  const w = document.querySelector('#sheetWrap.open'), sh = document.querySelector('#sheet');
  if (w && sh && sh.getBoundingClientRect().top < -1) out.push({ where:'#sheet', text:'シートが 画面の 上に ' + Math.round(-sh.getBoundingClientRect().top) + 'px はみだす' });
  const pz = document.querySelector('#pzPage');
  if (pz && !m && (pz.scrollHeight > pz.clientHeight + 1 || pz.classList.contains('tight'))) out.push({ where:'#pzPage', text:'パズルの 画面が 入りきらない（' + pz.scrollHeight + '／' + pz.clientHeight + '）' });
  /* うちのこランの メニュー：カードが スクロールなしで 入るか（じゅんいを ひらいた ときは スクロールしてよい） */
  const ro = document.querySelector('#runPage .run-over:not([hidden])');
  if (ro && !m && !ro.querySelector('details[open]') && ro.scrollHeight > ro.clientHeight + 1) out.push({ where:'#runPage', text:'ランの カードが 入りきらない（' + ro.scrollHeight + '／' + ro.clientHeight + '）' });
  return out;
}"""


async def run(args, width):
    from playwright.async_api import async_playwright
    root = ROOT
    if args.line:
        root = os.path.join(ROOT, 'src', 'out', 'line')
    elif args.claude:
        # アーティファクトに 出す 形（build.sh の out/claude/：いまの アーティファクトと 同じ 1行目で 包んだ index.html と、うちのこランの run-<ハッシュ>.js）
        root = os.path.join(ROOT, 'src', 'out', 'claude')
    httpd, port = serve(root)
    found, overflow, errors, n_scenes = [], [], [], 0
    shots = os.path.join(args.shots, str(width)) if args.shots else None
    if shots:
        os.makedirs(shots, exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch(args=CHROMIUM_ARGS)
        ctx = await browser.new_context(viewport={'width': width, 'height': args.height}, device_scale_factor=2, is_mobile=True,
                                        has_touch=True, timezone_id='Asia/Tokyo', locale='ja-JP', service_workers='block')
        fonts = await webfonts.install(ctx)
        if args.line:
            await ctx.route('https://static.line-scdn.net/**', lambda r: r.abort())
        page = await ctx.new_page()
        page.on('pageerror', lambda e: errors.append(str(e)))
        cur = {'pet': None}
        notice_ids = line_notice_ids() if args.line else []

        async def load(pet):
            if cur['pet'] is pet:
                return
            await page.goto(f'http://127.0.0.1:{port}/about:blank')
            await page.evaluate("Object.keys(localStorage).filter(k => k.startsWith('uchinoko-biyori:')).forEach(k => localStorage.removeItem(k)); sessionStorage.clear()")
            if notice_ids:
                await page.evaluate('ids => localStorage.setItem("uchinoko-biyori:line-notice", JSON.stringify(ids))', notice_ids)
            if pet:
                st = sample_state()
                st['pet']['name'] = 'だいず'
                st['stats']['love'] = 2600
                await page.evaluate('s => localStorage.setItem("uchinoko-biyori:v1", s)', json.dumps(st))
            await page.goto(f'http://127.0.0.1:{port}/')
            await page.wait_for_timeout(1400)
            await page.evaluate('document.fonts.ready')
            await clear()
            cur['pet'] = pet

        async def clear():
            await page.evaluate('''() => { document.querySelectorAll('.levelup').forEach(e => e.remove());
              if (typeof Modal !== 'undefined'){ Modal.q = []; Modal.busy = false; }
              try { closeSheet(); } catch(e){}
              try { if (typeof PuzzleUI !== 'undefined') PuzzleUI.close(); } catch(e){}
              try { if (typeof RunUI !== 'undefined'){ RunUI.close(); RunUI.gl = null; } } catch(e){}
              try { delete window.visualViewport; } catch(e){}
              const t = document.getElementById('toast'); if (t) t.classList.remove('show'); }''')
            await page.wait_for_timeout(380)

        async def check(name, js, root, wait):
            nonlocal n_scenes
            if js:
                await page.evaluate('async () => { %s }' % js)
            await page.wait_for_timeout(wait)
            res = await page.evaluate(AUDIT_JS, root)
            n_scenes += 1
            # 高さ：ポップアップ・シート・パズルの 画面の 中身に、スクロールしても とどかない ところが ないか（ひくい 画面は --height で）
            for o in await page.evaluate(REACH_JS):
                overflow.append((name, o['where'], o['text']))
            for b in res['breaks']:
                found.append((name, b['kind'], b['ctx'], b['where']))
            for o in res['overflow']:
                overflow.append((name, o['where'], o['text']))
            if shots:
                await page.screenshot(path=os.path.join(shots, f'{n_scenes:03d}_{name}.png'))
            await clear()

        for name, js, root, wait, pet in scenes(args.line, run=not args.line):   # うちのこランは ホーム画面版と Claude版（P5）
            if args.only and not any(o in name for o in args.only):
                continue
            # 子がいない画面と いる画面で ページを ひらきなおす。LINE版の「つれてくる？」なども 状態を変えるので 毎回
            fresh = name.startswith('line_offer') or name.startswith('ob_') or name.startswith('profile_line') or name.startswith('move_line') or name.startswith('line_unsent') or name.startswith('line_keep')
            if fresh:
                cur['pet'] = None
            await load(pet)
            if name == 'souvenirs':
                ids = await page.evaluate('SOUVENIRS.map(x => x.id)')
                for sid in ids:
                    await page.evaluate("souvenirModal({id:%s, isNew:true, bonus:4, after:[]})" % json.dumps(sid))
                    await check('souvenir_' + sid, '', root, 450)
                continue
            if name == 'events':
                ids = await page.evaluate('EVENTS.map(x => x.id)')
                for eid in ids:
                    await check('event_' + eid, 'eventModal({id:%s, had:false})' % json.dumps(eid), root, 450)
                continue
            await check(name, js, root, wait)
            if fresh:
                cur['pet'] = None
        await browser.close()
    httpd.shutdown()
    return fonts, n_scenes, found, overflow, errors


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--line', action='store_true')
    ap.add_argument('--claude', action='store_true')
    ap.add_argument('--width', type=int, action='append')
    ap.add_argument('--shots')
    ap.add_argument('--only', action='append', help='名前に この文字が ある 場面だけ（なんども 書ける）')
    ap.add_argument('--height', type=int, default=844, help='画面の 高さ（既定 844）。LINE の 中の iPhone SE は 603 くらい。ポップアップの 上が 切れないかも 見る')
    ap.add_argument('--json', help='見つけたものを JSON で書き出す')
    args = ap.parse_args()
    widths = args.width or [375, 390]
    bad, report = 0, {}
    for w in widths:
        fonts, n, found, overflow, errors = asyncio.run(run(args, w))
        print(f'== {"LINE版" if args.line else "Claude版" if args.claude else "ホーム画面版"} {w}px：{n}場面'
              + ('' if fonts else '（フォントなし：cd tools/fonts && npm install）'))
        for name, kind, ctx, where in found:
            print(f'  {kind:5} {name:22} {ctx}    [{where}]')
        for name, where, text in overflow:
            print(f'  はみだし {name:20} {text}    [{where}]')
        for e in errors:
            print('  エラー ' + e)
        print(f'  ことばの まんなか：{sum(1 for f in found if f[1] == "mid")}  そのほか：{sum(1 for f in found if f[1] != "mid")}'
              f'  はみだし：{len(overflow)}  エラー：{len(errors)}')
        bad += sum(1 for f in found if f[1] == 'mid') + len(overflow) + len(errors)
        report[w] = {'breaks': found, 'overflow': overflow, 'errors': errors}
    if args.json:
        with open(args.json, 'w', encoding='utf-8') as f:
            json.dump(report, f, ensure_ascii=False, indent=1)
    return 1 if bad else 0


if __name__ == '__main__':
    raise SystemExit(main())
