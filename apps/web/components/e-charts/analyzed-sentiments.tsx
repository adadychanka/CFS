import { useDrawChart } from "@/hooks/useDrawChart";
import { EChartOption } from "@/components/e-charts/types";
import NewChartWrapper from "@/components/e-charts/new-chart-wrapper";

const testOptions: EChartOption = {
  color: "#525252",
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
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      areaStyle: {},
    },
  ],
};

const AnalyzedSentiments = () => {
  const { chartRef } = useDrawChart(testOptions);

  return (
    <NewChartWrapper>
      <div ref={chartRef} className="w-full h-full"></div>
    </NewChartWrapper>
  );
};

export default AnalyzedSentiments;
