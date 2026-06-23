"use client";

import * as React from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  seedSpaces,
  spaceTypes,
  spaceStatuses,
  type Space,
  type SpaceStatus,
  type SpaceType,
} from "@/data/spaces";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const statusVariant: Record<SpaceStatus, React.ComponentProps<typeof Badge>["variant"]> = {
  Live: "success",
  Maintenance: "warning",
  Draft: "neutral",
};

interface Draft {
  name: string;
  type: SpaceType;
  capacity: number;
  status: SpaceStatus;
  featured: boolean;
}

const emptyDraft: Draft = {
  name: "",
  type: "Private Office",
  capacity: 1,
  status: "Live",
  featured: false,
};

export function SpacesManager() {
  const [spaces, setSpaces] = React.useState<Space[]>(seedSpaces);
  const [editing, setEditing] = React.useState<Space | null>(null);
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<Draft>(emptyDraft);

  const startCreate = () => {
    setEditing(null);
    setDraft(emptyDraft);
    setOpen(true);
  };

  const startEdit = (space: Space) => {
    setEditing(space);
    setDraft({ ...space });
    setOpen(true);
  };

  const remove = (id: string) => {
    setSpaces((prev) => prev.filter((s) => s.id !== id));
    toast.success("Space removed");
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.name.trim()) return;
    if (editing) {
      setSpaces((prev) =>
        prev.map((s) => (s.id === editing.id ? { ...editing, ...draft } : s))
      );
      toast.success("Space updated");
    } else {
      setSpaces((prev) => [
        { id: `sp-${Date.now()}`, ...draft },
        ...prev,
      ]);
      toast.success("Space added");
    }
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">Spaces</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {spaces.length} spaces · {spaces.filter((s) => s.featured).length} featured
          </p>
        </div>
        <Button onClick={startCreate} className="w-full sm:w-auto">
          <Plus className="size-4" />
          Add space
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/70 bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {spaces.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium text-foreground">{s.name}</TableCell>
                <TableCell className="text-muted-foreground">{s.type}</TableCell>
                <TableCell className="text-muted-foreground">{s.capacity}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[s.status]}>{s.status}</Badge>
                </TableCell>
                <TableCell>
                  {s.featured ? (
                    <Badge variant="gold">Featured</Badge>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => startEdit(s)}
                      aria-label={`Edit ${s.name}`}
                      className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(s.id)}
                      aria-label={`Delete ${s.name}`}
                      className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogHeader
          title={editing ? "Edit space" : "Add space"}
          description="Spaces shown here power the demo catalogue."
          onClose={() => setOpen(false)}
        />
        <form onSubmit={save} className="space-y-4 p-6">
          <div>
            <Label htmlFor="sp-name">Name</Label>
            <Input
              id="sp-name"
              className="mt-1.5"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              placeholder="Suite 4A"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="sp-type">Type</Label>
              <Select
                id="sp-type"
                className="mt-1.5"
                value={draft.type}
                onChange={(e) => setDraft({ ...draft, type: e.target.value as SpaceType })}
              >
                {spaceTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="sp-capacity">Capacity</Label>
              <Input
                id="sp-capacity"
                type="number"
                min={1}
                className="mt-1.5"
                value={draft.capacity}
                onChange={(e) =>
                  setDraft({ ...draft, capacity: Number(e.target.value) || 1 })
                }
              />
            </div>
          </div>
          <div>
            <Label htmlFor="sp-status">Status</Label>
            <Select
              id="sp-status"
              className="mt-1.5"
              value={draft.status}
              onChange={(e) => setDraft({ ...draft, status: e.target.value as SpaceStatus })}
            >
              {spaceStatuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/30 p-3">
            <Label htmlFor="sp-featured" className="cursor-pointer">
              Featured space
            </Label>
            <Switch
              id="sp-featured"
              checked={draft.featured}
              onChange={(v) => setDraft({ ...draft, featured: v })}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{editing ? "Save changes" : "Add space"}</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
