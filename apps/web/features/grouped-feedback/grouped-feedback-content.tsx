import { GroupedFeedbackSkeleton } from "./grouped-feedback-skeleton";
import { FetchError } from "@/lib/errors";
import ErrorTooManyRequests from "../error-messages/error-too-many-requests";
import ErrorUnexpected from "../error-messages/error-unexpected";
import { ErrorEmptyList } from "../error-messages/error-empty-list";
import { GroupedFeedbackResponse } from "@/types/grouped-feedback";
import { Accordion } from "@repo/ui/components/accordion";
import SingleGroupedSentiments from "./single-grouped-sentiments";

type Props = {
  error?: FetchError;
  isLoading: boolean;
  data?: GroupedFeedbackResponse["data"];
};

const GroupedFeedbackContent = ({ error, isLoading, data }: Props) => {
  if (isLoading && !error) {
    return <GroupedFeedbackSkeleton />;
  }

  if (!isLoading && error && error.status === 429) {
    return <ErrorTooManyRequests />;
  }

  if (!isLoading && error && error.status !== 429) {
    return (
      <ErrorUnexpected description="We couldn’t load the grouped sentiments. Please try again later." />
    );
  }

  if (data?.length === 0 || !data) {
    return (
      <ErrorEmptyList
        title="No feedback found"
        description="Looks like there’s nothing here yet. Check back later or add some
                  feedback."
      />
    );
  }

  if (data)
    return (
      <Accordion type="single" className="w-full" collapsible>
        {data.map((group) => {
          return (
            <SingleGroupedSentiments
              key={group.summary}
              data={group.items}
              isLoading={isLoading}
              summary={group.summary}
            />
          );
        })}
      </Accordion>
    );

  return (
    <ErrorEmptyList
      title="No feedback found"
      description="Looks like there’s nothing here yet. Check back later or add some
                  feedback."
    />
  );
};

export default GroupedFeedbackContent;
