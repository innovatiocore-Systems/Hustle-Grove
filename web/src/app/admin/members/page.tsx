import { Search } from "lucide-react";

import { adminMembers } from "@/data/admin";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const statusVariant = {
  Active: "success",
  Trial: "warning",
  "Past due": "danger",
} as const;

export default function AdminMembersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">Member directory</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {adminMembers.length} of 6,418 members
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search members"
            className="h-10 w-full rounded-full border border-input bg-card pl-10 pr-4 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Member</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminMembers.map((m) => (
              <TableRow key={m.email}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-semibold text-white">
                      {m.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                    <div>
                      <p className="font-medium text-foreground">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{m.company}</TableCell>
                <TableCell className="text-muted-foreground">{m.plan}</TableCell>
                <TableCell className="text-muted-foreground">{m.location}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[m.status]}>{m.status}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{m.joined}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
