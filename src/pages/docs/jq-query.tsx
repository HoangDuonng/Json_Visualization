import React from "react";
import Head from "next/head";
import { Container, Paper, Stack, Text, Title, Code, Table, Divider, Alert } from "@mantine/core";
import styled from "styled-components";
import { generateNextSeo } from "next-seo/pages";
import { VscInfo } from "react-icons/vsc";
import { CodeBlock } from "../../components/CodeBlock";
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

const StyledCode = styled(Code)`
  font-family: ${MONO_FONT_FAMILY} !important;
  background: #f8f9fa;
  padding: 12px 16px;
  border-radius: 6px;
  display: block;
  border: 1px solid #e9ecef;
  font-size: 14px;
  margin: 8px 0;

  * {
    font-family: ${MONO_FONT_FAMILY} !important;
  }
`;

const JQQueryDocs = () => {
  const { t, locale } = useTranslation("docs");

  const getLocalizedLink = (path: string) => {
    return locale === "vi" ? `${path}?lang=vi` : path;
  };

  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: `${t("jqQuery.title")} Documentation - JSON Visualization`,
          description: t("jqQuery.subtitle"),
          canonical: `https://jsonviz.online/${locale === "vi" ? "vi/" : ""}docs/jq-query`,
        })}
      </Head>
      <Container size="lg" py={60}>
        <Stack gap="xl">
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
          >
            <div>
              <Title order={1} c="dark" mb="sm">
                {t("jqQuery.title")}
              </Title>
              <Text size="lg" c="dimmed">
                {t("jqQuery.subtitle")}
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
            {t("jqQuery.alert")}
          </Alert>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("jqQuery.whatIsTitle")}
            </Title>
            <StyledContentBody>
              <Text>{t("jqQuery.whatIsDesc1")}</Text>
              <Text>{t("jqQuery.whatIsDesc2")}</Text>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("jqQuery.howToUseTitle")}
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="xs">
                  {t("jqQuery.step1Title")}
                </Text>
                <Text>
                  {t("jqQuery.step1Desc")}{" "}
                  <StyledLink href="/editor">{t("common.editor")}</StyledLink>.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("jqQuery.step2Title")}
                </Text>
                <Text>{t("jqQuery.step2Desc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("jqQuery.step3Title")}
                </Text>
                <Text>{t("jqQuery.step3Desc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("jqQuery.step4Title")}
                </Text>
                <Text>{t("jqQuery.step4Desc")}</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("jqQuery.basicSyntaxTitle")}
            </Title>
            <StyledContentBody>
              <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>{t("jqQuery.tableQuery")}</Table.Th>
                    <Table.Th>{t("jqQuery.tableDescription")}</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>
                      <StyledCode>.</StyledCode>
                    </Table.Td>
                    <Table.Td>{t("jqQuery.syntaxIdentity")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledCode>.field</StyledCode>
                    </Table.Td>
                    <Table.Td>{t("jqQuery.syntaxField")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledCode>.field1.field2</StyledCode>
                    </Table.Td>
                    <Table.Td>{t("jqQuery.syntaxNested")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledCode>.[]</StyledCode>
                    </Table.Td>
                    <Table.Td>{t("jqQuery.syntaxIterate")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledCode>.[0]</StyledCode>
                    </Table.Td>
                    <Table.Td>{t("jqQuery.syntaxIndex")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledCode>.field[]</StyledCode>
                    </Table.Td>
                    <Table.Td>{t("jqQuery.syntaxFieldArray")}</Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("jqQuery.examplesTitle")}
            </Title>
            <StyledContentBody>
              <Text fw={600}>{t("jqQuery.sampleData")}</Text>
              <CodeBlock
                code={`{
  "fruits": [
    {
      "name": "Apple",
      "color": "#FF0000",
      "details": {
        "type": "Pome",
        "season": "Fall"
      },
      "nutrients": {
        "calories": 52,
        "fiber": "2.4g",
        "vitaminC": "4.6mg"
      }
    },
    {
      "name": "Banana",
      "color": "#FFFF00",
      "details": {
        "type": "Berry",
        "season": "Year-round"
      },
      "nutrients": {
        "calories": 89,
        "fiber": "2.6g",
        "potassium": "358mg"
      }
    },
    {
      "name": "Orange",
      "color": "#FFA500",
      "details": {
        "type": "Citrus",
        "season": "Winter"
      },
      "nutrients": {
        "calories": 47,
        "fiber": "2.4g",
        "vitaminC": "53.2mg"
      }
    }
  ]
}`}
              />

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  {t("jqQuery.example1Title")}
                </Text>
                <Text mb="xs">{t("jqQuery.queryLabel")}</Text>
                <StyledCode>.fruits[].name</StyledCode>
                <Text mb="xs">{t("jqQuery.resultLabel")}</Text>
                <StyledCode>{'["Apple", "Banana", "Orange"]'}</StyledCode>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  {t("jqQuery.example2Title")}
                </Text>
                <Text mb="xs">{t("jqQuery.queryLabel")}</Text>
                <StyledCode>.fruits[].color</StyledCode>
                <Text mb="xs">{t("jqQuery.resultLabel")}</Text>
                <StyledCode>{'["#FF0000", "#FFFF00", "#FFA500"]'}</StyledCode>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  {t("jqQuery.example3Title")}
                </Text>
                <Text mb="xs">{t("jqQuery.queryLabel")}</Text>
                <StyledCode>.fruits[].nutrients.calories</StyledCode>
                <Text mb="xs">{t("jqQuery.resultLabel")}</Text>
                <StyledCode>[52, 89, 47]</StyledCode>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  {t("jqQuery.example4Title")}
                </Text>
                <Text mb="xs">{t("jqQuery.queryLabel")}</Text>
                <StyledCode>{'.fruits[] | select(.details.type == "Citrus")'}</StyledCode>
                <Text mb="xs">{t("jqQuery.resultLabel")}</Text>
                <CodeBlock
                  code={`{
  "name": "Orange",
  "color": "#FFA500",
  "details": {
    "type": "Citrus",
    "season": "Winter"
  },
  "nutrients": {
    "calories": 47,
    "fiber": "2.4g",
    "vitaminC": "53.2mg"
  }
}`}
                />
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  {t("jqQuery.example5Title")}
                </Text>
                <Text mb="xs">{t("jqQuery.queryLabel")}</Text>
                <StyledCode>.fruits[] | select(.nutrients.calories &lt; 50)</StyledCode>
                <Text mb="xs">{t("jqQuery.resultLabel")}</Text>
                <CodeBlock
                  code={`[
  {
    "name": "Apple",
    "color": "#FF0000",
    ...
  },
  {
    "name": "Orange",
    "color": "#FFA500",
    ...
  }
]`}
                />
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  {t("jqQuery.example6Title")}
                </Text>
                <Text mb="xs">{t("jqQuery.queryLabel")}</Text>
                <StyledCode>
                  {".fruits[] | {name: .name, calories: .nutrients.calories}"}
                </StyledCode>
                <Text mb="xs">{t("jqQuery.resultLabel")}</Text>
                <CodeBlock
                  code={`[
  {"name": "Apple", "calories": 52},
  {"name": "Banana", "calories": 89},
  {"name": "Orange", "calories": 47}
]`}
                />
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  {t("jqQuery.example7Title")}
                </Text>
                <Text mb="xs">{t("jqQuery.queryLabel")}</Text>
                <StyledCode>{'.fruits[] | select(.details.season == "Winter")'}</StyledCode>
                <Text mb="xs">{t("jqQuery.resultLabel")}</Text>
                <CodeBlock
                  code={`{
  "name": "Orange",
  "color": "#FFA500",
  "details": {
    "type": "Citrus",
    "season": "Winter"
  },
  ...
}`}
                />
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("jqQuery.commonOpsTitle")}
            </Title>
            <StyledContentBody>
              <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>{t("jqQuery.tableOperation")}</Table.Th>
                    <Table.Th>{t("jqQuery.tableSyntax")}</Table.Th>
                    <Table.Th>{t("jqQuery.tableExample")}</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>{t("jqQuery.opFilter")}</Table.Td>
                    <Table.Td>
                      <StyledCode>select(condition)</StyledCode>
                    </Table.Td>
                    <Table.Td>
                      <StyledCode>select(.age &gt; 18)</StyledCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>{t("jqQuery.opMap")}</Table.Td>
                    <Table.Td>
                      <StyledCode>map(expression)</StyledCode>
                    </Table.Td>
                    <Table.Td>
                      <StyledCode>map(.name)</StyledCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>{t("jqQuery.opPipe")}</Table.Td>
                    <Table.Td>
                      <StyledCode>|</StyledCode>
                    </Table.Td>
                    <Table.Td>
                      <StyledCode>.users[] | .name</StyledCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>{t("jqQuery.opObject")}</Table.Td>
                    <Table.Td>
                      <StyledCode>{"{key: value}"}</StyledCode>
                    </Table.Td>
                    <Table.Td>
                      <StyledCode>{"{name: .name, age: .age}"}</StyledCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>{t("jqQuery.opArray")}</Table.Td>
                    <Table.Td>
                      <StyledCode>[expression]</StyledCode>
                    </Table.Td>
                    <Table.Td>
                      <StyledCode>[.users[].name]</StyledCode>
                    </Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("jqQuery.tipsTitle")}
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600}>{t("jqQuery.tip1Title")}</Text>
                <Text>{t("jqQuery.tip1Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>{t("jqQuery.tip2Title")}</Text>
                <Text>{t("jqQuery.tip2Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>{t("jqQuery.tip3Title")}</Text>
                <Text>{t("jqQuery.tip3Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>{t("jqQuery.tip4Title")}</Text>
                <Text>{t("jqQuery.tip4Desc")}</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("jqQuery.limitationsTitle")}
            </Title>
            <StyledContentBody>
              <Text>{t("jqQuery.limitationsDesc")}</Text>
              <Text>{t("jqQuery.limitation1")}</Text>
              <Text>{t("jqQuery.limitation2")}</Text>
              <Text>{t("jqQuery.limitation3")}</Text>
              <Text>{t("jqQuery.limitation4")}</Text>
              <Text mt="md">
                {t("jqQuery.limitationsFooter")}{" "}
                <StyledLink href="https://jqlang.org/" target="_blank" rel="noopener noreferrer">
                  {t("jqQuery.jqTool")}
                </StyledLink>
                .
              </Text>
            </StyledContentBody>
          </Paper>

          <DocsNavigation
            title={t("common.relatedReading")}
            previous={{
              label: t("common.previous"),
              title: t("jsonSchema.title"),
              href: getLocalizedLink("/docs/json-schema"),
            }}
            next={{
              label: t("common.next"),
              title: t("jsonPath.title"),
              href: getLocalizedLink("/docs/json-path"),
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

export default JQQueryDocs;
