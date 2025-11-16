"use client";

import SidebarGlobal from "@/components/SidebarGlobal";
import Workspace from "@/components/Workspace";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const { slug } = useParams<{ slug: string }>();
  console.log(slug);

  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");

  useEffect(() => {
    switch (slug) {
      case "arithmetic":
        setTitle("Introduction to Arithmetic");
        setDescr("Learn how to move around the world.");
        break;
      case "conditionals":
        setTitle("Introduction to Conditionals");
        setDescr("Explore logical operations and conditions in programming.");
        break;
      case "loops":
        setTitle("Introduction to Loops");
        setDescr("Understand how to repeat actions using loops.");
        break;
      case "sorts":
        setTitle("Introduction to Sorts");
        setDescr("Discover different algorithms to sort data efficiently.");
        break;
    }
  }, [slug]);
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div>
        <SidebarGlobal />
      </div>
      <div className="flex-1  flex flex-col">
        <Workspace />
        <div className="p-4 border-t">
          <h1 className="font-bold">{title}</h1>
          <p>Welcome traveler! {descr}</p>
        </div>
      </div>
    </div>
  );
}
