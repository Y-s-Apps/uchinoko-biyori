import {parkTunnelRadius,parkTunnelLength,parkTunnelCenterZ} from './park-tunnel-profile.js';
import * as T from 'three';

export {parkExitOffset} from './park-tunnel-profile.js';

// One open-ended fabric arch under the hoops, also used by the course miniature.
export function addTunnel(parent, mesh, radius = 1.58, length = 6) {
  const fabric = new T.CylinderGeometry(radius, radius, length, 32, 1, true, Math.PI / 2, Math.PI);
  fabric.rotateX(Math.PI / 2);
  const wall = mesh(fabric, '#5686aa', 0, 0, 0, parent);
  wall.material.side = T.DoubleSide;
  wall.name = 'tunnel-fabric';
  const intervals = 8;
  for (let i = 0; i <= intervals; i++) {
    const end = i === 0 || i === intervals;
    const rib = mesh(new T.TorusGeometry(radius, radius * (end ? .068 : .032), 8, 32, Math.PI),
      end ? '#91b7c3' : '#729cba', 0, 0, length * (i / intervals - .5), parent);
    rib.name = end ? 'tunnel-rim' : 'tunnel-rib';
  }
}



// Both rims meet the ground. The park uses the original blue canvas sleeve
// with just enough headroom for a low camera following the smaller runner.
export function addParkTunnel(parent, mesh) {
  const radius = parkTunnelRadius, length = parkTunnelLength;
  const tunnel = new T.Group();
  tunnel.name = 'park-tunnel';
  tunnel.scale.y = 1.10;
  // Leave room past the exit rim for the first lateral step after the scored gate.
  tunnel.position.z = parkTunnelCenterZ;
  parent.add(tunnel);
  addTunnel(tunnel, mesh, radius, length);
  for (const side of [-1, 1]) {
    mesh(new T.BoxGeometry(.12, .08, length), '#75969c', side * radius, .04, 0, tunnel);
  }
}
