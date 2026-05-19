import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { contentShell, pageMainY, detailHeroOuter } from "@/lib/layout";
import {
  blogPosts,
  formatBlogDate,
  getBlogPostBySlug,
} from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Blog" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const currentIndex = sorted.findIndex((p) => p.slug === slug);
  const nextPost = sorted[currentIndex + 1];
  const prevPost = sorted[currentIndex - 1];

  return (
    <article>
      <header className={`${detailHeroOuter}`}>
        <div className={`${contentShell}`}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] underline decoration-1 underline-offset-4 hover:text-[var(--color-warm)]"
          >
            ← All posts
          </Link>

          <div className="mt-8 flex flex-wrap items-baseline gap-3">
            <span className="label">Essay</span>
            <span className="text-[var(--color-rule)]">·</span>
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

          <h1 className="font-display mt-6 max-w-4xl text-4xl leading-[0.95] text-[var(--color-ink)] md:text-6xl lg:text-7xl">
            {post.title}
          </h1>

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
        </div>
      </header>

      <div className={`section-gradient ${contentShell} ${pageMainY}`}>
        <div className="mx-auto max-w-3xl">
          <div className="content-panel rounded-sm p-6 md:p-10 lg:p-12">
          {post.pullQuote && (
            <blockquote className="border-l-4 border-[var(--color-warm)] pl-6 font-display text-2xl leading-snug text-[var(--color-ink)] md:text-3xl">
              &ldquo;{post.pullQuote}&rdquo;
            </blockquote>
          )}

          <div className={`space-y-10 ${post.pullQuote ? "mt-14" : ""}`}>
            {post.sections.map((section, i) => (
              <section key={i}>
                {section.heading && (
                  <h2 className="font-display mb-4 text-2xl text-[var(--color-ink)] md:text-3xl">
                    {section.heading}
                  </h2>
                )}
                <p className="prose-editorial text-lg leading-relaxed">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          {post.relatedLinks && post.relatedLinks.length > 0 && (
            <aside className="mt-16 border-t border-[var(--color-rule)] pt-10">
              <p className="label mb-4">Further reading</p>
              <ul className="space-y-3">
                {post.relatedLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-lg italic text-[var(--color-warm)] underline decoration-1 underline-offset-4"
                    >
                      {link.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}
          </div>
        </div>

        <nav className="mx-auto mt-24 flex max-w-3xl flex-wrap justify-between gap-6 border-t border-[var(--color-rule)] pt-10">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="group max-w-xs">
              <span className="label">Previous</span>
              <p className="mt-2 font-serif text-lg italic text-[var(--color-ink)] group-hover:text-[var(--color-warm)]">
                ← {prevPost.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group max-w-xs text-right"
            >
              <span className="label">Next</span>
              <p className="mt-2 font-serif text-lg italic text-[var(--color-ink)] group-hover:text-[var(--color-warm)]">
                {nextPost.title} →
              </p>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </article>
  );
}
