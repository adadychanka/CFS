import { NextResponse } from "next/server";

export class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return headers;
  }

  async get(endpoint: string) {
    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: this.getHeaders(),
      });

      return res;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal Server Error";

      return NextResponse.json({ message }, { status: 500 });
    }
  }

  async post(endpoint: string, body: unknown): Promise<Response> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(body),
      });
      return response;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Internal Server Error";
      throw new Error(
        message || "Unexpected error occurred. Please try again.",
      );
    }
  }

  async upload(endpoint: string, formData: FormData): Promise<Response> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      return response;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Internal Server Error";
      throw new Error(
        message || "Unexpected error occurred. Please try again.",
      );
    }
  }

  async patch(endpoint: string, body: unknown) {
    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "PATCH",
        headers: this.getHeaders(),
        body: JSON.stringify(body),
      });

      return res;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal Server Error";

      return NextResponse.json({ message }, { status: 500 });
    }
  }
}

const clientApi = new ApiClient();

export { clientApi };
