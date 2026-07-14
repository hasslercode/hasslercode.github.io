"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProjectCard } from "./ProjectCard";
import {
  PROJECT_GROUPS,
  groupProjects,
  type ProjectCopy,
  type ProjectGroup,
} from "@/lib/projects";

const GROUP_KEYS: Record<ProjectGroup, string> = {
  client: "client",
  own: "own",
  inProgress: "inProgress",
};

export function ProjectsPageContent() {
  const t = useTranslations("projects");
  const items = t.raw("items") as ProjectCopy[];
  const ownedMark = t("ownedMark");
  const grouped = groupProjects(items);

  return (
    <div className="page projects-page">
      <section className="bento-card projects-page-hero" aria-labelledby="projects-page-title">
        <p className="mono-label">{t("page.label")}</p>
        <h1 id="projects-page-title">{t("page.title")}</h1>
        <p className="projects-page-lead">{t("page.lead")}</p>
        <Link href="/#projects" className="btn-ghost projects-page-back">
          {t("page.backHome")}
        </Link>
      </section>

      {PROJECT_GROUPS.map((group) => {
        const projects = grouped[group];
        if (!projects.length) return null;

        return (
          <section
            key={group}
            className="bento-card projects-group"
            aria-labelledby={`projects-group-${group}`}
          >
            <h2 id={`projects-group-${group}`} className="mono-label">
              {t(`page.groups.${GROUP_KEYS[group]}`)}
            </h2>
            <div className="projects-grid projects-grid-page">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  ownedMark={ownedMark}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
