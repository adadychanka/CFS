import { NextAuthResult } from "next-auth";

export type Auth = NextAuthResult["auth"];
export type SignIn = NextAuthResult["signIn"];
export type SignOut = NextAuthResult["signOut"];
export type Handlers = NextAuthResult["handlers"];

export type UserCredentials = {
  email: string;
  password: string;
};

export type AuthResult = {
  token: string;
  role: string;
  redirectTo: string;
} | null;
