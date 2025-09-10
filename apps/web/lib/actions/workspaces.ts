"use server";

import callBackend from "@/lib/call-backend";

export async function createNewWorkspace(workspaceName: string) {
  return callBackend(
    `/api/workspaces`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { name: workspaceName },
    },
    "Workspace created successfully",
  );
}

export async function deleteWorkspace(workspaceId: string) {
  return callBackend(
    `/api/workspaces/${workspaceId}`,
    {
      method: "DELETE",
    },
    "Workspace deleted successfully.",
  );
}
