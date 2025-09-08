export type UserAccountStatus = "disabled" | "suspended" | "active";

export type User = {
  email: string;
  role: "USER" | "ADMIN";
  isSuspended: boolean;
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
