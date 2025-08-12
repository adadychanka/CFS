import { TableCell, TableRow } from "@repo/ui/components/table";
import { Box } from "lucide-react";

const NoFeedbackMessage = () => {
  return (
    <TableRow>
      <TableCell colSpan={5} className="text-center py-16 text-neutral-800">
        <div className="flex flex-col items-center justify-center gap-4">
          <Box className="h-16 w-16 text-neutral-300" />
          <p className="text-lg font-medium">No feedbacks found</p>
          <p className="text-sm text-neutral-600">
            Looks like there’s nothing here yet. Check back later or add some
            feedback.
          </p>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default NoFeedbackMessage;
