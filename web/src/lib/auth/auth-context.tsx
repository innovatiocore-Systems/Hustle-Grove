"use client";

import * as React from "react";

import {
  authApi,
  type AuthResponse,
  type AuthUser,
  type RegisterPayload,
} from "@/lib/auth/api";
import { signOutSupabase } from "@/lib/auth/supabase-auth";

const TOKEN_KEY = "haven_token";
const USER_KEY = "haven_user";

interface AuthResult {
  ok: boolean;
  message?: string | null;
  errors?: string[] | null;
  user?: AuthUser;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (payload: RegisterPayload) => Promise<AuthResult>;
  setSession: (auth: AuthResponse) => void;
  updateUser: (partial: Partial<AuthUser>) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  // Bootstrap auth state from localStorage after mount. This must run in an
  // effect (not a lazy initializer) so the server and first client render both
  // start from the logged-out/loading state, avoiding a hydration mismatch.
  /* eslint-disable react-hooks/set-state-in-effect -- hydration-safe read from an external store on mount */
  React.useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser) as AuthUser);
      }
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const persist = React.useCallback((auth: AuthResponse) => {
    localStorage.setItem(TOKEN_KEY, auth.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(auth.user));
    setToken(auth.accessToken);
    setUser(auth.user);
  }, []);

  const login = React.useCallback<AuthContextValue["login"]>(
    async (email, password) => {
      const res = await authApi.login(email, password);
      if (res.success && res.data) {
        persist(res.data);
        return { ok: true, user: res.data.user };
      }
      return { ok: false, message: res.message, errors: res.errors };
    },
    [persist]
  );

  const register = React.useCallback<AuthContextValue["register"]>(
    async (payload) => {
      const res = await authApi.register(payload);
      if (res.success && res.data) {
        persist(res.data);
        return { ok: true, user: res.data.user };
      }
      return { ok: false, message: res.message, errors: res.errors };
    },
    [persist]
  );

  // Merge updated fields into the current user and re-persist, so profile
  // edits (name, avatar…) reflect in the shell without a re-login.
  const updateUser = React.useCallback<AuthContextValue["updateUser"]>(
    (partial) => {
      setUser((prev) => {
        if (!prev) return prev;
        const next = { ...prev, ...partial };
        try {
          localStorage.setItem(USER_KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    []
  );

  const logout = React.useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
    void signOutSupabase();
  }, []);

  const value: AuthContextValue = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    register,
    setSession: persist,
    updateUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
