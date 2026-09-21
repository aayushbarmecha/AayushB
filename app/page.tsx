import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import StatGrid from "@/components/StatGrid";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import Reveal from "@/components/Reveal";
import { getAllProjects, getPublishedPosts } from "@/lib/data";

export const revalidate = 3600;

export default async function HomePage() {
  const [projects, posts] = await Promise.all([getAllProjects(), getPublishedPosts()]);
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const recentPosts = posts.slice(0, 3);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          eyebrow="Impact"
          title="Measurable results, not just responsibilities."
          description="A few numbers from recent work at Yext and MAQ Software."
        />
        <div className="mt-10">
          <StatGrid />
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Selected Work" title="Featured projects" />
            <Reveal>
              <Link href="/projects" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                All projects
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {featured.map((project, i) => (
              <ProjectCard key={project._id} project={project} delay={i * 0.08} />
            ))}
          </div>
        </section>
      )}

      {recentPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Writing" title="From the technical blog" />
            <Reveal>
              <Link href="/blog" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                All posts
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {recentPosts.map((post, i) => (
              <BlogCard key={post._id} post={post} delay={i * 0.08} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-8 py-14 text-center sm:px-16">
            <div className="absolute left-1/2 top-0 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-2/25 blur-[100px]" />
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Have something to build?</h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Always open to conversations about AI systems, data platforms, and developer tooling.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
            >
              Get in touch
              <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
