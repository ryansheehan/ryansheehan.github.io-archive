import { Vector2, insideLine, distToLine } from './vector2';
import { IParticle } from './particle';

const origin = new Vector2(0, 0);
const normal_top = new Vector2(0, 1);
const normal_right = new Vector2(-1, 0);
const normal_bottom = new Vector2(0, -1);
const normal_left = new Vector2(1, 0);
const right = new Vector2(1, 0);
const down = new Vector2(0, 1);
const up = new Vector2(0, -1);
const left = new Vector2(-1, 0);

export interface IWorld {
  update(dt: number): void;
}

export class ParticleWorld2d {
  public readonly max: Vector2;
  public readonly center: Vector2;

  constructor(
    public readonly width: number,
    public readonly height: number,
    public particles: IParticle[] = []) {

    this.max = new Vector2(width, height);
    this.center = new Vector2(width / 2, height / 2);
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
    const {max} = this;
    if(!insideLine(p.pos, origin, normal_top)) {
      p.dir.reflect(normal_top);
      p.pos.y = distToLine(p.pos, origin, right);
    }

    if(!insideLine(p.pos, origin, normal_left)) {
      p.dir.reflect(normal_left);
      p.pos.x = distToLine(p.pos, origin, down);
    }

    if(!insideLine(p.pos, max, normal_bottom)) {
      p.dir.reflect(normal_bottom);
      const over = distToLine(p.pos, max, left);
      p.pos.y = max.y - over;
    }

    if(!insideLine(p.pos, max, normal_right)) {
      p.dir.reflect(normal_right);
      const over = distToLine(p.pos, max, up);
      p.pos.x = max.x - over;
    }
  }
}
