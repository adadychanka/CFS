"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import { GalleryVertical, Table2 } from "lucide-react";
import FeedbackTable from "@/components/user-feedback/feedback-table";
import { useRouter, useSearchParams } from "next/navigation";
import { USER_DASHBOARD_TABS } from "@/constants/constants";
import { useEffect } from "react";
import GroupedFeedback from "./grouped-feedback";

const SwitchTableCollapsedTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const requested = searchParams.get("tab") || "";
  const tab = USER_DASHBOARD_TABS.includes(requested) ? requested : "table";

  // RENDER SAFE: only runs when the tab query is invalid
  useEffect(() => {
    if (
      requested &&
      !USER_DASHBOARD_TABS.includes(requested) &&
      requested !== "table"
    ) {
      const params = new URLSearchParams(searchParams);
      params.set("tab", "table");
      router.replace(`?${params.toString()}`);
    }
  }, [requested, searchParams, router]);

  const handleTabChange = (newValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", newValue);
    router.push(`?${params.toString()}`);
  };

  return (
    <Tabs value={tab} onValueChange={handleTabChange}>
      <TabsList className="mb-4">
        <TabsTrigger value="table">
          <Table2 /> Table
        </TabsTrigger>
        <TabsTrigger value="grouped">
          <GalleryVertical /> Grouped
        </TabsTrigger>
      </TabsList>
      <TabsContent value="table">
        <FeedbackTable currentPage={currentPage} />
      </TabsContent>
      <TabsContent value="grouped">
        <GroupedFeedback />
      </TabsContent>
    </Tabs>
  );
};

export default SwitchTableCollapsedTabs;
