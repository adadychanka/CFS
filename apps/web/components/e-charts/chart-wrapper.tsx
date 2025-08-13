"use client";
import React from "react";
import ECharts from "./e-charts";
import { useChartOptions } from "@/hooks/useChartOptions";

function ChartWrapper() {
  const { options } = useChartOptions();
  return (
    <section className="w-full h-96 mb-8 flex flex-col items-center justify-center bg-accent border-1 rounded-md pt-12">
      <ECharts options={options} />
    </section>
  );
}

export default ChartWrapper;
