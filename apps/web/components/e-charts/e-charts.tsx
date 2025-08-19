"use client";

import type { EChartOption } from "./types";
import { useDrawChart } from "@/hooks/useDrawChart";

type Props = {
  options: EChartOption;
  isLoading?: boolean;
};

function ECharts({ options, isLoading }: Props) {
  const { chartRef } = useDrawChart(options, isLoading);

  return <div ref={chartRef} className="w-full h-full"></div>;
}

export default ECharts;
