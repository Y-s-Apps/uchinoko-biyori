// Follow the dog's current heading, not a different point on the curved road.
// Position and target share the same lateral anchor, keeping the dog centred.
export function chaseCameraPose(point,{distance=6,height=2.8,lookAhead=10,lookHeight=1}={}){
 const forwardX=Math.sin(point.heading),forwardZ=-Math.cos(point.heading);
 return {position:{x:point.x-forwardX*distance,y:height,z:point.z-forwardZ*distance},target:{x:point.x+forwardX*lookAhead,y:lookHeight,z:point.z+forwardZ*lookAhead}};
}
