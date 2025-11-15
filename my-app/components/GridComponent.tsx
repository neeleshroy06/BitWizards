"use client";

import React from 'react';

interface GridProps {
  gridSize: number;
  characterPosition: { x: number; y: number };
  characterDirection: string;
}

const GridComponent: React.FC<GridProps> = ({ gridSize, characterPosition, characterDirection }) => {
  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const isCharacterHere = characterPosition.x === x && characterPosition.y === y;
        cells.push(
          <div
            key={`${x}-${y}`}
            style={{
              width: '40px',
              height: '40px',
              border: '1px solid #ccc',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {isCharacterHere ? <Character direction={characterDirection} /> : null}
          </div>
        );
      }
    }
    return cells;
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 40px)`,
        border: '1px solid #000',
        width: 'fit-content',
      }}
    >
      {renderGrid()}
    </div>
  );
};

const Character = ({ direction }: { direction: string }) => {
  const getRotation = () => {
    switch (direction) {
      case 'north':
        return '0deg';
      case 'east':
        return '90deg';
      case 'south':
        return '180deg';
      case 'west':
        return '270deg';
      default:
        return '0deg';
    }
  };

  return (
    <div style={{ transform: `rotate(${getRotation()})` }}>
      ▲
    </div>
  );
};

export default GridComponent;
