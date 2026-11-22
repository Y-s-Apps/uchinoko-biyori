/* うちのこラン：レースの 画面（P2・P3。docs/RUN_DESIGN.md）
 *
 *   mountRace({ container, course, look, neckWear, name, rivals, art, best, next, onExit, onSelect, onNext, onFinish })
 *     → { pause, escape, dispose, sim, renderer, frames, status, course }
 *   COURSES（3コースの 名前・むずかしさ・説明・景色の 色）・courseMap(id)（コースを えらぶ 画面の 小さな 地図 SVG）・helpHtml(id)・formatTime
 *
 * わんラン v33 の race-game.js（mountRace）を、うちのこ日和 用に 作りなおした もの（レースだけ。アジリティは agility.js〈P4〉）。
 * - 走るのは うちのこ（pet3d.js の makePet3D。look は normalizeLook() の あと、neckWear は くびの きせかえ か null）。
 *   おともだち 4ひきは rivals（{ look, label }。うちのこと 同じ 種類）を detail 0.6 で。
 * - ルール（race-sim.js）・道と 景色（race-track.js）・カメラ（park-camera.js）・足の 接地（dog-gait.js の poseLegs）は わんランの まま。
 * - 画面の 文字・ボタンは うちのこ日和の 書き方（やさしい ひらがな・文節の スペース）。走る あいだ、まんなかには 3・2・1 だけ（ひとことは 出さない）。色は head.html の トークン（CSS は src/run/run.css）。
 * - name・rivals[].label・art は ホストが 作った HTML（esc 済み）。ここでは そのまま 入れる。
 * - アプリを はなれたら（visibilitychange・blur・pagehide）一時停止。dispose() で 描く ループ・タイマー・リスナー・WebGL を ぜんぶ 片づける。
 * - P3：レース 3コース（こうえん・うみべ・もり。景色・空・霧・カメラ・砂地・うみべの みじかい フリックは わんランの まま）。
 *   ゴールで onFinish({ course, ms, rank, misses, … }) → ホストが ルール（Rules.act 'run'）で ほうびと 記録を 書き、ゴールの カードに 出す HTML を かえす
 *   （Promise。とどくまで「きろく しているよ…」）。つぎの コースへ（onNext）・コースを えらぶ（onSelect）・おわる（onExit）。 */
import * as T from 'three';
import { makePet3D, posePet3D, disposePet3D } from './pet3d.js';
import { footingFor, poseLegs } from './wanrun/dog-gait.js';
import { RACE, RaceSimulation, gestureAction } from './wanrun/race-sim.js';
import { routePoint, cornerAt } from './wanrun/race-route.js';
import { makeRaceTrack } from './wanrun/race-track.js';
import { makeParkCamera } from './wanrun/park-camera.js';
import { chaseCameraPose } from './wanrun/chase-camera.js';
import { biscuitIcon } from './wanrun/park-biscuit.js';

/* コース（わんランの courses.js と race-game.js の setup を うちのこ日和の ことばで）。じゅんばんは「つぎの コースへ」の じゅん。
   sky・fog・zenith・horizon は わんランの 空、scale・shadow は うちのこの 大きさと かげ（わんランは 公園 0.62・ほか 0.76）、
   flick は みじかい フリックでも うごく（うみべ）、ground は 半球光の 地面がわの 色、lv は むずかしさの 色（0 やさしい・1 ふつう・2 むずかしい） */
export const COURSES = [
  { id:'park', name:'こうえん', level:'やさしい', lv:0, color:'#a9bd87', desc:'4つの まがりかどを ぬけて、こうえんを かけまわろう', tags:['まがりかど', 'ハードル', 'トンネル'],
    sky:'#9ed9ee', fog:[32, 107], zenith:[.26, .67, .88], horizon:[.73, .91, .89], ground:'#a9b792', scale:.62, shadow:.55 },
  { id:'beach', name:'うみべ', level:'ふつう', lv:1, color:'#d4bf88', desc:'おやつの れつを おいかけて、すなはまの りゅうぼくを とびこえよう', tags:['りゅうぼく', 'すなはま', 'みち えらび'],
    sky:'#b5dce4', fog:[85, 175], zenith:[.20, .66, .85], horizon:[.91, .93, .81], ground:'#c4bc98', scale:.76, shadow:.8, flick:true },
  { id:'forest', name:'もり', level:'むずかしい', lv:2, color:'#6d9273', desc:'木の あいだを はしって、カーブと まるたを のりこえよう', tags:['まるた', 'つづく カーブ', 'タイミング'],
    sky:'#c1cfb0', fog:[42, 110], zenith:[.42, .69, .70], horizon:[.81, .89, .78], ground:'#97a585', scale:.76, shadow:.8 },
];
const courseOf = id => COURSES.find(c => c.id === id) || COURSES[0];
export const ICON_X = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>';
export const ICON_PAUSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 6v12M15.5 6v12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
/* うちのこの 大きさ（わんランの 犬は 公園で 0.62。3D の うちのこは 耳まで 約1.3 なので 同じ くらい。うみべ・もりは 0.76） */
export const PET_SCALE = .62;

/* 時計：わんランと 同じ 丸め（00:59.9 → 01:00.0） */
export function formatClock(seconds){
  const tenths = Math.round(seconds * 10), m = Math.floor(tenths / 600), s = Math.floor(tenths / 10) % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${tenths % 10}`;
}
/* ゴールの タイム（36.58秒）。100分の1秒に 丸めてから（ホストが 記録する ミリ秒〈Math.round(t × 100) × 10〉と 同じ 数に なる） */
export const formatTime = t => (Math.round(t * 100) / 100).toFixed(2) + '秒';
export const timeMs = t => Math.round(t * 100) * 10;

/* コースを えらぶ 画面の 小さな 地図（ほんとうの コースの 道から。スタートは 下、ゴールは 上の ほう） */
export function courseMap(id){
  const c = courseOf(id), lay = new RaceSimulation(c.id).layout, point = lay.point || routePoint, len = lay.length || RACE.length;
  const pts = [];
  for (let s = 0; s <= len; s += 3) pts.push(point(Math.min(s, len), 0));
  pts.push(point(len, 0));
  const xs = pts.map(p => p.x), zs = pts.map(p => p.z);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), z0 = Math.min(...zs), z1 = Math.max(...zs);
  const k = 76 / Math.max(x1 - x0, z1 - z0, 1), ox = 50 - (x0 + x1) / 2 * k, oz = 50 - (z0 + z1) / 2 * k;
  const xy = p => `${(p.x * k + ox).toFixed(1)} ${(p.z * k + oz).toFixed(1)}`;
  const d = 'M' + pts.map(xy).join('L');
  const dot = (s, lane, fill, r) => { const p = point(s, lane * RACE.lanewidth); return `<circle cx="${(p.x * k + ox).toFixed(1)}" cy="${(p.z * k + oz).toFixed(1)}" r="${r}" fill="${fill}"/>`; };
  const obs = lay.obstacles.map(o => dot(o.s, 0, o.type === 'tunnel' ? '#5f8ea6' : o.type === 'log' ? '#8a6a45' : '#c78465', 3.2)).join('');
  const deco = c.id === 'beach' ? '<path d="M0 0h100v100H0z" fill="#d4bf88"/><path d="M78 0h22v100H78z" fill="#7cc3d6"/><path d="M74 0q5 12 0 25t0 25 0 25 0 25h4V0z" fill="#e9ddb3"/>'
    : c.id === 'forest' ? '<path d="M0 0h100v100H0z" fill="#6d9273"/>' + [[12, 14], [86, 20], [14, 82], [88, 76], [50, 8], [10, 48], [90, 50]].map(([x, y]) => `<path d="M${x} ${y - 7}l6 11h-12z" fill="#4f7356"/>`).join('')
    : '<path d="M0 0h100v100H0z" fill="#a9bd87"/>' + [[12, 14], [86, 18], [12, 84], [88, 82]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#86a56a"/>`).join('');
  const st = pts[0], en = pts[pts.length - 1];
  return `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">${deco}<path d="${d}" fill="none" stroke="#f3e9cf" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${d}" fill="none" stroke="#d8c79f" stroke-width="1.4" stroke-dasharray="3 4" stroke-linecap="round"/>${obs}
    <circle cx="${(st.x * k + ox).toFixed(1)}" cy="${(st.z * k + oz).toFixed(1)}" r="4.6" fill="#4fae9a" stroke="#fff" stroke-width="1.6"/>
    <circle cx="${(en.x * k + ox).toFixed(1)}" cy="${(en.z * k + oz).toFixed(1)}" r="4.6" fill="#ec6c8a" stroke="#fff" stroke-width="1.6"/></svg>`;
}

/* あそびかた（わんランの help-content.js を やさしく 書きなおした）。id が なければ（コースを えらぶ 画面）3コース ぶん */
export function helpHtml(id){
  const row = (icon, title, text) => `<div class="run-hrow"><b aria-hidden="true">${icon}</b><div><strong>${title}</strong><span>${text}</span></div></div>`;
  const side = { park:'となりの レーンへ。トンネルの 中で かべに ぶつかると おそく なるよ', beach:'となりの レーンへ。うみべは みじかい スワイプでも うごけるよ', forest:'となりの レーンへ' }[id] || 'となりの レーンへ';
  const jump = { park:'ジャンプ。ハードルを とびこえよう。トンネルは そのまま はしってね', beach:'ジャンプ。りゅうぼくを とびこえよう。すなの 上は すこし おそく なるよ', forest:'ジャンプ。まるたを とびこえよう' }[id]
    || 'ジャンプ。ハードル・りゅうぼく・まるたを とびこえよう';
  return `<div class="run-hrows">
    ${row('↔', 'よこに スワイプ', side)}
    ${row('↱', 'まがりかど', 'やじるしが 出たら、まがる ほうへ スワイプ。まがりそこねて とまっても、同じ スワイプで また はしりだすよ')}
    ${row('↑', 'うえに スワイプ', jump)}
    ${row('↓', 'したに スワイプ', 'すこしだけ ブレーキ')}
    ${row('●', 'タップ', 'おやつを 20こ あつめると、すきな ときに タップで 3秒 ダッシュ')}
  </div><p class="run-hnote">キーボードは やじるしと スペースで あそべます</p>`;
}

export function mountRace(opts){
  const { container, look, neckWear = null, name = 'うちのこ', rivals = [], art = '', best = null, next = null,
    onExit = () => {}, onSelect = null, onNext = null, onFinish = () => null } = opts;
  const course = courseOf(opts.course), courseId = course.id, park = courseId === 'park';
  const sim = new RaceSimulation(courseId);
  const reduced = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  /* カメラ：公園は わんランの 公園の カメラ（トンネルで 寄る）、ほかは うしろから 追う カメラ（わんランと 同じ） */
  const parkCamera = park ? makeParkCamera(sim.layout.obstacles) : null;
  const point = sim.layout.point || routePoint, length = sim.layout.length || RACE.length, total = sim.cpus.length + 1;
  const petScale = opts.petScale || course.scale;
  const nextC = next && COURSES.some(c => c.id === next) ? courseOf(next) : null;
  let finishTok = 0;
  let renderer = null, scene = null, camera = null, light = null, track = null, frameId = 0, last = 0, drawn = 0, uiTime = 0;
  let disposed = false, pointer = null, helpBack = null, frames = 0, cameraOffset = 6, countLabel = '', cueKey = '', lost = false;
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
    scene = new T.Scene(); scene.background = new T.Color(course.sky); scene.fog = new T.Fog(course.sky, course.fog[0], course.fog[1]);
    camera = new T.PerspectiveCamera(60, 1, .1, 180);
    scene.add(new T.HemisphereLight('#fffaf0', course.ground, 2.1));
    light = new T.DirectionalLight('#fff7ea', 2.1); light.castShadow = true; light.shadow.mapSize.set(1024, 1024);
    Object.assign(light.shadow.camera, { left:-12, right:12, top:12, bottom:-12, near:.5, far:45 });
    light.shadow.bias = -.0003; light.shadow.normalBias = .03; scene.add(light, light.target);
    /* 空（わんランと 同じ グラデーション。コースごとの 色） */
    const dome = new T.Mesh(new T.SphereGeometry(134, 24, 12), new T.ShaderMaterial({
      side:T.BackSide, depthWrite:false,
      uniforms:{ zenith:{ value:new T.Vector3(...course.zenith) }, horizon:{ value:new T.Vector3(...course.horizon) } },
      vertexShader:'varying float altitude; void main(){altitude=position.y/134.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader:'uniform vec3 zenith; uniform vec3 horizon; varying float altitude; void main(){vec3 sky=mix(horizon,zenith,smoothstep(-.035,.34,altitude));gl_FragColor=vec4(sky,1.);}',
    }));
    dome.name = 'park-sky'; dome.renderOrder = -10; scene.add(dome);
    track = makeRaceTrack(sim.layout); scene.add(track.root);
    const depthOnly = new T.MeshBasicMaterial({ colorWrite:false });
    const shadowGeo = new T.CircleGeometry(course.shadow, 24), shadowMat = new T.MeshStandardMaterial({ color:'#536848', transparent:true, opacity:.15 });
    [{ look, neck:neckWear, detail:1 }, ...sim.cpus.map((_, i) => ({ look:rivals[i] && rivals[i].look || look, neck:null, detail:.6 }))].forEach((r, i) => {
      const pet = makePet3D(r.look, r.neck, { detail:r.detail });
      pet.scale.setScalar(petScale);
      pet.rotation.y = Math.PI;
      /* おともだち：かげを 落とすのは うちのこだけ（わんランと 同じ）。うちのこと カメラの あいだに 入ったら すける ように、はじめから transparent に しておく
         （とちゅうで transparent を かえると シェーダーを 作りなおすので、かえるのは opacity だけ） */
      const mats = [], depth = [];
      if (i){
        const meshes = [];
        pet.traverse(o => { if (o.isMesh) meshes.push(o); });
        for (const o of meshes){
          o.castShadow = false;
          for (const m of [].concat(o.material)) if (!mats.includes(m)){ m.transparent = true; mats.push(m); }
          /* すける ときは さきに おもての ふかさだけ 書く（renderOrder 1＝景色・うちのこの あと、すける ものの 前）。
             これが ないと 頭の うらから 目・かおの もようが すけて 見えて、おばけの ように なる（うみべ・もりは 大きい 0.76 なので 目立った） */
          const d = new T.Mesh(o.geometry, depthOnly);
          d.renderOrder = 1; d.visible = false; d.castShadow = false; d.frustumCulled = o.frustumCulled;
          o.add(d); depth.push(d);
        }
      }
      const shadow = new T.Mesh(shadowGeo, shadowMat);
      shadow.rotation.x = -Math.PI / 2;
      scene.add(pet, shadow);
      pets.push({ pet, shadow, mats, depth, fade:1 });
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
  /* 「コースを えらぶ」の ボタン（ホストが onSelect を くれた ときだけ） */
  const selectBtn = () => onSelect ? '<button class="btn" type="button" data-m="select">コースを えらぶ</button>' : '';
  function bindSelect(o){ const b = o.querySelector('[data-m="select"]'); if (b) b.addEventListener('click', () => onSelect()); }
  function ready(){
    helpBack = null;
    const o = menu(`<span class="run-over-l">レース・${course.level}</span><h2>${course.name}</h2>
      <p class="run-sub">${name}と おともだち ${total - 1}ひきで、<br>ゴールまで きょうそう！</p>
      ${best ? `<p class="run-best">ベスト <b>${formatTime(best)}</b></p>` : ''}
      <div class="btnrow">${selectBtn()}<button class="btn primary" type="button" data-m="go">はしる</button></div>`, '[data-m="go"]', 'top');
    o.querySelector('[data-m="go"]').addEventListener('click', begin);
    bindSelect(o);
  }
  function showHelp(back){
    helpBack = back;
    const o = menu(`<h2>あそびかた</h2>${helpHtml(courseId)}<div class="btnrow"><button class="btn primary" type="button" data-m="ok">わかった</button></div>`);
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
      <div class="btnrow"><button class="btn" type="button" data-m="restart">さいしょから</button><button class="btn primary" type="button" data-m="resume">つづける</button></div>
      ${onSelect ? `<div class="btnrow run-more">${selectBtn()}</div>` : ''}`, '[data-m="resume"]');
    o.querySelector('[data-m="resume"]').addEventListener('click', resume);
    o.querySelector('[data-m="restart"]').addEventListener('click', restart);
    bindSelect(o);
    updateHUD();
  }
  function resume(){ menu(null); sim.resume(); last = performance.now(); updateHUD(); syncButtons(); try { canvas.focus({ preventScroll:true }); } catch(e){} }
  function restart(){
    sim.reset(); track.resetTreats(); camera.position.set(0, 2.8, 6); cameraOffset = 6; last = performance.now();
    finishTok++; recHtml = null;
    begin();
  }
  /* ゴール：順位・タイムなど。ほうびと 記録（ベストとの 差）は ホストの onFinish が かえす HTML を「きろく」の ところに 入れる。
     「もういちど」「つぎの コースへ（つぎが ある とき）／おわる」、下に「コースを えらぶ」（と つぎが ある ときは「おわる」） */
  let recHtml = null;
  function result(record){
    const r = sim.result, first = r.rank === 1;
    const order = r.standings.map(({ id, time }, i) => `<li${id === sim.player.id ? ' class="me"' : ''}><span>${i + 1}位</span><span>${labels.get(id)}</span><b>${formatTime(time)}</b></li>`).join('');
    const nextBtn = nextC && onNext ? `<button class="btn primary run-next" type="button" data-m="next" aria-label="つぎの コース「${nextC.name}」へ">つぎの コースへ<small>${nextC.name}</small></button>` : '';
    const exitBtn = `<button class="btn${nextBtn ? '' : ' primary'}" type="button" data-m="exit">おわる</button>`;
    const more = (onSelect ? selectBtn() : '') + (nextBtn ? exitBtn : '');
    const o = menu(`<span class="run-over-l">${course.name}</span>
      <div class="run-res">${art ? `<div class="run-art" aria-hidden="true">${art}</div>` : ''}<div class="run-rankbig"><b>${r.rank}</b><span>位 / ${total}ひき</span></div></div>
      <h2>${first ? 'いちばんで ゴール！' : 'さいごまで はしったね！'}</h2>
      <div class="run-stats">
        <div><span>タイム</span><b>${formatTime(r.time)}</b></div><div><span>おやつ</span><b>${r.treats}こ</b></div>
        <div><span>ダッシュ</span><b>${r.dashes}回</b></div><div><span>ごつん</span><b>${r.hits}回</b></div>
      </div>
      <p class="run-sub">まがりそこね ${r.turnMisses}回</p>
      <div class="run-rec" data-q="rec" role="status">${recHtml == null ? '<span class="run-rec-wait">きろく しているよ…</span>' : recHtml}</div>
      <details class="run-order"><summary>${total}ひきの じゅんいと タイム</summary><ol>${order}</ol></details>
      <div class="btnrow"><button class="btn" type="button" data-m="again">もういちど</button>${nextBtn || exitBtn}</div>
      ${more ? `<div class="btnrow run-more">${more}</div>` : ''}`, '[data-m="again"]');
    o.querySelector('[data-m="again"]').addEventListener('click', restart);
    o.querySelector('[data-m="exit"]').addEventListener('click', () => onExit());
    const nb = o.querySelector('[data-m="next"]');
    if (nb) nb.addEventListener('click', () => onNext(nextC.id));
    bindSelect(o);
    if (!record) return;
    /* ゴールした ときだけ（あそびかたから もどった ときは よばない）：ホストが ほうびと 記録を 書いて、出す HTML を かえす */
    recHtml = null;
    const tok = ++finishTok;
    let job;
    try { job = onFinish({ course:courseId, ms:timeMs(r.time), time:r.time, rank:r.rank, misses:r.hits + r.turnMisses, treats:r.treats, hits:r.hits, turnMisses:r.turnMisses }); }
    catch(e){ job = null; }
    Promise.resolve(job).then(html => html, () => null).then(html => {
      if (disposed || tok !== finishTok) return;
      recHtml = html || '';
      const el = q('rec');
      if (el) el.innerHTML = recHtml;
    });
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
    /* まんなかに ひとこと（わんランの「スタート！」「ぶつかった！」「ダッシュ！」など）は 出さない（2026-11-22 オーナー。走る ところを かくさない）。
       ダッシュは 下の ゲージ、まがりかどは 上の 合図で わかる */
    for (const e of sim.drainEvents()){
      if (e.type === 'treat') track.collectTreat(e.id);
      else if (e.type === 'finish') result(true);
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
          for (const d of P.depth) d.visible = P.fade < 1;
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
    cameraOffset += ((park ? Math.min(8.65, Math.max(6, 3.58 / camera.aspect)) : 6) - cameraOffset) * (1 - Math.exp(-dt * 5));
    const anchor = point(p.s, p.x);
    let pose;
    if (park) pose = parkCamera(p, cameraOffset, 2.8 + (reduced ? 0 : p.y * .18));
    else {
      /* うみべ・もり：うしろから 追う（高さは ゆっくり ついていく。わんランの race-game.js と 同じ） */
      const height = camera.position.y + ((2.8 + (reduced ? 0 : p.y * .18)) - camera.position.y) * (1 - Math.exp(-dt * 6));
      pose = chaseCameraPose(anchor, { distance:cameraOffset, height, lookHeight:1 });
    }
    camera.position.set(pose.position.x, pose.position.y, pose.position.z); camera.lookAt(pose.target.x, pose.target.y, pose.target.z);
    const zoom = pose.zoom ?? 1;
    if (Math.abs(camera.zoom - zoom) > .00001){ camera.zoom = zoom; camera.updateProjectionMatrix(); }
    scene.getObjectByName('park-sky').position.copy(camera.position);
    light.position.set(anchor.x - 7, 12, anchor.z + 6); light.target.position.set(anchor.x, 0, anchor.z);
    uiTime += dt;
    if (uiTime > .08 || sim.status === 'countdown'){ updateHUD(); uiTime = 0; }
    else if (!park && sim.status === 'running') updateCue();   /* うみべ・もりは カーブが つづくので 合図を まいこま（わんランと 同じ） */
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
    const action = gestureAction(dx, dy, performance.now() - pointer.time, !!course.flick);
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
    showHelp(s === 'paused' ? pause : s === 'finished' ? () => result(false) : ready);
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
    course:courseId,
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
      cancelAnimationFrame(frameId);
      canvas.removeEventListener('webglcontextlost', lostGL);
      if (observer) observer.disconnect();
      container.removeEventListener('keydown', key);   /* .run-root は つかいまわすので はずす（のこすと むかしの ゲームを つかんだまま＝レビュー R3-1） */
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
