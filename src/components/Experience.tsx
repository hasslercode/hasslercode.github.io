import { useTranslations } from "next-intl";

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  detail: string;
};

export function Experience() {
  const t = useTranslations("experience");
  const items = t.raw("items") as ExperienceItem[];

  return (
    <section
      className="bento-card experience-card"
      aria-labelledby="experience-title"
    >
      <h2 id="experience-title" className="mono-label">
        {t("label")}
      </h2>
      <ul className="experience-list">
        {items.map((item) => (
          <li key={item.company + item.period}>
            <div className="experience-top">
              <strong>{item.company}</strong>
              <span>{item.period}</span>
            </div>
            <p className="experience-role">{item.role}</p>
            <p className="experience-detail">{item.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
