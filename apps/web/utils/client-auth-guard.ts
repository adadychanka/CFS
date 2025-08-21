"use client";

import { FetchError } from "@/lib/errors";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

/**
 * Client function for handling auth errors
 * - 401 - logs out the user
 * - 403 - redirects user to /suspended
 */
export const clientAuthGuard = (error: FetchError) => {
  if (error.status === 403) {
    redirect("/suspended");
  } else if (error.status === 401) {
    signOut({ redirectTo: "/log-in" });
  }

  return null;
};
