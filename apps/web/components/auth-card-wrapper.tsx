import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function AuthCardWrapper({ children }: Props) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {children}
    </div>
  );
}

export default AuthCardWrapper;
