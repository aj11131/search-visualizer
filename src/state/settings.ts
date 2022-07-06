import { breadthFirstSearch } from "../algorithms/bfs";
import { depthFirstSearch } from "../algorithms/dfs";

interface Settings {
  gridSize: number;
  algorithm: number;
  algorithms: {
    [index: number]: Function;
  };
  speed: number;
  pause: boolean;
  stop: boolean;
  dof: number;
  obstacleDensity: number;
}

export const settings: Settings = {
  gridSize: 10,
  algorithm: 1,
  algorithms: {
    1: breadthFirstSearch,
    2: depthFirstSearch,
  },
  speed: 10,
  pause: false,
  stop: false,
  dof: 6,
  obstacleDensity: 0,
};
