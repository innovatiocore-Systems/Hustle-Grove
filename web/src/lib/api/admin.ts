import { apiFetch } from "@/lib/api/client";

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface AdminUser {
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
  createdAt: string;
  roles: string[];
}

export interface RoleDto {
  id: string;
  name: string;
  description?: string | null;
  permissions: string[];
}

export interface PermissionDto {
  id: string;
  name: string;
  module: string;
  description?: string | null;
}

export interface AdminDashboard {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  usersByRole: { role: string; count: number }[];
}

export interface CreateUserBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  jobTitle?: string | null;
  companyName?: string | null;
  roles?: string[];
}

export const adminApi = {
  getUsers: (page: number, pageSize: number, search?: string) => {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });
    if (search) params.set("search", search);
    return apiFetch<PagedResult<AdminUser>>(`/api/admin/users?${params.toString()}`);
  },

  createUser: (body: CreateUserBody) =>
    apiFetch<AdminUser>("/api/admin/users", { method: "POST", body }),

  activate: (id: string) =>
    apiFetch<string>(`/api/admin/users/${id}/activate`, { method: "POST" }),

  deactivate: (id: string) =>
    apiFetch<string>(`/api/admin/users/${id}/deactivate`, { method: "POST" }),

  deleteUser: (id: string) =>
    apiFetch<string>(`/api/admin/users/${id}`, { method: "DELETE" }),

  resetPassword: (id: string, newPassword: string) =>
    apiFetch<string>(`/api/admin/users/${id}/reset-password`, {
      method: "POST",
      body: { newPassword },
    }),

  changeRole: (id: string, role: string) =>
    apiFetch<AdminUser>(`/api/admin/users/${id}/role`, {
      method: "PUT",
      body: { role },
    }),

  getRoles: () => apiFetch<RoleDto[]>("/api/admin/roles"),

  createRole: (body: { name: string; description?: string | null }) =>
    apiFetch<RoleDto>("/api/admin/roles", { method: "POST", body }),

  updateRole: (id: string, body: { name: string; description?: string | null }) =>
    apiFetch<RoleDto>(`/api/admin/roles/${id}`, { method: "PUT", body }),

  deleteRole: (id: string) =>
    apiFetch<string>(`/api/admin/roles/${id}`, { method: "DELETE" }),

  getPermissions: () => apiFetch<PermissionDto[]>("/api/admin/permissions"),

  assignPermissions: (roleId: string, permissions: string[]) =>
    apiFetch<RoleDto>(`/api/admin/roles/${roleId}/permissions`, {
      method: "POST",
      body: { permissions },
    }),

  removePermissions: (roleId: string, permissions: string[]) =>
    apiFetch<RoleDto>(`/api/admin/roles/${roleId}/permissions/remove`, {
      method: "POST",
      body: { permissions },
    }),

  getDashboard: () => apiFetch<AdminDashboard>("/api/admin/dashboard"),
};
