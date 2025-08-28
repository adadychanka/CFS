import { AuthCard } from "@/components/auth/auth-card";
import AuthCardWrapper from "@/components/auth/auth-card-wrapper";
import React from "react";

async function Page() {
  return (
    <AuthCardWrapper>
      <AuthCard variant="admin-sign-up" />
    </AuthCardWrapper>
  );
}

export default Page;
