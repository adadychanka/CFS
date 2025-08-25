"use server";

import { AuthError } from "next-auth";
import type {
  AuthResponse,
  AuthResult,
  UserCredentials,
} from "@/types/next-auth";
import { AuthCardVariant } from "@/utils/get-card-content";
import { signIn, signOut } from "@/auth/auth";
import { getServerApi } from "./server-api";

const api = await getServerApi();

//TODO: Change types for Post method in API call
const register = async ({ email, password }: UserCredentials) => {
  return await api.post<AuthResponse>("/api/auth/register", {
    email,
    password,
  });
};

const login = async ({ email, password }: UserCredentials) => {
  return await api.post<AuthResponse>("/api/auth/login", {
    email,
    password,
  });
};

export const loginOrRegister = async (
  authType: AuthCardVariant,
  userCredentials: UserCredentials,
) => {
  let result: AuthResult | null = null;

  const response =
    authType === "sign-in"
      ? await login(userCredentials)
      : await register(userCredentials);

  if (response.data) {
    result = response.data;
  }

  return result;
};

export async function authAction(formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid email or password";
        default:
          return "Authentication failed";
      }
    }
    throw error;
  }
}

export async function logout() {
  try {
    await signOut({ redirectTo: "/" });

    //eslint-disable-next-line
  } catch (error) {
    // TODO: May use toaster to alert user about failure
  }
}
