import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { adminWorkspaces } from "@/data/admin";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export default function AdminWorkspacesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">
            Workspace management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Inventory and occupancy across all locations
          </p>
        </div>
        <button type="button" className={cn(buttonVariants(), "w-full sm:w-auto")}>
          <Plus className="size-4" />
          Add workspace
        </button>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Workspace</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Occupancy</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminWorkspaces.map((w) => {
              const pct = Math.round((w.occupied / w.capacity) * 100) || 0;
              return (
                <TableRow key={w.name}>
                  <TableCell className="font-medium text-foreground">{w.name}</TableCell>
                  <TableCell className="text-muted-foreground">{w.location}</TableCell>
                  <TableCell className="text-muted-foreground">{w.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-brand-gradient"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {w.occupied}/{w.capacity}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={w.status === "Live" ? "success" : "warning"}>
                      {w.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
