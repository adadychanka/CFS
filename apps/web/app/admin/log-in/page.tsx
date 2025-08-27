import React from "react";

import { AuthCard } from "@/components/auth/auth-card";
import AuthCardWrapper from "@/components/auth/auth-card-wrapper";

async function Page() {
  return (
    <AuthCardWrapper>
      <AuthCard variant="admin-sign-in" />
    </AuthCardWrapper>
  );
}

export default Page;
