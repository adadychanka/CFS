"use server";

import { AuthError } from "next-auth";
import { AuthResult, UserCredentials } from "@/types/next-auth";
import { AuthCardVariant } from "@/utils/get-card-content";
import { signIn, signOut } from "@/auth/auth";
import api from "./api";
import { isAuthResult } from "@/utils/type-guards";

export const uploadManualFeedbacks = async (feedbacks: string[]) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate error if any feedback includes "fail"
  if (feedbacks.some((f) => f.toLowerCase().includes("fail"))) {
    throw new Error("Simulated API error");
  }

  // Otherwise simulate success
  return { success: true, message: "Feedbacks uploaded successfully" };
};

const register = async ({ email, password }: UserCredentials) => {
  return await api.post("/api/auth/register", {
    email,
    password,
  });
};

const login = async ({ email, password }: UserCredentials) => {
  return await api.post("/api/auth/login", {
    email,
    password,
  });
};

export const loginOrRegister = async (
  authType: AuthCardVariant,
  userCredentials: UserCredentials,
) => {
  let result: AuthResult = null;

  const response =
    authType === "sign-in"
      ? await login(userCredentials)
      : await register(userCredentials);

  if (isAuthResult(response)) {
    result = response;
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
    // TODO: Use toaster to alert user about failure
  }
}
