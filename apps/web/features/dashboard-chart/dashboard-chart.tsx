"use client";

import { clientApi } from "@/lib/api";
import DashboardChartFallback from "./dashboard-chart-fallback";
import { FetchError } from "@/lib/errors";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import useDashboardChart from "@/hooks/useDashboardChart";

export const fetcher = async (url: string) => {
  const res = await clientApi.get(url);
  const data = await res.json();

  if (!res.ok) {
    throw new FetchError(
      data.message || "Something went wrong",
      res.status,
      data,
    );
  }

  return data;
};

function DashboardChart() {
  const { chartRef, hasError, error, isLoading, isEmpty } = useDashboardChart();

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
