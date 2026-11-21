/* うちのこラン（仮）：レースの 画面（P2。docs/RUN_DESIGN.md）
 *
 *   mountRace({ container, look, neckWear, name, rivals, art, onExit, onFinish }) → { pause, escape, dispose, sim, renderer, frames, status }
 *
 * わんラン v33 の race-game.js（mountRace）を、うちのこ日和 用に 作りなおした もの（レースだけ。アジリティは P4）。
 * - 走るのは うちのこ（pet3d.js の makePet3D。look は normalizeLook() の あと、neckWear は くびの きせかえ か null）。
 *   おともだち 4ひきは rivals（{ look, label }。うちのこと 同じ 種類）を detail 0.6 で。
 * - ルール（race-sim.js）・道と 景色（race-track.js）・カメラ（park-camera.js）・足の 接地（dog-gait.js の poseLegs）は わんランの まま。
 * - 画面の 文字・ボタンは うちのこ日和の 書き方（やさしい ひらがな・文節の スペース）。色は head.html の トークン（CSS は src/run/run.css）。
 * - name・rivals[].label・art は ホストが 作った HTML（esc 済み）。ここでは そのまま 入れる。
 * - アプリを はなれたら（visibilitychange・blur・pagehide）一時停止。dispose() で 描く ループ・タイマー・リスナー・WebGL を ぜんぶ 片づける。
 * - P2 は「こうえん」1コース・ほうび なし（onFinish は P3 の ほうびの ため。いまは ホストが おへやの ひとことに つかうだけ）。 */
import * as T from 'three';
import { makePet3D, posePet3D, disposePet3D } from './pet3d.js';
import { footingFor, poseLegs } from './wanrun/dog-gait.js';
import { RACE, RaceSimulation, gestureAction } from './wanrun/race-sim.js';
import { routePoint, cornerAt } from './wanrun/race-route.js';
import { makeRaceTrack } from './wanrun/race-track.js';
import { makeParkCamera } from './wanrun/park-camera.js';
import { chaseCameraPose } from './wanrun/chase-camera.js';
import { biscuitIcon } from './wanrun/park-biscuit.js';

const COURSES = { park:{ name:'こうえん' } };
const ICON_X = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>';
const ICON_PAUSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 6v12M15.5 6v12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
/* うちのこの 大きさ（わんランの 犬は 公園で 0.62。3D の うちのこは 耳まで 約1.3 なので 同じ くらい） */
export const PET_SCALE = .62;

/* 時計：わんランと 同じ 丸め（00:59.9 → 01:00.0） */
export function formatClock(seconds){
  const tenths = Math.round(seconds * 10), m = Math.floor(tenths / 600), s = Math.floor(tenths / 10) % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${tenths % 10}`;
}
export const formatTime = t => t.toFixed(2) + '秒';

/* あそびかた（わんランの help-content.js を やさしく 書きなおした） */
function helpHtml(){
  const row = (icon, title, text) => `<div class="run-hrow"><b aria-hidden="true">${icon}</b><div><strong>${title}</strong><span>${text}</span></div></div>`;
  return `<div class="run-hrows">
    ${row('↔', 'よこに スワイプ', 'となりの レーンへ。トンネルの 中で かべに ぶつかると おそく なるよ')}
    ${row('↱', 'まがりかど', 'やじるしが 出たら、まがる ほうへ スワイプ。まがりそこねて とまっても、同じ スワイプで また はしりだすよ')}
    ${row('↑', 'うえに スワイプ', 'ジャンプ。ハードルを とびこえよう。トンネルは そのまま はしってね')}
    ${row('↓', 'したに スワイプ', 'すこしだけ ブレーキ')}
    ${row('●', 'タップ', 'おやつを 20こ あつめると、すきな ときに タップで 3秒 ダッシュ')}
  </div><p class="run-hnote">キーボードは やじるしと スペースで あそべます</p>`;
}

export function mountRace(opts){
  const { container, look, neckWear = null, name = 'うちのこ', rivals = [], art = '', onExit = () => {}, onFinish = () => {} } = opts;
  const courseId = 'park', course = COURSES[courseId];
  const sim = new RaceSimulation(courseId);
  const reduced = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const parkCamera = makeParkCamera(sim.layout.obstacles);
  const point = sim.layout.point || routePoint, length = sim.layout.length || RACE.length, total = sim.cpus.length + 1;
  const petScale = opts.petScale || PET_SCALE;
  let renderer = null, scene = null, camera = null, light = null, track = null, frameId = 0, last = 0, drawn = 0, uiTime = 0;
  let disposed = false, pointer = null, msgTimer = 0, helpBack = null, frames = 0, cameraOffset = 6, countLabel = '', cueKey = '', lost = false;
  const pets = [];
  /* 選手と 名前：[うちのこ, おともだち×4]（わんランの cpu0〜3 の じゅん） */
  const labels = new Map([[sim.player.id, `${name}<small>（うちのこ）</small>`], ...sim.cpus.map((c, i) => [c.id, rivals[i] ? rivals[i].label : 'おともだち'])]);

  container.className = 'run-root';
  container.dataset.course = courseId;
  container.innerHTML = `<canvas class="run-canvas" tabindex="0" aria-label="${course.name}の レース。よこに スワイプで レーンと まがりかど、うえで ジャンプ、したで ブレーキ、おやつが たまったら タップで ダッシュ"></canvas>
    <div class="run-hud">
      <div class="run-top">
        <button class="closebtn run-btn" type="button" data-run="x" aria-label="ランを やめる">${ICON_X}</button>
        <div class="run-chip run-rank"><b data-q="rank">1</b><span>位 / ${total}ひき</span></div>
        <div class="run-chip run-treat">${biscuitIcon}<b data-q="treats">0</b></div>
        <span class="run-gap"></span>
        <button class="closebtn run-btn" type="button" data-run="help" aria-label="あそびかた">？</button>
        <button class="closebtn run-btn" type="button" data-run="pause" aria-label="ひとやすみ" hidden>${ICON_PAUSE}</button>
      </div>
      <div class="run-line">
        <div class="run-progress" role="progressbar" aria-label="コースの すすみぐあい" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
          <i class="run-fill" data-q="fill"></i>${sim.cpus.map((_, i) => `<i class="run-mark" data-row="${i}" aria-hidden="true"></i>`).join('')}<i class="run-me" aria-hidden="true"></i>
        </div>
        <div class="run-chip run-clock" data-q="clock">00:00.0</div>
      </div>
    </div>
    <div class="run-cue" data-q="cue" role="status" hidden></div>
    <div class="run-count" data-q="count" aria-live="polite"></div>
    <div class="run-msg" data-q="msg" role="status"></div>
    <div class="run-bottom">
      <div class="run-gauge-l">${biscuitIcon}<b data-q="hint">ダッシュ</b></div>
      <div class="run-gauge" role="meter" aria-label="ダッシュの ゲージ" aria-valuemin="0" aria-valuemax="${RACE.gaugeMax}" aria-valuenow="0"><i data-q="gauge"></i></div>
      <b class="run-gauge-n" data-q="gaugeN">0 / ${RACE.gaugeMax}</b>
    </div>
    <div class="run-over" data-q="over" role="dialog" aria-modal="true" aria-label="ランの メニュー" hidden></div>`;
  const q = k => container.querySelector(`[data-q="${k}"]`), btn = k => container.querySelector(`[data-run="${k}"]`);
  const canvas = container.querySelector('.run-canvas'), over = q('over');
  const marks = container.querySelectorAll('.run-mark'), me = container.querySelector('.run-me');

  /* ----- 3D ----- */
  function setup(){
    renderer = new T.WebGLRenderer({ canvas, antialias:true, powerPreference:'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.outputColorSpace = T.SRGBColorSpace;
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap;
    /* 光：うちのこの 色が 2D の 絵と そろう 光（P1 の 見くらべで 決めた NeutralToneMapping・露出 1）。わんランの 光（ACES）だと うすく 白っぽく なる */
    renderer.toneMapping = T.NeutralToneMapping; renderer.toneMappingExposure = 1;
    const sky = '#9ed9ee';
    scene = new T.Scene(); scene.background = new T.Color(sky); scene.fog = new T.Fog(sky, 32, 107);
    camera = new T.PerspectiveCamera(60, 1, .1, 180);
    scene.add(new T.HemisphereLight('#fffaf0', '#a9b792', 2.1));
    light = new T.DirectionalLight('#fff7ea', 2.1); light.castShadow = true; light.shadow.mapSize.set(1024, 1024);
    Object.assign(light.shadow.camera, { left:-12, right:12, top:12, bottom:-12, near:.5, far:45 });
    light.shadow.bias = -.0003; light.shadow.normalBias = .03; scene.add(light, light.target);
    /* 空（わんランの 公園と 同じ グラデーション） */
    const dome = new T.Mesh(new T.SphereGeometry(134, 24, 12), new T.ShaderMaterial({
      side:T.BackSide, depthWrite:false,
      uniforms:{ zenith:{ value:new T.Vector3(.26, .67, .88) }, horizon:{ value:new T.Vector3(.73, .91, .89) } },
      vertexShader:'varying float altitude; void main(){altitude=position.y/134.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader:'uniform vec3 zenith; uniform vec3 horizon; varying float altitude; void main(){vec3 sky=mix(horizon,zenith,smoothstep(-.035,.34,altitude));gl_FragColor=vec4(sky,1.);}',
    }));
    dome.name = 'park-sky'; dome.renderOrder = -10; scene.add(dome);
    track = makeRaceTrack(sim.layout); scene.add(track.root);
    const shadowGeo = new T.CircleGeometry(.55, 24), shadowMat = new T.MeshStandardMaterial({ color:'#536848', transparent:true, opacity:.15 });
    [{ look, neck:neckWear, detail:1 }, ...sim.cpus.map((_, i) => ({ look:rivals[i] && rivals[i].look || look, neck:null, detail:.6 }))].forEach((r, i) => {
      const pet = makePet3D(r.look, r.neck, { detail:r.detail });
      pet.scale.setScalar(petScale);
      pet.rotation.y = Math.PI;
      /* おともだち：かげを 落とすのは うちのこだけ（わんランと 同じ）。うちのこと カメラの あいだに 入ったら すける ように、はじめから transparent に しておく
         （とちゅうで transparent を かえると シェーダーを 作りなおすので、かえるのは opacity だけ） */
      const mats = [];
      if (i) pet.traverse(o => {
        if (!o.isMesh) return;
        o.castShadow = false;
        for (const m of [].concat(o.material)) if (!mats.includes(m)){ m.transparent = true; mats.push(m); }
      });
      const shadow = new T.Mesh(shadowGeo, shadowMat);
      shadow.rotation.x = -Math.PI / 2;
      scene.add(pet, shadow);
      pets.push({ pet, shadow, mats, fade:1 });
    });
    camera.position.set(0, 2.8, 6);
    resize();
  }
  function resize(){
    if (!renderer) return;
    const r = container.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / r.height; camera.fov = r.width > r.height ? 54 : 60; camera.updateProjectionMatrix();
    drawn = 0;
  }

  /* ----- 画面の 上に 出す もの ----- */
  function message(text){
    clearTimeout(msgTimer);
    const m = q('msg'); m.textContent = text; m.classList.toggle('show', !!text);
    if (text) msgTimer = setTimeout(() => { const x = q('msg'); if (x){ x.textContent = ''; x.classList.remove('show'); } }, 1300);
  }
  function menu(html, focusSel, kind){
    over.hidden = html == null;
    over.className = 'run-over' + (kind ? ' ' + kind : '');
    container.classList.toggle('menu', html != null);
    over.innerHTML = html == null ? '' : `<div class="run-card">${html}</div>`;
    syncButtons();
    if (html != null){ const f = over.querySelector(focusSel || '.btn.primary') || over.querySelector('button'); if (f) try { f.focus({ preventScroll:true }); } catch(e){} }
    return over;
  }
  /* 上の ボタン：走っている あいだは「ひとやすみ」、ほかは「？」 */
  function syncButtons(){
    const live = sim.status === 'running' || sim.status === 'countdown';
    btn('pause').hidden = !live || !over.hidden;
    btn('help').hidden = (live && over.hidden) || lost;   /* 3D が とまった あとは「とじる」だけ */
  }
  function ready(){
    helpBack = null;
    const o = menu(`<span class="run-over-l">レース</span><h2>${course.name}</h2>
      <p class="run-sub">${name}と おともだち ${total - 1}ひきで、<br>ゴールまで きょうそう！</p>
      <div class="btnrow"><button class="btn primary" type="button" data-m="go">はしる</button></div>`, null, 'top');
    o.querySelector('[data-m="go"]').addEventListener('click', begin);
  }
  function showHelp(back){
    helpBack = back;
    const o = menu(`<h2>あそびかた</h2>${helpHtml()}<div class="btnrow"><button class="btn primary" type="button" data-m="ok">わかった</button></div>`);
    o.querySelector('[data-m="ok"]').addEventListener('click', closeHelp);
  }
  function closeHelp(){ const b = helpBack; helpBack = null; if (b) b(); }
  function begin(){
    pointer = null; helpBack = null; menu(null);
    sim.start(); updateHUD(); syncButtons();
    try { canvas.focus({ preventScroll:true }); } catch(e){}
  }
  function pause(){
    pointer = null; sim.pause();
    if (sim.status !== 'paused') return;
    helpBack = null;
    const o = menu(`<h2>ひとやすみ</h2><p class="run-sub">${course.name}の とちゅうだよ</p>
      <div class="btnrow"><button class="btn" type="button" data-m="restart">さいしょから</button><button class="btn primary" type="button" data-m="resume">つづける</button></div>`);
    o.querySelector('[data-m="resume"]').addEventListener('click', resume);
    o.querySelector('[data-m="restart"]').addEventListener('click', restart);
    updateHUD();
  }
  function resume(){ menu(null); sim.resume(); last = performance.now(); updateHUD(); syncButtons(); try { canvas.focus({ preventScroll:true }); } catch(e){} }
  function restart(){
    sim.reset(); track.resetTreats(); camera.position.set(0, 2.8, 6); cameraOffset = 6; last = performance.now(); message('');
    begin();
  }
  function result(){
    const r = sim.result, first = r.rank === 1;
    const order = r.standings.map(({ id, time }, i) => `<li${id === sim.player.id ? ' class="me"' : ''}><span>${i + 1}位</span><span>${labels.get(id)}</span><b>${formatTime(time)}</b></li>`).join('');
    const o = menu(`<span class="run-over-l">${course.name}</span>
      <div class="run-res">${art ? `<div class="run-art" aria-hidden="true">${art}</div>` : ''}<div class="run-rankbig"><b>${r.rank}</b><span>位 / ${total}ひき</span></div></div>
      <h2>${first ? 'いちばんで ゴール！' : 'さいごまで はしったね！'}</h2>
      <div class="run-stats">
        <div><span>タイム</span><b>${formatTime(r.time)}</b></div><div><span>おやつ</span><b>${r.treats}こ</b></div>
        <div><span>ダッシュ</span><b>${r.dashes}回</b></div><div><span>ごつん</span><b>${r.hits}回</b></div>
      </div>
      <p class="run-sub">まがりそこね ${r.turnMisses}回</p>
      <details class="run-order"><summary>${total}ひきの じゅんいと タイム</summary><ol>${order}</ol></details>
      <div class="btnrow"><button class="btn" type="button" data-m="again">もういちど</button><button class="btn primary" type="button" data-m="exit">おわる</button></div>`);
    o.querySelector('[data-m="again"]').addEventListener('click', restart);
    o.querySelector('[data-m="exit"]').addEventListener('click', () => onExit());
    try { onFinish({ course:courseId, rank:r.rank, time:r.time, treats:r.treats, hits:r.hits }); } catch(e){}
  }
  function failed(head, sub){
    pointer = null; sim.pause(); lost = true;
    const o = menu(`<h2>${head}</h2><p class="run-sub">${sub}</p><div class="btnrow"><button class="btn primary" type="button" data-m="exit">とじる</button></div>`);
    o.querySelector('[data-m="exit"]').addEventListener('click', () => onExit());
  }
  function updateHUD(){
    q('rank').textContent = sim.rank;
    q('treats').textContent = sim.treatCount;
    const progress = Math.min(100, sim.player.s / length * 100);
    q('fill').style.width = progress + '%';
    container.querySelector('.run-progress').setAttribute('aria-valuenow', Math.round(progress));
    q('clock').textContent = formatClock(sim.time);
    me.hidden = sim.status === 'paused';
    me.style.left = progress + '%';
    sim.cpus.forEach((c, i) => { marks[i].style.left = Math.max(0, Math.min(100, c.s / length * 100)) + '%'; });
    const boost = sim.player.boost > 0, full = sim.gauge === RACE.gaugeMax && !boost;
    q('gaugeN').textContent = boost ? `${sim.player.boost.toFixed(1)}秒` : `${sim.gauge} / ${RACE.gaugeMax}`;
    q('gauge').style.width = sim.gauge / RACE.gaugeMax * 100 + '%';
    container.querySelector('.run-gauge').setAttribute('aria-valuenow', sim.gauge);
    container.classList.toggle('dash-ready', full); container.classList.toggle('boosting', boost);
    q('hint').textContent = boost ? 'ダッシュちゅう' : full ? 'タップで ダッシュ' : 'ダッシュ';
    updateCue();
    const label = sim.status === 'countdown' ? String(Math.ceil(sim.countdown)) : '';
    if (label !== countLabel){ countLabel = label; q('count').textContent = label; q('count').classList.toggle('show', !!label); }
  }
  /* まがりかどの 合図（わんランの updateTurnCue と 同じ じゅん：この さき → スワイプ → OK → カーブ） */
  function updateCue(){
    const cue = sim.status === 'running' ? sim.turnCue : null, el = q('cue');
    el.hidden = !cue; container.classList.toggle('turn-visible', !!cue);
    if (!cue){ cueKey = ''; return; }
    const right = cue.direction === 'right', d = right ? 'みぎ' : 'ひだり';
    const state = cue.waiting ? 'waiting' : cue.armed ? 'armed' : cue.active ? 'active' : 'ahead';
    const label = cue.waiting ? `${d}へ スワイプ` : cue.armed ? (sim.player.s >= cue.start ? `${d}カーブ` : `${d}へ OK`) : cue.active ? `${d}へ スワイプ` : `この さき ${d}カーブ`;
    const key = `${cue.id}:${state}:${label}`;
    if (key === cueKey) return;
    cueKey = key; el.dataset.state = state;
    el.innerHTML = `<strong aria-hidden="true">${right ? '↱' : '↰'}</strong><span><small>まがりかど ${cue.id + 1} / ${sim.layout.turns.length}</small><b>${label}</b></span>${cue.armed ? '<i aria-hidden="true">✓</i>' : ''}`;
  }

  /* ----- 1こまごと ----- */
  function frame(t){
    if (disposed) return;
    frameId = requestAnimationFrame(frame);
    const dt = last ? Math.max(0, Math.min(.2, (t - last) / 1000)) : 0; last = t;
    /* ふつうの おそい こまでも 障害物を とばさない ように こまかく わける（わんランと 同じ） */
    const steps = Math.max(1, Math.ceil(dt / .05));
    for (let i = 0; i < steps; i++) sim.step(dt / steps);
    for (const e of sim.drainEvents()){
      if (e.type === 'treat') track.collectTreat(e.id);
      else if (e.type === 'hit') message('ごつん！');
      else if (e.type === 'dash') message('ダッシュ！');
      else if (e.type === 'go') message('スタート！');
      else if (e.type === 'ready') message('おやつ 20こ！ タップで ダッシュ');
      else if (e.type === 'turn-wrong') message(e.direction === 'right' ? 'みぎだよ' : 'ひだりだよ');
      else if (e.type === 'turn-missed') message('ストップ！');
      else if (e.type === 'finish') result();
    }
    const live = sim.status === 'running' || sim.status === 'countdown';
    /* とまっている（スタート前・ひとやすみ・ゴールの あと）あいだは 1秒に 10回くらいだけ 描く（でんちの ため） */
    if (!live && drawn && t - drawn < 100) return;
    drawn = t || 1;
    const footing = footingFor(sim, false);
    [sim.player, ...sim.cpus].forEach((a, i) => {
      if (sim.status === 'paused') return;
      const P = pets[i], { pet, shadow } = P, held = i === 0 && sim.waitingTurn !== null;
      if (i){
        /* うちのこの すぐ うしろ（カメラとの あいだ）に いる おともだちは すかして、うちのこが いつも 見える ように する */
        const behind = sim.player.s - a.s, near = behind > .4 && behind < cameraOffset + .5 && Math.abs(a.x - sim.player.x) < 1.35;
        const want = near ? .32 : 1;
        if (P.fade !== want){
          P.fade += (want - P.fade) * Math.min(1, dt * 8 || 1);
          if (Math.abs(P.fade - want) < .01) P.fade = want;
          for (const m of P.mats) m.opacity = P.fade;
        }
      }
      const run = sim.status === 'running' && a.finishTime === null && !held, p = point(a.s, a.x), corner = cornerAt(a.s, 0, 0, sim.layout.turns);
      pet.position.set(p.x, a.y + (run && !reduced ? Math.abs(Math.cos(a.phase * 1.85)) * .025 : 0), p.z);
      pet.rotation.order = 'YXZ'; pet.rotation.x = 0; pet.rotation.y = Math.PI - p.heading;
      pet.rotation.z = run && !reduced ? (a.lane * RACE.lanewidth - a.x) * .07 + (corner ? (corner.direction === 'right' ? .08 : -.08) : 0) : 0;
      poseLegs(pet, a.phase, run, a.jumpElapsed !== null, footing);
      posePet3D(pet, t / 1000 + i, run, { legs:false, phase:a.phase, airborne:a.jumpElapsed !== null, reduced });
      shadow.position.set(p.x, .035, p.z); shadow.scale.setScalar(a.jumpElapsed !== null ? .7 : 1);
    });
    const p = sim.player;
    cameraOffset += (Math.min(8.65, Math.max(6, 3.58 / camera.aspect)) - cameraOffset) * (1 - Math.exp(-dt * 5));
    const anchor = point(p.s, p.x), pose = parkCamera(p, cameraOffset, 2.8 + (reduced ? 0 : p.y * .18));
    camera.position.set(pose.position.x, pose.position.y, pose.position.z); camera.lookAt(pose.target.x, pose.target.y, pose.target.z);
    const zoom = pose.zoom ?? 1;
    if (Math.abs(camera.zoom - zoom) > .00001){ camera.zoom = zoom; camera.updateProjectionMatrix(); }
    scene.getObjectByName('park-sky').position.copy(camera.position);
    light.position.set(anchor.x - 7, 12, anchor.z + 6); light.target.position.set(anchor.x, 0, anchor.z);
    uiTime += dt;
    if (uiTime > .08 || sim.status === 'countdown'){ updateHUD(); uiTime = 0; }
    renderer.render(scene, camera);
    frames++;
  }

  /* ----- さわる・キーボード（わんランと 同じ：指1本・28px で スワイプ・12px／350ms より みじかい タップは ダッシュ） ----- */
  function down(e){
    if (!e.isPrimary || sim.status !== 'running' || pointer) return;
    pointer = { id:e.pointerId, x:e.clientX, y:e.clientY, time:performance.now(), used:false, tap:true };
    try { canvas.setPointerCapture(e.pointerId); } catch(_){}
  }
  function read(e, release){
    if (!pointer || pointer.id !== e.pointerId || pointer.used) return;
    const dx = e.clientX - pointer.x, dy = e.clientY - pointer.y;
    if (Math.hypot(dx, dy) >= 12) pointer.tap = false;
    const action = gestureAction(dx, dy, performance.now() - pointer.time, false);
    if (!action || (action === 'dash' && (!release || !pointer.tap))) return;
    pointer.used = true;
    sim.input(action);
  }
  const move = e => read(e, false), cancel = e => { if (pointer && pointer.id === e.pointerId) pointer = null; }, up = e => { read(e, true); cancel(e); };
  function key(e){
    if (e.target && e.target.closest && e.target.closest('button,summary')) return;
    const map = { ArrowLeft:'left', ArrowRight:'right', ArrowUp:'jump', ArrowDown:'brake', ' ':'dash' };
    if (map[e.key]){ e.preventDefault(); if (!e.repeat) sim.input(map[e.key]); }
  }
  const hidden = () => { if (document.hidden) pause(); };
  const lostGL = e => { if (disposed) return; e.preventDefault(); failed('3Dの がめんが とまったよ', 'いちど とじて、<br>もういちど ひらいてね'); };
  canvas.addEventListener('pointerdown', down); canvas.addEventListener('pointermove', move); canvas.addEventListener('pointerup', up);
  canvas.addEventListener('pointercancel', cancel); canvas.addEventListener('lostpointercapture', cancel);
  canvas.addEventListener('webglcontextlost', lostGL);
  container.addEventListener('keydown', key);
  btn('x').addEventListener('click', () => { if (sim.status === 'running' || sim.status === 'countdown') pause(); else onExit(); });
  btn('pause').addEventListener('click', pause);
  btn('help').addEventListener('click', () => {
    if (helpBack) return;
    const s = sim.status;
    showHelp(s === 'paused' ? pause : s === 'finished' ? result : ready);
  });
  document.addEventListener('visibilitychange', hidden);
  addEventListener('blur', pause); addEventListener('pagehide', pause);
  addEventListener('resize', resize);
  const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(resize) : null;
  if (observer) observer.observe(container);

  let ok = true;
  try { setup(); ready(); frameId = requestAnimationFrame(frame); }
  catch(e){ ok = false; console.error('run: 3D unavailable', e); failed('3Dの がめんを ひらけませんでした', 'この端末では あそべないみたい'); }

  return {
    ok,
    get sim(){ return sim; },
    get renderer(){ return renderer; },
    get frames(){ return frames; },
    get status(){ return lost ? 'lost' : sim.status; },
    pause,
    /* Esc：あそびかたを とじる・走っていたら ひとやすみ。ほかは false（ホストが とじる） */
    escape(){
      if (lost) return false;
      if (helpBack){ closeHelp(); return true; }
      if (sim.status === 'running' || sim.status === 'countdown'){ pause(); return true; }
      return false;
    },
    dispose(){
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(frameId); clearTimeout(msgTimer);
      canvas.removeEventListener('webglcontextlost', lostGL);
      if (observer) observer.disconnect();
      document.removeEventListener('visibilitychange', hidden);
      removeEventListener('blur', pause); removeEventListener('pagehide', pause); removeEventListener('resize', resize);
      for (const { pet } of pets) disposePet3D(pet);
      const geos = new Set(), mats = new Set();
      if (scene) scene.traverse(o => { if (o.geometry) geos.add(o.geometry); if (o.material) [].concat(o.material).forEach(m => mats.add(m)); if (o.isInstancedMesh) o.dispose(); });
      geos.forEach(g => g.dispose()); mats.forEach(m => m.dispose());
      if (light) light.dispose();
      if (renderer){ renderer.dispose(); renderer.forceContextLoss(); }
      container.innerHTML = '';
    },
  };
}
