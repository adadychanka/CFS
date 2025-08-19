"use client";

import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { EChartOption } from "@/components/e-charts/types";

/**
 * Custom hook to render an ECharts chart inside a div with automatic resizing and loading state.
 *
 * @example
 * const { chartRef } = useDrawChart(options, isLoading);
 * return <div ref={chartRef} className="w-full h-full" />;
 */
const useDrawChart = (options: EChartOption, isLoading?: boolean) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<echarts.ECharts | null>(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);
    chartInstance.setOption(options);
    setChart(chartInstance);

    const resizeObserver = new window.ResizeObserver((entries) => {
      entries.map(({ target }) => {
        if (target instanceof HTMLDivElement) {
          const instance = echarts.getInstanceByDom(target);
          if (instance) {
            instance.resize();
          }
        }
      });
    });
    resizeObserver.observe(chartRef.current!);

    return () => {
      resizeObserver.disconnect();
      chartInstance.dispose();
    };
  }, [options]);

  useEffect(() => {
    if (!chart) {
      return;
    }
    if (isLoading) {
      chart.showLoading();
      return;
    }
    chart.hideLoading();
  }, [chart, isLoading]);

  return {
    chartRef,
  };
};

export { useDrawChart };
