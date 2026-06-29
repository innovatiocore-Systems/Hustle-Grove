import type { Metadata } from "next";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

import { site } from "@/data/site";
import { faqs } from "@/data/faqs";
import { getSiteSettings } from "@/lib/settings/server";
import { PageHeader } from "@/components/marketing/page-header";
import { SectionHeading } from "@/components/marketing/section-heading";
import { InquiryForm } from "@/components/marketing/inquiry-form";
import { Accordion } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Hustle Grove Workspaces. Book a tour, ask about membership, or talk to our enterprise team.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const contactDetails = [
    {
      icon: MapPin,
      label: "Visit us",
      value: settings.address,
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

  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title="Let's find your team the right space"
        description="Book a tour, ask a question, or talk to our enterprise team. We typically reply within one business day."
      />

      {/* Form + details */}
      <section className="container-px py-12 sm:py-16 md:py-20">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            {contactDetails.map((detail) => {
              const Icon = detail.icon;
              return (
                <div
                  key={detail.label}
                  className="flex gap-4 rounded-2xl border border-border/70 bg-card p-4 sm:p-5"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-11">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">
                      {detail.label}
                    </p>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="mt-0.5 block break-words font-medium text-foreground hover:text-primary"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 break-words font-medium text-foreground">
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

      {/* Map */}
      <section className="container-px pb-12 sm:pb-16 md:pb-20">
        <div className="overflow-hidden rounded-2xl border border-border/70 sm:rounded-3xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3257.051427834239!2d149.1231730766086!3d-35.279847593521524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b164d426070001d%3A0x2c16216b7ef71df9!2slevel%207%2F28%20University%20Ave%2C%20Canberra%20ACT%202601%2C%20Australia!5e0!3m2!1sen!2snp!4v1782299287785!5m2!1sen!2snp"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Hustle Grove location"
            className="block h-[300px] w-full sm:h-[400px] lg:h-[450px]"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand/40 py-14 sm:py-20 md:py-28">
        <div className="container-px grid gap-8 sm:gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
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
