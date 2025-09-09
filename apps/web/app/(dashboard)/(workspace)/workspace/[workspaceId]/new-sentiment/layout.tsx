"use client";

import { type ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/tabs";
import { usePathname, useRouter } from "next/navigation";
import Header from "@repo/ui/components/header";

const tabs = [
  { tab: "manual", url: "/new-sentiment/manual", label: "Manual Entry" },
  {
    tab: "file-upload",
    url: "/new-sentiment/file-upload",
    label: "File Upload",
  },
];

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const activeTab =
    tabs.find((tab) => pathname.startsWith(tab.url))?.tab ?? "manual";

  // Manually redirect user
  const onTabChange = (value: string) => {
    const tab = tabs.find((t) => t.tab === value);
    if (tab) {
      router.push(tab.url, { scroll: false });
    }
  };

  return (
    <>
      <Header title="New Sentiment" />
      <div className="max-w-[1280px] mx-auto p-4">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className="mb-2">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.tab} value={tab.tab}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {children}
        </Tabs>
      </div>
    </>
  );
};

export default Layout;
