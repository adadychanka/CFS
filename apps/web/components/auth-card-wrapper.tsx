import React, { ReactNode, Suspense } from "react";

type Props = {
  children: ReactNode;
};

function AuthCardWrapper({ children }: Props) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {/* TODO: Create custom loading later  */}
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
    </div>
  );
}

export default AuthCardWrapper;
