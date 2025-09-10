"use server";

import callBackend from "@/lib/call-backend";

export async function deleteWorkspace(workspaceId: string) {
  return callBackend(
    `/api/workspaces`,
    {
      method: "DELETE",
    },
    "Workspace deleted successfully.",
  );
}
