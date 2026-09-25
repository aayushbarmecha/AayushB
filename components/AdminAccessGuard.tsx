"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AdminAccessGuard() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin/login") return;

    let cancelled = false;

    const verifySession = async () => {
      if (window.sessionStorage.getItem("admin-tab-session") !== "1") {
        await fetch("/api/admin/session", { method: "POST", keepalive: true });
        if (!cancelled) window.location.replace("/admin/login");
        return;
      }

      const response = await fetch("/api/admin/session", { cache: "no-store" });
      if (!cancelled && !response.ok) {
        window.location.replace("/admin/login");
      }
    };

    const handlePageShow = () => {
      void verifySession();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void verifySession();
      }
    };

    void verifySession();
    window.addEventListener("pageshow", handlePageShow);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelled = true;
      window.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pathname]);

  return null;
}
