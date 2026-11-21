// Distance along the centre line is shared by physics, scenery and the camera.
export const TURN_NOTICE = 32;
export const TURN_WINDOW = 20;
export const PARK_TURNS = [
 {id:0,start:90,direction:'right'},
 {id:1,start:185,direction:'left'},
 {id:2,start:280,direction:'left'},
 {id:3,start:385,direction:'right'}
].map(t=>({...t,radius:10,length:Math.PI*5,end:t.start+Math.PI*5}));

export function routePoint(distance,lateral=0){return pointOnRoute(PARK_TURNS,distance,lateral)}
export function pointOnRoute(turns,distance,lateral=0){
 let x=0,z=0,heading=0,at=0;
 for(const t of turns){
  const straight=Math.min(distance,t.start)-at;
  x+=Math.sin(heading)*straight;z-=Math.cos(heading)*straight;
  if(distance<=t.start)return offset(x,z,heading,lateral);
  const length=Math.min(distance-t.start,t.length),sign=t.direction==='right'?1:-1;
  const next=heading+sign*length/t.radius;
  x+=t.radius/sign*(Math.cos(heading)-Math.cos(next));
  z+=t.radius/sign*(Math.sin(heading)-Math.sin(next));
  heading=next;at=t.end;
  if(distance<=t.end)return offset(x,z,heading,lateral);
 }
 x+=Math.sin(heading)*(distance-at);z-=Math.cos(heading)*(distance-at);
 return offset(x,z,heading,lateral);
}
function offset(x,z,heading,lateral){return {x:x+Math.cos(heading)*lateral,z:z+Math.sin(heading)*lateral,heading};}
export const cornerAt = (s,lead=0,tail=0,turns=PARK_TURNS)=>turns.find(t=>s>=t.start-lead&&s<=t.end+tail);
