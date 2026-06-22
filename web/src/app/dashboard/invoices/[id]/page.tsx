import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Download, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

import { cn } from "@/lib/utils";
import { getInvoice, invoices, member } from "@/data/dashboard";
import { buttonVariants } from "@/components/ui/button";
import { InvoiceStatusBadge } from "@/components/dashboard/status-badge";
import { PayButton } from "@/components/dashboard/pay-button";

export function generateStaticParams() {
  return invoices.map((i) => ({ id: i.id }));
}

const statusUi = {
  paid: { icon: CheckCircle2, tone: "text-emerald-600 bg-emerald-50", label: "Paid in full" },
  due: { icon: Clock, tone: "text-amber-600 bg-amber-50", label: "Payment due" },
  overdue: { icon: AlertTriangle, tone: "text-red-600 bg-red-50", label: "Overdue" },
};

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const invoice = getInvoice(id);
  if (!invoice) notFound();

  const ui = statusUi[invoice.status];
  const StatusIcon = ui.icon;
  const tax = Math.round(invoice.amount * 0.08);
  const total = invoice.amount + tax;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/dashboard/invoices" className="hover:text-foreground">
          Invoices
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">{invoice.id}</span>
      </nav>

      {/* Payment status banner */}
      <div className={cn("flex items-center gap-3 rounded-2xl px-5 py-4", ui.tone)}>
        <StatusIcon className="size-6" />
        <div>
          <p className="font-semibold">{ui.label}</p>
          <p className="text-sm opacity-80">
            {invoice.status === "paid"
              ? `Paid on ${invoice.due}`
              : `Due ${invoice.due}`}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card p-6 md:p-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-2xl text-foreground">{invoice.id}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Issued {invoice.issued}
            </p>
          </div>
          <InvoiceStatusBadge status={invoice.status} />
        </div>

        <div className="mt-6 grid gap-6 border-y border-border/70 py-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Billed to
            </p>
            <p className="mt-2 font-medium text-foreground">{member.name}</p>
            <p className="text-sm text-muted-foreground">{member.company}</p>
            <p className="text-sm text-muted-foreground">{member.email}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              From
            </p>
            <p className="mt-2 font-medium text-foreground">Hustlegrove Workspaces</p>
            <p className="text-sm text-muted-foreground">548 Market Street</p>
            <p className="text-sm text-muted-foreground">San Francisco, CA</p>
          </div>
        </div>

        {/* Line items */}
        <table className="mt-6 w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="pb-2 font-medium">Description</th>
              <th className="pb-2 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border/70">
              <td className="py-3 text-foreground">{invoice.description}</td>
              <td className="py-3 text-right text-foreground">
                ${invoice.amount.toLocaleString()}
              </td>
            </tr>
            <tr className="border-t border-border/70">
              <td className="py-3 text-muted-foreground">Tax (8%)</td>
              <td className="py-3 text-right text-muted-foreground">
                ${tax.toLocaleString()}
              </td>
            </tr>
            <tr className="border-t border-border">
              <td className="py-3 font-semibold text-foreground">Total</td>
              <td className="py-3 text-right font-display text-xl text-foreground">
                ${total.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-6 flex flex-wrap gap-3">
          {invoice.status !== "paid" && (
            <PayButton invoiceId={invoice.id} amount={total}>
              Pay ${total.toLocaleString()}
            </PayButton>
          )}
          <button type="button" className={cn(buttonVariants({ variant: "outline" }))}>
            <Download className="size-4" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
