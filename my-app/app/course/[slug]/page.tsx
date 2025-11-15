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
      case "loops":
        setTitle("Introduction to Loops");
        setDescr("Learn how to use loops to repeat actions in your code.");
        break;
      case "logic":
        setTitle("Understanding Logic");
        setDescr("Explore logical operations and conditions in programming.");
        break;
      case "sorting":
        setTitle("Sorting Algorithms");
        setDescr("Discover different algorithms to sort data efficiently.");
        break;
      case "custom":
        setTitle("Custom Course");
        setDescr("Create your own learning path with custom modules.");
        break;
    }
  }, [slug]);
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SidebarGlobal />
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-700">{descr}</p>
            </div>
          </div>
        </div>
      </div>
      <Workspace />
    </div>
  );
}
