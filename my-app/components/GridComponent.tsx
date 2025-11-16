"use client";

import React from "react";
import Image from "next/image";
import WizardR from "@/public/assets/wizard-r.png";

interface GridProps {
  gridSize: number;
  characterPosition: { x: number; y: number };
}

const TOTAL_GRID_DIMENSION = 570; // Total size of the grid in pixels

const GridComponent: React.FC<GridProps> = ({
  gridSize,
  characterPosition,
}) => {
  const tileSize = TOTAL_GRID_DIMENSION / gridSize;

  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const isCharacterHere =
          characterPosition.x === x && characterPosition.y === y;
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
            {isCharacterHere ? <Character /> : null}
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

export default GridComponent;
