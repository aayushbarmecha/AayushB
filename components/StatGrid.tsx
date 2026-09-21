import Reveal from "@/components/Reveal";

const stats = [
  { value: "30%", label: "increase in client adoption", context: "Yext Scout AI platform" },
  { value: "60% → 25%", label: "reduction in high-risk production flags", context: "Yext Knowledge Graph ETL" },
  { value: "40%", label: "reduction in manual effort", context: "AI-powered issue triage system" },
  { value: "80%", label: "reduction in testing effort", context: "Jest test automation, MAQ Software" },
  { value: "50%", label: "reduction in processing time", context: "Custom ANTLR parse-tree replacement" },
  { value: "33%", label: "reduction in memory usage", context: "TMDL VS Code extension" },
];

export default function StatGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, i) => (
        <Reveal key={stat.label} delay={i * 0.06}>
          <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5">
            <div className="text-gradient text-3xl font-bold tracking-tight">{stat.value}</div>
            <p className="mt-2 text-sm font-medium text-foreground">{stat.label}</p>
            <p className="mt-1 text-xs text-muted">{stat.context}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
