export type User = {
  email: string;
  role: "USER" | "ADMIN";
  isDisabled: boolean;
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
