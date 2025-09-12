"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { FetchError } from "@/lib/errors";
import useSWR from "swr";
import { GetSuspiciousActivitiesResponse } from "@/types/http";
import { useSearchParams } from "next/navigation";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import { useCallback, useEffect } from "react";
import AlertRow from "@/features/alerts-list/alert-row";
import TableStateHandler from "@/features/error-messages/table-error-states/table-state-handler";
import TableSkeleton from "@/features/error-messages/table-error-states/table-skeleton";
import { SuspiciousActivity } from "@/types/suspicious-activity";
import ClientPagination from "@/components/pagination/client-pagination";

const COL_SPAN = 5;

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new FetchError(data.message || "Something went wrong", res.status);
  }
  return data.data;
};

const AlertsList = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data, error, isLoading } = useSWR<GetSuspiciousActivitiesResponse>(
    `/api/admin/suspicious-activities?page=${currentPage}&limit=20`,
    fetcher,
    { keepPreviousData: true },
  );

  useEffect(() => {
    if (error instanceof FetchError) clientAuthGuard(error.status);
  }, [error]);

  const renderRows = useCallback(
    (rows: SuspiciousActivity[]) =>
      rows.map((alert) => (
        <AlertRow key={alert.ip + alert.createdAt} alert={alert} />
      )),
    [],
  );

  return (
    <div>
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[260px]">Email</TableHead>
              <TableHead className="w-[140px]">IP address</TableHead>
              <TableHead className="w-[120px] text-center">Action</TableHead>
              <TableHead>Alert Details</TableHead>
              <TableHead className="w-[120px]">Detected At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableStateHandler
              isLoading={isLoading}
              error={error}
              data={data?.activities}
              colSpan={COL_SPAN}
              skeleton={
                <TableSkeleton
                  rows={20}
                  columns={COL_SPAN}
                  cellClassName="px-2 py-3 h-[39px]"
                />
              }
              emptyState={{
                title: "No alerts found",
                description:
                  "No suspicious activities have been detected yet. When new alerts are generated, they’ll appear here.",
              }}
              renderRows={renderRows}
            />
          </TableBody>
        </Table>
      </div>

      <ClientPagination limit={data?.pagination.pages ?? 1} />
    </div>
  );
};

export default AlertsList;
