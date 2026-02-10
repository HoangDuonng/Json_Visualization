import React from "react";
import Head from "next/head";
import { Container, Paper, Stack, Text, Title, Table, Divider, Alert } from "@mantine/core";
import styled from "styled-components";
import { generateNextSeo } from "next-seo/pages";
import { VscInfo } from "react-icons/vsc";
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

const StyledCodeBlock = styled.pre`
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: ${MONO_FONT_FAMILY} !important;
  font-size: 14px;
  border: 1px solid #e9ecef;

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
  const { t } = useTranslation("docs");

  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: `${t("jsonPath.title")} Documentation - JSON Visualization`,
          description: t("jsonPath.subtitle"),
          canonical: "https://jsonvisualization.nguuyen.io.vn/docs/json-path",
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

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              What is JSONPath?
            </Title>
            <StyledContentBody>
              <Text>
                JSONPath is a query language for JSON, similar to XPath for XML. It allows you to
                select and extract data from JSON documents using path expressions.
              </Text>
              <Text>
                The root element is always referred to as <StyledInlineCode>$</StyledInlineCode>{" "}
                regardless of whether it&apos;s an object or array. From there, you can navigate
                through the structure using dot notation or bracket notation.
              </Text>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              How to Use
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="xs">
                  1. Open the Editor
                </Text>
                <Text>
                  Load your JSON data in the{" "}
                  <StyledLink href="/editor">JSON Visualization Editor</StyledLink>.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  2. Open JSON Path Tool
                </Text>
                <Text>
                  Click on &quot;Tools&quot; in the toolbar and select &quot;JSON Path&quot;.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  3. Enter Your Path Expression
                </Text>
                <Text>
                  Type your JSONPath expression in the input field and click &quot;Run&quot;.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  4. View Results
                </Text>
                <Text>The extracted data will be displayed in the editor.</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              Basic Syntax
            </Title>
            <StyledContentBody>
              <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Operator</Table.Th>
                    <Table.Th>Description</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>$</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Root element</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>@</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Current element (used in filters)</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>.</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Child operator (dot notation)</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>..</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Recursive descent (search all levels)</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>*</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Wildcard (all elements)</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>[]</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Subscript operator (array index or object property)</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>[,]</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Union operator (multiple indices or properties)</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>[start:end]</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Array slice operator</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>[?()]</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Filter expression</Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              Practical Examples
            </Title>
            <StyledContentBody>
              <Text fw={600}>Sample JSON Data:</Text>
              <StyledCodeBlock>
                {`{
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
              </StyledCodeBlock>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 1: Get all books
                </Text>
                <Text mb="xs">Path:</Text>
                <StyledCodeBlock>$.store.book[*]</StyledCodeBlock>
                <Text c="dimmed" size="sm">
                  Returns all book objects in the array
                </Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 2: Get all book authors
                </Text>
                <Text mb="xs">Path:</Text>
                <StyledCodeBlock>$.store.book[*].author</StyledCodeBlock>
                <Text mb="xs">Result:</Text>
                <StyledCodeBlock>
                  {'["Nigel Rees", "Evelyn Waugh", "Herman Melville"]'}
                </StyledCodeBlock>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 3: Get all prices in the store
                </Text>
                <Text mb="xs">Path:</Text>
                <StyledCodeBlock>$.store..price</StyledCodeBlock>
                <Text mb="xs">Result:</Text>
                <StyledCodeBlock>{"[8.95, 12.99, 8.99, 19.95]"}</StyledCodeBlock>
                <Text c="dimmed" size="sm">
                  The <StyledInlineCode>..</StyledInlineCode> operator searches recursively
                </Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 4: Get the first book
                </Text>
                <Text mb="xs">Path:</Text>
                <StyledCodeBlock>$.store.book[0]</StyledCodeBlock>
                <Text mb="xs">Result:</Text>
                <StyledCodeBlock>
                  {`{
  "category": "reference",
  "author": "Nigel Rees",
  "title": "Sayings of the Century",
  "price": 8.95
}`}
                </StyledCodeBlock>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 5: Get the last book
                </Text>
                <Text mb="xs">Path:</Text>
                <StyledCodeBlock>$.store.book[-1]</StyledCodeBlock>
                <Text c="dimmed" size="sm">
                  Negative indices count from the end
                </Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 6: Get first two books
                </Text>
                <Text mb="xs">Path:</Text>
                <StyledCodeBlock>$.store.book[0:2]</StyledCodeBlock>
                <Text c="dimmed" size="sm">
                  Array slice: start index (inclusive) to end index (exclusive)
                </Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 7: Filter books by price
                </Text>
                <Text mb="xs">Path:</Text>
                <StyledCodeBlock>$.store.book[?(@.price &lt; 10)]</StyledCodeBlock>
                <Text c="dimmed" size="sm">
                  Returns books with price less than 10
                </Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 8: Filter books with ISBN
                </Text>
                <Text mb="xs">Path:</Text>
                <StyledCodeBlock>$.store.book[?(@.isbn)]</StyledCodeBlock>
                <Text c="dimmed" size="sm">
                  Returns books that have an ISBN property
                </Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 9: Get specific properties
                </Text>
                <Text mb="xs">Path:</Text>
                <StyledCodeBlock>$.store.book[0,2]</StyledCodeBlock>
                <Text c="dimmed" size="sm">
                  Returns the first and third books (union operator)
                </Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              Filter Expressions
            </Title>
            <StyledContentBody>
              <Text mb="md">
                Filter expressions use <StyledInlineCode>[?()]</StyledInlineCode> syntax with{" "}
                <StyledInlineCode>@</StyledInlineCode> representing the current element.
              </Text>
              <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Operator</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th>Example</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>==</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Equal to</Table.Td>
                    <Table.Td>
                      <StyledInlineCode>[?(@.price == 8.95)]</StyledInlineCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>!=</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Not equal to</Table.Td>
                    <Table.Td>
                      <StyledInlineCode>[?(@.category != &quot;fiction&quot;)]</StyledInlineCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>&lt;</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Less than</Table.Td>
                    <Table.Td>
                      <StyledInlineCode>[?(@.price &lt; 10)]</StyledInlineCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>&lt;=</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Less than or equal</Table.Td>
                    <Table.Td>
                      <StyledInlineCode>[?(@.price &lt;= 10)]</StyledInlineCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>&gt;</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Greater than</Table.Td>
                    <Table.Td>
                      <StyledInlineCode>[?(@.price &gt; 10)]</StyledInlineCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>&gt;=</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Greater than or equal</Table.Td>
                    <Table.Td>
                      <StyledInlineCode>[?(@.price &gt;= 10)]</StyledInlineCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>&amp;&amp;</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Logical AND</Table.Td>
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
                    <Table.Td>Logical OR</Table.Td>
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
            <Title mb="md" order={2} c="dark">
              Tips & Best Practices
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600}>• Always Start with $</Text>
                <Text>
                  Every JSONPath expression must start with <StyledInlineCode>$</StyledInlineCode>{" "}
                  to reference the root element.
                </Text>
              </div>
              <div>
                <Text fw={600}>• Use Dot Notation for Simple Paths</Text>
                <Text>
                  <StyledInlineCode>$.store.book</StyledInlineCode> is cleaner than{" "}
                  <StyledInlineCode>$[&apos;store&apos;][&apos;book&apos;]</StyledInlineCode>
                </Text>
              </div>
              <div>
                <Text fw={600}>• Use Bracket Notation for Special Characters</Text>
                <Text>
                  If property names contain spaces or special characters, use bracket notation:{" "}
                  <StyledInlineCode>$[&apos;property name&apos;]</StyledInlineCode>
                </Text>
              </div>
              <div>
                <Text fw={600}>• Test Incrementally</Text>
                <Text>
                  Build complex paths step by step. Start with{" "}
                  <StyledInlineCode>$.store</StyledInlineCode>, then add{" "}
                  <StyledInlineCode>.book</StyledInlineCode>, then filters.
                </Text>
              </div>
              <div>
                <Text fw={600}>• Understand Your Data Structure</Text>
                <Text>
                  Use the graph visualization to understand your JSON structure before writing path
                  expressions.
                </Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              Common Use Cases
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="xs">
                  Extract All Values of a Specific Field
                </Text>
                <StyledCodeBlock>$..fieldName</StyledCodeBlock>
                <Text c="dimmed" size="sm">
                  Recursively finds all occurrences of &quot;fieldName&quot; at any level
                </Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Get All Array Elements
                </Text>
                <StyledCodeBlock>$.arrayName[*]</StyledCodeBlock>
                <Text c="dimmed" size="sm">
                  Returns all elements in the array
                </Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Filter by Multiple Conditions
                </Text>
                <StyledCodeBlock>
                  $.items[?(@.price &lt; 100 &amp;&amp; @.inStock == true)]
                </StyledCodeBlock>
                <Text c="dimmed" size="sm">
                  Combines multiple filter conditions
                </Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Get Nested Property from All Items
                </Text>
                <StyledCodeBlock>$.users[*].address.city</StyledCodeBlock>
                <Text c="dimmed" size="sm">
                  Extracts nested property from each array element
                </Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              Need Help?
            </Title>
            <StyledContentBody>
              <Text>
                If you encounter issues or have questions, visit our{" "}
                <StyledLink href="/docs">Documentation</StyledLink> or check out the{" "}
                <StyledLink href="/editor">Editor</StyledLink> to try it yourself.
              </Text>
            </StyledContentBody>
          </Paper>
        </Stack>
      </Container>
    </Layout>
  );
};

export default JsonPathDocs;
