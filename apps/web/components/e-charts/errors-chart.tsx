import { useDrawChart } from "@/hooks/useDrawChart";
import { EChartOption } from "@/components/e-charts/types";
import NewChartWrapper from "@/components/e-charts/new-chart-wrapper";

const testOptions: EChartOption = {
  color: "#a3a3a3",
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
  const { chartRef } = useDrawChart(testOptions);

  return (
    <NewChartWrapper>
      <div ref={chartRef} className="w-full h-full"></div>
    </NewChartWrapper>
  );
};

export default ErrorsChart;
