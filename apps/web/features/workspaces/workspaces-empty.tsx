import { Box } from "lucide-react";
import { Button } from "@repo/ui/components/button";

type Props = {
  onClickCreate: () => void;
};

const WorkspacesEmpty = ({ onClickCreate }: Props) => {
  // TODO: connect once create is ready
  return (
    <div className="py-8 px-4 flex flex-col items-center justify-center gap-4 text-center">
      <Box className="text-neutral-300 h-12 w-12" />
      <p className="text-sm text-neutral-600">
        You don&#39;t have any workspaces
      </p>

      <Button
        size="sm"
        variant="outline"
        className="flex items-center gap-2"
        aria-label="Create a new workspace"
        onClick={onClickCreate}
      >
        Create a new workspace
      </Button>
    </div>
  );
};

export default WorkspacesEmpty;
