import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "../../constants/theme";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

const DotGrid = dynamic(() => import("../../components/DotGrid").then(mod => mod.DotGrid), {
  ssr: false,
});

const StyledLayoutWrapper = styled.div`
  --site-background: #f7f3e6;
  --site-surface: #fffdf7;
  --site-text: #1a1a1a;
  --site-text-muted: #666666;
  --site-accent: #37ff8b;
  --site-highlight: #f7c948;
  --site-border: #e8e4db;

  background: var(--site-background);
  color: var(--site-text);
  font-family: "Playfair Display", serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  padding-top: 80px;
`;

const ContentWrapper = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
  padding-bottom: 80px;

  @media (max-width: 768px) {
    padding-bottom: 56px;
  }
`;

const PageLayout = ({ children, stars = 0 }: React.PropsWithChildren<{ stars?: number }>) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <StyledLayoutWrapper>
        <DotGrid dotSize={2} gap={20} baseColor="#e8e4db" activeColor="#f7c948" proximity={100} />
        <Navbar />
        <ContentWrapper>{children}</ContentWrapper>
        <Footer stars={stars} />
      </StyledLayoutWrapper>
    </ThemeProvider>
  );
};

export default PageLayout;
