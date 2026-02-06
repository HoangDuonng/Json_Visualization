import React from "react";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "../../constants/theme";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

const SplashCursor = dynamic(() => import("../../components/Cursor"), { ssr: false });

const inter = Inter({
  subsets: ["latin-ext"],
});

const StyledLayoutWrapper = styled.div`
  background: #fff;
  font-family: ${inter.style.fontFamily};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const ContentWrapper = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
`;

const PageLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <StyledLayoutWrapper>
        <SplashCursor />
        <Navbar />
        <ContentWrapper>{children}</ContentWrapper>
        <Footer />
      </StyledLayoutWrapper>
    </ThemeProvider>
  );
};

export default PageLayout;
