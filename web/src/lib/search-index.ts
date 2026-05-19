import {
  allPublications,
  awards,
  blogPosts,
  education,
  experience,
  expertise,
  patents,
  researchProjects,
  roleProfileHref,
  roleProfiles,
  site,
} from "@/content/site";
import { primaryNav } from "@/lib/nav";

export type SearchDocument = {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  category: string;
  /** Lowercased blob for matching */
  text: string;
};

function joinParts(parts: (string | undefined)[]): string {
  return parts.filter(Boolean).join(" ").toLowerCase();
}

function buildIndex(): SearchDocument[] {
  const docs: SearchDocument[] = [];

  for (const item of primaryNav) {
    docs.push({
      id: `nav-${item.href}`,
      title: item.label,
      excerpt: `Site section — ${item.label}`,
      href: item.href,
      category: "Page",
      text: joinParts([item.label, item.number]),
    });
  }

  docs.push({
    id: "site-tagline",
    title: `${site.name}, ${site.credentials}`,
    excerpt: site.tagline,
    href: "/",
    category: "Home",
    text: joinParts([
      site.name,
      site.title,
      site.headline,
      site.affiliation,
      site.tagline,
      site.openTo,
      site.location,
      ...roleProfiles.map((r) => r.title),
      ...roleProfiles.flatMap((r) => [r.linkHint, ...r.qualifications]),
      ...site.industryApplications,
      ...site.intro.flatMap((p) =>
        p.map((s) => (typeof s === "string" ? s : s.text)),
      ),
    ]),
  });

  docs.push({
    id: "roles-index",
    title: "Role fit summaries",
    excerpt: "How experience maps to targeted ML and computer vision roles",
    href: "/roles",
    category: "Opportunities",
    text: joinParts(roleProfiles.flatMap((r) => [r.title, r.summary, ...r.qualifications])),
  });

  for (const role of roleProfiles) {
    docs.push({
      id: `role-${role.slug}`,
      title: role.title,
      excerpt: role.linkHint,
      href: roleProfileHref(role.slug),
      category: "Role fit",
      text: joinParts([
        role.title,
        role.linkHint,
        role.summary,
        ...role.qualifications,
        ...role.evidence.map((e) => e.label),
      ]),
    });
  }

  for (const project of researchProjects) {
    const body = project.sections.map((s) => `${s.heading ?? ""} ${s.body}`).join(" ");
    docs.push({
      id: `research-${project.slug}`,
      title: project.title,
      excerpt: project.subtitle,
      href: `/research/${project.slug}`,
      category: "Research",
      text: joinParts([
        project.title,
        project.subtitle,
        project.period,
        project.status,
        project.pullQuote,
        project.abstract,
        body,
        ...project.tags,
        ...project.outcomes ?? [],
      ]),
    });
  }

  for (const pub of allPublications) {
    docs.push({
      id: `pub-${pub.id ?? pub.citation.slice(0, 40)}`,
      title: pub.citation,
      excerpt: `${pub.venue} · ${pub.year}`,
      href: "/publications",
      category: "Publication",
      text: joinParts([
        pub.citation,
        pub.authors,
        pub.venue,
        String(pub.year),
        pub.highlight,
      ]),
    });
  }

  for (const job of experience) {
    const teachingText = job.teaching
      ?.flatMap((t) => [t.title, t.role, t.period, ...t.details])
      .join(" ");
    docs.push({
      id: `exp-${job.slug}`,
      title: `${job.role} · ${job.org}`,
      excerpt: job.summary,
      href: `/experience/${job.slug}`,
      category: "Experience",
      text: joinParts([
        job.role,
        job.org,
        job.location,
        job.period,
        job.summary,
        ...job.highlights,
        teachingText,
      ]),
    });
  }

  for (const pat of patents) {
    docs.push({
      id: `patent-${pat.slug}`,
      title: pat.title,
      excerpt: `${pat.status} · ${pat.role} · ${pat.year}`,
      href: "/patents",
      category: "Patent",
      text: joinParts([pat.title, pat.description, pat.status, pat.role, pat.year]),
    });
  }

  for (const post of blogPosts) {
    const body = post.sections.map((s) => `${s.heading ?? ""} ${s.body}`).join(" ");
    docs.push({
      id: `blog-${post.slug}`,
      title: post.title,
      excerpt: post.excerpt,
      href: `/blog/${post.slug}`,
      category: "Blog",
      text: joinParts([
        post.title,
        post.excerpt,
        post.pullQuote,
        body,
        ...post.tags,
      ]),
    });
  }

  for (const group of awards) {
    for (const item of group.items) {
      docs.push({
        id: `award-${item.year}-${item.title.slice(0, 24)}`,
        title: item.title,
        excerpt: `${group.org} · ${item.year}`,
        href: item.href ?? "/cv#awards",
        category: "Award",
        text: joinParts([item.title, item.note, group.org, String(item.year)]),
      });
    }
  }

  for (const edu of education) {
    docs.push({
      id: `edu-${edu.school}`,
      title: edu.degree,
      excerpt: `${edu.school} · ${edu.period}`,
      href: "href" in edu && edu.href ? edu.href : "/cv#education",
      category: "Education",
      text: joinParts([
        edu.school,
        edu.degree,
        edu.period,
        edu.detail,
        "advisors" in edu ? edu.advisors : undefined,
      ]),
    });
  }

  for (const group of expertise) {
    for (const skill of group.items) {
      docs.push({
        id: `skill-${skill}`,
        title: skill,
        excerpt: group.category,
        href: "/cv",
        category: "Expertise",
        text: joinParts([skill, group.category]),
      });
    }
  }

  return docs;
}

export const searchDocuments = buildIndex();
