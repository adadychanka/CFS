import Header from "@repo/ui/components/header";
import SwitchTableCollapsedTabs from "@/components/user-feedback/switch-table-collapsed-tabs";
import { Suspense } from "react";
import { Button } from "@repo/ui/components/button";
import { SwatchBook } from "lucide-react";
import DashboardChartWrapper from "@/features/dashboard-chart/dashboard-chart-wrapper";
import FeedbackPanel from "@/features/feedback-panel/feedback-panel";

export default function Home() {
  return (
    <>
      <Header title="Dashboard" />
      <div className="w-full max-w-[1280px] mx-auto p-4">
        <div className="pb-8 flex justify-end">
          <Button
            size="sm"
            variant="outline"
            aria-label="Toggle sample mode for user dashboard"
          >
            <SwatchBook /> Sample mode
          </Button>
        </div>

        {/* TODO: need custom loading in the future*/}
        <Suspense fallback={<p>Loading...</p>}>
          <DashboardChartWrapper />
          <FeedbackPanel />
          <SwitchTableCollapsedTabs />
        </Suspense>
      </div>
    </>
  );
}
