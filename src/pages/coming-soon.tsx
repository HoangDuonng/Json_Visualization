import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Text, Title } from "@mantine/core";
import styled from "styled-components";
import { generateNextSeo } from "next-seo/pages";
import { ExploreButton } from "../components/ExploreButton";
import { SEO } from "../constants/seo";
import Layout from "../layout/PageLayout";

const StyledWrapper = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 56px 24px 0;
  text-align: center;
  position: relative;

  @media (max-width: 768px) {
    padding-top: 48px;
  }
`;

const GradientTitle = styled(Title)`
  background: linear-gradient(
    120deg,
    #1a1a1a 0%,
    #f7c948 20%,
    #37ff8b 45%,
    #22a3ff 65%,
    #ff6b6b 85%,
    #1a1a1a 100%
  );
  background-size: 200% 200%;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: gradient-shift 10s ease infinite;

  @keyframes gradient-shift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const StyledCard = styled.div`
  margin-top: 32px;
  padding: 32px;
  border-radius: 20px;
  border: 1px solid #e8e4db;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 18px 60px rgba(26, 26, 26, 0.08);
  backdrop-filter: blur(6px);

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const StyledHighlights = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const StyledHighlight = styled.div`
  padding: 16px 18px;
  border-radius: 16px;
  border: 1px solid #eee7d6;
  background: #fdf9ef;
  text-align: left;
`;

const StyledHighlightTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 6px;
`;

const StyledHighlightText = styled.p`
  margin: 0;
  font-size: 13px;
  color: #666666;
`;

const StyledActions = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;

  a {
    text-decoration: none;
  }
`;

const ComingSoon = () => {
  return (
    <Layout>
      <Head>
        {generateNextSeo({ ...SEO, title: "Coming Soon | JSON Visualization", noindex: true })}
      </Head>
      <StyledWrapper>
        <GradientTitle order={1} mt={16} fz={90}>
          Coming soon
        </GradientTitle>
        <Text mt={12} c="#666666" fz={18} maw={720} mx="auto">
          We are building this area with new features and content. In the meantime, you can keep
          exploring the editor or head back to the homepage.
        </Text>

        <StyledCard>
          <Title order={3} fz={22} c="#1a1a1a">
            In development
          </Title>
          <Text mt={8} c="#666666" fz={15}>
            A few focus areas we are polishing before launch.
          </Text>
          <StyledHighlights>
            <StyledHighlight>
              <StyledHighlightTitle>Feature updates</StyledHighlightTitle>
              <StyledHighlightText>Roadmap, release notes, and announcements.</StyledHighlightText>
            </StyledHighlight>
            <StyledHighlight>
              <StyledHighlightTitle>Contextual docs</StyledHighlightTitle>
              <StyledHighlightText>
                Focused guides that match the current feature set.
              </StyledHighlightText>
            </StyledHighlight>
            <StyledHighlight>
              <StyledHighlightTitle>Workflow tips</StyledHighlightTitle>
              <StyledHighlightText>
                Practical shortcuts and best practices for the editor.
              </StyledHighlightText>
            </StyledHighlight>
          </StyledHighlights>
        </StyledCard>

        <StyledActions>
          <Link href="/" passHref legacyBehavior>
            <a>
              <ExploreButton>Go home</ExploreButton>
            </a>
          </Link>
          <Link href="/editor" passHref legacyBehavior>
            <a>
              <ExploreButton>Go to Editor</ExploreButton>
            </a>
          </Link>
        </StyledActions>
      </StyledWrapper>
    </Layout>
  );
};

export default ComingSoon;
