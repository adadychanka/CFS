import Header from "@repo/ui/components/header";
import SwitchTableCollapsedTabs from "@/components/user-feedback/switch-table-collapsed-tabs";
import { Suspense } from "react";
import DashboardChartWrapper from "@/features/dashboard-chart/dashboard-chart-wrapper";
import FeedbackPanel from "@/features/feedback-panel/feedback-panel";
import SampleModeToggle from "@/components/sample-mode/sample-mode-toggle";

export default function Home() {
  return (
    <>
      <Header title="Dashboard" />
      <div className="w-full max-w-[1280px] mx-auto p-4">
        <SampleModeToggle />

        {/* TODO: need custom loading in the future*/}
        <Suspense fallback={null}>
          <DashboardChartWrapper />
          <FeedbackPanel />
          <SwitchTableCollapsedTabs />
        </Suspense>
      </div>
    </>
  );
}
