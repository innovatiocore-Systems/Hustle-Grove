const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5122";

export interface ApiResponse<T> {
  success: boolean;
  message?: string | null;
  data?: T;
  errors?: string[] | null;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber?: string | null;
  jobTitle?: string | null;
  companyName?: string | null;
  isActive: boolean;
  emailConfirmed: boolean;
  roles: string[];
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  user: AuthUser;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string | null;
  jobTitle?: string | null;
  companyName?: string | null;
}

async function postJson<T>(
  path: string,
  body: unknown
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    // The API always returns the ApiResponse envelope, even for 4xx.
    return (await res.json()) as ApiResponse<T>;
  } catch {
    return {
      success: false,
      message: `Couldn't reach the API at ${API_URL}. Is the backend running?`,
    };
  }
}

export const authApi = {
  login: (email: string, password: string) =>
    postJson<AuthResponse>("/api/auth/login", { email, password }),

  register: (payload: RegisterPayload) =>
    postJson<AuthResponse>("/api/auth/register", payload),
};
