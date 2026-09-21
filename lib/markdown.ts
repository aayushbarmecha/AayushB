import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import readingTime from "reading-time";
import CodeBlock from "@/components/CodeBlock";

export type TocItem = { id: string; text: string; level: number };

// Pull heading text out for the table of contents before MDX compiles it away.
export function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const toc: TocItem[] = [];
  const slugCounts = new Map<string, number>();

  for (const line of lines) {
    const match = /^(#{2,3})\s+(.*)/.exec(line.trim());
    if (!match) continue;
    const level = match[1].length;
    const text = match[2].trim();
    let id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    const count = slugCounts.get(id) ?? 0;
    slugCounts.set(id, count + 1);
    if (count > 0) id = `${id}-${count}`;

    toc.push({ id, text, level });
  }

  return toc;
}

export function getReadingTime(markdown: string) {
  return Math.max(1, Math.ceil(readingTime(markdown).minutes));
}

export async function renderMarkdown(markdown: string) {
  const { content } = await compileMDX({
    source: markdown,
    components: { pre: CodeBlock },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          [rehypeHighlight, { detect: true }],
        ],
      },
    },
  });

  return content;
}
