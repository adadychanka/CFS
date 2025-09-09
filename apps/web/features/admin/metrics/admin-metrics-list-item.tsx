import React from "react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import type { AdminMetrics } from "@/types/metrics";

function AdminMetricsListItem({ title, count, footerText }: AdminMetrics) {
  return (
    <Card className="@container/card transition-all duration-300 hover:shadow-md hover:border-primary/20">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {count}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">{footerText}</div>
      </CardFooter>
    </Card>
  );
}

export default AdminMetricsListItem;
