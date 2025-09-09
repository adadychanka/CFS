import { AdminMetrics } from "@/types/metrics";
import React from "react";
import { CardSkeletonGroup } from "./admin-metrics-skeleton";
import ErrorUnexpected from "@/features/error-messages/error-unexpected";
import { ErrorEmptyList } from "@/features/error-messages/error-empty-list";
import AdminMetricsList from "./admin-metrics-list";

type Props = {
  isLoading: boolean;
  error: unknown;
  data?: AdminMetrics[];
};

function AdminMetricsContent({ isLoading, error, data }: Props) {
  if (isLoading && !error) return <CardSkeletonGroup count={3} />;
  if (!isLoading && error)
    return (
      <ErrorUnexpected description="An unexpected error occurred to load the metrics" />
    );
  if (!isLoading && !error && (!data || data.length === 0)) {
    return (
      <ErrorEmptyList
        description="Please check back later again."
        title="No metrics found"
      />
    );
  }
  if (!isLoading && !error && data) {
    return (
      <div className="@container/main py-4 md:gap-6 md:py-6">
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
          <AdminMetricsList stats={data} />
        </div>
      </div>
    );
  }

  return (
    <ErrorEmptyList
      description="Please check back later again."
      title="No metrics found"
    />
  );
}

export default AdminMetricsContent;
