export interface LevelConfig {
  gridSize: number;
  obstacles: { x: number; y: number }[];
  rewardPosition: { x: number; y: number };
  startPosition: { x: number; y: number };
  stackPosition?: { x: number; y: number }; // Optional stack position
  initialStackHeight?: number; // Optional initial stack height (1-4)
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
        gridSize: 4,
        obstacles: [
          { x: 1, y: 1 },
          { x: 2, y: 3 },
          { x: 3, y: 2 },
        ],
        rewardPosition: { x: 3, y: 3 },
        startPosition: { x: 0, y: 0 }
      },
      {
        gridSize: 6,
        obstacles: [
          { x: 1, y: 1 },
          { x: 2, y: 3 },
          { x: 4, y: 2 },
          { x: 5, y: 5 },
        ],
        rewardPosition: { x: 4, y: 3 },
        startPosition: { x: 0, y: 0 }
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
        gridSize: 4,
        obstacles: [
          { x: 1, y: 2 },
          { x: 2, y: 0 },
          { x: 3, y: 0 },
          { x: 3, y: 1 },
          { x: 2, y: 3 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 0, y: 3 },
          { x: 1, y: 3 },

        ],
        rewardPosition: { x: 3, y: 3 },
        startPosition: { x: 0, y: 0 },
      },
      {
        gridSize: 6,
        obstacles: [
          { x: 1, y: 0 },
          { x: 2, y: 2 },
          { x: 4, y: 1 },
          { x: 3, y: 3 },
        ],
        rewardPosition: { x: 7, y: 7 },
        startPosition: { x: 0, y: 0 },
      },
      {
        gridSize: 8,
        obstacles: [
          { x: 1, y: 2 },
          { x: 2, y: 4 },
          { x: 3, y: 1 },
          { x: 5, y: 6 },
          { x: 7, y: 3 },
          { x: 7, y: 6 },
          { x: 6, y: 4 },
          { x: 4, y: 2 },
          { x: 2, y: 0 },
        ],
        rewardPosition: { x: 7, y: 3 },
        startPosition: { x: 0, y: 0 },        
        stackPosition: { x: 5, y: 4 },
        initialStackHeight: 4,
      },
    ],
  },
  loops: {
    name: "Data Structures",
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
};
