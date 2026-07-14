"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useContact } from "./ContactProvider";

export function ServicesPageContent() {
  const t = useTranslations("services");
  const { openContact } = useContact();
  const pillars = t.raw("pillars") as Array<{
    tag: string;
    title: string;
    body: string;
  }>;
  const audiences = t.raw("audiences") as string[];
  const cities = t.raw("cities") as string[];
  const faqs = t.raw("faqs") as Array<{ q: string; a: string }>;

  return (
    <div className="page services-page">
      <section className="bento-card services-hero" aria-labelledby="services-title">
        <div className="services-hero-grid">
          <div className="services-hero-copy">
            <p className="mono-label">{t("label")}</p>
            <h1 id="services-title">{t("title")}</h1>
            <p className="services-lead">{t("lead")}</p>
            <div className="services-hero-actions">
              <button type="button" className="btn-primary" onClick={openContact}>
                <i className="fas fa-terminal" aria-hidden="true" />
                {t("cta")}
              </button>
              <Link href="/projects" className="btn-ghost">
                {t("seeWork")}
              </Link>
            </div>
          </div>

          <aside className="services-hero-visual" aria-label={t("pillarsLabel")}>
            <div className="services-hero-offers">
              {pillars.map((pillar) => (
                <div className="services-hero-offer" key={pillar.title}>
                  <p className="mono-label">{pillar.tag}</p>
                  <p className="services-hero-offer-title">{pillar.title}</p>
                </div>
              ))}
            </div>
            <p className="services-hero-caption">{t("visualCaption")}</p>
          </aside>
        </div>
      </section>

      <section className="services-grid" aria-label={t("pillarsLabel")}>
        {pillars.map((pillar) => (
          <article className="bento-card services-pillar" key={pillar.title}>
            <p className="mono-label">{pillar.tag}</p>
            <h2>{pillar.title}</h2>
            <p>{pillar.body}</p>
          </article>
        ))}
      </section>

      <section className="services-seo" aria-labelledby="audience-title">
        <div className="bento-card services-card">
          <p className="mono-label">{t("audienceLabel")}</p>
          <h2 id="audience-title">{t("audienceTitle")}</h2>
          <p className="services-lead">{t("audienceLead")}</p>
          <div className="services-chips" aria-label={t("audienceLabel")}>
            {audiences.map((item) => (
              <span key={item} className="services-chip">
                {item}
              </span>
            ))}
          </div>
          <p className="services-cities">
            <strong>{t("citiesLabel")}</strong> {cities.join(" · ")}
          </p>
        </div>

        <div className="bento-card services-faq" aria-labelledby="faq-title">
          <h2 id="faq-title" className="mono-label">
            {t("faqLabel")}
          </h2>
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
