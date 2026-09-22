import type { Metadata } from "next";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { getAllProjects } from "@/lib/data";
import { siteConfig } from "@/lib/site.config";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects",
  description: `Technical case studies and projects — ${siteConfig.name}.`,
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Projects</h1>
        <p className="mt-3 max-w-xl text-muted">
          Technical case studies — the problem, the approach, and the measurable outcome.
        </p>
      </Reveal>

      {projects.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project._id} project={project} delay={i * 0.06} />
          ))}
        </div>
      ) : (
        <p className="mt-12 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted">
          No projects yet — add them from{" "}
          <Link href="/admin/projects" className="text-accent underline">
            /admin/projects
          </Link>
          .
        </p>
      )}
    </div>
  );
}
