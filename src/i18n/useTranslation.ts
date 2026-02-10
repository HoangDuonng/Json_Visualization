import { useRouter } from "next/router";
import type { Locale } from "./config";
import { defaultLocale } from "./config";

export function useLocale(): Locale {
  const router = useRouter();
  // Check query parameter first
  const queryLocale = router.query.lang as string;
  if (queryLocale === "vi" || queryLocale === "en") {
    return queryLocale as Locale;
  }
  return defaultLocale;
}

export function useTranslation(namespace: "docs") {
  const locale = useLocale();

  return {
    t: (key: string) => {
      if (namespace === "docs") {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { getDocsTranslation } = require("./locales/docs");
        return getDocsTranslation(key, locale);
      }
      return key;
    },
    locale,
  };
}

export function getLocalizedPath(path: string, locale: Locale): string {
  // Add locale as query parameter
  if (locale === defaultLocale) {
    return path;
  }
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}lang=${locale}`;
}
