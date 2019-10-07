import * as React from 'react';
import { useState, useEffect } from 'react';

import { ParticleWorld2d, IWorld } from './world';
import { simulate } from './simulation';
import { Particle } from './particle';
import { Vector2 } from './vector2';

import { create3DParticleWorldRenderer, ParticleWorldRenderer } from './render3d';
import { useResizeObserver } from '../../utils/hooks';


function lerp(a: number, b: number, t: number) {
  return a * (1-t) + b * t;
}

function generateParticles(width: number, height: number, count: number, speed: [number, number]) {
  const rand = () => new Particle({
    pos: new Vector2(Math.random() * width - (width * 0.5), Math.random() * height - (height * 0.5)),
    dir: new Vector2(Math.random() * 2 - 1, Math.random() * 2 -1).normalize(),
    spd: lerp(speed[0], speed[1], Math.random()) * width
  });

  const collection = [];
  for(let i = 0; i < count; i++) {
    collection.push(rand());
  }

  return collection;
}

export const ParticleField: React.FC<{}> = () => {
  const [canvasRef, size] = useResizeObserver<HTMLCanvasElement>();
  const [world, setWorld] = useState<ParticleWorld2d | null>(null);
  const [renderer, setRenderer] = useState<ParticleWorldRenderer | null>(null);

  useEffect(() => {
    if (!world && !renderer && size.width !== 1 && size.height!==1) {
      const canvasEl = canvasRef.current;
      if(canvasEl) {
        console.log('creating simulated world');
        const w = new ParticleWorld2d(size, generateParticles(size.width, size.height, 100, [0.015, 0.035]));
        setWorld(w);
  
        const ctx = canvasEl.getContext('webgl');
        if (ctx) {
          console.log('creating world renderer');
          const r = create3DParticleWorldRenderer(ctx, w);
          setRenderer(r);
        }
      }
    }
  }, [canvasRef, size]);

  useEffect(() => {
    if (world && renderer) {
      console.log('starting simulation');
      const stopSimulationFn = simulate<IWorld>(world, renderer.render);
      return () => {
        console.log('stopping simulation');
        stopSimulationFn();
      };
    }
  }, [world, renderer]);

  useEffect(() => {
    if (world) {
      console.log('updating world size', size);
      world.setSize(size);
    }

    if (renderer) {
      console.log('updating renderer size', size);
      renderer.updateSize(size);
    }
  }, [size]);

  return (
    <>
      <canvas ref={canvasRef} width={size.width} height={size.height} style={{flex: `1 1 auto`}}></canvas>
    </>
  )
}