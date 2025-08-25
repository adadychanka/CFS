"use server";

import { ApiClient } from "./api";

export const getServerApi = async () => {
  const API = process.env.BACKEND_API;

  if (!API) {
    throw new Error("API URL is not found in Environment!");
  }

  const api = new ApiClient(API);
  return api;
};
