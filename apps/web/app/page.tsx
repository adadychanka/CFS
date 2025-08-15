import Header from "@repo/ui/components/header";
import SwitchTableCollapsedTabs from "@/components/user-feedback/switch-table-collapsed-tabs";
import ChartWrapper from "@/components/e-charts/chart-wrapper";
import { type Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Analyze and manage user feedback with interactive charts, detailed analysis tables, and grouped insights.",
  keywords: [
    "dashboard",
    "feedback analysis",
    "sentiment analysis",
    "charts",
    "grouped feedback",
    "expand collapse analysis",
    "user feedback",
  ],
  openGraph: {
    title: "Dashboard",
    description:
      "Explore user feedback with interactive charts, detailed tables, and expandable grouped analysis for deeper insights.",
    url: "https://yourapp.com/dashboard",
    siteName: "Your App Name",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Header title="Dashboard" />
      <div className="w-full max-w-[1280px] mx-auto p-4">
        <ChartWrapper />

        {/* TODO: need custom loading in the future*/}
        <Suspense fallback={<p>Loading...</p>}>
          <SwitchTableCollapsedTabs />
        </Suspense>
      </div>
    </>
  );
}
