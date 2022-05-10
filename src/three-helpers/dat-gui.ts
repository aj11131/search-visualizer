import { GUI } from "dat.gui";
import { settings } from "../state/settings";
import { generateGrid } from "../three-helpers/generate-grid";
import { clearGrids } from "../three-helpers/reset";

export const addDatGui = (scene: THREE.Scene) => {
  const gui = new GUI();
  const searchSettings = gui.addFolder("Search Settings");
  const gridSize = searchSettings.add(settings, "gridSize", 0, 100, 1);

  gridSize.onChange((value: number) => {
    console.log(value);
    clearGrids(scene);
    generateGrid(scene, value);
  });

  searchSettings.open();
};
