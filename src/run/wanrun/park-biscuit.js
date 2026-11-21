import * as T from 'three';

// The same paw stamp appears on the baked face and in the compact HUD.
const pad=[[0,-.15,.30,.216],[-.35,.15,.106,.16],[-.13,.35,.115,.166],[.14,.35,.115,.166],[.35,.15,.106,.16]];
// Short, broad waist and notched ends form one continuous, baked bone.
const bone=new T.Shape();
bone.moveTo(-.92,0);
bone.bezierCurveTo(-1.24,-.33,-1.05,-.64,-.76,-.58);
bone.bezierCurveTo(-.53,-.55,-.56,-.34,-.31,-.315);
bone.bezierCurveTo(-.09,-.29,.11,-.30,.32,-.32);
bone.bezierCurveTo(.55,-.34,.55,-.56,.77,-.585);
bone.bezierCurveTo(1.08,-.635,1.23,-.29,.92,0);
bone.bezierCurveTo(1.20,.31,1.06,.61,.78,.57);
bone.bezierCurveTo(.53,.55,.56,.33,.31,.315);
bone.bezierCurveTo(.10,.295,-.11,.295,-.31,.315);
bone.bezierCurveTo(-.57,.33,-.54,.565,-.78,.58);
bone.bezierCurveTo(-1.08,.615,-1.21,.29,-.92,0);
const outline=bone.getPoints(6);
if(outline.at(-1).equals(outline[0]))outline.pop();
const stamps=pad.map(([x,y,rx,ry])=>Array.from({length:16},(_,i)=>{
  const a=-i*Math.PI/8;
  return new T.Vector2((x+rx*Math.cos(a))*.56,(y+ry*Math.sin(a))*.56);
}));
const svgPath=loop=>loop.map(({x,y},i)=>(i?'L':'M')+x.toFixed(3)+' '+(-y).toFixed(3)).join(' ')+'Z';
export const biscuitIcon='<svg viewBox="-1.19 -.71 2.38 1.42" aria-hidden="true"><path d="'+svgPath(outline)+'" fill="#efc384" stroke="#99633d" stroke-width=".11"/><path d="'+stamps.map(svgPath).join('')+'" fill="#91572f"/></svg>';

export function parkBiscuitGeometry(){
  const positions=[],colors=[],indices=[];
  const addLoop=(loop,depth,color,scale=1,center=new T.Vector2())=>{
    const start=positions.length/3,tint=new T.Color(color);
    for(const v of loop){
      positions.push((center.x+(v.x-center.x)*scale)*.327,(center.y+(v.y-center.y)*scale)*.327,depth);
      colors.push(tint.r,tint.g,tint.b);
    }
    return start;
  };
  function stitch(lower,upper,count){
    for(let i=0;i<count;i++){
      const j=(i+1)%count;
      indices.push(lower+i,lower+j,upper+j,lower+i,upper+j,upper+i);
    }
  }
  const back=addLoop(outline,-.052,'#b97a42',.94);
  const crust=addLoop(outline,-.034,'#c78749');
  const edge=addLoop(outline,.031,'#d89a54');
  const top=addLoop(outline,.053,'#f1c080',.95);
  stitch(back,crust,outline.length);stitch(crust,edge,outline.length);stitch(edge,top,outline.length);
  for(const face of T.ShapeUtils.triangulateShape(outline,[]))indices.push(...face.reverse().map(i=>i+back));
  // Triangulate the top around five actual shallow impressions.
  const outerFace=outline.map(v=>v.clone().multiplyScalar(.95));
  for(const stamp of stamps)addLoop(stamp,.053,'#d5a16a');
  for(const face of T.ShapeUtils.triangulateShape(outerFace,stamps))indices.push(...face.map(i=>i+top));
  let lip=top+outline.length;
  stamps.forEach((stamp,i)=>{
    const center=new T.Vector2(pad[i][0],pad[i][1]).multiplyScalar(.56);
    const bottom=addLoop(stamp,.038,'#956537',.80,center);
    stitch(bottom,lip,stamp.length);
    for(const tri of T.ShapeUtils.triangulateShape(stamp,[]))indices.push(...tri.map(j=>bottom+j));
    lip+=stamp.length;
  });
  const geo=new T.BufferGeometry();
  geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));
  geo.setAttribute('color',new T.Float32BufferAttribute(colors,3));
  geo.setIndex(indices);geo.computeVertexNormals();
  geo.rotateZ(.22);geo.rotateX(-.38);
  return geo;
}
