import { AuthResult } from "@/types/next-auth";

export function isAuthResult(value: unknown): value is AuthResult {
  if (value === null) return true;

  if (typeof value === "object" && value !== null) {
    const obj = value as Record<string, unknown>;
    return (
      typeof obj.token === "string" &&
      typeof obj.role === "string" &&
      typeof obj.redirectTo === "string"
    );
  }

  return false;
}
