import * as T from 'three';
import {addTunnel} from './tunnel.js';
import {A_FRAME,addAFrame} from './a-frame.js';
import {SEESAW} from './seesaw.js';
import {SLALOM,slalomPoleS,slalomSide} from './slalom.js';
// The arena has one perimeter, no road surface, lane lines, pickups or trackside rails.
export function makeAgilityField(layout){
 const root=new T.Group();root.name='agility-arena';const b=layout.bounds,point=layout.point;
 const fields={
  'first-field':{lawn:'#a5c27a',leaves:'#85ab59',roof:'#d67d55',hill:'#b1cfaa',tree:'round'},
  zigzag:{lawn:'#9cc39a',leaves:'#528d78',roof:'#478c92',hill:'#98c5bb',tree:'pine'},
  balance:{lawn:'#bec682',leaves:'#96a451',roof:'#c79748',hill:'#becc9d',tree:'round'},
  'hill-field':{lawn:'#99be80',leaves:'#679b71',roof:'#537d9e',hill:'#9dbcb3',tree:'pine'}
 };
 const field=fields[layout.courseId]??fields['first-field'];
 const mats=new Map(),material=c=>{if(!mats.has(c))mats.set(c,new T.MeshStandardMaterial({color:c,roughness:1}));return mats.get(c)};
 function mesh(geo,c,x=0,y=0,z=0,parent=root){const m=new T.Mesh(geo,material(c));m.position.set(x,y,z);m.receiveShadow=true;parent.add(m);return m}
 const box=(w,h,d,c,x,y,z,parent=root)=>mesh(new T.BoxGeometry(w,h,d),c,x,y,z,parent);
 const cylinder=(r,h,c,x,y,z,parent=root)=>mesh(new T.CylinderGeometry(r,r,h,9),c,x,y,z,parent);
 let seed=741;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
 function instances(name,geometry,color,poses){const m=new T.InstancedMesh(geometry,material(color),poses.length),dummy=new T.Object3D();m.name=name;for(let i=0;i<poses.length;i++){const p=poses[i];dummy.position.set(p.x,p.y,p.z);dummy.scale.set(p.sx??1,p.sy??1,p.sz??1);dummy.rotation.set(0,p.angle??0,0);dummy.updateMatrix();m.setMatrixAt(i,dummy.matrix)}m.receiveShadow=true;root.add(m);return m}
 const grass=new T.PlaneGeometry(400,400,90,90);grass.rotateX(-Math.PI/2);const colors=[],base=new T.Color();
 for(let i=0;i<grass.attributes.position.count;i++){const x=grass.attributes.position.getX(i),z=grass.attributes.position.getZ(i),v=.011*Math.sin(z*.29)+.008*Math.cos(x*.12);base.set(field.lawn).offsetHSL(0,0,v);colors.push(base.r,base.g,base.b)}
 grass.setAttribute('color',new T.Float32BufferAttribute(colors,3));const lawn=new T.Mesh(grass,new T.MeshStandardMaterial({vertexColors:true,roughness:1}));lawn.name='open-lawn';lawn.position.y=-.035;lawn.receiveShadow=true;root.add(lawn);
 const blade=new T.BufferGeometry();blade.setAttribute('position',new T.Float32BufferAttribute([-.07,0,0,.07,0,0,.025,.20,0,0,0,-.07,0,0,.07,-.02,.17,.02],3));blade.computeVertexNormals();
 const tufts=[];for(let i=0;i<2300;i++){const scale=.4+random()*.7;tufts.push({x:b.minX+random()*(b.maxX-b.minX),y:-.015,z:b.minZ+random()*(b.maxZ-b.minZ),sx:scale,sy:scale,sz:scale,angle:random()*Math.PI})}
 const blades=instances('grass-tufts',blade,'#91ad72',tufts);blades.material.side=T.DoubleSide;
 const posts=[],rails=[];
 const corners=[[b.minX,b.minZ],[b.maxX,b.minZ],[b.maxX,b.maxZ],[b.minX,b.maxZ]];
 for(let k=0;k<4;k++){const a=corners[k],c=corners[(k+1)%4],length=Math.hypot(c[0]-a[0],c[1]-a[1]),n=Math.ceil(length/4),angle=-Math.atan2(c[0]-a[0],a[1]-c[1]);for(let i=0;i<n;i++){
  const t=i/n,x=a[0]+(c[0]-a[0])*t,z=a[1]+(c[1]-a[1])*t;posts.push({x,y:.85,z});
  for(const y of [.65,1.25])rails.push({x:x+(c[0]-a[0])/n/2,y,z:z+(c[1]-a[1])/n/2,sz:length/n,angle});
 }}
 instances('perimeter-posts',new T.BoxGeometry(.2,1.7,.2),'#d4c4a2',posts);instances('perimeter-rails',new T.BoxGeometry(.13,.16,1),'#e5d7b8',rails);
 const trunks=[],crowns=[];
 for(let i=0;i<30;i++){const side=i%4,t=(Math.floor(i/4)+.5)/8;let x,z;if(side<2){x=side?b.maxX+7:b.minX-7;z=b.minZ+t*(b.maxZ-b.minZ)}else{x=b.minX+t*(b.maxX-b.minX);z=side===2?b.minZ-7:b.maxZ+7}trunks.push({x,y:2.2,z});crowns.push({x,y:5.2,z,sx:2.1,sy:2.5,sz:2.1});crowns.push({x:x+.8,y:6.8,z:z-.3,sx:1.7,sy:1.8,sz:1.7})}
 instances('arena-trees',new T.CylinderGeometry(.22,.3,4.4,8),'#8c7c57',trunks);const crown=field.tree==='pine'?new T.ConeGeometry(1,2.35,7):new T.IcosahedronGeometry(1,1);
 const canopy=instances('arena-canopies',crown,field.leaves,crowns);canopy.material.flatShading=true;
 // Nearby hills and a small pavilion anchor the field without narrowing it to a corridor.
 for(let i=0;i<7;i++){const a=i*Math.PI*2/7,h=mesh(new T.IcosahedronGeometry(1,1),field.hill,Math.cos(a)*135,0,Math.sin(a)*135);h.scale.set(44,(layout.courseId==='hill-field'?20:10)+i%3*3,36);h.material.flatShading=true}
 const pavilion=new T.Group();pavilion.position.set(b.maxX+9,0,10);root.add(pavilion);for(const x of [-2.7,2.7])for(const z of [-2.7,2.7])box(.22,3.4,.22,'#a2926e',x,1.7,z,pavilion);const roof=mesh(new T.ConeGeometry(4.5,1.5,4),field.roof,0,4.1,0,pavilion);roof.rotation.y=Math.PI/4;
 for(const side of [-1,1]){box(6.3,.24,.12,'#fff0cf',0,3.27,side*3.07,pavilion);box(.12,.24,6.3,'#fff0cf',side*3.07,3.27,0,pavilion)}
 const groups=new Map(),badges=new Map(),planks=new Map(),poles=new Map();
 for(const o of layout.obstacles){const p=point(o.s,o.lane*2),g=new T.Group();g.name='race-obstacle';g.userData.obstacleId=o.id;g.position.set(p.x,0,p.z);g.rotation.y=-p.heading;root.add(g);groups.set(o.id,g);
  if(o.type==='hurdle'){
   for(const x of [-.8,.8]){box(.12,1.1,.14,'#5c8eab',x,.55,0,g);box(.45,.08,.65,'#5c8eab',x,.04,0,g)}
   for(let j=0;j<8;j++)box(.2,.11,.10,j%2?'#c87961':'#fff1d5',-.7+j*.2,.74,0,g);
  }else if(o.type==='hoop'){
   mesh(new T.TorusGeometry(1.2,.09,10,40),'#e0b34f',0,1.7,0,g);for(const x of [-1.35,1.35]){box(.1,2.6,.12,'#5c8eab',x,1.3,0,g);box(.18,.08,.08,'#78909a',x*.945,1.7,0,g);box(.5,.08,.7,'#5c8eab',x,.04,0,g)}
  }else if(o.type==='a-frame'){
   addAFrame(g,box);
  }else if(o.type==='slalom'){
   const bands=[];poles.set(o.id,bands);
   for(let i=0;i<SLALOM.count;i++){
    const pole=new T.Group();pole.name='slalom-pole';pole.userData={obstacleId:o.id,poleIndex:i};pole.position.z=o.s-slalomPoleS(o,i);g.add(pole);
    cylinder(.075,1.9,'#f5eed8',0,.95,0,pole);const band=cylinder(.079,.55,'#548cba',0,1.35,0,pole);band.material=band.material.clone();bands.push(band);
    cylinder(.08,.30,'#548cba',0,.35,0,pole);box(.38,.045,.38,'#c9c4a7',0,.025,0,pole);
   }
  }else if(o.type==='seesaw'){
   const plank=new T.Group();plank.name='rigid-plank';plank.userData.obstacleId=o.id;plank.position.y=SEESAW.pivotHeight;plank.rotation.x=SEESAW.angle;g.add(plank);planks.set(o.id,plank);
   box(SEESAW.width,SEESAW.thickness,5.2,'#548cba',0,0,0,plank);for(const z of [-3.3,3.3])box(SEESAW.width,SEESAW.thickness,1.4,'#edcb62',0,0,z,plank);
   // Solid A-frame side supports with one axle across the board's width.
   for(const x of [-.72,.72]){for(const sign of [-1,1]){const leg=box(.12,1.05,.12,'#748889',x,.47,sign*.23,g);leg.rotation.x=sign*-.46}box(.18,.08,1.15,'#748889',x,.04,0,g)}
   const axle=cylinder(.052,1.7,'#a6b2ad',0,SEESAW.pivotHeight,0,g);axle.name='seesaw-axle';axle.rotation.z=Math.PI/2;
  }else{
   addTunnel(g,mesh);
   box(.12,.10,6,'#548cba',-1.58,.05,0,g);box(.12,.10,6,'#548cba',1.58,.05,0,g);
  }
  // Numbered freestanding boards mark the order, not a lane or collectible.
  cylinder(.045,.9,'#ad9f7d',2.7,.45,1.0,g);const badge=box(.68,.8,.10,'#f5eed8',2.7,1.12,1.0,g);badge.material=badge.material.clone();badges.set(o.id,badge);
  const digits=['bc','abged','abgcd','fgbc','afgcd','afgecd'],segments={a:[0,.27,.28,.045],g:[0,0,.28,.045],d:[0,-.27,.28,.045],f:[-.15,.14,.045,.22],b:[.15,.14,.045,.22],e:[-.15,-.14,.045,.22],c:[.15,-.14,.045,.22]};
  for(const part of digits[o.id]){const [x,y,w,h]=segments[part];box(w,h,.015,'#48684f',2.7+x,1.12+y,1.06,g)}
 }
 const target=new T.Group();target.name='next-obstacle-marker';root.add(target);
 const ring=mesh(new T.RingGeometry(1.8,1.95,48),'#e9cf76',0,.015,0,target);ring.rotation.x=-Math.PI/2;ring.material=ring.material.clone();ring.material.transparent=true;ring.material.opacity=.65;
 const finish=new T.Group(),end=point(layout.length);finish.name='finish-gate';finish.position.set(end.x,0,end.z);finish.rotation.y=-end.heading;root.add(finish);
 const start=point(0);
 for(const [parent,color] of [[finish,'#e8c86b']])for(const x of [-2.8,2.8]){cylinder(.055,1.8,'#f5eed8',x,.9,0,parent);box(.65,.43,.035,color,x+.3,1.5,0,parent);box(.32,.06,.32,'#c9c4a7',x,.03,0,parent)}
 for(const x of [-2.8,2.8]){cylinder(.055,1.3,'#f5eed8',start.x+x,.65,start.z);box(.55,.35,.035,'#83aabd',start.x+x+.25,1.05,start.z)}
 let lastKey='';
 function update(sim){
  const next=sim.nextObstacle,key=`${next?.id}:${sim.results.size}:${[...sim.slaloms.values()].map(s=>s.index).join(',')}`;if(key===lastKey)return;lastKey=key;target.visible=!!next;target.scale.setScalar(1);
  if(next){const g=groups.get(next.id);target.position.copy(g.position);target.rotation.y=g.rotation.y;if(next.type==='a-frame'){const entry=point(next.s-A_FRAME.run,next.lane*2);target.position.set(entry.x,.012,entry.z);target.scale.setScalar(.56)}if(next.type==='slalom'){const index=sim.slaloms.get(next.id).index;target.visible=index<SLALOM.count;if(target.visible){const p=point(slalomPoleS(next,index),next.lane*2+slalomSide(next,index)*SLALOM.offset);target.position.set(p.x,.012,p.z);target.scale.setScalar(.30)}}}
  for(const o of layout.obstacles)badges.get(o.id).material.color.set(sim.results.has(o.id)?(sim.results.get(o.id)?'#b6d59c':'#d9aa8d'):o.id===next?.id?'#f4d77b':'#f5eed8');
  for(const [id,bands] of poles){const state=sim.slaloms.get(id);bands.forEach((band,i)=>band.material.color.set(i<state.index?(state.passed[i]?'#8eb87c':'#ca8f75'):next?.id===id&&i===state.index?'#e5bd5c':'#548cba'))}
 }
 function animate(sim){for(const [id,plank] of planks)plank.rotation.x=sim.seesaws.get(id).angle}
 function resetTreats(){lastKey='';target.visible=false;target.scale.setScalar(1);for(const badge of badges.values())badge.material.color.set('#f5eed8');for(const plank of planks.values())plank.rotation.x=SEESAW.angle;for(const bands of poles.values())for(const band of bands)band.material.color.set('#548cba')}
 resetTreats();return {root,resetTreats,collectTreat(){},update,animate};
}
