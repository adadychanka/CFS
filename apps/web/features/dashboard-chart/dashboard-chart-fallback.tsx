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
      {/* Circle with bars inside */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Circle faded outline */}

        {/* Bars (faded / inactive) */}
        <div className="flex items-end gap-1 opacity-30">
          <div className="w-4 bg-primary h-16"></div>
          <div className="w-4 bg-primary h-12"></div>
          <div className="w-4 bg-primary h-14"></div>
          <div className="w-4 bg-primary h-10"></div>
        </div>
      </div>

      {/* Text */}
      <p className="text-pretty text-lg font-semibold tracking-wide flex items-center gap-2">
        {error && <Info className="text-red-500" />}
        <span className="text-primary ">{message}</span>
      </p>
    </div>
  );
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
