"use client";

import SidebarGlobal from "@/components/SidebarGlobal";
import { Home, Settings, BookOpen } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SidebarGlobal />
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
            <p className="text-gray-600">Manage your account preferences here.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Preferences</h2>
            <p className="text-gray-600">Customize your experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

