// A compact arena circuit: sweep around the lawn, then finish through its centre.
const radius=10,arc=Math.PI*radius/2;
const instructions=[{straight:48},{turn:1},{straight:34},{turn:1},{straight:44},{turn:1},{straight:24},{turn:1},{straight:30}];
let x=-24,z=24,heading=0,distance=0;
export const FIELD_SEGMENTS=instructions.map(part=>{
 const length=part.straight??arc,segment={start:distance,end:distance+length,x,z,heading,radius,turn:part.turn||0};
 if(part.turn){const next=heading+part.turn*Math.PI/2;x+=radius/part.turn*(Math.cos(heading)-Math.cos(next));z+=radius/part.turn*(Math.sin(heading)-Math.sin(next));heading=next}
 else{x+=Math.sin(heading)*length;z-=Math.cos(heading)*length}
 distance+=length;return segment;
});
export const FIELD_LENGTH=distance;
export const FIELD_BOUNDS={minX:-38,maxX:44,minZ:-48,maxZ:44};
export function fieldPoint(s,lateral=0){
 const seg=FIELD_SEGMENTS.find(part=>s<=part.end)||FIELD_SEGMENTS.at(-1),d=s-seg.start;
 let {x,z,heading}=seg;
 if(seg.turn){const next=heading+seg.turn*d/seg.radius;x+=seg.radius/seg.turn*(Math.cos(heading)-Math.cos(next));z+=seg.radius/seg.turn*(Math.sin(heading)-Math.sin(next));heading=next}
 else{x+=Math.sin(heading)*d;z-=Math.cos(heading)*d}
 return {x:x+Math.cos(heading)*lateral,z:z+Math.sin(heading)*lateral,heading};
}
