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
        setDescr("Learn how to use loops to repeat actions in your code.");
        break;
      case "conditionals":
        setTitle("Introduction to Conditionals");
        setDescr("Explore logical operations and conditions in programming.");
        break;
      case "loops":
        setTitle("Introduction to Loops");
        setDescr("Discover different algorithms to sort data efficiently.");
        break;
      case "sorts":
        setTitle("Introduction to Sorts");
        setDescr("Create your own learning path with custom modules.");
        break;
    }
  }, [slug]);
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div>
        <SidebarGlobal />
      </div>
      <div className="flex-1 flex flex-col">
        <Workspace />
        <div className="border-t">
          <p>Welcome traveler!</p>
        </div>
      </div>
    </div>
  );
}
