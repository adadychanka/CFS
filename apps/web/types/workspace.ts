export type Workspace = {
  id: string;
  name: string;
  description: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type WorkspaceContextValue = {
  selectedWorkspace: Workspace | null;
  workspaces: Workspace[];
  setWorkspaceById: (id: string) => void;
};
