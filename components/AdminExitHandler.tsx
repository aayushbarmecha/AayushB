"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AdminExitHandler() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const wasInAdmin = previousPathname.current.startsWith("/admin");
    const isInAdmin = pathname.startsWith("/admin");

    if (wasInAdmin && !isInAdmin) {
      void fetch("/api/admin/session", {
        method: "POST",
        keepalive: true,
      });
    }

    previousPathname.current = pathname;
  }, [pathname]);

  return null;
}
