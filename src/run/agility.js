/* うちのこラン：アジリティの 画面（P4。docs/RUN_DESIGN.md）
 *
 *   mountAgility({ container, course, look, neckWear, name, art, best, next, onExit, onSelect, onNext, onFinish })
 *     → { pause, escape, dispose, sim, renderer, frames, status, course, mode }
 *   AGILITY_COURSES（4コースの 名前・むずかしさ・説明）・agilityMap(id)（コースを えらぶ 画面の 小さな 地図 SVG）・agilityHelpHtml(id)
 *
 * わんラン v33 の race-game.js の アジリティの ところを、うちのこ日和 用に 作りなおした もの（レースは race.js）。
 * - ひとりで 走る（おともだちは 出ない）。走るのは うちのこ（pet3d.js の makePet3D）。大きさは わんランの 広場と 同じ 0.76。
 * - ルール（agility-sim.js）・広場と 器具（agility-field.js・seesaw.js・slalom.js・a-frame.js・tunnel.js）・足の 接地（dog-gait.js）・カメラ（chase-camera.js
 *   と トンネル・坂の 寄せ）は わんランの まま（src/run/wanrun/）。
 * - 画面：上に クリア ◯ / 6・ミス・すすみぐあい・時計、上の まんなかに つぎの 障害物の 合図（なまえ・じゅんばん・レーン・する こと。シーソーは とまる → まつ → タップ）、
 *   下に 障害物の 1〜6（クリアは ✓・ミスは −）と「とまっているよ タップで すすむ」。まんなかの ひとこと（「クリア！」「ジャンプが とどかず」など）は 出さない
 *   （2026-11-22 オーナー。レースと 同じ）。
 * - ゴール：合計の 秒（走った タイム＋ミス×5秒）・はしった タイム・ミスの ぶん・クリア ◯ / 6・ミス ◯回・「ノーミスで ゴール！」。
 *   onFinish({ course, mode:'agility', ms:合計, misses, … }) → ホストが ルール（Rules.act 'run'）で ほうびと 記録を 書き、ゴールの カードに 出す HTML を かえす。
 * - name・art は ホストが 作った HTML（esc 済み）。アプリを はなれたら 一時停止。dispose() で ぜんぶ 片づける（race.js と 同じ）。 */
import * as T from 'three';
import { makePet3D, posePet3D, disposePet3D } from './pet3d.js';
import { footingFor, poseLegs } from './wanrun/dog-gait.js';
import { gestureAction } from './wanrun/race-sim.js';
import { AgilitySimulation, AGILITY } from './wanrun/agility-sim.js';
import { makeAgilityField } from './wanrun/agility-field.js';
import { chaseCameraPose } from './wanrun/chase-camera.js';
import { A_FRAME, aFrameCameraLift } from './wanrun/a-frame.js';
import { SEESAW } from './wanrun/seesaw.js';
import { SLALOM, slalomPoleS, slalomSide } from './wanrun/slalom.js';
import { ICON_X, ICON_PAUSE, formatClock, formatTime, timeMs } from './race.js';

/* コース（わんランの courses.js を うちのこ日和の ことばで。名前は 2026-11-22 オーナー決定）。じゅんばんは「つぎの コースへ」の じゅん（おかの ひろばが さいご） */
export const AGILITY_COURSES = [
  { id:'first-field', name:'はじめての ひろば', level:'やさしい', lv:0, color:'#a5bd90', tree:'round', desc:'6つの しょうがいぶつを、じゅんばんに クリアしよう', tags:['ハードル', 'わっか', 'トンネル'] },
  { id:'zigzag', name:'ジグザグ', level:'ふつう', lv:1, color:'#84aca0', tree:'pine', desc:'ポールの あいだを、みぎ・ひだりに リズムよく すすもう', tags:['スラローム', 'ハードル', 'トンネル'] },
  { id:'balance', name:'バランス', level:'むずかしい', lv:2, color:'#a6ae86', tree:'round', desc:'とまって、まって、また すすむ。シーソーに ちょうせん', tags:['シーソー', 'わっか', 'ハードル'] },
  { id:'hill-field', name:'おかの ひろば', level:'ふつう', lv:1, color:'#7ca69b', tree:'pine', desc:'きいろい いりぐちを ねらって、2つの さかを かけぬけよう', tags:['Aフレーム', 'トンネル', 'わっか'] },
];
const courseOf = id => AGILITY_COURSES.find(c => c.id === id) || AGILITY_COURSES[0];
/* 空・霧（わんランの 広場）、うちのこの 大きさと かげ（わんランは 広場で 0.76） */
const SKY = { sky:'#bad7e3', fog:[85, 175], zenith:[.26, .67, .88], horizon:[.73, .91, .89], ground:'#a3b48a', scale:.76, shadow:.8 };
const NAMES = { hurdle:'ハードル', hoop:'わっか', tunnel:'トンネル', slalom:'スラローム', seesaw:'シーソー', 'a-frame':'Aフレーム' };
const LANES = ['ひだり', 'まんなか', 'みぎ'];
const DOT = { hurdle:'#c78465', hoop:'#d9a63e', tunnel:'#5f8ea6', slalom:'#4f7fb0', seesaw:'#7b6aa8', 'a-frame':'#3f7f86' };

/* コースを えらぶ 画面の 小さな 地図（ほんとうの 広場の 道から。スタートは 左下・ゴールは まんなか）。障害物は しゅるいごとの 形：
   ハードル＝よこの ぼう・わっか＝わ・トンネル＝たての ふとい ぼう・スラローム＝6この 点・シーソー＝ながい いた・Aフレーム＝さんかく */
export function agilityMap(id){
  const c = courseOf(id), lay = new AgilitySimulation(c.id).layout, point = lay.point, len = lay.length;
  const pts = [];
  for (let s = 0; s <= len; s += 2) pts.push(point(Math.min(s, len), 0));
  pts.push(point(len, 0));
  const xs = pts.map(p => p.x), zs = pts.map(p => p.z);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), z0 = Math.min(...zs), z1 = Math.max(...zs);
  const k = 70 / Math.max(x1 - x0, z1 - z0, 1), ox = 50 - (x0 + x1) / 2 * k, oz = 50 - (z0 + z1) / 2 * k;
  const X = p => (p.x * k + ox), Y = p => (p.z * k + oz), f = v => v.toFixed(1);
  const d = 'M' + pts.map(p => `${f(X(p))} ${f(Y(p))}`).join('L');
  const glyph = o => {
    const p = point(o.s, o.lane * 2), cx = X(p), cy = Y(p), fx = Math.sin(p.heading), fy = -Math.cos(p.heading), px = -fy, py = fx;
    const line = (a, b, w, col) => `<path d="M${f(cx + a[0])} ${f(cy + a[1])}L${f(cx + b[0])} ${f(cy + b[1])}" stroke="#fff" stroke-width="${w + 1.8}" stroke-linecap="round"/>`
      + `<path d="M${f(cx + a[0])} ${f(cy + a[1])}L${f(cx + b[0])} ${f(cy + b[1])}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
    if (o.type === 'hurdle') return line([-px * 3, -py * 3], [px * 3, py * 3], 2.4, DOT.hurdle);
    if (o.type === 'hoop') return `<circle cx="${f(cx)}" cy="${f(cy)}" r="2.9" fill="none" stroke="#fff" stroke-width="3.4"/><circle cx="${f(cx)}" cy="${f(cy)}" r="2.9" fill="none" stroke="${DOT.hoop}" stroke-width="1.8"/>`;
    if (o.type === 'tunnel') return line([-fx * 3 * k, -fy * 3 * k], [fx * 3 * k, fy * 3 * k], 4.4, DOT.tunnel);
    if (o.type === 'seesaw') return line([-fx * 3.9 * k, -fy * 3.9 * k], [fx * 3.9 * k, fy * 3.9 * k], 2.8, DOT.seesaw) + `<circle cx="${f(cx)}" cy="${f(cy)}" r="1.4" fill="#fff"/>`;
    if (o.type === 'slalom') return Array.from({ length:SLALOM.count }, (_, i) => { const q = point(slalomPoleS(o, i), o.lane * 2); return `<circle cx="${f(X(q))}" cy="${f(Y(q))}" r="1.5" fill="${DOT.slalom}" stroke="#fff" stroke-width=".9"/>`; }).join('');
    if (o.type === 'a-frame'){ const a = 3.6, b = 2.8; return `<path d="M${f(cx + fx * a)} ${f(cy + fy * a)}L${f(cx - fx * a + px * b)} ${f(cy - fy * a + py * b)}L${f(cx - fx * a - px * b)} ${f(cy - fy * a - py * b)}z" fill="${DOT['a-frame']}" stroke="#fff" stroke-width="1.1" stroke-linejoin="round"/>`; }
    return `<circle cx="${f(cx)}" cy="${f(cy)}" r="3" fill="#c78465"/>`;
  };
  const tree = c.tree === 'pine' ? (x, y) => `<path d="M${x} ${y - 6}l5 10h-10z" fill="#4f7d63"/>` : (x, y) => `<circle cx="${x}" cy="${y}" r="5" fill="#7f9f5f"/>`;
  const st = pts[0], en = pts[pts.length - 1];
  return `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="M0 0h100v100H0z" fill="${c.color}"/>
    <rect x="7" y="7" width="86" height="86" rx="10" fill="none" stroke="#efe3c4" stroke-width="1.6" stroke-dasharray="4 3"/>
    ${[[4, 4], [96, 4], [4, 96], [96, 96]].map(([x, y]) => tree(x, y)).join('')}
    <path d="${d}" fill="none" stroke="#f3e9cf" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>
    <path d="${d}" fill="none" stroke="#d8c79f" stroke-width="1.3" stroke-dasharray="3 4" stroke-linecap="round"/>${lay.obstacles.map(glyph).join('')}
    <circle cx="${f(X(st))}" cy="${f(Y(st))}" r="4.6" fill="#4fae9a" stroke="#fff" stroke-width="1.6"/>
    <circle cx="${f(X(en))}" cy="${f(Y(en))}" r="4.6" fill="#ec6c8a" stroke="#fff" stroke-width="1.6"/></svg>`;
}

/* あそびかた（わんランの help-content.js の アジリティを やさしく 書きなおした）。id が なければ（コースを えらぶ 画面）4コース ぶん */
export function agilityHelpHtml(id){
  const row = (icon, title, text) => `<div class="run-hrow"><b aria-hidden="true">${icon}</b><div><strong>${title}</strong><span>${text}</span></div></div>`;
  const extra = {
    zigzag:row('⇆', 'スラローム', 'めじるしの ほうへ、みぎ・ひだり こうごに 6本 とおろう。ポールの れつは ジャンプ できないよ'),
    balance:row('◇', 'シーソー', 'まんなかの あたりで したに スワイプして とまる。いたが さがったら タップで また すすむよ'),
    'hill-field':row('△', 'Aフレーム', 'よこに スワイプで きいろい いりぐちに あわせて、そのまま さかを はしりぬけよう'),
  }[id];
  return `<div class="run-hrows">
    ${row('↔', 'よこに スワイプ', id === 'zigzag' ? 'となりの レーンへ。ポールの あいだでは 1回で みぎ・ひだりへ' : 'となりの レーンへ')}
    ${row('↑', 'うえに スワイプ', 'ジャンプ。ハードルや わっかを とびこえよう。トンネルは そのまま はしってね')}
    ${row('↓', 'したに スワイプ', 'そのばで とまる（とけいは すすむよ）')}
    ${row('●', 'タップ', 'とまっている うちのこが また はしりだすよ')}
    ${extra || (id ? '' : row('◇', 'シーソー', 'まんなかで したに スワイプ。いたが さがったら タップ'))}
  </div><p class="run-hnote">ミス 1回で、きろくに ${AGILITY.penalty}秒 たされるよ<br>キーボードは やじるしと スペースで あそべます</p>`;
}

export function mountAgility(opts){
  const { container, look, neckWear = null, name = 'うちのこ', art = '', best = null, next = null,
    onExit = () => {}, onSelect = null, onNext = null, onFinish = () => null } = opts;
  const course = courseOf(opts.course), courseId = course.id;
  const sim = new AgilitySimulation(courseId);
  const reduced = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const point = sim.layout.point, length = sim.layout.length, obstacles = sim.layout.obstacles, count = obstacles.length;
  const petScale = opts.petScale || SKY.scale;
  const nextC = next && AGILITY_COURSES.some(c => c.id === next) ? courseOf(next) : null;
  let finishTok = 0, recHtml = null;
  let renderer = null, scene = null, camera = null, light = null, track = null, frameId = 0, last = 0, drawn = 0, uiTime = 0;
  let disposed = false, pointer = null, helpBack = null, frames = 0, cameraOffset = 6, countLabel = '', cueKey = '', lost = false;
  let pet = null, shadow = null;

  container.className = 'run-root run-agi';
  container.dataset.course = courseId;
  container.innerHTML = `<canvas class="run-canvas" tabindex="0" aria-label="${course.name}の アジリティ。よこに スワイプで レーン、うえで ジャンプ、したで とまる、タップで また すすむ"></canvas>
    <div class="run-hud">
      <div class="run-top">
        <button class="closebtn run-btn" type="button" data-run="x" aria-label="ランを やめる">${ICON_X}</button>
        <div class="run-chip run-rank"><b data-q="clear">0</b><span>/ ${count} クリア</span></div>
        <div class="run-chip run-miss"><span>ミス</span><b data-q="miss">0</b></div>
        <span class="run-gap"></span>
        <button class="closebtn run-btn" type="button" data-run="help" aria-label="あそびかた">？</button>
        <button class="closebtn run-btn" type="button" data-run="pause" aria-label="ひとやすみ" hidden>${ICON_PAUSE}</button>
      </div>
      <div class="run-line">
        <div class="run-progress" role="progressbar" aria-label="コースの すすみぐあい" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
          <i class="run-fill" data-q="fill"></i><i class="run-me" aria-hidden="true"></i>
        </div>
        <div class="run-chip run-clock" data-q="clock">00:00.0</div>
      </div>
    </div>
    <div class="run-cue" data-q="cue" role="status" hidden></div>
    <div class="run-count" data-q="count" aria-live="polite"></div>
    <div class="run-stop" data-q="stop" role="status" hidden>とまっているよ <b>タップで すすむ</b></div>
    <div class="run-bottom run-steps" role="list" aria-label="しょうがいぶつ">${obstacles.map((o, i) => `<span class="run-step" role="listitem" data-step="${o.id}" data-state="pending" aria-label="しょうがいぶつ ${i + 1}（${NAMES[o.type] || ''}）まだ">${i + 1}</span>`).join('')}</div>
    <div class="run-over" data-q="over" role="dialog" aria-modal="true" aria-label="ランの メニュー" hidden></div>`;
  const q = k => container.querySelector(`[data-q="${k}"]`), btn = k => container.querySelector(`[data-run="${k}"]`);
  const canvas = container.querySelector('.run-canvas'), over = q('over'), me = container.querySelector('.run-me');
  const stepEls = new Map([...container.querySelectorAll('.run-step')].map(el => [Number(el.dataset.step), el]));

  /* ----- 3D ----- */
  function setup(){
    renderer = new T.WebGLRenderer({ canvas, antialias:true, powerPreference:'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.outputColorSpace = T.SRGBColorSpace;
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap;
    /* 光：レースと 同じ（うちのこの 色が 2D の 絵と そろう NeutralToneMapping・露出 1） */
    renderer.toneMapping = T.NeutralToneMapping; renderer.toneMappingExposure = 1;
    scene = new T.Scene(); scene.background = new T.Color(SKY.sky); scene.fog = new T.Fog(SKY.sky, SKY.fog[0], SKY.fog[1]);
    camera = new T.PerspectiveCamera(60, 1, .1, 180);
    scene.add(new T.HemisphereLight('#fffaf0', SKY.ground, 2.1));
    light = new T.DirectionalLight('#fff7ea', 2.1); light.castShadow = true; light.shadow.mapSize.set(1024, 1024);
    Object.assign(light.shadow.camera, { left:-12, right:12, top:12, bottom:-12, near:.5, far:45 });
    light.shadow.bias = -.0003; light.shadow.normalBias = .03; scene.add(light, light.target);
    const dome = new T.Mesh(new T.SphereGeometry(134, 24, 12), new T.ShaderMaterial({
      side:T.BackSide, depthWrite:false,
      uniforms:{ zenith:{ value:new T.Vector3(...SKY.zenith) }, horizon:{ value:new T.Vector3(...SKY.horizon) } },
      vertexShader:'varying float altitude; void main(){altitude=position.y/134.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader:'uniform vec3 zenith; uniform vec3 horizon; varying float altitude; void main(){vec3 sky=mix(horizon,zenith,smoothstep(-.035,.34,altitude));gl_FragColor=vec4(sky,1.);}',
    }));
    dome.name = 'park-sky'; dome.renderOrder = -10; scene.add(dome);
    track = makeAgilityField(sim.layout); scene.add(track.root);
    pet = makePet3D(look, neckWear, { detail:1 });
    pet.scale.setScalar(petScale);
    pet.rotation.y = Math.PI;
    shadow = new T.Mesh(new T.CircleGeometry(SKY.shadow, 24), new T.MeshStandardMaterial({ color:'#536848', transparent:true, opacity:.15 }));
    shadow.rotation.x = -Math.PI / 2;
    scene.add(pet, shadow);
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

  /* ----- 画面の 上に 出す もの（race.js と 同じ 形） ----- */
  function menu(html, focusSel, kind){
    over.hidden = html == null;
    over.className = 'run-over' + (kind ? ' ' + kind : '');
    container.classList.toggle('menu', html != null);
    over.innerHTML = html == null ? '' : `<div class="run-card">${html}</div>`;
    syncButtons();
    if (html != null){ const f = over.querySelector(focusSel || '.btn.primary') || over.querySelector('button'); if (f) try { f.focus({ preventScroll:true }); } catch(e){} }
    return over;
  }
  function syncButtons(){
    const live = sim.status === 'running' || sim.status === 'countdown';
    btn('pause').hidden = !live || !over.hidden;
    btn('help').hidden = (live && over.hidden) || lost;
  }
  const selectBtn = () => onSelect ? '<button class="btn" type="button" data-m="select">コースを えらぶ</button>' : '';
  function bindSelect(o){ const b = o.querySelector('[data-m="select"]'); if (b) b.addEventListener('click', () => onSelect()); }
  function ready(){
    helpBack = null;
    const o = menu(`<span class="run-over-l">アジリティ・${course.level}</span><h2>${course.name}</h2>
      <p class="run-sub">${name}と ${count}つの しょうがいぶつに<br>ちょうせん！</p>
      ${best ? `<p class="run-best">ベスト <b>${formatTime(best)}</b></p>` : ''}
      <div class="btnrow">${selectBtn()}<button class="btn primary" type="button" data-m="go">はしる</button></div>`, '[data-m="go"]', 'top');
    o.querySelector('[data-m="go"]').addEventListener('click', begin);
    bindSelect(o);
  }
  function showHelp(back){
    helpBack = back;
    const o = menu(`<h2>あそびかた</h2>${agilityHelpHtml(courseId)}<div class="btnrow"><button class="btn primary" type="button" data-m="ok">わかった</button></div>`);
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
    for (const el of stepEls.values()) el.dataset.state = '';
    begin();
  }
  /* ゴール：合計の 秒（走った タイム＋ミス×5秒）・はしった タイム・ミスの ぶん・クリア・ミス。ほうびと 記録は ホストの onFinish が かえす HTML。
     「もういちど」「つぎの コースへ（つぎが ある とき）／おわる」、下に「コースを えらぶ」（と つぎが ある ときは「おわる」） */
  function result(record){
    const r = sim.result, clean = r.faults === 0;
    const nextBtn = nextC && onNext ? `<button class="btn primary run-next" type="button" data-m="next" aria-label="つぎの コース「${nextC.name}」へ">つぎの コースへ<small>${nextC.name}</small></button>` : '';
    const exitBtn = `<button class="btn${nextBtn ? '' : ' primary'}" type="button" data-m="exit">おわる</button>`;
    const more = (onSelect ? selectBtn() : '') + (nextBtn ? exitBtn : '');
    const o = menu(`<span class="run-over-l">アジリティ・${course.name}</span>
      <div class="run-res">${art ? `<div class="run-art" aria-hidden="true">${art}</div>` : ''}<div class="run-total"><small>ごうけい</small><span><b>${(Math.round(r.total * 100) / 100).toFixed(2)}</b>秒</span></div></div>
      <h2>${clean ? 'ノーミスで ゴール！' : 'さいごまで はしったね！'}</h2>
      <div class="run-stats">
        <div><span>はしった タイム</span><b>${formatTime(r.time)}</b></div><div><span>ミスの ぶん</span><b>+${r.penalty}秒</b></div>
        <div><span>クリア</span><b>${r.cleared} / ${count}</b></div><div><span>ミス</span><b>${r.faults}回</b></div>
      </div>
      <div class="run-rec" data-q="rec" role="status">${recHtml == null ? '<span class="run-rec-wait">きろく しているよ…</span>' : recHtml}</div>
      <div class="btnrow"><button class="btn" type="button" data-m="again">もういちど</button>${nextBtn || exitBtn}</div>
      ${more ? `<div class="btnrow run-more">${more}</div>` : ''}`, '[data-m="again"]');
    o.querySelector('[data-m="again"]').addEventListener('click', restart);
    o.querySelector('[data-m="exit"]').addEventListener('click', () => onExit());
    const nb = o.querySelector('[data-m="next"]');
    if (nb) nb.addEventListener('click', () => onNext(nextC.id));
    bindSelect(o);
    if (!record) return;
    recHtml = null;
    const tok = ++finishTok;
    let job;
    try { job = onFinish({ course:courseId, mode:'agility', ms:timeMs(r.total), time:r.time, total:r.total, misses:r.faults, cleared:r.cleared }); }
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
    q('clear').textContent = sim.cleared;
    q('miss').textContent = sim.faults;
    const progress = Math.min(100, sim.player.s / length * 100);
    q('fill').style.width = progress + '%';
    container.querySelector('.run-progress').setAttribute('aria-valuenow', Math.round(progress));
    q('clock').textContent = formatClock(sim.time);
    me.hidden = sim.status === 'paused';
    me.style.left = progress + '%';
    if (track) track.update(sim);
    /* 下の 1〜6：まだ（番号）・つぎ（きいろの わく）・クリア（✓）・ミス（−）。かわった ときだけ ぽんと はねる */
    const nx = sim.nextObstacle, running = sim.status === 'running' || sim.status === 'countdown';
    obstacles.forEach((o, i) => {
      const el = stepEls.get(o.id), done = sim.results.has(o.id), ok = sim.results.get(o.id);
      const state = done ? (ok ? 'clear' : 'miss') : nx && nx.id === o.id && running ? 'next' : 'pending';
      if (el.dataset.state === state) return;
      const pop = done && el.dataset.state !== '' ;
      el.dataset.state = state;
      el.textContent = done ? (ok ? '✓' : '−') : String(i + 1);
      el.setAttribute('aria-label', `しょうがいぶつ ${i + 1}（${NAMES[o.type] || ''}）${done ? (ok ? 'クリア' : 'ミス') : 'まだ'}`);
      el.classList.toggle('pop', pop);
    });
    q('stop').hidden = !(sim.stopped && sim.status === 'running' && !sim.activeSeesaw);
    updateCue();
    const label = sim.status === 'countdown' ? String(Math.ceil(sim.countdown)) : '';
    if (label !== countLabel){ countLabel = label; q('count').textContent = label; q('count').classList.toggle('show', !!label); }
  }
  /* つぎの 障害物の 合図（わんランの updateObstacleCue と 同じ じゅん。ことばは やさしく）：
     レーンが ちがう → やじるし、ちかい → ↑（ジャンプ）・∩（トンネル）。シーソーは まんなかへ → したに スワイプ → まってね → タップで すすむ → そのまま、
     スラロームは みぎ／ひだりを とおる（ポール ◯ / 6）、Aフレームは きいろい いりぐちへ → さかを かけぬけよう */
  function updateCue(){
    const o = sim.status === 'running' ? sim.nextObstacle : null, el = q('cue');
    el.hidden = !o; container.classList.toggle('turn-visible', !!o);
    if (!o){ cueKey = ''; return; }
    const p = sim.player, lane = LANES[o.lane + 1] || 'まんなか';
    const aligned = Math.abs(p.x - o.lane * 2) < (o.type === 'seesaw' ? .48 : o.type === 'a-frame' ? A_FRAME.entryTolerance : .72);
    const near = (o.type === 'slalom' ? slalomPoleS(o, 0) : o.type === 'a-frame' ? o.s - A_FRAME.run : o.s) - p.s < 8;
    const board = sim.activeSeesaw, slalom = sim.activeSlalom;
    let icon = !aligned ? (o.lane * 2 < p.x ? '←' : '→') : o.type === 'tunnel' ? '∩' : ['seesaw', 'slalom', 'a-frame'].includes(o.type) ? '◇' : near ? '↑' : '◇';
    let label = NAMES[o.type] || '', detail = `${o.id + 1} / ${count}・${lane}`, state = near ? 'active' : 'ahead';
    if (!aligned && near && !board && !slalom && !sim.rampPass) label = `${lane}へ`;
    else if (aligned && near && (o.type === 'hurdle' || o.type === 'hoop')) label = `${label}を ジャンプ`;
    if (o.type === 'a-frame'){
      if (sim.rampPass){ icon = '◇'; label = sim.rampPass.onBoard ? 'さかを かけぬけよう' : 'さかの よこを とおっているよ'; }
      else if (near && aligned){ icon = '◇'; label = 'きいろい いりぐちへ'; }
    }
    if (board){
      const ph = board.state.phase, past = p.s - o.s >= SEESAW.stopFrom;
      label = ph === 'hold' || ph === 'tipping' ? 'いたが さがるまで まってね' : ph === 'ready' || sim.stopped ? 'タップで すすむ' : ph === 'exit' ? 'そのまま すすもう' : past ? 'したに スワイプで とまる' : 'まんなかへ すすもう';
      icon = ph === 'hold' || ph === 'tipping' ? '…' : ph === 'ready' || sim.stopped ? '●' : ph === 'exit' ? '✓' : past ? '↓' : '◇';
      if (ph === 'ready' || (sim.stopped && ph !== 'hold' && ph !== 'tipping') || (ph === 'approach' && past)) state = 'waiting';
    }
    if (slalom){
      const i = slalom.state.index, done = i >= SLALOM.count, right = slalomSide(o, i) > 0;
      icon = done ? '✓' : right ? '→' : '←'; label = done ? 'でぐちへ' : right ? 'みぎを とおる' : 'ひだりを とおる';
      detail = `${o.id + 1} / ${count}・ポール ${Math.min(i + 1, SLALOM.count)} / ${SLALOM.count}`;
    }
    const key = `${o.id}:${icon}:${label}:${detail}:${state}`;
    if (key === cueKey) return;
    cueKey = key; el.dataset.state = state;
    el.innerHTML = `<strong aria-hidden="true">${icon}</strong><span><small>${detail}</small><b>${label}</b></span>`;
  }

  /* ----- 1こまごと ----- */
  function frame(t){
    if (disposed) return;
    frameId = requestAnimationFrame(frame);
    const dt = last ? Math.max(0, Math.min(.2, (t - last) / 1000)) : 0; last = t;
    const steps = Math.max(1, Math.ceil(dt / .05));
    for (let i = 0; i < steps; i++) sim.step(dt / steps);
    track.animate(sim);
    /* まんなかに ひとこと（わんランの「クリア！」「ジャンプが届かず +5秒」「止まり損ね」など）は 出さない。クリア・ミスは 下の 1〜6 で わかる */
    for (const e of sim.drainEvents()) if (e.type === 'finish') result(true);
    const live = sim.status === 'running' || sim.status === 'countdown';
    if (!live && drawn && t - drawn < 100) return;
    drawn = t || 1;
    const a = sim.player;
    if (sim.status !== 'paused'){
      const footing = footingFor(sim, true);
      const run = sim.status === 'running' && a.finishTime === null && !sim.stopped, p = point(a.s, a.x);
      pet.position.set(p.x, a.y + (run && !reduced && !a.surfaceY ? Math.abs(Math.cos(a.phase * 1.85)) * .025 : 0), p.z);
      pet.rotation.order = 'YXZ'; pet.rotation.x = a.pitch || 0; pet.rotation.y = Math.PI - p.heading;
      pet.rotation.z = run && !reduced ? (sim.targetX - a.x) * .07 : 0;
      poseLegs(pet, a.phase, run, a.jumpElapsed !== null, footing);
      posePet3D(pet, t / 1000, run, { legs:false, phase:a.phase, airborne:a.jumpElapsed !== null, reduced });
      shadow.position.set(p.x, .035, p.z); shadow.scale.setScalar(a.jumpElapsed !== null ? .7 : 1); shadow.visible = !a.surfaceY;
    }
    /* カメラ：うしろから 追う。トンネルの 前後は ひくく 近く、坂・シーソーの 上は 足もとに あわせて 上げる（わんランと 同じ） */
    const nearTunnel = obstacles.some(o => o.type === 'tunnel' && o.s - a.s < 9 && o.s - a.s > -6 && Math.abs(a.x - o.lane * 2) < .8);
    const surface = a.surfaceY || 0, onRamp = !!(sim.rampPass && sim.rampPass.onBoard);
    const lift = onRamp ? aFrameCameraLift(surface) : surface;
    const height = surface ? 2.8 + lift : camera.position.y + ((nearTunnel ? 1.15 : 2.8 + (reduced ? 0 : a.y * .18)) - camera.position.y) * (1 - Math.exp(-dt * 6));
    cameraOffset += ((nearTunnel ? 4 : 6) - cameraOffset) * (1 - Math.exp(-dt * 5));
    const anchor = point(a.s, a.x);
    const pose = chaseCameraPose(anchor, { distance:cameraOffset, height, lookHeight:nearTunnel ? .65 : 1 + lift * (onRamp ? .65 : 1) });
    camera.position.set(pose.position.x, pose.position.y, pose.position.z); camera.lookAt(pose.target.x, pose.target.y, pose.target.z);
    scene.getObjectByName('park-sky').position.copy(camera.position);
    light.position.set(anchor.x - 7, 12, anchor.z + 6); light.target.position.set(anchor.x, 0, anchor.z);
    uiTime += dt;
    if (uiTime > .08 || sim.status === 'countdown'){ updateHUD(); uiTime = 0; }
    renderer.render(scene, camera);
    frames++;
  }

  /* ----- さわる・キーボード（race.js と 同じ。おかの ひろばは みじかい フリックでも うごく＝わんランと 同じ） ----- */
  const flick = courseId === 'hill-field';
  function down(e){
    if (!e.isPrimary || sim.status !== 'running' || pointer) return;
    pointer = { id:e.pointerId, x:e.clientX, y:e.clientY, time:performance.now(), used:false, tap:true };
    try { canvas.setPointerCapture(e.pointerId); } catch(_){}
  }
  function read(e, release){
    if (!pointer || pointer.id !== e.pointerId || pointer.used) return;
    const dx = e.clientX - pointer.x, dy = e.clientY - pointer.y;
    if (Math.hypot(dx, dy) >= 12) pointer.tap = false;
    const action = gestureAction(dx, dy, performance.now() - pointer.time, flick);
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
    mode:'agility',
    get sim(){ return sim; },
    get renderer(){ return renderer; },
    get frames(){ return frames; },
    get status(){ return lost ? 'lost' : sim.status; },
    course:courseId,
    pause,
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
      document.removeEventListener('visibilitychange', hidden);
      removeEventListener('blur', pause); removeEventListener('pagehide', pause); removeEventListener('resize', resize);
      if (pet) disposePet3D(pet);
      const geos = new Set(), mats = new Set();
      if (scene) scene.traverse(o => { if (o.geometry) geos.add(o.geometry); if (o.material) [].concat(o.material).forEach(m => mats.add(m)); if (o.isInstancedMesh) o.dispose(); });
      geos.forEach(g => g.dispose()); mats.forEach(m => m.dispose());
      if (light) light.dispose();
      if (renderer){ renderer.dispose(); renderer.forceContextLoss(); }
      container.innerHTML = '';
    },
  };
}
