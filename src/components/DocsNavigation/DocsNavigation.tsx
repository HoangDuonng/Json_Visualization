import React from "react";
import Link from "next/link";
import { Paper, Stack, Text, Title } from "@mantine/core";
import styled from "styled-components";

interface DocsNavItem {
  label: string;
  title: string;
  href: string;
}

interface DocsNavigationProps {
  title: string;
  previous?: DocsNavItem;
  next?: DocsNavItem;
}

const StyledNavCard = styled(Paper)<any>`
  height: 100%;
  cursor: pointer;
  transition: all 0.25s ease;
  background: #ffffff;
  border: 1px solid #e8e4db;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(26, 26, 26, 0.12);
  }
`;

const StyledNavLabel = styled(Text)`
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.7rem;
  color: #868e96;
`;

const StyledNavGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledNavItem = styled.div<{ $align?: "left" | "right" }>`
  grid-column: ${props => (props.$align === "right" ? "2 / 3" : "auto")};

  @media (max-width: 768px) {
    grid-column: auto;
  }
`;

export const DocsNavigation = ({ title, previous, next }: DocsNavigationProps) => {
  if (!previous && !next) {
    return null;
  }

  return (
    <Paper bg="white" c="black" p="xl" radius="md" withBorder>
      <Title mb="md" order={3} c="dark">
        {title}
      </Title>
      <StyledNavGrid>
        {previous && (
          <StyledNavItem>
            <Link
              href={previous.href}
              style={{ textDecoration: "none", color: "inherit" }}
              aria-label={`${previous.label}: ${previous.title}`}
            >
              <StyledNavCard p="lg" radius="md">
                <Stack gap={6}>
                  <StyledNavLabel>{previous.label}</StyledNavLabel>
                  <Text fw={600} c="dark">
                    {previous.title}
                  </Text>
                </Stack>
              </StyledNavCard>
            </Link>
          </StyledNavItem>
        )}
        {next && (
          <StyledNavItem $align={previous ? "left" : "right"}>
            <Link
              href={next.href}
              style={{ textDecoration: "none", color: "inherit" }}
              aria-label={`${next.label}: ${next.title}`}
            >
              <StyledNavCard p="lg" radius="md">
                <Stack gap={6}>
                  <StyledNavLabel>{next.label}</StyledNavLabel>
                  <Text fw={600} c="dark">
                    {next.title}
                  </Text>
                </Stack>
              </StyledNavCard>
            </Link>
          </StyledNavItem>
        )}
      </StyledNavGrid>
    </Paper>
  );
};
