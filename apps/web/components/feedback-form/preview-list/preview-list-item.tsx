import { TableCell, TableRow } from "@repo/ui/components/table";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Trash2 } from "lucide-react";
import React from "react";
import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";
import { FEEDBACK_MAX_ITEMS } from "@/constants/constants";

type Props = {
  index: number;
  feedback: PreviewFeedback;
  onRemoveFeedback: (feedbackId: string) => void;
};

const PreviewListItem = ({ index, feedback, onRemoveFeedback }: Props) => {
  const isReadyToAnalyze = index >= FEEDBACK_MAX_ITEMS;

  return (
    <TableRow
      key={feedback.id}
      className={isReadyToAnalyze ? "text-neutral-600" : ""}
    >
      <TableCell className="pl-4 font-medium">{index + 1}</TableCell>
      <TableCell className="whitespace-normal break-words">
        {feedback.feedback}
      </TableCell>
      <TableCell className="whitespace-normal break-words">
        <Badge
          className={`w-[80px] text-center ${isReadyToAnalyze ? "bg-gray-200" : "bg-green-200"}`}
          variant="secondary"
        >
          {isReadyToAnalyze ? "in queue" : "ready"}
        </Badge>
      </TableCell>
      <TableCell className="text-center">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onRemoveFeedback(feedback.id)}
        >
          <Trash2 className="w-4 h-4 mr-1" /> Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default PreviewListItem;
