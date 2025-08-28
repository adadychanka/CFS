import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import type { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";
import { FetchError } from "@/lib/errors";
import type { GroupedFeedbackDataItems } from "@/types/grouped-feedback";
import { UseDynamicTableData } from "@/hooks/useDynamicTableHeadsAndRows";
import useTableBody from "@/hooks/useTableBody";

export type DynamicTableProps = {
  feedbackList: SentimentAnalysisResult[] | GroupedFeedbackDataItems[];
  isLoading: boolean;
  feedbackLimit: number;
  isFilteringEnabled?: boolean;
  error?: FetchError;
  onRetry?: () => void;
  tableHeads: UseDynamicTableData["tableHeads"];
  tableRows: UseDynamicTableData["tableRows"];
};

function DynamicFeedbackTable({
  feedbackList,
  isLoading,
  feedbackLimit,
  error,
  tableHeads,
  tableRows,
  onRetry
}: DynamicTableProps) {
  const content = useTableBody({
    feedbackLimit,
    feedbackList,
    isLoading,
    tableRows,
    tableHeads,
    error,
    onRetry,
  });

  return (
    <Table className="min-w-[600px]">
      <TableHeader>
        <TableRow>{tableHeads}</TableRow>
      </TableHeader>
      <TableBody>{content}</TableBody>
    </Table>
  );
}

export default DynamicFeedbackTable;
