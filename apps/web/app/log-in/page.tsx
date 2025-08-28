import React from "react";

import { AuthCard } from "@/components/auth/auth-card";
import AuthCardWrapper from "@/components/auth/auth-card-wrapper";

function Page() {
  return (
    <AuthCardWrapper>
      <AuthCard variant="sign-in" />
    </AuthCardWrapper>
  );
}

export default Page;
