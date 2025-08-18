"use client";

import ApiUsageChart from "@/components/e-charts/api-usage-chart";
import AnalyzedSentiments from "@/components/e-charts/analyzed-sentiments";
import ErrorsChart from "@/components/e-charts/errors-chart";

const ChartsSection = () => {
  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      <ApiUsageChart />
      <AnalyzedSentiments />
      <ErrorsChart />
    </div>
  );
};

export default ChartsSection;
