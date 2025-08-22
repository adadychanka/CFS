import { Info } from "lucide-react";
import React from "react";
import DashboardChartLoader from "./dashboard-chart-loader";

interface DashboardChartFallbackProps {
  message?: string;
  error?: boolean;
  loading?: boolean;
}

const DashboardChartFallback: React.FC<DashboardChartFallbackProps> = ({
  message = "Failed to load chart data.",
  error,
  loading,
}) => {
  if (loading) {
    return <DashboardChartLoader />;
  }
  return (
    <div
      className="w-full h-52 flex flex-col items-center justify-center"
      role="alert"
      aria-label="Chart load error"
    >
      <div className="flex items-center space-x-2 mb-4">
        {error && <Info className="text-red-500" />}
        <span className="text-primary ">{message}</span>
      </div>
    </div>
  );
};

export default DashboardChartFallback;
