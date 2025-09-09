import React from "react";
import type { AdminMetrics } from "@/types/metrics";
import AdminMetricsListItem from "./admin-metrics-list-item";

type Props = { stats: AdminMetrics[] };

function AdminMetricsList({ stats }: Props) {
  return (
    <>
      {stats.map((stat) => {
        return (
          <AdminMetricsListItem
            key={stat.title}
            title={stat.title}
            count={stat.count}
            footerText={stat.footerText}
          />
        );
      })}
    </>
  );
}

export default AdminMetricsList;
