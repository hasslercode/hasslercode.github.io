import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactShell } from "@/components/ContactShell";
import { ServicesPageContent } from "@/components/ServicesPageContent";

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
  const t = await getTranslations({ locale, namespace: "services" });
  const path = `/${locale}/services/`;
  const canonical = `${siteConfig.url}${path}`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: t("metaKeywords").split(", ").filter(Boolean),
    alternates: {
      canonical,
      languages: {
        es: `${siteConfig.url}/es/services/`,
        en: `${siteConfig.url}/en/services/`,
        "x-default": `${siteConfig.url}/es/services/`,
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

export default async function ServicesPage({
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
        <ServicesPageContent />
      </main>
      <Footer />
    </ContactShell>
  );
}
