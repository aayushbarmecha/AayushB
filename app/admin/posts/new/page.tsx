import AdminShell from "@/components/AdminShell";
import PostForm from "@/components/PostForm";

export default function NewPostPage() {
  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold tracking-tight">New Post</h1>
      <div className="mt-6 max-w-2xl">
        <PostForm />
      </div>
    </AdminShell>
  );
}
