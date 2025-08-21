"use client";

import { LogOut } from "lucide-react";
import { SidebarMenuButton } from "@repo/ui/components/sidebar";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({ redirectTo: "/log-in" });
  };

  return (
    <SidebarMenuButton onClick={handleLogout}>
      <LogOut />
      <span>Logout</span>
    </SidebarMenuButton>
  );
};

export default LogoutButton;
