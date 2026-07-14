"use client";

import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site";
import { useContact } from "./ContactProvider";

export function Footer() {
  const t = useTranslations("footer");
  const a11y = useTranslations("a11y");
  const { openContact } = useContact();

  return (
    <footer className="site-footer" id="contact" aria-label={t("label")}>
      <div className="footer-inner">
        <button
          type="button"
          className="footer-label mono-label footer-contact-btn"
          onClick={openContact}
        >
          {t("label")}
        </button>
        <nav className="footer-links" aria-label={a11y("socialNav")}>
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github" aria-hidden="true" /> {t("github")}
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin-in" aria-hidden="true" />{" "}
            {t("linkedin")}
          </a>
          <a
            href={siteConfig.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-youtube" aria-hidden="true" /> {t("youtube")}
          </a>
          <button type="button" className="footer-email-btn" onClick={openContact}>
            <i className="fas fa-envelope" aria-hidden="true" /> {t("email")}
          </button>
        </nav>
      </div>
    </footer>
  );
}
