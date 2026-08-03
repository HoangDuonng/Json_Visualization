import React from "react";
import Link from "next/link";
import { Accordion, Image } from "@mantine/core";
import styled from "styled-components";
import Questions from "../../data/faq.json";
import {
  PublicActions,
  PublicContainer,
  PublicDisplay,
  PublicEyebrow,
  PublicLead,
  PublicPrimaryLink,
  PublicSecondaryLink,
  PublicSection,
  PublicSectionHeading,
} from "../PageLayout/PublicPage";

const StyledHero = styled.section`
  padding-block: clamp(5rem, 12vw, 10rem) clamp(3.5rem, 8vw, 7rem);
  border-bottom: 1px solid var(--public-border);
`;

const StyledHeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(16rem, 0.65fr);
  gap: clamp(3rem, 8vw, 8rem);
  align-items: end;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const StyledHeroAside = styled.aside`
  padding-top: 1.25rem;
  border-top: 1px solid var(--public-border-strong);

  p {
    margin: 0;
    color: var(--public-text-muted);
    font-size: 0.9rem;
    line-height: 1.65;
  }
`;

const StyledMeta = styled.dl`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.7rem 1.5rem;
  margin: 1.5rem 0 0;
  font-size: 0.75rem;

  dt {
    color: var(--public-text-subtle);
  }

  dd {
    margin: 0;
    color: var(--public-text);
    font-weight: 650;
  }
`;

const StyledPreviewSection = styled.section`
  padding-block: clamp(2rem, 5vw, 4rem) var(--public-section-space);
  border-bottom: 1px solid var(--public-border);
`;

const StyledPreviewMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding-bottom: 1rem;
  color: var(--public-text-subtle);
  font-size: var(--public-type-meta);
  font-weight: 650;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const StyledPreview = styled.div`
  overflow: hidden;
  border: 1px solid var(--public-border-strong);
  border-radius: var(--public-radius-md);
  background: var(--public-code-bg);

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const StyledEditorialGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(14rem, 0.7fr) minmax(0, 1.3fr);
  gap: clamp(3rem, 10vw, 10rem);

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const StyledSectionIntro = styled.div`
  p {
    max-width: 31rem;
    margin: 1.5rem 0 0;
    color: var(--public-text-muted);
    font-size: var(--public-type-body-lg);
    line-height: 1.7;
  }
`;

const StyledStoryList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: story;
`;

const StyledStoryItem = styled.li`
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr);
  gap: 1.25rem;
  padding-block: 1.75rem;
  border-top: 1px solid var(--public-border);
  counter-increment: story;

  &::before {
    content: "0" counter(story);
    color: var(--public-text-subtle);
    font-size: var(--public-type-meta);
    font-weight: 650;
    letter-spacing: 0.08em;
  }

  &:last-child {
    border-bottom: 1px solid var(--public-border);
  }

  h3 {
    margin: 0;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 700;
  }

  p {
    max-width: 37rem;
    margin: 0.6rem 0 0;
    color: var(--public-text-muted);
    font-size: 0.925rem;
    line-height: 1.65;
  }
`;

const StyledWorkflowList = styled.div`
  border-top: 1px solid var(--public-border-strong);
`;

const StyledWorkflow = styled(Link)`
  display: grid;
  grid-template-columns: minmax(10rem, 0.75fr) minmax(0, 1fr) auto;
  gap: 2rem;
  align-items: start;
  padding-block: 1.75rem;
  border-bottom: 1px solid var(--public-border);
  color: inherit;
  text-decoration: none;
  transition: color var(--public-motion);

  h3 {
    margin: 0;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 700;
  }

  p {
    margin: 0;
    color: var(--public-text-muted);
    font-size: 0.9rem;
    line-height: 1.6;
  }

  span {
    transition: transform var(--public-motion);
  }

  &:hover {
    color: var(--public-accent);

    span {
      transform: translateX(4px);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--public-accent);
    outline-offset: 4px;
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr auto;
    gap: 0.75rem;

    p {
      grid-column: 1 / -1;
    }
  }
`;

const StyledFormats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--public-border-strong);
  border-left: 1px solid var(--public-border);

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const StyledFormat = styled.div`
  min-height: 10rem;
  padding: 1.25rem;
  border-right: 1px solid var(--public-border);
  border-bottom: 1px solid var(--public-border);

  strong {
    display: block;
    font-family: var(--public-font-mono);
    font-size: 1rem;
  }

  span {
    display: block;
    margin-top: 4.5rem;
    color: var(--public-text-subtle);
    font-size: var(--public-type-meta);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
`;

const StyledFAQ = styled.div`
  .mantine-Accordion-item {
    border: 0;
    border-bottom: 1px solid var(--public-border);
    border-radius: 0;
    background: transparent;
  }

  .mantine-Accordion-control {
    padding: 1.25rem 0;
    color: var(--public-text);
    font-size: 0.95rem;
    font-weight: 650;
  }

  .mantine-Accordion-content {
    max-width: 42rem;
    padding: 0 0 1.5rem;
    color: var(--public-text-muted);
    font-size: 0.9rem;
    line-height: 1.7;
  }
`;

const workflows = [
  {
    title: "Understand structure",
    description:
      "Turn nested data into an interactive graph or tree without tracing braces by hand.",
    href: "/docs/visualization",
  },
  {
    title: "Convert formats",
    description: "Move between JSON, YAML, XML, and CSV in a focused two-pane workspace.",
    href: "/converter/json-to-yaml",
  },
  {
    title: "Generate types",
    description: "Create TypeScript, Go, Rust, Kotlin, or Dart definitions from structured input.",
    href: "/type/json-to-typescript",
  },
  {
    title: "Work with schemas",
    description: "Generate JSON Schema, validate data, and produce representative mock JSON.",
    href: "/tools/json-schema",
  },
];

interface EditorialHomeProps {
  stars: number;
}

export const EditorialHome = ({ stars }: EditorialHomeProps) => {
  return (
    <>
      <StyledHero>
        <PublicContainer>
          <StyledHeroGrid>
            <div>
              <PublicEyebrow>Open-source · Structured data workspace</PublicEyebrow>
              <PublicDisplay>See the shape of your data.</PublicDisplay>
              <PublicLead>
                JSON Visualization turns JSON, YAML, XML, and CSV into readable graphs—then helps
                you inspect, convert, validate, and generate code from the same data.
              </PublicLead>
              <PublicActions>
                <PublicPrimaryLink href="/editor">Open the visual editor</PublicPrimaryLink>
                <PublicSecondaryLink href="/docs">Read the docs</PublicSecondaryLink>
              </PublicActions>
            </div>
            <StyledHeroAside>
              <p>
                Built for developers who need to understand unfamiliar payloads quickly. Your data
                stays in the browser while you work.
              </p>
              <StyledMeta>
                <dt>Input formats</dt>
                <dd>4</dd>
                <dt>Type targets</dt>
                <dd>5</dd>
                <dt>GitHub stars</dt>
                <dd>{stars.toLocaleString("en-US")}</dd>
              </StyledMeta>
            </StyledHeroAside>
          </StyledHeroGrid>
        </PublicContainer>
      </StyledHero>

      <StyledPreviewSection>
        <PublicContainer $wide>
          <StyledPreviewMeta>
            <span>Product view</span>
            <span>Graph · Tree · Code</span>
          </StyledPreviewMeta>
          <StyledPreview>
            <Image
              src="/assets/editor.webp"
              loading="eager"
              alt="JSON Visualization editor showing structured data as an interactive graph"
            />
          </StyledPreview>
        </PublicContainer>
      </StyledPreviewSection>

      <PublicSection>
        <PublicContainer>
          <StyledEditorialGrid>
            <StyledSectionIntro>
              <PublicEyebrow>From payload to picture</PublicEyebrow>
              <PublicSectionHeading>
                Less time parsing. More time understanding.
              </PublicSectionHeading>
              <p>
                Start with raw structured data and move directly to the representation your task
                needs—without switching between disconnected utilities.
              </p>
            </StyledSectionIntro>
            <StyledStoryList>
              <StyledStoryItem>
                <div>
                  <h3>Bring data in</h3>
                  <p>Paste content, open a file, or load a URL in the visual editor.</p>
                </div>
              </StyledStoryItem>
              <StyledStoryItem>
                <div>
                  <h3>Read relationships</h3>
                  <p>Navigate nested objects and arrays as a graph or compact tree.</p>
                </div>
              </StyledStoryItem>
              <StyledStoryItem>
                <div>
                  <h3>Ship the result</h3>
                  <p>Export a diagram, convert formats, validate structure, or generate types.</p>
                </div>
              </StyledStoryItem>
            </StyledStoryList>
          </StyledEditorialGrid>
        </PublicContainer>
      </PublicSection>

      <PublicSection>
        <PublicContainer>
          <StyledEditorialGrid>
            <StyledSectionIntro>
              <PublicEyebrow>Workflows</PublicEyebrow>
              <PublicSectionHeading>One toolkit, several ways forward.</PublicSectionHeading>
            </StyledSectionIntro>
            <StyledWorkflowList>
              {workflows.map(workflow => (
                <StyledWorkflow key={workflow.title} href={workflow.href}>
                  <h3>{workflow.title}</h3>
                  <p>{workflow.description}</p>
                  <span aria-hidden="true">→</span>
                </StyledWorkflow>
              ))}
            </StyledWorkflowList>
          </StyledEditorialGrid>
        </PublicContainer>
      </PublicSection>

      <PublicSection>
        <PublicContainer>
          <StyledEditorialGrid>
            <StyledSectionIntro>
              <PublicEyebrow>Formats</PublicEyebrow>
              <PublicSectionHeading>Meet data where it already lives.</PublicSectionHeading>
              <p>
                Visualize and transform the formats that show up across APIs, configuration,
                exports, and integration work.
              </p>
            </StyledSectionIntro>
            <StyledFormats>
              {[
                ["JSON", "APIs & payloads"],
                ["YAML", "Configuration"],
                ["XML", "Integrations"],
                ["CSV", "Tabular exports"],
              ].map(([format, use]) => (
                <StyledFormat key={format}>
                  <strong>{format}</strong>
                  <span>{use}</span>
                </StyledFormat>
              ))}
            </StyledFormats>
          </StyledEditorialGrid>
        </PublicContainer>
      </PublicSection>

      <PublicSection>
        <PublicContainer>
          <StyledEditorialGrid>
            <StyledSectionIntro>
              <PublicEyebrow>Documentation</PublicEyebrow>
              <PublicSectionHeading>Go deeper when the workflow demands it.</PublicSectionHeading>
              <p>
                Learn the visual editor, JsonDraw, format validation, jq, JSONPath, schema tools,
                and image export with focused guides.
              </p>
              <PublicActions>
                <PublicPrimaryLink href="/docs">Explore documentation</PublicPrimaryLink>
              </PublicActions>
            </StyledSectionIntro>
            <StyledFAQ id="faq">
              <PublicEyebrow>Frequently asked</PublicEyebrow>
              <Accordion>
                {Questions.map(({ title, content }) => (
                  <Accordion.Item key={title} value={title}>
                    <Accordion.Control>{title}</Accordion.Control>
                    <Accordion.Panel>{content}</Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </StyledFAQ>
          </StyledEditorialGrid>
        </PublicContainer>
      </PublicSection>
    </>
  );
};
