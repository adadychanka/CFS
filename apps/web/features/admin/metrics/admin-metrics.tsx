"use client";

import useSWR from "swr";
import { clientApi } from "@/lib/api";
import { FetchError } from "@/lib/errors";
import type { AdminMetricsClientResponse } from "@/types/metrics";
import AdminMetricsContent from "./admin-metrics-content";

export const fetcher = async (url: string) => {
  const res = await clientApi.get(url);
  const data = await res.json();

  if (!res.ok) {
    throw new FetchError(
      data.message || "Something went wrong",
      res.status,
      data,
    );
  }

  return data;
};

export function AdminMetrics() {
  const {
    data: result,
    error,
    isLoading,
  } = useSWR<AdminMetricsClientResponse>("/api/admin/metrics", fetcher);

  return (
    <AdminMetricsContent
      isLoading={isLoading}
      error={error}
      data={result?.data}
    />
  );
}
