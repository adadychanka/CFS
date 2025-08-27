import AdminLayoutWrapper from "@/components/admin/admin-layout-wrapper";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function AdminLayout({ children }: Props) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}

export default AdminLayout;
