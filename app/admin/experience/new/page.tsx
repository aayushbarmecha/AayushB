import AdminShell from "@/components/AdminShell";
import ExperienceForm from "@/components/ExperienceForm";

export default function NewExperiencePage() {
  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold tracking-tight">New Experience Entry</h1>
      <div className="mt-6 max-w-2xl">
        <ExperienceForm />
      </div>
    </AdminShell>
  );
}
