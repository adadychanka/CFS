"use client";

import { Button } from "@repo/ui/components/button";
import { Plus } from "lucide-react";
import NewWorkspaceModal from "@/features/workspaces/new-workspace/new-workspace-modal";
import { useState } from "react";

type Props = {
  onRefetchWorkspaces: () => void;
};

const WelcomeHeader = ({ onRefetchWorkspaces }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full flex flex-col gap-4 pt-4 md:flex-row md:items-start md:justify-between">
      <div className="flex-1">
        <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
        <p className="mt-1 text-sm text-muted-foreground max-w-prose">
          Create and manage your workspaces in one place. Each workspace opens a
          dedicated dashboard where you can analyze project feedback.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <NewWorkspaceModal
          isOpen={isOpen}
          onModalToggle={setIsOpen}
          onRefetchWorkspaces={onRefetchWorkspaces}
        >
          <Button aria-label="Create workspace">
            <Plus />
            Create workspace
          </Button>
        </NewWorkspaceModal>
      </div>
    </header>
  );
};

export default WelcomeHeader;
