import type { Metadata } from "next";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

import { site } from "@/data/site";
import { faqs } from "@/data/faqs";
import { PageHeader } from "@/components/marketing/page-header";
import { SectionHeading } from "@/components/marketing/section-heading";
import { InquiryForm } from "@/components/marketing/inquiry-form";
import { Accordion } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Hustlegrove Workspaces. Book a tour, ask about membership, or talk to our enterprise team.",
};

const contactDetails = [
  {
    icon: MapPin,
    label: "Visit us",
    value: site.headquarters,
  },
  {
    icon: Mail,
    label: "Email us",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Phone,
    label: "Call us",
    value: site.phone,
    href: `tel:${site.phone}`,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Fri, 8am–6pm · Member access 24/7",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title="Let's find your team the right space"
        description="Book a tour, ask a question, or talk to our enterprise team. We typically reply within one business day."
      />

      {/* Form + details */}
      <section className="container-px py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            {contactDetails.map((detail) => {
              const Icon = detail.icon;
              return (
                <div
                  key={detail.label}
                  className="flex gap-4 rounded-2xl border border-border/70 bg-card p-5"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {detail.label}
                    </p>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="mt-0.5 block font-medium text-foreground hover:text-primary"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 font-medium text-foreground">
                        {detail.value}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <InquiryForm
            title="Send us a message"
            description="Tell us what you're looking for and we'll be in touch within one business day."
            submitLabel="Send message"
          />
        </div>
      </section>

      {/* Map placeholder */}
      <section className="container-px pb-16 md:pb-20">
        <div className="relative aspect-[21/9] overflow-hidden rounded-3xl border border-border/70 bg-muted">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,var(--color-primary)_0,transparent_55%)] opacity-10" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-background shadow-md">
              <MapPin className="size-7 text-primary" />
            </span>
            <p className="mt-4 font-medium text-foreground">
              {site.headquarters}
            </p>
            <p className="text-sm text-muted-foreground">
              Interactive map coming soon
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand/40 py-20 md:py-28">
        <div className="container-px grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="FAQ"
            title={<>Frequently asked questions</>}
            description="Can't find what you're looking for? Reach out and our team will be glad to help."
          />
          <Accordion items={faqs} />
        </div>
      </section>
    </>
  );
}
