"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function LocaleSwitcher({
  switchToEn,
  switchToEs,
}: {
  switchToEn: string;
  switchToEs: string;
}) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const nextLocale: Locale = locale === "es" ? "en" : "es";
  const label = nextLocale === "en" ? switchToEn : switchToEs;

  function switchLocale() {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <button
      type="button"
      className="locale-btn"
      onClick={switchLocale}
      aria-label={label}
      title={label}
    >
      {nextLocale.toUpperCase()}
    </button>
  );
}
