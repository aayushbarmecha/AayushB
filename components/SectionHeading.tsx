import Reveal from "@/components/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "text-center" : ""}>
      <div className={align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </span>
        )}
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-base text-muted">{description}</p>}
      </div>
    </Reveal>
  );
}
