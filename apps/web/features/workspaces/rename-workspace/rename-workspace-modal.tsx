import { Dialog } from "@repo/ui/components/dialog";
import { toast } from "sonner";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import { renameNewWorkspace } from "@/lib/actions/workspaces";
import WorkspaceModalContent, {
  type WorkspaceFormValues,
} from "@/features/workspaces/workspace-modal-content";

type Props = {
  workspace: {
    id: string;
    name: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRefetchWorkspaces: () => void;
};

const RenameWorkspaceModal = ({
  workspace,
  open,
  onOpenChange,
  onRefetchWorkspaces,
}: Props) => {
  const onSubmit = async (values: WorkspaceFormValues, reset: () => void) => {
    const result = await renameNewWorkspace(workspace.id, values.name);
    if (result.success) {
      onRefetchWorkspaces();
      reset();
      toast.success("Workspace renamed successfully!");
      onOpenChange(false);
    } else {
      clientAuthGuard(result.status);
      toast.error("Could not rename the workspace");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <WorkspaceModalContent
        title="Rename Workspace"
        description="Enter a new name for your workspace."
        submitLabel="Rename"
        submittingLabel="Renaming..."
        defaultName={workspace.name}
        onSubmit={onSubmit}
      />
    </Dialog>
  );
};

export default RenameWorkspaceModal;
