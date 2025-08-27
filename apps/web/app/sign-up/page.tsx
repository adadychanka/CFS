import { AuthCard } from "@/components/auth/auth-card";
import AuthCardWrapper from "@/components/auth/auth-card-wrapper";
import React from "react";

function Page() {
  return (
    <AuthCardWrapper>
      <AuthCard variant="sign-up" />
    </AuthCardWrapper>
  );
}

export default Page;
