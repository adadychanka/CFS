import { type EChartOption } from "@/components/e-charts/types";
import AdminChartWrapper from "@/components/e-charts/admin-chart-wrapper";
import ECharts from "@/components/e-charts/e-charts";

const testOptions: EChartOption = {
  color: "#525252",
  title: {
    text: "AI Analysis",
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
      data: [450, 520, 610, 700, 640, 390, 430],
      type: "line",
      areaStyle: {},
      smooth: true,
    },
  ],
};

const AnalyzedSentimentsChart = () => {
  return (
    <AdminChartWrapper>
      <ECharts options={testOptions} />
    </AdminChartWrapper>
  );
};

export default AnalyzedSentimentsChart;
