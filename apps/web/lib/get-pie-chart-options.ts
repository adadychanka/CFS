import type { EChartOption } from "@/types/charts";
import type { DashboardChartResponse } from "@/types/dashboard-charts";
import type { GroupedFeedbackResponse } from "@/types/grouped-feedback";

export function getPieChartOptions(
  result: GroupedFeedbackResponse,
): DashboardChartResponse {
  const chartData = result.data.map((group) => ({
    name: group.summary,
    value: group.count,
  }));
  const isEmpty = result.data.length === 0;

  const chartOptions: EChartOption = {
    title: {
      text: "Proportions of Grouped Sentiments",
    },
    series: [
      {
        type: "pie",
        data: [...chartData],
      },
    ],
  };

  return { chartOptions, isEmpty };
}
