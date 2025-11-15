"use client";

import Sidebar, { SidebarItem } from '../../../components/sidebar';
import { Home, Settings, BookOpen } from 'lucide-react';

export default function SortingPage() {
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
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Sorting</h1>
        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Introduction to Sorting</h2>
            <p className="text-gray-600 mb-4">
              Learn different sorting algorithms and when to use them.
            </p>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-700">
                Sorting is a fundamental concept in computer science that helps organize data efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

