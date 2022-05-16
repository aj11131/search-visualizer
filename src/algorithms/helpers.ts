import { Position } from "../types";

export const getStartEndPoints = (matrix: number[][][]) => {
  const startX = Math.floor(Math.random() * matrix[0][0].length);
  const startY = Math.floor(Math.random() * matrix[0].length);
  const startZ = Math.floor(Math.random() * matrix.length);

  let endX: number = Infinity;
  let endY: number = Infinity;
  let endZ: number = Infinity;

  let endSet = false;

  while (
    startX === endX ||
    startY === endY ||
    startZ === endZ ||
    endSet === false
  ) {
    endX = Math.floor(Math.random() * matrix[0][0].length);
    endY = Math.floor(Math.random() * matrix[0].length);
    endZ = Math.floor(Math.random() * matrix.length);
    endSet = true;
  }

  return {
    start: { x: startX, y: startY, z: startZ },
    end: { x: endX, y: endY, z: endZ },
  };
};

export const buildMatrix = (X: number, Y: number, Z: number): number[][][] => {
  const xArray = new Array(X).fill(Infinity);
  const yArray = new Array(Y).fill([...xArray]);
  const zArray = new Array(Z).fill([...yArray]);
  return zArray;
};

export const highlightPath = async (
  scene: THREE.Scene,
  mat: number[][][],
  start: Position,
  end: Position,
  path: { [index: number]: { position: Position; level: number } },
  boxes: { [index: number]: number },
  stopped: boolean
) => {
  if (stopped) return;

  let startKey = getMapKey(mat, start.x, start.y, start.z);
  let previousKey = -Infinity;
  let previousNode = path[getMapKey(mat, end.x, end.y, end.z)].position;
  let currentBoxId =
    boxes[getMapKey(mat, previousNode.x, previousNode.y, previousNode.z)];
  let i = 0;

  while (currentBoxId && previousKey !== startKey) {
    previousKey = getMapKey(
      mat,
      previousNode.x,
      previousNode.y,
      previousNode.z
    );
    const object = scene.getObjectById(currentBoxId) as THREE.Mesh<
      THREE.BoxGeometry,
      THREE.MeshBasicMaterial
    >;
    object.material.color.set("#0000FF");
    object.material.opacity = 1;
    previousNode = path[previousKey].position;
    currentBoxId = boxes[previousKey];
    i++;
  }
};

export const getCords = (dof: number) => {
  return cords[dof] || cords[6];
};

export const getMapKey = (
  mat: number[][][],
  x: number,
  y: number,
  z: number
) => {
  return mat[0].length * mat[0][0].length * z + mat[0][0].length * y + x;
};

export const delay = async (ms: number) => [
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  }),
];

const cords: { [index: number]: number[][] } = {
  6: [
    [-1, 0, 0],
    [0, 1, 0],
    [1, 0, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ],
  18: [
    [0, 0, -1],
    [0, 0, 1],
    [0, 1, 0],
    [0, -1, 0],
    [-1, 0, 0],
    [1, 0, 0],
    [-1, -1, 0],
    [-1, 0, -1],
    [-1, 0, 1],
    [-1, 1, 0],
    [0, -1, -1],
    [0, -1, 1],
    [0, 1, -1],
    [0, 1, 1],
    [1, -1, 0],
    [1, 0, -1],
    [1, 0, 1],
    [1, 1, 0],
  ],
  26: [
    [0, 0, -1],
    [0, 0, 1],
    [0, 1, 0],
    [0, -1, 0],
    [-1, 0, 0],
    [1, 0, 0],
    [-1, -1, 0],
    [-1, 0, -1],
    [-1, 0, 1],
    [-1, 1, 0],
    [0, -1, -1],
    [0, -1, 1],
    [0, 1, -1],
    [0, 1, 1],
    [1, -1, 0],
    [1, 0, -1],
    [1, 0, 1],
    [1, 1, 0],
    [-1, 1, 1],
    [1, -1, 1],
    [1, 1, -1],
    [1, 1, 1],
    [-1, -1, 1],
    [1, -1, -1],
    [-1, 1, -1],
    [-1, -1, -1],
  ],
};
