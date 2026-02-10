# Internationalization (i18n) Structure

## Overview

This project uses a custom i18n solution optimized for Next.js static export. It supports English (en) and Vietnamese (vi) languages.

## Directory Structure

```
src/i18n/
├── config.ts              # Locale configuration (locales, default, names, flags)
├── useTranslation.ts      # Translation hook and locale detection
├── index.ts               # Barrel exports
└── locales/
    └── docs.ts            # Documentation translations
```

## How It Works

### 1. Locale Detection

The system detects locale from URL path:

- `/docs/visualization` → English (default)
- `/vi/docs/visualization` → Vietnamese

### 2. Translation Files

Translations are organized by namespace in `src/i18n/locales/`:

```typescript
// docs.ts
export const docsTranslations = {
  common: {
    needHelp: {
      en: "Need Help?",
      vi: "Cần Trợ Giúp?",
    },
  },
  visualization: {
    title: {
      en: "Visualization",
      vi: "Trực Quan Hóa",
    },
  },
};
```

### 3. Using Translations in Components

```typescript
import { useTranslation } from "../../i18n";

function MyComponent() {
  const { t, locale } = useTranslation("docs");

  return (
    <div>
      <h1>{t("visualization.title")}</h1>
      <p>{t("visualization.subtitle")}</p>
    </div>
  );
}
```

### 4. Language Switcher

Add the `LanguageSwitcher` component to allow users to change language:

```typescript
import { LanguageSwitcher } from "../../components/LanguageSwitcher";

<LanguageSwitcher />
```

### 5. Localized Links

Use `getLocalizedPath` helper to create localized links:

```typescript
import { getLocalizedPath } from "../../i18n";

const link = getLocalizedPath("/docs/visualization", "vi");
// Returns: "/vi/docs/visualization"
```

## Adding New Translations

### Step 1: Add to Translation File

Edit `src/i18n/locales/docs.ts`:

```typescript
export const docsTranslations = {
  // ... existing translations
  newSection: {
    title: {
      en: "New Section",
      vi: "Phần Mới",
    },
    description: {
      en: "Description here",
      vi: "Mô tả ở đây",
    },
  },
};
```

### Step 2: Use in Component

```typescript
const { t } = useTranslation("docs");

<h2>{t("newSection.title")}</h2>
<p>{t("newSection.description")}</p>
```

## Adding New Namespaces

### Step 1: Create Translation File

Create `src/i18n/locales/newNamespace.ts`:

```typescript
import type { Locale } from "../config";

export const newNamespaceTranslations = {
  key: {
    en: "English text",
    vi: "Vietnamese text",
  },
};

export function getNewNamespaceTranslation(key: string, locale: Locale): string {
  const keys = key.split(".");
  let value: any = newNamespaceTranslations;

  for (const k of keys) {
    value = value?.[k];
  }

  return value?.[locale] || value?.en || key;
}
```

### Step 2: Update useTranslation Hook

Edit `src/i18n/useTranslation.ts`:

```typescript
export function useTranslation(namespace: "docs" | "newNamespace") {
  const locale = useLocale();

  return {
    t: (key: string) => {
      if (namespace === "docs") {
        const { getDocsTranslation } = require("./locales/docs");
        return getDocsTranslation(key, locale);
      }
      if (namespace === "newNamespace") {
        const { getNewNamespaceTranslation } = require("./locales/newNamespace");
        return getNewNamespaceTranslation(key, locale);
      }
      return key;
    },
    locale,
  };
}
```

## Adding New Languages

### Step 1: Update Config

Edit `src/i18n/config.ts`:

```typescript
export const locales = ["en", "vi", "fr"] as const; // Add new locale

export const localeNames: Record<Locale, string> = {
  en: "English",
  vi: "Tiếng Việt",
  fr: "Français", // Add new locale name
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  vi: "🇻🇳",
  fr: "🇫🇷", // Add new flag
};
```

### Step 2: Add Translations

Add translations for the new locale in all translation files:

```typescript
title: {
  en: "Title",
  vi: "Tiêu đề",
  fr: "Titre", // Add French translation
}
```

## Best Practices

1. **Keep translations organized**: Group related translations together
2. **Use descriptive keys**: `visualization.title` not `vis.t`
3. **Provide fallbacks**: Always include English translation as fallback
4. **Test both languages**: Verify translations work in both en and vi
5. **Keep translations in sync**: When adding new features, add translations for all languages

## Current Translation Coverage

- ✅ Documentation pages (7 pages)
  - Visualization
  - Format Conversion
  - Format & Validate
  - Type Generation
  - JSON Schema
  - JSON Query (jq)
  - JSON Path

## TODO

- [ ] Translate main landing page
- [ ] Translate editor UI
- [ ] Translate converter pages
- [ ] Translate type generator pages
- [ ] Add language switcher to navbar
- [ ] Add locale to SEO metadata
