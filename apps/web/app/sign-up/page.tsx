import { AuthCard } from "@/components/auth-card";
import AuthCardWrapper from "@/components/auth-card-wrapper";
import React from "react";

function Page() {
  return (
    <AuthCardWrapper>
      <AuthCard variant="sign-up" />
    </AuthCardWrapper>
  );
}

export default Page;
