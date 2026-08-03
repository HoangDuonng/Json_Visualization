import React from "react";
import Head from "next/head";
import styled, { ThemeProvider } from "styled-components";
import { MONO_FONT_FAMILY } from "../../constants/globalStyle";
import { lightTheme } from "../../constants/theme";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

const StyledLayoutWrapper = styled.div`
  --public-bg: #f3f2ee;
  --public-surface: #fbfaf7;
  --public-surface-raised: #ffffff;
  --public-text: #171816;
  --public-text-muted: #5f625b;
  --public-text-subtle: #81847c;
  --public-border: #d9d9d3;
  --public-border-strong: #bfc0b9;
  --public-accent: #236b4a;
  --public-accent-hover: #19583c;
  --public-accent-soft: #deeee5;
  --public-accent-contrast: #ffffff;
  --public-code-bg: #171916;
  --public-container-width: 1120px;
  --public-wide-width: 1320px;
  --public-reading-width: 720px;
  --public-gutter: clamp(1.25rem, 4vw, 3rem);
  --public-section-space: clamp(4.5rem, 9vw, 8rem);
  --public-radius-sm: 5px;
  --public-radius-md: 10px;
  --public-type-display: clamp(3.25rem, 8vw, 7.25rem);
  --public-type-page-title: clamp(2.5rem, 5.5vw, 5rem);
  --public-type-section: clamp(2rem, 4vw, 3.75rem);
  --public-type-lead: clamp(1.1rem, 1.8vw, 1.35rem);
  --public-type-body: 0.9375rem;
  --public-type-body-lg: 1.0625rem;
  --public-type-meta: 0.72rem;
  --public-font-body:
    Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --public-font-display: "Playfair Display", Georgia, serif;
  --public-font-mono: ${MONO_FONT_FAMILY};
  --public-motion: 160ms ease;

  /* Backwards-compatible aliases while public components migrate. */
  --site-background: var(--public-bg);
  --site-surface: var(--public-surface);
  --site-text: var(--public-text);
  --site-text-muted: var(--public-text-muted);
  --site-accent: var(--public-accent);
  --site-highlight: var(--public-accent-soft);
  --site-border: var(--public-border);

  background: var(--public-bg);
  color: var(--public-text);
  font-family: var(--public-font-body);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;

  h1,
  h2,
  h3 {
    font-family: var(--public-font-display);
  }

  code,
  pre,
  kbd,
  samp {
    font-family: var(--public-font-mono) !important;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }
`;

const ContentWrapper = styled.main`
  flex: 1;
  position: relative;
  z-index: 1;
`;

const PageLayout = ({ children, stars = 0 }: React.PropsWithChildren<{ stars?: number }>) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <StyledLayoutWrapper>
        <Navbar />
        <ContentWrapper>{children}</ContentWrapper>
        <Footer stars={stars} />
      </StyledLayoutWrapper>
    </ThemeProvider>
  );
};

export default PageLayout;
