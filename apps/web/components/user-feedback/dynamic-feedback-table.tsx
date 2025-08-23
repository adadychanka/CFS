import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import SkeletonFeedbackItem from "@/components/user-feedback/skeleton-feedback-item";
import type { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";
import { FetchError } from "@/lib/errors";
import type { GroupedFeedbackDataItems } from "@/types/grouped-feedback";
import useGroupedSentimentTable from "@/hooks/useGroupedSentimentTable";
import useFeedbackTable from "@/hooks/useFeedbackTable";
import TableErrorTooManyRequests from "@/features/error-messages/table-error-states/table-error-too-many-requests";
import TableErrorUnexpected from "@/features/error-messages/table-error-states/table-error-unexpected";
import TableErrorEmptyList from "@/features/error-messages/table-error-states/table-error-empty-list";

type Props = {
  feedbackList: SentimentAnalysisResult[] | GroupedFeedbackDataItems[];
  isLoading: boolean;
  feedbackLimit: number;
  isFilteringEnabled?: boolean;
  error?: FetchError;
  onRetry?: () => void;
  isGrouped?: boolean;
};

const ERROR_ELEMENT_COL_SPAN = 5;

function DynamicFeedbackTable({
  feedbackList,
  isLoading,
  feedbackLimit,
  isFilteringEnabled,
  error,
  onRetry,
  isGrouped,
}: Props) {
  const groupedTable = useGroupedSentimentTable({
    data: isGrouped ? (feedbackList as GroupedFeedbackDataItems[]) : [],
  });

  const regularTable = useFeedbackTable({
    data: !isGrouped ? (feedbackList as SentimentAnalysisResult[]) : [],
  });

  const currentTable = isGrouped ? groupedTable : regularTable;

  return (
    <Table className="min-w-[600px]">
      <TableHeader>
        <TableRow>{currentTable.tableHeads}</TableRow>
      </TableHeader>

      <TableBody>
        {/* Loading */}
        {isLoading &&
          [...Array(feedbackLimit)].map((_, i) => (
            <SkeletonFeedbackItem key={i} />
          ))}

        {/* Error states */}
        {!isLoading && error && error.status === 429 && (
          <TableErrorTooManyRequests colSpan={ERROR_ELEMENT_COL_SPAN} />
        )}

        {!isLoading && error && error.status !== 429 && (
          <TableErrorUnexpected
            description="We couldn’t load the feedback. Please try again."
            colSpan={ERROR_ELEMENT_COL_SPAN}
          />
        )}

        {/* Empty */}
        {!isLoading && !error && feedbackList.length === 0 && (
          <TableErrorEmptyList
            title="No feedback found"
            description="Looks like there’s nothing here yet. Check back later or add some
          feedback."
            colSpan={ERROR_ELEMENT_COL_SPAN}
          />
        )}

        {/* Data */}
        {!isLoading &&
          !error &&
          feedbackList.length > 0 && currentTable.tableRows}
      </TableBody>
    </Table>
  );
}

export default DynamicFeedbackTable;
