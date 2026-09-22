import Reveal from "@/components/Reveal";
import type { IExperience } from "@/models/Experience";

export default function ExperienceTimeline({ experience }: { experience: IExperience[] }) {
  return (
    <div className="relative space-y-10 border-l border-border pl-8">
      {experience.map((exp, i) => (
        <Reveal key={exp._id} delay={i * 0.08} className="relative">
          <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 border-background bg-accent" />
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-xl font-semibold tracking-tight">{exp.role}</h3>
            <span className="text-sm font-medium text-muted">
              {exp.startDate} – {exp.endDate}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-accent">
            {exp.company} · {exp.location}
          </p>
          <ul className="mt-4 space-y-2.5">
            {exp.bullets.map((bullet, idx) => (
              <li key={idx} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
                {bullet}
              </li>
            ))}
          </ul>
          {exp.techStack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {exp.techStack.map((tech) => (
                <span key={tech} className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-muted">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </Reveal>
      ))}
    </div>
  );
}
