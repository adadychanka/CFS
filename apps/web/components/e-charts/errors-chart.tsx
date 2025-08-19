import { EChartOption } from "@/components/e-charts/types";
import NewChartWrapper from "@/components/e-charts/new-chart-wrapper";
import ECharts from "@/components/e-charts/e-charts";

const testOptions: EChartOption = {
  color: "#525252",
  title: {
    text: "Error History",
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [2, 1, 4, 3, 6, 2, 5],
      type: "line",
      areaStyle: {},
      smooth: true,
    },
  ],
};

const ErrorsChart = () => {
  return (
    <NewChartWrapper>
      <ECharts options={testOptions} />
    </NewChartWrapper>
  );
};

export default ErrorsChart;
