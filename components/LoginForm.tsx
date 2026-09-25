"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/admin/actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <form
      action={formAction}
      className="space-y-4"
      onSubmit={() => {
        // This has no expiry, so the browser removes it when the browser is closed.
        document.cookie = "admin-browser-session=1; Path=/; SameSite=Lax";
      }}
    >
      <div>
        <label htmlFor="username" className="mb-1.5 block text-sm font-medium">
          Username
        </label>
        <input
          id="username"
          name="username"
          required
          autoComplete="username"
          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none ring-accent/30 focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none ring-accent/30 focus:ring-2"
        />
      </div>

      {state?.error && <p className="text-sm text-red-500">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
