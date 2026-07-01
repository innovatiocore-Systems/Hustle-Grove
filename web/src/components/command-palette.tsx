"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Home,
  MapPin,
  CreditCard,
  LayoutDashboard,
  Phone,
  Info,
  CalendarCheck,
  FileText,
  CornerDownLeft,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { FEATURES } from "@/lib/features";
import { Dialog } from "@/components/ui/dialog";
import { useLeadModal } from "@/components/lead/lead-modal-provider";
import { useSiteSettings } from "@/components/site-settings-provider";

type Item = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: React.ElementType;
  href?: string;
  action?: () => void;
  keywords?: string;
};

export function CommandPalette() {
  const router = useRouter();
  const { open: openLead } = useLeadModal();
  const { resourcesVisible } = useSiteSettings();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const [prevOpen, setPrevOpen] = React.useState(open);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  // Reset the search state when the palette closes (set-during-render to
  // avoid a setState-in-effect cascade).
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (!open) {
      setQuery("");
      setActive(0);
    }
  }

  const items = React.useMemo<Item[]>(() => {
    const actions: Item[] = [
      { id: "a-tour", group: "Actions", label: "Make an Inquiry", icon: CalendarCheck, action: () => openLead("tour") },
      { id: "a-proposal", group: "Actions", label: "Request a Proposal", icon: FileText, action: () => openLead("proposal") },
      { id: "a-sales", group: "Actions", label: "Contact Sales", icon: Phone, action: () => openLead("sales") },
    ];
    const nav: Item[] = [
      { id: "n-home",      group: "Navigate", label: "Home",             icon: Home,          href: "/" },
      { id: "n-locations", group: "Navigate", label: "Our Space",        icon: MapPin,        href: "/locations" },
      { id: "n-pricing",   group: "Navigate", label: "Membership Plans", icon: CreditCard,    href: "/pricing" },
      // Only surface Resources when the admin has the section enabled.
      ...(resourcesVisible
        ? [{ id: "n-resources", group: "Navigate", label: "Resources", icon: FileText, href: "/resources" } as Item]
        : []),
      { id: "n-about",     group: "Navigate", label: "About",            icon: Info,          href: "/about" },
      { id: "n-contact",   group: "Navigate", label: "Contact",          icon: Phone,         href: "/contact" },
      ...(FEATURES.memberAccess
        ? [{ id: "n-dash", group: "Navigate", label: "Member Dashboard", icon: LayoutDashboard, href: "/dashboard" } as Item]
        : []),
    ];
    return [...actions, ...nav];
  }, [openLead, resourcesVisible]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.hint?.toLowerCase().includes(q) ||
        i.keywords?.toLowerCase().includes(q)
    );
  }, [items, query]);

  const run = (item?: Item) => {
    if (!item) return;
    setOpen(false);
    if (item.action) item.action();
    else if (item.href) router.push(item.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(filtered[active]);
    }
  };

  let lastGroup = "";

  return (
    <Dialog open={open} onClose={() => setOpen(false)} align="top" className="max-w-xl">
      <div className="flex items-center gap-3 border-b border-border/70 px-4">
        <Search className="size-5 text-muted-foreground" />
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search spaces, pages or actions…"
          className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
        />
        <kbd className="hidden rounded-md border border-border bg-muted px-1.5 py-0.5 text-[0.65rem] font-medium text-muted-foreground sm:block">
          ESC
        </kbd>
      </div>

      <div className="max-h-[60vh] overflow-y-auto p-2">
        {filtered.length === 0 ? (
          <p className="px-3 py-10 text-center text-sm text-muted-foreground">
            No results for “{query}”
          </p>
        ) : (
          filtered.map((item, index) => {
            const showGroup = item.group !== lastGroup;
            lastGroup = item.group;
            const Icon = item.icon;
            return (
              <React.Fragment key={item.id}>
                {showGroup && (
                  <p className="px-3 pb-1 pt-3 text-xs font-semibold text-muted-foreground">
                    {item.group}
                  </p>
                )}
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onClick={() => run(item)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm",
                    active === index ? "bg-muted" : "hover:bg-muted/60"
                  )}
                >
                  <Icon className="size-4 text-muted-foreground" />
                  <span className="flex-1 text-foreground">{item.label}</span>
                  {item.hint && (
                    <span className="text-xs text-muted-foreground">{item.hint}</span>
                  )}
                  {active === index && (
                    <CornerDownLeft className="size-3.5 text-muted-foreground" />
                  )}
                </button>
              </React.Fragment>
            );
          })
        )}
      </div>
    </Dialog>
  );
}
