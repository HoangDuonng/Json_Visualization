import React from "react";
import Head from "next/head";
import { Container, Stack, Title, Text, Paper, Alert } from "@mantine/core";
import styled from "styled-components";
import { MdInfoOutline } from "react-icons/md";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";
import { useTranslation } from "../../i18n";
import Layout from "../../layout/PageLayout";

const StyledLink = styled.a`
  color: #228be6;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const ExportImageDocs = () => {
  const { t } = useTranslation("docs");

  return (
    <Layout>
      <Head>
        <title>Export Image - JSON Visualization Documentation</title>
        <meta
          name="description"
          content="Learn how to export your JSON visualizations as PNG, JPEG, or SVG images"
        />
      </Head>
      <Container size="md" py="xl">
        <Stack gap="xl">
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
          >
            <div>
              <Title order={1} c="dark" mb="sm">
                {t("exportImage.title")}
              </Title>
              <Text size="lg" c="dimmed">
                {t("exportImage.subtitle")}
              </Text>
            </div>
            <LanguageSwitcher />
          </div>

          <Alert
            icon={<MdInfoOutline size={20} />}
            color="cyan"
            variant="light"
            styles={{ message: { color: "#1971c2" } }}
          >
            {t("exportImage.alert")}
          </Alert>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("exportImage.whatIsTitle")}
            </Title>
            <Text>{t("exportImage.whatIsDesc")}</Text>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("exportImage.supportedFormatsTitle")}
            </Title>
            <Stack gap="md">
              <div>
                <Text fw={600} mb="xs">
                  {t("exportImage.pngTitle")}
                </Text>
                <Text>{t("exportImage.pngDesc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("exportImage.jpegTitle")}
                </Text>
                <Text>{t("exportImage.jpegDesc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("exportImage.svgTitle")}
                </Text>
                <Text>{t("exportImage.svgDesc")}</Text>
              </div>
            </Stack>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("exportImage.howToExportTitle")}
            </Title>
            <Stack gap="md">
              <div>
                <Text fw={600} mb="xs">
                  {t("exportImage.step1")}
                </Text>
                <Text>{t("exportImage.step1Desc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("exportImage.step2")}
                </Text>
                <Text>{t("exportImage.step2Desc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("exportImage.step3")}
                </Text>
                <Text>{t("exportImage.step3Desc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("exportImage.step4")}
                </Text>
                <Text>{t("exportImage.step4Desc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("exportImage.step5")}
                </Text>
                <Text>{t("exportImage.step5Desc")}</Text>
              </div>
            </Stack>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("exportImage.tipsTitle")}
            </Title>
            <Stack gap="md">
              <div>
                <Text fw={600}>{t("exportImage.tip1")}</Text>
                <Text>{t("exportImage.tip1Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>{t("exportImage.tip2")}</Text>
                <Text>{t("exportImage.tip2Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>{t("exportImage.tip3")}</Text>
                <Text>{t("exportImage.tip3Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>{t("exportImage.tip4")}</Text>
                <Text>{t("exportImage.tip4Desc")}</Text>
              </div>
            </Stack>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("exportImage.useCasesTitle")}
            </Title>
            <Stack gap="md">
              <div>
                <Text fw={600} mb="xs">
                  {t("exportImage.useCase1Title")}
                </Text>
                <Text>{t("exportImage.useCase1Desc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("exportImage.useCase2Title")}
                </Text>
                <Text>{t("exportImage.useCase2Desc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("exportImage.useCase3Title")}
                </Text>
                <Text>{t("exportImage.useCase3Desc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("exportImage.useCase4Title")}
                </Text>
                <Text>{t("exportImage.useCase4Desc")}</Text>
              </div>
            </Stack>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              {t("common.needHelp")}
            </Title>
            <Text>
              {t("common.needHelpText")}{" "}
              <StyledLink href="/docs">{t("common.documentation")}</StyledLink> {t("common.orTry")}{" "}
              <StyledLink href="/editor">{t("common.editor")}</StyledLink> {t("common.directly")}.
            </Text>
          </Paper>
        </Stack>
      </Container>
    </Layout>
  );
};

export default ExportImageDocs;
