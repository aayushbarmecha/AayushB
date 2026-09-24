import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site.config";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid absolute inset-0 -z-20 opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]" />
      <div className="absolute left-1/2 top-[-10rem] -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />

      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-5 pb-20 pt-16 md:flex-row md:gap-16 md:pb-28 md:pt-24">
        <Reveal className="flex-1 text-center md:text-left">
          <span className="inline-flex items-center rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-muted">
            {siteConfig.role} · {siteConfig.location}
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            Hi, I&apos;m {siteConfig.name.split(" ")[0]}.
            <br />
            I build <span className="text-gradient">softwares</span> that ship.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-muted md:mx-0">{siteConfig.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
            >
              View Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={siteConfig.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-surface-muted"
            >
              <Download size={16} />
              Resume
            </a>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2 md:justify-start">
            {siteConfig.focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted"
              >
                {area}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative shrink-0">
          <div className="absolute inset-0 -z-10 scale-110 rounded-[2.5rem] bg-gradient-to-br from-accent to-accent-2 opacity-20 blur-2xl" />
          <div className="relative h-52 w-52 overflow-hidden rounded-[2rem] border border-border bg-surface shadow-xl sm:h-64 sm:w-64 md:h-72 md:w-72">
            <Image
              src={siteConfig.profileImage}
              alt={siteConfig.name}
              fill
              sizes="288px"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
