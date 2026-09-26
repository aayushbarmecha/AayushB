import Link from "next/link";
import AdminShell from "@/components/AdminShell";
import { getAllProjectsAdmin } from "@/lib/admin-data";
import { moveProject } from "@/app/admin/actions";

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
        {projects.map((project: { _id: string; title: string; featured: boolean; pinned: boolean }) => (
          <div key={project._id} className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 hover:bg-surface-muted">
            <Link href={`/admin/projects/${project._id}/edit`} className="min-w-0 flex-1 text-sm font-medium">
              {project.title}
            </Link>
            {project.pinned && <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent">Pinned</span>}
            {project.featured && <span className="rounded-full bg-accent-2/15 px-2.5 py-1 text-xs font-medium text-accent-2">Featured</span>}
            <div className="flex gap-1">
              <form action={moveProject.bind(null, project._id, "up")}><button type="submit" aria-label={`Move ${project.title} up`} className="rounded p-1 text-muted hover:bg-surface-muted hover:text-foreground">↑</button></form>
              <form action={moveProject.bind(null, project._id, "down")}><button type="submit" aria-label={`Move ${project.title} down`} className="rounded p-1 text-muted hover:bg-surface-muted hover:text-foreground">↓</button></form>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
