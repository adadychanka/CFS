"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@repo/ui/components/sidebar";
import Link from "next/link";
import SidebarLogo from "@/components/logo/sidebar-logo";
import { ADMIN_PAGE_LINKS, USER_PAGE_LINKS } from "@/constants/constants";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/auth/logout-button";
import WorkspacesList from "@/features/workspaces/workspaces-list";

type Props = {
  isAdmin: boolean;
};

const AppSidebar = ({ isAdmin }: Props) => {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();

  const sidebarLinks = isAdmin ? ADMIN_PAGE_LINKS : USER_PAGE_LINKS;

  return (
    <nav aria-label="Primary navigation">
      <Sidebar>
        <SidebarHeader>
          <SidebarLogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={
                          item.url === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.url + "/") ||
                              pathname === item.url
                        }
                        asChild
                      >
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
          <WorkspacesList />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <LogoutButton />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </nav>
  );
};

export default AppSidebar;
