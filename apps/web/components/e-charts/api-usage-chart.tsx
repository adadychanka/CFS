import { useDrawChart } from "@/hooks/useDrawChart";
import { EChartOption } from "@/components/e-charts/types";
import NewChartWrapper from "@/components/e-charts/new-chart-wrapper";

const testOptions: EChartOption = {
  color: "#a3a3a3",
  title: {
    text: "API usage",
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
      data: [1200, 1450, 1320, 1580, 1700, 1100, 1250],
      type: "line",
      areaStyle: {},
      smooth: true,
    },
  ],
};

const ApiUsageChart = () => {
  const { chartRef } = useDrawChart(testOptions);

  return (
    <NewChartWrapper className="@2xl:col-span-full  @2xl:aspect-[5/2] @4xl:aspect-[3/1]">
      <div ref={chartRef} className="w-full h-full"></div>
    </NewChartWrapper>
  );
};

export default ApiUsageChart;
