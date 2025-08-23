"use client";

import type { EChartOption } from "../../types/charts";
import { useDrawChart } from "@/hooks/useDrawChart";
import { clientApi } from "@/lib/api";
import type { SentimentSummaryResponse } from "@/types/sentiment-summary";
import useSWR from "swr";
import DashboardChartFallback from "./dashboard-chart-fallback";
import { FetchError } from "@/lib/errors";
import { clientAuthGuard } from "@/utils/client-auth-guard";

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
  const {
    data: result,
    error,
    isLoading,
  } = useSWR<SentimentSummaryResponse>(
    "/api/feedback/sentiment-summary",
    fetcher,
  );

  const categories = result?.data?.map((item) => item.sentiment) ?? [];
  const data = result?.data?.map((item) => item.count) ?? [];

  const chartOptions: EChartOption = {
    title: {
      text: "Proportions of Sentiment Types",
    },
    tooltip: {},
    color: "#393E46",
    xAxis: {
      data: categories,
    },
    yAxis: {},
    series: [
      {
        type: "bar",
        data: data,
      },
    ],
  };

  const hasError = Boolean(error);

  const { chartRef } = useDrawChart(chartOptions, isLoading);

  if (error instanceof FetchError) clientAuthGuard(error.status);

  if (hasError) {
    return <DashboardChartFallback error />;
  }

  if (isLoading) {
    return <DashboardChartFallback loading />;
  }

  if (categories.length === 0 || data.length === 0) {
    return <DashboardChartFallback message="No data found" />;
  }

  return <div ref={chartRef} className="w-full h-full" />;
}

export default DashboardChart;
