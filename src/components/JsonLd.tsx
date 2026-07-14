import { siteConfig } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

type FaqItem = { q: string; a: string };

type JsonLdCopy = {
  jobTitle: string;
  description: string;
  knowsAbout: string[];
  serviceName: string;
  serviceDescription: string;
  serviceTypes: string[];
  offerNames: string[];
  faqs: FaqItem[];
};

export function JsonLd({
  locale,
  copy,
}: {
  locale: Locale;
  copy: JsonLdCopy;
}) {
  const personId = `${siteConfig.url}/#person`;
  const websiteId = `${siteConfig.url}/#website`;
  const serviceId = `${siteConfig.url}/#services`;
  const faqId = `${siteConfig.url}/#faq`;
  const pageUrl = `${siteConfig.url}/${locale}`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.fullName,
        alternateName: siteConfig.name,
        jobTitle: copy.jobTitle,
        description: copy.description,
        url: pageUrl,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Medellín",
          addressRegion: "Antioquia",
          addressCountry: "CO",
        },
        homeLocation: [
          {
            "@type": "Place",
            name: "Medellín, Colombia",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Medellín",
              addressRegion: "Antioquia",
              addressCountry: "CO",
            },
          },
          {
            "@type": "Place",
            name: "Barranquilla, Colombia",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Barranquilla",
              addressRegion: "Atlántico",
              addressCountry: "CO",
            },
          },
        ],
        sameAs: [
          siteConfig.social.linkedin,
          siteConfig.social.github,
          siteConfig.social.youtube,
        ],
        knowsAbout: copy.knowsAbout,
        worksFor: {
          "@type": "Organization",
          name: siteConfig.employer,
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        description: copy.description,
        inLanguage: locale === "es" ? ["es-CO", "en"] : ["en", "es-CO"],
        author: { "@id": personId },
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: copy.serviceName,
        description: copy.serviceDescription,
        url: pageUrl,
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        provider: { "@id": personId },
        telephone: siteConfig.phone,
        email: siteConfig.email,
        priceRange: "$$",
        areaServed: [
          {
            "@type": "City",
            name: "Medellín",
            containedInPlace: {
              "@type": "Country",
              name: "Colombia",
            },
          },
          {
            "@type": "City",
            name: "Barranquilla",
            containedInPlace: {
              "@type": "Country",
              name: "Colombia",
            },
          },
          {
            "@type": "Country",
            name: "Colombia",
          },
        ],
        serviceType: copy.serviceTypes,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: copy.serviceName,
          itemListElement: copy.offerNames.map((name, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name,
              provider: { "@id": personId },
              areaServed: ["Medellín", "Barranquilla", "Colombia"],
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        mainEntity: copy.faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
