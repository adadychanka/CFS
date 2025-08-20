import { NextAuthResult } from "next-auth";
import z from "zod";

export type Auth = NextAuthResult["auth"];
export type SignIn = NextAuthResult["signIn"];
export type SignOut = NextAuthResult["signOut"];
export type Handlers = NextAuthResult["handlers"];

export type UserCredentials = {
  email: string;
  password: string;
};

export const AuthResponseSchema = z.object({
  success: z.boolean(),
  statusCode: z.number(),
  message: z.string(),
  data: z
    .object({
      token: z.string(),
      role: z.string(),
      redirectTo: z.string(),
    })
    .optional(),
  errors: z
    .array(
      z.object({
        field: z.string(),
        message: z.string(),
        code: z.string(),
      }),
    )
    .optional(),
  path: z.string().optional(),
  timestamp: z.string(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;

export type AuthResult = NonNullable<AuthResponse["data"]>;
