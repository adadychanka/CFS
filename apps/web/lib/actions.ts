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

//TODO: Change types for Post method in API call
const register = async ({ email, password }: UserCredentials) => {
  const api = await getServerApi();
  return await api.post<AuthResponse>("/api/auth/register", {
    email,
    password,
  });
};

const login = async ({ email, password }: UserCredentials) => {
  const api = await getServerApi();
  return await api.post<AuthResponse>("/api/auth/login/admin", {
    email,
    password,
  });
};

const adminRegister = async ({ email, password }: UserCredentials) => {
  const api = await getServerApi();
  return await api.post<AuthResponse>("/api/auth/register/admin", {
    email,
    password,
  });
};

const adminLogin = async ({ email, password }: UserCredentials) => {
  const api = await getServerApi();
  return await api.post<AuthResponse>("/api/auth/login/admin", {
    email,
    password,
  });
};

const loginOrRegister = async (
  authType: AuthCardVariant,
  userCredentials: UserCredentials,
) => {
  switch (authType) {
    case "sign-in":
      return await login(userCredentials);
    case "sign-up":
      return await register(userCredentials);
    case "admin-sign-up":
      return await adminRegister(userCredentials);
    case "admin-sign-in":
      return await adminLogin(userCredentials);
    default:
      return await login(userCredentials);
  }
};

export const authenticate = async (
  authType: AuthCardVariant,
  userCredentials: UserCredentials,
) => {
  let result: AuthResult | null = null;

  const response = await loginOrRegister(authType, userCredentials);
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
