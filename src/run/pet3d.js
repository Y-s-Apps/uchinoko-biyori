/* うちのこラン（仮）：3D の うちのこ（P1。docs/RUN_DESIGN.md 4章）
 *
 *   makePet3D(look, neckWear)        … normalizeLook() を とおした look と、くびの きせかえ（WEAR_BY_ID の 1つ か null）から
 *                                      Three.js の Group を 作る。41種・ねこ・毛の形・顔の もよう・くびの きせかえ に 対応。
 *   posePet3D(pet, t, running, opts) … まばたき・しっぽ・耳・あたま・べろ と、平らな 地面の 足（opts.legs === false で 足は さわらない）。
 *   strideLegs(pet, phase, running, airborne) … 平らな 地面の 足だけ（わんランの dog-gait.js の poseLegs と 同じ 計算）。
 *   disposePet3D(pet)                … ジオメトリと マテリアルを 片づける（とじる ときに かならず）。
 *
 * 座標：y が 上、あたまは +z、足のうらが y = 0。わんラン（companions.js）と 同じ 単位で、userData も 同じ
 * （legs〈hip・phase・paw〉・tail・height）なので、わんランの poseLegs（坂・シーソー・Aフレームの 接地）が そのまま つかえる。
 * 形の 作り方（だ円の 部品・足の 接地・しっぽの チューブ・くびの 布が 毛の 上に のる 計算・プードルの 巻き毛）は わんラン v33 の
 * companions.js・shiba.js・neck-scarf.js・poodle-fleece.js を 参考に した。犬種ごとの if ではなく look の 値から 組み立てる。
 *
 * 2D の 絵（renderPet）と 同じ子に 見える ように：顔の 正面は 2D の 絵の 座標を そのまま 頭の 球に はる
 * （2D の (x, y) → u = (x − 120) / 60、v = (100 − y) / 51 が 球の 正面の (x, y)）。色の 決め方も renderPet と 同じ。
 * もようは 頂点の 色で ぬる（画像の ファイルは 使わない）。
 */
import * as T from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const SS = T.MathUtils.smoothstep;

/* ===== 色（js_pet.js の mix・lum と 同じ 計算。sRGB の 16進で まぜてから Three.js の 色に する） ===== */
function rgb(h){ h = String(h).replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); const n = parseInt(h, 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
function hex(r, g, b){ return '#' + [r, g, b].map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join(''); }
function mixHex(a, b, t){ const A = rgb(a), B = rgb(b); return hex(A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t); }
function lumHex(h){ const [r, g, b] = rgb(h).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * r + .7152 * g + .0722 * b; }
const lightenHex = (c, t) => mixHex(c, '#ffffff', t);

/* ===== 形の 道具 ===== */
// 球の つなぎ目（経度 0 と 2π）と 極の 法線を そろえる（わんラン poodle-fleece.js と 同じ）
function fixSeam(g, ws, hs){
  const n = g.attributes.normal, a = new T.Vector3(), b = new T.Vector3();
  for (let j = 0; j <= hs; j++){
    const first = j * (ws + 1), last = first + ws;
    if (j === 0 || j === hs){ for (let i = first; i <= last; i++) n.setXYZ(i, 0, j === 0 ? 1 : -1, 0); continue; }
    a.fromBufferAttribute(n, first).add(b.fromBufferAttribute(n, last)).normalize();
    n.setXYZ(first, a.x, a.y, a.z); n.setXYZ(last, a.x, a.y, a.z);
  }
}
// 単位球の 向き (x, y, z) ごとに 半径（shape）と 色（paint）を 決めた 球。scale で だ円に する
function ball(ws, hs, shape, paint){
  const g = new T.SphereGeometry(1, ws, hs), p = g.attributes.position, d = new T.Vector3(), c = new T.Color();
  const col = paint ? new Float32Array(p.count * 3) : null;
  for (let i = 0; i < p.count; i++){
    d.fromBufferAttribute(p, i).normalize();
    if (paint){ paint(d.x, d.y, d.z, c); c.toArray(col, i * 3); }
    if (shape){ const r = shape(d.x, d.y, d.z); p.setXYZ(i, d.x * r, d.y * r, d.z * r); }
  }
  if (paint) g.setAttribute('color', new T.BufferAttribute(col, 3));
  if (shape){ g.computeVertexNormals(); fixSeam(g, ws, hs); }
  return g;
}
// 球の 上に ちらばらせた 点（黄金角）。ふわふわの 毛の たば・巻き毛・はんてん に つかう
function sphereDots(count, seed){
  const out = [], turn = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++){
    const y = 1 - 2 * (i + .5) / count, r = Math.sqrt(1 - y * y), a = i * turn + seed + .3 * Math.sin(i * 7.3 + seed);
    out.push([r * Math.cos(a), y, r * Math.sin(a)]);
  }
  return out;
}
// ふわふわ（毛の たばの もりあがり）：0〜1くらい
function tuftField(count, sharp, seed){
  const C = sphereDots(count, seed);
  return (x, y, z) => { let s = 0; for (const c of C){ const d = 1 - (x * c[0] + y * c[1] + z * c[2]); if (d < .25) s += Math.exp(-d * sharp); } return Math.min(1.25, s); };
}
// 巻き毛（わんラン poodle-fleece.js の 計算）：{ r: 半径, v: 明るさ }
function fleeceField(ear){
  const count = ear ? 54 : 73, turn = Math.PI * (3 - Math.sqrt(5)), C = [];
  for (let i = 0; i < count; i++){
    const y = 1 - 2 * (i + .5) / count, r = Math.sqrt(1 - y * y), a = i * turn + .13 * Math.sin(i * 5.1);
    const center = new T.Vector3(r * Math.cos(a), y, r * Math.sin(a)), east = new T.Vector3(-Math.sin(a), 0, Math.cos(a));
    C.push({ center, east, north: new T.Vector3().crossVectors(east, center), phase: i * turn });
  }
  const dir = new T.Vector3();
  return (x, y, z) => {
    dir.set(x, y, z);
    let tufts = 0, crease = 0;
    for (const { center, east, north, phase } of C){
      const d = 1 - dir.dot(center);
      if (d >= .12) continue;
      tufts += Math.exp(-d * (ear ? 70 : 89));
      const az = Math.atan2(dir.dot(north), dir.dot(east)) + phase;
      const bend = Math.sqrt(2 * d) - (.123 + .036 * Math.cos(az));
      crease = Math.max(crease, Math.exp(-bend * bend / .0017) * (.5 + .5 * Math.sin(az)));
    }
    return { r: 1 + .088 * tufts - .021 * crease, v: .93 + .07 * Math.min(1, tufts) - .07 * crease };
  };
}
// 2D の だ円（u, v の 平面）。中は 1、ふちは soft の はばで なめらかに 0 へ
function ell(u, v, cu, cv, ru, rv, soft = .18){ const du = (u - cu) / ru, dv = (v - cv) / rv; return 1 - SS(du * du + dv * dv, 1 - soft, 1 + soft); }
// 線分までの きょり（2D の 線の もよう）
function seg(u, v, a, b, c, d){ const px = c - a, py = d - b, l = px * px + py * py, t = Math.max(0, Math.min(1, ((u - a) * px + (v - b) * py) / l)); const dx = u - a - px * t, dy = v - b - py * t; return Math.sqrt(dx * dx + dy * dy); }
// だ円体の 中の 点 p から 向き d へ 出たときの きょり（外に 出られなければ 0）
function exitDist(p, d, c, r){
  const x = (p.x - c.x) / r.x, y = (p.y - c.y) / r.y, z = (p.z - c.z) / r.z, vx = d.x / r.x, vy = d.y / r.y, vz = d.z / r.z;
  const a = vx * vx + vy * vy + vz * vz, b = x * vx + y * vy + z * vz, disc = b * b - a * (x * x + y * y + z * z - 1);
  return disc >= 0 ? Math.max(0, (Math.sqrt(disc) - b) / a) : 0;
}

/* ===== 部品と マテリアル（1ぴきごと。disposePet3D で ぜんぶ 片づく） ===== */
function makeKit(detail){
  const mats = new Map(), sphere = new T.SphereGeometry(1, 16, 12), tiny = new T.SphereGeometry(1, 10, 8);
  const kit = {
    sphere, tiny,
    seg: n => Math.max(8, Math.round(n * detail / 2) * 2),
    std(color, rough = .9, metal = 0){
      const k = color + '|' + rough + '|' + metal;
      if (!mats.has(k)) mats.set(k, new T.MeshStandardMaterial({ color, roughness: rough, metalness: metal }));
      return mats.get(k);
    },
    flat(color, opacity = 1){
      const k = 'flat|' + color + '|' + opacity;
      if (!mats.has(k)) mats.set(k, new T.MeshBasicMaterial({ color, transparent: opacity < 1, opacity, depthWrite: opacity >= 1 }));
      return mats.get(k);
    },
    paint: new T.MeshStandardMaterial({ vertexColors: true, roughness: .9 }),
    cloth: new T.MeshStandardMaterial({ vertexColors: true, roughness: .95, side: T.DoubleSide }),
    add(parent, geo, mat, x = 0, y = 0, z = 0, sx = 1, sy = sx, sz = sx){
      const m = new T.Mesh(geo, mat); m.position.set(x, y, z); m.scale.set(sx, sy, sz);
      m.castShadow = true; m.receiveShadow = true; parent.add(m); return m;
    },
    oval(parent, mat, x, y, z, rx, ry, rz){ return kit.add(parent, sphere, mat, x, y, z, rx, ry, rz); },
    dot(parent, mat, x, y, z, rx, ry, rz){ return kit.add(parent, tiny, mat, x, y, z, rx, ry, rz); },
    group(parent, x = 0, y = 0, z = 0, name){ const g = new T.Group(); g.position.set(x, y, z); if (name) g.name = name; parent.add(g); return g; },
  };
  return kit;
}
// 細い 線（ひげ・口・ふさ）
function stroke(kit, parent, pts, radius, mat){
  const curve = new T.CatmullRomCurve3(pts.map(p => new T.Vector3(...p)));
  const m = new T.Mesh(new T.TubeGeometry(curve, 8, radius, 5, false), mat); parent.add(m); return m;
}
// しっぽ・布の はし：中心線に そって 半径と 色を 行ごとに 決める チューブ
function tube(points, rows, radial, radiusAt, colorAt){
  const curve = new T.CatmullRomCurve3(points.map(p => new T.Vector3(...p)));
  const g = new T.TubeGeometry(curve, rows, 1, radial, false), pos = g.attributes.position, nor = g.attributes.normal, col = [], c = new T.Color();
  for (let i = 0; i <= rows; i++){
    const u = i / rows, center = curve.getPointAt(u);
    for (let j = 0; j <= radial; j++){
      const k = i * (radial + 1) + j, r = radiusAt(u, j / radial);
      pos.setXYZ(k, center.x + nor.getX(k) * r, center.y + nor.getY(k) * r, center.z + nor.getZ(k) * r);
      colorAt(u, j / radial, c); c.toArray(col, k * 3);
    }
  }
  g.setAttribute('color', new T.Float32BufferAttribute(col, 3)); g.computeVertexNormals();
  return g;
}

/* ===== 3D の うちのこ ===== */
export function makePet3D(look, neckWear, opts = {}){
  const L = look, cHex = L.colors, mk = L.marks || {}, cat = L.species === 'cat';
  const fluffy = L.coat === 'fluffy', longCoat = L.coat === 'long', curly = L.coat === 'curly', furry = fluffy || longCoat || curly;
  const shortLegs = L.legs === 'short';
  const detail = Math.max(.4, Math.min(1, opts.detail || 1));   // おともだち（ライバル）は 0.6 などで かるく
  const kit = makeKit(detail), C = h => new T.Color(h), Q = kit.seg;
  const root = new T.Group(); root.name = 'pet3d';

  /* 色（renderPet と 同じ 決め方） */
  const chestHex = cHex.chest === cHex.body ? lightenHex(cHex.body, lumHex(cHex.body) > .7 ? 0 : .1) : cHex.chest;
  const muzzleHex = cHex.face === cHex.main ? lightenHex(cHex.main, lumHex(cHex.main) > .7 ? 0 : .16) : cHex.face;
  const earLHex = (mk.patchL && cHex.ear === cHex.main) ? mk.patchL : cHex.ear;
  const earRHex = (mk.patchR && cHex.ear === cHex.main) ? mk.patchR : cHex.ear;
  const innerHex = h => cat ? mixHex(h, '#F4AEBB', .7) : mixHex(h, '#F3C2C9', .55);
  const ruffHex = cHex.chest !== cHex.body ? mixHex(cHex.body, cHex.chest, .5) : cHex.body;
  const eyeArea = L.face === 'mask' ? cHex.face : (mk.patchL || cHex.main);
  const darkEyes = lumHex(eyeArea) < .12;
  const mouthHex = lumHex(mk.mask || muzzleHex) < .12 ? '#F4E6EA' : '#3A2A33';
  const haunchHex = mk.saddle || cHex.body;
  const col = {
    main: C(cHex.main), body: C(cHex.body), face: C(cHex.face), chest: C(chestHex), paws: C(cHex.paws), muzzle: C(muzzleHex),
    blush: C('#FF9DB2'), ruff: C(ruffHex), haunch: C(haunchHex),
  };
  const M = {};
  for (const k of ['stripes', 'spots', 'patchL', 'patchR', 'brows', 'mask', 'saddle']) if (mk[k]) M[k] = C(mk[k]);

  /* 大きさ（2D の 絵と 同じ「頭が 大きい」つりあい。足の 長さ・ねこで かわる） */
  const H = shortLegs ? .24 : (cat ? .36 : .38);              // 足の つけね（こし）の 高さ
  const BW = cat ? .27 : .30, BH = cat ? .25 : .27, BL = (cat ? .37 : .40) * (shortLegs ? 1.18 : 1);
  const bodyY = H + .09;
  const HR = cat ? [.41, .335, .35] : [.40, .34, .355];
  const headY = bodyY + BH * .95 + HR[1] * .55, headZ = BL * .78;

  /* ----- からだ ----- */
  const spotDots = M.spots ? sphereDots(34, 1.7).filter(d => d[1] > -.4) : [];
  const bodyTufts = fluffy ? tuftField(90, 110, .4) : longCoat ? tuftField(70, 90, 1.1) : null;
  const bodyFleece = curly ? fleeceField(false) : null;
  const bodyShape = (x, y, z) => {
    if (bodyFleece) return bodyFleece(x, y, z).r;
    let r = 1;
    if (bodyTufts) r += (fluffy ? .06 : .04) * (bodyTufts(x, y, z) - .45);
    return r;
  };
  const tmp = new T.Color();
  // からだの 色が 頭（main）と ちがう 子（ヨークシャーテリアなど）は、からだの 色を せなかと わきの 上だけ（上着の ように）にして、
  // おなか・足は 頭の 色に する（からだ じゅうが 1色だと 全身タイツの ように 見えるため。2026-11-21 オーナー）
  const twoTone = cHex.body !== cHex.main;
  const jacket = (x, y, z) => twoTone ? SS(y, -.34, -.18) * (1 - SS(z, .5, .78) * (1 - SS(y, .55, .8))) : 1;
  const bodyPaint = (x, y, z, out) => {
    out.copy(col.main).lerp(col.body, jacket(x, y, z));
    if (M.saddle) out.lerp(M.saddle, SS(y, .12, .38) * (1 - SS(z, .4, .72)));
    if (mk.bodyPatch){
      const blob = (cx, cy, cz, r) => 1 - SS(1 - (x * cx + y * cy + z * cz), r * .75, r * 1.25);
      if (M.patchR){ out.lerp(M.patchR, blob(.62, .55, .1, .22)); out.lerp(M.patchR, blob(-.2, .62, -.62, .14)); }
      if (M.patchL){ out.lerp(M.patchL, blob(-.78, -.05, -.25, .2)); out.lerp(M.patchL, blob(.35, .3, -.75, .12)); }
    }
    // むね・おなか（2D の むねの だ円）
    const bib = SS(z, .42, .72) * (1 - SS(y, .3, .62)) + SS(-y, .55, .85) * .9;
    out.lerp(col.chest, Math.min(1, bib));
    if (M.stripes){
      const side = SS(y, -.5, -.25) * (1 - SS(z, .42, .62)) * (1 - SS(-z, .72, .9) * (1 - SS(y, .35, .6)));
      const ph = z * 3.1 - .28 * (1 - y) * (1 - y);
      const band = 1 - SS(Math.abs(((ph % 1) + 1) % 1 - .5), .16, .24);
      const spine = (1 - SS(Math.abs(x), .07, .12)) * SS(y, .8, .88) * (1 - SS(z, .5, .7));
      out.lerp(M.stripes, Math.max(band * side, spine));
    }
    if (M.spots){
      let s = 0;
      for (const d of spotDots){ const dd = 1 - (x * d[0] + y * d[1] + z * d[2]); s = Math.max(s, 1 - SS(dd, .008, .016)); }
      out.lerp(M.spots, s * (1 - SS(z, .5, .7)));
    }
  };
  const bodyGeo = ball(Q(56), Q(40), bodyShape, bodyPaint);
  const body = kit.add(root, bodyGeo, kit.paint, 0, bodyY, 0, BW, BH, BL); body.name = 'body';
  const coat = [{ c: body.position.clone(), r: new T.Vector3(BW, BH, BL) }];

  // 長い毛の すそ（からだの 下に たれる 毛）
  if (longCoat){
    const hem = tuftField(70, 90, 2.3), drop = shortLegs ? .2 : .34;
    const skirtGeo = ball(Q(56), Q(36), (x, y, z) => {
      let r = 1 + .03 * (hem(x, y, z) - .45);
      if (y < 0) r *= 1 + drop * Math.pow(-y, 1.8) * (1 + .1 * Math.sin(Math.atan2(z, x) * 11));
      return r;
    }, (x, y, z, out) => {
      out.copy(col.body);
      if (twoTone) out.lerp(col.main, SS(-y, .3, .85));
      out.lerp(col.chest, SS(z, .45, .8) * (1 - SS(y, .2, .5))); out.multiplyScalar(.97);
    });
    kit.add(root, skirtGeo, kit.paint, 0, bodyY - .01, -.01, BW * 1.03, BH * .98, BL * 1.01);
  }

  /* ----- 足（わんランと 同じ しくみ：leg.userData.hip・phase・paw） ----- */
  const legs = [];
  const legFleece = curly ? fleeceField(true) : null;
  for (const side of [-1, 1]) for (const end of [-1, 1]){
    const leg = kit.group(root, side * BW * .58, H, end * BL * .56);
    leg.userData.hip = leg.position.clone(); leg.userData.phase = side * end > 0 ? 0 : Math.PI;
    const hind = end < 0, s = H / .38;
    const thighCol = hind ? col.haunch : col.body, legCol = twoTone ? col.main : col.body;
    const thighTuft = (fluffy || longCoat) ? tuftField(14, 30, side + end * 2) : null;
    const thighShape = legFleece ? (x, y, z) => legFleece(x, y, z).r : thighTuft ? (x, y, z) => 1 + .06 * (thighTuft(x, y, z) - .4) : null;
    const thighGeo = ball(Q(28), Q(20), thighShape, (x, y, z, out) => {
      out.copy(thighCol);
      if (hind && M.saddle) out.lerp(col.body, SS(-y, .3, .9) * .6);
      if (twoTone) out.lerp(col.main, SS(-y, -.45, .15));   // ふとももの 上だけ からだの 色
    });
    kit.add(leg, thighGeo, kit.paint, 0, -H * .12, 0, hind ? .125 : .105, H * .42, hind ? .135 : .11);
    const socks = cHex.paws !== (twoTone ? cHex.main : cHex.body);
    const shinGeo = ball(Q(18), Q(14), null, (x, y, z, out) => {
      out.copy(legCol);
      if (socks) out.lerp(col.paws, SS(-y, .05, .35));
      if (M.stripes && !shortLegs){ const b = 1 - SS(Math.abs(((y * 1.6 + .2) % 1 + 1) % 1 - .5), .14, .22); out.lerp(M.stripes, b * SS(y, -.4, -.2) * (1 - SS(y, .6, .8))); }
    });
    kit.add(leg, shinGeo, kit.paint, 0, -H * .6, 0, .078 * Math.max(.9, s), H * .34, .082 * Math.max(.9, s));
    const paw = kit.oval(leg, kit.std(cHex.paws), 0, .08 - H, .03, .088, .075, .115);
    leg.userData.paw = paw; legs.push(leg);
    if (curly) kit.add(leg, ball(Q(20), Q(14), (x, y, z) => legFleece(x, y, z).r, (x, y, z, o) => o.copy(col.body).multiplyScalar(legFleece(x, y, z).v)), kit.paint, 0, .14 - H, 0, .1, .07, .1);
  }

  /* ----- 頭 ----- */
  const head = kit.group(root, 0, headY, headZ, 'head');
  const EXu = cat ? .4 : .383, EYv = cat ? .06 : .04;
  const NY = cat ? { short: 109, medium: 111, long: 113 }[L.muzzle] : { short: 112, medium: 116, long: 119 }[L.muzzle];
  const blushV = (100 - (NY + 2)) / 51, blushU = cat ? .6 : .58;
  const headSpots = M.spots ? [[100, 64, 4], [140, 60, 5], [124, 72, 3.5], [70, 94, 4], [170, 90, 4.5]].map(([x, y, r]) => [(x - 120) / 60, (100 - y) / 51, r / 55]) : [];
  const maskV = cat ? (100 - (NY - 4)) / 51 : (100 - (NY + 2)) / 51, maskR = cat ? [.63, .63] : [.52, .51];
  const headPaint = (x, y, z, out) => {
    const u = x, v = y, front = SS(z, -.3, .12);
    out.copy(col.main);
    // ぶち（左右）：2D の (90, 86)・(150, 86) の だ円。うしろにも つづく
    if (M.patchL) out.lerp(M.patchL, ell(u, v, -.5, .27, .64, .74, .22));
    if (M.patchR) out.lerp(M.patchR, ell(u, v, .5, .27, .64, .74, .22));
    // 顔の もよう（正面だけ）
    let f = 0;
    if (L.face === 'lower'){
      f = Math.max(ell(u, v, 0, -.59, cat ? .83 : .8, .59), SS(-v, .78, .92));
    } else if (L.face === 'mask'){
      f = Math.max(ell(u, v, 0, -.39, .97, .67), ell(u, v, -.38, .04, .27, .25), ell(u, v, .38, .04, .27, .25), SS(-v, .75, .9));
      const w = .133 - .07 * (1.06 - v) / .9;
      if (v > .12) f *= SS(Math.abs(u), w - .03, w + .03);
    } else if (L.face === 'hachiware'){
      const vb = Math.max(-.25, .71 - 2.6 * Math.abs(u));
      f = 1 - SS(v - vb, -.05, .05);
    } else if (L.face === 'blaze'){
      const w = v > .39 ? .085 : .085 + (.39 - v) * .62;
      f = (1 - SS(Math.abs(u) - w, -.03, .03)) * (1 - SS(v, 1.0, 1.1));
      f = Math.max(f, SS(-v, .8, .95));
    }
    if (f > 0) out.lerp(col.face, f * front);
    // しま（ねこの ひたいと ほお。うしろは よこの しま）
    if (M.stripes){
      const lines = [[-.133, .86, -.1, .63], [0, .94, 0, .67], [.133, .86, .1, .63], [-1, -.04, -.77, -.1], [-.97, -.24, -.77, -.24], [1, -.04, .77, -.1], [.97, -.24, .77, -.24]];
      let s = 0; for (const l of lines) s = Math.max(s, 1 - SS(seg(u, v, ...l), .03, .05));
      out.lerp(M.stripes, s * front);
      // うしろあたまは 頭の てっぺんから くびへ たてに ながれる しま
      const back = 1 - SS(z, -.4, -.05), lon = Math.atan2(x, -z) / .42;
      out.lerp(M.stripes, back * (1 - SS(Math.abs(((lon % 1) + 1.5) % 1 - .5), .17, .26)) * SS(v, -.45, -.15));
    }
    if (M.spots){ let s = 0; for (const [cu, cv, r] of headSpots) s = Math.max(s, ell(u, v, cu, cv, r, r * 1.15, .3)); out.lerp(M.spots, s * front); }
    if (M.brows) out.lerp(M.brows, Math.max(ell(u, v, -EXu, .35, .092, .078, .3), ell(u, v, EXu, .35, .092, .078, .3)) * front);
    if (M.mask) out.lerp(M.mask, .92 * (1 - SS(((u / maskR[0]) ** 2 + ((v - maskV) / maskR[1]) ** 2), .25, 1.05)) * front);
    // ほっぺ（2D は うすい ピンク）
    out.lerp(col.blush, .42 * Math.max(ell(u, v, -blushU, blushV, .14, .1, .5), ell(u, v, blushU, blushV, .14, .1, .5)) * SS(z, .2, .4));
  };
  const headTufts = (fluffy || longCoat) ? tuftField(80, 105, 2.1) : null;
  const headFleece = curly ? fleeceField(false) : null;
  const faceFlat = (y, z) => SS(z, .2, .6) * (1 - SS(y, .4, .75));   // 顔の まんなかは なめらかに（目・はなが のる）
  const headShape = (x, y, z) => {
    if (headFleece) return 1 + (headFleece(x, y, z).r - 1) * (1 - faceFlat(y, z)) * 1.1;
    if (headTufts) return 1 + .045 * (headTufts(x, y, z) - .45) * (1 - faceFlat(y, z));
    return 1;
  };
  const headGeo = ball(Q(64), Q(48), (headFleece || headTufts) ? headShape : null, (x, y, z, out) => {
    headPaint(x, y, z, out);
    if (headFleece) out.multiplyScalar(1 - (1 - headFleece(x, y, z).v) * (1 - faceFlat(y, z)));
  });
  kit.add(head, headGeo, kit.paint, 0, 0, 0, HR[0], HR[1], HR[2]).name = 'skull';
  coat.push({ c: new T.Vector3(0, headY, headZ), r: new T.Vector3(...HR), head: true });
  // 頭の だ円の 上の 点と 法線（u, v は 正面の 座標。w を 入れると 正面いがいも）
  const onHead = (u, v, w, inset = 0) => {
    const d = new T.Vector3(u, v, w ?? Math.sqrt(Math.max(0, 1 - u * u - v * v))).normalize();
    const p = new T.Vector3(d.x * HR[0], d.y * HR[1], d.z * HR[2]);
    const n = new T.Vector3(p.x / HR[0] ** 2, p.y / HR[1] ** 2, p.z / HR[2] ** 2).normalize();
    return { p: p.addScaledVector(n, -inset), n };
  };

  /* 目（2D と 同じ 位置・大きさ・色。ハイライトは 光に たよらず いつも 白） */
  const eyes = [];
  const eyeR = cat ? [.068, .076, .03] : [.06, .07, .03];
  const lightIris = lumHex(cHex.eye) > .06;
  for (const s of [-1, 1]){
    const { p, n } = onHead(s * EXu, EYv, null, .012);
    const eye = kit.group(head, p.x, p.y, p.z);
    eye.quaternion.setFromUnitVectors(new T.Vector3(0, 0, 1), n.clone().add(new T.Vector3(0, 0, .7)).normalize());
    if (darkEyes) kit.oval(eye, kit.std(mixHex(eyeArea, '#ffffff', .42)), 0, 0, -.004, eyeR[0] * 1.24, eyeR[1] * 1.22, eyeR[2] * .7);
    kit.oval(eye, kit.std(cHex.eye, .28), 0, 0, 0, ...eyeR);
    if (lightIris) kit.oval(eye, kit.std('#1E1620', .3), 0, -.002, eyeR[2] * .72, cat ? .024 : .029, cat ? .056 : .04, .012);
    kit.dot(eye, kit.flat('#ffffff'), .022, .028, eyeR[2] * .92, .021, .021, .01);
    kit.dot(eye, kit.flat('#ffffff', .85), -.022, -.03, eyeR[2] * .85, .01, .01, .006);
    eyes.push(eye);
  }

  /* 口もと・はな・口・べろ */
  let tongue = null;
  if (!cat){
    const mr = { short: [.17, .115, .12], medium: [.18, .125, .16], long: [.185, .13, .21] }[L.muzzle];
    const my = -HR[1] * { short: .3, medium: .34, long: .38 }[L.muzzle];
    const mz = Math.sqrt(1 - (my / HR[1]) ** 2) * HR[2] + { short: .055, medium: .095, long: .145 }[L.muzzle] - mr[2];
    const muzzleGeo = ball(Q(32), Q(24), null, (x, y, z, out) => {
      out.copy(col.muzzle);
      if (M.mask) out.lerp(M.mask, .9 * SS(z, -.4, .35));
    });
    kit.add(head, muzzleGeo, kit.paint, 0, my, mz, ...mr).name = 'muzzle';
    const surf = (xn, yn, lift) => [xn * mr[0], my + yn * mr[1], mz + Math.sqrt(Math.max(0, 1 - xn * xn - yn * yn)) * mr[2] + lift];
    const nose = surf(0, .5, -.01), ns = L.muzzle === 'short' ? .9 : 1;
    kit.oval(head, kit.std(cHex.nose, .35), nose[0], nose[1], nose[2], .062 * ns, .043 * ns, .042 * ns);
    kit.dot(head, kit.flat('#ffffff', .55), -.018 * ns, nose[1] + .018, nose[2] + .03, .012, .007, .005);
    const mm = kit.std(mouthHex, .6);
    stroke(kit, head, [surf(0, .18, .002), surf(0, -.08, .002)], .0055, mm);
    for (const s of [-1, 1]) stroke(kit, head, [surf(0, -.08, .002), surf(s * .2, -.24, .002), surf(s * .42, -.06, .002)], .0055, mm);
    tongue = kit.oval(head, kit.std('#F38BA0', .5), 0, my - mr[1] * .72, mz + mr[2] * .62, .042, .022, .05);
    tongue.rotation.x = .45; tongue.visible = false;
  } else {
    const py = -HR[1] * (NY - 100 + 6) / 51, pz = Math.sqrt(1 - (py / HR[1]) ** 2) * HR[2] - .035;
    for (const s of [-1, 1]) kit.oval(head, kit.std(muzzleHex), s * .052, py, pz, .068, .055, .06);
    kit.oval(head, kit.std(muzzleHex), 0, py - .04, pz - .01, .05, .035, .045);
    const ny = -HR[1] * (NY - 100) / 51, nz = Math.sqrt(1 - (ny / HR[1]) ** 2) * HR[2] + .022;
    const nose = kit.add(head, new T.ConeGeometry(.034, .036, 3), kit.std(cHex.nose, .45), 0, ny + .004, nz);
    nose.rotation.set(-Math.PI / 2 + .25, 0, Math.PI); nose.scale.set(1, 1, .55);
    const mm = kit.std(mouthHex, .6);
    stroke(kit, head, [[0, ny - .014, nz - .002], [0, ny - .03, nz + .004]], .005, mm);
    for (const s of [-1, 1]) stroke(kit, head, [[0, ny - .03, nz + .004], [s * .02, ny - .045, nz + .006], [s * .045, ny - .033, nz + .002]], .005, mm);
    const wc = lumHex(cHex.main) < .2 ? kit.flat('#ffffff', .65) : kit.flat('#3C2837', .45);
    for (const s of [-1, 1]) for (const k of [-1, 0, 1]) stroke(kit, head, [[s * .07, py + k * .012, pz + .04], [s * .2, py + k * .03 + .006, pz + .005], [s * .3, py + k * .05, pz - .05]], .0035, wc);
    tongue = kit.oval(head, kit.std('#F38BA0', .5), 0, py - .055, pz + .03, .026, .014, .03);
    tongue.rotation.x = .45; tongue.visible = false;
  }

  /* 耳（2D の 7しゅるい） */
  const ears = [];
  const earFleece = curly ? fleeceField(true) : null;
  const earTufts = (fluffy || longCoat) ? tuftField(18, 30, 3.3) : null;
  const triProfile = [[1, 0], [.94, .2], [.74, .45], [.46, .72], [.16, .94], [.01, 1]];
  const upProfile = (cat || L.ear === 'small') ? triProfile : [[.67, 0], [.97, .17], [1, .32], [.85, .52], [.54, .78], [.15, .96], [.005, 1]];
  // 立ち耳：つけねを 頭の 中まで のばして（root）、かたむけても 耳と 頭の あいだに すきまが できない ように
  const upright = (g, w, h, hexCol, flatZ = .55) => {
    const r0 = upProfile[0][0], prof = [[r0 * .92, -.6], [r0 * 1.02, -.28], ...upProfile];
    const geo = new T.LatheGeometry(prof.map(([r, y]) => new T.Vector2(r * w, y * h)), 22);
    const m = kit.add(g, geo, kit.std(hexCol), 0, 0, 0); m.scale.z = flatZ;
    kit.oval(g, kit.std(innerHex(hexCol)), 0, h * .4, w * flatZ * .52, w * .5, h * .32, w * .1);
  };
  for (const s of [-1, 1]){
    const earHex = s < 0 ? earLHex : earRHex;
    let base, g, rx = 0, ry = 0, rz = 0, floppy = false;
    const t = L.ear;
    if (t === 'pointy' || t === 'big' || t === 'small'){
      const spec = cat
        ? { pointy: [.16, .25, .58, .72, .1, .3], big: [.175, .31, .6, .7, .06, .36], small: [.13, .17, .55, .76, .12, .24] }[t]
        : { pointy: [.15, .27, .56, .74, .06, .3], big: [.175, .37, .6, .7, .02, .46], small: [.105, .16, .5, .8, .12, .2] }[t];
      base = onHead(s * spec[2], spec[3], spec[4], t === 'small' && furry ? .0 : .045);
      g = kit.group(head, base.p.x, base.p.y, base.p.z); rz = -s * spec[5]; ry = s * .28;
      upright(g, spec[0], spec[1], earHex);
    } else if (t === 'semi'){
      base = onHead(s * .6, .72, .04, .04);
      g = kit.group(head, base.p.x, base.p.y, base.p.z); rz = -s * .3; ry = s * .2;
      upright(g, .13, .16, earHex);
      const tip = kit.group(g, 0, .13, .01);
      tip.rotation.x = 2.05;
      kit.oval(tip, kit.std(earHex), 0, .06, .012, .105, .075, .028);
    } else if (t === 'fold'){
      base = onHead(s * .45, .84, .25, .01);
      g = kit.group(head, base.p.x, base.p.y, base.p.z); rx = 1.2; rz = -s * .25;
      kit.oval(g, kit.std(earHex), 0, .035, 0, .1, .065, .035);
    } else {
      // たれ耳（floppy）・長い たれ耳（long）
      const long = t === 'long';
      base = onHead(s * .9, .44, -.02, .03);
      g = kit.group(head, base.p.x, base.p.y, base.p.z); rz = s * .16; floppy = true;
      const r = long ? (furry ? [.115, .27, .15] : [.09, .26, .13]) : [.085, .19, .125];
      const geo = earFleece ? ball(Q(28), Q(22), (x, y, z) => earFleece(x, y, z).r, (x, y, z, o) => o.set(earHex).multiplyScalar(earFleece(x, y, z).v))
        : earTufts && long ? ball(Q(24), Q(20), (x, y, z) => 1 + .07 * (earTufts(x, y, z) - .4), (x, y, z, o) => o.set(earHex))
        : null;
      if (geo) kit.add(g, geo, kit.paint, s * .035, -(long ? .23 : .16), 0, ...r);
      else kit.oval(g, kit.std(earHex), s * .03, -(long ? .23 : .16), 0, ...r);
    }
    g.rotation.set(rx, ry, rz);
    ears.push({ g, rx, ry, rz, floppy });
  }

  /* ----- くびまわりの 毛（ふわふわ・長い毛・巻き毛） ----- */
  if (furry){
    const big = L.ear === 'small' && fluffy;
    const rr = big ? [.45, .27, .33] : cat ? [.34, .19, .27] : [.37, .21, .29];
    const rc = new T.Vector3(0, headY - HR[1] * .78, headZ - HR[2] * .35);
    const rt = tuftField(110, 120, .9), rf = curly ? fleeceField(false) : null;
    const ruffGeo = ball(Q(64), Q(44), (x, y, z) => rf ? rf(x, y, z).r : 1 + .075 * (rt(x, y, z) - .45),
      (x, y, z, out) => { out.copy(col.body).lerp(twoTone ? col.chest : col.ruff, SS(z, -.2, .3)); if (rf) out.multiplyScalar(rf(x, y, z).v); });
    kit.add(root, ruffGeo, kit.paint, rc.x, rc.y, rc.z, ...rr).name = 'ruff';
    coat.push({ c: rc, r: new T.Vector3(...rr).multiplyScalar(1.05) });
  }

  /* ----- しっぽ（2D の 6しゅるい） ----- */
  const tail = kit.group(root, 0, bodyY + BH * .3, -BL * .9, 'tail');
  const tailCol = C(cHex.tail), tipCol = cHex.tailTip ? C(cHex.tailTip) : null;
  const tipAt = (u, from) => tipCol ? SS(u, from, from + .08) : 0;
  const tailTufts = (r, amt) => (u, a) => r(u) * (1 + amt * Math.sin(a * Math.PI * 2 * 5 + u * 23) * Math.sin(u * 31 + a * 9));
  const stripeRing = u => M.stripes ? 1 - SS(Math.abs(((u / .15) % 1) - .5), .16, .24) : 0;
  const paintTail = (tipFrom, stripes) => (u, a, out) => {
    out.copy(tailCol);
    if (stripes && M.stripes) out.lerp(M.stripes, stripeRing(u) * (1 - SS(u, .86, .9)) * SS(u, .08, .12));
    if (tipCol) out.lerp(tipCol, tipAt(u, tipFrom));
  };
  const tailMesh = geo => kit.add(tail, geo, kit.paint);
  const tt = L.tail;
  let wag = 6.5;
  if (tt === 'curl'){
    const pts = [[0, 0, 0], [-.08, .12, -.1], [-.065, .27, -.14], [.044, .35, -.13], [.17, .32, -.11], [.21, .22, -.11], [.16, .17, -.14], [.12, .19, -.156]];
    const k = fluffy ? 1.3 : 1;
    tailMesh(tube(pts, Q(42), Q(14), (u, a) => k * (.062 + .05 * Math.pow(Math.sin(Math.PI * u), .55) - .06 * SS(u, .79, 1)) * (fluffy ? 1 + .1 * Math.sin(a * 6.28 * 5 + u * 20) : 1), paintTail(.78, false)));
    wag = 7.5;
  } else if (tt === 'plume'){
    if (curly){
      tailMesh(tube([[0, 0, 0], [0, .1, -.06], [0, .2, -.08]], 10, 8, () => .034, paintTail(2, false)));
      const pf = fleeceField(false);
      kit.add(tail, ball(Q(32), Q(24), (x, y, z) => pf(x, y, z).r, (x, y, z, o) => o.copy(tipCol || tailCol).multiplyScalar(pf(x, y, z).v)), kit.paint, 0, .26, -.09, .11, .11, .11);
    } else {
      const big = fluffy ? 1.2 : 1;
      const pts = [[0, 0, 0], [0, .17, -.07], [0, .3, .01], [0, .31, .14], [0, .24, .25]];
      tailMesh(tube(pts, Q(32), Q(16), tailTufts(u => big * (.07 + .085 * Math.pow(Math.sin(Math.PI * Math.min(1, u * 1.05)), .7)) * (1 - .85 * SS(u, .8, 1)), .12), paintTail(.7, false)));
    }
    wag = 5.5;
  } else if (tt === 'straight'){
    const r0 = fluffy || longCoat ? .068 : .052;
    tailMesh(tube([[0, 0, 0], [0, .08, -.12], [0, .2, -.2], [0, .33, -.24]], Q(20), Q(12), u => r0 * (1 - .55 * SS(u, .3, 1)) * (u > .94 ? Math.sqrt(Math.max(.04, 1 - ((u - .94) / .06) ** 2)) : 1), paintTail(.78, true)));
  } else if (tt === 'stub'){
    const st = fluffy ? tuftField(12, 24, 4.4) : null;
    kit.add(tail, ball(Q(20), Q(16), st ? (x, y, z) => 1 + .12 * (st(x, y, z) - .4) : null, (x, y, z, o) => o.copy(tailCol)), kit.paint, 0, .03, -.02, .075, .07, .075);
    wag = 9;
  } else {
    // ねこの 長い しっぽ（long）・ふさふさ（fluffy）
    const fat = tt === 'fluffy';
    const pts = [[0, 0, 0], [0, .02, -.15], [0, .12, -.27], [0, .3, -.31], [0, .45, -.25], [0, .5, -.17]];
    const r0 = fat ? .085 : .044;
    const radius = u => r0 * (fat ? 1 + .25 * Math.sin(Math.PI * u) : 1) * (u > .9 ? Math.sqrt(Math.max(.03, 1 - ((u - .9) / .1) ** 2)) : 1);
    tailMesh(tube(pts, Q(40), Q(14), fat ? tailTufts(radius, .1) : radius, paintTail(.82, true)));
    wag = 3.6;
  }

  /* ----- くびの きせかえ ----- */
  if (neckWear) addNeckWear(kit, root, neckWear, coat, { headY, headZ, HR, bodyY, BH, BW, BL });

  // 動かない 部品は、動く 入れもの（からだ・頭・目・耳・足・しっぽ）ごとに マテリアルで まとめる（描く 回数を へらす）
  bake(root, new Set([root, head, tail, ...eyes, ...ears.map(e => e.g), ...legs]), new Set([...legs.map(l => l.userData.paw), tongue].filter(Boolean)));

  root.userData.legs = legs;
  root.userData.tail = tail;
  root.userData.height = H;
  root.userData.rig = { head, headY, ears, eyes, tongue, wag, seed: (rgb(cHex.main)[0] % 17) / 10 };
  root.userData.size = { H, BW, BH, BL, HR, headY, headZ, top: headY + HR[1] + .2 };
  return root;
}

/* 動く 入れもの（pivots）の 中の 動かない メッシュを、マテリアルごとに 1つに まとめる。keep は そのまま のこす（足の うら・べろ） */
function bake(root, pivots, keep){
  root.updateMatrixWorld(true);
  const rel = new T.Matrix4(), inv = new T.Matrix4(), old = new Set();
  for (const pivot of pivots){
    inv.copy(pivot.matrixWorld).invert();
    const buckets = new Map(), victims = [];
    const walk = o => {
      for (const ch of o.children){
        if (pivots.has(ch) || keep.has(ch)) continue;
        if (ch.isMesh){
          const g = ch.geometry.clone(); old.add(ch.geometry);
          g.applyMatrix4(rel.multiplyMatrices(inv, ch.matrixWorld)); g.deleteAttribute('uv');
          const key = ch.material.uuid + (g.attributes.color ? '|c' : '');
          if (!buckets.has(key)) buckets.set(key, { mat: ch.material, geos: [] });
          buckets.get(key).geos.push(g.index ? g : g.setIndex([...Array(g.attributes.position.count).keys()]));
          victims.push(ch);
        }
        walk(ch);
      }
    };
    walk(pivot);
    for (const v of victims) v.removeFromParent();
    for (const { mat, geos } of buckets.values()){
      const merged = geos.length === 1 ? geos[0] : mergeGeometries(geos, false);
      if (geos.length > 1) geos.forEach(g => g.dispose());
      const m = new T.Mesh(merged, mat); m.castShadow = m.receiveShadow = true; pivot.add(m);
    }
  }
  // 中身が なくなった 入れもの（くびの きせかえ・すず など）を はずす
  const empty = []; root.traverse(o => { if (o !== root && !o.isMesh && !pivots.has(o) && o.children.length === 0) empty.push(o); });
  empty.forEach(o => o.removeFromParent());
  const used = new Set(); root.traverse(o => { if (o.geometry) used.add(o.geometry); });
  for (const g of old) if (!used.has(g)) g.dispose();
}

/* ===== くびの きせかえ =====
 * 首の 線は、頭と からだ（と くびまわりの 毛）が かさなる ところ。頭と からだの あいだの 点 O から、
 * 向き（まわりの 角 a・上下の 角 e）ごとに「頭の 外に 出る きょり」と「からだの 外に 出る きょり」が 同じに なる 上下の 角を さがす。
 * 布は その 線から 下へ（からだの 上に）のせる（わんラン neck-scarf.js と 同じく、毛の 外がわまでの きょり＋ゆとり）。 */
function addNeckWear(kit, root, w, coat, S){
  const O = new T.Vector3(0, (S.headY - S.HR[1] * .7 + S.bodyY + S.BH * .6) / 2, S.headZ * .7);
  const headParts = coat.filter(p => p.head), bodyParts = coat.filter(p => !p.head);
  const dirOf = (a, e) => new T.Vector3(Math.sin(a) * Math.cos(e), Math.sin(e), Math.cos(a) * Math.cos(e));
  const dist = (parts, d) => parts.reduce((m, p) => Math.max(m, exitDist(O, d, p.c, p.r)), 0);
  const creaseE = a => {
    let lo = -1.35, hi = 1.35;
    for (let i = 0; i < 26; i++){ const mid = (lo + hi) / 2, d = dirOf(a, mid); if (dist(headParts, d) > dist(bodyParts, d)) hi = mid; else lo = mid; }
    return (lo + hi) / 2;
  };
  const N = 72, crease = Array.from({ length: N + 1 }, (_, i) => creaseE(i / N * Math.PI * 2));
  const eAt = a => { const f = ((a / (Math.PI * 2)) % 1 + 1) % 1 * N, i = Math.floor(f), t = f - i; return crease[i] * (1 - t) + crease[(i + 1) % (N + 1)] * t; };
  // 角 a・首の 線から drop（ラジアン）下・ゆとり ease の 点
  const P = (a, drop, ease) => { const e = eAt(a) - drop, d = dirOf(a, e); return O.clone().addScaledVector(d, Math.max(dist(headParts, d), dist(bodyParts, d)) + ease); };
  const front = a => Math.max(0, 1 - Math.abs(Math.atan2(Math.sin(a), Math.cos(a))) / 1.4);
  const g = kit.group(root, 0, 0, 0, 'neck-wear');
  const sheet = (rows, cols, pointAt, colorAt, closed) => {
    const pos = [], idx = [], cl = [], c = new T.Color(), n = cols + (closed ? 0 : 1);
    for (let r = 0; r <= rows; r++) for (let k = 0; k < n; k++){
      pointAt(r / rows, k / cols).toArray(pos, pos.length); colorAt(r / rows, k / cols, c); cl.push(c.r, c.g, c.b);
      if (r && (closed || k < n - 1)){ const a0 = (r - 1) * n + k, b0 = (r - 1) * n + (k + 1) % n; idx.push(a0, a0 + n, b0, b0, a0 + n, b0 + n); }
    }
    const geo = new T.BufferGeometry();
    geo.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); geo.setAttribute('color', new T.Float32BufferAttribute(cl, 3));
    geo.setIndex(idx); geo.computeVertexNormals();
    const m = new T.Mesh(geo, kit.cloth); m.castShadow = m.receiveShadow = true; g.add(m); return m;
  };
  const p = w.p || {}, base = new T.Color(p.c && p.c !== 'rainbow' ? p.c : '#ffffff');
  const shade = (c, out, tone) => out.copy(c).multiplyScalar(tone);
  const band = (depth, ease, colorAt) => sheet(5, 96, (v, k) => {
    const a = k * Math.PI * 2, dep = depth[0] + depth[1] * Math.pow(front(a), 1.25);
    return P(a, -.03 + v * dep, ease + .012 * Math.sin(v * Math.PI));
  }, colorAt, true);
  const outward = (a, drop, ease) => { const p0 = P(a, drop, ease), p1 = P(a, drop, ease + .05); return { p: p0, n: p1.sub(p0).normalize() }; };
  const place = (obj, a, drop, ease) => { const { p: q, n } = outward(a, drop, ease); obj.position.copy(q); obj.quaternion.setFromUnitVectors(new T.Vector3(0, 0, 1), n); return obj; };
  const RAINBOW = ['#F27B7B', '#F5C562', '#8CC26A', '#6FABE3', '#B8A6EC'].map(h => new T.Color(h));
  const rainbowAt = a => { const f = ((a / (Math.PI * 2)) % 1 + 1) % 1 * RAINBOW.length, i = Math.floor(f); return RAINBOW[i].clone().lerp(RAINBOW[(i + 1) % RAINBOW.length], f - i); };

  if (w.kind === 'scarf'){
    const tri = p.tri ? p.tri.map(h => new T.Color(h)) : null;
    band([.2, .16], .03, (v, k, out) => {
      const tone = v < .08 || v > .92 ? .84 : 1;
      if (tri) shade(tri[Math.floor(k * 27) % 3], out, tone); else shade(base, out, tone);
    });
    // むすび目と 2本の はし（2D と 同じく 右前に たれる）
    const knotA = .95;
    const knotGeo = tri ? ball(16, 12, null, (x, y, z, o) => o.copy(tri[Math.floor((y + 1) * 1.6) % 3])) : kit.sphere;
    place(kit.add(g, knotGeo, tri ? kit.paint : kit.std(p.c, .93), 0, 0, 0, .05, .048, .065), knotA, .1, .045);
    [[.04, .6], [.3, .46]].forEach(([turn, fall], j) => {
      // はしは 下へ たれる 布：はばは まわりの 角の 方向、長さは 下へ
      const wAng = v => (.3 + .08 * Math.sin(v * Math.PI)) * (1 - .35 * v ** 3);
      sheet(12, 4, (v, k) => P(knotA + turn * v + (k - .5) * wAng(v), .1 + v * fall, .05 + .012 * Math.sin(k * Math.PI) + .012 * j), (v, k, out) => {
        const tone = k === 0 || k === 1 ? .86 : 1;
        if (tri) shade(tri[[1, 2, 0][Math.floor(v * 7.99) % 3]], out, tone); else shade(base, out, tone);
      }, false);
      const fr = tri ? kit.std(p.tri[0]) : kit.std(mixHex(p.c, '#2A1E2A', .3));
      for (const k of [-.33, 0, .33]){
        const a = knotA + turn + k * wAng(1), a0 = P(a, .1 + fall, .052 + .012 * j), a1 = P(a, .1 + fall + .09, .05 + .012 * j);
        stroke(kit, g, [a0.toArray(), a1.toArray()], .008, fr);
      }
    });
  } else if (w.kind === 'bandana'){
    band([.06, .02], .022, (v, k, out) => shade(base, out, v > .9 ? .86 : 1));
    const white = new T.Color('#ffffff'), check = p.check;
    const tri = sheet(10, 20, (v, k) => {
      const s = k * 2 - 1, half = 1.05 * (1 - v * .97);
      return P(s * half, .05 + v * .62 * (1 - .12 * s * s), .03 + .006 * v);
    }, (v, k, out) => {
      if (check){ const a = Math.floor(k * 10) % 2, b = Math.floor(v * 6) % 2; out.copy(white).lerp(base, .55 * (a + b)); } else out.copy(base);
      if (v > .96) out.multiplyScalar(.86);
    }, false);
    tri.name = 'bandana';
    if (p.d) for (const [s, v] of [[-.45, .16], [0, .3], [.45, .16], [0, .62]]){
      const dot = kit.dot(g, kit.std(p.d), 0, 0, 0, .017, .017, .004);
      place(dot, s * 1.05 * (1 - v * .97), .05 + v * .62 * (1 - .12 * s * s), .036);
    }
  } else if (w.kind === 'bell'){
    band([.07, .015], .022, (v, k, out) => {
      if (p.c === 'rainbow') out.copy(rainbowAt(k * Math.PI * 2)); else out.copy(base);
      if (v < .1 || v > .9) out.multiplyScalar(.82);
    });
    const bell = kit.group(g); place(bell, 0, .21, .062);
    kit.oval(bell, kit.std(p.b, .32, .45), 0, 0, 0, .062, .062, .062);
    kit.oval(bell, kit.std(mixHex(p.b, '#2A1E2A', .42), .5), 0, -.014, .054, .034, .005, .012);
    kit.oval(bell, kit.std(mixHex(p.b, '#2A1E2A', .42), .5), 0, -.031, .049, .008, .014, .01);
    kit.dot(bell, kit.flat('#ffffff', .75), -.02, .024, .054, .013, .013, .006);
  } else if (w.kind === 'bowtie'){
    const bow = kit.group(g); place(bow, 0, .08, .025);
    const wing = kit.std(p.c, .7), knotMat = kit.std(mixHex(p.c, '#ffffff', .18), .7);
    for (const s of [-1, 1]){ const m = kit.add(bow, new T.ConeGeometry(.055, .085, 4), wing, s * .045, 0, .01); m.rotation.z = s * Math.PI / 2; m.scale.set(1, 1, .45); }
    kit.oval(bow, knotMat, 0, 0, .018, .026, .026, .02);
  } else if (w.kind === 'pearls'){
    const pearl = kit.std('#FBF7F2', .22, .1);
    for (let i = 0; i < 26; i++){ const a = i / 26 * Math.PI * 2; place(kit.dot(g, pearl, 0, 0, 0, .021, .021, .021), a, .06 + .03 * front(a), .02); }
    place(kit.oval(g, kit.std('#F7C9D6', .3), 0, 0, 0, .028, .028, .022), 0, .18, .028);
  } else if (w.kind === 'lei'){
    const cols = ['#F7A9C4', '#FFD27A', '#FFFFFF', '#C9B6F2', '#F28C8C'];
    for (let i = 0; i < 14; i++){
      const a = i / 14 * Math.PI * 2, f = kit.group(g); place(f, a, .06 + .03 * front(a), .022);
      const pm = kit.std(cols[i % cols.length], .8);
      for (let k = 0; k < 5; k++){ const b = k / 5 * Math.PI * 2; kit.dot(f, pm, Math.cos(b) * .026, Math.sin(b) * .026, 0, .022, .022, .012); }
      kit.dot(f, kit.std('#F5C04A', .7), 0, 0, .01, .012, .012, .008);
    }
  } else if (w.kind === 'ukiwa'){
    // からだ（と くびまわりの 毛・頭）の まわりを 水平に ひとまわり。うきの 太さだけ 外に
    const yc = S.bodyY + S.BH * .38, c0 = new T.Vector3(0, yc, S.BL * .18), tubeR = .085, pts = [];
    for (let i = 0; i < 48; i++){
      const a = i / 48 * Math.PI * 2, d = new T.Vector3(Math.sin(a), 0, Math.cos(a));
      const r = coat.reduce((m, q) => Math.max(m, exitDist(c0, d, q.c, q.r)), 0);
      pts.push(c0.clone().addScaledVector(d, r + tubeR * .8));
    }
    const curve = new T.CatmullRomCurve3(pts, true);
    const geo = new T.TubeGeometry(curve, 96, tubeR, 14, true), pos = geo.attributes.position, cl = [], cc = new T.Color();
    const red = new T.Color('#F27B7B'), wht = new T.Color('#FFFFFF');
    for (let i = 0; i < pos.count; i++){
      const a = Math.atan2(pos.getX(i), pos.getZ(i) - c0.z) + Math.PI / 4;
      cc.copy(Math.floor(((a / (Math.PI / 2)) % 4 + 4) % 4) % 2 ? wht : red); cc.toArray(cl, i * 3);
    }
    geo.setAttribute('color', new T.Float32BufferAttribute(cl, 3));
    kit.add(g, geo, kit.paint);
  }
}

/* ===== 走る ポーズ ===== */
export function posePet3D(pet, t, running, opts = {}){
  const u = pet.userData, rig = u.rig;
  if (!rig) return;
  const reduced = !!opts.reduced, tt = reduced ? 0 : t;
  const stride = opts.phase ?? tt * 9;
  const wave = Math.sin(tt * (running ? rig.wag * 1.25 : rig.wag * .62));
  u.tail.rotation.y = wave * (running ? .35 : .24);
  u.tail.rotation.x = running ? .08 * Math.sin(tt * 9.5) : 0;
  const blink = reduced ? 0 : Math.max(0, 1 - Math.abs((tt + rig.seed) % 4.3 - 3.6) / .11);
  rig.eyes.forEach(e => { e.scale.y = 1 - .92 * blink; });
  const bob = Math.sin(stride * 3.7);
  rig.head.position.y = rig.headY + (running ? .014 * bob : .006 * Math.sin(tt * 1.6));
  rig.head.rotation.x = running ? .03 * Math.sin(stride * 3.7 + .6) : .015 * Math.sin(tt * 1.65);
  rig.head.rotation.z = running ? 0 : .035 * Math.sin(tt * 1.34);
  rig.ears.forEach((e, i) => {
    const s = i ? 1 : -1;
    e.g.rotation.z = e.rz + s * (e.floppy ? (running ? .16 : .035) : .03) * Math.sin(stride * 3.7 + i * .5);
    e.g.rotation.x = e.rx + (e.floppy && running ? .14 * Math.sin(stride * 3.7) : 0);
  });
  if (rig.tongue) rig.tongue.visible = !!running;
  if (opts.legs !== false) strideLegs(pet, stride, running, !!opts.airborne);
}

// 平らな 地面の 足（わんラン dog-gait.js の poseLegs と 同じ 計算で、坂なし・y = 0）。ななめの 2本ずつ、うしろに けるときに 足のうらを つける
export function strideLegs(pet, phase, running, airborne){
  const pitch = pet.rotation.x, roll = pet.rotation.z, scale = pet.scale.y;
  const cp = Math.cos(pitch), sp = Math.sin(pitch), cr = Math.cos(roll), sr = Math.sin(roll);
  for (const leg of pet.userData.legs){
    const { hip, paw } = leg.userData;
    const cycle = phase * 1.85 + leg.userData.phase;
    const swing = airborne ? (hip.z > 0 ? -.64 : .74) : running ? .52 * Math.sin(cycle) : 0;
    leg.position.copy(hip); leg.rotation.x = swing; paw.rotation.x = airborne ? -.35 * swing : -swing;
    if (airborne) continue;
    const lift = running ? Math.max(0, -Math.cos(cycle)) ** 2 * hip.y * .23 : 0;
    const cs = Math.cos(swing), ss = Math.sin(swing);
    const soleY = hip.y + paw.position.y * cs - paw.position.z * ss - paw.scale.y;
    const soleZ = hip.z + paw.position.y * ss + paw.position.z * cs;
    const tiltedY = hip.x * sr + soleY * cr;
    const worldY = pet.position.y + scale * (cp * tiltedY - sp * soleZ);
    const dy = -worldY / scale + lift;
    leg.position.x += cp * sr * dy; leg.position.y += cp * cr * dy; leg.position.z -= sp * dy;
  }
}

export function disposePet3D(pet){
  const seen = new Set();
  pet.traverse(o => {
    if (o.geometry && !seen.has(o.geometry)){ seen.add(o.geometry); o.geometry.dispose(); }
    const ms = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
    for (const m of ms) if (!seen.has(m)){ seen.add(m); m.dispose(); }
  });
  pet.removeFromParent();
}
