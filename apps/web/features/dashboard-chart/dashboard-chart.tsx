"use client";

import DashboardChartFallback from "./dashboard-chart-fallback";
import { FetchError } from "@/lib/errors";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import useDashboardChart from "@/hooks/useDashboardChart";

type Props = {
  isSampleMode: boolean;
};

function DashboardChart({ isSampleMode }: Props) {
  const { chartRef, hasError, error, isLoading, isEmpty } =
    useDashboardChart(isSampleMode);

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
