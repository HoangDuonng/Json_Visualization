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

const JsonDrawDocs = () => {
  const { t } = useTranslation("docs");

  return (
    <Layout>
      <Head>
        <title>JsonDraw - JSON Visualization Documentation</title>
        <meta
          name="description"
          content="Learn how to use JsonDraw to annotate and present your JSON data"
        />
      </Head>
      <Container size="md" py="xl">
        <Stack gap="xl">
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
          >
            <div>
              <Title order={1} c="dark" mb="sm">
                {t("jsonDraw.title")}
              </Title>
              <Text size="lg" c="dimmed">
                {t("jsonDraw.subtitle")}
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
            {t("jsonDraw.alert")}
          </Alert>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("jsonDraw.whatIsTitle")}
            </Title>
            <Text>{t("jsonDraw.whatIsDesc")}</Text>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("jsonDraw.howToTitle")}
            </Title>
            <Stack gap="md">
              <div>
                <Text fw={600} mb="xs">
                  {t("jsonDraw.step1Title")}
                </Text>
                <Text>{t("jsonDraw.step1Desc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("jsonDraw.step2Title")}
                </Text>
                <Text>{t("jsonDraw.step2Desc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("jsonDraw.step3Title")}
                </Text>
                <Text>{t("jsonDraw.step3Desc")}</Text>
              </div>
            </Stack>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("jsonDraw.sessionTitle")}
            </Title>
            <Stack gap="sm">
              <Text>• {t("jsonDraw.sessionDesc1")}</Text>
              <Text>• {t("jsonDraw.sessionDesc2")}</Text>
            </Stack>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("jsonDraw.tipsTitle")}
            </Title>
            <Stack gap="md">
              <div>
                <Text fw={600}>{t("jsonDraw.tip1")}</Text>
                <Text>{t("jsonDraw.tip1Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>{t("jsonDraw.tip2")}</Text>
                <Text>{t("jsonDraw.tip2Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>{t("jsonDraw.tip3")}</Text>
                <Text>{t("jsonDraw.tip3Desc")}</Text>
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

export default JsonDrawDocs;
