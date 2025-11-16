"use client";

import { useEffect, useRef } from "react";
import * as Blockly from "blockly/core";
import "blockly/blocks";
import "blockly/javascript";
import { javascriptGenerator } from "blockly/javascript";
import { toast } from "sonner";

// Infinite loop protection
const MAX_ITERATIONS = 1000;
if (typeof window !== "undefined") {
  (window as any).loopTrap = function () {
    if ((window as any).loopTrap.iterations-- < 0) {
      toast.warning("An infinite look was detected!", {
        description: "Please check your code and try again.",
      });
      throw new Error("Infinite loop.");
    }
  };
}
javascriptGenerator.INFINITE_LOOP_TRAP =
  "if (window.loopTrap) window.loopTrap();\n";

// Define custom blocks
const customBlocks = [
  {
    type: "start_block",
    message0: "start",
    nextStatement: null,
    colour: 120,
    tooltip: "The starting point for your code.",
    helpUrl: "",
  },
  {
    type: "move_up",
    message0: "move up",
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "Moves the character one step up.",
    helpUrl: "",
  },
  {
    type: "move_down",
    message0: "move down",
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "Moves the character one step down.",
    helpUrl: "",
  },
  {
    type: "move_left",
    message0: "move left",
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "Moves the character one step left.",
    helpUrl: "",
  },
  {
    type: "move_right",
    message0: "move right",
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "Moves the character one step right.",
    helpUrl: "",
  },
  {
    type: "controls_whileUntil",
    message0: "%1 %2",
    args0: [
      {
        type: "field_dropdown",
        name: "MODE",
        options: [
          ["while", "WHILE"],
          ["until", "UNTIL"],
        ],
      },
      {
        type: "input_value",
        name: "BOOL",
        check: "Boolean",
      },
    ],
    message1: "do %1",
    args1: [
      {
        type: "input_statement",
        name: "DO",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    tooltip: "While a value is true, then do some statements.",
    helpUrl: "",
  },
  {
    type: "logic_compare",
    message0: "%1 %2 %3",
    args0: [
      {
        type: "input_value",
        name: "A",
      },
      {
        type: "field_dropdown",
        name: "OP",
        options: [
          ["=", "EQ"],
          ["≠", "NEQ"],
          ["<", "LT"],
          ["≤", "LTE"],
          [">", "GT"],
          ["≥", "GTE"],
        ],
      },
      {
        type: "input_value",
        name: "B",
      },
    ],
    inputsInline: true,
    output: "Boolean",
    colour: 210,
    helpUrl: "",
  },
  {
    type: "logic_operation",
    message0: "%1 %2 %3",
    args0: [
      {
        type: "input_value",
        name: "A",
        check: "Boolean",
      },
      {
        type: "field_dropdown",
        name: "OP",
        options: [
          ["and", "AND"],
          ["or", "OR"],
        ],
      },
      {
        type: "input_value",
        name: "B",
        check: "Boolean",
      },
    ],
    inputsInline: true,
    output: "Boolean",
    colour: 210,
    helpUrl: "",
  },
  {
    type: "logic_negate",
    message0: "not %1",
    args0: [
      {
        type: "input_value",
        name: "BOOL",
        check: "Boolean",
      },
    ],
    output: "Boolean",
    colour: 210,
    helpUrl: "",
  },
  {
    type: "logic_boolean",
    message0: "%1",
    args0: [
      {
        type: "field_dropdown",
        name: "BOOL",
        options: [
          ["true", "TRUE"],
          ["false", "FALSE"],
        ],
      },
    ],
    output: "Boolean",
    colour: 210,
    helpUrl: "",
  },
  {
    type: "simple_if",
    message0: "if %1 then",
    args0: [
      {
        type: "input_value",
        name: "CONDITION",
        check: "Boolean",
      },
    ],
    message1: "%1",
    args1: [
      {
        type: "input_statement",
        name: "DO",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
    tooltip: "If the condition is true, then do the statements.",
    helpUrl: "",
  },
];

// Define code generation for custom blocks
javascriptGenerator.forBlock["start_block"] = function (block) {
  return ""; // No code for the start block itself
};

javascriptGenerator.forBlock["move_up"] = function (block) {
  return "yield window.api.moveUp();\n";
};

javascriptGenerator.forBlock["move_down"] = function (block) {
  return "yield window.api.moveDown();\n";
};

javascriptGenerator.forBlock["move_left"] = function (block) {
  return "yield window.api.moveLeft();\n";
};

javascriptGenerator.forBlock["move_right"] = function (block) {
  return "yield window.api.moveRight();\n";
};



javascriptGenerator.forBlock["simple_if"] = function (block) {
  const condition =
    javascriptGenerator.valueToCode(
      block,
      "CONDITION",
      javascriptGenerator.ORDER_ATOMIC,
    ) || "false";
  const branch = javascriptGenerator.statementToCode(block, "DO");
  const code = `if (${condition}) {\n${branch}}\n`;
  return code;
};


const BlocklyComponent = () => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const toolbox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let workspace: Blockly.WorkspaceSvg | null = null;
    const blocklyDivEl = blocklyDiv.current;
    let toolboxDiv: HTMLDivElement | null = null;

    // Inject custom styles
    const style = document.createElement("style");
    style.innerHTML = `
      .blocklyTreeLabel {
        font-family: 'Helvetica', 'Arial', sans-serif;
        font-weight: bold;
        font-size: 1.1rem;
      }
      /* Hide the default scrollbar */
      .blocklyToolboxDiv::-webkit-scrollbar {
        display: none;
      }
      .blocklyToolboxDiv {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
        overflow-y: auto;
      }
    `;
    document.head.appendChild(style);

    // Wheel listener for the main workspace (panning)
    const onWorkspaceWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (workspace) {
        workspace.scroll(
          workspace.scrollX + e.deltaX,
          workspace.scrollY + e.deltaY,
        );
      }
    };

    // Wheel listener for the toolbox (scrolling)
    const onToolboxWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation(); // Prevent workspace listener from firing
      if (toolboxDiv) {
        toolboxDiv.scrollTop += e.deltaY;
      }
    };

    if (blocklyDivEl) {
      Blockly.defineBlocksWithJsonArray(customBlocks);

      workspace = Blockly.inject(blocklyDivEl, {
        toolbox: {
          kind: "categoryToolbox",
          contents: [
            {
              kind: "category",
              name: "Custom",
              contents: [
                { kind: "block", type: "start_block" },
                { kind: "block", type: "move_up" },
                { kind: "block", type: "move_down" },
                { kind: "block", type: "move_left" },
                { kind: "block", type: "move_right" },
              ],
            },
            {
              kind: "sep",
            },
            {
              kind: "category",
              name: "Logic",
              contents: [
                { kind: "block", type: "simple_if" },
                { kind: "block", type: "logic_compare" },
                { kind: "block", type: "logic_operation" },
                { kind: "block", type: "logic_negate" },
                { kind: "block", type: "logic_boolean" },
              ],
            },
            {
              kind: "category",
              name: "Loops",
              contents: [{ kind: "block", type: "controls_whileUntil" }],
            },
            {
              kind: "category",
              name: "Text",
              contents: [
                {
                  kind: "block",
                  type: "text",
                },
              ],
            },
            {
              kind: "category",
              name: "Math",
              contents: [
                {
                  kind: "block",
                  type: "math_number",
                },
              ],
            },
          ],
        },
      });

      (window as any).workspace = workspace;

      // Add wheel listeners
      blocklyDivEl.addEventListener("wheel", onWorkspaceWheel, {
        passive: false,
      });
      toolboxDiv = (workspace.getToolbox() as any).HtmlDiv;
      if (toolboxDiv) {
        toolboxDiv.addEventListener("wheel", onToolboxWheel, {
          passive: false,
        });
      }
    }

    return () => {
      if (workspace) {
        workspace.dispose();
      }
      document.head.removeChild(style);
      if (blocklyDivEl) {
        blocklyDivEl.removeEventListener("wheel", onWorkspaceWheel);
      }
      if (toolboxDiv) {
        toolboxDiv.removeEventListener("wheel", onToolboxWheel);
      }
    };
  }, []);

  return <div ref={blocklyDiv} style={{ height: "600px", width: "100%" }} />;
};

export default BlocklyComponent;
