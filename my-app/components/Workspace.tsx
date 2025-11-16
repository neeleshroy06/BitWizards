import React, { useState, useEffect, useCallback, useRef } from "react";
import { javascriptGenerator } from "blockly/javascript";
import BlocklyComponent from "@/components/BlocklyComponent";
import GridComponent from "@/components/GridComponent";
import { toast } from "sonner";
import { LevelConfig } from "@/lib/levels";

interface WorkspaceProps {
  levelConfig: LevelConfig;
  onLevelComplete: () => void;
}

export default function Workspace({ levelConfig, onLevelComplete }: WorkspaceProps) {
  const [characterPosition, setCharacterPosition] = useState(
    levelConfig.startPosition,
  );
  const hasWonRef = useRef(false);

  useEffect(() => {
    setCharacterPosition(levelConfig.startPosition);
    hasWonRef.current = false;
  }, [levelConfig]);

  const isObstacle = useCallback(
    (x: number, y: number) => {
      return levelConfig.obstacles.some(
        (obstacle) => obstacle.x === x && obstacle.y === y,
      );
    },
    [levelConfig.obstacles],
  );

  const handleWin = useCallback(() => {
    if (!hasWonRef.current) {
      toast.success("You reached the goal!");
      hasWonRef.current = true;
      onLevelComplete(); // Call the prop function to advance level/chapter
    }
  }, [onLevelComplete]);

  useEffect(() => {
    if (
      characterPosition.x === levelConfig.rewardPosition.x &&
      characterPosition.y === levelConfig.rewardPosition.y
    ) {
      handleWin();
    }
  }, [characterPosition, levelConfig.rewardPosition, handleWin]);

  const move = useCallback(
    (dx: number, dy: number) => {
      return new Promise<void>((resolve) => {
        setCharacterPosition((prev) => {
          const newX = prev.x + dx;
          const newY = prev.y + dy;

          if (
            newX < 0 ||
            newX >= levelConfig.gridSize ||
            newY < 0 ||
            newY >= levelConfig.gridSize ||
            isObstacle(newX, newY)
          ) {
            // Invalid move, don't change position
            return prev;
          }

          return { x: newX, y: newY };
        });
        setTimeout(resolve, 200);
      });
    },
    [levelConfig.gridSize, isObstacle],
  );

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
    const code = javascriptGenerator.workspaceToCode(
      (window as any).workspace,
    );

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
          gridSize={levelConfig.gridSize}
          characterPosition={characterPosition}
          obstacles={levelConfig.obstacles}
          rewardPosition={levelConfig.rewardPosition}
        />
      </div>
    </div>
  );
}

