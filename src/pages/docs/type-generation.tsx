import React from "react";
import Head from "next/head";
import { Container, Paper, Stack, Text, Title, Divider, Alert, SimpleGrid } from "@mantine/core";
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

const TypeGenerationDocs = () => {
  const { t } = useTranslation("docs");

  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: `${t("typeGeneration.title")} Documentation - JSON Visualization`,
          description: t("typeGeneration.subtitle"),
          canonical: "https://jsonvisualization.nguuyen.io.vn/docs/type-generation",
        })}
      </Head>
      <Container size="lg" py={60}>
        <Stack gap="xl">
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
          >
            <div>
              <Title order={1} c="dark" mb="sm">
                {t("typeGeneration.title")}
              </Title>
              <Text size="lg" c="dimmed">
                {t("typeGeneration.subtitle")}
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
            JSON Visualization automatically generates type definitions from your data structure,
            saving you time and reducing errors in your codebase.
          </Alert>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              What is Type Generation?
            </Title>
            <StyledContentBody>
              <Text>
                Type generation analyzes your data structure and creates strongly-typed interfaces,
                structs, or classes for your programming language of choice.
              </Text>
              <Text fw={600} mt="md" mb="xs">
                Benefits:
              </Text>
              <Text>• Save time writing boilerplate type definitions</Text>
              <Text>• Reduce errors with accurate type information</Text>
              <Text>• Improve code completion and IntelliSense</Text>
              <Text>• Ensure type safety across your application</Text>
              <Text>• Keep types in sync with your data structure</Text>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              Supported Languages
            </Title>
            <StyledContentBody>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                <div>
                  <Text fw={600} mb="xs">
                    TypeScript
                  </Text>
                  <Text size="sm" c="dimmed">
                    Generates interfaces and types for TypeScript projects
                  </Text>
                </div>
                <div>
                  <Text fw={600} mb="xs">
                    Go
                  </Text>
                  <Text size="sm" c="dimmed">
                    Creates structs with JSON tags for Go applications
                  </Text>
                </div>
                <div>
                  <Text fw={600} mb="xs">
                    Rust
                  </Text>
                  <Text size="sm" c="dimmed">
                    Generates structs with Serde annotations for Rust
                  </Text>
                </div>
                <div>
                  <Text fw={600} mb="xs">
                    Kotlin
                  </Text>
                  <Text size="sm" c="dimmed">
                    Creates data classes for Kotlin projects
                  </Text>
                </div>
              </SimpleGrid>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              How to Use
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="xs">
                  Method 1: From Editor
                </Text>
                <Text>
                  1. Open the <StyledLink href="/editor">Editor</StyledLink>
                </Text>
                <Text>2. Load your JSON, YAML, CSV, or XML data</Text>
                <Text>3. Click Tools → Generate Types in the toolbar</Text>
                <Text>4. Select your target language</Text>
                <Text>5. Copy the generated types to your project</Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Method 2: Using Type Generator Pages
                </Text>
                <Text>
                  1. Visit a specific generator page (e.g.,{" "}
                  <StyledLink href="/type/json-to-typescript">JSON to TypeScript</StyledLink>)
                </Text>
                <Text>2. Paste your data in the left panel</Text>
                <Text>3. The generated types appear automatically in the right panel</Text>
                <Text>4. Copy the types or download them as a file</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              Generation Examples
            </Title>
            <StyledContentBody>
              <Text fw={600} mb="xs">
                Sample JSON Data:
              </Text>
              <StyledCodeBlock>
                {`{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "isActive": true,
    "roles": ["admin", "user"],
    "profile": {
      "age": 30,
      "city": "New York"
    }
  }
}`}
              </StyledCodeBlock>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  TypeScript Output:
                </Text>
                <StyledCodeBlock>
                  {`export interface Root {
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  roles: string[];
  profile: Profile;
}

export interface Profile {
  age: number;
  city: string;
}`}
                </StyledCodeBlock>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Go Output:
                </Text>
                <StyledCodeBlock>
                  {`type Root struct {
    User User \`json:"user"\`
}

type User struct {
    ID       int      \`json:"id"\`
    Name     string   \`json:"name"\`
    Email    string   \`json:"email"\`
    IsActive bool     \`json:"isActive"\`
    Roles    []string \`json:"roles"\`
    Profile  Profile  \`json:"profile"\`
}

type Profile struct {
    Age  int    \`json:"age"\`
    City string \`json:"city"\`
}`}
                </StyledCodeBlock>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Rust Output:
                </Text>
                <StyledCodeBlock>
                  {`use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Root {
    pub user: User,
}

#[derive(Serialize, Deserialize)]
pub struct User {
    pub id: i32,
    pub name: String,
    pub email: String,
    #[serde(rename = "isActive")]
    pub is_active: bool,
    pub roles: Vec<String>,
    pub profile: Profile,
}

#[derive(Serialize, Deserialize)]
pub struct Profile {
    pub age: i32,
    pub city: String,
}`}
                </StyledCodeBlock>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Kotlin Output:
                </Text>
                <StyledCodeBlock>
                  {`data class Root(
    val user: User
)

data class User(
    val id: Int,
    val name: String,
    val email: String,
    val isActive: Boolean,
    val roles: List<String>,
    val profile: Profile
)

data class Profile(
    val age: Int,
    val city: String
)`}
                </StyledCodeBlock>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              Type Mapping
            </Title>
            <StyledContentBody>
              <Text mb="md">
                JSON Visualization intelligently maps JSON types to language-specific types:
              </Text>
              <div>
                <Text fw={600} mb="xs">
                  String
                </Text>
                <Text>
                  • TypeScript: <StyledInlineCode>string</StyledInlineCode>
                </Text>
                <Text>
                  • Go: <StyledInlineCode>string</StyledInlineCode>
                </Text>
                <Text>
                  • Rust: <StyledInlineCode>String</StyledInlineCode>
                </Text>
                <Text>
                  • Kotlin: <StyledInlineCode>String</StyledInlineCode>
                </Text>
              </div>
              <div>
                <Text fw={600} mt="md" mb="xs">
                  Number
                </Text>
                <Text>
                  • TypeScript: <StyledInlineCode>number</StyledInlineCode>
                </Text>
                <Text>
                  • Go: <StyledInlineCode>int</StyledInlineCode> or{" "}
                  <StyledInlineCode>float64</StyledInlineCode>
                </Text>
                <Text>
                  • Rust: <StyledInlineCode>i32</StyledInlineCode> or{" "}
                  <StyledInlineCode>f64</StyledInlineCode>
                </Text>
                <Text>
                  • Kotlin: <StyledInlineCode>Int</StyledInlineCode> or{" "}
                  <StyledInlineCode>Double</StyledInlineCode>
                </Text>
              </div>
              <div>
                <Text fw={600} mt="md" mb="xs">
                  Boolean
                </Text>
                <Text>
                  • TypeScript: <StyledInlineCode>boolean</StyledInlineCode>
                </Text>
                <Text>
                  • Go: <StyledInlineCode>bool</StyledInlineCode>
                </Text>
                <Text>
                  • Rust: <StyledInlineCode>bool</StyledInlineCode>
                </Text>
                <Text>
                  • Kotlin: <StyledInlineCode>Boolean</StyledInlineCode>
                </Text>
              </div>
              <div>
                <Text fw={600} mt="md" mb="xs">
                  Array
                </Text>
                <Text>
                  • TypeScript: <StyledInlineCode>Type[]</StyledInlineCode>
                </Text>
                <Text>
                  • Go: <StyledInlineCode>[]Type</StyledInlineCode>
                </Text>
                <Text>
                  • Rust: <StyledInlineCode>Vec&lt;Type&gt;</StyledInlineCode>
                </Text>
                <Text>
                  • Kotlin: <StyledInlineCode>List&lt;Type&gt;</StyledInlineCode>
                </Text>
              </div>
              <div>
                <Text fw={600} mt="md" mb="xs">
                  Object
                </Text>
                <Text>
                  • TypeScript: <StyledInlineCode>interface</StyledInlineCode>
                </Text>
                <Text>
                  • Go: <StyledInlineCode>struct</StyledInlineCode>
                </Text>
                <Text>
                  • Rust: <StyledInlineCode>struct</StyledInlineCode>
                </Text>
                <Text>
                  • Kotlin: <StyledInlineCode>data class</StyledInlineCode>
                </Text>
              </div>
              <div>
                <Text fw={600} mt="md" mb="xs">
                  Null
                </Text>
                <Text>
                  • TypeScript: <StyledInlineCode>null</StyledInlineCode> or{" "}
                  <StyledInlineCode>Type | null</StyledInlineCode>
                </Text>
                <Text>
                  • Go: <StyledInlineCode>*Type</StyledInlineCode> (pointer)
                </Text>
                <Text>
                  • Rust: <StyledInlineCode>Option&lt;Type&gt;</StyledInlineCode>
                </Text>
                <Text>
                  • Kotlin: <StyledInlineCode>Type?</StyledInlineCode>
                </Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              Tips & Best Practices
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600}>• Use Representative Data</Text>
                <Text>
                  Provide sample data that includes all possible fields and types to generate
                  complete type definitions.
                </Text>
              </div>
              <div>
                <Text fw={600}>• Review Generated Types</Text>
                <Text>
                  Always review the generated types to ensure they match your expectations,
                  especially for optional fields.
                </Text>
              </div>
              <div>
                <Text fw={600}>• Handle Optional Fields</Text>
                <Text>
                  If your data has optional fields, make sure to include examples with and without
                  those fields.
                </Text>
              </div>
              <div>
                <Text fw={600}>• Customize as Needed</Text>
                <Text>
                  Generated types are a starting point. Feel free to customize them for your
                  specific use case.
                </Text>
              </div>
              <div>
                <Text fw={600}>• Keep Types Updated</Text>
                <Text>
                  When your data structure changes, regenerate types to keep them in sync.
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
                <StyledLink href="/type/json-to-typescript">Type Generator</StyledLink> directly.
              </Text>
            </StyledContentBody>
          </Paper>
        </Stack>
      </Container>
    </Layout>
  );
};

export default TypeGenerationDocs;
