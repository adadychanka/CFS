import { SidebarProvider, SidebarTrigger } from "@repo/ui/components/sidebar";
import AppSidebar from "@repo/ui/components/app-sidebar";

export default function Home() {
  return (
    <main>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
        </main>
      </SidebarProvider>
    </main>
  );
}
