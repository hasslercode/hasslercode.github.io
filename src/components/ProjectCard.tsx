import Image from "next/image";
import type { ProjectItem } from "@/lib/projects";

type ProjectCardProps = {
  project: ProjectItem;
  ownedMark: string;
  /** compact legacy; teaser = home columns + mystery cover; gallery = /projects */
  variant?: "default" | "compact" | "teaser" | "gallery";
};

export function ProjectCard({
  project,
  ownedMark,
  variant = "default",
}: ProjectCardProps) {
  const isOwned = Boolean(project.owned);
  const isCompact = variant === "compact";
  const isTeaser = variant === "teaser";
  const isGallery = variant === "gallery";
  const mysteryCover = isTeaser || isCompact;

  const content = (
    <>
      {isOwned ? (
        <span className="project-owned-corner" aria-hidden="true">
          <span>{ownedMark}</span>
        </span>
      ) : null}

      <div className={`project-cover tone-${project.tone}`} aria-hidden="true">
        <Image
          src={project.image}
          alt=""
          fill
          sizes={
            isCompact
              ? "(max-width: 700px) 96px, 112px"
              : isTeaser
                ? "(max-width: 700px) 50vw, 280px"
                : isGallery
                  ? "(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
                  : "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
          }
          className="project-cover-image"
        />
        {mysteryCover ? <span className="project-cover-veil" /> : null}
        {isTeaser ? (
          <span className="project-cover-hint">
            <i className="fas fa-arrow-up-right-from-square" />
          </span>
        ) : null}
      </div>

      <div className="project-body">
        <div className="project-top">
          <h3>{project.name}</h3>
          <span className={`badge badge-${project.badgeType}`}>
            {project.badge}
          </span>
        </div>
        <p>{project.description}</p>
        <div className="project-meta">
          <div className="tech-tags">
            {project.tech.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <div className="project-aside">
            <time dateTime={project.year}>{project.year}</time>
            {project.external && project.href !== "#" ? (
              <span className="project-open" aria-hidden="true">
                <i className="fas fa-arrow-up-right-from-square" />
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );

  const className = [
    "project",
    "project-link",
    isOwned ? "project-owned" : "",
    isCompact ? "project-compact" : "",
    isTeaser ? "project-teaser" : "",
    isGallery ? "project-gallery" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const ariaLabel = isOwned ? `${project.name} (${ownedMark})` : project.name;

  if (project.external && project.href !== "#") {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <article
      className={[
        "project",
        isOwned ? "project-owned" : "",
        isCompact ? "project-compact" : "",
        isTeaser ? "project-teaser" : "",
        isGallery ? "project-gallery" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={ariaLabel}
    >
      {content}
    </article>
  );
}
