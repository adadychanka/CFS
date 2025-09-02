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
  const { data, error, isLoading } = useSWR<GetSuspiciousActivitiesResponse>(
    `/api/admin/suspicious-activities`,
    fetcher,
    {
      keepPreviousData: true,
    },
  );

  console.log(data && data);

  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead className="width-[120px] text-center">Action</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.suspiciousActivities.map((alert, idx) => (
              <TableRow key={idx}>
                <TableCell>{alert.email || "unknown user"}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={`w-[100px] capitalize ${actionColors[alert.action]}`}
                  >
                    {alert.action.toLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell>{alert.details}</TableCell>
                <TableCell>{formatCreatedAtDate(alert.createdAt)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AlertsList;
