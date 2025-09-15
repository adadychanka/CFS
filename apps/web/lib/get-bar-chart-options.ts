import type { EChartOption } from "@/types/charts";
import type { DashboardChartResponse } from "@/types/dashboard-charts";
import type { SentimentSummaryResponse } from "@/types/sentiment-summary";
import { transformSentimentSummaryResult } from "@/utils/charts-helper";

export function getBarChartOptions(
  result: SentimentSummaryResponse,
): DashboardChartResponse {
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
}
