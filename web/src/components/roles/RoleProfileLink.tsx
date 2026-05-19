import Link from "next/link";
import type { RoleProfile } from "@/content/site";
import { roleProfileHref } from "@/content/site";

type Props = {
  profile: RoleProfile;
  className?: string;
};

export function RoleProfileLink({ profile, className = "" }: Props) {
  const hintId = `role-hint-${profile.slug}`;

  return (
    <div
      className={`group/role relative min-w-0 flex-1 ${className}`.trim()}
    >
      <p className="text-sm leading-snug text-[var(--color-ink)] md:text-[0.9375rem]">
        {profile.title}
      </p>
      <p className="mt-1">
        <Link
          href={roleProfileHref(profile.slug)}
          className="role-fit-link text-xs text-[var(--color-warm)] underline decoration-[var(--color-warm)] decoration-1 underline-offset-[0.2em] transition-colors hover:decoration-2 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-warm)] md:text-[0.8125rem]"
          aria-describedby={hintId}
        >
          Fit summary
        </Link>
      </p>
      <span id={hintId} role="tooltip" className="role-fit-tooltip">
        {profile.linkHint}
      </span>
    </div>
  );
}
