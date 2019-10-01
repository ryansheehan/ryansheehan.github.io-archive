import * as THREE from 'three';
import { ParticleWorld2d } from "./world";
import {width, height, threshold_sq} from './constants';

const pointVertexShader = `
  attribute vec4 color;
  varying vec4 vColor;

  void main() {
    
    vColor = color * (1.0 / 255.0);
    // gl_PointSize = size * ( 300.0 / -mvPosition.z );
    gl_PointSize = 2.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const pointFragmentShader = `
  varying vec4 vColor;

  void main() {
    gl_FragColor = vColor;
  }
`;

const lineVertexShader = `
  attribute vec4 color;
  varying vec4 vColor;

  void main() {
    vColor = color * (1.0 / 255.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const lineFragmentShader = `
  varying vec4 vColor;

  void main() {
    gl_FragColor = vColor;
  }
`;

export function create3DRenderFunction(ctx: WebGLRenderingContext, world: ParticleWorld2d) {
  const scene = new THREE.Scene();

  const fov = 75;
  const fov_rad = fov*Math.PI/180;
  // calculate how far back the camera needs to be 
  // give our fov and how big our simulated world is
  const depth = (width / 2) / Math.tan(fov_rad/2);
  const near = 0.1;
  const far = 400;
  const camera = new THREE.PerspectiveCamera(fov, width/height, near, far);
  // camera.translateX(width/2);
  // camera.translateY(height/2);
  camera.translateZ(depth);
  
  // setup 3d renderer
  const renderer = new THREE.WebGLRenderer({context: ctx});
  // renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 1);

  const starMaterial = new THREE.ShaderMaterial({
    vertexShader: pointVertexShader,
    fragmentShader: pointFragmentShader,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
  });

  const constellationMaterial = new THREE.ShaderMaterial({
    vertexShader: lineVertexShader,
    fragmentShader: lineFragmentShader,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
  });

  const {particles} = world;
  const numParticles = particles.length;

  const sizeOfPosition = 12; // 3 floats * 4 bytes per float
  const sizeOfColor = 4; // 4 ints * 1 bytes per int
  const sizeOfTotal = sizeOfPosition + sizeOfColor;

  // setup vertex data as interleaved buffer by recasting
  // for stars the first 12 bytes are 3 floats (x,y,z)
  // and the last 4 bytes are the colors in [0,255] range for (r,g,b,a)
  const starArrayBuffer = new ArrayBuffer(numParticles * sizeOfTotal);
  const starPosInterleaved = new Float32Array(starArrayBuffer);
  const starColInterleaved = new Uint8Array(starArrayBuffer);

  // initialize the star positions and colors
  for(let i = 0; i < starPosInterleaved.length; i+=4) {
    const particle = particles[i / 4];

    // set the position x,y,z
    starPosInterleaved[i] = particle.pos.x;
    starPosInterleaved[i+1] = particle.pos.y;
    starPosInterleaved[i+2] = 0;

    // since we reinterpreted the array as a uint8
    // we need to recalculate the offset for the color component
    const j = (i + 3) * 4

    starColInterleaved[j] = 127; // red
    starColInterleaved[j+1] = 255; // green
    starColInterleaved[j+2] = 212; // blue
    starColInterleaved[j+3] = 255; // alpha
  }

  // set the strides for each of the interleaved buffers
  const starPosInterleavedBuffer = new THREE.InterleavedBuffer(starPosInterleaved, sizeOfTotal / 4);
  const starColInterleavedBuffer = new THREE.InterleavedBuffer(starColInterleaved, sizeOfTotal);

  // setup the actual vertex attributes with their offsets into the interleaving
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.addAttribute('position', new THREE.InterleavedBufferAttribute(starPosInterleavedBuffer, 3, 0));
  starGeometry.addAttribute('color', new THREE.InterleavedBufferAttribute(starColInterleavedBuffer, 4, sizeOfPosition));

  // create the model and add it to the scene
  const starPoints = new THREE.Points(starGeometry, starMaterial);
  scene.add(starPoints);

  // create the memory block for the lines
  // since we will be manipulating the vertex alphas
  // we need to make sure each line has it's own 2 vertices
  // the worst case is that every star is connected to every other star
  // so we make our line buffer huge to handle the possibility
  const lineArrayBuffer = new ArrayBuffer(numParticles * sizeOfTotal * numParticles);
  const uint8buf = new Uint8Array(lineArrayBuffer);
  
  // copy the stars vertex data so that each line has it's own vert
  const srcBuf = new Uint8Array(starArrayBuffer); 
  for(let i = 0; i < numParticles; ++i) {
    // buffer copy in each set
    uint8buf.set(srcBuf, i * srcBuf.length);
  }

  // just like with the stars, let's reinterpret the buffer for each data type
  const linePositionInterleaved = new Float32Array(lineArrayBuffer);
  const lineColorInterleaved = new Uint8Array(lineArrayBuffer);

  // setup the strides
  const linePositionInterleavedBuffer = new THREE.InterleavedBuffer(linePositionInterleaved, sizeOfTotal / 4);
  const lineColorInterleavedBuffer = new THREE.InterleavedBuffer(lineColorInterleaved, sizeOfTotal);
  
  // declare the vertex data, setup the offsets for each property as interleaved
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.addAttribute('position', new THREE.InterleavedBufferAttribute(linePositionInterleavedBuffer, 3, 0));
  lineGeometry.addAttribute('color', new THREE.InterleavedBufferAttribute(lineColorInterleavedBuffer, 4, sizeOfPosition));

  // initialize with an empty index buffer, this will get reset each frame
  lineGeometry.setIndex([]);

  // create the model for all constellation lines as one giant model and add it to the scene
  const constellationLines = new THREE.LineSegments(lineGeometry, constellationMaterial);
  scene.add(constellationLines);


  // return our render function
  return function() {
    // pull out the position attribute for the stars
    const starsGeo = starPoints.geometry as THREE.BufferGeometry;
    const starPosAttr = starsGeo.attributes['position'] as THREE.InterleavedBufferAttribute;

    // pull out the position and color attributes for the constellation lines
    const constGeo = constellationLines.geometry as THREE.BufferGeometry;
    const constPosAttr = constGeo.attributes['position'] as THREE.InterleavedBufferAttribute;
    const constColAttr = constGeo.attributes['color'] as THREE.InterleavedBufferAttribute;

    // update the star positions based on the updates from the simulation
    const worldParticles = world.particles;
    for(let i = 0; i < worldParticles.length; ++i) {
      const {x,y} = worldParticles[i].pos;
      starPosAttr.setXY(i, x, y);
    }
    // let THREEjs know position data updated, otherwise the render data will not be updated
    starPosAttr.data.needsUpdate = true;

    // we need to track each vert that gets used in the constellation
    // so that we do not reuse it for color modifications
    const offsets = new Array<number>(numParticles).fill(0);
    
    // this is the tracking of what lines actually need drawing
    const indices: number[] = [];

    // for each particle test its distance against every other particle
    for(let i = 0; i < world.particles.length; ++i) {
      const p = world.particles[i];
      const {pos: ppos} = p;

      for(let j = i + 1; j < world.particles.length; ++j) {
        
        const q = world.particles[j];
        const {pos: qpos} = q;
        const dist_v = ppos.clone().sub(qpos);
        const dist_sq = dist_v.len_sq();
        
        // if we are within range...
        if (dist_sq < threshold_sq) {
          // calculate our offset into the constellation verts
          // and mark that we used that vertex to prevent
          // accidentally overwriting color data
          const ioffset = offsets[i] * numParticles + i;
          offsets[i]++;
          const joffset = offsets[j] * numParticles + j;
          offsets[j]++;

          // for the constellation lines, we only need to 
          // update positions for lines that are actually
          // going to be drawn
          constPosAttr.setXY(ioffset, ppos.x, ppos.y);
          constPosAttr.setXY(joffset, qpos.x, qpos.y);

          // calculate a percent of how close the two stars
          // are when "in range" of each other
          // then invert the value to represent the alpha
          const closeness = dist_sq / threshold_sq;
          const alpha = Math.floor(1 - closeness * 255);
          
          // update the alpha for each vert that make the line
          constColAttr.setW(ioffset, alpha);
          constColAttr.setW(joffset, alpha);

          // update our index buffer so the line can be drawn
          indices.push(ioffset, joffset);
        }
      }

      // notify THREEjs of the changes
      constPosAttr.data.needsUpdate = true;
      constColAttr.data.needsUpdate = true;
      constGeo.setIndex(indices);
    }

    // rerender the scene!
    renderer.render(scene, camera);
  }
}