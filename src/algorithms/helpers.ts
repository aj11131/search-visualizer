import { Position } from "../interfaces";

export const getStartEndPoints = (matrix: number[][][]) => {
  const startX = Math.floor(Math.random() * matrix[0][0].length);
  const startY = Math.floor(Math.random() * matrix[0].length);
  const startZ = Math.floor(Math.random() * matrix.length);

  let endX: number = Infinity;
  let endY: number = Infinity;
  let endZ: number = Infinity;

  while (startX !== endX && startY !== endY && startZ !== endZ) {
    endX = Math.floor(Math.random() * matrix[0][0].length);
    endY = Math.floor(Math.random() * matrix[0].length);
    endZ = Math.floor(Math.random() * matrix.length);
  }

  return {
    start: { x: startX, y: startY, z: startZ },
    end: { x: endX, y: endY, z: endZ },
  };
};

export const buildMatrix = (X: number, Y: number, Z: number): number[][][] => {
  console.log(X);
  const xArray = new Array(X).fill(Infinity);
  const yArray = new Array(Y).fill([...xArray]);
  const zArray = new Array(Z).fill([...yArray]);
  return zArray;
};

export const highlightPath = async (
  scene: THREE.Scene,
  mat: number[][][],
  end: Position,
  prev: { [index: number]: Position },
  boxes: { [index: number]: number }
) => {
  let previousNode = prev[getMapKey(mat, end.x, end.y, end.z)];
  let currentBoxId =
    boxes[getMapKey(mat, previousNode.x, previousNode.y, previousNode.z)];
  console.log(previousNode);
  console.log(currentBoxId);
  let i = 0;
  while (currentBoxId && i < 100) {
    const object = scene.getObjectById(currentBoxId) as THREE.Mesh<
      THREE.BoxGeometry,
      THREE.MeshBasicMaterial
    >;
    object.material.color.set("#0000FF");
    object.material.opacity = 1;
    previousNode =
      prev[getMapKey(mat, previousNode.x, previousNode.y, previousNode.z)];
    currentBoxId =
      boxes[getMapKey(mat, previousNode.x, previousNode.y, previousNode.z)];
    i++;
  }
  await delay(500);
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
