"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "@repo/ui/components/sonner";
import WorkspaceProvider from "@/providers/workspace-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <WorkspaceProvider>{children}</WorkspaceProvider>
      <Toaster />
    </NextThemesProvider>
  );
}
