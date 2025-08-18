import { useDrawChart } from "@/hooks/useDrawChart";
import { EChartOption } from "@/components/e-charts/types";
import NewChartWrapper from "@/components/e-charts/new-chart-wrapper";

const testOptions: EChartOption = {
  color: "#525252",
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [14, 31, 14, 21, 13, 14, 26],
      type: "line",
    },
  ],
};

const ApiUsageChart = () => {
  const { chartRef } = useDrawChart(testOptions);

  return (
    <NewChartWrapper>
      <div ref={chartRef} className="w-full h-full"></div>
    </NewChartWrapper>
  );
};

export default ApiUsageChart;
