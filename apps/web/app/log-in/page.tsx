import React from "react";

import { AuthCard } from "@/components/auth-card";
import AuthCardWrapper from "@/components/auth-card-wrapper";

function Page() {
  return (
    <AuthCardWrapper>
      <AuthCard variant="sign-in" />
    </AuthCardWrapper>
  );
}

export default Page;
