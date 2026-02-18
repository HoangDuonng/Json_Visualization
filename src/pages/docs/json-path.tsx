import React from "react";
import Head from "next/head";
import { Container, Paper, Stack, Text, Title, Table, Divider, Alert, Code } from "@mantine/core";
import styled from "styled-components";
import { generateNextSeo } from "next-seo/pages";
import { VscInfo } from "react-icons/vsc";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsNavigation } from "../../components/DocsNavigation";
import { DocsToc } from "../../components/DocsToc";
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

const JsonPathDocs = () => {
  const { t, locale } = useTranslation("docs");

  const getLocalizedLink = (path: string) => {
    return locale === "vi" ? `${path}?lang=vi` : path;
  };

  const tocItems = [
    { id: "what-is", label: t("jsonPath.whatIsJsonPath.title") },
    { id: "how-to-use", label: t("jsonPath.howToUse.title") },
    { id: "basic-syntax", label: t("jsonPath.basicSyntax.title") },
    { id: "practical-examples", label: t("jsonPath.practicalExamples.title") },
    { id: "filter-expressions", label: t("jsonPath.filterExpressions.title") },
    { id: "tips", label: t("jsonPath.tipsBestPractices.title") },
    { id: "common-use-cases", label: t("jsonPath.commonUseCases.title") },
  ];

  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: `${t("jsonPath.title")} Documentation - JSON Visualization`,
          description: t("jsonPath.subtitle"),
          canonical: `https://jsonviz.online/${locale === "vi" ? "vi/" : ""}docs/json-path`,
        })}
      </Head>
      <Container size="lg" py={60}>
        <Stack gap="xl">
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
          >
            <div>
              <Title order={1} c="dark" mb="sm">
                {t("jsonPath.title")}
              </Title>
              <Text size="lg" c="dimmed">
                {t("jsonPath.subtitle")}
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
            {t("jsonPath.alert")}
          </Alert>

          <DocsToc title={t("common.onThisPage")} items={tocItems} />

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title id="what-is" mb="md" order={2} c="dark">
              {t("jsonPath.whatIsJsonPath.title")}
            </Title>
            <StyledContentBody>
              <Text>{t("jsonPath.whatIsJsonPath.description1")}</Text>
              <Text>
                {t("jsonPath.whatIsJsonPath.description2a")} <StyledInlineCode>$</StyledInlineCode>{" "}
                {t("jsonPath.whatIsJsonPath.description2b")}
              </Text>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title id="how-to-use" mb="md" order={2} c="dark">
              {t("jsonPath.howToUse.title")}
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="xs">
                  {t("jsonPath.howToUse.step1.title")}
                </Text>
                <Text>
                  {t("jsonPath.howToUse.step1.description")}{" "}
                  <StyledLink href={getLocalizedLink("/editor")}>
                    JSON Visualization Editor
                  </StyledLink>
                  .
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("jsonPath.howToUse.step2.title")}
                </Text>
                <Text>{t("jsonPath.howToUse.step2.description")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("jsonPath.howToUse.step3.title")}
                </Text>
                <Text>{t("jsonPath.howToUse.step3.description")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("jsonPath.howToUse.step4.title")}
                </Text>
                <Text>{t("jsonPath.howToUse.step4.description")}</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title id="basic-syntax" mb="md" order={2} c="dark">
              {t("jsonPath.basicSyntax.title")}
            </Title>
            <StyledContentBody>
              <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>{t("jsonPath.basicSyntax.operatorHeader")}</Table.Th>
                    <Table.Th>{t("jsonPath.basicSyntax.descriptionHeader")}</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>$</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonPath.basicSyntax.operators.root")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>@</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonPath.basicSyntax.operators.current")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>.</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonPath.basicSyntax.operators.child")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>..</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonPath.basicSyntax.operators.recursive")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>*</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonPath.basicSyntax.operators.wildcard")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>[]</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonPath.basicSyntax.operators.subscript")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>[,]</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonPath.basicSyntax.operators.union")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>[start:end]</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonPath.basicSyntax.operators.slice")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>[?()]</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonPath.basicSyntax.operators.filter")}</Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title id="practical-examples" mb="md" order={2} c="dark">
              {t("jsonPath.practicalExamples.title")}
            </Title>
            <StyledContentBody>
              <Text fw={600}>{t("jsonPath.practicalExamples.sampleData")}</Text>
              <CodeBlock
                code={`{
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      },
      {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
}`}
              />

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 1: Get all books
                </Text>
                <Text mb="xs">{t("jsonPath.practicalExamples.pathLabel")}</Text>
                <StyledCode>$.store.book[*]</StyledCode>
                <Text c="dimmed" size="sm">
                  {t("jsonPath.practicalExamples.example1.description")}
                </Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 2: Get all book authors
                </Text>
                <Text mb="xs">{t("jsonPath.practicalExamples.pathLabel")}</Text>
                <StyledCode>$.store.book[*].author</StyledCode>
                <Text mb="xs">{t("jsonPath.practicalExamples.resultLabel")}</Text>
                <StyledCode>{'["Nigel Rees", "Evelyn Waugh", "Herman Melville"]'}</StyledCode>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  {t("jsonPath.practicalExamples.example3.title")}
                </Text>
                <Text mb="xs">{t("jsonPath.practicalExamples.pathLabel")}</Text>
                <StyledCode>$.store..price</StyledCode>
                <Text mb="xs">{t("jsonPath.practicalExamples.resultLabel")}</Text>
                <StyledCode>{"[8.95, 12.99, 8.99, 19.95]"}</StyledCode>
                <Text c="dimmed" size="sm">
                  The <StyledInlineCode>..</StyledInlineCode> operator searches recursively
                </Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  {t("jsonPath.practicalExamples.example4.title")}
                </Text>
                <Text mb="xs">{t("jsonPath.practicalExamples.pathLabel")}</Text>
                <StyledCode>$.store.book[0]</StyledCode>
                <Text mb="xs">{t("jsonPath.practicalExamples.resultLabel")}</Text>
                <CodeBlock
                  code={`{
  "category": "reference",
  "author": "Nigel Rees",
  "title": "Sayings of the Century",
  "price": 8.95
}`}
                />
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  {t("jsonPath.practicalExamples.example5.title")}
                </Text>
                <Text mb="xs">{t("jsonPath.practicalExamples.pathLabel")}</Text>
                <StyledCode>$.store.book[-1]</StyledCode>
                <Text c="dimmed" size="sm">
                  {t("jsonPath.practicalExamples.example5.description")}
                </Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  {t("jsonPath.practicalExamples.example6.title")}
                </Text>
                <Text mb="xs">{t("jsonPath.practicalExamples.pathLabel")}</Text>
                <StyledCode>$.store.book[0:2]</StyledCode>
                <Text c="dimmed" size="sm">
                  {t("jsonPath.practicalExamples.example6.description")}
                </Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  {t("jsonPath.practicalExamples.example7.title")}
                </Text>
                <Text mb="xs">{t("jsonPath.practicalExamples.pathLabel")}</Text>
                <StyledCode>$.store.book[?(@.price &lt; 10)]</StyledCode>
                <Text c="dimmed" size="sm">
                  {t("jsonPath.practicalExamples.example7.description")}
                </Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  {t("jsonPath.practicalExamples.example8.title")}
                </Text>
                <Text mb="xs">{t("jsonPath.practicalExamples.pathLabel")}</Text>
                <StyledCode>$.store.book[?(@.isbn)]</StyledCode>
                <Text c="dimmed" size="sm">
                  {t("jsonPath.practicalExamples.example8.description")}
                </Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  {t("jsonPath.practicalExamples.example9.title")}
                </Text>
                <Text mb="xs">{t("jsonPath.practicalExamples.pathLabel")}</Text>
                <StyledCode>$.store.book[0,2]</StyledCode>
                <Text c="dimmed" size="sm">
                  {t("jsonPath.practicalExamples.example9.description")}
                </Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title id="filter-expressions" mb="md" order={2} c="dark">
              {t("jsonPath.filterExpressions.title")}
            </Title>
            <StyledContentBody>
              <Text mb="md">
                {t("jsonPath.filterExpressions.description1")}{" "}
                <StyledInlineCode>[?()]</StyledInlineCode>{" "}
                {t("jsonPath.filterExpressions.description2")}{" "}
                <StyledInlineCode>@</StyledInlineCode>{" "}
                {t("jsonPath.filterExpressions.description3")}
              </Text>
              <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>{t("jsonPath.basicSyntax.operatorHeader")}</Table.Th>
                    <Table.Th>{t("jsonPath.basicSyntax.descriptionHeader")}</Table.Th>
                    <Table.Th>{t("jsonPath.filterExpressions.exampleHeader")}</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>==</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>
                      {t("jsonPath.filterExpressions.operators.equal.description")}
                    </Table.Td>
                    <Table.Td>
                      <StyledInlineCode>[?(@.price == 8.95)]</StyledInlineCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>!=</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>
                      {t("jsonPath.filterExpressions.operators.notEqual.description")}
                    </Table.Td>
                    <Table.Td>
                      <StyledInlineCode>[?(@.category != &quot;fiction&quot;)]</StyledInlineCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>&lt;</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>
                      {t("jsonPath.filterExpressions.operators.lessThan.description")}
                    </Table.Td>
                    <Table.Td>
                      <StyledInlineCode>[?(@.price &lt; 10)]</StyledInlineCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>&lt;=</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>
                      {t("jsonPath.filterExpressions.operators.lessEqual.description")}
                    </Table.Td>
                    <Table.Td>
                      <StyledInlineCode>[?(@.price &lt;= 10)]</StyledInlineCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>&gt;</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>
                      {t("jsonPath.filterExpressions.operators.greaterThan.description")}
                    </Table.Td>
                    <Table.Td>
                      <StyledInlineCode>[?(@.price &gt; 10)]</StyledInlineCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>&gt;=</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>
                      {t("jsonPath.filterExpressions.operators.greaterEqual.description")}
                    </Table.Td>
                    <Table.Td>
                      <StyledInlineCode>[?(@.price &gt;= 10)]</StyledInlineCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>&amp;&amp;</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonPath.filterExpressions.operators.and.description")}</Table.Td>
                    <Table.Td>
                      <StyledInlineCode>
                        [?(@.price &lt; 10 &amp;&amp; @.category == &quot;fiction&quot;)]
                      </StyledInlineCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>||</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonPath.filterExpressions.operators.or.description")}</Table.Td>
                    <Table.Td>
                      <StyledInlineCode>
                        [?(@.category == &quot;fiction&quot; || @.category ==
                        &quot;reference&quot;)]
                      </StyledInlineCode>
                    </Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title id="tips" mb="md" order={2} c="dark">
              {t("jsonPath.tipsBestPractices.title")}
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600}>{t("jsonPath.tipsBestPractices.tip1.title")}</Text>
                <Text>
                  {t("jsonPath.tipsBestPractices.tip1.description1")}{" "}
                  <StyledInlineCode>$</StyledInlineCode>{" "}
                  {t("jsonPath.tipsBestPractices.tip1.description2")}
                </Text>
              </div>
              <div>
                <Text fw={600}>{t("jsonPath.tipsBestPractices.tip2.title")}</Text>
                <Text>
                  <StyledInlineCode>$.store.book</StyledInlineCode>{" "}
                  {t("jsonPath.tipsBestPractices.tip2.description1")}{" "}
                  <StyledInlineCode>$[&apos;store&apos;][&apos;book&apos;]</StyledInlineCode>
                </Text>
              </div>
              <div>
                <Text fw={600}>{t("jsonPath.tipsBestPractices.tip3.title")}</Text>
                <Text>
                  {t("jsonPath.tipsBestPractices.tip3.description1")}{" "}
                  <StyledInlineCode>$[&apos;property name&apos;]</StyledInlineCode>
                </Text>
              </div>
              <div>
                <Text fw={600}>{t("jsonPath.tipsBestPractices.tip4.title")}</Text>
                <Text>
                  {t("jsonPath.tipsBestPractices.tip4.description1")}{" "}
                  <StyledInlineCode>$.store</StyledInlineCode>
                  {t("jsonPath.tipsBestPractices.tip4.description2")}{" "}
                  <StyledInlineCode>.book</StyledInlineCode>
                  {t("jsonPath.tipsBestPractices.tip4.description3")}
                </Text>
              </div>
              <div>
                <Text fw={600}>{t("jsonPath.tipsBestPractices.tip5.title")}</Text>
                <Text>{t("jsonPath.tipsBestPractices.tip5.description")}</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title id="common-use-cases" mb="md" order={2} c="dark">
              {t("jsonPath.commonUseCases.title")}
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="xs">
                  {t("jsonPath.commonUseCases.useCase1.title")}
                </Text>
                <StyledCode>$..fieldName</StyledCode>
                <Text c="dimmed" size="sm">
                  {t("jsonPath.commonUseCases.useCase1.description")}
                </Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  {t("jsonPath.commonUseCases.useCase2.title")}
                </Text>
                <StyledCode>$.arrayName[*]</StyledCode>
                <Text c="dimmed" size="sm">
                  {t("jsonPath.commonUseCases.useCase2.description")}
                </Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  {t("jsonPath.commonUseCases.useCase3.title")}
                </Text>
                <StyledCode>$.items[?(@.price &lt; 100 &amp;&amp; @.inStock == true)]</StyledCode>
                <Text c="dimmed" size="sm">
                  {t("jsonPath.commonUseCases.useCase3.description")}
                </Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  {t("jsonPath.commonUseCases.useCase4.title")}
                </Text>
                <StyledCode>$.users[*].address.city</StyledCode>
                <Text c="dimmed" size="sm">
                  {t("jsonPath.commonUseCases.useCase4.description")}
                </Text>
              </div>
            </StyledContentBody>
          </Paper>

          <DocsNavigation
            title={t("common.relatedReading")}
            previous={{
              label: t("common.previous"),
              title: t("jqQuery.title"),
              href: getLocalizedLink("/docs/jq-query"),
            }}
            next={{
              label: t("common.next"),
              title: t("exportImage.title"),
              href: getLocalizedLink("/docs/export-image"),
            }}
          />

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              {t("jsonPath.needHelp.title")}
            </Title>
            <StyledContentBody>
              <Text>
                {t("jsonPath.needHelp.description1")}{" "}
                <StyledLink href={getLocalizedLink("/docs")}>Documentation</StyledLink>{" "}
                {t("jsonPath.needHelp.description2")}{" "}
                <StyledLink href={getLocalizedLink("/editor")}>Editor</StyledLink>{" "}
                {t("jsonPath.needHelp.description3")}
              </Text>
            </StyledContentBody>
          </Paper>
        </Stack>
      </Container>
    </Layout>
  );
};

export default JsonPathDocs;
