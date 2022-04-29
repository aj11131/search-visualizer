import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { generateBox } from "./generate-box";
import { generateGrid } from "./generate-grid";

export const createScene = (gridSize: number) => {
  // init

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
  );
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();

  // ---------------------------------------------------------

  generateGrid(scene, gridSize);

  // ---------------------------------------------------------

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animation);
  document.body.appendChild(renderer.domElement);

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix;
  });

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  // animation

  function animation(time: number) {
    renderer.render(scene, camera);
    controls.update();
  }

  return scene;
};
