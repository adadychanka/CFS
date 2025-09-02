import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { Badge } from "@repo/ui/components/badge";
import { fakeAlerts } from "@/features/alerts-list/fake-alerts";
import { formatCreatedAtDate } from "@/utils/date-utils";

const actionColors: Record<string, string> = {
  API: "bg-blue-100 text-blue-800",
  DOWNLOAD: "bg-green-100 text-green-800",
  LOGIN: "bg-yellow-100 text-yellow-800",
  UPLOAD: "bg-purple-100 text-purple-800",
};

const AlertsList = () => {
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
          {fakeAlerts.map((alert, idx) => (
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
