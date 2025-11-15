"use client";

import Sidebar, { SidebarItem } from '../../components/sidebar';
import { Home, Settings, BookOpen } from 'lucide-react';

export default function ProfilePage() {
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
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        <div className="max-w-2xl space-y-6">
          <div className="p-6 border rounded-lg">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                alt="Profile"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h2 className="text-2xl font-semibold">John Doe</h2>
                <p className="text-gray-600">johndoe@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="John Doe"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  defaultValue="johndoe@gmail.com"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

