import * as THREE from "three";
import { Position } from "../interfaces";

export const generateBox = (
  scene: THREE.Scene,
  cords: Position,
  materialParameters: THREE.MeshBasicMaterialParameters = {
    color: 0xffffff,
  }
) => {
  const { x, y, z } = cords;
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial(materialParameters);
  const mesh = new THREE.Mesh(geometry, material);
  const boxPosition = new THREE.Vector3(x, y, z).addScalar(0.5);
  mesh.position.set(boxPosition.x, boxPosition.y, boxPosition.z);
  scene.add(mesh);
  return mesh;
};
