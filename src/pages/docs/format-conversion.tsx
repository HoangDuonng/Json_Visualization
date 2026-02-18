import React from "react";
import Head from "next/head";
import {
  Container,
  Paper,
  Stack,
  Text,
  Title,
  Table,
  Divider,
  Alert,
  SimpleGrid,
} from "@mantine/core";
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

const StyledInlineCode = styled.code`
  background: #f8f9fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: ${MONO_FONT_FAMILY} !important;
  font-size: 0.9em;
  border: 1px solid #e9ecef;
`;

const FormatConversionDocs = () => {
  const { t, locale } = useTranslation("docs");

  const getLocalizedLink = (path: string) => {
    return locale === "vi" ? `${path}?lang=vi` : path;
  };

  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: `${t("formatConversion.title")} Documentation - JSON Visualization`,
          description: t("formatConversion.subtitle"),
          canonical: `https://jsonviz.online/${locale === "vi" ? "vi/" : ""}docs/format-conversion`,
        })}
      </Head>
      <Container size="lg" py={60}>
        <Stack gap="xl">
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
          >
            <div>
              <Title order={1} c="dark" mb="sm">
                {t("formatConversion.title")}
              </Title>
              <Text size="lg" c="dimmed">
                {t("formatConversion.subtitle")}
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
            {t("formatConversion.alert")}
          </Alert>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("formatConversion.whatIsTitle")}
            </Title>
            <StyledContentBody>
              <Text>{t("formatConversion.whatIsDesc")}</Text>
              <Text>• {t("formatConversion.useCase1")}</Text>
              <Text>• {t("formatConversion.useCase2")}</Text>
              <Text>• {t("formatConversion.useCase3")}</Text>
              <Text>• {t("formatConversion.useCase4")}</Text>
              <Text>• {t("formatConversion.useCase5")}</Text>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("formatConversion.supportedTitle")}
            </Title>
            <StyledContentBody>
              <Text mb="md">{t("formatConversion.supportedDesc")}</Text>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                <div>
                  <Text fw={600} mb="xs">
                    {t("formatConversion.fromJson")}
                  </Text>
                  <Text size="sm">• {t("formatConversion.toYaml")}</Text>
                  <Text size="sm">• {t("formatConversion.toCsv")}</Text>
                  <Text size="sm">• {t("formatConversion.toXml")}</Text>
                </div>
                <div>
                  <Text fw={600} mb="xs">
                    {t("formatConversion.fromYaml")}
                  </Text>
                  <Text size="sm">• {t("formatConversion.yamlToJson")}</Text>
                  <Text size="sm">• {t("formatConversion.yamlToCsv")}</Text>
                  <Text size="sm">• {t("formatConversion.yamlToXml")}</Text>
                </div>
                <div>
                  <Text fw={600} mb="xs">
                    {t("formatConversion.fromCsv")}
                  </Text>
                  <Text size="sm">• {t("formatConversion.csvToJson")}</Text>
                  <Text size="sm">• {t("formatConversion.csvToYaml")}</Text>
                  <Text size="sm">• {t("formatConversion.csvToXml")}</Text>
                </div>
                <div>
                  <Text fw={600} mb="xs">
                    {t("formatConversion.fromXml")}
                  </Text>
                  <Text size="sm">• {t("formatConversion.xmlToJson")}</Text>
                  <Text size="sm">• {t("formatConversion.xmlToYaml")}</Text>
                  <Text size="sm">• {t("formatConversion.xmlToCsv")}</Text>
                </div>
              </SimpleGrid>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("formatConversion.howToConvertTitle")}
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="xs">
                  {t("formatConversion.method1Title")}
                </Text>
                <Text>
                  1. {t("formatConversion.method1Step1")}{" "}
                  <StyledLink href={getLocalizedLink("/editor")}>Editor</StyledLink>
                </Text>
                <Text>2. {t("formatConversion.method1Step2")}</Text>
                <Text>3. {t("formatConversion.method1Step3")}</Text>
                <Text>4. {t("formatConversion.method1Step4")}</Text>
                <Text>5. {t("formatConversion.method1Step5")}</Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  {t("formatConversion.method2Title")}
                </Text>
                <Text>
                  1. {t("formatConversion.method2Step1")}{" "}
                  <StyledLink href="/converter/json-to-yaml">JSON to YAML</StyledLink>)
                </Text>
                <Text>2. {t("formatConversion.method2Step2")}</Text>
                <Text>3. {t("formatConversion.method2Step3")}</Text>
                <Text>4. {t("formatConversion.method2Step4")}</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("formatConversion.conversionExamplesTitle")}
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="xs">
                  {t("formatConversion.example1Title")}
                </Text>
                <Text mb="xs">{t("formatConversion.inputLabel")}</Text>
                <CodeBlock
                  code={`{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "skills": ["JavaScript", "Python", "Go"]
}`}
                />
                <Text mb="xs" mt="md">
                  Output (YAML):
                </Text>
                <CodeBlock
                  code={`name: John Doe
age: 30
email: john@example.com
skills:
  - JavaScript
  - Python
  - Go`}
                />
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  {t("formatConversion.example2Title")}
                </Text>
                <Text mb="xs">{t("formatConversion.inputLabel")}</Text>
                <CodeBlock
                  code={`name,age,city
Alice,25,New York
Bob,30,San Francisco
Charlie,35,Seattle`}
                />
                <Text mb="xs" mt="md">
                  Output (JSON):
                </Text>
                <CodeBlock
                  code={`[
  {
    "name": "Alice",
    "age": "25",
    "city": "New York"
  },
  {
    "name": "Bob",
    "age": "30",
    "city": "San Francisco"
  },
  {
    "name": "Charlie",
    "age": "35",
    "city": "Seattle"
  }
]`}
                />
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 3: JSON to XML
                </Text>
                <Text mb="xs">{t("formatConversion.inputLabel")}</Text>
                <CodeBlock
                  code={`{
  "book": {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "year": 1925
  }
}`}
                />
                <Text mb="xs" mt="md">
                  Output (XML):
                </Text>
                <CodeBlock
                  code={`<?xml version="1.0" encoding="UTF-8"?>
<book>
  <title>The Great Gatsby</title>
  <author>F. Scott Fitzgerald</author>
  <year>1925</year>
</book>`}
                />
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 4: YAML to JSON
                </Text>
                <Text mb="xs">Input (YAML):</Text>
                <CodeBlock
                  code={`server:
  host: localhost
  port: 8080
  ssl: true
database:
  name: myapp
  user: admin`}
                />
                <Text mb="xs" mt="md">
                  Output (JSON):
                </Text>
                <CodeBlock
                  code={`{
  "server": {
    "host": "localhost",
    "port": 8080,
    "ssl": true
  },
  "database": {
    "name": "myapp",
    "user": "admin"
  }
}`}
                />
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("formatConversion.formatCharacteristicsTitle")}
            </Title>
            <StyledContentBody>
              <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>{t("formatConversion.tableFormat")}</Table.Th>
                    <Table.Th>{t("formatConversion.tableBestFor")}</Table.Th>
                    <Table.Th>{t("formatConversion.tableCharacteristics")}</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>JSON</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("formatConversion.jsonBestFor")}</Table.Td>
                    <Table.Td>{t("formatConversion.jsonChar")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>YAML</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("formatConversion.yamlBestFor")}</Table.Td>
                    <Table.Td>{t("formatConversion.yamlChar")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>CSV</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("formatConversion.csvBestFor")}</Table.Td>
                    <Table.Td>{t("formatConversion.csvChar")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>XML</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("formatConversion.xmlBestFor")}</Table.Td>
                    <Table.Td>{t("formatConversion.xmlChar")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>TOML</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("formatConversion.tomlBestFor")}</Table.Td>
                    <Table.Td>{t("formatConversion.tomlChar")}</Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("formatConversion.limitationsTitle")}
            </Title>
            <StyledContentBody>
              <Text>{t("formatConversion.limitationsDesc")}</Text>

              <div>
                <Text fw={600} mt="md" mb="xs">
                  {t("formatConversion.csvLimitationsTitle")}
                </Text>
                <Text>• {t("formatConversion.csvLimit1")}</Text>
                <Text>• {t("formatConversion.csvLimit2")}</Text>
                <Text>• {t("formatConversion.csvLimit3")}</Text>
              </div>

              <div>
                <Text fw={600} mt="md" mb="xs">
                  {t("formatConversion.xmlLimitationsTitle")}
                </Text>
                <Text>• {t("formatConversion.xmlLimit1")}</Text>
                <Text>• {t("formatConversion.xmlLimit2")}</Text>
                <Text>• {t("formatConversion.xmlLimit3")}</Text>
              </div>

              <div>
                <Text fw={600} mt="md" mb="xs">
                  {t("formatConversion.yamlLimitationsTitle")}
                </Text>
                <Text>• {t("formatConversion.yamlLimit1")}</Text>
                <Text>• {t("formatConversion.yamlLimit2")}</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("common.tipsAndBestPractices")}
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600}>• {t("formatConversion.tip1")}</Text>
                <Text>{t("formatConversion.tip1Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>• {t("formatConversion.tip2")}</Text>
                <Text>{t("formatConversion.tip2Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>• {t("formatConversion.tip3")}</Text>
                <Text>{t("formatConversion.tip3Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>• {t("formatConversion.tip4")}</Text>
                <Text>{t("formatConversion.tip4Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>• {t("formatConversion.tip5")}</Text>
                <Text>{t("formatConversion.tip5Desc")}</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <DocsNavigation
            title={t("common.relatedReading")}
            previous={{
              label: t("common.previous"),
              title: t("jsonDraw.title"),
              href: getLocalizedLink("/docs/jsondraw"),
            }}
            next={{
              label: t("common.next"),
              title: t("formatValidate.title"),
              href: getLocalizedLink("/docs/format-validate"),
            }}
          />

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              {t("common.needHelp")}
            </Title>
            <StyledContentBody>
              <Text>
                {t("common.needHelpText")}{" "}
                <StyledLink href={getLocalizedLink("/docs")}>
                  {t("common.documentation")}
                </StyledLink>{" "}
                {t("common.orTry")}{" "}
                <StyledLink href="/converter/json-to-yaml">
                  {t("formatConversion.converterTools")}
                </StyledLink>{" "}
                {t("common.directly")}.
              </Text>
            </StyledContentBody>
          </Paper>
        </Stack>
      </Container>
    </Layout>
  );
};

export default FormatConversionDocs;
