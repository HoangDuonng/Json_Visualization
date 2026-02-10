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

const StyledInlineCode = styled.code`
  background: #f8f9fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: ${MONO_FONT_FAMILY} !important;
  font-size: 0.9em;
  border: 1px solid #e9ecef;
`;

const FormatConversionDocs = () => {
  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: "Format Conversion Documentation - JSON Visualization",
          description:
            "Learn how to convert between JSON, YAML, CSV, XML, and TOML formats seamlessly in JSON Visualization.",
          canonical: "https://jsonvisualization.nguuyen.io.vn/docs/format-conversion",
        })}
      </Head>
      <Container size="lg" py={60}>
        <Stack gap="xl">
          <div>
            <Title order={1} c="dark" mb="sm">
              Format Conversion
            </Title>
            <Text size="lg" c="dimmed">
              Convert between JSON, YAML, CSV, XML, and TOML formats seamlessly
            </Text>
          </div>

          <Alert
            icon={<VscInfo size={20} />}
            color="cyan"
            variant="light"
            styles={{ message: { color: "#1971c2" } }}
          >
            JSON Visualization provides bidirectional conversion between multiple data formats,
            preserving data structure and types during conversion.
          </Alert>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              What is Format Conversion?
            </Title>
            <StyledContentBody>
              <Text>
                Format conversion allows you to transform data from one format to another without
                losing information. This is useful when:
              </Text>
              <Text>• Working with APIs that require different data formats</Text>
              <Text>• Migrating data between systems</Text>
              <Text>• Converting configuration files</Text>
              <Text>• Preparing data for different tools and platforms</Text>
              <Text>• Transforming spreadsheet data to JSON or vice versa</Text>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              Supported Conversions
            </Title>
            <StyledContentBody>
              <Text mb="md">
                JSON Visualization supports conversion between the following formats:
              </Text>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                <div>
                  <Text fw={600} mb="xs">
                    From JSON
                  </Text>
                  <Text size="sm">• JSON to YAML</Text>
                  <Text size="sm">• JSON to CSV</Text>
                  <Text size="sm">• JSON to XML</Text>
                </div>
                <div>
                  <Text fw={600} mb="xs">
                    From YAML
                  </Text>
                  <Text size="sm">• YAML to JSON</Text>
                  <Text size="sm">• YAML to CSV</Text>
                  <Text size="sm">• YAML to XML</Text>
                </div>
                <div>
                  <Text fw={600} mb="xs">
                    From CSV
                  </Text>
                  <Text size="sm">• CSV to JSON</Text>
                  <Text size="sm">• CSV to YAML</Text>
                  <Text size="sm">• CSV to XML</Text>
                </div>
                <div>
                  <Text fw={600} mb="xs">
                    From XML
                  </Text>
                  <Text size="sm">• XML to JSON</Text>
                  <Text size="sm">• XML to YAML</Text>
                  <Text size="sm">• XML to CSV</Text>
                </div>
              </SimpleGrid>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              How to Convert
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="xs">
                  Method 1: Using the Editor
                </Text>
                <Text>
                  1. Open the <StyledLink href="/editor">Editor</StyledLink>
                </Text>
                <Text>2. Paste or load your source data</Text>
                <Text>3. Click File → Download in the toolbar</Text>
                <Text>4. Select your desired output format</Text>
                <Text>5. Click Download to save the converted file</Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Method 2: Using Converter Pages
                </Text>
                <Text>
                  1. Visit a specific converter page (e.g.,{" "}
                  <StyledLink href="/converter/json-to-yaml">JSON to YAML</StyledLink>)
                </Text>
                <Text>2. Paste your source data in the left panel</Text>
                <Text>3. The converted output appears automatically in the right panel</Text>
                <Text>4. Copy the result or download it as a file</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              Conversion Examples
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="xs">
                  Example 1: JSON to YAML
                </Text>
                <Text mb="xs">Input (JSON):</Text>
                <StyledCodeBlock>
                  {`{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "skills": ["JavaScript", "Python", "Go"]
}`}
                </StyledCodeBlock>
                <Text mb="xs" mt="md">
                  Output (YAML):
                </Text>
                <StyledCodeBlock>
                  {`name: John Doe
age: 30
email: john@example.com
skills:
  - JavaScript
  - Python
  - Go`}
                </StyledCodeBlock>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 2: CSV to JSON
                </Text>
                <Text mb="xs">Input (CSV):</Text>
                <StyledCodeBlock>
                  {`name,age,city
Alice,25,New York
Bob,30,San Francisco
Charlie,35,Seattle`}
                </StyledCodeBlock>
                <Text mb="xs" mt="md">
                  Output (JSON):
                </Text>
                <StyledCodeBlock>
                  {`[
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
                </StyledCodeBlock>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 3: JSON to XML
                </Text>
                <Text mb="xs">Input (JSON):</Text>
                <StyledCodeBlock>
                  {`{
  "book": {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "year": 1925
  }
}`}
                </StyledCodeBlock>
                <Text mb="xs" mt="md">
                  Output (XML):
                </Text>
                <StyledCodeBlock>
                  {`<?xml version="1.0" encoding="UTF-8"?>
<book>
  <title>The Great Gatsby</title>
  <author>F. Scott Fitzgerald</author>
  <year>1925</year>
</book>`}
                </StyledCodeBlock>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 4: YAML to JSON
                </Text>
                <Text mb="xs">Input (YAML):</Text>
                <StyledCodeBlock>
                  {`server:
  host: localhost
  port: 8080
  ssl: true
database:
  name: myapp
  user: admin`}
                </StyledCodeBlock>
                <Text mb="xs" mt="md">
                  Output (JSON):
                </Text>
                <StyledCodeBlock>
                  {`{
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
                </StyledCodeBlock>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              Format Characteristics
            </Title>
            <StyledContentBody>
              <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Format</Table.Th>
                    <Table.Th>Best For</Table.Th>
                    <Table.Th>Characteristics</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>JSON</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>APIs, web applications, data exchange</Table.Td>
                    <Table.Td>Lightweight, widely supported, easy to parse</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>YAML</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Configuration files, human-readable data</Table.Td>
                    <Table.Td>Clean syntax, supports comments, indentation-based</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>CSV</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Tabular data, spreadsheets, data analysis</Table.Td>
                    <Table.Td>Simple, flat structure, Excel-compatible</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>XML</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Enterprise systems, SOAP APIs, documents</Table.Td>
                    <Table.Td>Verbose, supports attributes, schema validation</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>TOML</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Configuration files, settings</Table.Td>
                    <Table.Td>Minimal, clear, easy to read and write</Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              Conversion Limitations
            </Title>
            <StyledContentBody>
              <Text>
                While JSON Visualization strives to preserve data integrity during conversion, some
                limitations exist:
              </Text>

              <div>
                <Text fw={600} mt="md" mb="xs">
                  CSV Limitations
                </Text>
                <Text>• CSV is a flat format and cannot represent nested structures directly</Text>
                <Text>• Complex objects are flattened or serialized as strings</Text>
                <Text>• Type information may be lost (everything becomes strings)</Text>
              </div>

              <div>
                <Text fw={600} mt="md" mb="xs">
                  XML Limitations
                </Text>
                <Text>• Arrays may require special handling</Text>
                <Text>• Attribute vs element distinction may not be preserved</Text>
                <Text>• Root element naming conventions may vary</Text>
              </div>

              <div>
                <Text fw={600} mt="md" mb="xs">
                  YAML Limitations
                </Text>
                <Text>• Comments in YAML are lost when converting to other formats</Text>
                <Text>• Some YAML-specific features may not translate</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              Tips & Best Practices
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600}>• Validate Before Converting</Text>
                <Text>
                  Ensure your source data is valid before conversion to avoid errors in the output.
                </Text>
              </div>
              <div>
                <Text fw={600}>• Understand Format Limitations</Text>
                <Text>
                  Be aware of the limitations of your target format, especially when converting
                  complex nested structures to CSV.
                </Text>
              </div>
              <div>
                <Text fw={600}>• Preview the Output</Text>
                <Text>
                  Always review the converted output to ensure it meets your requirements before
                  using it in production.
                </Text>
              </div>
              <div>
                <Text fw={600}>• Use Appropriate Formats</Text>
                <Text>
                  Choose the right format for your use case: JSON for APIs, YAML for configs, CSV
                  for tabular data.
                </Text>
              </div>
              <div>
                <Text fw={600}>• Keep Backups</Text>
                <Text>
                  Always keep a copy of your original data before performing conversions, especially
                  for critical data.
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
                <StyledLink href="/docs">Documentation</StyledLink> or try the{" "}
                <StyledLink href="/converter/json-to-yaml">Converter Tools</StyledLink> directly.
              </Text>
            </StyledContentBody>
          </Paper>
        </Stack>
      </Container>
    </Layout>
  );
};

export default FormatConversionDocs;
