"use client";

import { LogOut } from "lucide-react";
import { SidebarMenuButton } from "@repo/ui/components/sidebar";
import { useRouter } from "next/navigation";
import { AUTH_MESSAGES } from "@/constants/response-messages";

const LogoutButton = () => {
  const router = useRouter();

  // Logout user, even works without the token
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (e) {
      console.error(AUTH_MESSAGES.LOGOUT.ERROR, e);
    } finally {
      localStorage.removeItem("token");
      router.replace("/log-in");
    }
  };

  return (
    <SidebarMenuButton onClick={handleLogout}>
      <LogOut />
      <span>Logout</span>
    </SidebarMenuButton>
  );
};

export default LogoutButton;
