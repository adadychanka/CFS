import { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";
import { Button } from "@repo/ui/components/button";
import { formatCreatedAtDate } from "@/utils/date-utils";
import FeedbackBadge from "@/components/user-feedback/feedback-badge";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/sheet";

export default function FeedbackDetailsSheet({
  children,
  feedback,
}: {
  children: React.ReactNode;
  feedback: SentimentAnalysisResult;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="w-[400px] sm:w-[500px]">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">
            Feedback Details
          </SheetTitle>
          <SheetDescription>
            Full details of the selected user feedback.
          </SheetDescription>
        </SheetHeader>

        <div className="mx-6 space-y-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Summary</p>
            <p className="font-medium">{feedback.summary}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Sentiment</p>
            <FeedbackBadge sentiment={feedback.sentiment} />
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Confidence</p>
            <p className="font-medium">{feedback.confidence}%</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Content</p>
            <p className="text-base">{feedback.content}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Created At</p>
            <p className="font-medium">
              {formatCreatedAtDate(feedback.createdAt)}
            </p>
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" className="w-full cursor-pointer">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
