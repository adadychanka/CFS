import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

async function AdminLayoutWrapper({ children }: Props) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  return <>{children}</>;
}

export default AdminLayoutWrapper;
