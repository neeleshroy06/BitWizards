"use client";

import React, { useState, useEffect, useCallback } from 'react';
import BlocklyComponent from '../../components/BlocklyComponent';
import GridComponent from '../../components/GridComponent';
import { javascriptGenerator } from 'blockly/javascript';

const HomePage = () => {
  const gridSize = 5;
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 });
  const [characterDirection, setCharacterDirection] = useState('north');

  const moveForward = useCallback(() => {
    setCharacterPosition(prev => {
      let { x, y } = prev;
      switch (characterDirection) {
        case 'north':
          y = Math.max(0, y - 1);
          break;
        case 'south':
          y = Math.min(gridSize - 1, y + 1);
          break;
        case 'east':
          x = Math.min(gridSize - 1, x + 1);
          break;
        case 'west':
          x = Math.max(0, x - 1);
          break;
      }
      return { x, y };
    });
  }, [characterDirection]);

  const turnLeft = useCallback(() => {
    setCharacterDirection(prev => {
      switch (prev) {
        case 'north':
          return 'west';
        case 'west':
          return 'south';
        case 'south':
          return 'east';
        case 'east':
          return 'north';
        default:
          return prev;
      }
    });
  }, []);

  const turnRight = useCallback(() => {
    setCharacterDirection(prev => {
      switch (prev) {
        case 'north':
          return 'east';
        case 'east':
          return 'south';
        case 'south':
          return 'west';
        case 'west':
          return 'north';
        default:
          return prev;
      }
    });
  }, []);

  useEffect(() => {
    (window as any).api = {
      moveForward,
      turnLeft,
      turnRight,
    };
  }, [moveForward, turnLeft, turnRight]);

  const runCode = () => {
    const code = javascriptGenerator.workspaceToCode((window as any).workspace);
    try {
      eval(code);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        <BlocklyComponent />
        <button onClick={runCode} style={{ marginTop: '10px', padding: '10px 20px' }}>
          Run Code
        </button>
      </div>
      <div style={{ flex: 1 }}>
        <GridComponent
          gridSize={gridSize}
          characterPosition={characterPosition}
          characterDirection={characterDirection}
        />
      </div>
    </div>
  );
};

export default HomePage;
