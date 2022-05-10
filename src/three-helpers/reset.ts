import { objects } from "../state/objects";

export const clearGrids = (scene: THREE.Scene) => {
  console.log(objects.grids);

  let currentGrid = objects.grids.pop();
  while (currentGrid) {
    scene.remove(scene.getObjectById(currentGrid) as THREE.Object3D);
    currentGrid = objects.grids.pop();
  }
};

export const clearBoxes = (scene: THREE.Scene) => {
  let currentBox = objects.boxes.pop();
  while (currentBox) {
    scene.remove(scene.getObjectById(currentBox) as THREE.Object3D);
    currentBox = objects.boxes.pop();
  }
};
