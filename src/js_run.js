/* ===== うちのこラン：3つの 版（ホーム画面版 2026-11-21 P2〜P4・Claude版 P5・LINE版 P6。docs/RUN_DESIGN.md） =====
 * build.sh の RUN_HOME=1・RUN_CLAUDE=1・RUN_LINE=1 のとき js_features.js の すぐあとに 入る。LINE版だけの ことは js_line.js の LineRun が 包む。
 * 3D の ゲーム（Three.js と src/run/）は 1つの ファイル RUN_SRC（run-<ハッシュ>.js。中身は src/run_bundle.js）に まとめてあり、
 * ランを ひらいた ときだけ 読みこむ。integrity は RUN_SRI、CSP は その ファイルの URL だけ（build.sh が 入れる。Claude版は アーティファクトの 2つめの ファイル）。
 * ホーム画面版は Service Worker も とっておく。読みこみが RUN_WAIT_MS より かかったら「よみこめませんでした」（とどけば そのまま えらぶ 画面へ）。
 * - 「あそぶ」の シートに 3つめ「ラン」（openPlay を 包む）。WebGL 2 が ない 端末は「この端末では あそべません」で ひらかない。
 * - ページごと うつる #runPage（パズルと 同じ 重なり 45。うしろの #app は inert）。とじたら ゲームを ぜんぶ 片づける（dispose）。
 * - ひらくと コースを えらぶ 画面（題「うちのこラン」・「レース／アジリティ」の 切りかえ・コースの カード・ベスト・きょうの ほうび）
 *   → レース（こうえん・うみべ・もり。src/run/race.js）か アジリティ（はじめての ひろば・ジグザグ・バランス・おかの ひろば。src/run/agility.js。P4）。
 * - ゴールで Act.run('run')：ほうび（ごきげん・なかよし。レースと アジリティ あわせて 1日 RUN.perDay 回・パズルとは べつ）と コースごとの ベスト・アルバム
 *   （ルールは js_rules.js。アジリティの タイムは 合計＝走った タイム＋ミス×5秒）。
 *   ゴールの カードに ほうびと ベストとの 差を 出す。LINE に ほぞんしている子が つながっていない ときは きろく しない（Act.blocked）。
 * - 子が 入れかわったら（Game.start）とじる。よるの ひとこと（Nudge）は ランの あいだ まつ。 */
const RUN_WAIT_MS = 20000;   /* ゲームの ファイル（約 630KB）を まつ ながさ。こえたら「よみこめませんでした」 */
const RunUI = {
  page:null, ctl:null, back:null, tok:0, gl:null, loading:null, ran:false, onKey:null, R:null, course:null, helpOn:false, mode:'race',
  /* WebGL 2（Three.js r170 が つかう）が あるか。あると わかったら おぼえる（なかった ときは つぎに また 見る＝たまたま つくれなかった だけかも。レビュー R4-3）。
     ためしの 3D は すぐ 手ばなす */
  canPlay(){
    if (this.gl !== true){
      try {
        const g = document.createElement('canvas').getContext('webgl2');
        this.gl = !!g;
        const x = g && g.getExtension('WEBGL_lose_context');
        if (x) x.loseContext();
      } catch(e){ this.gl = false; }
    }
    return this.gl;
  },
  /* ゲームの ファイルを 読む（1回だけ。しっぱいしたら つぎに また ためす） */
  load(){
    if (window.UchinokoRun) return Promise.resolve(window.UchinokoRun);
    if (this.loading) return this.loading;
    this.loading = new Promise((ok, ng) => {
      const s = document.createElement('script');
      s.src = RUN_SRC; s.integrity = RUN_SRI;
      s.onload = () => window.UchinokoRun ? ok(window.UchinokoRun) : ng(new Error('run'));
      s.onerror = () => { s.remove(); ng(new Error('load')); };   /* integrity が あわない・とどかない（つぎに ひらいたら また 読む） */
      document.head.appendChild(s);
    }).catch(e => { this.loading = null; throw e; });
    return this.loading;
  },
  /* 「なにで あそぶ？」の シートに ラン を 足す（openPlay の あとに よぶ） */
  addTile(){
    const sh = $('#sheet'), tiles = $('#sheetWrap').classList.contains('open') && sh ? sh.querySelector('.playpick') : null;
    if (!tiles || tiles.querySelector('[data-play="run"]')) return;
    const ok = this.canPlay(), left = Rules.runLeft(S);
    tiles.classList.add('run3');
    tiles.insertAdjacentHTML('beforeend', `<button class="tile" type="button" data-play="run"${ok ? '' : ' aria-disabled="true"'}><svg viewBox="0 0 24 24" aria-hidden="true">${MINI.run}</svg><span class="tname">ラン<small>3Dで はしる</small></span><span class="gain">${!ok ? 'この端末では<br>あそべません' : left ? `ほうび あと${left}回` : 'ほうびは<br>また あした'}</span></button>`);
    const note = sh.querySelectorAll('.note');
    if (note.length) note[note.length - 1].insertAdjacentHTML('afterend', `<p class="note">${ok ? 'ランは、うちのこが 3Dで はしる ゲーム。おともだちと きそう レース（3コース）と、しょうがいぶつの アジリティ（4コース）！' : 'ランは 3Dの がめんを つかうので、この端末では あそべません。'}</p>`);
    tiles.querySelector('[data-play="run"]').addEventListener('click', () => { if (this.canPlay()) this.open(); });
  },
  /* おともだち 4ひき：うちのこと 同じ 種類の、ちがう 品種（毎回 ランダム。見た目だけ） */
  rivals(){
    const sp = isCat() ? 'cat' : 'dog';
    const pool = BREEDS.filter(b => b.sp === sp && b.id !== S.pet.breedId).map(b => [Math.random(), b]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
    return pool.slice(0, 4).map(b => ({ look:normalizeLook(Object.assign({ species:b.sp, breedId:b.id }, b.look)), label:`おともだち<small>（${softName(b.ja)}）</small>` }));
  },
  open(){
    if (!S || Pet.busy || this.page || PuzzleUI.page) return;
    closeSheet();
    this.back = document.activeElement;
    this.ran = false;
    const page = document.createElement('div');
    page.className = 'run-page'; page.id = 'runPage'; page.tabIndex = -1;
    page.setAttribute('role', 'dialog'); page.setAttribute('aria-modal', 'true'); page.setAttribute('aria-label', 'うちのこラン');
    page.innerHTML = '<div class="run-root"></div>';
    document.body.appendChild(page);
    this.page = page;
    document.documentElement.classList.add('run-open');
    const app = $('#app');
    if (app){ app.setAttribute('aria-hidden', 'true'); app.inert = true; }
    /* ページを うごかさない（パズルと 同じ。ボタンの 上の タップと、メニュー・コースの 一覧の スクロールは そのまま） */
    const still = e => {
      if (!e.cancelable) return;
      const o = e.target.closest && e.target.closest('.run-over,.run-sel-body');
      if (e.type === 'touchmove' && o && o.scrollHeight > o.clientHeight + 1) return;
      if (e.type === 'touchstart' && e.target.closest && e.target.closest('button,summary')) return;
      e.preventDefault();
    };
    page.addEventListener('touchstart', still, { passive:false });
    page.addEventListener('touchmove', still, { passive:false });
    /* Esc：あそびかたを とじる → 走っていたら ひとやすみ → とじる（シート・ポップアップが 出ている あいだは なにも しない） */
    this.onKey = e => {
      if (e.key !== 'Escape' || !this.page || Modal.busy || $('#sheetWrap').classList.contains('open')) return;
      e.preventDefault();
      if (this.ctl ? this.ctl.escape() : this.helpOn ? (this.select(), true) : false) return;
      this.close();
    };
    document.addEventListener('keydown', this.onKey, true);
    const tok = ++this.tok;
    this.wait('じゅんび しているよ…', null);
    const fail = () => { if (tok === this.tok && this.page && !this.R) this.wait('よみこめませんでした', 'つながっている ところで、<br>もういちど ひらいてね'); };
    /* とちゅうで とまった ままに しない（レビュー R4-1）。読みこみは つづけるので、あとで とどけば えらぶ 画面に なる */
    const timer = setTimeout(fail, RUN_WAIT_MS);
    this.load().then(R => { clearTimeout(timer); if (tok === this.tok && this.page){ this.R = R; this.select(); } },
      () => { clearTimeout(timer); fail(); });
    try { page.focus({ preventScroll:true }); } catch(e){}
  },
  root(){ return this.page && this.page.querySelector('.run-root'); },
  /* いまの レースを 片づける（コースを えらぶ 画面へ もどる・つぎの コースへ） */
  drop(){ if (this.ctl){ try { this.ctl.dispose(); } catch(e){} this.ctl = null; } },
  /* ゲームが はじまる 前の 画面（じゅんび・よみこめない）。sub が あれば「とじる」も */
  wait(head, sub){
    const root = this.root();
    if (!root) return;
    root.className = 'run-root';
    root.removeAttribute('data-course');
    root.innerHTML = `<div class="run-hud"><div class="run-top"><button class="closebtn run-btn" type="button" data-w="x" aria-label="ランを やめる">${ICON_X}</button></div></div>
      <div class="run-over"><div class="run-card"><h2>${head}</h2>${sub ? `<p class="run-sub">${sub}</p><div class="btnrow"><button class="btn primary" type="button" data-w="x">とじる</button></div>` : ''}</div></div>`;
    root.querySelectorAll('[data-w="x"]').forEach(b => b.addEventListener('click', () => this.close()));
    const f = root.querySelector('.btn.primary');
    if (f) try { f.focus({ preventScroll:true }); } catch(e){}
  },
  /* コースを えらぶ 画面：題「うちのこラン」・「レース／アジリティ」の 切りかえ（P4。えらんだ ほうは アプリを ひらいている あいだ おぼえる。セーブには 書かない）・
     コースの カード（小さな 地図・むずかしさ・せつめい・とくちょう・ベスト）・きょうの ほうび。カードを おすと その コースの スタートの 画面へ
     （はしるまでは なにも 数えない）。focus は 切りかえた あとの ボタンへ もどす ときに 'mode' */
  select(help, focus){
    const root = this.root(), R = this.R;
    if (!root || !R) return;
    this.drop();
    this.helpOn = !!help;
    const agi = this.mode === 'agility' && R.AGILITY_COURSES ? true : false;
    if (!agi) this.mode = 'race';
    const list = agi ? R.AGILITY_COURSES : R.COURSES, map = agi ? R.agilityMap : R.courseMap;
    const best = (S.run && S.run.best) || {}, left = Rules.runLeft(S);
    const cards = list.map((c, i) => {
      const b = hasId(best, c.id) ? best[c.id] : null;
      return `<li><button class="run-course" type="button" data-course="${c.id}" aria-label="${i + 1}. ${c.name}（${c.level}）。${b ? `ベスト ${runSec(b)}` : 'まだ きろく なし'}">
        <span class="run-map">${map(c.id)}</span>
        <span class="run-ci"><span class="run-cn"><b>${i + 1}</b>${c.name}<i class="lv${c.lv == null ? i : c.lv}">${c.level}</i></span>
          <span class="run-cd">${c.desc}</span>
          <span class="run-tags">${c.tags.map(t => `<i>${t}</i>`).join('')}</span>
          <span class="run-cb">${b ? `ベスト <b>${runSec(b)}</b>` : 'まだ きろく なし'}</span></span></button></li>`;
    }).join('');
    const tab = (m, label) => `<button type="button" data-mode="${m}" aria-pressed="${(m === 'agility') === agi}">${label}</button>`;
    root.className = 'run-root run-sel';
    root.removeAttribute('data-course');   /* ゲームが つけた しるし（コースの カードの [data-course] と まぎれない ように） */
    root.innerHTML = `<div class="run-hud"><div class="run-top">
        <button class="closebtn run-btn" type="button" data-s="x" aria-label="ランを やめる">${ICON_X}</button>
        <h2 class="run-title">うちのこラン</h2>
        <button class="closebtn run-btn" type="button" data-s="help" aria-label="あそびかた">？</button></div></div>
      <div class="run-sel-body">
        <div class="run-sel-head"><div class="run-sel-pet" aria-hidden="true">${renderPet(S.pet.look, { wear:petWear() })}</div>
          <p class="run-sel-say">どこを はしる？<small>${agi ? '6つの しょうがいぶつに ちょうせん！' : 'おともだち 4ひきと きょうそう！'}</small></p></div>
        ${R.AGILITY_COURSES ? `<div class="run-modes" role="group" aria-label="ランの しゅるい">${tab('race', 'レース')}${tab('agility', 'アジリティ')}</div>` : ''}
        <ol class="run-courses">${cards}</ol>
        <p class="run-sel-note">ゴールすると ごきげん+${RUN.mood}・♥+${RUN.love}（レースと アジリティ あわせて 1日${RUN.perDay}回）<br><b>${left ? `きょうの ほうび あと${left}回` : 'きょうの ほうびは また あした'}</b></p>
      </div>
      ${help ? `<div class="run-over" role="dialog" aria-modal="true" aria-label="あそびかた"><div class="run-card"><h2>あそびかた<small>${agi ? 'アジリティ' : 'レース'}</small></h2>${agi ? R.agilityHelpHtml() : R.helpHtml()}
        <p class="run-hnote">ゴールすると ほうび（ごきげん+${RUN.mood}・♥+${RUN.love}）。<br>1日${RUN.perDay}回まで。はしるのは 何回でも。</p>
        <div class="btnrow"><button class="btn primary" type="button" data-s="ok">わかった</button></div></div></div>` : ''}`;
    root.querySelector('[data-s="x"]').addEventListener('click', () => this.close());
    root.querySelector('[data-s="help"]').addEventListener('click', () => this.select(true));
    const okb = root.querySelector('[data-s="ok"]');
    if (okb) okb.addEventListener('click', () => this.select());
    root.querySelectorAll('[data-mode]').forEach(b => b.addEventListener('click', () => {
      if (this.helpOn || b.dataset.mode === this.mode) return;
      this.mode = b.dataset.mode === 'agility' ? 'agility' : 'race';
      this.select(false, 'mode');
    }));
    root.querySelectorAll('[data-course]').forEach(b => b.addEventListener('click', () => { if (!this.helpOn) this.start(b.dataset.course); }));
    /* フォーカスは ページ（あそびかたの ときは「わかった」、切りかえた ときは その ボタン）。指で ひらいた ときに カードに わくが 出ない ように。Tab で カードへ */
    const f = okb || (focus === 'mode' && root.querySelector('[data-mode][aria-pressed="true"]')) || this.page;
    if (f) try { f.focus({ preventScroll:true }); } catch(e){}
  },
  /* コースの レース・アジリティ（スタートの 画面から）。「つぎの コースへ」は 同じ しゅるいの 中で */
  start(id){
    const root = this.root(), R = this.R;
    if (!root || !R) return;
    this.drop();
    this.helpOn = false;
    const race = R.COURSES.map(c => c.id), agi = (R.AGILITY_COURSES || []).map(c => c.id);
    const mode = race.indexOf(id) >= 0 ? 'race' : agi.indexOf(id) >= 0 ? 'agility' : null;
    if (!mode) return;
    const list = mode === 'race' ? race : agi, i = list.indexOf(id);
    this.course = id; this.mode = mode;
    root.className = 'run-root';
    root.innerHTML = '';
    const n = petWear().neck, b = S.run && hasId(S.run.best, id) ? S.run.best[id] : null;
    const o = {
      container:root, course:id, look:normalizeLook(S.pet.look), neckWear:n && hasId(WEAR_BY_ID, n) ? WEAR_BY_ID[n] : null,
      name:esc(S.pet.name), art:renderPet(S.pet.look, { wear:petWear() }),
      best:b ? b / 1000 : null, next:list[i + 1] || null,
      onExit:() => this.close(), onSelect:() => this.select(), onNext:next => this.start(next),
      onFinish:info => this.finish(info),
    };
    try {
      this.ctl = mode === 'race' ? R.mountRace(Object.assign(o, { rivals:this.rivals() })) : R.mountAgility(o);
    } catch(e){
      this.ctl = null;
      this.wait('3Dの がめんを ひらけませんでした', 'この端末では あそべないみたい');
    }
  },
  /* ゴール：ルールに ほうびと 記録を たのみ（LINE に ほぞんしている子が つながっていない ときは たのまない）、ゴールの カードに 出す HTML を かえす */
  async finish(info){
    this.ran = true;
    const p = { course:info.course, ms:info.ms, misses:info.misses };
    if (info.rank != null) p.rank = info.rank;   /* アジリティは 順位が ない（タイムは 合計） */
    const r = Act.blocked() ? { ok:false, why:'offline' } : await Act.run('run', p);
    if (r && r.ok){ playEvents(r.ev); commit(); }
    return this.record(r);
  },
  /* ほうびと ベストとの 差（数字は 数に してから 出す。差は 見えている 100分の1秒で くらべる＝わんランと 同じ） */
  record(r){
    const n = v => Math.max(0, Math.floor(Number(v) || 0));
    if (!r || !r.ok) return '<b class="run-rec-h">きろく できなかったよ</b><span>こんどは きろく できるように するね</span>';
    const ms = n(r.ms), prev = r.prev == null ? null : n(r.prev), h = v => Math.round(v / 10), sec = d => (d / 100).toFixed(2) + '秒';
    let head, sub = '';
    if (prev === null) head = 'はじめての きろく！';
    else {
      const d = h(ms) - h(prev);
      if (d < 0){ head = 'ベスト こうしん！'; sub = `まえより ${sec(-d)} はやいよ`; }
      else if (d > 0){ head = `ベストまで あと ${sec(d)}`; sub = `ベスト ${runSec(prev)}`; }
      else head = 'ベストと おなじ タイム！';
    }
    const left = n(r.left);
    const gift = r.reward ? `ごきげん+${RUN.mood}・♥+${RUN.love}<br>${left ? `きょうの ほうび あと${left}回` : 'きょうの ほうびは ここまで'}` : 'きょうの ほうびは おわり。<br>あした また もらえるよ';
    return `<b class="run-rec-h${r.best ? ' best' : ''}">${head}</b>${sub ? `<span>${sub}</span>` : ''}<span class="run-rec-g">${gift}</span>`;
  },
  pause(){ if (this.ctl) this.ctl.pause(); },
  close(){
    const page = this.page;
    if (!page) return;
    this.page = null; this.tok++; this.helpOn = false;
    this.drop();
    document.removeEventListener('keydown', this.onKey, true);
    page.remove();
    document.documentElement.classList.remove('run-open');
    const app = $('#app');
    if (app){ app.removeAttribute('aria-hidden'); app.inert = false; }
    const back = this.back && this.back.isConnected ? this.back : $('#actPlay');
    if (back && back.focus) try { back.focus({ preventScroll:true }); } catch(e){}
    if (this.ran && S && !Pet.busy){
      Pet.wake(); Pet.wag(1600); hearts(3);
      Pet.say(isCat() ? 'ラン たのしかったにゃ！' : 'ラン たのしかった！');
    }
    this.ran = false;
  },
};
{
  /* 「あそぶ」：いままでの シート（ボール・パズル）に ラン を 足す */
  const base = openPlay;
  $('#actPlay').removeEventListener('click', openPlay);
  openPlay = function(){ base(); RunUI.addTile(); };
  $('#actPlay').addEventListener('click', openPlay);
  const busy = Nudge.busy;
  Nudge.busy = function(){ return busy.call(this) || !!RunUI.page; };
  const start = Game.start;
  Game.start = function(greet, away){ if (RunUI.page) RunUI.close(); return start.call(this, greet, away); };
}
