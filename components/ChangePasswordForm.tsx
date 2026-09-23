"use client";

import { useActionState } from "react";
import { changePassword } from "@/app/admin/actions";

export default function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(changePassword, null);
  const field =
    "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none ring-accent/30 focus:ring-2";
  const label = "mb-1.5 block text-sm font-medium";

  return (
    <form action={formAction} className="max-w-sm space-y-4">
      <div>
        <label className={label}>Current password</label>
        <input name="currentPassword" type="password" required autoComplete="current-password" className={field} />
      </div>
      <div>
        <label className={label}>New password</label>
        <input name="newPassword" type="password" required autoComplete="new-password" className={field} />
      </div>
      <div>
        <label className={label}>Confirm new password</label>
        <input name="confirmPassword" type="password" required autoComplete="new-password" className={field} />
      </div>

      {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
      {state?.ok && <p className="text-sm text-accent-2">Password updated.</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background disabled:opacity-60"
      >
        {pending ? "Saving…" : "Update password"}
      </button>
    </form>
  );
}
