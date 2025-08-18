"use client";

import type { EChartOption } from "./types";
import { useDrawChart } from "@/hooks/useDrawChart";
import { getSentimentsData } from "@/utils/charts-helper";

type Props = {
  isLoading?: boolean;
};

const CHART_CATEGORIES = ["Positive", "Negative", "Unknown", "Neutral"];

const DEFAULT_CHART_OPTIONS: EChartOption = {
  title: {
    text: "Proportions of Sentiment Types ",
  },
  tooltip: {},
  xAxis: {
    data: CHART_CATEGORIES,
  },
  color: "#393E46",
  yAxis: {},
  series: [
    {
      type: "bar",
      data: [...getSentimentsData()],
    },
  ],
};

function SentimentsCountChart({ isLoading }: Props) {
  const { chartRef } = useDrawChart(DEFAULT_CHART_OPTIONS, isLoading);

  return <div ref={chartRef} className="w-full h-full"></div>;
}

export default SentimentsCountChart;
