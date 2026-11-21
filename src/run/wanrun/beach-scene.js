import * as T from 'three';

function strip(point, inner, outer, y, from, to, step = 2) {
  const positions = [], indices = [];
  const count = Math.ceil((to - from) / step);
  for (let i = 0; i <= count; i++) {
    const s = from + (to - from) * i / count;
    const edge = point(s, -6.8 - .6 * Math.sin(s / 8) - .35 * Math.sin(s / 3));
    for (const distance of [outer, inner]) {
      positions.push(edge.x - distance, y, edge.z);
    }
    if (i < count) {
      const k = 2 * i;
      indices.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
    }
  }
  const geo = new T.BufferGeometry();
  geo.setAttribute('position', new T.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

export function addBeachScenery(layout, {mesh, box, pose, instances, groupAt, ribbon}) {
  const {point, length} = layout;
  box(1100, .12, 1400, '#e7cd98', 0, -.10, -200);
  const band = (inner, outer, y, color, name) => {
    mesh(strip(point, inner, outer, y, -210, length + 220), color).name = name;
  };
  band(-1.7, 0, -.007, '#c8b994', 'wet-sand');
  band(0, 320, .008, '#469eae', 'ocean');
  band(0, 2.8, .013, '#9edbd0', 'shallows');
  band(2.8, 10, .012, '#7fbcb7', 'coastal-water');
  band(-.1, .19, .025, '#f5f1d9', 'surf-line');
  mesh(ribbon(0, 7.5, .015, -15, length + 30, point), '#eacb95').name = 'continuous-road';
  for (const patch of layout.sand) {
    const group = groupAt(patch.s, patch.lane * 2);
    group.name = 'soft-sand';
    const surface = mesh(new T.CylinderGeometry(1, 1, .025, 36), '#c9a574', 0, .018, 0, group);
    surface.scale.set(patch.halfWidth, 1, patch.halfLength);
    for (let i = -2; i <= 2; i++) {
      const ripple = mesh(new T.SphereGeometry(1, 9, 5), '#bfa077', .09 * Math.sin(i), .034, i * 1.55, group);
      ripple.scale.set(.38, .022, .085);
      ripple.rotation.y = .2 * Math.sin(i + 1);
    }
  }
  const foam = [], poles = [], flags = [], dunes = [], umbrellaPoles = [], parasols = [[], []];
  for (let s = -30; s < length + 75; s += 5.5) {
    const shore = point(s, -6.8 - .6 * Math.sin(s / 8) - .35 * Math.sin(s / 3));
    for (let j = 0; j < 3; j++) {
      foam.push([shore.x - 1.6 - j * 7.8 - 1.1 * Math.cos(s + j), .027,
        shore.z + Math.sin(s * .32 + j), .09 + .04 * j, .012, .65 + .5 * (1 + Math.sin(s)), -.35 * Math.sin(s * .1)]);
    }
  }
  for (let i = 0; i * 13 <= length + 8; i++) {
    const s = i * 13;
    for (const side of [-1, 1]) {
      poles.push(pose(s, side * 4.2, .48));
      flags.push(pose(s, side * 4.2 + .15, .83));
    }
  }
  for (let i = 0; i * 18 < length + 50; i++) {
    const s = i * 18 - 15;
    dunes.push(pose(s, 12 + 2 * Math.sin(i), -.15, 3.6 + i % 3, .9, 5));
    if (i % 3 === 1) {
      umbrellaPoles.push(pose(s, 9, 1.3));
      parasols[i % 2].push(pose(s, 9, 2.6));
    }
  }
  instances(new T.SphereGeometry(1, 9, 5), '#cce4db', foam, 'whitecaps');
  instances(new T.CylinderGeometry(.045, .055, .96, 8), '#a58562', poles, 'beach-stakes');
  instances(new T.BoxGeometry(.30, .18, .035), '#e57e5b', flags, 'course-pennants');
  instances(new T.IcosahedronGeometry(1, 1), '#d6bd8e', dunes, 'dunes');
  instances(new T.CylinderGeometry(.065,.075,2.6,8), '#9f8668', umbrellaPoles, 'parasol-poles');
  for (let i = 0; i < 2; i++) instances(new T.ConeGeometry(1.8, .65, 10), ['#d87559','#478b91'][i], parasols[i], 'parasols');
  // The headland stays out at sea as the ribbon follows the shoreline.
  const headland=groupAt(length*.63,-30);
  const island=mesh(new T.IcosahedronGeometry(1,0),'#849b88',0,.2,0,headland);
  island.scale.set(7,2.4,5);
  for(const [base,height,radius,color] of [[1.6,3.6,1.25,'#f4e5c3'],[5.2,1.0,1.12,'#c3654a'],[6.2,1.6,1.05,'#f4e5c3'],[7.8,.85,.93,'#497b86']]){
    mesh(new T.CylinderGeometry(radius*.94,radius,height,10),color,0,base+height/2,0,headland);
  }
  mesh(new T.ConeGeometry(1.28,.85,10),'#b75e45',0,9.06,0,headland);
  for (const s of [45, 164, 296, 435]) {
    const group = groupAt(s, -8);
    group.position.x -= 20 + 7 * Math.sin(s);
    group.rotation.y += .5;
    const hull = mesh(new T.SphereGeometry(1, 12, 8), '#9b6650', 0, .24, 0, group);
    hull.scale.set(.66, .38, 2.2);
    box(.07, 3.7, .07, '#927763', 0, 2, 0, group);
    const triangle = new T.Shape();
    triangle.moveTo(0, 0); triangle.lineTo(1.65, 0); triangle.lineTo(0, 3.1); triangle.closePath();
    const sail = mesh(new T.ShapeGeometry(triangle), '#fbefd6', 0, .70, .08, group);
    sail.rotation.y = Math.PI / 2;
    sail.material.side = T.DoubleSide;
  }
}

export function addDriftwood(group, mesh) {
  function timber(top, bottom, length, x, y, angle, color) {
    const piece = mesh(new T.CylinderGeometry(top, bottom, length, 12), color, x, y, 0, group);
    piece.rotation.z = angle;
    piece.castShadow = true;
    return piece;
  }
  timber(.32, .30, 1.92, 0, .34, Math.PI / 2, '#886246');
  for (const x of [-.963, .963]) timber(.26, .26, .012, x, .34, Math.PI / 2, '#d1ad77');
  timber(.087, .13, .36, .51, .56, -.9, '#8c694d');
}
