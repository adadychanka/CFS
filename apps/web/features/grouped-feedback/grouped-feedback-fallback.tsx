import { Box } from "lucide-react";
import { GroupedFeedbackSkeleton } from "./grouped-feedback-skeleton";

type Props = {
  error?: boolean;
  empty?: boolean;
  loading?: boolean;
};

const GroupedFeedbackFallback = ({ error, loading, empty }: Props) => {
  let content;

  if (loading) {
    return <GroupedFeedbackSkeleton />;
  }

  if (error) {
    content = (
      <>
        <p className="text-lg font-medium">Something went wrong</p>
        <p className="text-sm text-neutral-600">
          We couldn’t load the grouped feedback. Please try again later.
        </p>
      </>
    );
  }

  if (empty) {
    content = content = (
      <>
        <p className="text-lg font-medium">No grouped feedback found</p>
        <p className="text-sm text-neutral-600">
          Looks like there’s nothing here yet. Check back later or add some
          feedback.
        </p>
      </>
    );
  }

  return (
    <div className="text-center py-16 text-neutral-800">
      <div className="flex flex-col items-center justify-center gap-4">
        <Box className="h-16 w-16 text-neutral-300" />
        {content}
      </div>
    </div>
  );
};

export default GroupedFeedbackFallback;
