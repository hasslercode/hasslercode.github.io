import { useTranslations } from "next-intl";
import { tools } from "@/lib/site";

export function Toolbox() {
  const t = useTranslations("toolbox");

  return (
    <section className="bento-card toolbox-card" aria-labelledby="toolbox-title">
      <h2 id="toolbox-title" className="mono-label">
        {t("label")}
      </h2>
      <div className="toolbox-grid">
        {tools.map((tool) => {
          const featured = "featured" in tool && tool.featured;
          return (
            <div
              className={`tool${featured ? " tool-featured" : ""}`}
              title={tool.name}
              key={tool.slug}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${tool.slug}/${tool.color}`}
                alt=""
                width={28}
                height={28}
              />
              <span>{tool.name}</span>
            </div>
          );
        })}
        <div className="tool tool-more" title={t("more")}>
          <span className="more-icon">+</span>
          <span>{t("more")}</span>
        </div>
      </div>
    </section>
  );
}
