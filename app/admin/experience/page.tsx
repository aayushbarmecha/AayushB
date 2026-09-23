import Link from "next/link";
import AdminShell from "@/components/AdminShell";
import { getAllExperienceAdmin } from "@/lib/admin-data";

export default async function AdminExperiencePage() {
  const experience = await getAllExperienceAdmin();

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Experience</h1>
        <Link href="/admin/experience/new" className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background">
          New entry
        </Link>
      </div>

      <div className="mt-6 space-y-2">
        {experience.length === 0 && <p className="text-sm text-muted">No entries yet.</p>}
        {experience.map((exp: { _id: string; role: string; company: string }) => (
          <Link
            key={exp._id}
            href={`/admin/experience/${exp._id}/edit`}
            className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 hover:bg-surface-muted"
          >
            <span className="text-sm font-medium">
              {exp.role} · {exp.company}
            </span>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
