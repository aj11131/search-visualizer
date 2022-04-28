import * as THREE from "three";

export const generateBox = (
  scene: THREE.Scene,
  cords: { x: number; y: number; z: number }
) => {
  const { x, y, z } = cords;
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material2 = new THREE.MeshNormalMaterial();
  const mesh = new THREE.Mesh(geometry, material2);
  const boxPosition = new THREE.Vector3(x, y, z).addScalar(0.5);
  mesh.position.set(boxPosition.x, boxPosition.y, boxPosition.z);
  scene.add(mesh);
};
