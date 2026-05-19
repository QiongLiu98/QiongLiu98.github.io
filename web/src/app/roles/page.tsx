import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { RoleProfileLink } from "@/components/roles/RoleProfileLink";
import { roleProfileHref, roleProfiles } from "@/content/site";
import { contentShell, pageMainY } from "@/lib/layout";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Role fit summaries",
  description:
    "How Qiong Liu's experience in deep learning and image analysis maps to targeted ML, computer vision, and research scientist roles.",
  path: "/roles",
});

export default function RolesIndexPage() {
  return (
    <>
      <PageHero
        number="—"
        label="Opportunities"
        title={
          <>
            Role fit
            <br />
            <span className="font-display-italic">summaries.</span>
          </>
        }
        description="Each title below links to a short page on qualifications and related projects. Placeholder copy is marked for replacement."
      />

      <div className={`${contentShell} ${pageMainY}`}>
        <ol className="divide-y divide-[var(--color-rule)]">
          {roleProfiles.map((profile) => (
            <li key={profile.slug} className="py-8 first:pt-0 md:py-10">
              <RoleProfileLink profile={profile} />
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-ink-soft)] md:text-base">
                {profile.summary.slice(0, 160)}…
              </p>
              <Link
                href={roleProfileHref(profile.slug)}
                className="mt-4 inline-block text-sm text-[var(--color-muted)] underline decoration-1 underline-offset-4 hover:text-[var(--color-warm)]"
              >
                Read full fit summary →
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
