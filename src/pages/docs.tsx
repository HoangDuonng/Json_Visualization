import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Group, Paper, Stack, Text, Title, ThemeIcon, SimpleGrid } from "@mantine/core";
import styled from "styled-components";
import { generateNextSeo } from "next-seo/pages";
import { FaBolt, FaToolbox } from "react-icons/fa";
import { IoBrushOutline, IoImages } from "react-icons/io5";
import { MdOutlineFormatIndentIncrease, MdOutlineGeneratingTokens } from "react-icons/md";
import { TbTransformFilled } from "react-icons/tb";
import { VscJson } from "react-icons/vsc";
import { ChatBot } from "../components/ChatBot";
import { ChatButton } from "../components/ChatButton";
import { CodeBlock } from "../components/CodeBlock";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { SEO } from "../constants/seo";
import { useTranslation } from "../i18n";
import Layout from "../layout/PageLayout";
import { PublicContainer } from "../layout/PageLayout/PublicPage";

const StyledDocsContainer = styled(PublicContainer)`
  padding-block: clamp(3rem, 7vw, 6rem);
  & > .mantine-Stack-root {
    gap: 0;
  }
  & > .mantine-Stack-root > div:first-child {
    padding-bottom: 3rem;
    border-bottom: 1px solid var(--public-border);
  }
  & > .mantine-Stack-root > .mantine-Paper-root {
    padding: clamp(2.5rem, 6vw, 4rem) 0;
    border: 0;
    border-bottom: 1px solid var(--public-border);
    border-radius: 0;
    background: transparent;
  }
  h1 {
    font-size: var(--public-type-page-title);
    letter-spacing: -0.04em;
    line-height: 1.05;
  }
  @media (max-width: 480px) {
    & > .mantine-Stack-root > div:first-child {
      flex-direction: column;
      align-items: flex-start !important;
      gap: 1.5rem;
    }
  }
`;

const StyledContentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  line-height: 1.7;
`;

const StyledFeatureCard = styled(Paper)<any>`
  cursor: pointer;
  border: 0;
  border-top: 1px solid var(--public-border);
  border-radius: 0;
  transition: border-color var(--public-motion);
  height: 100%;
  background: var(--site-surface, #fffdf7);
  color: var(--site-text, #1a1a1a);
  border-color: var(--site-border, #e8e4db);

  &:hover {
    border-color: var(--public-accent);
  }
`;

const StyledLink = styled.a`
  color: var(--site-text, #1a1a1a);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
    text-decoration-color: var(--site-accent, #37ff8b);
    text-decoration-thickness: 3px;
  }
`;

const StyledDocsPaper = styled(Paper)<any>`
  background: var(--site-surface, #fffdf7);
  color: var(--site-text, #1a1a1a);
  border-color: var(--site-border, #e8e4db);
`;

const Docs = () => {
  const { t, locale } = useTranslation("docs");
  const [chatOpened, setChatOpened] = React.useState(false);

  const getLocalizedLink = (path: string) => {
    return locale === "vi" ? `${path}?lang=vi` : path;
  };

  const features = [
    {
      title: t("index.visualizationTitle"),
      description: t("index.visualizationDesc"),
      icon: <FaBolt size={24} />,
      color: "#236b4a",
      link: getLocalizedLink("/docs/visualization"),
    },
    {
      title: t("index.jsonDrawTitle"),
      description: t("index.jsonDrawDesc"),
      icon: <IoBrushOutline size={24} />,
      color: "#236b4a",
      link: getLocalizedLink("/docs/jsondraw"),
    },
    {
      title: t("index.formatConversionTitle"),
      description: t("index.formatConversionDesc"),
      icon: <TbTransformFilled size={24} />,
      color: "#236b4a",
      link: getLocalizedLink("/docs/format-conversion"),
    },
    {
      title: t("index.formatValidateTitle"),
      description: t("index.formatValidateDesc"),
      icon: <MdOutlineFormatIndentIncrease size={24} />,
      color: "#236b4a",
      link: getLocalizedLink("/docs/format-validate"),
    },
    {
      title: t("index.typeGenerationTitle"),
      description: t("index.typeGenerationDesc"),
      icon: <MdOutlineGeneratingTokens size={24} />,
      color: "#236b4a",
      link: getLocalizedLink("/docs/type-generation"),
    },
    {
      title: t("index.jsonSchemaTitle"),
      description: t("index.jsonSchemaDesc"),
      icon: <VscJson size={24} />,
      color: "#236b4a",
      link: getLocalizedLink("/docs/json-schema"),
    },
    {
      title: t("index.jqQueryTitle"),
      description: t("index.jqQueryDesc"),
      icon: <FaToolbox size={24} />,
      color: "#236b4a",
      link: getLocalizedLink("/docs/jq-query"),
    },
    {
      title: t("index.jsonPathTitle"),
      description: t("index.jsonPathDesc"),
      icon: <FaToolbox size={24} />,
      color: "#236b4a",
      link: getLocalizedLink("/docs/json-path"),
    },
    {
      title: t("index.exportImageTitle"),
      description: t("index.exportImageDesc"),
      icon: <IoImages size={24} />,
      color: "#236b4a",
      link: getLocalizedLink("/docs/export-image"),
    },
  ];

  const faqs = [
    {
      question: t("index.faq1Question"),
      answer: t("index.faq1Answer"),
    },
    {
      question: t("index.faq2Question"),
      answer: t("index.faq2Answer"),
    },
    {
      question: t("index.faq3Question"),
      answer: t("index.faq3Answer"),
    },
    {
      question: t("index.faq4Question"),
      answer: t("index.faq4Answer"),
    },
    {
      question: t("index.faq5Question"),
      answer: t("index.faq5Answer"),
    },
  ];

  const sampleJson = `{
  "customer": {
    "id": 1024,
    "name": "Jane Doe",
    "email": "jane@example.com"
  },
  "orders": [
    {
      "id": "A-1001",
      "total": 129.5,
      "status": "paid"
    },
    {
      "id": "A-1002",
      "total": 89.0,
      "status": "pending"
    }
  ]
}`;

  const sampleCsv = `id,product,price
101,Notebook,12.5
102,Pen,3.2
103,Backpack,39.9`;

  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: "Documentation - JSON Visualization",
          description: "Learn about JSON Visualization features and how to use them.",
          canonical: "https://jsonviz.online/docs",
        })}
      </Head>
      <StyledDocsContainer>
        <Stack gap="xl">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Title order={1} c="dark">
              {t("index.title")}
            </Title>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <ChatButton onClick={() => setChatOpened(true)} />
              <LanguageSwitcher />
            </div>
          </div>

          <StyledDocsPaper p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("index.welcomeTitle")}
            </Title>
            <StyledContentBody>
              <Text size="lg">{t("index.welcomeDesc1")}</Text>
              <Text>
                {t("index.welcomeDesc2")}{" "}
                <StyledLink href={getLocalizedLink("/editor")}>Editor</StyledLink>.
              </Text>
            </StyledContentBody>
          </StyledDocsPaper>

          <div>
            <Title mb="lg" order={2} c="dark">
              {t("index.featuresTitle")}
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
              {features.map(feature => (
                <Link
                  key={feature.title}
                  href={feature.link}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <StyledFeatureCard p="lg" radius="md" withBorder>
                    <Group mb="md">
                      <ThemeIcon size={48} radius="md" color={feature.color} variant="light">
                        {feature.icon}
                      </ThemeIcon>
                    </Group>
                    <Title order={4} mb="xs" c="dark">
                      {feature.title}
                    </Title>
                    <Text size="sm" c="dimmed">
                      {feature.description}
                    </Text>
                  </StyledFeatureCard>
                </Link>
              ))}
            </SimpleGrid>
          </div>

          <StyledDocsPaper p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              {t("index.quickStartTitle")}
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="xs">
                  {t("index.quickStartStep1Title")}
                </Text>
                <Text>
                  {t("index.quickStartStep1Desc1")}{" "}
                  <StyledLink href={getLocalizedLink("/editor")}>Editor</StyledLink>{" "}
                  {t("index.quickStartStep1Desc2")}
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("index.quickStartStep2Title")}
                </Text>
                <Text>{t("index.quickStartStep2Desc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("index.quickStartStep3Title")}
                </Text>
                <Text>{t("index.quickStartStep3Desc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("index.quickStartStep4Title")}
                </Text>
                <Text>{t("index.quickStartStep4Desc")}</Text>
              </div>
            </StyledContentBody>
          </StyledDocsPaper>

          <StyledDocsPaper p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              {t("index.sampleDataTitle")}
            </Title>
            <StyledContentBody>
              <Text>{t("index.sampleDataDesc")}</Text>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                <div>
                  <Text fw={600} mb="xs">
                    {t("index.sampleJsonLabel")}
                  </Text>
                  <CodeBlock code={sampleJson} />
                </div>
                <div>
                  <Text fw={600} mb="xs">
                    {t("index.sampleCsvLabel")}
                  </Text>
                  <CodeBlock code={sampleCsv} />
                </div>
              </SimpleGrid>
              <Text size="sm" c="dimmed">
                {t("index.sampleDataHint")}{" "}
                <StyledLink href={getLocalizedLink("/editor")}>Editor</StyledLink>.
              </Text>
            </StyledContentBody>
          </StyledDocsPaper>

          <StyledDocsPaper p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              {t("index.supportedFormatsTitle")}
            </Title>
            <StyledContentBody>
              <Text>{t("index.supportedFormatsDesc")}</Text>
              <SimpleGrid cols={{ base: 2, sm: 3 }} spacing="md">
                <Text>• JSON</Text>
                <Text>• YAML</Text>
                <Text>• CSV</Text>
                <Text>• XML</Text>
              </SimpleGrid>
              <Text size="sm" c="dimmed" mt="md">
                {t("index.supportedFormatsNote")}
              </Text>
            </StyledContentBody>
          </StyledDocsPaper>

          <StyledDocsPaper p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              {t("index.helpTitle")}
            </Title>
            <StyledContentBody>
              <Text>{t("index.helpDesc")}</Text>
              <Text>
                • {t("index.helpItem1")}{" "}
                <StyledLink href={getLocalizedLink("/docs/jsondraw")}>JsonDraw</StyledLink>.
              </Text>
              <Text>
                • {t("index.helpItem2")}{" "}
                <StyledLink href={getLocalizedLink("/editor")}>Editor</StyledLink>.
              </Text>
              <Text>• {t("index.helpItem3")}</Text>
            </StyledContentBody>
          </StyledDocsPaper>

          <StyledDocsPaper p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              {t("index.faqTitle")}
            </Title>
            <StyledContentBody>
              {faqs.map(faq => (
                <div key={faq.question}>
                  <Text fw={600} mb="xs">
                    {faq.question}
                  </Text>
                  <Text>{faq.answer}</Text>
                </div>
              ))}
            </StyledContentBody>
          </StyledDocsPaper>

          <StyledDocsPaper p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              {t("index.privacyTitle")}
            </Title>
            <StyledContentBody>
              <Text>{t("index.privacyDesc1")}</Text>
              <Text size="sm" c="dimmed">
                {t("index.privacyDesc2")}
              </Text>
            </StyledContentBody>
          </StyledDocsPaper>
        </Stack>
      </StyledDocsContainer>

      <ChatBot opened={chatOpened} onClose={() => setChatOpened(false)} />
    </Layout>
  );
};

export default Docs;
