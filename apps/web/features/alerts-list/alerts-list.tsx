"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { Badge } from "@repo/ui/components/badge";
import { formatCreatedAtDate } from "@/utils/date-utils";
import { FetchError } from "@/lib/errors";
import useSWR from "swr";
import { GetSuspiciousActivitiesResponse } from "@/types/http";
import FeedbackTablePagination from "@/components/user-feedback/feedback-table-pagination";
import { useSearchParams } from "next/navigation";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import { useEffect } from "react";

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new FetchError(data.message || "Something went wrong", res.status);
  }

  return data.data;
};

const actionColors: Record<string, string> = {
  API: "bg-blue-100 text-blue-800",
  DOWNLOAD: "bg-green-100 text-green-800",
  LOGIN: "bg-yellow-100 text-yellow-800",
  UPLOAD: "bg-purple-100 text-purple-800",
};

const AlertsList = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data, error, isLoading } = useSWR<GetSuspiciousActivitiesResponse>(
    `/api/admin/suspicious-activities?page=${currentPage}&limit=20`,
    fetcher,
    {
      keepPreviousData: true,
    },
  );

  useEffect(() => {
    if (error instanceof FetchError) clientAuthGuard(error.status);
  }, [error]);

  return (
    <div>
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[260px]">Email</TableHead>
              <TableHead className="w-[120px] text-center">Action</TableHead>
              <TableHead>Details</TableHead>
              <TableHead className="w-[120px]">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.suspiciousActivities.map((alert, idx) => (
                <TableRow key={idx}>
                  <TableCell className="max-w-[240px] truncate">
                    {alert.email || "unknown user"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={`w-[80px] capitalize ${actionColors[alert.action]}`}
                    >
                      {alert.action.toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="truncate max-w-[400px]">
                    {alert.details}
                  </TableCell>
                  <TableCell>{formatCreatedAtDate(alert.createdAt)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      {data && <FeedbackTablePagination limit={data.pagination.pages ?? 1} />}
    </div>
  );
};

export default AlertsList;
