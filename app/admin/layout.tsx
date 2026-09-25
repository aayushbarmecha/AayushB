import type { ReactNode } from "react";
import AdminAccessGuard from "@/components/AdminAccessGuard";

// The dashboard is backed by live MongoDB content. Never reuse a rendered
// admin route from Vercel's production route cache.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminAccessGuard />
      {children}
    </>
  );
}
