import {parkEntryOffset,parkExitOffset,parkTunnelRadius} from './park-tunnel-profile.js';
import {PARK_TURNS,TURN_NOTICE,TURN_WINDOW,cornerAt} from './race-route.js';
import {buildForestRace} from './forest-layout.js';
import {buildBeachRace,touchesSoftSand} from './beach-layout.js';
export const RACE = {length:480,lanewidth:2,speed:9.6,jumpDuration:.94,jumpHeight:1.55,gaugeMax:20,boostDuration:3,boostSpeed:16.2};
export const lanePosition=(x,target,seconds)=>target+(x-target)*Math.exp(-13*seconds);
export const jumpHeight=elapsed=>elapsed===null||elapsed>=RACE.jumpDuration?0:
 Math.sin(elapsed/RACE.jumpDuration*Math.PI)*RACE.jumpHeight;

function motionXAt(s,motion,time){
 const x=lanePosition(motion.x,motion.target,time),wall=motion.wall;
 // Treats and scoring gates can fall later in the same frame as a wall hit.
 if(wall && s>=wall.fromS && (x-wall.x)*wall.blockedSide>0)return wall.x;
 return x;
}

// Sample the runner at the gate, using the same motion as the full frame.
export function crossingAt(gate,start,end){
 if(gate<=start.s||gate>end)return null;
 const time=start.dt*(gate-start.s)/(end-start.s);
 const jump=start.jump===null?null:start.jump+time;
 return {x:motionXAt(gate,start,time),y:jumpHeight(jump),grounded:jump===null||jump>=RACE.jumpDuration};
}
// At shoulder height the inside of the curved wall is narrower than the rails.
const insideLimit = parkTunnelRadius - .54;
const outsideLimit = parkTunnelRadius + .26;

function parkWallContact(gate,motion,end){
 const entry=gate.s+parkEntryOffset,exit=gate.s+parkExitOffset;
 if(end<entry || motion.s>=exit || end<=motion.s)return null;
 const center=gate.lane*RACE.lanewidth;
 const lateralAt=s=>lanePosition(motion.x,motion.target,motion.dt*(s-motion.s)/(end-motion.s))-center;
 const start=lateralAt(Math.max(motion.s,entry)),finish=lateralAt(Math.min(end,exit));
 for(const side of [-1,1]){
  const from=side*start,to=side*finish;
  if(Math.min(from,to)>=outsideLimit-1e-9 || Math.max(from,to)<=insideLimit+1e-9)continue;
  const inside=from<=insideLimit || (from<outsideLimit && from<parkTunnelRadius);
  const boundary=inside?insideLimit:outsideLimit;
  return {x:center+side*boundary,fromS:Math.max(entry,motion.s),blockedSide:inside?side:-side,lane:inside?gate.lane:Math.max(-1,Math.min(1,gate.lane+side))};
 }
 return null;
}
export function buildParkRace(){
 const obstacles=Array.from({length:15},(_,i)=>({id:i,s:36+i*28,lane:[0,-1,1,0,1,-1,0,1,0,-1,1,0,-1,1,0][i],type:i%4===2?'tunnel':'hurdle'}))
  .filter(o=>!cornerAt(o.s,TURN_WINDOW+6,9));
 const treats=[];
 for(let s=8;s<465;s+=2.2){
  let lane=[0,0,-1,0,1,0][Math.floor((s-8)/17)%6],y=.65;
  if(cornerAt(s,TURN_WINDOW,4))lane=0;
  const nearby=obstacles.find(o=>Math.abs(o.s-s)<4.5);
  if(nearby){lane=nearby.lane;if(nearby.type==='hurdle')y=.65+1.25*Math.sin(Math.PI*(s-nearby.s+4.5)/9)}
  treats.push({id:treats.length,s,lane,y});
 }
 return {theme:'park',length:RACE.length,obstacles,treats,turns:PARK_TURNS};
}
const actor=(id,lane,s,speed)=>({id,lane,x:lane*RACE.lanewidth,s,speed,y:0,jumpElapsed:null,slow:0,brake:0,boost:0,finishTime:null,hits:0,lastHitObstacle:null,phase:0});
export class RaceSimulation{
 constructor(courseId='park'){const createLayout={park:buildParkRace,beach:buildBeachRace,forest:buildForestRace}[courseId]??buildParkRace;this.layout=createLayout();this.reset()}
 reset(){
  this.status='ready';this.previousStatus=null;this.countdown=3;this.time=0;
  this.player=actor('player',0,0,RACE.speed);
  this.cpus=[actor('cpu0',-1,0,9.7),actor('cpu1',1,0,10.0),actor('cpu2',0,-3.3,10.25),actor('cpu3',-1,-4.4,9.9)];
  // Park is introductory. Beach rewards its outer trails; the middle forest
  // rival spends treats earned on the bends, leaving the log arcs to overtake.
  const dashRivals=this.layout.theme==='beach'?this.cpus.slice(0,2):
   this.layout.theme==='forest'?[this.cpus[2],this.cpus[1]]:[];
  for(const rival of dashRivals){rival.nextTreat=0;rival.gauge=0}
  this.gauge=0;this.treatCount=0;this.dashCount=0;this.collected=new Set();this.events=[];this.result=null;
  this.armedTurns=new Set();this.passedTurns=new Set();this.missedTurns=new Set();this.waitingTurn=null;this.wallReach=null;
 }
 start(){if(this.status==='ready')this.status='countdown'}
 pause(){if(['countdown','running'].includes(this.status)){this.previousStatus=this.status;this.status='paused'}}
 resume(){if(this.status==='paused'){this.status=this.previousStatus;this.previousStatus=null}}
 inTunnel(a){
  if(this.layout.theme==='park')return this.layout.obstacles.find(o=>o.type==='tunnel'&&a.s>=o.s+parkEntryOffset&&a.s<o.s+parkExitOffset&&Math.abs(a.x-o.lane*RACE.lanewidth)<=insideLimit);
  return this.layout.obstacles.find(o=>o.type==='tunnel'&&Math.abs(a.s-o.s)<3.4&&Math.abs(a.x-o.lane*RACE.lanewidth)<.8)}
 get turnCue(){
  const t=cornerAt(this.player.s,TURN_NOTICE,0,this.layout.turns);if(!t)return null;
  return {...t,distance:Math.max(0,t.start-this.player.s),active:this.player.s>=t.start-TURN_WINDOW,armed:this.armedTurns.has(t.id),waiting:this.waitingTurn===t.id};
 }
 input(action){
  if(this.status!=='running')return false;const p=this.player;
  if(action==='left'||action==='right'){
   const cue=this.turnCue;
   if(cue?.active){
    if(cue.armed)return false;
    if(action!==cue.direction){this.events.push({type:'turn-wrong',direction:cue.direction});return false}
    this.armedTurns.add(cue.id);this.waitingTurn=null;p.lane=0;
    this.events.push({type:'turn-armed',direction:cue.direction});return true;
   }
  }
  if(this.waitingTurn!==null)return false;
  if(action==='dash'){if(this.gauge<RACE.gaugeMax||p.boost>0)return false;this.gauge=0;p.boost=RACE.boostDuration;this.dashCount++;this.events.push({type:'dash'});return true}
  if(action==='brake'){p.brake=.6;return true}
  const tunnel=this.inTunnel(p);
  if(tunnel && (this.layout.theme!=='park' || action==='jump'))return false;
  if(action==='left'||action==='right'){
   const next=p.lane+(action==='left'?-1:1);
   p.lane=Math.max(-1,Math.min(1,next));
   // Even at the outermost lane there is a wall on both sides of the dog.
   this.wallReach=tunnel && next!==p.lane ? {gate:tunnel,target:next*RACE.lanewidth} : null;
   return true;
  }
  if(action==='jump'&&p.jumpElapsed===null){p.jumpElapsed=0;return true}return false;
 }
 obstacleHit(a,o,reason){
  if(a.lastHitObstacle===o.id)return;
  a.lastHitObstacle=o.id;a.slow=1.15;a.hits++;
  if(a===this.player)this.events.push({type:'hit',reason});
 }
 collectRivalTreats(rival,motion){
  // The trail is sorted. Each rival can pick up each treat once on its own pass.
  const treats=this.layout.treats;
  while(rival.nextTreat<treats.length && treats[rival.nextTreat].s<=rival.s){
   const treat=treats[rival.nextTreat++];
   const pass=crossingAt(treat.s,motion,rival.s);
   if(pass&&Math.abs(pass.x-treat.lane*RACE.lanewidth)<.72 && Math.abs(pass.y+.65-treat.y)<.8){
    rival.gauge=Math.min(RACE.gaugeMax,rival.gauge+1);
   }
  }
  if(rival.gauge===RACE.gaugeMax && rival.boost===0){
   rival.gauge=0;rival.boost=RACE.boostDuration;
  }
 }
 get rank(){if(this.result)return this.result.rank;return 1+this.cpus.filter(a=>a.finishTime!==null||a.s>this.player.s+.02).length}
 step(dt){
  if(!Number.isFinite(dt)||dt<=0||dt>.1)return;
  if(this.status==='countdown'){this.countdown=Math.max(0,this.countdown-dt);if(this.countdown===0){this.status='running';this.events.push({type:'go'})}return}
  if(this.status!=='running')return;
  const timeBefore=this.time;this.time+=dt;
  this.advanceField(dt,timeBefore,this.cpus);
  if(this.player.finishTime!==null){
   const standings=this.finishStandings(this.time);
   this.result={rank:1+standings.findIndex(row=>row.id===this.player.id),standings,time:this.player.finishTime,treats:this.treatCount,dashes:this.dashCount,hits:this.player.hits,turns:this.passedTurns.size,turnMisses:this.missedTurns.size};
   this.time=this.player.finishTime;this.status='finished';this.events.push({type:'finish'});
  }
 }
 finishStandings(time){
  // Finish any remaining rivals with the same race rules. Keep the scene and player clock at the finish line.
  const rivals=this.cpus.map(rival=>({...rival}));
  const dt=1/60;
  while(rivals.some(rival=>rival.finishTime===null)){
   this.advanceField(dt,time,rivals);
   time+=dt;
  }
  return [this.player,...rivals].map(({id,finishTime})=>({id,time:finishTime})).sort((a,b)=>a.time-b.time);
 }
 advanceField(dt,timeBefore,rivals){
  for(let i=0;i<rivals.length;i++){
   const a=rivals[i];if(a.finishTime!==null)continue;
   a.lane=cornerAt(a.s,TURN_WINDOW,0,this.layout.turns)?0:[-1,1,0,-1][i];
   const next=this.layout.obstacles.find(o=>o.s>a.s&&o.s-a.s<4.3&&Math.abs(a.x-o.lane*RACE.lanewidth)<.65);
   if((next?.type==='hurdle'||next?.type==='log')&&a.jumpElapsed===null&&((next.id+i*3)%7!==0))a.jumpElapsed=0;
  }
  for(const a of [this.player,...rivals]){
   if(a.finishTime!==null)continue;const previousS=a.s;
   const reach=a===this.player?this.wallReach:null;
   const motion={s:previousS,x:a.x,target:reach?.target??a.lane*RACE.lanewidth,jump:a.jumpElapsed,dt};
   a.slow=Math.max(0,a.slow-dt);a.brake=Math.max(0,a.brake-dt);a.boost=Math.max(0,a.boost-dt);
   if(a.jumpElapsed!==null){a.jumpElapsed+=dt;if(a.jumpElapsed>=RACE.jumpDuration){a.jumpElapsed=null;a.y=0}else a.y=jumpHeight(a.jumpElapsed)}
   a.x=lanePosition(a.x,motion.target,dt);
   const held=a===this.player&&this.waitingTurn!==null;
   const inSoftSand=this.layout.sand&&a.y<.2&&touchesSoftSand(this.layout.sand,a.s,a.x);
   const speed=held?0:(inSoftSand?.8:1)*(a.boost>0?RACE.boostSpeed:a.speed)*(a.slow>0?.43:1)*(a.brake>0?.63:1);
   a.s+=speed*dt;
   if(a===this.player){
    // An unconfirmed corner stops forward motion. A direction swipe is required to enter it.
    const missed=this.layout.turns.find(t=>previousS<=t.start&&a.s>=t.start&&!this.armedTurns.has(t.id));
    if(missed){
     a.s=missed.start;this.waitingTurn=missed.id;
     if(!this.missedTurns.has(missed.id)){this.missedTurns.add(missed.id);this.events.push({type:'turn-missed',direction:missed.direction})}
    }
    for(const t of this.layout.turns)if(previousS<t.end&&a.s>=t.end&&!this.passedTurns.has(t.id)){
     this.passedTurns.add(t.id);this.events.push({type:'turn-done',direction:t.direction});
    }
   }
   a.phase+=a.s-previousS;
   for(const o of this.layout.obstacles){
    if(o.type==='tunnel'&&this.layout.theme==='park'){
     const contact=parkWallContact(o,motion,a.s);
     if(contact){
      motion.wall=contact;a.x=contact.x;a.lane=contact.lane;
      if(a===this.player)this.wallReach=null;
      this.obstacleHit(a,o,'tunnel-wall');
     }
    }
    const pass=crossingAt(o.s,motion,a.s);
    if(!pass||Math.abs(pass.x-o.lane*RACE.lanewidth)>=(o.type==='log'?1.12:.72))continue;
    const hit=o.type==='tunnel'?pass.y>.55:pass.y<(o.type==='log'?.68:.74);
    if(hit){this.obstacleHit(a,o);if(o.type==='tunnel'){a.jumpElapsed=null;a.y=0}}
   }
   if(reach && a.s>=reach.gate.s+parkExitOffset)this.wallReach=null;
   if(a===this.player)for(const t of this.layout.treats)if(!this.collected.has(t.id)&&previousS<=t.s+.4&&a.s>=t.s-.4&&Math.abs(a.x-t.lane*RACE.lanewidth)<.72&&Math.abs((a.y+.65)-t.y)<.8){
    this.collected.add(t.id);this.treatCount++;const previousGauge=this.gauge;this.gauge=Math.min(RACE.gaugeMax,this.gauge+1);
    this.events.push({type:'treat',id:t.id});if(previousGauge<RACE.gaugeMax&&this.gauge===RACE.gaugeMax)this.events.push({type:'ready'});
   }
   if(a.nextTreat!==undefined)this.collectRivalTreats(a,motion);
   if(a.s>=this.layout.length){a.finishTime=timeBefore+dt*(this.layout.length-previousS)/(a.s-previousS);a.s=this.layout.length}
  }
 }
 drainEvents(){const events=this.events;this.events=[];return events}
}
export function gestureAction(dx,dy,elapsed,allowShortFlick=false){
 const x=Math.abs(dx),y=Math.abs(dy),major=Math.max(x,y),minor=Math.min(x,y);
 const shortFlick=allowShortFlick&&elapsed<=210&&major>=20&&major>=minor*1.4;
 if(major>=28||shortFlick)return x>y?(dx<0?'left':'right'):(dy<0?'jump':'brake');
 if(Math.hypot(dx,dy)<12&&elapsed<350)return 'dash';
 return null;
}
