import { inquiries, inquiryStages } from "@/data/admin";

const accent: Record<string, string> = {
  New: "bg-primary",
  Contacted: "bg-slate-400",
  "Tour booked": "bg-amber-500",
  Proposal: "bg-violet",
  Won: "bg-emerald-500",
};

export default function AdminInquiriesPage() {
  const totalValue = inquiries.reduce((s, q) => s + q.value, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Inquiry pipeline</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {inquiries.length} open inquiries · ${(totalValue / 1000).toFixed(0)}K
          potential MRR
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
        {inquiryStages.map((stage) => {
          const deals = inquiries.filter((q) => q.stage === stage);
          return (
            <div key={stage} className="flex flex-col">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`size-2.5 rounded-full ${accent[stage]}`} />
                  <span className="text-sm font-semibold text-foreground">
                    {stage}
                  </span>
                </div>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  {deals.length}
                </span>
              </div>
              <div className="flex-1 space-y-3 rounded-2xl bg-muted/40 p-3">
                {deals.length === 0 ? (
                  <p className="py-6 text-center text-xs text-muted-foreground">
                    No inquiries
                  </p>
                ) : (
                  deals.map((q) => (
                    <div
                      key={q.id}
                      className="rounded-xl border border-border/70 bg-card p-3 shadow-sm"
                    >
                      <p className="text-sm font-medium text-foreground">{q.name}</p>
                      <p className="text-xs text-muted-foreground">{q.company}</p>
                      <p className="mt-2 text-xs text-muted-foreground">{q.interest}</p>
                      <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-2">
                        <span className="text-sm font-semibold text-foreground">
                          ${q.value.toLocaleString()}
                        </span>
                        <span className="text-[0.7rem] text-muted-foreground">
                          {q.time}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
