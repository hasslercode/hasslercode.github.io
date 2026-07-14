import { useTranslations } from "next-intl";

const iconMap = {
  briefcase: "fa-briefcase",
  flask: "fa-flask",
  book: "fa-book-open",
} as const;

export function Status() {
  const t = useTranslations("status");
  const items = t.raw("items") as Array<{
    text: string;
    tag: string;
    icon: keyof typeof iconMap;
  }>;

  return (
    <section className="bento-card status-card" aria-labelledby="status-title">
      <h2 id="status-title" className="mono-label">
        {t("label")}
      </h2>
      <ul className="status-list">
        {items.map((item) => (
          <li key={item.tag + item.text}>
            <span className="status-icon" aria-hidden="true">
              <i className={`fas ${iconMap[item.icon]}`} />
            </span>
            <div>
              <p>{item.text}</p>
              <span className="status-tag">{item.tag}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
