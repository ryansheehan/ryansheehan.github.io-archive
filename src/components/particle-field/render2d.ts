import { ParticleWorld2d } from "./world";
import {width, height, threshold_sq, lerp} from './constants';

export function create2DRenderFunction(ctx: CanvasRenderingContext2D, world: ParticleWorld2d) {
  return function() {
    // clear screen
    ctx.fillStyle = `rgb(${0}, ${0}, ${0})`
    ctx.fillRect(0, 0, width, height);

    // draw particles
    ctx.fillStyle = `#ffffff`;
    for(let i = 0; i < world.particles.length; ++i) {
      const p = world.particles[i];
      const {pos: ppos} = p;
      ctx.fillRect(ppos.x - 1, ppos.y -1, 2, 2);

      for(let j = i + 1; j < world.particles.length; ++j) {
        
        const q = world.particles[j];
        const {pos: qpos} = q;
        const dist_v = ppos.clone().sub(qpos);
        const dist_sq = dist_v.len_sq();
        
        if (dist_sq < threshold_sq) {

          const percent = dist_sq / threshold_sq;

          ctx.lineWidth = lerp(1, 4, 1 - percent);
          const color = lerp(200, 20, percent);
          ctx.strokeStyle = `rgb(${color},${color},${color})`;
          
          ctx.beginPath();
          ctx.moveTo(ppos.x, ppos.y);
          ctx.lineTo(qpos.x, qpos.y);
          ctx.stroke();
        }
      }
    }
  }
}