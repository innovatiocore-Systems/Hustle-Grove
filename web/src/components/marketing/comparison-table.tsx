import * as React from "react";
import { Check, Minus } from "lucide-react";

import { plans, comparison } from "@/data/plans";
import { cn } from "@/lib/utils";

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto size-5 text-primary" />
    ) : (
      <Minus className="mx-auto size-4 text-muted-foreground/50" />
    );
  }
  return <span className="text-sm font-medium text-foreground">{value}</span>;
}

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[48rem] border-collapse">
        <thead>
          <tr>
            <th className="w-1/4 px-4 pb-4 text-left align-bottom">
              <span className="text-sm font-semibold text-muted-foreground">
                Compare plans
              </span>
            </th>
            {plans.map((plan) => (
              <th key={plan.slug} className="px-4 pb-4 text-center align-bottom">
                <span
                  className={cn(
                    "block font-display text-lg",
                    plan.popular ? "text-primary" : "text-foreground"
                  )}
                >
                  {plan.name}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparison.map((group) => (
            <React.Fragment key={group.category}>
              <tr>
                <td
                  colSpan={plans.length + 1}
                  className="bg-muted/50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  {group.category}
                </td>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.feature} className="border-b border-border/70">
                  <td className="px-4 py-3.5 text-sm text-foreground">
                    {row.feature}
                  </td>
                  {row.values.map((value, i) => (
                    <td
                      key={i}
                      className={cn(
                        "px-4 py-3.5 text-center",
                        plans[i].popular && "bg-primary/[0.03]"
                      )}
                    >
                      <Cell value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
