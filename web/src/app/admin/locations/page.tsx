import { adminLocations } from "@/data/admin";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export default function AdminLocationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Locations</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {adminLocations.length} locations across 9 cities
        </p>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Location</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Occupancy</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminLocations.map((l) => (
              <TableRow key={l.name}>
                <TableCell className="font-medium text-foreground">{l.name}</TableCell>
                <TableCell className="text-muted-foreground">{l.city}</TableCell>
                <TableCell className="text-muted-foreground">{l.members}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-brand-gradient"
                        style={{ width: `${l.occupancy}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {l.occupancy}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={l.status === "Open" ? "success" : "warning"}>
                    {l.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
