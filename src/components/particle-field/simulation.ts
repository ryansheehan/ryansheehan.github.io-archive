import { IWorld } from "./world";


export function simulate<T extends IWorld>(world: T, renderCallback: (world?: T, dt?: number)=>void) {
  let animFrame: number;
  const startTime = performance.now();
  let lastTime = startTime;

  function _sim(time: number) {
    animFrame = requestAnimationFrame(_sim);

    const dt = (time - lastTime) / 1000;
    lastTime = time;
    world.update(dt);
    renderCallback(world, dt);
  }

  _sim(startTime);

  return function() {
    cancelAnimationFrame(animFrame);
  }
}
