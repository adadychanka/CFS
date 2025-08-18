"use client";

import { useDrawChart } from "@/hooks/useDrawChart";
import { EChartOption } from "@/components/e-charts/types";
import NewChartWrapper from "@/components/e-charts/new-chart-wrapper";

const testOptions: EChartOption = {
  color: "#a3a3a3",
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

const AnalyzedSentiments = () => {
  const { chartRef } = useDrawChart(testOptions);

  return (
    <NewChartWrapper>
      <div ref={chartRef} className="w-full h-full"></div>
    </NewChartWrapper>
  );
};

export default AnalyzedSentiments;
