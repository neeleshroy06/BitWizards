import React, { useState, useEffect, useCallback } from "react";
import { javascriptGenerator } from "blockly/javascript";
import BlocklyComponent from "@/components/BlocklyComponent";
import GridComponent from "@/components/GridComponent";
import { toast } from "sonner";

const gridSize = 8;
const level = {
  obstacles: [
    { x: 1, y: 1 },
    { x: 2, y: 3 },
    { x: 4, y: 2 },
    { x: 5, y: 5 },
    { x: 6, y: 1 },
  ],
  rewardPosition: { x: 3, y: 3 },
};

const isObstacle = (x: number, y: number) => {
  return level.obstacles.some(
    (obstacle) => obstacle.x === x && obstacle.y === y,
  );
};

export default function Workspace() {
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 });

  const handleWin = () => {
    toast.success("You reached the goal!");
  };

  const move = useCallback((dx: number, dy: number) => {
    return new Promise<void>((resolve) => {
      setCharacterPosition((prev) => {
        const newX = prev.x + dx;
        const newY = prev.y + dy;

        if (
          newX < 0 ||
          newX >= gridSize ||
          newY < 0 ||
          newY >= gridSize ||
          isObstacle(newX, newY)
        ) {
          // Invalid move, don't change position
          return prev;
        }

        if (
          newX === level.rewardPosition.x &&
          newY === level.rewardPosition.y
        ) {
          handleWin();
        }

        return { x: newX, y: newY };
      });
      setTimeout(resolve, 200);
    });
  }, []);

  const moveUp = useCallback(() => move(0, -1), [move]);
  const moveDown = useCallback(() => move(0, 1), [move]);
  const moveLeft = useCallback(() => move(-1, 0), [move]);
  const moveRight = useCallback(() => move(1, 0), [move]);

  useEffect(() => {
    (window as any).api = {
      moveUp,
      moveDown,
      moveLeft,
      moveRight,
    };
  }, [moveUp, moveDown, moveLeft, moveRight]);

  const runCode = () => {
    if (typeof window !== "undefined" && (window as any).loopTrap) {
      (window as any).loopTrap.iterations = 1000;
    }
    const code = javascriptGenerator.workspaceToCode((window as any).workspace);

    try {
      const GeneratorFunction = Object.getPrototypeOf(
        function* () {},
      ).constructor;
      const generator = new GeneratorFunction(code)();

      const runGenerator = (gen: Generator) => {
        const { value, done } = gen.next();
        if (done) {
          return;
        }
        Promise.resolve(value).then(() => {
          runGenerator(gen);
        });
      };

      runGenerator(generator);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div
      className="flex-1 flex"
      style={{
        padding: "10px",
        alignItems: "flex-start",
        overflowX: "hidden",
      }}
    >
      <div style={{ flex: 1, paddingLeft: "20px" }}>
        <BlocklyComponent />
        <button
          onClick={runCode}
          style={{
            position: "absolute",
            transform: "translateY(-55px)",
            zIndex: 999,
            marginTop: "10px",
            padding: "10px 8px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Run Code
        </button>
      </div>
      <div style={{ flex: 1, paddingLeft: "20px" }}>
        <GridComponent
          gridSize={gridSize}
          characterPosition={characterPosition}
          obstacles={level.obstacles}
          rewardPosition={level.rewardPosition}
        />
      </div>
    </div>
  );
}
