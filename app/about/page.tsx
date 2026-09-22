import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "About",
  description: `Background, education, and technical skills — ${siteConfig.name}.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:py-24">
      <Reveal className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-border">
          <Image src={siteConfig.profileImage} alt={siteConfig.name} fill sizes="112px" className="object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">About me</h1>
          <p className="mt-3 max-w-xl text-muted">
            I&apos;m a software engineer working across AI/LLM systems, distributed data pipelines, and developer
            tooling — currently at Yext, previously at MAQ Software. I like taking a problem from an ambiguous
            product ask to a shipped system with measurable impact.
          </p>
        </div>
      </Reveal>

      <div className="mt-16">
        <SectionHeading eyebrow="Background" title="Education" />
        <div className="mt-8 space-y-4">
          {siteConfig.education.map((edu, i) => (
            <Reveal key={edu.school} delay={i * 0.06}>
              <div className="flex gap-4 rounded-2xl border border-border bg-surface p-5">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-accent">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <p className="font-semibold">{edu.school}</p>
                  <p className="text-sm text-muted">{edu.degree}</p>
                  <p className="mt-1 text-xs text-muted">
                    {edu.period} · {edu.location}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading eyebrow="Toolbox" title="Technical skills" />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Object.entries(siteConfig.skills).map(([category, items], i) => (
            <Reveal key={category} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-surface p-5">
                <p className="text-sm font-semibold text-accent">{category}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span key={item} className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-muted">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
