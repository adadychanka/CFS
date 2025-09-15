"use client";

import { Dialog, DialogTrigger } from "@repo/ui/components/dialog";
import { toast } from "sonner";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import { createNewWorkspace } from "@/lib/actions/workspaces";
import { ReactNode } from "react";
import WorkspaceModalContent, {
  WorkspaceFormValues,
} from "@/features/workspaces/workspace-modal-content";

type Props = {
  isOpen: boolean;
  onModalToggle: (isOpen: boolean) => void;
  onRefetchWorkspaces: () => void;
  children?: ReactNode;
};

const NewWorkspaceModal = ({
  isOpen,
  onModalToggle,
  onRefetchWorkspaces,
  children,
}: Props) => {
  const onSubmit = async (values: WorkspaceFormValues, reset: () => void) => {
    const result = await createNewWorkspace(values.name);
    if (result.success) {
      onModalToggle(false);
      onRefetchWorkspaces();
      reset();
      toast.success(result.message);
    } else {
      clientAuthGuard(result.status);
      toast.success("Could not create the workspace");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onModalToggle}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <WorkspaceModalContent
        title="Create New Workspace"
        description="Set up your workspace details. You can update these anytime."
        submitLabel="Create workspace"
        submittingLabel="Creating workspace..."
        onSubmit={onSubmit}
      />
    </Dialog>
  );
};

export default NewWorkspaceModal;
