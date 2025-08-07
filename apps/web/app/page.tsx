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

export default function Home() {
  return (
    <main>
      <SidebarProvider>
        <AppSidebar items={USER_PAGE_LINKS} />
        <main>
          <SidebarTrigger />
        </main>
      </SidebarProvider>
    </main>
  );
}
