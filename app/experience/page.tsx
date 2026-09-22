import type { Metadata } from "next";
import Link from "next/link";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Reveal from "@/components/Reveal";
import { getAllExperience } from "@/lib/data";
import { siteConfig } from "@/lib/site.config";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Experience",
  description: `Professional experience — ${siteConfig.name}.`,
};

export default async function ExperiencePage() {
  const experience = await getAllExperience();

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Experience</h1>
        <p className="mt-3 text-muted">Engineering roles, told as what was built and why it mattered.</p>
      </Reveal>

      <div className="mt-12">
        {experience.length > 0 ? (
          <ExperienceTimeline experience={experience} />
        ) : (
          <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted">
            No experience entries yet — add them from{" "}
            <Link href="/admin/experience" className="text-accent underline">
              /admin/experience
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}
