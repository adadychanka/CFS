import type { Metadata } from "next";
import "@repo/ui/globals.css";
import AppSidebar from "@/components/app-sidebar";
import React from "react";

import { SidebarProvider } from "@repo/ui/components/sidebar";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full pb-16">{children}</main>
    </SidebarProvider>
  );
}
