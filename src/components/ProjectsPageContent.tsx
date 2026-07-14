"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProjectCard } from "./ProjectCard";
import { groupProjects, type ProjectCopy } from "@/lib/projects";

export function ProjectsPageContent() {
  const t = useTranslations("projects");
  const items = t.raw("items") as ProjectCopy[];
  const ownedMark = t("ownedMark");
  const grouped = groupProjects(items);
  const clients = grouped.client;
  const owned = [...grouped.own, ...grouped.inProgress];

  return (
    <div className="page projects-page">
      <section
        className="bento-card projects-page-hero"
        aria-labelledby="projects-page-title"
      >
        <div className="projects-page-hero-row">
          <div>
            <p className="mono-label">{t("page.label")}</p>
            <h1 id="projects-page-title">{t("page.title")}</h1>
            <p className="projects-page-lead">{t("page.lead")}</p>
          </div>
          <Link href="/#projects" className="btn-ghost projects-page-back">
            {t("page.backHome")}
          </Link>
        </div>
      </section>

      <div className="projects-split">
        <section
          className="bento-card projects-column projects-column-clients"
          aria-labelledby="projects-clients-title"
        >
          <h2 id="projects-clients-title" className="mono-label">
            {t("page.groups.client")}
          </h2>
          <div className="projects-grid projects-grid-column">
            {clients.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                ownedMark={ownedMark}
                variant="gallery"
              />
            ))}
          </div>
        </section>

        <section
          className="bento-card projects-column projects-column-own"
          aria-labelledby="projects-own-title"
        >
          <h2 id="projects-own-title" className="mono-label">
            {t("page.groups.own")}
          </h2>
          <div className="projects-grid projects-grid-column">
            {owned.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                ownedMark={ownedMark}
                variant="gallery"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
