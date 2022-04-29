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
  const xArray = new Array(X).fill(Infinity);
  const yArray = new Array(Y).fill([...xArray]);
  const zArray = new Array(Z).fill([...yArray]);
  return zArray;
};
