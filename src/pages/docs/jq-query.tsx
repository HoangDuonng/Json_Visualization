import React from "react";
import Head from "next/head";
import { Container, Paper, Stack, Text, Title, Code, Table, Divider, Alert } from "@mantine/core";
import styled from "styled-components";
import { generateNextSeo } from "next-seo/pages";
import { VscInfo } from "react-icons/vsc";
import { MONO_FONT_FAMILY } from "../../constants/globalStyle";
import { SEO } from "../../constants/seo";
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

const StyledCode = styled(Code)`
  font-family: ${MONO_FONT_FAMILY} !important;
`;

const JQQueryDocs = () => {
  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: "JSON Query (jq) Documentation - JSON Visualization",
          description:
            "Learn how to use jq queries to filter, transform, and extract data from JSON in JSON Visualization.",
          canonical: "https://jsonvisualization.nguuyen.io.vn/docs/jq-query",
        })}
      </Head>
      <Container size="lg" py={60}>
        <Stack gap="xl">
          <div>
            <Title order={1} c="dark" mb="sm">
              JSON Query (jq)
            </Title>
            <Text size="lg" c="dimmed">
              Filter, transform, and extract data from JSON using jq syntax
            </Text>
          </div>

          <Alert icon={<VscInfo size={20} />} color="blue" variant="light">
            JSON Visualization uses a simplified version of jq. Not all features from the official
            jq command-line tool are supported.
          </Alert>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              What is jq?
            </Title>
            <StyledContentBody>
              <Text>
                jq is a lightweight and flexible command-line JSON processor. It allows you to
                slice, filter, map, and transform structured data with ease.
              </Text>
              <Text>
                In JSON Visualization, you can use jq queries to quickly extract or manipulate
                specific parts of your JSON data without writing custom code.
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
                  2. Open JSON Query Tool
                </Text>
                <Text>
                  Click on &quot;Tools&quot; in the toolbar and select &quot;JSON Query (jq)&quot;.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  3. Enter Your Query
                </Text>
                <Text>
                  Type your jq query in the input field and click &quot;Display on Graph&quot;.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  4. View Results
                </Text>
                <Text>The filtered or transformed data will be displayed in the graph view.</Text>
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
                    <Table.Th>Query</Table.Th>
                    <Table.Th>Description</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>
                      <StyledCode>.</StyledCode>
                    </Table.Td>
                    <Table.Td>Identity - returns the entire input</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledCode>.field</StyledCode>
                    </Table.Td>
                    <Table.Td>Access a specific field</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledCode>.field1.field2</StyledCode>
                    </Table.Td>
                    <Table.Td>Access nested fields</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledCode>.[]</StyledCode>
                    </Table.Td>
                    <Table.Td>Iterate through array elements</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledCode>.[0]</StyledCode>
                    </Table.Td>
                    <Table.Td>Access array element by index</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledCode>.field[]</StyledCode>
                    </Table.Td>
                    <Table.Td>Iterate through array in a field</Table.Td>
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
              </StyledCodeBlock>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 1: Get all fruit names
                </Text>
                <Text mb="xs">Query:</Text>
                <StyledCodeBlock>.fruits[].name</StyledCodeBlock>
                <Text mb="xs">Result:</Text>
                <StyledCodeBlock>{'["Apple", "Banana", "Orange"]'}</StyledCodeBlock>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 2: Get all colors
                </Text>
                <Text mb="xs">Query:</Text>
                <StyledCodeBlock>.fruits[].color</StyledCodeBlock>
                <Text mb="xs">Result:</Text>
                <StyledCodeBlock>{'["#FF0000", "#FFFF00", "#FFA500"]'}</StyledCodeBlock>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 3: Get calorie information
                </Text>
                <Text mb="xs">Query:</Text>
                <StyledCodeBlock>.fruits[].nutrients.calories</StyledCodeBlock>
                <Text mb="xs">Result:</Text>
                <StyledCodeBlock>[52, 89, 47]</StyledCodeBlock>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 4: Filter fruits with type &quot;Citrus&quot;
                </Text>
                <Text mb="xs">Query:</Text>
                <StyledCodeBlock>{'.fruits[] | select(.details.type == "Citrus")'}</StyledCodeBlock>
                <Text mb="xs">Result:</Text>
                <StyledCodeBlock>
                  {`{
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
                </StyledCodeBlock>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 5: Filter fruits with calories less than 50
                </Text>
                <Text mb="xs">Query:</Text>
                <StyledCodeBlock>.fruits[] | select(.nutrients.calories &lt; 50)</StyledCodeBlock>
                <Text mb="xs">Result:</Text>
                <StyledCodeBlock>
                  {`[
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
                </StyledCodeBlock>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 6: Create simplified objects
                </Text>
                <Text mb="xs">Query:</Text>
                <StyledCodeBlock>
                  {".fruits[] | {name: .name, calories: .nutrients.calories}"}
                </StyledCodeBlock>
                <Text mb="xs">Result:</Text>
                <StyledCodeBlock>
                  {`[
  {"name": "Apple", "calories": 52},
  {"name": "Banana", "calories": 89},
  {"name": "Orange", "calories": 47}
]`}
                </StyledCodeBlock>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 7: Get fruits by season
                </Text>
                <Text mb="xs">Query:</Text>
                <StyledCodeBlock>
                  {'.fruits[] | select(.details.season == "Winter")'}
                </StyledCodeBlock>
                <Text mb="xs">Result:</Text>
                <StyledCodeBlock>
                  {`{
  "name": "Orange",
  "color": "#FFA500",
  "details": {
    "type": "Citrus",
    "season": "Winter"
  },
  ...
}`}
                </StyledCodeBlock>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              Common Operations
            </Title>
            <StyledContentBody>
              <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Operation</Table.Th>
                    <Table.Th>Syntax</Table.Th>
                    <Table.Th>Example</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>Filter</Table.Td>
                    <Table.Td>
                      <StyledCode>select(condition)</StyledCode>
                    </Table.Td>
                    <Table.Td>
                      <StyledCode>select(.age &gt; 18)</StyledCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>Map</Table.Td>
                    <Table.Td>
                      <StyledCode>map(expression)</StyledCode>
                    </Table.Td>
                    <Table.Td>
                      <StyledCode>map(.name)</StyledCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>Pipe</Table.Td>
                    <Table.Td>
                      <StyledCode>|</StyledCode>
                    </Table.Td>
                    <Table.Td>
                      <StyledCode>.users[] | .name</StyledCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>Object construction</Table.Td>
                    <Table.Td>
                      <StyledCode>{"{key: value}"}</StyledCode>
                    </Table.Td>
                    <Table.Td>
                      <StyledCode>{"{name: .name, age: .age}"}</StyledCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>Array construction</Table.Td>
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
              Tips & Best Practices
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600}>• Start Simple</Text>
                <Text>
                  Begin with basic queries like <StyledCode>.field</StyledCode> and gradually add
                  complexity.
                </Text>
              </div>
              <div>
                <Text fw={600}>• Use Pipe Operator</Text>
                <Text>
                  Chain operations with <StyledCode>|</StyledCode> to build complex transformations
                  step by step.
                </Text>
              </div>
              <div>
                <Text fw={600}>• Test Incrementally</Text>
                <Text>
                  Test each part of your query separately before combining them into a complex
                  expression.
                </Text>
              </div>
              <div>
                <Text fw={600}>• Understand Your Data Structure</Text>
                <Text>
                  Use the graph visualization to understand your JSON structure before writing
                  queries.
                </Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              Limitations
            </Title>
            <StyledContentBody>
              <Text>
                JSON Visualization uses a simplified version of jq. Some advanced features from the
                official jq tool may not be supported, including:
              </Text>
              <Text>• Complex recursive operations</Text>
              <Text>• Some built-in functions</Text>
              <Text>• Advanced string manipulation</Text>
              <Text>• Custom function definitions</Text>
              <Text mt="md">
                For full jq capabilities, consider using the official{" "}
                <StyledLink href="https://jqlang.org/" target="_blank" rel="noopener noreferrer">
                  jq command-line tool
                </StyledLink>
                .
              </Text>
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

export default JQQueryDocs;
