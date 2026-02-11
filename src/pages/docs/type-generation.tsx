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
            {t("typeGeneration.alert")}
          </Alert>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("typeGeneration.whatIsTitle")}
            </Title>
            <StyledContentBody>
              <Text>{t("typeGeneration.whatIsDesc")}</Text>
              <Text fw={600} mt="md" mb="xs">
                {t("typeGeneration.benefitsTitle")}
              </Text>
              <Text>• {t("typeGeneration.benefit1")}</Text>
              <Text>• {t("typeGeneration.benefit2")}</Text>
              <Text>• {t("typeGeneration.benefit3")}</Text>
              <Text>• {t("typeGeneration.benefit4")}</Text>
              <Text>• {t("typeGeneration.benefit5")}</Text>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("typeGeneration.supportedTitle")}
            </Title>
            <StyledContentBody>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                <div>
                  <Text fw={600} mb="xs">
                    {t("typeGeneration.typescript")}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {t("typeGeneration.typescriptDesc")}
                  </Text>
                </div>
                <div>
                  <Text fw={600} mb="xs">
                    {t("typeGeneration.go")}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {t("typeGeneration.goDesc")}
                  </Text>
                </div>
                <div>
                  <Text fw={600} mb="xs">
                    {t("typeGeneration.rust")}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {t("typeGeneration.rustDesc")}
                  </Text>
                </div>
                <div>
                  <Text fw={600} mb="xs">
                    {t("typeGeneration.kotlin")}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {t("typeGeneration.kotlinDesc")}
                  </Text>
                </div>
              </SimpleGrid>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("typeGeneration.howToTitle")}
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="xs">
                  {t("typeGeneration.step1")}
                </Text>
                <Text>{t("typeGeneration.step1Desc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("typeGeneration.step2")}
                </Text>
                <Text>{t("typeGeneration.step2Desc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("typeGeneration.step3")}
                </Text>
                <Text>{t("typeGeneration.step3Desc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("typeGeneration.step4")}
                </Text>
                <Text>{t("typeGeneration.step4Desc")}</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("typeGeneration.examplesTitle")}
            </Title>
            <StyledContentBody>
              <Text fw={600} mb="xs">
                {t("typeGeneration.inputLabel")}
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
              <Text mb="md">{t("typeGeneration.typeMappingDesc")}</Text>
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
              {t("typeGeneration.tipsTitle")}
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600}>{t("typeGeneration.tip1")}</Text>
                <Text>{t("typeGeneration.tip1Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>{t("typeGeneration.tip2")}</Text>
                <Text>{t("typeGeneration.tip2Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>{t("typeGeneration.tip3")}</Text>
                <Text>{t("typeGeneration.tip3Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>{t("typeGeneration.tip4")}</Text>
                <Text>{t("typeGeneration.tip4Desc")}</Text>
              </div>
            </StyledContentBody>
          </Paper>

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

export default TypeGenerationDocs;
