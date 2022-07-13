import { buildMatrix } from "../algorithms/helpers";
import { Position } from "../types";

interface Objects {
  grids: number[];
  boxes: number[];
  obstacles: ObjectInfo[];
  matrix: number[][][];
  scene: THREE.Scene | null;
}

interface ObjectInfo {
  position: Position;
  id: number;
}

interface GridSize {
  X: number;
  Y: number;
  Z: number;
}

export const objects: Objects = {
  grids: [],
  boxes: [],
  obstacles: [],
  matrix: [],
  scene: null,
};
