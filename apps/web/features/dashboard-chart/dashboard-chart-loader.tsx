"use client";

export default function DashboardChartLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div className="flex items-end gap-1">
          <div className="w-4 bg-primary animate-bounce h-16"></div>
          <div className="w-4 bg-primary animate-bounce h-12 delay-150"></div>
          <div className="w-4 bg-primary animate-bounce h-14 delay-300"></div>
          <div className="w-4 bg-primary animate-bounce h-10 delay-450"></div>
        </div>
      </div>

      <p className="text-primary text-lg font-semibold tracking-wide animate-pulse">
        LOADING...
      </p>
    </div>
  );
}
