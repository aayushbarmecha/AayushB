import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { getAllProjects, getProjectBySlug } from "@/lib/data";

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: project.coverImage ? { images: [{ url: project.coverImage }] } : undefined,
  };
}

const sections: { key: keyof NonNullable<Awaited<ReturnType<typeof getProjectBySlug>>>; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "approach", label: "Technical Approach" },
  { key: "architecture", label: "Architecture" },
  { key: "challenges", label: "Engineering Challenges" },
  { key: "impact", label: "Impact & Results" },
];

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h1>
        <p className="mt-4 text-lg text-muted">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-muted">
              {tag}
            </span>
          ))}
        </div>
      </Reveal>

      {project.coverImage && (
        <Reveal delay={0.08}>
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-surface-muted">
            <Image src={project.coverImage} alt={project.title} fill sizes="768px" className="object-cover" />
          </div>
        </Reveal>
      )}

      <div className="mt-12 space-y-12">
        {sections.map(
          (section, i) =>
            project[section.key] && (
              <Reveal key={section.key} delay={i * 0.05}>
                <h2 className="text-xl font-semibold tracking-tight">{section.label}</h2>
                <p className="mt-3 whitespace-pre-line leading-relaxed text-muted">
                  {project[section.key] as string}
                </p>
              </Reveal>
            )
        )}

        {project.technologies.length > 0 && (
          <Reveal>
            <h2 className="text-xl font-semibold tracking-tight">Technologies</h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-border px-3 py-1 text-xs font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        )}

        {project.images.length > 0 && (
          <Reveal>
            <h2 className="text-xl font-semibold tracking-tight">Screenshots</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.images.map((img) => (
                <div key={img} className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-surface-muted">
                  <Image src={img} alt={project.title} fill sizes="384px" className="object-cover" />
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </article>
  );
}
