"use client";

import SidebarGlobal from "@/components/SidebarGlobal";
import Workspace from "@/components/Workspace";

const HomePage = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SidebarGlobal />
      <Workspace />
    </div>
  );
};

export default HomePage;
