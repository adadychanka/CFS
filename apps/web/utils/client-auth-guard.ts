"use client";

import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

/**
 * Client function for handling auth errors
 * - 401 - logs out the user
 * - 403 - redirects user to /suspended
 */
export const clientAuthGuard = (statusCode: number) => {
  if (statusCode === 403) {
    redirect("/suspended");
  } else if (statusCode === 401) {
    signOut({ redirectTo: "/log-in" });
  }

  return null;
};
