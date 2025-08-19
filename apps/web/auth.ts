import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import z from "zod";
import { loginOrRegisterAction } from "./lib/actions";
import { authConfig } from "./auth.config";
import "next-auth/jwt";
import { Auth, SignIn, SignOut } from "./types/next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      role: string;
    };
  }
  interface User {
    token: string;
    role: string;
    name: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token: string;
    role: string;
    email?: string;
    name?: string;
  }
}

const nextAuthInstance = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(8),
            variant: z.enum(["sign-in", "sign-up"]),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password, variant } = parsedCredentials.data;
          try {
            const response = await loginOrRegisterAction(
              { email, password },
              variant,
            );

            if (!response || !response.data) return null;

            return {
              token: response.data.token,
              role: response.data.role,
              email: response.data.email || "",
              name: response.data.name || "",
            };
          } catch (error: unknown) {
            if (
              error instanceof Object &&
              "response" in error &&
              error.response instanceof Object &&
              "data" in error.response &&
              error.response.data instanceof Object &&
              "message" in error.response.data &&
              typeof error.response.data.message === "string"
            ) {
              return null;
            } else {
              throw new Error("Something went wrong.");
            }
          }
        }

        return null;
      },
    }),
  ],
});

export const auth: Auth = nextAuthInstance.auth;
export const signIn: SignIn = nextAuthInstance.signIn;
export const signOut: SignOut = nextAuthInstance.signOut;
