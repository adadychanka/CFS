import { Button } from "@repo/ui/components/button";
import { Box, RefreshCcw } from "lucide-react";
import { TableCell, TableRow } from "@repo/ui/components/table";

type Props = {
  type: "empty" | "error";
  onRetry?: () => void;
};

/**
 * Table item for displaying empty list or error messages
 *
 * @param type
 * @param onRetry
 * @constructor
 */
const UsersEmpty = ({ type, onRetry }: Props) => {
  // TODO: we can make one with <NoFeedbackMessage />
  let content;
  const isError = type === "error";

  if (isError) {
    content = (
      <>
        <p className="text-lg font-medium">Something went wrong</p>
        <p className="text-sm text-neutral-600">
          We couldn’t load the users. Please try again later.
        </p>
        {onRetry && (
          <Button
            variant="outline"
            onClick={onRetry}
            className="flex items-center gap-2"
            aria-label="Retry loading sentiment analysis"
          >
            <RefreshCcw className="h-4 w-4" />
            Try again
          </Button>
        )}
      </>
    );
  } else {
    content = (
      <>
        <p className="text-lg font-medium">No users found</p>
        <p className="text-sm text-neutral-600">
          Looks like there’s nothing here yet. Check back later.
        </p>
      </>
    );
  }

  return (
    <TableRow>
      <TableCell colSpan={5} className="text-center py-16 text-neutral-800">
        <div className="flex flex-col items-center justify-center gap-4">
          <Box className="h-16 w-16 text-neutral-300" />
          {content}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default UsersEmpty;
