import React, { Suspense } from "react";

import { AuthCard } from "@/components/auth-card";
import AuthCardWrapper from "@/components/auth-card-wrapper";

function Page() {
  return (
    <AuthCardWrapper>
      <Suspense>
        <AuthCard variant="sign-in" />
      </Suspense>
    </AuthCardWrapper>
  );
}

export default Page;
