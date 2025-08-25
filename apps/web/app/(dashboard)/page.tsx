"use client";

import Header from "@repo/ui/components/header";
import SwitchTableCollapsedTabs from "@/components/user-feedback/switch-table-collapsed-tabs";
import { Suspense, useState } from "react";
import { Button } from "@repo/ui/components/button";
import { FlaskConical, LogOut } from "lucide-react";
import DashboardChartWrapper from "@/features/dashboard-chart/dashboard-chart-wrapper";

// TODO: We can create separate component
export default function Home() {
  const [isSampleMode, setIsSampleMode] = useState(false);

  return (
    <>
      <Header title="Dashboard" />
      <div className="w-full max-w-[1280px] mx-auto p-4">
        {/*TODO: this can go inside the header*/}
        <div className="pb-8 flex items-center justify-between gap-1">
          <span className="text-sm text-neutral-600">
            Turning on sample mode will not affect your date. All of you
            analyzed sentiments securely stored.
          </span>

          <Button
            size="sm"
            variant="outline"
            aria-label="Toggle sample mode for user dashboard"
            onClick={() => setIsSampleMode((prev) => !prev)}
          >
            {isSampleMode ? (
              <>
                <FlaskConical /> Enter sample mode
              </>
            ) : (
              <>
                <LogOut /> Exit sample mode
              </>
            )}
          </Button>
        </div>

        {/* TODO: need custom loading in the future*/}
        <Suspense fallback={<p>Loading...</p>}>
          <DashboardChartWrapper />
          <SwitchTableCollapsedTabs isSampleMode={isSampleMode} />
        </Suspense>
      </div>
    </>
  );
}
