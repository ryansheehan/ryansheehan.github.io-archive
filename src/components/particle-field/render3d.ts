import * as THREE from 'three';
import { ParticleWorld2d } from "./world";
import {width, height} from './constants';

export function create3DRenderFunction(ctx: WebGLRenderingContext, world: ParticleWorld2d) {
  const scene = new THREE.Scene();

  // const camera = new THREE.OrthographicCamera(0, width, height, 0);
  // camera.translateZ(1)

  const fov = 75;
  const fov_rad = fov*Math.PI/180;
  const camera = new THREE.PerspectiveCamera(fov, width/height, 0.1, 400);
  camera.translateX(width/2)
  camera.translateY(height/2)
  camera.translateZ((width / 2) / Math.tan(fov_rad/2));
  
  const renderer = new THREE.WebGLRenderer({context: ctx});
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 1);

  const particleRadius = 1;
  const particleShape = new THREE.Shape();
  particleShape.moveTo(0, particleRadius);
  particleShape.quadraticCurveTo( particleRadius, particleRadius, particleRadius, 0 );
  particleShape.quadraticCurveTo( particleRadius, - particleRadius, 0, - particleRadius );
  particleShape.quadraticCurveTo( - particleRadius, - particleRadius, - particleRadius, 0 );
  particleShape.quadraticCurveTo( - particleRadius, particleRadius, 0, particleRadius );
  
  const particleGeometry = new THREE.ShapeBufferGeometry(particleShape);
  
  const meshes = world.particles.map(particle => {
    const geometry = particleGeometry;
    // const material = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide});
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(particle.pos.x, particle.pos.y, 0);
    scene.add(mesh);
    return mesh;
  });

  return function() {
    for(let i = 0; i < meshes.length; ++i) {
      const mesh = meshes[i];
      const particle = world.particles[i];
      mesh.position.set(particle.pos.x, particle.pos.y, 0);
    }
    renderer.render(scene, camera);
  }
}