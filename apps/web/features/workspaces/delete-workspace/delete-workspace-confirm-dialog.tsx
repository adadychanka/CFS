import { DropdownMenuItem } from "@repo/ui/components/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/alert-dialog";
import { Trash } from "lucide-react";

type Props = {
  onCloseDropdown: () => void;
};

const DeleteWorkspaceConfirmDialog = ({ onCloseDropdown }: Props) => {
  return (
    <>
      <AlertDialog
        onOpenChange={(open) => {
          // Onn close, close parent too
          if (!open) onCloseDropdown();
        }}
      >
        <AlertDialogTrigger asChild>
          <DropdownMenuItem
            aria-label="Delete workspace"
            onSelect={(e) => {
              e.preventDefault(); // prevent parent dropdown from closing
            }}
          >
            <Trash />
            <span>Delete</span>
          </DropdownMenuItem>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Deleting a workspace will
              permanently remove all of its feedback sentiment analysis.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete workspace</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteWorkspaceConfirmDialog;
