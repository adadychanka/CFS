"use client";

import DashboardChartFallback from "./dashboard-chart-fallback";
import { FetchError } from "@/lib/errors";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import useDashboardChart from "@/hooks/useDashboardChart";
import { useSearchParams } from "next/navigation";
import { USER_DASHBOARD_TABS } from "@/constants/constants";

function DashboardChart({ workspaceId }: { workspaceId: string }) {
  const searchParams = useSearchParams();
  const isGroupedView = searchParams.get("tab") === USER_DASHBOARD_TABS[1];

  const { chartRef, hasError, error, isLoading, isEmpty } = useDashboardChart(
    workspaceId,
    isGroupedView,
  );

  if (error instanceof FetchError) clientAuthGuard(error.status);

  if (hasError) {
    return <DashboardChartFallback error />;
  }

  if (isLoading) {
    return <DashboardChartFallback loading />;
  }

  if (isEmpty) {
    return <DashboardChartFallback message="No data found" />;
  }

  return <div ref={chartRef} className="w-full h-full" />;
}

export default DashboardChart;
