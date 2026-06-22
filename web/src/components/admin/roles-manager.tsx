"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Plus,
  ShieldCheck,
  Pencil,
  Trash2,
  Lock,
  KeyRound,
  Loader2,
} from "lucide-react";

import {
  adminApi,
  type RoleDto,
  type PermissionDto,
} from "@/lib/api/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { ErrorState } from "@/components/states/states";
import { roleNameSchema, optionalText } from "@/lib/validation/schemas";

const roleSchema = z.object({
  name: roleNameSchema,
  description: optionalText(300),
});
type RoleValues = z.infer<typeof roleSchema>;

const SYSTEM_ROLES = new Set([
  "Super Admin",
  "Admin",
  "Community Manager",
  "Reception Staff",
  "Finance Staff",
  "Member",
]);

type DialogState =
  | { type: "create" }
  | { type: "edit"; role: RoleDto }
  | { type: "permissions"; role: RoleDto }
  | { type: "delete"; role: RoleDto }
  | null;

export function RolesManager() {
  const [roles, setRoles] = React.useState<RoleDto[]>([]);
  const [permissions, setPermissions] = React.useState<PermissionDto[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [dialog, setDialog] = React.useState<DialogState>(null);
  const [busy, setBusy] = React.useState(false);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    const [rolesRes, permsRes] = await Promise.all([
      adminApi.getRoles(),
      adminApi.getPermissions(),
    ]);
    if (rolesRes.success && rolesRes.data) setRoles(rolesRes.data);
    else setError(rolesRes.message ?? "Failed to load roles.");
    if (permsRes.success && permsRes.data) setPermissions(permsRes.data);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const totalPermissions = permissions.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-border/70 bg-card py-24">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return <ErrorState description={error} onRetry={load} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">Roles & permissions</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {roles.length} roles · {totalPermissions} permissions
          </p>
        </div>
        <Button onClick={() => setDialog({ type: "create" })} className="w-full sm:w-auto">
          <Plus className="size-4" />
          Add role
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {roles.map((role) => {
          const system = SYSTEM_ROLES.has(role.name);
          return (
            <div
              key={role.id}
              className="flex flex-col rounded-2xl border border-border/70 bg-card p-6"
            >
              <div className="flex items-start justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="size-5" />
                </span>
                {system && (
                  <Badge variant="muted" className="gap-1">
                    <Lock className="size-3" />
                    System
                  </Badge>
                )}
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{role.name}</h3>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">
                {role.description ?? "No description."}
              </p>
              <p className="mt-4 text-sm">
                <span className="font-semibold text-foreground">
                  {role.permissions.length}
                </span>{" "}
                <span className="text-muted-foreground">of {totalPermissions} permissions</span>
              </p>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-border/70 pt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDialog({ type: "permissions", role })}
                >
                  <KeyRound className="size-4" />
                  Permissions
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setDialog({ type: "edit", role })}
                >
                  <Pencil className="size-4" />
                  Edit
                </Button>
                {!system && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => setDialog({ type: "delete", role })}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create / Edit role */}
      <Dialog
        open={dialog?.type === "create" || dialog?.type === "edit"}
        onClose={() => setDialog(null)}
      >
        {(dialog?.type === "create" || dialog?.type === "edit") && (
          <RoleForm
            role={dialog.type === "edit" ? dialog.role : undefined}
            busy={busy}
            onClose={() => setDialog(null)}
            onSubmit={async (body) => {
              setBusy(true);
              const res =
                dialog.type === "edit"
                  ? await adminApi.updateRole(dialog.role.id, body)
                  : await adminApi.createRole(body);
              setBusy(false);
              if (res.success) {
                toast.success(dialog.type === "edit" ? "Role updated." : "Role created.");
                setDialog(null);
                load();
              } else {
                toast.error(res.errors?.join(" ") ?? res.message ?? "Failed.");
              }
            }}
          />
        )}
      </Dialog>

      {/* Manage permissions */}
      <Dialog
        open={dialog?.type === "permissions"}
        onClose={() => setDialog(null)}
        className="max-w-2xl"
      >
        {dialog?.type === "permissions" && (
          <PermissionsForm
            role={dialog.role}
            permissions={permissions}
            busy={busy}
            onClose={() => setDialog(null)}
            onSave={async (selected) => {
              const current = new Set(dialog.role.permissions);
              const next = new Set(selected);
              const toAdd = selected.filter((p) => !current.has(p));
              const toRemove = dialog.role.permissions.filter((p) => !next.has(p));
              if (!toAdd.length && !toRemove.length) {
                setDialog(null);
                return;
              }
              setBusy(true);
              let ok = true;
              if (toAdd.length) {
                const r = await adminApi.assignPermissions(dialog.role.id, toAdd);
                ok = ok && r.success;
              }
              if (toRemove.length) {
                const r = await adminApi.removePermissions(dialog.role.id, toRemove);
                ok = ok && r.success;
              }
              setBusy(false);
              if (ok) {
                toast.success("Permissions updated.");
                setDialog(null);
                load();
              } else {
                toast.error("Failed to update permissions.");
              }
            }}
          />
        )}
      </Dialog>

      {/* Delete role */}
      <Dialog open={dialog?.type === "delete"} onClose={() => setDialog(null)}>
        {dialog?.type === "delete" && (
          <>
            <DialogHeader
              title="Delete role"
              description={`Permanently delete the "${dialog.role.name}" role.`}
              onClose={() => setDialog(null)}
            />
            <div className="flex justify-end gap-3 p-6">
              <Button variant="outline" onClick={() => setDialog(null)}>
                Cancel
              </Button>
              <Button
                disabled={busy}
                className="bg-destructive text-white hover:bg-destructive/90"
                onClick={async () => {
                  setBusy(true);
                  const res = await adminApi.deleteRole(dialog.role.id);
                  setBusy(false);
                  if (res.success) {
                    toast.success("Role deleted.");
                    setDialog(null);
                    load();
                  } else {
                    toast.error(res.message ?? "Failed.");
                  }
                }}
              >
                {busy ? "Deleting…" : "Delete role"}
              </Button>
            </div>
          </>
        )}
      </Dialog>
    </div>
  );
}

function RoleForm({
  role,
  busy,
  onSubmit,
  onClose,
}: {
  role?: RoleDto;
  busy: boolean;
  onSubmit: (body: { name: string; description?: string | null }) => void;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoleValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: { name: role?.name ?? "", description: role?.description ?? "" },
  });

  return (
    <>
      <DialogHeader
        title={role ? "Edit role" : "Add role"}
        description={role ? role.name : "Create a new role."}
        onClose={onClose}
      />
      <form
        onSubmit={handleSubmit((v) =>
          onSubmit({ name: v.name, description: v.description || null })
        )}
        className="space-y-4 p-6"
        noValidate
      >
        <div>
          <Label>Name</Label>
          <Input className="mt-1.5" {...register("name")} />
          {errors.name && (
            <p className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label>Description</Label>
          <Input
            className="mt-1.5"
            placeholder="What this role is for"
            {...register("description")}
          />
          {errors.description && (
            <p className="mt-1.5 text-xs text-destructive">{errors.description.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "Saving…" : role ? "Save changes" : "Create role"}
        </Button>
      </form>
    </>
  );
}

function PermissionsForm({
  role,
  permissions,
  busy,
  onSave,
  onClose,
}: {
  role: RoleDto;
  permissions: PermissionDto[];
  busy: boolean;
  onSave: (selected: string[]) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = React.useState<Set<string>>(
    new Set(role.permissions)
  );

  const grouped = React.useMemo(() => {
    const map = new Map<string, PermissionDto[]>();
    for (const p of permissions) {
      if (!map.has(p.module)) map.set(p.module, []);
      map.get(p.module)!.push(p);
    }
    return Array.from(map.entries());
  }, [permissions]);

  const toggle = (name: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  return (
    <>
      <DialogHeader
        title="Manage permissions"
        description={`${role.name} · ${selected.size} of ${permissions.length} selected`}
        onClose={onClose}
      />
      <div className="max-h-[55vh] space-y-5 overflow-y-auto p-6">
        {grouped.map(([module, perms]) => (
          <div key={module}>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {module}
            </p>
            <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {perms.map((p) => (
                <label
                  key={p.id}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-muted"
                >
                  <input
                    type="checkbox"
                    checked={selected.has(p.name)}
                    onChange={() => toggle(p.name)}
                    className="size-4 accent-primary"
                  />
                  <span className="text-sm text-foreground">{p.name}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-3 border-t border-border/70 p-6">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={busy} onClick={() => onSave(Array.from(selected))}>
          {busy ? "Saving…" : "Save permissions"}
        </Button>
      </div>
    </>
  );
}
