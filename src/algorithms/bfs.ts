import { Position } from "../interfaces";
import { settings } from "../state/settings";
import { generateBox } from "../three-helpers/generate-box";
import { delay, getMapKey } from "./helpers";

export const breadthFirstSearch = async (
  mat: number[][][],
  scene: THREE.Scene,
  startEndPoints: { start: Position; end: Position }
) => {
  const visited: { [index: number]: boolean } = {};
  const prev: { [index: number]: Position } = {};
  const boxes: { [index: number]: number } = {};
  const { start, end } = startEndPoints;
  let queueX: number[] = [];
  let queueY: number[] = [];
  let queueZ: number[] = [];

  let cords = [
    [-1, 0, 0],
    [0, 1, 0],
    [1, 0, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];

  queueX.push(start.x);
  queueY.push(start.y);
  queueZ.push(start.z);

  while (queueX.length) {
    // if (settings.pause == true) {
    //   continue;
    // }

    // if (settings.stop === true) {
    //   break;
    // }

    let x = queueX.shift() as number;
    let y = queueY.shift() as number;
    let z = queueZ.shift() as number;

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
      { transparent: true, opacity: 0.2 }
    );
    boxes[getMapKey(mat, x, y, z)] = box.id;
    await delay(10);

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
        prev[getMapKey(mat, newX, newY, newZ)] = { x, y, z };
      }
    }
  }
  return { mat, end, prev, boxes };
};
