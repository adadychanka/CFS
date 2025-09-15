"use client";

import { clientApi } from "@/lib/api";
import { FetchError } from "@/lib/errors";
import useSWR from "swr";
import { useDrawChart } from "./useDrawChart";
import { useCallback } from "react";
import * as echarts from "echarts";
import { useRouter, useSearchParams } from "next/navigation";
import { updateSearchParams } from "@/utils/url-helpers";
import { SENTIMENT_FILTER_QUERY_KEY } from "@/constants";
import { createWorkspaceUrl } from "@/lib/create-workspace-url";
import { DashboardChartResponse } from "@/types/dashboard-charts";

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

function useDashboardChart(workspaceId: string, isGroupedView: boolean) {
  const view = isGroupedView ? "grouped" : "table";
  const params = new URLSearchParams();
  params.set("view", view);
  console.log(params.toString());

  const url = createWorkspaceUrl(
    workspaceId,
    `/dashboard-chart?${params.toString()}`,
  );
  const {
    data: result,
    error,
    isLoading,
  } = useSWR<DashboardChartResponse, FetchError>(url, fetcher);

  const dashboardChart = {
    isEmpty: true,
    chartOptions: {},
  };

  if (result) {
    dashboardChart.chartOptions = result.chartOptions;
    dashboardChart.isEmpty = result.isEmpty;
  }

  const hasError = Boolean(error);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = useCallback(
    (chartParams: echarts.ECElementEvent) => {
      const params = updateSearchParams(
        searchParams,
        SENTIMENT_FILTER_QUERY_KEY,
        [chartParams.name],
      );
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const { chartRef } = useDrawChart(dashboardChart.chartOptions, {
    isLoading,
    isEmpty: dashboardChart.isEmpty,
    onClick: handleFilterChange,
  });

  return {
    chartRef,
    hasError,
    error,
    isLoading,
    ...dashboardChart,
  };
}

export default useDashboardChart;
