import Sidebar, { SidebarItem } from "@/components/sidebar";
import { Home, Settings, BookOpen } from "lucide-react";

export default function SidebarGlobal() {
  return (
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
  );
}
