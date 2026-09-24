import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:py-24">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Get in touch</h1>
        <p className="mt-3 max-w-xl text-muted">
          Open to conversations about AI systems, data platforms, developer tooling, or interesting engineering
          problems in general.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.3fr]">
        <Reveal delay={0.05} className="space-y-4">
          <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 text-sm hover:bg-surface-muted">
            <Mail size={18} className="text-accent" />
            {siteConfig.email}
          </a>
          <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 text-sm hover:bg-surface-muted">
            <Phone size={18} className="text-accent" />
            {siteConfig.phone}
          </a>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 text-sm">
            <MapPin size={18} className="text-accent" />
            {siteConfig.location}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
