import { Badge } from "@repo/ui/components/badge";
import { type Sentiment } from "@/types/sentimentAnalysisResult";

const sentimentColors: Record<Sentiment, string> = {
  positive: "bg-green-200 text-green-800",
  neutral: "bg-yellow-200 text-yellow-800",
  negative: "bg-red-200 text-red-800",
  unknown: "bg-neutral-200 text-neutral-800",
};

const FeedbackBadge = ({ sentiment }: { sentiment: Sentiment }) => {
  return (
    <Badge
      className={`w-[80px] text-center ${sentimentColors[sentiment]}`}
      variant="secondary"
    >
      {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
    </Badge>
  );
};

export default FeedbackBadge;
