import React from "react";
import Head from "next/head";
import { Container, Paper, Stack, Text, Title, Divider, Alert } from "@mantine/core";
import styled from "styled-components";
import { generateNextSeo } from "next-seo/pages";
import { VscInfo, VscError, VscPass } from "react-icons/vsc";
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

const FormatValidateDocs = () => {
  const { t } = useTranslation("docs");

  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: `${t("formatValidate.title")} Documentation - JSON Visualization`,
          description: t("formatValidate.subtitle"),
          canonical: "https://jsonvisualization.nguuyen.io.vn/docs/format-validate",
        })}
      </Head>
      <Container size="lg" py={60}>
        <Stack gap="xl">
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
          >
            <div>
              <Title order={1} c="dark" mb="sm">
                {t("formatValidate.title")}
              </Title>
              <Text size="lg" c="dimmed">
                {t("formatValidate.subtitle")}
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
            {t("formatValidate.alert")}
          </Alert>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              What is Format & Validate?
            </Title>
            <StyledContentBody>
              <Text>
                Format & Validate provides two essential features for working with structured data:
              </Text>
              <div>
                <Text fw={600} mt="md" mb="xs">
                  Formatting (Beautify)
                </Text>
                <Text>
                  Automatically formats your data with proper indentation, spacing, and structure,
                  making it easier to read and maintain.
                </Text>
              </div>
              <div>
                <Text fw={600} mt="md" mb="xs">
                  Validation
                </Text>
                <Text>
                  Checks your data for syntax errors, structural issues, and format violations in
                  real-time, providing immediate feedback.
                </Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              Supported Formats
            </Title>
            <StyledContentBody>
              <Text>Format & Validate works with the following data formats:</Text>
              <div>
                <Text fw={600} mt="md" mb="xs">
                  JSON
                </Text>
                <Text>• Validates JSON syntax</Text>
                <Text>• Checks for missing commas, brackets, and quotes</Text>
                <Text>• Formats with customizable indentation</Text>
                <Text>• Detects trailing commas and other common errors</Text>
              </div>
              <div>
                <Text fw={600} mt="md" mb="xs">
                  YAML
                </Text>
                <Text>• Validates YAML syntax</Text>
                <Text>• Checks indentation consistency</Text>
                <Text>• Detects invalid characters and structure</Text>
                <Text>• Preserves comments during formatting</Text>
              </div>
              <div>
                <Text fw={600} mt="md" mb="xs">
                  CSV
                </Text>
                <Text>• Validates CSV structure</Text>
                <Text>• Checks for consistent column counts</Text>
                <Text>• Detects malformed rows</Text>
                <Text>• Handles quoted fields correctly</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              How to Use
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="xs">
                  Automatic Formatting
                </Text>
                <Text>
                  1. Open the <StyledLink href="/editor">Editor</StyledLink>
                </Text>
                <Text>2. Paste or type your data</Text>
                <Text>
                  3. The editor automatically formats your data with proper indentation and spacing
                </Text>
                <Text>4. Use Ctrl+S (Cmd+S on Mac) to manually trigger formatting</Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Real-time Validation
                </Text>
                <Text>1. As you type, the editor validates your data in real-time</Text>
                <Text>2. Syntax errors are highlighted with red underlines</Text>
                <Text>3. Hover over errors to see detailed error messages</Text>
                <Text>4. The bottom toolbar shows validation status and error count</Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Error Navigation
                </Text>
                <Text>1. Click on error indicators in the gutter (left side of editor)</Text>
                <Text>2. Use keyboard shortcuts to jump between errors</Text>
                <Text>3. Check the bottom toolbar for a summary of all errors</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              Common Validation Errors
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="md">
                  JSON Errors
                </Text>

                <div>
                  <Alert icon={<VscError size={20} />} color="red" variant="light" mb="md">
                    <Text fw={600}>Missing Comma</Text>
                  </Alert>
                  <Text mb="xs">Invalid:</Text>
                  <StyledCodeBlock>
                    {`{
  "name": "John"
  "age": 30
}`}
                  </StyledCodeBlock>
                  <Alert icon={<VscPass size={20} />} color="green" variant="light" mt="md" mb="md">
                    <Text fw={600}>Valid</Text>
                  </Alert>
                  <StyledCodeBlock>
                    {`{
  "name": "John",
  "age": 30
}`}
                  </StyledCodeBlock>
                </div>

                <Divider my="md" />

                <div>
                  <Alert icon={<VscError size={20} />} color="red" variant="light" mb="md">
                    <Text fw={600}>Trailing Comma</Text>
                  </Alert>
                  <Text mb="xs">Invalid:</Text>
                  <StyledCodeBlock>
                    {`{
  "name": "John",
  "age": 30,
}`}
                  </StyledCodeBlock>
                  <Alert icon={<VscPass size={20} />} color="green" variant="light" mt="md" mb="md">
                    <Text fw={600}>Valid</Text>
                  </Alert>
                  <StyledCodeBlock>
                    {`{
  "name": "John",
  "age": 30
}`}
                  </StyledCodeBlock>
                </div>

                <Divider my="md" />

                <div>
                  <Alert icon={<VscError size={20} />} color="red" variant="light" mb="md">
                    <Text fw={600}>Unquoted Keys</Text>
                  </Alert>
                  <Text mb="xs">Invalid:</Text>
                  <StyledCodeBlock>
                    {`{
  name: "John",
  age: 30
}`}
                  </StyledCodeBlock>
                  <Alert icon={<VscPass size={20} />} color="green" variant="light" mt="md" mb="md">
                    <Text fw={600}>Valid</Text>
                  </Alert>
                  <StyledCodeBlock>
                    {`{
  "name": "John",
  "age": 30
}`}
                  </StyledCodeBlock>
                </div>

                <Divider my="md" />

                <div>
                  <Alert icon={<VscError size={20} />} color="red" variant="light" mb="md">
                    <Text fw={600}>Single Quotes</Text>
                  </Alert>
                  <Text mb="xs">Invalid:</Text>
                  <StyledCodeBlock>
                    {`{
  'name': 'John',
  'age': 30
}`}
                  </StyledCodeBlock>
                  <Alert icon={<VscPass size={20} />} color="green" variant="light" mt="md" mb="md">
                    <Text fw={600}>Valid</Text>
                  </Alert>
                  <StyledCodeBlock>
                    {`{
  "name": "John",
  "age": 30
}`}
                  </StyledCodeBlock>
                </div>
              </div>

              <Divider my="xl" />

              <div>
                <Text fw={600} mb="md">
                  YAML Errors
                </Text>

                <div>
                  <Alert icon={<VscError size={20} />} color="red" variant="light" mb="md">
                    <Text fw={600}>Inconsistent Indentation</Text>
                  </Alert>
                  <Text mb="xs">Invalid:</Text>
                  <StyledCodeBlock>
                    {`person:
  name: John
   age: 30`}
                  </StyledCodeBlock>
                  <Alert icon={<VscPass size={20} />} color="green" variant="light" mt="md" mb="md">
                    <Text fw={600}>Valid</Text>
                  </Alert>
                  <StyledCodeBlock>
                    {`person:
  name: John
  age: 30`}
                  </StyledCodeBlock>
                </div>

                <Divider my="md" />

                <div>
                  <Alert icon={<VscError size={20} />} color="red" variant="light" mb="md">
                    <Text fw={600}>Missing Space After Colon</Text>
                  </Alert>
                  <Text mb="xs">Invalid:</Text>
                  <StyledCodeBlock>
                    {`name:John
age:30`}
                  </StyledCodeBlock>
                  <Alert icon={<VscPass size={20} />} color="green" variant="light" mt="md" mb="md">
                    <Text fw={600}>Valid</Text>
                  </Alert>
                  <StyledCodeBlock>
                    {`name: John
age: 30`}
                  </StyledCodeBlock>
                </div>
              </div>

              <Divider my="xl" />

              <div>
                <Text fw={600} mb="md">
                  CSV Errors
                </Text>

                <div>
                  <Alert icon={<VscError size={20} />} color="red" variant="light" mb="md">
                    <Text fw={600}>Inconsistent Column Count</Text>
                  </Alert>
                  <Text mb="xs">Invalid:</Text>
                  <StyledCodeBlock>
                    {`name,age,city
John,30,New York
Jane,25`}
                  </StyledCodeBlock>
                  <Alert icon={<VscPass size={20} />} color="green" variant="light" mt="md" mb="md">
                    <Text fw={600}>Valid</Text>
                  </Alert>
                  <StyledCodeBlock>
                    {`name,age,city
John,30,New York
Jane,25,Boston`}
                  </StyledCodeBlock>
                </div>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              Formatting Options
            </Title>
            <StyledContentBody>
              <Text>The editor provides several formatting options:</Text>
              <div>
                <Text fw={600} mt="md" mb="xs">
                  Indentation
                </Text>
                <Text>• Default: 2 spaces</Text>
                <Text>• Consistent indentation throughout the document</Text>
                <Text>• Automatically adjusts nested structures</Text>
              </div>
              <div>
                <Text fw={600} mt="md" mb="xs">
                  Line Breaks
                </Text>
                <Text>• Proper line breaks between elements</Text>
                <Text>• Consistent spacing for readability</Text>
              </div>
              <div>
                <Text fw={600} mt="md" mb="xs">
                  Sorting (Optional)
                </Text>
                <Text>• Sort object keys alphabetically</Text>
                <Text>• Useful for comparing JSON files</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              Tips & Best Practices
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600}>• Fix Errors as You Go</Text>
                <Text>
                  Address validation errors immediately to avoid cascading issues in your data
                  structure.
                </Text>
              </div>
              <div>
                <Text fw={600}>• Use Consistent Formatting</Text>
                <Text>
                  Let the editor handle formatting automatically to maintain consistency across your
                  files.
                </Text>
              </div>
              <div>
                <Text fw={600}>• Check Error Messages</Text>
                <Text>
                  Hover over error indicators to see detailed messages that explain what&apos;s
                  wrong and how to fix it.
                </Text>
              </div>
              <div>
                <Text fw={600}>• Validate Before Sharing</Text>
                <Text>
                  Always ensure your data is valid before sharing it with others or using it in
                  production.
                </Text>
              </div>
              <div>
                <Text fw={600}>• Use JSON Schema for Advanced Validation</Text>
                <Text>
                  For more complex validation rules, use{" "}
                  <StyledLink href="/docs/json-schema">JSON Schema</StyledLink> to define custom
                  validation logic.
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
                <StyledLink href="/editor">Editor</StyledLink> directly.
              </Text>
            </StyledContentBody>
          </Paper>
        </Stack>
      </Container>
    </Layout>
  );
};

export default FormatValidateDocs;
