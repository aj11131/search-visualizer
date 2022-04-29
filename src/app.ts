import { breadthFirstSearch } from "./algorithms/bfs";
import { buildMatrix, getStartEndPoints } from "./algorithms/helpers";
import { renderStartEndPoints } from "./three-helpers/render-start-end";
import { createScene } from "./three-helpers/scene";

const gridSize = 10;

const scene = createScene(gridSize);
const matrix = buildMatrix(gridSize, gridSize, gridSize);
const startEndPoints = getStartEndPoints(matrix);
renderStartEndPoints(scene, startEndPoints);
breadthFirstSearch(matrix, scene, startEndPoints);

// (async () => {
//   for (let x = 0; x < 20; x++) {
//     for (let y = 0; y < 20; y++) {
//       for (let z = 0; z < 20; z++) {
//         generateBox(scene, { x, y, z });
//         await delay(1);
//       }
//     }
//   }
// })();
