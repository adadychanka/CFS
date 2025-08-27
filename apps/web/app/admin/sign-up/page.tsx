import { auth } from "@/auth/auth";
import { AuthCard } from "@/components/auth/auth-card";
import AuthCardWrapper from "@/components/auth/auth-card-wrapper";
import { redirect } from "next/navigation";
import React from "react";

async function Page() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    redirect("/admin/log-in");
  }
  return (
    <AuthCardWrapper>
      <AuthCard variant="admin-sign-up" />
    </AuthCardWrapper>
  );
}

export default Page;
