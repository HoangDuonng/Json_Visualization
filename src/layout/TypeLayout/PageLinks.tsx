import React from "react";
import Link from "next/link";
import { Flex, SimpleGrid, Stack } from "@mantine/core";
import { AnimatedLinkButton } from "../../components/AnimatedLinkButton";
import { formats, TypeLanguage, typeOptions } from "../../constants/enumData";

type MappedCombinations = {
  [language: string]: string[];
};

function mapLanguagesToProgramming(
  languages: string[],
  programmingLanguages: string[]
): MappedCombinations {
  const mappedCombinations: MappedCombinations = {};
  languages.forEach(language => {
    mappedCombinations[language] = programmingLanguages;
  });
  return mappedCombinations;
}

const filterProgrammingLanguages = [TypeLanguage.TypeScript_Combined, TypeLanguage.JSON_SCHEMA];

const languages = formats.map(format => format.label);

const programmingLanguages = typeOptions
  .filter(option => !filterProgrammingLanguages.includes(option.value))
  .map(option => option.label);

const groupedLanguages = mapLanguagesToProgramming(languages, programmingLanguages);

export const PageLinks = () => {
  return (
    <Flex justify="space-between" align="center" wrap="wrap" gap="md">
      <SimpleGrid cols={4} w="100%" spacing="xl" style={{ flex: 1 }}>
        {Object.entries(groupedLanguages).map(([from, tos]) => (
          <Stack key={from} gap="xs">
            {tos.map(to => (
              <Link
                key={to}
                href={`/type/${from.toLowerCase()}-to-${to.toLowerCase()}`}
                prefetch={false}
              >
                <AnimatedLinkButton>
                  {from} to {to}
                </AnimatedLinkButton>
              </Link>
            ))}
          </Stack>
        ))}
      </SimpleGrid>
    </Flex>
  );
};
