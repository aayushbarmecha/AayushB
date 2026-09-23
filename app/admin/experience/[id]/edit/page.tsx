import { notFound } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import ExperienceForm from "@/components/ExperienceForm";
import { getExperienceByIdAdmin } from "@/lib/admin-data";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const experience = await getExperienceByIdAdmin(id);
  if (!experience) notFound();

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold tracking-tight">Edit Experience Entry</h1>
      <div className="mt-6 max-w-2xl">
        <ExperienceForm experience={experience} />
      </div>
    </AdminShell>
  );
}
