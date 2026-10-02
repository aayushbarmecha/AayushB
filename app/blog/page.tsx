import type { Metadata } from "next";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import Reveal from "@/components/Reveal";
import { getPublishedPosts } from "@/lib/data";
import { siteConfig } from "@/lib/site.config";
import BlogTagFilter from "./blogTagFilter";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog",
  description: `Technical writing on AI systems, distributed systems, and developer tooling — ${siteConfig.name}.`,
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const posts = await getPublishedPosts();
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();
  const filtered = tag ? posts.filter((p) => p.tags.includes(tag)) : posts;

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Blogging section</h1>
        <p className="mt-3 max-w-xl text-muted">A place where I put my thoughts, ideas and experiences.</p>
      </Reveal>

      {tags.length > 0 && (
        <Reveal delay={0.05}>
          <BlogTagFilter tags={tags} activeTag={tag} />
        </Reveal>
      )}

      {filtered.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <BlogCard key={post._id} post={post} delay={i * 0.06} />
          ))}
        </div>
      ) : (
        <p className="mt-12 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted">
          No posts yet — publish your first one from{" "}
          <Link href="/admin/posts" className="text-accent underline">
            /admin/posts
          </Link>
          .
        </p>
      )}
    </div>
  );
}
