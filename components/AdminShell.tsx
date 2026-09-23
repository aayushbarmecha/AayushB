import Link from "next/link";
import { LayoutDashboard, FileText, FolderKanban, Briefcase, Settings, LogOut } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import type { ReactNode } from "react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Blog Posts", icon: FileText },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-6xl gap-8 px-5 py-10">
      <aside className="hidden w-56 shrink-0 md:block">
        <p className="mb-6 px-2 text-sm font-semibold">Admin</p>
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-muted hover:text-foreground"
              >
                <Icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <form action={logoutAction} className="mt-6 px-2">
          <button className="flex items-center gap-2.5 text-sm font-medium text-muted hover:text-foreground">
            <LogOut size={16} />
            Log out
          </button>
        </form>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
