import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { Workspace, WorkspaceContextValue } from "@/types/workspace";
import { fakeWorkspaces } from "@/features/workspaces/fake-workspaces";

const initialWorkspaceContext: WorkspaceContextValue = {
  selectedWorkspace: null,
  workspaces: [],
  setWorkspaceById: () => {},
};

const WorkspaceContext = createContext<WorkspaceContextValue>(
  initialWorkspaceContext,
);

const WorkspaceProvider = ({ children }: { children: ReactNode }) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(
    null,
  );
  const [workspaces, setWorkspaces] = useState<Workspace[]>(fakeWorkspaces);

  const setWorkspaceById = useCallback(
    (id: string) => {
      const workspace = workspaces.find((w) => w.id === id) || null;
      setSelectedWorkspace(workspace);
    },
    [workspaces],
  );

  const value = {
    selectedWorkspace,
    workspaces,
    setWorkspaceById,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = (): WorkspaceContextValue => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
};

export default WorkspaceProvider;
