import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactShell } from "@/components/ContactShell";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!hasLocale(routing.locales, localeParam)) notFound();
  const locale = localeParam as Locale;
  const t = await getTranslations({ locale, namespace: "blogs" });
  const path = `/${locale}/blogs/`;
  const canonical = `${siteConfig.url}${path}`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical,
      languages: {
        es: `${siteConfig.url}/es/blogs/`,
        en: `${siteConfig.url}/en/blogs/`,
        "x-default": `${siteConfig.url}/es/blogs/`,
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: canonical,
      siteName: siteConfig.name,
    },
  };
}

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("blogs");

  return (
    <ContactShell>
      <Header />
      <main id="main-content" className="page blogs-page">
        <section className="bento-card blogs-hero" aria-labelledby="blogs-title">
          <p className="mono-label">{t("label")}</p>
          <h1 id="blogs-title">{t("title")}</h1>
          <p className="blogs-lead">{t("lead")}</p>
        </section>

        <section className="bento-card blogs-empty" aria-labelledby="blogs-empty-title">
          <div className="blogs-empty-icon" aria-hidden="true">
            <i className="fas fa-pen-nib" />
          </div>
          <h2 id="blogs-empty-title">{t("emptyTitle")}</h2>
          <p>{t("emptyBody")}</p>
          <Link href="/" className="btn-primary blogs-back">
            <i className="fas fa-arrow-left" aria-hidden="true" />
            {t("backHome")}
          </Link>
        </section>
      </main>
      <Footer />
    </ContactShell>
  );
}
