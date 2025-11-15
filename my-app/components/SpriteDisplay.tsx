"use client";

import { useEffect, useRef } from "react";
import { Application, Container, Sprite, Spritesheet, Assets } from "pixi.js";

export default function SpriteDisplay() {
  const spriteData = {
    meta: {
      image: "/assets/rogues.png",
      size: { w: 128, h: 32 },
      scale: "1",
    },
    frames: {
      rogue_idle_0: {
        frame: { x: 0, y: 0, w: 32, h: 32 },
        sourceSize: { w: 32, h: 32 },
        spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
      },
    },
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let app: Application;

    async function initPixi() {
      if (!containerRef.current) return;

      app = new Application();
      await app.init({
        resizeTo: window,
        backgroundAlpha: 0,
      });

      containerRef.current.appendChild(app.canvas);

      const container = new Container();
      app.stage.addChild(container);

      // Load the image as a Texture (Pixi v8 way)
      const texture = await Assets.load("/assets/rogues.png");

      // Create the spritesheet from the loaded texture
      const spriteSheet = new Spritesheet(texture, spriteData);

      // Parse the sheet (build textures)
      await spriteSheet.parse();

      const frameTexture = spriteSheet.textures["rogue_idle_0"];
      const sprite = new Sprite(frameTexture);

      sprite.x = 100;
      sprite.y = 100;
      sprite.scale.set(2);

      container.addChild(sprite);
    }

    initPixi();

    return () => {
      if (app) app.destroy(true);
    };
  }, []);

  return <div ref={containerRef} />;
}
