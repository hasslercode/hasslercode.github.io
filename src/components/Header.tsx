"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { useContact } from "./ContactProvider";
import { siteConfig } from "@/lib/site";

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const { openContact } = useContact();
  const [menuOpen, setMenuOpen] = useState(false);

  const active = pathname.startsWith("/projects")
    ? "projects"
    : pathname.startsWith("/services")
      ? "services"
      : pathname.startsWith("/blogs")
        ? "blogs"
        : "top";

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleContact() {
    closeMenu();
    openContact();
  }

  const links = [
    {
      id: "top",
      label: t("nav.home"),
      href: "/",
    },
    {
      id: "projects",
      label: t("nav.projects"),
      href: "/projects",
    },
    {
      id: "services",
      label: t("nav.services"),
      href: "/services",
    },
    {
      id: "blogs",
      label: t("nav.blogs"),
      href: "/blogs",
    },
  ];

  return (
    <header className="site-header" id="top">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label={t("a11y.home")}>
          <img
            src="/brand/hassler-logo.png"
            alt=""
            className="brand-mark"
            width={34}
            height={34}
          />
          <span className="brand-text">
            <strong>HASSLER ISAAC</strong>
            <small>{t("brand.tagline")}</small>
          </span>
        </Link>

        <nav className="main-nav" aria-label={t("a11y.primaryNav")}>
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`nav-link${active === link.id ? " is-active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            className="nav-link"
            onClick={handleContact}
          >
            {t("nav.contact")}
          </button>
        </nav>

        <div className="header-actions">
          <LocaleSwitcher
            switchToEn={t("a11y.switchToEn")}
            switchToEs={t("a11y.switchToEs")}
          />
          <a
            href={siteConfig.cv}
            download
            className="btn-cv"
            aria-label={t("a11y.downloadCv")}
          >
            <i className="fas fa-file-arrow-down" aria-hidden="true" />
            <span>{t("nav.cv")}</span>
          </a>
          <ThemeToggle label={t("a11y.toggleTheme")} />
          <button
            type="button"
            className="menu-btn"
            aria-label={t("a11y.openMenu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        hidden={!menuOpen}
      >
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="mobile-nav-link"
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}
        <button
          type="button"
          className="mobile-nav-link mobile-nav-btn"
          onClick={handleContact}
        >
          {t("nav.contact")}
        </button>
        <a
          href={siteConfig.cv}
          download
          className="mobile-nav-link"
          onClick={closeMenu}
        >
          {t("nav.downloadCv")}
        </a>
      </div>
    </header>
  );
}
