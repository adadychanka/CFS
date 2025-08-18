"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@repo/ui/components/sidebar";
import Link from "next/link";
import SidebarLogo from "@/components/logo/sidebar-logo";
import {
  ADMIN_PAGE_LINKS,
  USER_PAGE_LINKS,
  USER_ROLE,
} from "@/constants/constants";
import { usePathname } from "next/navigation";

const AppSidebar = () => {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();

  const isAdmin = USER_ROLE === "admin";
  const sidebarLinks = isAdmin ? ADMIN_PAGE_LINKS : USER_PAGE_LINKS;

  return (
    <nav aria-label="Primary navigation">
      <Sidebar>
        <SidebarHeader>
          <SidebarLogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarLinks.map((item) => {
                  const isActive =
                    item.url === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.url + "/") ||
                        pathname === item.url;
                  const Icon = isActive ? item.icon.solid : item.icon.outline;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton isActive={isActive} asChild>
                        <Link
                          href={item.url}
                          onClick={() => setOpenMobile(false)}
                        >
                          <Icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </nav>
  );
};

export default AppSidebar;
