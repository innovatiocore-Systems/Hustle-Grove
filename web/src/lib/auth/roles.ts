/**
 * Roles that may access the staff/admin portal (/admin). Everyone else
 * (i.e. Member) lives in the member area (/dashboard).
 */
export const ADMIN_ROLES = [
  "Super Admin",
  "Admin",
  "Community Manager",
  "Reception Staff",
  "Finance Staff",
];

export function isStaff(roles: string[] | undefined): boolean {
  return (roles ?? []).some((r) => ADMIN_ROLES.includes(r));
}

/** The landing path for a user, based on their roles. */
export function homePathFor(roles: string[] | undefined): string {
  return isStaff(roles) ? "/admin" : "/dashboard";
}
