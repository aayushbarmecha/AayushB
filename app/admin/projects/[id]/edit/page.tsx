import { notFound } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import ProjectForm from "@/components/ProjectForm";
import { getProjectByIdAdmin } from "@/lib/admin-data";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectByIdAdmin(id);
  if (!project) notFound();

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold tracking-tight">Edit Project</h1>
      <div className="mt-6 max-w-2xl">
        <ProjectForm project={project} />
      </div>
    </AdminShell>
  );
}
