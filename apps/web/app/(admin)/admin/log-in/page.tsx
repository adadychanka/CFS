import React from "react";

import { AuthCard } from "@/components/auth/auth-card";
import AuthCardWrapper from "@/components/auth/auth-card-wrapper";
import { auth } from "@/auth/auth";

async function Page() {
  const session = await auth();
  const isAdmin = session?.user.role === "ADMIN";

  return (
    <AuthCardWrapper>
      <AuthCard variant="admin-sign-in" isAdmin={isAdmin} />
    </AuthCardWrapper>
  );
}

export default Page;
