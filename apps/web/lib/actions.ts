"use server";

import { UserCredentials } from "@/types/next-auth";
import { AxiosResponse } from "axios";
import api from "./api";
import { AuthCardVariant } from "@/utils/get-card-content";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

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
  const result = await api.post("/api/auth/register", {
    email,
    password,
  });

  return result;
};

const login = async ({ email, password }: UserCredentials) => {
  return await api.post("/api/auth/login", {
    email,
    password,
  });
};

export const loginOrRegisterAction = async (
  userCredentials: UserCredentials,
  authType: AuthCardVariant,
) => {
  let result: AxiosResponse | null = null;
  if (authType === "sign-in") {
    result = await login(userCredentials);
  }

  if (authType === "sign-up") {
    result = await register(userCredentials);
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
