import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { generateNextSeo } from "next-seo/pages";
import { SEO } from "../constants/seo";
import Layout from "../layout/PageLayout";
import {
  PublicActions,
  PublicContainer,
  PublicDisplay,
  PublicEyebrow,
  PublicLead,
  PublicPageHeader,
  PublicPrimaryLink,
  PublicSecondaryLink,
  PublicSection,
  PublicSectionHeading,
} from "../layout/PageLayout/PublicPage";

const StyledHighlights = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 2.5rem;
  border-top: 1px solid var(--public-border);

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const StyledHighlight = styled.div`
  padding: 1.5rem 1.5rem 1.5rem 0;
  border-bottom: 1px solid var(--public-border);

  & + & {
    padding-left: 1.5rem;
    border-left: 1px solid var(--public-border);
  }

  @media (max-width: 720px) {
    padding-inline: 0;

    & + & {
      padding-left: 0;
      border-left: 0;
    }
  }
`;

const StyledHighlightTitle = styled.h3`
  margin: 0 0 0.5rem;
  color: var(--public-text);
  font-size: var(--public-type-body);
  font-weight: 650;
`;

const StyledHighlightText = styled.p`
  margin: 0;
  color: var(--public-text-muted);
  font-size: var(--public-type-body);
  line-height: 1.6;
`;

const ComingSoon = () => {
  return (
    <Layout>
      <Head>
        {generateNextSeo({ ...SEO, title: "Coming Soon | JSON Visualization", noindex: true })}
      </Head>
      <PublicPageHeader>
        <PublicContainer>
          <PublicEyebrow>In development</PublicEyebrow>
          <PublicDisplay>Coming soon</PublicDisplay>
          <PublicLead>
            We are building this area with new features and content. In the meantime, you can keep
            exploring the editor or head back to the homepage.
          </PublicLead>
          <PublicActions>
            <PublicPrimaryLink href="/editor">Go to Editor</PublicPrimaryLink>
            <PublicSecondaryLink href="/">Go home</PublicSecondaryLink>
          </PublicActions>
        </PublicContainer>
      </PublicPageHeader>
      <PublicSection>
        <PublicContainer>
          <PublicEyebrow>What to expect</PublicEyebrow>
          <PublicSectionHeading>Focus areas before launch</PublicSectionHeading>
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
        </PublicContainer>
      </PublicSection>
    </Layout>
  );
};

export default ComingSoon;
