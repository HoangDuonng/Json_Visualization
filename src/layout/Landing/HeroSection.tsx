import React from "react";
import { Oxygen } from "next/font/google";
import Link from "next/link";
import { Stack, Flex } from "@mantine/core";
import styled from "styled-components";
import { ExploreButton } from "../../components/ExploreButton";
import { GithubButton } from "../../components/GithubButton";

const oxygen = Oxygen({
  subsets: ["latin-ext"],
  weight: ["700"],
});

const StyledHeroSection = styled.main`
  position: relative;

  @media only screen and (max-width: 1240px) {
    flex-direction: column;
  }
`;

const StyledHeroSectionBody = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 6rem 10% 4rem;
  overflow: hidden;
  text-align: center;
  gap: 60px;
  min-height: 40vh;

  @media only screen and (max-width: 768px) {
    padding: 6em 16px;
    padding-top: 10vh;
  }
`;

const StyledHeroTitle = styled.h1`
  position: relative;
  font-size: 2.3rem;
  font-weight: 700;
  display: inline;
  color: #120f43;
  width: fit-content;
  line-height: 1.15;
  max-width: 30rem;
  font-family: ${oxygen.style.fontFamily};

  @media only screen and (min-width: 576px) {
    font-size: 3.4rem;
    max-width: 34rem;
  }

  @media only screen and (min-width: 992px) {
    font-size: 3.8rem;
    max-width: 40rem;
  }

  @media only screen and (min-width: 1400px) {
    font-size: 4.2rem;
    max-width: 50rem;
  }
`;

const StyledHeroText = styled.h2`
  font-size: 14px;
  color: #4a5568;
  font-weight: 400;
  max-width: 75%;
  margin-top: 1rem;
  text-align: center;

  strong {
    font-weight: 400;
    color: #115fe6;
  }

  @media only screen and (min-width: 576px) {
    font-size: 18px;
    max-width: 80%;
  }

  @media only screen and (min-width: 1400px) {
    font-size: 18px;
    max-width: 60%;
  }
`;

export const HeroSection = ({ stars = 0 }) => {
  return (
    <StyledHeroSection>
      <StyledHeroSectionBody>
        <Stack flex="1" miw={250} mx="auto" align="center">
          <StyledHeroTitle>Visualize JSON into interactive graphs</StyledHeroTitle>
          <StyledHeroText>
            The best online JSON viewer to <strong>visualize</strong>, <strong>format</strong> and{" "}
            <strong>explore</strong>.
          </StyledHeroText>

          <Flex gap="xs" wrap="wrap" justify="center" hiddenFrom="xs">
            <Link href="/editor">
              <ExploreButton>Go to Editor</ExploreButton>
            </Link>
          </Flex>
          <Flex gap="lg" wrap="wrap" justify="center" visibleFrom="xs">
            <Link href="/editor">
              <ExploreButton>Go to Editor</ExploreButton>
            </Link>
          </Flex>
        </Stack>
      </StyledHeroSectionBody>
    </StyledHeroSection>
  );
};
