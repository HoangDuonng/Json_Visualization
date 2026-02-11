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
  // Remove existing lang parameter
  const cleanPath = path.split("?")[0];
  
  // Add locale as query parameter
  if (locale === defaultLocale) {
    return cleanPath;
  }
  return `${cleanPath}?lang=${locale}`;
}
