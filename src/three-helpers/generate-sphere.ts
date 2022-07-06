import * as THREE from "three";
import { Position } from "../types";
import { objects } from "../state/objects";
import { getMapKey } from "../algorithms/helpers";

export const generateBox = (
  scene: THREE.Scene,
  cords: Position,
  materialParameters: THREE.MeshBasicMaterialParameters = {
    color: 0xffffff,
  }
) => {
  const { x, y, z } = cords;
  const geometry = new THREE.SphereGeometry(1, 5, 5);
  const material = new THREE.MeshBasicMaterial(materialParameters);
  const mesh = new THREE.Mesh(geometry, material);
  const spherePosition = new THREE.Vector3(x, y, z).addScalar(0.5);
  mesh.position.set(spherePosition.x, spherePosition.y, spherePosition.z);
  scene.add(mesh);
  objects.obstacles.push({ id: mesh.id, position: spherePosition });
  return mesh;
};
