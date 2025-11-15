"use client";

import Sidebar, { SidebarItem } from "../../../components/sidebar";
import { Home, Settings, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const { slug } = useParams<{ slug: string }>(); // <-- FIX
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
      <Sidebar>
        <SidebarItem icon={<Home size={20} />} text="Home" href="/home" />
        <SidebarItem
          icon={<BookOpen size={20} />}
          text="Course Progress"
          subItems={[
            { text: "loops", href: "/course/loops" },
            { text: "logic", href: "/course/logic" },
            { text: "sorting", href: "/course/sorting" },
            { text: "custom", href: "/course/custom" },
          ]}
        />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Settings"
          href="/settings"
        />
      </Sidebar>

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
    </div>
  );
}
