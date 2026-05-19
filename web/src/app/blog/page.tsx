import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { blogPosts, formatBlogDate } from "@/content/site";
import { contentShell, pageMainY } from "@/lib/layout";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description:
    "Notes on cardiac PET imaging, deep learning, and translating research into clinical practice — Qiong Liu, Ph.D.",
  path: "/blog",
});

export default function BlogPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <>
      <PageHero
        number="06"
        label="Blog"
        title={
          <>
            Notes from the
            <br />
            <span className="font-display-italic">lab &amp; clinic.</span>
          </>
        }
        description="Occasional writing on PET imaging science, machine learning, conferences, and lessons from building methods that physicians actually use."
      />

      <div className={`${contentShell} ${pageMainY}`}>
        <ol className="divide-y divide-[var(--color-rule)]">
          {sorted.map((post, index) => (
            <li key={post.slug}>
              <article>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block py-8 md:py-16"
                >
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="num text-xs text-[var(--color-warm)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <time
                      dateTime={post.date}
                      className="text-sm text-[var(--color-muted)]"
                    >
                      {formatBlogDate(post.date)}
                    </time>
                    <span className="text-[var(--color-rule)]">·</span>
                    <span className="text-xs text-[var(--color-muted-soft)]">
                      {post.readMinutes} min read
                    </span>
                  </div>

                  <h2 className="font-display mt-3 max-w-3xl text-2xl leading-[1.05] text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-warm)] md:mt-5 md:text-5xl">
                    {post.title}
                  </h2>

                  <p className="mt-3 max-w-2xl font-serif text-base italic leading-snug text-[var(--color-muted)] md:mt-5 md:text-xl">
                    {post.excerpt}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--color-rule)] px-3 py-1 text-xs text-[var(--color-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--color-ink)] underline decoration-1 underline-offset-4 group-hover:text-[var(--color-warm)]">
                    Read essay
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </p>
                </Link>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
