import React from "react";
import Head from "next/head";
import { Container, Paper, Stack, Text, Title, Alert, SimpleGrid } from "@mantine/core";
import styled from "styled-components";
import { generateNextSeo } from "next-seo/pages";
import { VscInfo } from "react-icons/vsc";
import { DocsNavigation } from "../../components/DocsNavigation";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";
import { MONO_FONT_FAMILY } from "../../constants/globalStyle";
import { SEO } from "../../constants/seo";
import { useTranslation } from "../../i18n";
import Layout from "../../layout/PageLayout";

const StyledContentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  line-height: 1.7;
`;

const StyledLink = styled.a`
  color: #228be6;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledInlineCode = styled.code`
  background: #f8f9fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: ${MONO_FONT_FAMILY} !important;
  font-size: 0.9em;
  border: 1px solid #e9ecef;
`;

const VisualizationDocs = () => {
  const { t, locale } = useTranslation("docs");

  const getLocalizedLink = (path: string) => {
    return locale === "vi" ? `${path}?lang=vi` : path;
  };

  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: `${t("visualization.title")} Documentation - JSON Visualization`,
          description: t("visualization.subtitle"),
          canonical: `https://jsonviz.online/${locale === "vi" ? "vi/" : ""}docs/visualization`,
        })}
      </Head>
      <Container size="lg" py={60}>
        <Stack gap="xl">
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
          >
            <div>
              <Title order={1} c="dark" mb="sm">
                {t("visualization.title")}
              </Title>
              <Text size="lg" c="dimmed">
                {t("visualization.subtitle")}
              </Text>
            </div>
            <LanguageSwitcher />
          </div>

          <Alert
            icon={<VscInfo size={20} />}
            color="cyan"
            variant="light"
            styles={{ message: { color: "#1971c2" } }}
          >
            {t("visualization.alert")}
          </Alert>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("visualization.whatIsTitle")}
            </Title>
            <StyledContentBody>
              <Text>{t("visualization.whatIsDesc1")}</Text>
              <Text>{t("visualization.whatIsDesc2")}</Text>
              <Text>• {t("visualization.benefit1")}</Text>
              <Text>• {t("visualization.benefit2")}</Text>
              <Text>• {t("visualization.benefit3")}</Text>
              <Text>• {t("visualization.benefit4")}</Text>
              <Text>• {t("visualization.benefit5")}</Text>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("visualization.supportedFormatsTitle")}
            </Title>
            <StyledContentBody>
              <Text>{t("visualization.supportedFormatsDesc")}</Text>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="md">
                <div>
                  <Text fw={600} mb="xs">
                    JSON
                  </Text>
                  <Text size="sm" c="dimmed">
                    {t("visualization.formatJsonDesc")}
                  </Text>
                </div>
                <div>
                  <Text fw={600} mb="xs">
                    YAML
                  </Text>
                  <Text size="sm" c="dimmed">
                    {t("visualization.formatYamlDesc")}
                  </Text>
                </div>
                <div>
                  <Text fw={600} mb="xs">
                    CSV
                  </Text>
                  <Text size="sm" c="dimmed">
                    {t("visualization.formatCsvDesc")}
                  </Text>
                </div>
                <div>
                  <Text fw={600} mb="xs">
                    XML
                  </Text>
                  <Text size="sm" c="dimmed">
                    {t("visualization.formatXmlDesc")}
                  </Text>
                </div>
              </SimpleGrid>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("common.howToUse")}
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="xs">
                  {t("visualization.step1Title")}
                </Text>
                <Text>
                  {t("visualization.step1Desc")}{" "}
                  <StyledLink href="/editor">{t("common.editor")}</StyledLink>.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("visualization.step2Title")}
                </Text>
                <Text>{t("visualization.step2Desc")}</Text>
                <Text ml="md">• {t("visualization.step2Option1")}</Text>
                <Text ml="md">• {t("visualization.step2Option2")}</Text>
                <Text ml="md">• {t("visualization.step2Option3")}</Text>
                <Text ml="md">• {t("visualization.step2Option4")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("visualization.step3Title")}
                </Text>
                <Text>
                  {t("visualization.step3Desc")} <StyledInlineCode>Graph View</StyledInlineCode>{" "}
                  {t("visualization.step3And")} <StyledInlineCode>Tree View</StyledInlineCode>{" "}
                  {t("visualization.step3Using")}
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("visualization.step4Title")}
                </Text>
                <Text>• {t("visualization.step4Option1")}</Text>
                <Text>• {t("visualization.step4Option2")}</Text>
                <Text>• {t("visualization.step4Option3")}</Text>
                <Text>• {t("visualization.step4Option4")}</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("common.tipsAndBestPractices")}
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600}>• {t("visualization.tip1")}</Text>
                <Text>{t("visualization.tip1Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>• {t("visualization.tip2")}</Text>
                <Text>{t("visualization.tip2Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>• {t("visualization.tip3")}</Text>
                <Text>{t("visualization.tip3Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>• {t("visualization.tip4")}</Text>
                <Text>{t("visualization.tip4Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>• {t("visualization.tip5")}</Text>
                <Text>{t("visualization.tip5Desc")}</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <DocsNavigation
            title={t("common.relatedReading")}
            next={{
              label: t("common.next"),
              title: t("jsonDraw.title"),
              href: getLocalizedLink("/docs/jsondraw"),
            }}
          />

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              {t("common.needHelp")}
            </Title>
            <StyledContentBody>
              <Text>
                {t("common.needHelpText")}{" "}
                <StyledLink href="/docs">{t("common.documentation")}</StyledLink>{" "}
                {t("common.orTry")} <StyledLink href="/editor">{t("common.editor")}</StyledLink>{" "}
                {t("common.directly")}.
              </Text>
            </StyledContentBody>
          </Paper>
        </Stack>
      </Container>
    </Layout>
  );
};

export default VisualizationDocs;
