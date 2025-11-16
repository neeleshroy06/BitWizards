import React, { useState, useEffect, useCallback } from "react";
import { javascriptGenerator } from "blockly/javascript";
import BlocklyComponent from "@/components/BlocklyComponent";
import GridComponent from "@/components/GridComponent";

export default function Workspace() {
  const gridSize = 8;
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 });

  const moveUp = useCallback(() => {
    return new Promise<void>((resolve) => {
      setCharacterPosition((prev) => ({
        ...prev,
        y: Math.max(0, prev.y - 1),
      }));
      setTimeout(resolve, 200);
    });
  }, []);

  const moveDown = useCallback(() => {
    return new Promise<void>((resolve) => {
      setCharacterPosition((prev) => ({
        ...prev,
        y: Math.min(gridSize - 1, prev.y + 1),
      }));
      setTimeout(resolve, 200);
    });
  }, []);

  const moveLeft = useCallback(() => {
    return new Promise<void>((resolve) => {
      setCharacterPosition((prev) => ({
        ...prev,
        x: Math.max(0, prev.x - 1),
      }));
      setTimeout(resolve, 200);
    });
  }, []);

  const moveRight = useCallback(() => {
    return new Promise<void>((resolve) => {
      setCharacterPosition((prev) => ({
        ...prev,
        x: Math.min(gridSize - 1, prev.x + 1),
      }));
      setTimeout(resolve, 200);
    });
  }, []);

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
      const GeneratorFunction = Object.getPrototypeOf(function* () {}).constructor;
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
        padding: "20px",
        alignItems: "flex-start",
        overflowX: "hidden",
      }}
    >
      <div style={{ flex: 1, paddingLeft: "50px" }}>
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
      <div style={{ flex: 1, paddingLeft: "85px" }}>
        <GridComponent
          gridSize={gridSize}
          characterPosition={characterPosition}
        />
      </div>
    </div>
  );
}
