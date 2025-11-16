import Sidebar, { SidebarItem } from "@/components/sidebar";
import { Home, Settings, BookOpen } from "lucide-react";

export default function SidebarGlobal() {
  return (
    <Sidebar>
      <SidebarItem icon={<Home size={20} />} text="Home" href="/home" />
      <SidebarItem
        icon={<BookOpen size={20} />}
        text="Chapters"
        subItems={[
          { text: "Arithmetic", href: "/chapters/arithmetic" },
          { text: "Conditionals", href: "/chapters/conditionals" },
          { text: "Data Structures", href: "/chapters/loops" },
        ]}
      />
      <SidebarItem
        icon={<Settings size={20} />}
        text="Settings"
        href="/settings"
      />
    </Sidebar>
  );
}
