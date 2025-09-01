import { clientApi } from "@/lib/api";
import { FetchError } from "@/lib/errors";
import type { EChartOption } from "@/types/charts";
import type { SentimentSummaryResponse } from "@/types/sentiment-summary";
import useSWR from "swr";
import { useDrawChart } from "./useDrawChart";
import { useCallback, useMemo } from "react";
import * as echarts from "echarts";
import { useRouter, useSearchParams } from "next/navigation";
import { updateSearchParamsWithSentiments } from "@/utils/url-helpers";
import { transformSentimentSummaryResult } from "@/utils/charts-helper";
import { useSampleMode } from "@/context/use-sample-mode";

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
  const { isSampleMode } = useSampleMode();
  const {
    data: result,
    error,
    isLoading,
  } = useSWR<SentimentSummaryResponse, FetchError>(
    `/api/feedback/sentiment-summary?isSampleMode=${isSampleMode}`,
    fetcher,
  );

  const { chartOptions, isEmpty } = useMemo(
    function deriveChartOptions() {
      const { categories, data } = transformSentimentSummaryResult(result);
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
    },
    [result],
  );

  const hasError = Boolean(error);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = useCallback(
    (chartParams: echarts.ECElementEvent) => {
      const params = updateSearchParamsWithSentiments(searchParams, [
        chartParams.name,
      ]);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const { chartRef } = useDrawChart(chartOptions, {
    isLoading,
    onClick: handleFilterChange,
  });

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
