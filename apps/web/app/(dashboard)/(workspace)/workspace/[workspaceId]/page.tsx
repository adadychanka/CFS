import Header from "@repo/ui/components/header";
import SwitchTableCollapsedTabs from "@/components/user-feedback/switch-table-collapsed-tabs";
import { Suspense } from "react";
import DashboardChartWrapper from "@/features/dashboard-chart/dashboard-chart-wrapper";
import FeedbackPanel from "@/features/feedback-panel/feedback-panel";

export default function Page() {
  return (
    <>
      <Header title="Dashboard" />
      <div className="w-full max-w-[1280px] mx-auto p-4">
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
