import * as T from 'three';

export function addForestScenery(layout, {mesh, box, instances, pose, ribbon}) {
  const end = layout.length + 35;
  box(1000, .16, 1300, '#93a978', 0, -.12, -230);
  mesh(ribbon(0, 8.8, .005, -20, end, layout.point), '#b7ad79').name = 'trail-verge';
  mesh(ribbon(0, 7.5, .016, -20, end, layout.point), '#d1af80').name = 'continuous-road';

  let seed = 41383;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const trunks = [], lowBoughs = [], highBoughs = [], birches = [], birchLeaves = [], bark = [];
  const rocks = [], moss = [], ferns = [], leafLitter = [], waymarks = [], blazes = [];
  for (let s = -10; s < end; s += 4.3) {
    for (const side of [-1, 1]) {
      const station = s + random() * 3;
      const gap = Math.sin(s * .065) > .6 ? 3 : 0;
      const offset = side * (7.6 + gap + random() * 5);
      const size = .78 + random() * .58;
      if (random() < .28) {
        birches.push(pose(station, offset, size * 2.1, size, size, size));
        for (let j = 0; j < 3; j++) bark.push(pose(station, offset, size * (.9 + j * .9), size, size, size));
        birchLeaves.push(pose(station, offset, size * 4.4, 1.6 * size, 2.1 * size, 1.6 * size));
      } else {
        trunks.push(pose(station, offset, size * 1.6, size, size, size));
        lowBoughs.push(pose(station, offset, size * 3.35, size, size, size));
        highBoughs.push(pose(station, offset, size * 4.95, size, size, size));
      }
      const verge = side * (4.8 + random() * 1.6);
      if (random() < .35) {
        rocks.push(pose(s, verge, .16, .46, .32, .57));
        moss.push(pose(s, verge, .30, .38, .24, .45));
      } else {
        const stem = pose(s, verge, .22, .38, .47, .38);
        ferns.push(stem);
      }
      leafLitter.push(pose(s + random(), side * (3.2 + random() * .85), .027, .10, .007, .19));
    }
  }
  for (let s = 0; s < end; s += 17) {
    const side = Math.floor(s / 17) % 2 ? -1 : 1;
    waymarks.push(pose(s, side * 4.55, .49));
    blazes.push(pose(s, side * 4.55, .73));
  }
  const ridge=[];
  for(let s=24;s<end;s+=55){
    for(const side of [-1,1])ridge.push(pose(s,side*33,1,13,7+3*Math.sin(s),18));
  }
  instances(new T.IcosahedronGeometry(1,0),'#819e91',ridge,'forest-ridge');
  instances(new T.CylinderGeometry(.18,.29,3.2,8),'#79644c',trunks,'fir-trunks');
  instances(new T.ConeGeometry(1.85,3.7,8),'#355e51',lowBoughs,'fir-boughs');
  instances(new T.ConeGeometry(1.35,3.25,8),'#63865f',highBoughs,'fir-tops');
  instances(new T.CylinderGeometry(.14,.20,4.2,8),'#ded8ba',birches,'birch-trunks');
  instances(new T.CylinderGeometry(.19,.20,.085,8),'#817b67',bark,'birch-bark');
  instances(new T.IcosahedronGeometry(1,1),'#9cb668',birchLeaves,'birch-leaves');
  instances(new T.IcosahedronGeometry(1,0),'#8b8876',rocks,'verge-rocks');
  instances(new T.IcosahedronGeometry(1,0),'#83905e',moss,'rock-moss');
  instances(new T.ConeGeometry(1,1,5),'#668451',ferns,'forest-floor');
  instances(new T.IcosahedronGeometry(1,0),'#a98853',leafLitter,'fallen-leaves');
  instances(new T.BoxGeometry(.17,.98,.17),'#8a785e',waymarks,'waymarks');
  instances(new T.BoxGeometry(.177,.16,.177),'#eabd76',blazes,'trail-blazes');
}

export function addForestLog(group, mesh) {
  const trunk = mesh(new T.CylinderGeometry(.32,.34,1.95,12), '#74583f', 0,.34,0,group);
  trunk.rotation.z = Math.PI / 2;
  trunk.castShadow = true;
  for (const sign of [-1,1]) {
    const x = sign * .978;
    const cut = mesh(new T.CylinderGeometry(.294,.294,.012,16),'#cdab74',x,.34,0,group);
    cut.rotation.z = Math.PI / 2;
    const ring = mesh(new T.TorusGeometry(.18,.015,5,18),'#a48255',x + sign * .011,.34,0,group);
    ring.rotation.y = Math.PI / 2;
  }
}
