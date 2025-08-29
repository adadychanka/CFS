import { auth } from "@/auth/auth";
import { FC } from "react";

interface WithAdminProps {
  isAdmin: boolean;
}

export const withAdminAccess = <T extends object>(
  WrappedComponent: FC<T & WithAdminProps>,
) => {
  return async function AdminWrapper(props: T) {
    const session = await auth();
    const isAdmin = session?.user.role === "ADMIN";

    return <WrappedComponent isAdmin={isAdmin} {...props} />;
  };
};
