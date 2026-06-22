import { invoices } from "@/data/dashboard";
import { adminMembers } from "@/data/admin";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { InvoiceStatusBadge } from "@/components/dashboard/status-badge";

export default function AdminInvoicesPage() {
  const outstanding = invoices
    .filter((i) => i.status !== "paid")
    .reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Invoices</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          ${outstanding.toLocaleString()} outstanding across the network
        </p>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Invoice</TableHead>
              <TableHead>Member</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv, i) => (
              <TableRow key={inv.id}>
                <TableCell className="font-medium text-foreground">{inv.id}</TableCell>
                <TableCell className="text-muted-foreground">
                  {adminMembers[i % adminMembers.length].name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {inv.description}
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  ${inv.amount.toLocaleString()}
                </TableCell>
                <TableCell className="text-muted-foreground">{inv.due}</TableCell>
                <TableCell>
                  <InvoiceStatusBadge status={inv.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
