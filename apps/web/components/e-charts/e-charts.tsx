"use client";

import React from "react";
import { EChartOption } from "./types";
import { useChart } from "@/hooks/useChart";

type Props = {
  options: EChartOption;
  isLoading?: boolean;
};

function ECharts({ isLoading }: Props) {
  const { chartRef } = useChart(isLoading);

  return <div ref={chartRef} className="w-full h-full"></div>;
}

export default ECharts;
