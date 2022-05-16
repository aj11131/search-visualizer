import { GUI } from "dat.gui";
import { settings } from "../state/settings";
import { generateGrid } from "../three-helpers/generate-grid";
import { clearGrids } from "../three-helpers/reset";

export const addDatGui = (scene: THREE.Scene) => {
  const gui = new GUI();
  const searchSettings = gui.addFolder("Search Settings");
  const gridSize = searchSettings.add(settings, "gridSize", 0, 100, 1);
  searchSettings.add(settings, "speed", 1, 1000, 1);
  searchSettings.add(settings, "dof", { 6: 6, 18: 18, 26: 26 });
  searchSettings.add(settings, "algorithm", { BFS: 1, DFS: 2 });

  gridSize.onChange((value: number) => {
    clearGrids(scene);
    generateGrid(scene, value);
  });

  searchSettings.open();
};
