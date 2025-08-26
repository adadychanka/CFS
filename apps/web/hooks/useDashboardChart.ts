import { clientApi } from "@/lib/api";
import { FetchError } from "@/lib/errors";
import type { EChartOption } from "@/types/charts";
import type { SentimentSummaryResponse } from "@/types/sentiment-summary";
import useSWR from "swr";
import { useDrawChart } from "./useDrawChart";
import { useMemo } from "react";

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

function useDashboardChart() {
  const {
    data: result,
    error,
    isLoading,
  } = useSWR<SentimentSummaryResponse, FetchError>(
    "/api/feedback/sentiment-summary",
    fetcher,
  );

  const { chartOptions, isEmpty } = useMemo(() => {
    const categories = result?.data?.map((item) => item.sentiment) ?? [];
    const data = result?.data?.map((item) => item.count) ?? [];
    const isEmpty = categories.length === 0 || data.length === 0;

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

    return { chartOptions, isEmpty };
  }, [result]);

  const hasError = Boolean(error);

  const { chartRef } = useDrawChart(chartOptions, { isLoading });
  return {
    chartRef,
    hasError,
    chartOptions,
    error,
    isLoading,
    isEmpty,
  };
}

export default useDashboardChart;
