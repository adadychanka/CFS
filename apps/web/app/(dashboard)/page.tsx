import Header from "@repo/ui/components/header";
import SwitchTableCollapsedTabs from "@/components/user-feedback/switch-table-collapsed-tabs";
import DashboardChartWrapper from "@/components/e-charts/dashboard-chart-wrapper";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Header title="Dashboard" />
      <div className="w-full max-w-[1280px] mx-auto p-4">
        <DashboardChartWrapper />

        {/* TODO: need custom loading in the future*/}
        <Suspense fallback={<p>Loading...</p>}>
          <SwitchTableCollapsedTabs />
        </Suspense>
      </div>
    </>
  );
}
