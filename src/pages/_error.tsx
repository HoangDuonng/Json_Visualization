import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Text, Title } from "@mantine/core";
import styled from "styled-components";
import { generateNextSeo } from "next-seo/pages";
import { ExploreButton } from "../components/ExploreButton";
import { SEO } from "../constants/seo";
import Layout from "../layout/PageLayout";

const StyledWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 56px 24px 0;
  text-align: center;

  @media (max-width: 768px) {
    padding-top: 48px;
  }
`;

const StyledCode = styled(Title)`
  font-size: 240px;
  line-height: 0.9;
  letter-spacing: -6px;
  margin: 24px 0 0;
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

  @media (max-width: 768px) {
    font-size: 140px;
    letter-spacing: -2px;
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
  margin-top: 28px;
  padding: 28px;
  border-radius: 20px;
  border: 1px solid #e8e4db;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 16px 50px rgba(26, 26, 26, 0.08);

  @media (max-width: 768px) {
    padding: 22px;
  }
`;

const StyledActions = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }
`;

const Custom500 = () => {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: "Unexpected Error Occurred | JSON Visualization",
        })}
      </Head>
      <StyledWrapper>
        <StyledCode order={1}>500</StyledCode>
        <GradientTitle order={2} mt={12} fz={42}>
          Something bad just happened...
        </GradientTitle>
        <Text mt={12} c="#666666" fz={18} maw={720} mx="auto">
          Our servers could not handle your request. Don&apos;t worry, our development team was
          already notified. Try refreshing the page.
        </Text>
        <StyledCard>
          <Text c="#666666" fz={15}>
            You can refresh to try again, or head back home.
          </Text>
          <StyledActions>
            <ExploreButton onClick={() => router.reload()}>
              Refresh the page
            </ExploreButton>
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
        </StyledCard>
      </StyledWrapper>
    </Layout>
  );
};

export default Custom500;
