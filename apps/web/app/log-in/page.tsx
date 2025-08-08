import React from "react";

import { AuthCard } from "@/components/auth-card";
import AuthCardWrapper from "@/components/auth-card-wrapper";

function Page() {
  return (
    <AuthCardWrapper>
      <AuthCard />
    </AuthCardWrapper>
  );
}

export default Page;
