import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // Static export cannot run middleware; always prefix locales in the URL
  localePrefix: "always",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
