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
import { depthFirstSearch } from "./algorithms/dfs";

const scene = createScene();
addDatGui(scene);
generateGrid(scene, settings.gridSize);

document.getElementById("start")?.addEventListener("click", () => {
  clearBoxes(scene);
  settings.stop = false;
  executeSearch();
});

document.getElementById("stop")?.addEventListener("click", () => {
  settings.stop = true;
});

document.getElementById("reset")?.addEventListener("click", () => {
  settings.stop = true;
  clearBoxes(scene);
});

const executeSearch = async () => {
  const { gridSize } = settings;
  const matrix = buildMatrix(gridSize, gridSize, gridSize);
  const startEndPoints = getStartEndPoints(matrix);
  renderStartEndPoints(scene, startEndPoints);
  const results = await settings.algorithms[settings.algorithm](
    matrix,
    scene,
    startEndPoints
  );
  highlightPath(
    scene,
    results?.mat,
    results?.start,
    results?.end,
    results?.path,
    results?.boxes,
    results?.stopped
  );
};
