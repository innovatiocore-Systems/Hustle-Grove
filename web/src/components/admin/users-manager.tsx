"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Plus,
  Search,
  MoreHorizontal,
  UserCheck,
  UserX,
  KeyRound,
  Trash2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

import {
  adminApi,
  type AdminUser,
  type RoleDto,
} from "@/lib/api/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownItem,
  DropdownSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { EmptyState, ErrorState } from "@/components/states/states";
import {
  nameSchema,
  emailSchema,
  passwordSchema,
  optionalText,
} from "@/lib/validation/schemas";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-destructive">{message}</p>;
}

const PAGE_SIZE = 10;

type DialogState =
  | { type: "create" }
  | { type: "reset"; user: AdminUser }
  | { type: "delete"; user: AdminUser }
  | { type: "role"; user: AdminUser }
  | null;

export function UsersManager() {
  const [users, setUsers] = React.useState<AdminUser[]>([]);
  const [roles, setRoles] = React.useState<RoleDto[]>([]);
  const [total, setTotal] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [searchInput, setSearchInput] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [dialog, setDialog] = React.useState<DialogState>(null);
  const [busy, setBusy] = React.useState(false);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await adminApi.getUsers(page, PAGE_SIZE, search || undefined);
    if (res.success && res.data) {
      setUsers(res.data.items);
      setTotal(res.data.totalCount);
      setTotalPages(res.data.totalPages || 1);
    } else {
      setError(res.message ?? "Failed to load users.");
    }
    setLoading(false);
  }, [page, search]);

  // Refetch whenever the page or search changes. State is only set after the
  // await resolves, so this never triggers a synchronous setState-in-effect
  // cascade.
  React.useEffect(() => {
    let active = true;
    adminApi.getUsers(page, PAGE_SIZE, search || undefined).then((res) => {
      if (!active) return;
      if (res.success && res.data) {
        setUsers(res.data.items);
        setTotal(res.data.totalCount);
        setTotalPages(res.data.totalPages || 1);
      } else {
        setError(res.message ?? "Failed to load users.");
      }
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [page, search]);

  React.useEffect(() => {
    adminApi.getRoles().then((res) => {
      if (res.success && res.data) setRoles(res.data);
    });
  }, []);

  const runAction = async (
    fn: () => Promise<{ success: boolean; message?: string | null; errors?: string[] | null }>,
    successMsg: string
  ) => {
    setBusy(true);
    const res = await fn();
    setBusy(false);
    if (res.success) {
      toast.success(successMsg);
      setDialog(null);
      load();
    } else {
      toast.error(res.errors?.join(" ") ?? res.message ?? "Something went wrong.");
    }
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">Users</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {total} {total === 1 ? "user" : "users"} · live from the API
          </p>
        </div>
        <Button onClick={() => setDialog({ type: "create" })} className="w-full sm:w-auto">
          <Plus className="size-4" />
          Add user
        </Button>
      </div>

      <form onSubmit={onSearch} className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by name or email, press Enter"
          className="pl-10"
        />
      </form>

      {loading ? (
        <div className="flex items-center justify-center rounded-2xl border border-border/70 bg-card py-20">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      ) : error ? (
        <ErrorState description={error} onRetry={load} />
      ) : users.length === 0 ? (
        <EmptyState
          title="No users found"
          description={search ? "Try a different search." : "Add your first user to get started."}
        />
      ) : (
        <div className="rounded-2xl border border-border/70 bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>User</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-semibold uppercase text-white">
                        {(u.firstName?.[0] ?? "") + (u.lastName?.[0] ?? "")}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">{u.fullName}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {u.roles.length ? (
                        u.roles.map((r) => (
                          <Badge key={r} variant="muted">
                            {r}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={u.isActive ? "success" : "danger"}>
                      {u.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu
                      trigger={
                        <span className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
                          <MoreHorizontal className="size-4" />
                        </span>
                      }
                    >
                      <DropdownItem onSelect={() => setDialog({ type: "role", user: u })}>
                        <ShieldCheck />
                        Change role
                      </DropdownItem>
                      {u.isActive ? (
                        <DropdownItem
                          onSelect={() =>
                            runAction(() => adminApi.deactivate(u.id), "User deactivated.")
                          }
                        >
                          <UserX />
                          Deactivate
                        </DropdownItem>
                      ) : (
                        <DropdownItem
                          onSelect={() =>
                            runAction(() => adminApi.activate(u.id), "User activated.")
                          }
                        >
                          <UserCheck />
                          Activate
                        </DropdownItem>
                      )}
                      <DropdownItem onSelect={() => setDialog({ type: "reset", user: u })}>
                        <KeyRound />
                        Reset password
                      </DropdownItem>
                      <DropdownSeparator />
                      <DropdownItem
                        onSelect={() => setDialog({ type: "delete", user: u })}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 />
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-border/70 px-4 py-3">
            <p className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="size-4" />
                Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Dialogs */}
      <Dialog open={dialog?.type === "create"} onClose={() => setDialog(null)}>
        <CreateUserForm
          roles={roles}
          busy={busy}
          onSubmit={(body) => runAction(() => adminApi.createUser(body), "User created.")}
          onClose={() => setDialog(null)}
        />
      </Dialog>

      <Dialog open={dialog?.type === "role"} onClose={() => setDialog(null)}>
        {dialog?.type === "role" && (
          <ChangeRoleForm
            user={dialog.user}
            roles={roles}
            busy={busy}
            onSubmit={(role) =>
              runAction(() => adminApi.changeRole(dialog.user.id, role), "Role updated.")
            }
            onClose={() => setDialog(null)}
          />
        )}
      </Dialog>

      <Dialog open={dialog?.type === "reset"} onClose={() => setDialog(null)}>
        {dialog?.type === "reset" && (
          <ResetPasswordForm
            user={dialog.user}
            busy={busy}
            onSubmit={(pwd) =>
              runAction(
                () => adminApi.resetPassword(dialog.user.id, pwd),
                "Password reset."
              )
            }
            onClose={() => setDialog(null)}
          />
        )}
      </Dialog>

      <Dialog open={dialog?.type === "delete"} onClose={() => setDialog(null)}>
        {dialog?.type === "delete" && (
          <>
            <DialogHeader
              title="Delete user"
              description={`This permanently removes ${dialog.user.fullName}.`}
              onClose={() => setDialog(null)}
            />
            <div className="flex justify-end gap-3 p-6">
              <Button variant="outline" onClick={() => setDialog(null)}>
                Cancel
              </Button>
              <Button
                disabled={busy}
                className="bg-destructive text-white hover:bg-destructive/90"
                onClick={() =>
                  runAction(() => adminApi.deleteUser(dialog.user.id), "User deleted.")
                }
              >
                {busy ? "Deleting…" : "Delete user"}
              </Button>
            </div>
          </>
        )}
      </Dialog>
    </div>
  );
}

const createUserSchema = z.object({
  firstName: nameSchema("First name"),
  lastName: nameSchema("Last name"),
  email: emailSchema,
  password: passwordSchema,
  jobTitle: optionalText(150),
  role: z.string().min(1, "Select a role"),
});

type CreateUserValues = z.infer<typeof createUserSchema>;

function CreateUserForm({
  roles,
  busy,
  onSubmit,
  onClose,
}: {
  roles: RoleDto[];
  busy: boolean;
  onSubmit: (body: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    jobTitle?: string | null;
    roles?: string[];
  }) => void;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { role: "Member" },
  });

  return (
    <>
      <DialogHeader title="Add user" description="Create a new account." onClose={onClose} />
      <form
        onSubmit={handleSubmit((v) =>
          onSubmit({
            firstName: v.firstName,
            lastName: v.lastName,
            email: v.email,
            password: v.password,
            jobTitle: v.jobTitle || null,
            roles: [v.role],
          })
        )}
        className="space-y-4 p-6"
        noValidate
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>First name</Label>
            <Input className="mt-1.5" {...register("firstName")} />
            <FieldError message={errors.firstName?.message} />
          </div>
          <div>
            <Label>Last name</Label>
            <Input className="mt-1.5" {...register("lastName")} />
            <FieldError message={errors.lastName?.message} />
          </div>
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" className="mt-1.5" {...register("email")} />
          <FieldError message={errors.email?.message} />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" className="mt-1.5" placeholder="8+ chars, upper, lower, digit" {...register("password")} />
          <FieldError message={errors.password?.message} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Job title (optional)</Label>
            <Input className="mt-1.5" {...register("jobTitle")} />
            <FieldError message={errors.jobTitle?.message} />
          </div>
          <div>
            <Label>Role</Label>
            <Select className="mt-1.5" {...register("role")}>
              {roles.map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name}
                </option>
              ))}
            </Select>
            <FieldError message={errors.role?.message} />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "Creating…" : "Create user"}
        </Button>
      </form>
    </>
  );
}

function ChangeRoleForm({
  user,
  roles,
  busy,
  onSubmit,
  onClose,
}: {
  user: AdminUser;
  roles: RoleDto[];
  busy: boolean;
  onSubmit: (role: string) => void;
  onClose: () => void;
}) {
  const [role, setRole] = React.useState(user.roles[0] ?? "Member");
  return (
    <>
      <DialogHeader title="Change role" description={user.fullName} onClose={onClose} />
      <div className="space-y-4 p-6">
        <div>
          <Label>Role</Label>
          <Select value={role} onChange={(e) => setRole(e.target.value)} className="mt-1.5">
            {roles.map((r) => (
              <option key={r.id} value={r.name}>
                {r.name}
              </option>
            ))}
          </Select>
          <p className="mt-2 text-xs text-muted-foreground">
            Replaces all current roles with the selected one.
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={busy} onClick={() => onSubmit(role)}>
            {busy ? "Saving…" : "Save role"}
          </Button>
        </div>
      </div>
    </>
  );
}

const resetPasswordSchema = z.object({ password: passwordSchema });
type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm({
  user,
  busy,
  onSubmit,
  onClose,
}: {
  user: AdminUser;
  busy: boolean;
  onSubmit: (password: string) => void;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({ resolver: zodResolver(resetPasswordSchema) });

  return (
    <>
      <DialogHeader title="Reset password" description={user.fullName} onClose={onClose} />
      <form
        onSubmit={handleSubmit((v) => onSubmit(v.password))}
        className="space-y-4 p-6"
        noValidate
      >
        <div>
          <Label>New password</Label>
          <Input type="password" className="mt-1.5" placeholder="8+ chars, upper, lower, digit" {...register("password")} />
          <FieldError message={errors.password?.message} />
        </div>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={busy}>
            {busy ? "Resetting…" : "Reset password"}
          </Button>
        </div>
      </form>
    </>
  );
}
