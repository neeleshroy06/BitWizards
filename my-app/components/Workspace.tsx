import React, { useState, useEffect, useCallback, useRef } from "react";
import { javascriptGenerator } from "blockly/javascript";
import BlocklyComponent from "@/components/BlocklyComponent";
import GridComponent from "@/components/GridComponent";
import { toast } from "sonner";
import { LevelConfig } from "@/lib/levels";

interface WorkspaceProps {
  levelConfig?: LevelConfig;
  onLevelComplete?: () => void;
}

const defaultPlaygroundLevel: LevelConfig = {
  gridSize: 8,
  obstacles: [],
  rewardPosition: { x: 7, y: 7 },
  startPosition: { x: 0, y: 0 },
};

export default function Workspace({ levelConfig, onLevelComplete }: WorkspaceProps) {
  const currentLevel = levelConfig || defaultPlaygroundLevel;

  const [characterPosition, setCharacterPosition] = useState(
    currentLevel.startPosition,
  );
  const hasWonRef = useRef(false);
  const [stackHeight, setStackHeight] = useState(currentLevel.initialStackHeight || 0);

  useEffect(() => {
    setCharacterPosition(currentLevel.startPosition);
    hasWonRef.current = false;
    setStackHeight(currentLevel.initialStackHeight || 0);
  }, [currentLevel]);

  const isObstacle = useCallback(
    (x: number, y: number) => {
      const isRegularObstacle = currentLevel.obstacles.some(
        (obstacle) => obstacle.x === x && obstacle.y === y,
      );
      const isStackObstacle =
        currentLevel.stackPosition &&
        currentLevel.stackPosition.x === x &&
        currentLevel.stackPosition.y === y &&
        stackHeight > 0;

      return isRegularObstacle || isStackObstacle;
    },
    [currentLevel.obstacles, currentLevel.stackPosition, stackHeight],
  );

  const handleWin = useCallback(() => {
    if (!hasWonRef.current) {
      toast.success("You reached the goal!");
      hasWonRef.current = true;
      if (onLevelComplete) {
        onLevelComplete(); // Call the prop function to advance level/chapter
      }
    }
  }, [onLevelComplete]);

  useEffect(() => {
    if (
      characterPosition.x === currentLevel.rewardPosition.x &&
      characterPosition.y === currentLevel.rewardPosition.y
    ) {
      handleWin();
    }
  }, [characterPosition, currentLevel.rewardPosition, handleWin]);

  const move = useCallback(
    (dx: number, dy: number) => {
      return new Promise<void>((resolve) => {
        setCharacterPosition((prev) => {
          const newX = prev.x + dx;
          const newY = prev.y + dy;

          if (
            newX < 0 ||
            newX >= currentLevel.gridSize ||
            newY < 0 ||
            newY >= currentLevel.gridSize ||
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
    [currentLevel.gridSize, isObstacle],
  );

  const popStack = useCallback(
    async (direction: "up" | "down" | "left" | "right") => {
      if (!currentLevel.stackPosition) {
        toast.error("No stack defined for this level.");
        return;
      }

      let targetX = characterPosition.x;
      let targetY = characterPosition.y;

      switch (direction) {
        case "up":
          targetY -= 1;
          break;
        case "down":
          targetY += 1;
          break;
        case "left":
          targetX -= 1;
          break;
        case "right":
          targetX += 1;
          break;
      }

      if (
        targetX === currentLevel.stackPosition.x &&
        targetY === currentLevel.stackPosition.y
      ) {
        if (stackHeight > 0) {
          setStackHeight((prevHeight) => prevHeight - 1);
          toast.info(`Stack popped! Height: ${stackHeight - 1}`);
        } else {
          toast.warning("Stack is already empty!");
        }
      } else {
        toast.error(`No stack to pop in the ${direction} direction.`);
      }
      await new Promise((resolve) => setTimeout(resolve, 200)); // Small delay for visual feedback
    },
    [characterPosition, currentLevel.stackPosition, stackHeight],
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
      popStack,
    };
  }, [moveUp, moveDown, moveLeft, moveRight, popStack]);

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
          gridSize={currentLevel.gridSize}
          characterPosition={characterPosition}
          obstacles={currentLevel.obstacles}
          rewardPosition={currentLevel.rewardPosition}
          stackPosition={currentLevel.stackPosition}
          stackHeight={stackHeight}
        />
      </div>
    </div>
  );
}

