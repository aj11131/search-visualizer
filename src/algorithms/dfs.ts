import { Position } from "../types";
import { settings } from "../state/settings";
import { generateBox } from "../three-helpers/generate-box";
import { delay, getCords, getMapKey } from "./helpers";

export const depthFirstSearch = async (
  mat: number[][][],
  scene: THREE.Scene,
  startEndPoints: { start: Position; end: Position }
) => {
  const visited: { [index: number]: boolean } = {};
  const path: { [index: number]: { position: Position; level: number } } = {};
  const boxes: { [index: number]: number } = {};
  const { start, end } = startEndPoints;
  let stackX: number[] = [];
  let stackY: number[] = [];
  let stackZ: number[] = [];
  let levels: number[] = [];
  let dof = settings.dof;
  let cords = getCords(dof);

  stackX.push(start.x);
  stackY.push(start.y);
  stackZ.push(start.z);
  levels.push(0);

  while (stackX.length) {
    if (settings.stop === true) {
      break;
    }

    let x = stackX.pop() as number;
    let y = stackY.pop() as number;
    let z = stackZ.pop() as number;
    let level = levels.pop() as number;

    if (x === end.x && y === end.y && z === end.z) {
      break;
    }

    if (
      mat[x] === undefined ||
      mat[x][y] === undefined ||
      mat[x][y][z] === undefined
    )
      continue;

    if (visited.hasOwnProperty(getMapKey(mat, x, y, z))) continue;

    visited[getMapKey(mat, x, y, z)] = true;
    const box = generateBox(
      scene,
      { x, y, z },
      { transparent: true, opacity: 0.1 }
    );
    boxes[getMapKey(mat, x, y, z)] = box.id;
    await delay(settings.speed);

    for (let i = 0; i < cords.length; i++) {
      const newX = x + cords[i][0];
      const newY = y + cords[i][1];
      const newZ = z + cords[i][2];

      if (
        mat[newX] !== undefined &&
        mat[newX][newY] !== undefined &&
        mat[newX][newY][newZ] !== undefined
      ) {
        stackX.push(newX);
        stackY.push(newY);
        stackZ.push(newZ);
        levels.push(level + 1);
        const mapKey = getMapKey(mat, newX, newY, newZ);

        if (!path[mapKey]) {
          path[mapKey] = { position: { x, y, z }, level };
        }

        if (level < path[mapKey].level) {
          path[mapKey] = { position: { x, y, z }, level };
        }
      }
    }
  }
  return { mat, start, end, path, boxes, stopped: settings.stop };
};
