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
import ExportDropdown from "@/components/export/export-dropdown";
import GroupedFeedbackWrapper from "@/features/grouped-feedback/grouped-feedback-wrapper";
import { SENTIMENT_FILTER_QUERY_KEY } from "@/constants";

type Props = {
  isSampleMode: boolean;
};

const SwitchTableCollapsedTabs = ({ isSampleMode }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const filterOnURLQuery = searchParams.get(SENTIMENT_FILTER_QUERY_KEY) || "";

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
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [requested, searchParams, router]);

  const handleTabChange = (newValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", newValue);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Tabs value={tab} onValueChange={handleTabChange}>
      <div className="flex items-center justify-between">
        <TabsList className="mb-4">
          <TabsTrigger value="table">
            <Table2 /> Table
          </TabsTrigger>
          <TabsTrigger value="grouped">
            <GalleryVertical /> Grouped
          </TabsTrigger>
        </TabsList>
        <ExportDropdown isSampleMode={isSampleMode} />
      </div>
      <TabsContent value="table">
        <FeedbackTable
          currentPage={currentPage}
          sentiment={filterOnURLQuery}
          isSampleMode={isSampleMode}
        />
      </TabsContent>
      <TabsContent value="grouped">
        <GroupedFeedbackWrapper isSampleMode={isSampleMode} />
      </TabsContent>
    </Tabs>
  );
};

export default SwitchTableCollapsedTabs;
