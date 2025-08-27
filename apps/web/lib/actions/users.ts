"use server";

import { auth } from "@/auth/auth";
import { User } from "@/types/user";
import process from "node:process";

export async function suspendUnsuspendUser(user: User) {
  const session = await auth();
  if (!session) {
    return { success: false, status: 401, message: "Unauthorized" };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API}/api/admin/disable/${user.id}`,
      {
        method: "POST",
        headers: {
          // Authorization: `Bearer ${session.user.token}`,
          // eslint-disable-next-line turbo/no-undeclared-env-vars
          Authorization: `Bearer ${process.env.TEMP_ADMIN_TOKEN}`,
        },
      },
    );

    if (!res.ok) {
      const data = await res.json();
      return { success: false, status: res.status, message: data.message };
    }

    return {
      success: true,
      status: 201,
      message: "Feedbacks uploaded successfully",
    };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Internal Server Error";
    return { success: false, status: 500, message };
  }
}
