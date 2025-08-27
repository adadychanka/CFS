import { TableCell, TableRow } from "@repo/ui/components/table";
import ErrorEmptyList from "@/features/error-messages/error-empty-list";
import ErrorUnexpected from "@/features/error-messages/error-unexpected";
import ErrorTooManyRequests from "@/features/error-messages/error-too-many-requests";

type NoFeedbackMessageProps = {
  type: "empty" | "error" | "tooManyRequests";
};

const NoFeedbackMessage = ({ type }: NoFeedbackMessageProps) => {
  let content;

  if (type == "empty") {
    content = (
      <ErrorEmptyList
        title="No feedback found"
        description="Looks like there’s nothing here yet. Check back later or add some
          feedback."
      />
    );
  } else if (type == "tooManyRequests") {
    content = <ErrorTooManyRequests />;
  } else {
    content = (
      <ErrorUnexpected description="We couldn’t load the feedback. Please try again." />
    );
  }

  return (
    <TableRow>
      <TableCell colSpan={5}>{content}</TableCell>
    </TableRow>
  );
};

export default NoFeedbackMessage;
