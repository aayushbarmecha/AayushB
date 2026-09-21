import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import type { IProject } from "@/models/Project";

export default function ProjectCard({ project, delay = 0 }: { project: IProject; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5"
      >
        {project.coverImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-muted">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
            <ArrowUpRight
              size={18}
              className="mt-1 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </div>
          <p className="flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
