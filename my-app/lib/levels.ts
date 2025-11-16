export interface LevelConfig {
  gridSize: number;
  obstacles: { x: number; y: number }[];
  rewardPosition: { x: number; y: number };
  startPosition: { x: number; y: number };
}

export interface Chapter {
  name: string;
  levels: LevelConfig[];
}

export const chapters: { [key: string]: Chapter } = {
  arithmetic: {
    name: "Arithmetic",
    levels: [
      {
        gridSize: 8,
        obstacles: [
          { x: 1, y: 1 },
          { x: 2, y: 3 },
          { x: 4, y: 2 },
          { x: 5, y: 5 },
          { x: 6, y: 1 },
        ],
        rewardPosition: { x: 3, y: 3 },
        startPosition: { x: 0, y: 0 },
      },
      {
        gridSize: 8,
        obstacles: [
          { x: 0, y: 1 },
          { x: 1, y: 2 },
          { x: 3, y: 4 },
          { x: 5, y: 0 },
        ],
        rewardPosition: { x: 7, y: 7 },
        startPosition: { x: 0, y: 0 },
      },
    ],
  },
  conditionals: {
    name: "Conditionals",
    levels: [
      {
        gridSize: 8,
        obstacles: [
          { x: 1, y: 2 },
          { x: 2, y: 4 },
          { x: 3, y: 1 },
          { x: 5, y: 6 },
          { x: 7, y: 3 },
        ],
        rewardPosition: { x: 6, y: 5 },
        startPosition: { x: 0, y: 7 },
      },
      {
        gridSize: 8,
        obstacles: [
          { x: 1, y: 0 },
          { x: 2, y: 2 },
          { x: 4, y: 1 },
          { x: 6, y: 3 },
        ],
        rewardPosition: { x: 0, y: 0 },
        startPosition: { x: 7, y: 7 },
      },
    ],
  },
  loops: {
    name: "Loops",
    levels: [
      {
        gridSize: 8,
        obstacles: [
          { x: 0, y: 3 },
          { x: 1, y: 5 },
          { x: 2, y: 2 },
          { x: 4, y: 6 },
          { x: 6, y: 4 },
        ],
        rewardPosition: { x: 7, y: 1 },
        startPosition: { x: 0, y: 0 },
      },
      {
        gridSize: 8,
        obstacles: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 },
        ],
        rewardPosition: { x: 5, y: 5 },
        startPosition: { x: 0, y: 7 },
      },
    ],
  },
  sorts: {
    name: "Sorts",
    levels: [
      {
        gridSize: 8,
        obstacles: [
          { x: 1, y: 1 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 0 },
          { x: 5, y: 2 },
        ],
        rewardPosition: { x: 7, y: 7 },
        startPosition: { x: 0, y: 0 },
      },
      {
        gridSize: 8,
        obstacles: [
          { x: 7, y: 1 },
          { x: 6, y: 3 },
          { x: 5, y: 5 },
          { x: 4, y: 7 },
        ],
        rewardPosition: { x: 0, y: 0 },
        startPosition: { x: 7, y: 7 },
      },
    ],
  },
};
