"use client";

import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import type { EChartOption } from "@/types/charts";

/**
 * Custom hook to render an ECharts chart inside a div with automatic resizing and loading state.
 *
 * @example
 * const { chartRef } = useDrawChart(options, isLoading);
 * return <div ref={chartRef} className="w-full h-full" />;
 */
const useDrawChart = (
  options: EChartOption,
  optionalParams?: {
    handler?: (params: echarts.ECElementEvent) => void;
    isLoading?: boolean;
  },
) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<echarts.ECharts | null>(null);

  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  //Creating a chart once at initial render
  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current);
    setChart(chartInstance);

    resizeObserverRef.current = new window.ResizeObserver((entries) => {
      entries.forEach(({ target }) => {
        if (target instanceof HTMLDivElement) {
          const instance = echarts.getInstanceByDom(target);
          instance?.resize();
        }
      });
    });

    resizeObserverRef.current.observe(chartRef.current);

    return () => {
      resizeObserverRef.current?.disconnect();
      chartInstance.dispose();
    };
  }, [optionalParams?.isLoading]);

  useEffect(() => {
    if (chart) {
      chart.setOption(options);
    }
  }, [chart, options]);

useEffect(() => {
    if (!chart || !optionalParams?.handler) return;

    const handleBarClick = optionalParams?.handler

    chart.on("click", handleBarClick);

    return () => {
      chart.off("click", handleBarClick);
    };
  }, [chart, optionalParams?.handler]);

  useEffect(() => {
    if (!chart) {
      return;
    }
    if (optionalParams?.isLoading) {
      chart.showLoading();
      return;
    }
    chart.hideLoading();
  }, [chart, optionalParams?.isLoading]);

  return {
    chartRef,
  };
};

export { useDrawChart };
