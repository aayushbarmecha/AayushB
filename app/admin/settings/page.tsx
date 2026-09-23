import AdminShell from "@/components/AdminShell";
import ChangePasswordForm from "@/components/ChangePasswordForm";

export default function AdminSettingsPage() {
  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      <p className="mt-2 text-sm text-muted">Update your admin login password.</p>
      <div className="mt-6">
        <ChangePasswordForm />
      </div>
    </AdminShell>
  );
}
