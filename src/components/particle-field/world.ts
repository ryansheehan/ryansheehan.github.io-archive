import { Vector2, insideLine, distToLine } from './vector2';
import { IParticle } from './particle';
import { ISize } from '../../utils/types';

const right = new Vector2(1, 0);
const down = new Vector2(0, -1);
const up = new Vector2(0, 1);
const left = new Vector2(-1, 0);

export interface IWorld {
  update(dt: number): void;
}

export class ParticleWorld2d {
  private min = new Vector2(-1, 1);
  private max = new Vector2(1, -1);
  
  public get width() { return this.size.width; }
  public get height() { return this.size.height; }

  private size: ISize = {width: 1, height: 1};

  constructor(
    size: ISize,
    public particles: IParticle[] = []) {
    console.log('initializing world to size', size);
    this.setSize(size);
  }

  setSize(size: ISize) {
    if (this.size.width != size.width || this.size.height != size.height) {
      this.size = size;
      const {width, height} = size;
      this.max = new Vector2(width / 2, -height / 2);
      this.min = this.max.clone().mul(-1);
    } else {
      console.log('World size change ignored.  Values are the same.');
    }
  }

  add(p: IParticle) {
    this.particles.push(p);
  }

  update(dt: number) {
    // update positions, and check bounds;
    for(let i = 0; i < this.particles.length; ++i) {
      this.particles[i].update(dt);
      this.forceInBounds(this.particles[i]);
    }
  }

  private forceInBounds(p: IParticle) {
    const {min, max} = this;

    // check top
    if (!insideLine(p.pos, min, down)) {      
      p.dir.reflect(down);
      p.pos.y -= distToLine(p.pos, min, right) * 2;
    }

    // check right
    if (!insideLine(p.pos, max, left)) {
      p.dir.reflect(left);
      p.pos.x -= distToLine(p.pos, max, up) * 2;
    }

    // check bottom
    if (!insideLine(p.pos, max, up)) {
      p.dir.reflect(up);
      p.pos.y += distToLine(p.pos, max, left) * 2;
    }

    // check left
    if (!insideLine(p.pos, min, right)) {
      p.dir.reflect(right);
      p.pos.x += distToLine(p.pos, min, down) * 2;
    }
  }
}
