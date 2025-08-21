"use client";

import type { EChartOption } from "../../types/charts";
import { useDrawChart } from "@/hooks/useDrawChart";
import { clientApi } from "@/lib/api";
import { SentimentSummaryResponse } from "@/types/sentiment-summary";
import { Info } from "lucide-react";
import useSWR from "swr";

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

  // --- derive chart options ---
  const chartOptions: EChartOption = {
    title: {
      text: "Proportions of Sentiment Types",
    },
    tooltip: {},
    color: "#393E46",
    xAxis: {
      data: result?.data?.map((item) => item.sentiment) ?? [],
    },
    yAxis: {},
    series: [
      {
        type: "bar",
        data: result?.data?.map((item) => item.count) ?? [],
      },
    ],
  };

  const { chartRef } = useDrawChart(chartOptions, isLoading);

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full gap-2 text-red-600">
        <Info className="w-5 h-5" />
        <span>Failed to load chart data. Please try again later.</span>
      </div>
    );
  }

  return <div ref={chartRef} className="w-full h-full" />;
}

export default DashboardChart;
