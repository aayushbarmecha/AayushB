import AdminShell from "@/components/AdminShell";
import ProjectForm from "@/components/ProjectForm";

export default function NewProjectPage() {
  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold tracking-tight">New Project</h1>
      <div className="mt-6 max-w-2xl">
        <ProjectForm />
      </div>
    </AdminShell>
  );
}
