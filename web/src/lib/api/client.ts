import type { ApiResponse } from "@/lib/auth/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5122";
const TOKEN_KEY = "haven_token";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Authenticated fetch wrapper. Attaches the stored JWT, returns the API's
 * ApiResponse envelope, and degrades gracefully when the backend is unreachable.
 */
export async function apiFetch<T>(
  path: string,
  options: { method?: string; body?: unknown } = {}
): Promise<ApiResponse<T>> {
  const token = getToken();
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });

    if (res.status === 401) {
      return { success: false, message: "Your session has expired. Please sign in again." };
    }
    if (res.status === 403) {
      return { success: false, message: "You don't have permission to do that." };
    }
    if (res.status === 204) {
      return { success: true } as ApiResponse<T>;
    }
    return (await res.json()) as ApiResponse<T>;
  } catch {
    return {
      success: false,
      message: `Couldn't reach the API at ${API_URL}. Is the backend running?`,
    };
  }
}
