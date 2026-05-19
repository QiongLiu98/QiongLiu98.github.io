import Link from "next/link";
import {
  contentShell,
  displaySectionTitle,
  sectionYMedium,
} from "@/lib/layout";
import { RoleProfileLink } from "@/components/roles/RoleProfileLink";
import { roleProfiles, site } from "@/content/site";

export function TargetRolesSection() {
  return (
    <section className={sectionYMedium}>
      <div className={contentShell}>
        <div className="grid gap-8 md:gap-12 lg:grid-cols-[1fr_1.35fr] lg:items-start lg:gap-10">
          <div>
            <div className="flex items-baseline gap-2 md:gap-3">
              <span className="num text-xs text-[var(--color-warm)]">02</span>
              <span className="label">Opportunities</span>
            </div>
            <h2 className={displaySectionTitle}>
              Open to{" "}
              <span className="font-display-italic">broader roles.</span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--color-ink-soft)] md:mt-8 md:text-lg">
              {site.openTo}
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block text-sm text-[var(--color-muted)] underline decoration-1 underline-offset-4 hover:text-[var(--color-warm)] md:mt-8"
            >
              Get in touch →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
            <div className="rounded-sm border border-[var(--color-rule)] bg-[var(--color-surface)]/90 p-5 md:p-6">
              <h3 className="label">Roles I&rsquo;m targeting</h3>
              <ul className="mt-4 space-y-3.5 text-sm leading-snug md:space-y-4 md:text-[0.9375rem]">
                {roleProfiles.map((profile) => (
                  <li key={profile.slug} className="flex gap-2">
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-warm)]"
                      aria-hidden
                    />
                    <RoleProfileLink profile={profile} />
                  </li>
                ))}
              </ul>
              <Link
                href="/roles"
                className="mt-5 inline-block text-xs text-[var(--color-muted)] underline decoration-1 underline-offset-4 hover:text-[var(--color-warm)]"
              >
                View all →
              </Link>
            </div>
            <div className="rounded-sm border border-[var(--color-rule)] bg-[var(--color-surface)]/90 p-5 md:p-6">
              <h3 className="label">Where the work applies</h3>
              <ul className="mt-4 space-y-2.5 text-sm leading-snug text-[var(--color-ink)] md:text-[0.9375rem]">
                {site.industryApplications.map((industry) => (
                  <li key={industry} className="flex gap-2">
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-highlight)]"
                      aria-hidden
                    />
                    {industry}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
