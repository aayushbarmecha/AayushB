import Link from "next/link";
import AdminShell from "@/components/AdminShell";
import { getAllProjectsAdmin } from "@/lib/admin-data";

export default async function AdminProjectsPage() {
  const projects = await getAllProjectsAdmin();

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <Link href="/admin/projects/new" className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background">
          New project
        </Link>
      </div>

      <div className="mt-6 space-y-2">
        {projects.length === 0 && <p className="text-sm text-muted">No projects yet.</p>}
        {projects.map((project: { _id: string; title: string; featured: boolean }) => (
          <Link
            key={project._id}
            href={`/admin/projects/${project._id}/edit`}
            className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 hover:bg-surface-muted"
          >
            <span className="text-sm font-medium">{project.title}</span>
            {project.featured && (
              <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent">Featured</span>
            )}
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
