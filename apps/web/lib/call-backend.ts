import { auth } from "@/auth/auth";

type ApiResult = {
  success: boolean;
  status: number;
  message: string;
};

/**
 * Makes an authenticated request to backend API. Ment for using if server actions does not return data back
 *
 * @param path - path of the endpoint
 * @param options - optional configuration for `fetch` request, headers and body
 * @param successMessage - custom message to return on success
 */
async function callBackend<TBody = unknown>(
  path: string,
  options: Omit<RequestInit, "body"> & { body?: TBody } = {},
  successMessage: string,
): Promise<ApiResult> {
  const session = await auth();
  if (!session) {
    return { success: false, status: 401, message: "Unauthorized" };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API}${path}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${session.user.token}`,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    let data = null;
    if (res.status !== 204) data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        status: res.status,
        message: data?.message ?? "Request failed",
      };
    }

    return {
      success: true,
      status: res.status,
      message: successMessage,
    };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Something went wrong";
    return { success: false, status: 500, message };
  }
}

export default callBackend;
