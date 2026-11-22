import {A_FRAME,aFrameHeight,aFramePitch} from './a-frame.js';
import {RACE,crossingAt,jumpHeight,lanePosition} from './race-sim.js';
import {FIELD_LENGTH,fieldPoint,FIELD_BOUNDS} from './agility-route.js';
import {SEESAW,seesawHalfSpan,seesawSurface,seesawAngle} from './seesaw.js';
import {SLALOM,slalomPoleS,slalomSide,slalomStart,slalomEnd} from './slalom.js';
export {fieldPoint} from './agility-route.js';
export const AGILITY={length:FIELD_LENGTH,speed:11.25,penalty:5};
export function buildFirstField(){return {length:AGILITY.length,point:fieldPoint,bounds:FIELD_BOUNDS,theme:'field',turns:[],treats:[],obstacles:[
 {id:0,s:24,lane:0,type:'hurdle'},{id:1,s:76,lane:-1,type:'hoop'},{id:2,s:130,lane:1,type:'tunnel'},
 {id:3,s:148,lane:0,type:'hurdle'},{id:4,s:187,lane:1,type:'hoop'},{id:5,s:226,lane:0,type:'tunnel'}]}}
export function buildAgilityCourse(id='first-field'){
 const layout=buildFirstField();layout.courseId=['balance','zigzag','hill-field'].includes(id)?id:'first-field';
 if(id==='balance')layout.obstacles=[{id:0,s:24,lane:0,type:'hoop'},{id:1,s:76,lane:-1,type:'seesaw'},{id:2,s:130,lane:1,type:'tunnel'},{id:3,s:148,lane:0,type:'hurdle'},{id:4,s:187,lane:1,type:'hoop'},{id:5,s:226,lane:0,type:'seesaw'}];
 if(id==='zigzag')layout.obstacles=[{id:0,s:24,lane:0,type:'hurdle'},{id:1,s:80,lane:0,type:'slalom',startSide:-1},{id:2,s:130,lane:1,type:'tunnel'},{id:3,s:148,lane:0,type:'hurdle'},{id:4,s:185,lane:0,type:'slalom',startSide:1},{id:5,s:226,lane:0,type:'hoop'}];
 if(id==='hill-field'){
  layout.length=196;
  layout.obstacles=[
   {id:0,s:18,lane:0,type:'a-frame'}, {id:1,s:38,lane:1,type:'hurdle'},
   {id:2,s:81,lane:-1,type:'tunnel'}, {id:3,s:130,lane:-1,type:'a-frame'},
   {id:4,s:150,lane:0,type:'hoop'}, {id:5,s:185,lane:1,type:'hurdle'}
  ];
 }
 return layout;
}
export class AgilitySimulation{
 constructor(courseId='first-field'){this.layout=buildAgilityCourse(courseId);this.reset()}
 reset(){this.status='ready';this.previousStatus=null;this.countdown=3;this.time=0;this.stopped=false;this.player={id:'player',s:0,x:0,lane:0,y:0,surfaceY:0,pitch:0,jumpElapsed:null,phase:0,slow:0,boost:0,finishTime:null,hits:0};this.cpus=[];this.results=new Map();this.tunnelEntries=new Map();this.rampPass=null;this.seesaws=new Map(this.layout.obstacles.filter(o=>o.type==='seesaw').map(o=>[o.id,{phase:'idle',angle:SEESAW.angle,elapsed:0,failed:false}]));this.slaloms=new Map(this.layout.obstacles.filter(o=>o.type==='slalom').map(o=>[o.id,{index:0,side:0,passed:[],failed:false}]));this.cleared=0;this.faults=0;this.events=[];this.result=null}
 start(){if(this.status==='ready')this.status='countdown'}
 pause(){if(['countdown','running'].includes(this.status)){this.previousStatus=this.status;this.status='paused'}}
 resume(){if(this.status==='paused'){this.status=this.previousStatus;this.previousStatus=null}}
 get nextObstacle(){return this.layout.obstacles.find(o=>!this.results.has(o.id))}
 get activeSeesaw(){const obstacle=this.layout.obstacles.find(o=>o.type==='seesaw'&&['approach','hold','tipping','ready','exit'].includes(this.seesaws.get(o.id).phase));return obstacle?{obstacle,state:this.seesaws.get(obstacle.id)}:null}
 get activeSlalom(){const obstacle=this.layout.obstacles.find(o=>o.type==='slalom'&&!this.results.has(o.id)&&this.player.s>=slalomStart(o)&&this.player.s<slalomEnd(o));return obstacle?{obstacle,state:this.slaloms.get(obstacle.id)}:null}
 get targetX(){const slalom=this.activeSlalom;return slalom?slalom.obstacle.lane*2+slalom.state.side*SLALOM.offset:this.player.lane*2}
 inTunnel(){return this.layout.obstacles.some(o=>o.type==='tunnel'&&Math.abs(this.player.s-o.s)<3.4&&Math.abs(this.player.x-o.lane*2)<.8)}
 input(action){
  if(this.status!=='running')return false;const p=this.player,board=this.activeSeesaw;
  if(action==='brake'){this.stopped=true;if(board?.state.phase==='approach'&&p.s-board.obstacle.s>=SEESAW.stopFrom){board.state.phase='hold';board.state.elapsed=0}return true}
  if(action==='dash'){if(!this.stopped||board&&['hold','tipping'].includes(board.state.phase))return false;if(board?.state.phase==='ready')board.state.phase='exit';this.stopped=false;return true}
  if(board||this.rampPass)return false;
  const slalom=this.activeSlalom;
  if(slalom){if(action==='left'||action==='right'){slalom.state.side=action==='left'?-1:1;return true}return false}
  if(this.inTunnel())return false;
  if(action==='left'||action==='right'){p.lane=Math.max(-1,Math.min(1,p.lane+(action==='left'?-1:1)));return true}
  if(action==='jump'&&!this.stopped&&p.jumpElapsed===null){p.jumpElapsed=0;return true}return false;
 }
 score(o,clear,reason){if(this.results.has(o.id))return;this.results.set(o.id,!!clear);if(clear){this.cleared++;this.events.push({type:'obstacle-clear',id:o.id})}else{this.faults++;this.player.hits++;this.player.slow=.65;this.events.push({type:'obstacle-miss',id:o.id,reason})}}
 updateSlalom(motion){
  const p=this.player,before=motion.s;
  for(const o of this.layout.obstacles){if(o.type!=='slalom'||this.results.has(o.id))continue;const state=this.slaloms.get(o.id);
   if(before<slalomStart(o)&&p.s>=slalomStart(o))p.lane=o.lane;
   while(state.index<SLALOM.count&&p.s>=slalomPoleS(o,state.index)){
    const pass=crossingAt(slalomPoleS(o,state.index),motion,p.s);
    const offset=pass&&(pass.x-o.lane*2)*slalomSide(o,state.index);
    const clear=!!pass&&offset>=SLALOM.minOffset&&offset<=SLALOM.maxOffset&&pass.y<.25;
    state.passed.push(clear);state.failed||=!clear;state.index++;
   }
   if(before<slalomEnd(o)&&p.s>=slalomEnd(o)){p.lane=o.lane;this.score(o,!state.failed&&state.index===SLALOM.count,'slalom')}
  }
 }
 updateAFrame(motion){
  const p=this.player;
  const o=this.rampPass?.obstacle??this.nextObstacle;
  if(o?.type!=='a-frame')return;
  const entry=o.s-A_FRAME.run,exit=o.s+A_FRAME.run;
  const pass=crossingAt(entry,motion,p.s);
  if(pass){
   const centre=o.lane*2,crossedX=pass.x;
   const onBoard=Math.abs(crossedX-centre)<=A_FRAME.entryTolerance;
   this.rampPass={obstacle:o,onBoard,clear:onBoard&&pass.grounded};
   if(onBoard){p.lane=o.lane;p.x=centre}
   else if((p.lane-o.lane)*(crossedX-centre)<=0)p.lane=o.lane+Math.sign(crossedX-centre);
  }
  if(!this.rampPass)return;
  const airborne=jumpHeight(p.jumpElapsed);
  if(this.rampPass.onBoard){
   p.surfaceY=aFrameHeight(p.s-o.s);
   p.y=p.surfaceY+airborne;
   p.pitch=aFramePitch(p.s-o.s);
  }
  if(p.s>=exit){
   this.score(o,this.rampPass.clear,this.rampPass.onBoard?'ramp-jump':'ramp-entry');
   this.rampPass=null;p.surfaceY=0;p.y=airborne;p.pitch=0;
  }
 }
 updateSeesaw(motion){
  const p=this.player,half=seesawHalfSpan(),dt=motion.dt;
  for(const o of this.layout.obstacles){if(o.type!=='seesaw'||this.results.has(o.id))continue;const state=this.seesaws.get(o.id);
   const entry=crossingAt(o.s-half,motion,p.s);
   if(state.phase==='idle'&&entry){
    if(Math.abs(entry.x-o.lane*2)<.48&&entry.grounded){state.phase='approach';p.s=o.s-half+(p.s-(o.s-half))*SEESAW.speed/AGILITY.speed;p.lane=o.lane;p.x=o.lane*2}
    else{state.phase='missed';state.failed=true}
   }
   if(state.phase==='approach'&&p.s>=o.s+SEESAW.stopTo){p.s=o.s+SEESAW.stopTo;this.stopped=true;state.failed=true;state.phase='hold';state.elapsed=0;this.events.push({type:'seesaw-recover'})}
   if(state.phase==='hold'){state.elapsed+=dt;if(state.elapsed>=SEESAW.hold){state.phase='tipping';state.elapsed=0}}
   else if(state.phase==='tipping'){state.elapsed=Math.min(SEESAW.tipDuration,state.elapsed+dt);state.angle=seesawAngle(state.elapsed/SEESAW.tipDuration);if(state.elapsed>=SEESAW.tipDuration)state.phase='ready'}
   if(['approach','hold','tipping','ready','exit'].includes(state.phase)){p.x=o.lane*2;p.surfaceY=seesawSurface(p.s-o.s,state.angle);p.y=p.surfaceY;p.pitch=-state.angle}
   if(p.s>=o.s+half){this.score(o,state.phase==='exit'&&!state.failed,state.phase==='missed'?'board-entry':'board-stop');state.phase='done';p.surfaceY=0;p.y=0;p.pitch=0}
  }
 }
 step(dt){
  if(!Number.isFinite(dt)||dt<=0||dt>.1)return;
  if(this.status==='countdown'){this.countdown=Math.max(0,this.countdown-dt);if(this.countdown===0){this.status='running';this.events.push({type:'go'})}return}
  if(this.status!=='running')return;
  const p=this.player,before=p.s,timeBefore=this.time;
  const motion={s:before,x:p.x,target:this.targetX,jump:p.jumpElapsed,dt};this.time+=dt;
  p.slow=Math.max(0,p.slow-dt);
  if(p.jumpElapsed!==null){p.jumpElapsed+=dt;if(p.jumpElapsed>=RACE.jumpDuration){p.jumpElapsed=null;p.y=0}else p.y=jumpHeight(p.jumpElapsed)}
  p.x=lanePosition(p.x,motion.target,dt);
  if(!this.stopped)p.s+=(this.activeSeesaw?SEESAW.speed:this.activeSlalom?SLALOM.speed:AGILITY.speed)*(p.slow>0?.65:1)*dt;
  this.updateAFrame(motion);this.updateSeesaw(motion);this.updateSlalom(motion);p.phase+=p.s-before;
  for(const o of this.layout.obstacles){
   if(this.results.has(o.id)||o.type==='seesaw'||o.type==='slalom'||o.type==='a-frame')continue;
   const tunnel=o.type==='tunnel';
   if(tunnel){
    const entry=crossingAt(o.s-3,motion,p.s);
    if(entry)this.tunnelEntries.set(o.id,Math.abs(entry.x-o.lane*2)<.72&&entry.y<.55);
   }
   const pass=crossingAt(o.s+(tunnel?3:0),motion,p.s);
   if(!pass)continue;
   const aligned=Math.abs(pass.x-o.lane*2)<.72;
   if(tunnel){
    const entered=this.tunnelEntries.get(o.id);
    this.score(o,entered&&aligned&&pass.y<.55,entered?'tunnel-exit':'tunnel-entry');
   }else{
    const heightOK=o.type==='hurdle'?pass.y>=.74:pass.y>=.7&&pass.y<=1.6;
    this.score(o,aligned&&heightOK,aligned?'jump-low':'off-line');
   }
  }
  if(p.s>=this.layout.length){p.finishTime=timeBefore+dt*(this.layout.length-before)/(p.s-before);p.s=this.layout.length;this.time=p.finishTime;this.status='finished';this.result={time:this.time,penalty:this.faults*AGILITY.penalty,total:this.time+this.faults*AGILITY.penalty,cleared:this.cleared,faults:this.faults};this.events.push({type:'finish'})}
 }
 drainEvents(){const e=this.events;this.events=[];return e}
}
