import { Position, SearchResults } from "../types";
import { settings } from "../state/settings";
import { generateBox } from "../three-helpers/generate-box";
import { delay, getCords, getMapKey } from "./helpers";

export const breadthFirstSearch = async (
  mat: number[][][],
  scene: THREE.Scene,
  startEndPoints: { start: Position; end: Position }
) => {
  const visited: { [index: number]: boolean } = {};
  const path: { [index: number]: { position: Position; level: number } } = {};
  const boxes: { [index: number]: number } = {};
  const { start, end } = startEndPoints;
  let queueX: number[] = [];
  let queueY: number[] = [];
  let queueZ: number[] = [];
  let levels: number[] = [];
  let dof = settings.dof;
  let cords = getCords(dof);

  queueX.push(start.x);
  queueY.push(start.y);
  queueZ.push(start.z);
  levels.push(0);

  while (queueX.length) {
    if (settings.stop === true) {
      break;
    }

    let x = queueX.shift() as number;
    let y = queueY.shift() as number;
    let z = queueZ.shift() as number;
    let level = levels.shift() as number;

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
        queueX.push(newX);
        queueY.push(newY);
        queueZ.push(newZ);
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
  const results: SearchResults = {
    mat,
    start,
    end,
    path,
    boxes,
    stopped: settings.stop,
  };
  return results;
};
