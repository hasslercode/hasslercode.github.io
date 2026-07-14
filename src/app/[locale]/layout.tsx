import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { LocaleHtmlLang } from "@/components/LocaleHtmlLang";

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

  const t = await getTranslations({ locale, namespace: "meta" });
  const path = `/${locale}/`;
  const canonical = `${siteConfig.url}${path}`;
  const ogLocale = locale === "es" ? "es_CO" : "en_US";
  const ogAlternate = locale === "es" ? "en_US" : "es_CO";

  return {
    metadataBase: new URL(siteConfig.url),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(", ").filter(Boolean),
    authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
    creator: siteConfig.fullName,
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        es: `${siteConfig.url}/es/`,
        en: `${siteConfig.url}/en/`,
        "x-default": `${siteConfig.url}/es/`,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: t("title"),
      description: t("description"),
      siteName: siteConfig.name,
      locale: ogLocale,
      alternateLocale: [ogAlternate],
      images: [
        {
          url: siteConfig.ogImage,
          width: 843,
          height: 843,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [siteConfig.ogImage],
    },
    icons: {
      icon: [
        { url: "/brand/hassler-logo.png", type: "image/png" },
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: ["/brand/hassler-logo.png"],
    },
    other: {
      "theme-color": "#0a7a55",
      "geo.region": "CO-ANT",
      "geo.placename": "Medellín, Barranquilla",
      "geo.position": "6.2442;-75.5812",
      ICBM: "6.2442, -75.5812",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!hasLocale(routing.locales, localeParam)) notFound();
  const locale = localeParam as Locale;

  setRequestLocale(locale);
  const messages = await getMessages();
  const tJson = await getTranslations({ locale, namespace: "jsonLd" });
  const tServices = await getTranslations({ locale, namespace: "services" });

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleHtmlLang locale={locale} />
      <JsonLd
        locale={locale}
        copy={{
          jobTitle: tJson("jobTitle"),
          description: tJson("description"),
          knowsAbout: tJson.raw("knowsAbout") as string[],
          serviceName: tJson("serviceName"),
          serviceDescription: tJson("serviceDescription"),
          serviceTypes: tJson.raw("serviceTypes") as string[],
          offerNames: tJson.raw("offerNames") as string[],
          faqs: tServices.raw("faqs") as Array<{ q: string; a: string }>,
        }}
      />
      {children}
    </NextIntlClientProvider>
  );
}
