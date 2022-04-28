import { generateBox } from "./three-helpers/generate-box";
import { createScene } from "./three-helpers/scene";

const scene = createScene();

const delay = async (ms: number) => [
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  }),
];

(async () => {
  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 20; y++) {
      for (let z = 0; z < 20; z++) {
        generateBox(scene, { x, y, z });
        await delay(10);
      }
    }
  }
})();
