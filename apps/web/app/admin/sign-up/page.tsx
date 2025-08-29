import React from "react";
import AuthCardWrapper from "@/components/auth/auth-card-wrapper";
import { AuthCard } from "@/components/auth/auth-card";

async function Page() {
  return (
    <AuthCardWrapper>
      <AuthCard variant="admin-sign-up" />
    </AuthCardWrapper>
  );
}

export default Page;
