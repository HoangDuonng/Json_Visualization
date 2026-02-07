import React from "react";
import dynamic from "next/dynamic";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "../../constants/theme";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

const SplashCursor = dynamic(() => import("../../components/Cursor"), { ssr: false });

const StyledLayoutWrapper = styled.div`
  background: #fff;
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
`;

const PageLayout = ({ children, stars = 0 }: React.PropsWithChildren<{ stars?: number }>) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <StyledLayoutWrapper>
        <SplashCursor />
        <Navbar />
        <ContentWrapper>{children}</ContentWrapper>
        <Footer stars={stars} />
      </StyledLayoutWrapper>
    </ThemeProvider>
  );
};

export default PageLayout;
