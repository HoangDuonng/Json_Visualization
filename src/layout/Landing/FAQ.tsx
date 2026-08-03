import React from "react";
import { Container, Title, Accordion } from "@mantine/core";
import Questions from "../../data/faq.json";

export const FAQ = () => {
  return (
    <Container id="faq" component="section" size="sm" py={80}>
      <Title
        c="black"
        order={2}
        fz={{
          base: 24,
          xs: 30,
          sm: 36,
        }}
        fw={600}
        mb={60}
        ta="center"
      >
        Frequently Asked Questions
      </Title>
      <Accordion
        variant="separated"
        styles={{
          panel: {
            background: "var(--site-surface, #fffdf7)",
            color: "var(--site-text, #1a1a1a)",
          },
          label: {
            color: "var(--site-text, #1a1a1a)",
            fontWeight: 500,
          },
          item: {
            background: "var(--site-surface, #fffdf7)",
            color: "var(--site-text, #1a1a1a)",
            overflow: "hidden",
            border: "1px solid var(--site-border, #e8e4db)",
            borderRadius: 12,
            fontWeight: 300,
          },
        }}
      >
        {Questions.map(({ title, content }) => (
          <Accordion.Item key={title} value={title}>
            <Accordion.Control>{title}</Accordion.Control>
            <Accordion.Panel>{content}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};
