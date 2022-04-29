import { Position } from "../interfaces";
import { generateBox } from "../three-helpers/generate-box";

export const breadthFirstSearch = async (
  mat: number[][][],
  scene: THREE.Scene,
  startEndPoints: { start: Position; end: Position }
) => {
  let visited: { [index: number]: boolean } = {};
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

  // for (let x = 0; x < mat.length; x++) {
  //   for (let y = 0; y < mat[x].length; y++) {
  //     for (let z = 0; z < mat[x][y].length; z++) {
  //       if (mat[x][y][z] === 1) mat[x][y][z] = Infinity;
  //       if (mat[x][y][z] === 0) {
  //         queueX.push(x);
  //         queueY.push(y);
  //       }
  //     }
  //   }
  // }

  queueX.push(start.x);
  queueY.push(start.y);
  queueZ.push(start.z);

  let level = 0;
  while (queueX.length) {
    let levelSize = queueZ.length;
    while (levelSize !== 0) {
      let x = queueX.shift() as number;
      let y = queueY.shift() as number;
      let z = queueZ.shift() as number;
      levelSize--;

      if (x === end.x && y === end.y && z === end.z) {
        return;
      }

      if (
        mat[x] === undefined ||
        mat[x][y] === undefined ||
        mat[x][y][z] === undefined
      )
        continue;

      if (visited.hasOwnProperty(getMapKey(x, y, z))) continue;

      if (level < mat[x][y][z]) {
        mat[x][y][z] = level;
      }

      visited[getMapKey(x, y, z)] = true;
      generateBox(scene, { x, y, z }, { transparent: true, opacity: 0.2 });
      await delay(100);

      for (let i = 0; i < cords.length; i++) {
        const newX = x + cords[i][0];
        const newY = y + cords[i][1];
        const newZ = z + cords[i][2];

        if (
          mat[newX] !== undefined &&
          mat[newX][newY] !== undefined &&
          mat[newX][newY][newZ] !== undefined
        ) {
          // if (mat[newX][newY][newZ] > level) {
          queueX.push(newX);
          queueY.push(newY);
          queueZ.push(newZ);
          // }
        }
      }
    }
    level++;
  }

  function getMapKey(x: number, y: number, z: number) {
    return mat[0].length * mat[0][0].length * z + mat[0][0].length * y + x;
  }

  return mat;
};

const delay = async (ms: number) => [
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  }),
];
