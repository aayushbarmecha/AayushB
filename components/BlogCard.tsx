import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getReadingTime } from "@/lib/markdown";
import type { IBlogPost } from "@/models/BlogPost";

export default function BlogCard({ post, delay = 0 }: { post: IBlogPost; delay?: number }) {
  const readTime = getReadingTime(post.content);
  const date = post.publishedAt ? new Date(post.publishedAt) : null;

  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5"
      >
        {post.coverImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-muted">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-center gap-2 text-xs font-medium text-muted">
            {date && (
              <time dateTime={date.toISOString()}>
                {date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </time>
            )}
            <span>·</span>
            <span>{readTime} min read</span>
          </div>
          <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
            {post.title}
          </h3>
          <p className="flex-1 text-sm leading-relaxed text-muted">{post.description}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
