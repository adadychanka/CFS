import Header from "@repo/ui/components/header";
import SwitchTableCollapsedTabs from "@/components/user-feedback/switch-table-collapsed-tabs";
import ChartWrapper from "@/components/e-charts/chart-wrapper";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View and manage your user feedbacks",
};

export default function Home() {
  return (
    <>
      <Header title="Dashboard" />
      <div className="w-full max-w-[1280px] mx-auto p-4">
        <ChartWrapper />

        <SwitchTableCollapsedTabs />
      </div>
    </>
  );
}
