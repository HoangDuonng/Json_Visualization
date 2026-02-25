import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Flex, SimpleGrid, Stack } from "@mantine/core";
import { AnimatedLinkButton } from "../../components/AnimatedLinkButton";
import { formats } from "../../constants/enumData";

const languages = formats.map(format => format.label);

function groupCombinations(array: string[]): Record<string, string[]> {
  const grouped = {};
  array.forEach(from => {
    const targets = array.filter(to => to !== from);
    grouped[from] = targets;
  });
  return grouped;
}

const groupedLanguages = groupCombinations(languages);

export const PageLinks = () => {
  const router = useRouter();

  return (
    <Flex justify="space-between" align="center" wrap="wrap" gap="md">
      <SimpleGrid cols={4} w="100%" spacing="xl" style={{ flex: 1 }}>
        {Object.entries(groupedLanguages).map(([from, tos]) => (
          <Stack key={from} gap="xs">
            {tos.map(to => (
              <Link
                key={to}
                href={`/converter/${from.toLowerCase()}-to-${to.toLowerCase()}`}
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
