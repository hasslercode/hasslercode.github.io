export type ProjectBadgeType = "live" | "dev" | "proto";
export type ProjectGroup = "client" | "own" | "inProgress";

export type ProjectCopy = {
  id: string;
  name: string;
  badge: string;
  badgeType: ProjectBadgeType;
  description: string;
  tech: string[];
  year: string;
  href: string;
  external: boolean;
  owned?: boolean;
};

export type ProjectMeta = {
  id: string;
  image: string;
  group: ProjectGroup;
  featured: boolean;
  tone: string;
};

/** Static project metadata shared across locales (images, grouping, featured). */
export const PROJECT_META: ProjectMeta[] = [
  {
    id: "dra-laura-giraldo",
    image: "/images/projects/dra-laura-giraldo.png",
    group: "client",
    featured: true,
    tone: "calm-sage",
  },
  {
    id: "paola-hoyos",
    image: "/images/projects/paola-hoyos.png",
    group: "client",
    featured: true,
    tone: "warm-burgundy",
  },
  {
    id: "col-freight",
    image: "/images/projects/col-freight.png",
    group: "client",
    featured: true,
    tone: "steel-blue",
  },
  {
    id: "planeatubebe",
    image: "/images/projects/planeatubebe.png",
    group: "own",
    featured: true,
    tone: "mint-glow",
  },
  {
    id: "perksradar",
    image: "/images/projects/perksradar.png",
    group: "inProgress",
    featured: false,
    tone: "radar-teal",
  },
  {
    id: "livecanvas",
    image: "/images/projects/livecanvas.png",
    group: "inProgress",
    featured: false,
    tone: "canvas-ink",
  },
];

export const PROJECT_GROUPS: ProjectGroup[] = ["client", "own", "inProgress"];

export type ProjectItem = ProjectCopy & ProjectMeta;

export function mergeProjects(items: ProjectCopy[]): ProjectItem[] {
  const byId = new Map(items.map((item) => [item.id, item]));

  return PROJECT_META.flatMap((meta) => {
    const copy = byId.get(meta.id);
    if (!copy) return [];
    return [{ ...copy, ...meta }];
  });
}

export function getFeaturedProjects(items: ProjectCopy[]): ProjectItem[] {
  return mergeProjects(items).filter((project) => project.featured);
}

export function groupProjects(items: ProjectCopy[]): Record<ProjectGroup, ProjectItem[]> {
  const merged = mergeProjects(items);
  return {
    client: merged.filter((p) => p.group === "client"),
    own: merged.filter((p) => p.group === "own"),
    inProgress: merged.filter((p) => p.group === "inProgress"),
  };
}
