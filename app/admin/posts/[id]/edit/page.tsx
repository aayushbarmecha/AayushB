import { notFound } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import PostForm from "@/components/PostForm";
import { getPostByIdAdmin } from "@/lib/admin-data";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostByIdAdmin(id);
  if (!post) notFound();

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold tracking-tight">Edit Post</h1>
      <div className="mt-6 max-w-2xl">
        <PostForm post={post} />
      </div>
    </AdminShell>
  );
}
