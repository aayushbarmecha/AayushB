import Link from "next/link";
import AdminShell from "@/components/AdminShell";
import { getContactMessagesAdmin, getDashboardCounts } from "@/lib/admin-data";
import { markMessageRead, deleteMessage } from "@/app/admin/actions";

export default async function AdminDashboardPage() {
  const [counts, messages] = await Promise.all([getDashboardCounts(), getContactMessagesAdmin()]);

  const cards = [
    { label: "Blog Posts", value: counts.posts, href: "/admin/posts" },
    { label: "Projects", value: counts.projects, href: "/admin/projects" },
    { label: "Experience", value: counts.experience, href: "/admin/experience" },
    { label: "Unread Messages", value: counts.unreadMessages, href: "#messages" },
  ];

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:bg-surface-muted"
          >
            <p className="text-2xl font-bold">{card.value}</p>
            <p className="mt-1 text-xs text-muted">{card.label}</p>
          </Link>
        ))}
      </div>

      <div id="messages" className="mt-10">
        <h2 className="text-lg font-semibold">Contact messages</h2>
        <div className="mt-4 space-y-3">
          {messages.length === 0 && <p className="text-sm text-muted">No messages yet.</p>}
          {messages.map((m: { _id: string; name: string; email: string; message: string; read: boolean; createdAt: string }) => (
            <div key={m._id} className="rounded-2xl border border-border bg-surface p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold">
                    {m.name} <span className="text-muted font-normal">· {m.email}</span>
                  </p>
                  <p className="mt-1 text-xs text-muted">{new Date(m.createdAt).toLocaleString()}</p>
                </div>
                {!m.read && <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent">New</span>}
              </div>
              <p className="mt-3 text-sm text-muted">{m.message}</p>
              <div className="mt-3 flex gap-3">
                {!m.read && (
                  <form action={markMessageRead.bind(null, m._id)}>
                    <button className="text-xs font-medium text-accent">Mark read</button>
                  </form>
                )}
                <form action={deleteMessage.bind(null, m._id)}>
                  <button className="text-xs font-medium text-red-500">Delete</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
