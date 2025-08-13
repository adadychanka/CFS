"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import { GalleryVertical, Table2 } from "lucide-react";
import FeedbackTable from "@/components/user-feedback/feedback-table";
import { useSearchParams, useRouter } from "next/navigation";
import { USER_DASHBOARD_TABS } from "@/constants/constants";

const SwitchTableCollapsedTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const requested = searchParams.get("tab") || "";
  const tab = USER_DASHBOARD_TABS.includes(requested) ? requested : "table";

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
        <FeedbackTable />
      </TabsContent>
      <TabsContent value="grouped">
        <h2>☘️ Good luck there with collapses</h2>
      </TabsContent>
    </Tabs>
  );
};

export default SwitchTableCollapsedTabs;
