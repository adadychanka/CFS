export function createWorkspaceUrl(workspaceId: string, endpoint: string) {
  return `/api/workspaces/${workspaceId}${endpoint}`;
}
