import Link from "next/link";
import { Download } from "lucide-react";

import { invoices } from "@/data/dashboard";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { InvoiceStatusBadge } from "@/components/dashboard/status-badge";

export default function InvoicesPage() {
  const totalDue = invoices
    .filter((i) => i.status !== "paid")
    .reduce((sum, i) => sum + i.amount, 0);
  const paidThisYear = invoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);

  const summary = [
    { label: "Outstanding balance", value: `$${totalDue.toLocaleString()}` },
    { label: "Paid this year", value: `$${paidThisYear.toLocaleString()}` },
    { label: "Total invoices", value: String(invoices.length) },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">Invoices</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View and download your billing history.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {summary.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border/70 bg-card p-5"
          >
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-3xl text-foreground">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border/70 bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Invoice</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Issued</TableHead>
              <TableHead>Due</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Receipt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <Link
                    href={`/dashboard/invoices/${invoice.id}`}
                    className="font-medium text-foreground hover:text-primary"
                  >
                    {invoice.id}
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {invoice.description}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {invoice.issued}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {invoice.due}
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  ${invoice.amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <InvoiceStatusBadge status={invoice.status} />
                </TableCell>
                <TableCell className="text-right">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    <Download className="size-4" />
                    PDF
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
