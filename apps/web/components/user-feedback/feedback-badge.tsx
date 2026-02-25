import { Badge } from "@repo/ui/components/badge";
import { type Sentiment } from "@/types/sentiment-analysis-result";

const sentimentColors: Record<Sentiment, string> = {
  positive: "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200",
  neutral:
    "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  negative: "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200",
  unknown:
    "bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
};

const FeedbackBadge = ({ sentiment }: { sentiment: Sentiment }) => {
  return (
    <Badge
      className={`w-[80px] text-center ${sentimentColors[sentiment]} capitalize`}
      variant="secondary"
    >
      {sentiment}
    </Badge>
  );
};

export default FeedbackBadge;
