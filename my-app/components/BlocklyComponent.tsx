"use client";

import { useEffect, useRef } from 'react';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript';
import { javascriptGenerator } from 'blockly/javascript';

// Define custom blocks
const customBlocks = [
  {
    "type": "move_forward",
    "message0": "move forward",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Moves the character one step forward.",
    "helpUrl": ""
  },
  {
    "type": "turn_left",
    "message0": "turn left",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Turns the character 90 degrees to the left.",
    "helpUrl": ""
  },
  {
    "type": "turn_right",
    "message0": "turn right",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Turns the character 90 degrees to the right.",
    "helpUrl": ""
  }
];

// Define code generation for custom blocks
javascriptGenerator.forBlock['move_forward'] = function(block) {
  return 'window.api.moveForward();\n';
};

javascriptGenerator.forBlock['turn_left'] = function(block) {
  return 'window.api.turnLeft();\n';
};

javascriptGenerator.forBlock['turn_right'] = function(block) {
  return 'window.api.turnRight();\n';
};

const BlocklyComponent = () => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const toolbox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (blocklyDiv.current) {
      Blockly.defineBlocksWithJsonArray(customBlocks);

      const workspace = Blockly.inject(blocklyDiv.current, {
        toolbox: {
          "kind": "flyoutToolbox",
          "contents": [
            {
              "kind": "block",
              "type": "move_forward"
            },
            {
              "kind": "block",
              "type": "turn_left"
            },
            {
              "kind": "block",
              "type": "turn_right"
            }
          ]
        }
      });

      (window as any).workspace = workspace;
    }
  }, []);

  return <div ref={blocklyDiv} style={{ height: '480px', width: '100%' }} />;
};

export default BlocklyComponent;
