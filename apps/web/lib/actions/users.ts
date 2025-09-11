"use server";

import callBackend from "@/lib/call-backend";

export async function toggleUserSuspend(userId: string) {
  return callBackend(
    `/api/admins/suspend/${userId}`,
    { method: "POST" },
    "User suspend toggled successfully",
  );
}

export async function disableUser(userId: string) {
  return callBackend(
    `/api/admins/disable/${userId}`,
    { method: "POST" },
    "User has been suspended successfully",
  );
}
