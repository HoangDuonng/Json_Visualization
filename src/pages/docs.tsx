import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Group, Paper, Stack, Text, Title, ThemeIcon, SimpleGrid } from "@mantine/core";
import styled from "styled-components";
import { generateNextSeo } from "next-seo/pages";
import { FaBolt, FaToolbox } from "react-icons/fa";
import { IoImages } from "react-icons/io5";
import { MdOutlineFormatIndentIncrease, MdOutlineGeneratingTokens } from "react-icons/md";
import { TbTransformFilled } from "react-icons/tb";
import { VscJson } from "react-icons/vsc";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { SEO } from "../constants/seo";
import { useTranslation } from "../i18n";
import Layout from "../layout/PageLayout";

const StyledContentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  line-height: 1.7;
`;

const StyledFeatureCard = styled(Paper)<any>`
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  background: white;
  color: black;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const StyledLink = styled.a`
  color: #228be6;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Docs = () => {
  const { t, locale } = useTranslation("docs");

  const getLocalizedLink = (path: string) => {
    return locale === "vi" ? `${path}?lang=vi` : path;
  };

  const features = [
    {
      title: t("index.visualizationTitle"),
      description: t("index.visualizationDesc"),
      icon: <FaBolt size={24} />,
      color: "#fab005",
      link: getLocalizedLink("/docs/visualization"),
    },
    {
      title: t("index.formatConversionTitle"),
      description: t("index.formatConversionDesc"),
      icon: <TbTransformFilled size={24} />,
      color: "#fd7e14",
      link: getLocalizedLink("/docs/format-conversion"),
    },
    {
      title: t("index.formatValidateTitle"),
      description: t("index.formatValidateDesc"),
      icon: <MdOutlineFormatIndentIncrease size={24} />,
      color: "#51cf66",
      link: getLocalizedLink("/docs/format-validate"),
    },
    {
      title: t("index.typeGenerationTitle"),
      description: t("index.typeGenerationDesc"),
      icon: <MdOutlineGeneratingTokens size={24} />,
      color: "#cc5de8",
      link: getLocalizedLink("/docs/type-generation"),
    },
    {
      title: t("index.jsonSchemaTitle"),
      description: t("index.jsonSchemaDesc"),
      icon: <VscJson size={24} />,
      color: "#22b8cf",
      link: getLocalizedLink("/docs/json-schema"),
    },
    {
      title: t("index.jqQueryTitle"),
      description: t("index.jqQueryDesc"),
      icon: <FaToolbox size={24} />,
      color: "#20c997",
      link: getLocalizedLink("/docs/jq-query"),
    },
    {
      title: t("index.jsonPathTitle"),
      description: t("index.jsonPathDesc"),
      icon: <FaToolbox size={24} />,
      color: "#15aabf",
      link: getLocalizedLink("/docs/json-path"),
    },
    {
      title: t("index.exportImageTitle"),
      description: t("index.exportImageDesc"),
      icon: <IoImages size={24} />,
      color: "#339af0",
      link: getLocalizedLink("/docs/export-image"),
    },
  ];

  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: "Documentation - JSON Visualization",
          description: "Learn about JSON Visualization features and how to use them.",
          canonical: "https://jsonvisualization.nguuyen.io.vn/docs",
        })}
      </Head>
      <Container size="xl" py={60}>
        <Stack gap="xl">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Title order={1} c="dark">
              {t("index.title")}
            </Title>
            <LanguageSwitcher />
          </div>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("index.welcomeTitle")}
            </Title>
            <StyledContentBody>
              <Text size="lg">{t("index.welcomeDesc1")}</Text>
              <Text>
                {t("index.welcomeDesc2")} <StyledLink href="/editor">Editor</StyledLink>.
              </Text>
            </StyledContentBody>
          </Paper>

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

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              {t("index.quickStartTitle")}
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="xs">
                  {t("index.quickStartStep1Title")}
                </Text>
                <Text>
                  {t("index.quickStartStep1Desc1")} <StyledLink href="/editor">Editor</StyledLink>{" "}
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
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
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
                <Text>• TOML</Text>
              </SimpleGrid>
              <Text size="sm" c="dimmed" mt="md">
                {t("index.supportedFormatsNote")}
              </Text>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              {t("index.privacyTitle")}
            </Title>
            <StyledContentBody>
              <Text>{t("index.privacyDesc1")}</Text>
              <Text size="sm" c="dimmed">
                {t("index.privacyDesc2")}
              </Text>
            </StyledContentBody>
          </Paper>
        </Stack>
      </Container>
    </Layout>
  );
};

export default Docs;
