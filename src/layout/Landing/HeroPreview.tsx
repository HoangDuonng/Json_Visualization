import React from "react";
import { Container, Image } from "@mantine/core";

export const HeroPreview = () => {
  return (
    <Container component="section" id="preview" fluid py="20" mx="lg">
      <Image
        src="./assets/editor.webp"
        loading="eager"
        maw={1036}
        mx="auto"
        alt="JSON Visualization editor preview"
        style={{
          borderRadius: 10,
          overflow: "hidden",
          border: "1px solid var(--site-border, #e8e4db)",
          outline: "1px solid var(--site-border, #e8e4db)",
          outlineOffset: "6px",
          boxShadow: "0 24px 60px rgba(26, 26, 26, 0.12)",
        }}
      />
    </Container>
  );
};
