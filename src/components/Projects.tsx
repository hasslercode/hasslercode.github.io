"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProjectCard } from "./ProjectCard";
import { getFeaturedProjects, type ProjectCopy } from "@/lib/projects";

export function Projects() {
  const t = useTranslations("projects");
  const items = t.raw("items") as ProjectCopy[];
  const featured = getFeaturedProjects(items);
  const viewAll = t("viewAll");
  const ownedMark = t("ownedMark");

  return (
    <section
      className="bento-card projects-card"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="projects-head">
        <h2 id="projects-title" className="mono-label">
          {t("label")}
        </h2>
        <Link href="/projects" className="view-all">
          {viewAll}
        </Link>
      </div>

      <div className="projects-grid">
        {featured.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            ownedMark={ownedMark}
            variant="teaser"
          />
        ))}
      </div>
    </section>
  );
}
