import type { AdminMetricsResponseData, AdminMetrics } from "@/types/metrics";
import { aggregateSum } from "./aggregate-sum";

const createStat = (title: string, count: number, footerText: string) => ({
  footerText,
  title,
  count,
});

export function getAdminMetrics(adminMetricsData: AdminMetricsResponseData) {
  const uploadsCount = adminMetricsData.uploads;
  const apiUsageCount = aggregateSum(adminMetricsData.apiUsage, "count");
  const errorRatesCount = aggregateSum(adminMetricsData.errorRates, "count");

  const metrics: AdminMetrics[] = [
    createStat("Total Uploads", uploadsCount, "Total manual and file uploads"),
    createStat("API Usage", apiUsageCount, "Total API requests made"),
    createStat("Error Count", errorRatesCount, "Total failed requests"),
  ];

  return metrics;
}
