import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { useChartOptions } from "./useChartOptions";

const useChart = (isLoading?: boolean) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<echarts.ECharts | null>(null);
  const { options } = useChartOptions();

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

export { useChart };
