import React from "react";
import { useRouter } from "next/router";
import { Menu, Button } from "@mantine/core";
import { locales, localeNames, localeFlags, useLocale, getLocalizedPath } from "../../i18n";

export const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const currentLocale = useLocale();

  const handleLocaleChange = (newLocale: string) => {
    const newPath = getLocalizedPath(router.asPath, newLocale as any);
    router.push(newPath);
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="subtle" size="sm">
          {localeFlags[currentLocale]} {localeNames[currentLocale]}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {locales.map(locale => (
          <Menu.Item
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            leftSection={<span>{localeFlags[locale]}</span>}
            disabled={locale === currentLocale}
          >
            {localeNames[locale]}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
