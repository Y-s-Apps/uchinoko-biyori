import * as T from 'three';
import {dressPark,parkLog} from './park-art.js';
import {parkBiscuitGeometry} from './park-biscuit.js';
import {addTunnel,addParkTunnel} from './tunnel.js';
import {routePoint as parkPoint} from './race-route.js';
import {addForestScenery,addForestLog} from './forest-scene.js';
import {addBeachScenery,addDriftwood} from './beach-scene.js';
import {RACE} from './race-sim.js';
const mat=color=>new T.MeshStandardMaterial({color,roughness:1});

// One continuous ribbon keeps every lane connected through the 90-degree bends.
export function roadRibbon(lateral,width,y,from=-15,to=510,point=parkPoint){
 const vertices=[],indices=[],steps=Math.ceil(to-from);
 for(let i=0;i<=steps;i++){
  const s=from+(to-from)*i/steps;
  for(const side of [-1,1]){const p=point(s,lateral+side*width/2);vertices.push(p.x,y,p.z)}
  if(i<steps){const j=i*2;indices.push(j,j+1,j+2,j+1,j+3,j+2)}
 }
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(vertices,3));g.setIndex(indices);g.computeVertexNormals();return g;
}
export function makeRaceTrack(layout){
 const root=new T.Group();root.name=(layout.theme||'park')+'-race-track';const routePoint=layout.point||parkPoint,length=layout.length||RACE.length,end=length+30,field=layout.theme==='field';
 function mesh(geo,color,x=0,y=0,z=0,parent=root){const m=new T.Mesh(geo,mat(color));m.position.set(x,y,z);m.receiveShadow=true;parent.add(m);return m}
 function box(w,h,d,c,x,y,z,parent=root){return mesh(new T.BoxGeometry(w,h,d),c,x,y,z,parent)}
 function groupAt(s,lateral=0){const p=routePoint(s,lateral),g=new T.Group();g.position.set(p.x,0,p.z);g.rotation.y=-p.heading;root.add(g);return g}
 function pose(s,lateral,y,sx=1,sy=1,sz=1){const p=routePoint(s,lateral);return [p.x,y,p.z,sx,sy,sz,-p.heading]}
 function instances(geo,color,poses,name){const m=new T.InstancedMesh(geo,mat(color),poses.length),dummy=new T.Object3D();m.name=name;for(let i=0;i<poses.length;i++){const p=poses[i];dummy.position.set(p[0],p[1],p[2]);dummy.scale.set(p[3]??1,p[4]??1,p[5]??1);dummy.rotation.set(0,p[6]??0,0);dummy.updateMatrix();m.setMatrixAt(i,dummy.matrix)}m.receiveShadow=true;root.add(m);return m}
 if(layout.theme==='beach'){
  addBeachScenery(layout,{mesh,box,pose,instances,groupAt,ribbon:roadRibbon});
 }else if(layout.theme==='forest'){
  addForestScenery(layout,{mesh,box,pose,instances,ribbon:roadRibbon});
 }else if(layout.theme==='park'){
  dressPark({root,routePoint,end,ribbon:roadRibbon,mesh,box,groupAt,instances,pose});
 }else{
  box(800,.12,800,'#9fb681',50,-.12,-200);
  mesh(roadRibbon(0,7.6,.015,-15,end,routePoint),field?'#b4c49a':'#cfbc95').name='continuous-road';
  for(const x of [-3.7,3.7])mesh(roadRibbon(x,.08,.025,-15,end,routePoint),'#e6d7b6');
  const lines=[];for(let s=-12;s<end;s+=5)for(const x of [-1,1])lines.push(pose(s,x,.025));
  instances(new T.BoxGeometry(.035,.015,1.5),'#e3d5b5',lines,'lane-markings');
  const trunks=[],crowns=[],caps=[],posts=[],rails=[];
  for(let s=-12;s<end;s+=4)for(const side of [-1,1])posts.push(pose(s,side*4.4,.6));
  for(let s=-12;s<end;s+=2)for(const side of [-1,1]){
   const a=routePoint(s,side*4.4),b=routePoint(s+2,side*4.4);
   rails.push([(a.x+b.x)/2,.75,(a.z+b.z)/2,1,1,Math.hypot(b.x-a.x,b.z-a.z)+.04,-Math.atan2(b.x-a.x,a.z-b.z)]);
  }
  for(let s=-10;s<end;s+=11)for(const side of [-1,1]){
   const lateral=side*(7+(Math.abs(s)%4)*.6);
   trunks.push(pose(s,lateral,1));crowns.push(pose(s,lateral,2.5,1.3,1.5,1.3));caps.push(pose(s+.4,lateral+.45,3.2,1,1.2,1));
  }
  instances(new T.CylinderGeometry(.13,.17,2,7),'#8e7c54',trunks,'tree-trunks');
  instances(new T.SphereGeometry(1,10,7),'#79985f',crowns,'tree-crowns');
  instances(new T.SphereGeometry(1,10,7),'#8caa6a',caps,'tree-caps');
  instances(new T.BoxGeometry(.10,1.2,.10),'#d7c6a2',posts,'fence-posts');
  instances(new T.BoxGeometry(.07,.12,1),'#d7c6a2',rails,'fence-rails');
 }
 for(const t of layout.turns){
  for(const lead of [23,6]){
   const side=t.direction==='right'?-1:1,g=groupAt(t.start-lead,side*4.7);g.name='turn-sign';g.userData.turnId=t.id;
   box(.12,2.2,.12,'#778566',0,1.1,0,g);box(2.5,1.2,.12,'#315b49',0,2.2,0,g);
   const shape=new T.Shape();[[-.8,.14],[.12,.14],[.12,.43],[.8,0],[.12,-.43],[.12,-.14],[-.8,-.14]].forEach(([x,y],i)=>i?shape.lineTo(x,y):shape.moveTo(x,y));shape.closePath();
   const arrow=mesh(new T.ShapeGeometry(shape),'#f5df9f',0,2.2,.071,g);arrow.material.side=T.DoubleSide;if(t.direction==='left')arrow.scale.x=-1;
  }
 }
 for(const o of layout.obstacles){
  const g=groupAt(o.s,o.lane*RACE.lanewidth);g.name='race-obstacle';g.userData.obstacleId=o.id;
  if(o.type==='log'){
   if(layout.theme==='forest')addForestLog(g,mesh);else addDriftwood(g,mesh);
  }else if(o.type==='hurdle'&&layout.theme==='park'&&o.id%4===0){
   parkLog(g,mesh);
  }else if(o.type==='hurdle'){
   for(const x of [-.8,.8]){box(.10,1.1,.12,'#72929b',x,.55,0,g);box(.42,.08,.6,'#72929b',x,.04,0,g)}
   for(let j=0;j<8;j++)box(.20,.11,.10,j%2?'#c78465':'#f6edda',-.70+j*.20,.74,0,g);
  }else if(o.type==='hoop'){
   mesh(new T.TorusGeometry(1.2,.09,10,40),'#d6b35a',0,1.7,0,g);
   for(const x of [-1.35,1.35]){box(.1,2.6,.12,'#72929b',x,1.3,0,g);box(.18,.08,.08,'#78909a',x*.945,1.7,0,g);box(.5,.08,.7,'#72929b',x,.04,0,g)}
  }else{
   if(layout.theme==='park')addParkTunnel(g,mesh);
   else {
    addTunnel(g,mesh);
    for(const side of [-1,1])box(.12,.10,6,'#6a97a2',side*1.58,.05,0,g);
   }
  }
 }
 const biscuit=parkBiscuitGeometry().scale(.76,.76,.76);
 const biscuitMaterial=new T.MeshStandardMaterial({vertexColors:true,roughness:.93});
 const treatMesh=new T.InstancedMesh(biscuit,biscuitMaterial,layout.treats.length);treatMesh.name='treat-trail';treatMesh.visible=layout.treats.length>0;root.add(treatMesh);
 function resetTreats(){const dummy=new T.Object3D();for(const t of layout.treats){const p=routePoint(t.s,t.lane*RACE.lanewidth);dummy.position.set(p.x,t.y,p.z);dummy.rotation.set(0,-p.heading,0);dummy.updateMatrix();treatMesh.setMatrixAt(t.id,dummy.matrix)}treatMesh.instanceMatrix.needsUpdate=true;if(layout.treats.length)treatMesh.computeBoundingSphere()}
 function collectTreat(id){treatMesh.setMatrixAt(id,new T.Matrix4().makeScale(0,0,0));treatMesh.instanceMatrix.needsUpdate=true}
 resetTreats();
 const finish=groupAt(length);finish.name='finish-gate';
 for(const x of [-3.6,3.6])box(.18,4,.18,'#607e6c',x,2,0,finish);
 for(let j=0;j<16;j++)for(let row=0;row<2;row++)box(.45,.35,.06,(j+row)%2?'#f6efda':'#486f59',-3.375+j*.45,3.3+row*.35,0,finish);
 const tiles=[];for(let j=0;j<16;j++)for(let k=0;k<2;k++)if((j+k)%2===0)tiles.push(pose(length-k*.5,-3.75+j*.5,.03));
 instances(new T.BoxGeometry(.5,.012,.5),'#f6f0dc',tiles,'finish-tiles');
 return {root,treatMesh,resetTreats,collectTreat};
}
