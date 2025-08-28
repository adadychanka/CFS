import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import FeedbackBadge from "@/components/user-feedback/feedback-badge";
import { formatCreatedAtDate } from "@/utils/date-utils";
import SkeletonFeedbackItem from "@/components/user-feedback/skeleton-feedback-item";
import { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";
import { FetchError } from "@/lib/errors";
import { FeedbackTableFilterDropdown } from "@/components/user-feedback/feedback-table-filter-dropdown";
import TableErrorEmptyList from "@/features/error-messages/table-error-states/table-error-empty-list";
import TableErrorTooManyRequests from "@/features/error-messages/table-error-states/table-error-too-many-requests";
import TableErrorUnexpected from "@/features/error-messages/table-error-states/table-error-unexpected";

type Props = {
  feedbackList: SentimentAnalysisResult[];
  isLoading: boolean;
  feedbackLimit: number;
  isFilteringEnabled?: boolean;
  error?: FetchError;
};

const ERROR_ELEMENT_COL_SPAN = 5;

function DynamicFeedbackTable({
  feedbackList,
  isLoading,
  feedbackLimit,
  isFilteringEnabled,
  error,
}: Props) {
  return (
    <Table className="min-w-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Summary</TableHead>
          <TableHead className="w-[120px] text-center">
            {isFilteringEnabled ? <FeedbackTableFilterDropdown /> : "Sentiment"}
          </TableHead>
          <TableHead className="w-[100px] text-center">Confidence</TableHead>
          <TableHead className="min-w-[200px]">Content</TableHead>
          <TableHead className="w-[120px]">Created At</TableHead>
        </TableRow>
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
          feedbackList.length > 0 &&
          feedbackList.slice(0, feedbackLimit).map((feedback) => (
            <TableRow key={feedback.id} className="odd:bg-muted/50">
              <TableCell>{feedback.summary}</TableCell>
              <TableCell className="text-center">
                <FeedbackBadge sentiment={feedback.sentiment} />
              </TableCell>
              <TableCell className="text-center">
                {feedback.confidence}%
              </TableCell>
              <TableCell
                className="max-w-[300px] truncate"
                title={feedback.content}
              >
                {feedback.content}
              </TableCell>
              <TableCell>{formatCreatedAtDate(feedback.createdAt)}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default DynamicFeedbackTable;
