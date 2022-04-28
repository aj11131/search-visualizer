import * as THREE from "three";
import { MeshBasicMaterial } from "three";

export const generateGrid = (scene: THREE.Scene, size: number) => {
  let divisions = size;

  const material = new MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 1,
  });
  material.opacity = 0.25;

  const gridHelperZ = new THREE.GridHelper(size, divisions);
  gridHelperZ.material = material;
  gridHelperZ.position.y = size / 2;
  gridHelperZ.position.z = size / 2;
  gridHelperZ.rotation.z = Math.PI / 2;
  scene.add(gridHelperZ);

  const gridHelperY = new THREE.GridHelper(size, divisions);
  gridHelperY.material = material;
  gridHelperY.position.z = size / 2;
  gridHelperY.position.x = size / 2;
  scene.add(gridHelperY);

  const gridHelperX = new THREE.GridHelper(size, divisions);
  gridHelperX.material = material;
  gridHelperX.position.y = size / 2;
  gridHelperX.position.x = size / 2;
  gridHelperX.rotation.x = Math.PI / 2;
  scene.add(gridHelperX);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
};
