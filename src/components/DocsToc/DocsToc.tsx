import React from "react";
import { Paper, Stack, Text, Title } from "@mantine/core";
import styled from "styled-components";

interface DocsTocItem {
  id: string;
  label: string;
}

interface DocsTocProps {
  title: string;
  items: DocsTocItem[];
}

const StyledTocCard = styled(Paper)<any>`
  background: #fffdf5;
  border: 1px solid #e8e4db;
  border-left: 4px solid #f7c948;
`;

const StyledTocList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledTocLink = styled.a`
  color: #228be6;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const DocsToc = ({ title, items }: DocsTocProps) => {
  if (!items.length) return null;

  return (
    <StyledTocCard c="black" p="xl" radius="md" withBorder>
      <Title mb="md" order={3} c="dark">
        {title}
      </Title>
      <Stack gap={6}>
        <StyledTocList>
          {items.map(item => (
            <Text key={item.id}>
              <StyledTocLink href={`#${item.id}`}>{item.label}</StyledTocLink>
            </Text>
          ))}
        </StyledTocList>
      </Stack>
    </StyledTocCard>
  );
};
