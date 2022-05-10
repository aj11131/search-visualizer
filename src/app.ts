import { breadthFirstSearch } from "./algorithms/bfs";
import {
  buildMatrix,
  getStartEndPoints,
  highlightPath,
} from "./algorithms/helpers";
import { settings } from "./state/settings";
import { generateGrid } from "./three-helpers/generate-grid";
import { renderStartEndPoints } from "./three-helpers/render-start-end";
import { createScene } from "./three-helpers/scene";
import { clearBoxes } from "./three-helpers/reset";
import { addDatGui } from "./three-helpers/dat-gui";

const scene = createScene();
addDatGui(scene);
generateGrid(scene, settings.gridSize);

document.getElementById("start")?.addEventListener("click", () => {
  executeSearch();
});

document.getElementById("reset")?.addEventListener("click", () => {
  clearBoxes(scene);
});

const executeSearch = async () => {
  const { gridSize } = settings;
  generateGrid(scene, gridSize);
  const matrix = buildMatrix(gridSize, gridSize, gridSize);
  const startEndPoints = getStartEndPoints(matrix);
  renderStartEndPoints(scene, startEndPoints);
  const results = await breadthFirstSearch(matrix, scene, startEndPoints);
  console.log(results);
  highlightPath(
    scene,
    results?.mat,
    results?.end,
    results?.prev,
    results?.boxes
  );
};
