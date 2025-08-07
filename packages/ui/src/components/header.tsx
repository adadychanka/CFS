import React from "react";
import { SidebarProvider, SidebarTrigger } from "@repo/ui/components/sidebar";
import AppSidebar from "@repo/ui/components/app-sidebar";
import { Home as HomeIcon, Plus } from "lucide-react";

const USER_PAGE_LINKS = [
  {
    title: "Dashboard",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "New Sentiment",
    url: "/new-sentiment",
    icon: Plus,
  },
];

const Header = () => {
  return (
    <SidebarProvider>
      <header className="w-full flex h-16 items-center gap-2 border-b px-4">
        <AppSidebar items={USER_PAGE_LINKS} />
        <SidebarTrigger />
      </header>
    </SidebarProvider>
  );
};

export default Header;
