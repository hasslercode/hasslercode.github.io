"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site";
import { useContact } from "./ContactProvider";

export function Hero() {
  const t = useTranslations("hero");
  const { openContact } = useContact();

  return (
    <section className="bento-card hero-card" id="hero" aria-labelledby="hero-title">
      <aside className="hero-portrait">
        <div className="portrait-frame">
          <Image
            src={siteConfig.ogImage}
            alt={t("photoAlt")}
            width={720}
            height={900}
            priority
            sizes="(max-width: 719px) 100vw, 240px"
          />
          <div className="portrait-shade" aria-hidden="true" />
        </div>
        <div className="portrait-meta">
          <p className="availability">
            <span className="pulse-dot" aria-hidden="true" />
            {t("available")}
          </p>
          <p className="location">{t("location")}</p>
        </div>
      </aside>

      <div className="hero-copy">
        <p className="mono-label">{t("label")}</p>
        <h1 id="hero-title">
          {t("title")}
          <span className="accent-dot">.</span>
        </h1>
        <p className="hero-lead">
          {t("leadBefore")} <strong>{t("leadAccent")}</strong>
        </p>
        <p className="hero-bio">{t("bio")}</p>
        <div className="hero-actions">
          <button type="button" className="btn-primary" onClick={openContact}>
            <i className="fas fa-terminal" aria-hidden="true" />
            {t("connect")}
          </button>
          <a href={siteConfig.cv} download className="btn-ghost">
            {t("downloadCv")}
          </a>
        </div>
      </div>
    </section>
  );
}
