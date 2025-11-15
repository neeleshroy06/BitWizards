"use client";

import React, { useState, useEffect, useCallback } from "react";
import BlocklyComponent from "../../components/BlocklyComponent";
import GridComponent from "../../components/GridComponent";
import { javascriptGenerator } from "blockly/javascript";
import Sidebar, { SidebarItem } from "../../components/sidebar";
import { Home, Settings, BookOpen } from "lucide-react";

const HomePage = () => {
  const gridSize = 8;
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 });
  const [characterDirection, setCharacterDirection] = useState("east");

  const moveForward = useCallback(() => {
    setCharacterPosition((prev) => {
      let { x, y } = prev;
      switch (characterDirection) {
        case "north":
          y = Math.max(0, y - 1);
          break;
        case "south":
          y = Math.min(gridSize - 1, y + 1);
          break;
        case "east":
          x = Math.min(gridSize - 1, x + 1);
          break;
        case "west":
          x = Math.max(0, x - 1);
          break;
      }
      return { x, y };
    });
  }, [characterDirection]);

  const turnLeft = useCallback(() => {
    setCharacterDirection((prev) => {
      switch (prev) {
        case "north":
          return "west";
        case "west":
          return "south";
        case "south":
          return "east";
        case "east":
          return "north";
        default:
          return prev;
      }
    });
  }, []);

  const turnRight = useCallback(() => {
    setCharacterDirection((prev) => {
      switch (prev) {
        case "north":
          return "east";
        case "east":
          return "south";
        case "south":
          return "west";
        case "west":
          return "north";
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
    if (typeof window !== "undefined" && (window as any).loopTrap) {
      (window as any).loopTrap.iterations = 1000;
    }
    const code = javascriptGenerator.workspaceToCode((window as any).workspace);
    try {
      eval(code);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar>
        <SidebarItem 
          icon={<Home size={20} />} 
          text="Home" 
          href="/home"
        />
        <SidebarItem 
          icon={<BookOpen size={20} />} 
          text="Course Progress" 
          subItems={[
            { text: "loops", href: "/course/loops" },
            { text: "logic", href: "/course/logic" },
            { text: "sorting", href: "/course/sorting" },
            { text: "custom", href: "/course/custom" }
          ]}
        />
        <SidebarItem 
          icon={<Settings size={20} />} 
          text="Settings" 
          href="/settings"
        />
      </Sidebar>
      <div
        className="flex-1 flex"
        style={{
          padding: "20px",
          alignItems: "flex-start",
          overflowX: "hidden",
        }}
      >
        <div style={{ flex: 1, paddingTop: "50px", paddingLeft: "50px" }}>
          <BlocklyComponent />
          <button
            onClick={runCode}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
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
        <div style={{ flex: 1, paddingTop: "50px", paddingLeft: "85px" }}>
          <GridComponent
            gridSize={gridSize}
            characterPosition={characterPosition}
            characterDirection={characterDirection}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

