import { Button } from "@repo/ui/components/button";
import { TableCell, TableRow } from "@repo/ui/components/table";
import { Box, RefreshCcw } from "lucide-react";

type NoFeedbackMessageProps = {
  type?: "empty" | "error";
  onRetry?: () => void;
};

const NoFeedbackMessage = ({
  type = "empty",
  onRetry,
}: NoFeedbackMessageProps) => {
  const isError = type === "error";

  return (
    <TableRow>
      <TableCell colSpan={5} className="text-center py-16 text-neutral-800">
        <div className="flex flex-col items-center justify-center gap-4">
          <Box className="h-16 w-16 text-neutral-300" />
          {isError ? (
            <>
              <p className="text-lg font-medium">Something went wrong</p>
              <p className="text-sm text-neutral-600">
                We couldn’t load the feedback. Please try again.
              </p>
              {onRetry && (
                <Button
                  variant="outline"
                  onClick={onRetry}
                  className="flex items-center gap-2"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Try again
                </Button>
              )}
            </>
          ) : (
            <>
              <p className="text-lg font-medium">No feedbacks found</p>
              <p className="text-sm text-neutral-600">
                Looks like there’s nothing here yet. Check back later or add
                some feedback.
              </p>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default NoFeedbackMessage;
