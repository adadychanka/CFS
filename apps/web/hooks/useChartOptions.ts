"use client";

import type { EChartOption } from "@/components/e-charts/types";
import { getSentimentsData } from "@/utils/charts-helper";

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

const useChartOptions = () => {
  //TODO Processing options will be here
  return {
    options: DEFAULT_CHART_OPTIONS,
  };
};

export { useChartOptions };
