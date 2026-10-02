"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const INITIAL_TAG_COUNT = 8;

type BlogTagFilterProps = {
  tags: string[];
  activeTag?: string;
};

export default function BlogTagFilter({ tags, activeTag }: BlogTagFilterProps) {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredTags = useMemo(() => {
    if (!normalizedQuery) return tags;

    return tags.filter((tag) => tag.toLowerCase().includes(normalizedQuery));
  }, [tags, normalizedQuery]);

  const visibleTags =
    normalizedQuery || showAll
      ? filteredTags
      : filteredTags.slice(0, INITIAL_TAG_COUNT);

  const hasMoreTags =
    !normalizedQuery && filteredTags.length > INITIAL_TAG_COUNT;

  return (
    <div className="mt-8">
      <div className="mb-4">
        <label htmlFor="tag-search" className="sr-only">
          Search tags
        </label>

        <input
          id="tag-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tags..."
          className="w-full max-w-sm rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none transition placeholder:text-muted focus:border-accent"
        />
      </div>

      {visibleTags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${
              !activeTag
                ? "bg-foreground text-background"
                : "bg-surface-muted text-muted"
            }`}
          >
            All
          </Link>

          {visibleTags.map((tag) => {
            const isActive = activeTag === tag;

            return (
              <Link
                key={tag}
                href={
                  isActive ? "/blog" : `/blog?tag=${encodeURIComponent(tag)}`
                }
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${
                  isActive
                    ? "bg-foreground text-background"
                    : "bg-surface-muted text-muted"
                }`}
              >
                {tag}
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-muted">No matching tags.</p>
      )}

      {hasMoreTags && (
        <button
          type="button"
          onClick={() => setShowAll((current) => !current)}
          className="mt-4 text-sm font-medium text-accent hover:underline"
        >
          {showAll ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}
