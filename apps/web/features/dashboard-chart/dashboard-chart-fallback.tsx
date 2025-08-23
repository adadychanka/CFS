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
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Bars (faded / inactive) */}
        <div className="flex items-end gap-1 opacity-30">
          <div className="w-4 bg-primary h-16"></div>
          <div className="w-4 bg-primary h-12"></div>
          <div className="w-4 bg-primary h-14"></div>
          <div className="w-4 bg-primary h-10"></div>
        </div>
      </div>
      <p className="text-pretty text-lg font-semibold tracking-wide flex items-center gap-2">
        {error && <Info className="text-red-500" />}
        <span className="text-primary ">{message}</span>
      </p>
    </div>
  );
};

export default DashboardChartFallback;
