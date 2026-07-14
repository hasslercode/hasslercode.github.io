import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactShell } from "@/components/ContactShell";
import { ProjectsPageContent } from "@/components/ProjectsPageContent";

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
  const t = await getTranslations({ locale, namespace: "projects" });
  const path = `/${locale}/projects/`;
  const canonical = `${siteConfig.url}${path}`;

  return {
    title: t("page.metaTitle"),
    description: t("page.metaDescription"),
    alternates: {
      canonical,
      languages: {
        es: `${siteConfig.url}/es/projects/`,
        en: `${siteConfig.url}/en/projects/`,
        "x-default": `${siteConfig.url}/es/projects/`,
      },
    },
    openGraph: {
      title: t("page.metaTitle"),
      description: t("page.metaDescription"),
      url: canonical,
      siteName: siteConfig.name,
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <ContactShell>
      <Header />
      <main id="main-content">
        <ProjectsPageContent />
      </main>
      <Footer />
    </ContactShell>
  );
}
