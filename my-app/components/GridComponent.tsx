"use client";

import React from "react";

interface GridProps {
  gridSize: number;
  characterPosition: { x: number; y: number };
  characterDirection: string;
}

const TOTAL_GRID_DIMENSION = 600; // Total size of the grid in pixels

const GridComponent: React.FC<GridProps> = ({
  gridSize,
  characterPosition,
  characterDirection,
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
            {isCharacterHere ? (
              <Character direction={characterDirection} />
            ) : null}
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

const Character = ({ direction }: { direction: string }) => {
  const getRotation = () => {
    switch (direction) {
      case "north":
        return "0deg";
      case "east":
        return "90deg";
      case "south":
        return "180deg";
      case "west":
        return "270deg";
      default:
        return "0deg";
    }
  };

  return <div style={{ transform: `rotate(${getRotation()})` }}>▲ </div>;
};

export default GridComponent;
