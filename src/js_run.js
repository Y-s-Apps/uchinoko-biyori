/* ===== うちのこラン（仮）：ホーム画面版だけ（2026-11-21 P2。docs/RUN_DESIGN.md） =====
 * build.sh の RUN_HOME=1 のとき js_features.js の すぐあとに 入る（LINE版・Claude版には 入らない＝RUN_LINE=0・RUN_CLAUDE=0。サーバーも つかわない）。
 * 3D の ゲーム（Three.js と src/run/）は 1つの ファイル RUN_SRC（run-<ハッシュ>.js。中身は src/run_bundle.js）に まとめてあり、
 * ランを ひらいた ときだけ 読みこむ。integrity は RUN_SRI、CSP は その ファイルの URL だけ（build.sh が 入れる）。Service Worker も とっておく。
 * - 「あそぶ」の シートに 3つめ「ラン」（openPlay を 包む）。WebGL 2 が ない 端末は「この端末では あそべません」で ひらかない。
 * - ページごと うつる #runPage（パズルと 同じ 重なり 45。うしろの #app は inert）。とじたら ゲームを ぜんぶ 片づける（dispose）。
 * - 子が 入れかわったら（Game.start）とじる。よるの ひとこと（Nudge）は ランの あいだ まつ。
 * - P2 は レースの「こうえん」1コースだけ・ほうび なし（セーブ S は かえない）。 */
const RUN_ICON = '<path d="M2.5 8.5h5M1.5 12.5h5M3 16.5h4" stroke="#6FABE3" stroke-width="2" stroke-linecap="round"/><ellipse cx="15.6" cy="15.6" rx="4.7" ry="3.9" fill="#F0A04B"/><circle cx="10.4" cy="10.6" r="1.9" fill="#F0A04B"/><circle cx="13.6" cy="7.4" r="1.9" fill="#F0A04B"/><circle cx="17.7" cy="7.4" r="1.9" fill="#F0A04B"/><circle cx="20.8" cy="10.6" r="1.9" fill="#F0A04B"/>';
const RunUI = {
  page:null, ctl:null, back:null, tok:0, gl:null, loading:null, ran:false, onKey:null,
  /* WebGL 2（Three.js r170 が つかう）が あるか。1回だけ 見て、ためしの 3D は すぐ 手ばなす */
  canPlay(){
    if (this.gl === null){
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
    const ok = this.canPlay();
    tiles.classList.add('run3');
    tiles.insertAdjacentHTML('beforeend', `<button class="tile" type="button" data-play="run"${ok ? '' : ' aria-disabled="true"'}><svg viewBox="0 0 24 24" aria-hidden="true">${RUN_ICON}</svg><span class="tname">ラン<small>こうえんの レース</small></span><span class="gain">${ok ? 'おともだちと<br>きょうそう' : 'この端末では<br>あそべません'}</span></button>`);
    const note = sh.querySelector('.note');
    if (note) note.insertAdjacentHTML('afterend', `<p class="note">${ok ? 'ランは、うちのこが おともだちと こうえんを はしる レース。スワイプで よけて、ジャンプで とびこえよう！' : 'ランは 3Dの がめんを つかうので、この端末では あそべません。'}</p>`);
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
    page.setAttribute('role', 'dialog'); page.setAttribute('aria-modal', 'true'); page.setAttribute('aria-label', 'ラン');
    page.innerHTML = '<div class="run-root"></div>';
    document.body.appendChild(page);
    this.page = page;
    document.documentElement.classList.add('run-open');
    const app = $('#app');
    if (app){ app.setAttribute('aria-hidden', 'true'); app.inert = true; }
    /* ページを うごかさない（パズルと 同じ。ボタンの 上の タップと、メニューの スクロールは そのまま） */
    const still = e => {
      if (!e.cancelable) return;
      const o = e.target.closest && e.target.closest('.run-over');
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
      if (!(this.ctl && this.ctl.escape())) this.close();
    };
    document.addEventListener('keydown', this.onKey, true);
    const tok = ++this.tok;
    this.wait('じゅんび しているよ…', null);
    this.load().then(R => { if (tok === this.tok && this.page) this.mount(R); },
      () => { if (tok === this.tok && this.page) this.wait('よみこめませんでした', 'つながっている ところで、<br>もういちど ひらいてね'); });
    try { page.focus({ preventScroll:true }); } catch(e){}
  },
  /* ゲームが はじまる 前の 画面（じゅんび・よみこめない）。sub が あれば「とじる」も */
  wait(head, sub){
    const root = this.page && this.page.querySelector('.run-root');
    if (!root) return;
    root.className = 'run-root';
    root.innerHTML = `<div class="run-hud"><div class="run-top"><button class="closebtn run-btn" type="button" data-w="x" aria-label="ランを やめる">${ICON_X}</button></div></div>
      <div class="run-over"><div class="run-card"><h2>${head}</h2>${sub ? `<p class="run-sub">${sub}</p><div class="btnrow"><button class="btn primary" type="button" data-w="x">とじる</button></div>` : ''}</div></div>`;
    root.querySelectorAll('[data-w="x"]').forEach(b => b.addEventListener('click', () => this.close()));
    const f = root.querySelector('.btn.primary');
    if (f) try { f.focus({ preventScroll:true }); } catch(e){}
  },
  mount(R){
    const root = this.page.querySelector('.run-root');
    root.innerHTML = '';
    const n = petWear().neck;
    try {
      this.ctl = R.mountRace({
        container:root, look:normalizeLook(S.pet.look), neckWear:n && hasId(WEAR_BY_ID, n) ? WEAR_BY_ID[n] : null,
        name:esc(S.pet.name), rivals:this.rivals(), art:renderPet(S.pet.look, { wear:petWear() }),
        onExit:() => this.close(), onFinish:() => { this.ran = true; },
      });
    } catch(e){
      this.ctl = null;
      this.wait('3Dの がめんを ひらけませんでした', 'この端末では あそべないみたい');
    }
  },
  pause(){ if (this.ctl) this.ctl.pause(); },
  close(){
    const page = this.page;
    if (!page) return;
    this.page = null; this.tok++;
    if (this.ctl){ try { this.ctl.dispose(); } catch(e){} this.ctl = null; }
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
