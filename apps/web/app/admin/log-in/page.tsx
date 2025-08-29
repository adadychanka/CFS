import React from "react";
import AuthCardWrapper from "@/components/auth/auth-card-wrapper";
import { AuthCard } from "@/components/auth/auth-card";

async function Page() {
  return (
    <AuthCardWrapper>
      <AuthCard variant="admin-sign-in" />
    </AuthCardWrapper>
  );
}

export default Page;
