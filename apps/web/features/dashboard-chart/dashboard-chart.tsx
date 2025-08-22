"use client";

import type { EChartOption } from "../../types/charts";
import { useDrawChart } from "@/hooks/useDrawChart";
import { clientApi } from "@/lib/api";
import { SentimentSummaryResponse } from "@/types/sentiment-summary";
import useSWR from "swr";
import DashboardChartFallback from "./dashboard-chart-fallback";

const fetcher = (url: string) => clientApi.get<SentimentSummaryResponse>(url);

function DashboardChart() {
  const {
    data: result,
    error,
    isLoading,
  } = useSWR<SentimentSummaryResponse, Error>(
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
  console.log(result, isLoading, error);

  if (hasError) {
    return <DashboardChartFallback error />;
  }

  if (isLoading) {
    return <DashboardChartFallback loading />;
  }

  if (categories.length === 0 || data.length === 0) {
    return <DashboardChartFallback message="There is no data to display" />;
  }

  return <div ref={chartRef} className="w-full h-full" />;
}

export default DashboardChart;
