"use client";

import React from "react";
import Image from "next/image";
import ObstacleImg from "@/public/assets/obstacle.png";
import RewardImg from "@/public/assets/reward.png";
import WizardR from "@/public/assets/wizard-r.png";

interface GridProps {
  gridSize: number;
  characterPosition: { x: number; y: number };
  obstacles: { x: number; y: number }[];
  rewardPosition: { x: number; y: number };
}

const TOTAL_GRID_DIMENSION = 570; // Total size of the grid in pixels

const GridComponent: React.FC<GridProps> = ({
  gridSize,
  characterPosition,
  obstacles,
  rewardPosition,
}) => {
  const tileSize = TOTAL_GRID_DIMENSION / gridSize;

  const isObstacle = (x: number, y: number) => {
    return obstacles.some((obstacle) => obstacle.x === x && obstacle.y === y);
  };

  const isReward = (x: number, y: number) => {
    return rewardPosition.x === x && rewardPosition.y === y;
  };

  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const isCharacterHere =
          characterPosition.x === x && characterPosition.y === y;

        let cellContent = null;
        if (isCharacterHere) {
          cellContent = <Character />;
        } else if (isReward(x, y)) {
          cellContent = <Reward />;
        } else if (isObstacle(x, y)) {
          cellContent = <Obstacle />;
        }

        cells.push(
          <div
            key={`${x}-${y}`}
            style={{
              backgroundImage: "url('/grass.png')",
              width: `${tileSize}px`,
              height: `${tileSize}px`,
              border: "1px solid #ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {cellContent}
          </div>,
        );
      }
    }
    return cells;
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridSize}, ${tileSize}px)`,
        border: "1px solid #000",
        width: `${TOTAL_GRID_DIMENSION}px`,
        height: `${TOTAL_GRID_DIMENSION}px`,
      }}
    >
      {renderGrid()}
    </div>
  );
};

const Character = () => {
  return (
    <div>
      <Image src={WizardR} alt="Wizard" />{" "}
    </div>
  );
};

const Reward = () => {
  return (
    <div>
      <Image src={RewardImg} alt="Reward" />
    </div>
  );
};

const Obstacle = () => {
  return (
    <div>
      <Image src={ObstacleImg} alt="Obstacle" />
    </div>
  );
};

export default GridComponent;
