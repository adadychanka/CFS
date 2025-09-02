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
import AlertsSkeleton from "@/features/alerts-list/alerts-skeleton";
import TableErrorTooManyRequests from "@/features/error-messages/table-error-states/table-error-too-many-requests";
import TableErrorUnexpected from "@/features/error-messages/table-error-states/table-error-unexpected";
import TableErrorEmptyList from "@/features/error-messages/table-error-states/table-error-empty-list";

const COL_SPAN = 4;

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

  let content;

  if (isLoading) content = <AlertsSkeleton />;
  else if (error?.status === 429) {
    content = (
      <TableErrorTooManyRequests
        description="You’ve made too many requests in a short time. Please wait before trying again."
        colSpan={COL_SPAN}
      />
    );
  } else if (error) {
    content = (
      <TableErrorUnexpected
        description="We couldn’t load the alerts. Please try again later."
        colSpan={COL_SPAN}
      />
    );
  } else if (data?.suspiciousActivities.length === 0) {
    content = (
      <TableErrorEmptyList
        title="No alerts found"
        description="No suspicious activities have been detected yet. When new alerts are generated, they’ll appear here."
        colSpan={COL_SPAN}
      />
    );
  } else {
    content =
      data &&
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
      ));
  }

  return (
    <div>
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[260px]">Email</TableHead>
              <TableHead className="w-[120px] text-center">Activity</TableHead>
              <TableHead>Alert Details</TableHead>
              <TableHead className="w-[120px]">Detected At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{content}</TableBody>
        </Table>
      </div>

      <FeedbackTablePagination limit={data?.pagination.pages ?? 1} />
    </div>
  );
};

export default AlertsList;
