import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@repo/ui/globals.css";
import { Providers } from "@/components/providers";
import React from "react";
import { SidebarProvider } from "@repo/ui/components/sidebar";
import { withAdminAccess } from "@/components/withAdminAccess";
import AppSidebar from "@/components/app-sidebar";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Customer Feedback Analysis",
  description:
    "AI-powered Customer Feedback Analysis that classifies feedback as positive, negative, neutral, or unknown to help you quickly understand customer sentiment.",
};

const DynamicSidebar = withAdminAccess(AppSidebar);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>
          <SidebarProvider>
            <DynamicSidebar />
            {children}
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
