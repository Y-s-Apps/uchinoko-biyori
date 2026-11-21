import * as T from 'three';

function randomSequence(seed) {
  return () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 4294967296);
}

// The park shares the simulation's centre line. Dressing stays beyond the running surface.
export function dressPark({root, routePoint, end, ribbon, mesh, box, groupAt, instances, pose}) {
  const random=randomSequence(1071);
  box(1300,.15,1300,'#9bc95f',0,-.12,-180);
  mesh(ribbon(0,7.65,.015,-15,end,routePoint),'#edc285').name='continuous-road';
  const flecks=[],grass=[],flowers=[],flowerHearts=[],shrubs=[],deep=[],trunks=[],limbs=[],canopy=[],tops=[],posts=[],rails=[];
  const bankColors=['#bedc77','#a4cc65','#c4df81','#99c461'];
  const verts=[],colors=[];
  // Broad, irregular polygons at the trail edge instead of painted lane lines.
  for(const side of [-1,1]){
    let previous;
    for(let s=-15;s<=end+3;s+=2.8) {
      const width=3.77+random()*.28,outer=5.6+random()*1.2;
      const row=[routePoint(s,width*side),routePoint(s,outer*side)];
      if(previous){
        const color=new T.Color(bankColors[Math.floor(random()*bankColors.length)]);
        for(const v of [previous[0],previous[1],row[0],previous[1],row[1],row[0]]){
          verts.push(v.x,.024,v.z);color.toArray(colors,colors.length);
        }
      }
      previous=row;
    }
  }
  const banks=new T.BufferGeometry();banks.setAttribute('position',new T.Float32BufferAttribute(verts,3));
  banks.setAttribute('color',new T.Float32BufferAttribute(colors,3));
  const verge=new T.Mesh(banks,new T.MeshBasicMaterial({vertexColors:true,side:T.DoubleSide}));root.add(verge);
  for(let s=-10;s<end;s+=1.3){
    const side=random()<.5?-1:1;
    flecks.push(pose(s,side*(2.44+random()*1.24),.027,.08+random()*.24,.009,.06+random()*.18));
    const lateral=side*(4.1+random()*2.05);
    const g=pose(s,lateral,.13,.10,.26+random()*.22,.15);grass.push(g);
    if(random()>.28)continue;
    for (let j=0;j<3;j++){
      const p=pose(s+random()*.6,lateral+random()*.4,.19+random()*.13,.12,.055,.12);
      flowerHearts.push([p[0],p[1]+.033,p[2],.057,.038,.057]);
      for(let petal=0;petal<5;petal++){const a=petal*2*Math.PI/5;flowers.push([p[0]+Math.cos(a)*.069,p[1],p[2]+Math.sin(a)*.069,.07,.032,.07])}
    }
  }
  instances(new T.DodecahedronGeometry(1,0),'#d8ab76',flecks,'path-grit');
  instances(new T.ConeGeometry(1,1,3),'#75a34c',grass,'grass-tips');
  const bloom=new T.IcosahedronGeometry(1,0);
  instances(bloom,'#fff4d8',flowers,'daisies');instances(bloom,'#efaf31',flowerHearts,'daisy-centres');
  for(const side of [-1,1]){
    // Split rails into short runs with open views between groups of trees.
    for(let s=-11;s<end;s+=3.1){
      if((Math.floor((s+12)/21)+(side+1))%4===2)continue;
      const a=routePoint(s,side*5.72),b=routePoint(s+3.1,side*5.72);
      posts.push(pose(s,side*5.72,.56));
      for(const y of [.46,.89])rails.push([(a.x+b.x)/2,y,(a.z+b.z)/2,1,1,Math.hypot(b.x-a.x,b.z-a.z)+.08,-Math.atan2(b.x-a.x,a.z-b.z)]);
    }
    for(let s=-12+(side+1)*2.9;s<end;s+=9+random()*6) {
      const offset=side*(6.8+random()*3.6),h=2.45+random()*1.35;
      trunks.push(pose(s,offset,h*.48,1,h,1));
      const p=pose(s,offset,h*.89,1,.95,1);limbs.push(p);
      const turn=random()*6,spread=1.65+random()*.91;
      canopy.push([...pose(s,offset,h+.56,spread,1.66+random(),spread*.91).slice(0,6),turn]);
      tops.push([...pose(s+.42,offset-side*.71,h+1.58,spread*.76,1.24+random()*.5,spread*.7).slice(0,6),turn+.71]);
    }
    for(let s=-9;s<end;s+=5+random()*7) {
      const d=6.2+random()*4,scale=.7+random()*.8;
      shrubs.push(pose(s,side*d,scale*.55,scale*1.13,scale,scale*.91));
      deep.push(pose(s+1,side*(d+.65),scale*.44,scale*1.12,scale*.74,scale));
    }
  }
  const faceted = new T.IcosahedronGeometry(1,1);
  function foliage(geom,color,poses,name) {
    const batch=instances(geom,color,poses,name);
    batch.material.flatShading=true;
    for(let i=0;i<poses.length;i++){
      const tone=.80+random()*.20;batch.setColorAt(i,new T.Color().setRGB(tone,Math.min(1,tone+.03),tone*.94));
    }
    return batch;
  }
  foliage(faceted,'#70ae51',canopy,'tree-crowns');foliage(faceted,'#a3ca59',tops,'sunlit-canopies');
  foliage(new T.DodecahedronGeometry(1,0),'#81af4a',shrubs,'shrubs');foliage(faceted,'#589b55',deep,'hedges');
  instances(new T.CylinderGeometry(.22,.34,1,7),'#966745',trunks,'tree-trunks');
  const branch=new T.CylinderGeometry(.10,.18,1.45,6);branch.rotateZ(.53);branch.translate(-.29,0,0);
  instances(branch,'#a5744d',limbs,'tree-branches');
  instances(new T.CylinderGeometry(.099,.111,1.17,5),'#aa7450',posts,'fence-posts');
  instances(new T.BoxGeometry(.085,.13,1),'#bc895d',rails,'fence-rails');
  const treeShadows=trunks.map(p=>[p[0]+.75,.007,p[2]-.37,2.43,1,1.44,p[6]]);
  const shadowPatch=new T.CircleGeometry(1,9);shadowPatch.rotateX(-Math.PI/2);
  instances(shadowPatch,'#8db55f',treeShadows,'tree-shadows');
  const hills=[], clouds=[];
  for(let s=-30;s<end+60;s+=25)for(const side of [-1,1]){
    const d=44+random()*26;
    hills.push(pose(s,side*d,-2,11+random()*13,5+random()*8,15+random()*13));
    if(random()<.5){
      const lateral=side*(13+random()*23),h=12+random()*8;
      for(const [dx,dy,z,w,t] of [[-2,0,-.1,2.1,.82],[0,.67,0,2.35,1.45],[2.1,.12,.3,1.8,.96]]){
        clouds.push(pose(s+z,lateral+dx,h+dy,w,t,1.85));
      }
    }
  }
  // A hill beside one straight can cross another after the course folds back.
  // Its full footprint must clear every stretch, including the chase camera on bends.
  const centreLine=[];
  for(let s=-20;s<=end+5;s+=2)centreLine.push(routePoint(s,0));
  const distantHills=hills.filter(([x,,z,rx,,rz])=>{
    const clearance=Math.max(rx,rz)+16;
    return centreLine.every(p=>(p.x-x)**2+(p.z-z)**2>clearance**2);
  });
  foliage(new T.IcosahedronGeometry(1,0),'#83b69b',distantHills,'far-hills');
  instances(new T.IcosahedronGeometry(1,1),'#fff8df',clouds,'clouds');
  for(const s of [45,162,322]){
    const pavilion=groupAt(s,-11);pavilion.name='park-pavilion';
    mesh(new T.CylinderGeometry(2.3,2.46,.27,8),'#d5b68a',0,.13,0,pavilion);
    for(let j=0;j<8;j++){
      const a=Math.PI*j/4;
      mesh(new T.CylinderGeometry(.083,.10,2.65,6),'#f4e4be',Math.cos(a)*1.9,1.56,Math.sin(a)*1.9,pavilion);
    }
    mesh(new T.ConeGeometry(2.9,1.55,8),'#cf6c50',0,3.65,0,pavilion);
    mesh(new T.CylinderGeometry(2.9,2.81,.15,8),'#8f5542',0,2.88,0,pavilion);
    mesh(new T.SphereGeometry(.16,8,6),'#f3be66',0,4.48,0,pavilion);
  }
}

export function parkLog(group,mesh) {
  const bark=mesh(new T.CylinderGeometry(.365,.345,1.76,11),'#925d38',0,.39,0,group);
  bark.castShadow=true;bark.rotation.z=Math.PI/2;bark.rotation.y=.09;
  for(const side of [-1,1]){
    const x=side*.88,z=-side*.079;
    const end=mesh(new T.CylinderGeometry(.303,.303,.02,11),'#e2ab70',x,.39,z,group);end.rotation.copy(bark.rotation);
    const ring=mesh(new T.TorusGeometry(.195,.014,4,12),'#b57a46',x+side*.017,.39,z,group);ring.rotation.y=Math.PI/2+.09;
  }
  for(const x of [-.51,.32]){
    const seam=mesh(new T.CylinderGeometry(.027,.033,.42,6),'#b7814e',x,.50,.32-x*.09,group);
    seam.rotation.z=Math.PI/2-.08;seam.rotation.y=.09;
  }
  const knot=mesh(new T.CylinderGeometry(.089,.125,.22,7),'#99643c',-.41,.67,-.06,group);knot.rotation.z=.54;
  mesh(new T.DodecahedronGeometry(1,0),'#8ca54b',.42,.699,-.04,group).scale.set(.25,.078,.139);
}
