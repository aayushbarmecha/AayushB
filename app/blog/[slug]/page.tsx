import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import TableOfContents from "@/components/TableOfContents";
import BlogCard from "@/components/BlogCard";
import { getPublishedPosts, getPostBySlug } from "@/lib/data";
import { extractToc, getReadingTime, renderMarkdown } from "@/lib/markdown";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [content, allPosts] = await Promise.all([renderMarkdown(post.content), getPublishedPosts()]);
  const toc = extractToc(post.content);
  const readTime = getReadingTime(post.content);
  const date = post.publishedAt ? new Date(post.publishedAt) : null;

  const related = allPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ post: p, overlap: p.tags.filter((t) => post.tags.includes(t)).length }))
    .filter((p) => p.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 3)
    .map((p) => p.post);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_220px]">
        <article className="max-w-3xl">
          <Reveal>
            <Link href="/blog" className="text-sm font-medium text-accent">
              ← Back to blog
            </Link>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted">
              {date && (
                <time dateTime={date.toISOString()}>
                  {date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </time>
              )}
              <span>·</span>
              <span>{readTime} min read</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-muted">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          {post.coverImage && (
            <Reveal delay={0.08}>
              <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-surface-muted">
                <Image src={post.coverImage} alt={post.title} fill sizes="768px" className="object-cover" />
              </div>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <div className="prose-portfolio mt-10">{content}</div>
          </Reveal>
        </article>

        <aside>
          <TableOfContents items={toc} />
        </aside>
      </div>

      {related.length > 0 && (
        <div className="mt-20 border-t border-border pt-14">
          <h2 className="text-xl font-semibold tracking-tight">Related posts</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((p, i) => (
              <BlogCard key={p._id} post={p} delay={i * 0.06} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
