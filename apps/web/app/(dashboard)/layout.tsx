import type { Metadata } from "next";
import "@repo/ui/globals.css";
import AppSidebar from "@/components/app-sidebar";
import React from "react";

import { SidebarProvider } from "@repo/ui/components/sidebar";
import { withAdminAccess } from "@/components/withAdminAccess";
import { SessionProvider } from "next-auth/react";
import SocketProvider from "@/providers/socket-provider";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Analyze and manage user feedback with interactive charts, detailed analysis tables, and grouped insights.",
  keywords: [
    "dashboard",
    "feedback analysis",
    "sentiment analysis",
    "charts",
    "grouped feedback",
    "expand collapse analysis",
    "user feedback",
  ],
  openGraph: {
    title: "Dashboard",
    description:
      "Explore user feedback with interactive charts, detailed tables, and expandable grouped analysis for deeper insights.",
    url: "https://yourapp.com/dashboard",
    siteName: "Your App Name",
    type: "website",
  },
};

const DynamicSidebar = withAdminAccess(AppSidebar);

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DynamicSidebar />
      <SessionProvider>
        <SocketProvider>
          <main className="w-full pb-16">{children}</main>
        </SocketProvider>
      </SessionProvider>
    </SidebarProvider>
  );
}
