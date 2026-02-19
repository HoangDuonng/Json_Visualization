import React from "react";
import dynamic from "next/dynamic";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "../../constants/theme";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

const SplashCursor = dynamic(() => import("../../components/Cursor"), { ssr: false });
const DotGrid = dynamic(() => import("../../components/DotGrid").then(mod => mod.DotGrid), {
  ssr: false,
});

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
  padding-bottom: 80px;

  @media (max-width: 768px) {
    padding-bottom: 56px;
  }
`;

const PageLayout = ({ children, stars = 0 }: React.PropsWithChildren<{ stars?: number }>) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <StyledLayoutWrapper>
        <DotGrid dotSize={2} gap={20} baseColor="#e0e0e0" activeColor="#f7c948" proximity={100} />
        {/* <SplashCursor /> */}
        <Navbar />
        <ContentWrapper>{children}</ContentWrapper>
        <Footer stars={stars} />
      </StyledLayoutWrapper>
    </ThemeProvider>
  );
};

export default PageLayout;
