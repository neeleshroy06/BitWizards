"use client";

import SidebarGlobal from "@/components/SidebarGlobal";
import Workspace from "@/components/Workspace";

const HomePage = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div>
        <SidebarGlobal />
      </div>
      <div className="flex-1  flex flex-col">
        <Workspace />
        <div className="p-4 border-t">
          <h1 className="font-bold">Playground Mode</h1>
          <p>
            Welcome to the playground! Mix and match different blocks and reach
            the potion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
