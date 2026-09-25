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

  useEffect(() => {
    const leaveAdmin = async (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (
        !link ||
        !previousPathname.current.startsWith("/admin") ||
        link.target === "_blank" ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.pathname.startsWith("/admin")) return;

      event.preventDefault();
      await fetch("/api/admin/session", { method: "POST", keepalive: true });
      window.location.assign(destination.href);
    };

    document.addEventListener("click", leaveAdmin, true);
    return () => document.removeEventListener("click", leaveAdmin, true);
  }, []);

  return null;
}
