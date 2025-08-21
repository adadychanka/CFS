import { EChartOption } from "@/types/charts";
import AdminChartWrapper from "@/components/e-charts/admin-chart-wrapper";
import ECharts from "@/components/e-charts/e-charts";

const testOptions: EChartOption = {
  color: "#525252",
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
  return (
    <AdminChartWrapper className="@2xl:col-span-full  @2xl:aspect-[5/2] @4xl:aspect-[3/1]">
      <ECharts options={testOptions} />
    </AdminChartWrapper>
  );
};

export default ApiUsageChart;
