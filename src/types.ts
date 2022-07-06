export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface SearchResults {
  mat: number[][][];
  start: Position;
  end: Position;
  path: { [index: number]: { position: Position; level: number } };
  boxes: { [index: number]: number };
  stopped: boolean;
}
