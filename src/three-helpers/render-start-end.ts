import { Position } from "../interfaces";
import { generateBox } from "./generate-box";

export const renderStartEndPoints = (
  scene: THREE.Scene,
  startEndPoints: { start: Position; end: Position }
) => {
  const { start, end } = startEndPoints;

  generateBox(scene, start, { color: "#00FF00" });
  generateBox(scene, end, { color: "#FF0000" });
};
