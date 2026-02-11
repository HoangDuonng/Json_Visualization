import React from "react";
import Head from "next/head";
import { Container, Paper, Stack, Text, Title, Divider, Alert } from "@mantine/core";
import styled from "styled-components";
import { generateNextSeo } from "next-seo/pages";
import { VscInfo, VscError, VscPass } from "react-icons/vsc";
import { CodeBlock } from "../../components/CodeBlock";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";
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
              {t("formatValidate.whatIsTitle")}
            </Title>
            <StyledContentBody>
              <Text>{t("formatValidate.whatIsDesc")}</Text>
              <div>
                <Text fw={600} mt="md" mb="xs">
                  {t("formatValidate.formattingTitle")}
                </Text>
                <Text>{t("formatValidate.formattingDesc")}</Text>
              </div>
              <div>
                <Text fw={600} mt="md" mb="xs">
                  {t("formatValidate.validationTitle")}
                </Text>
                <Text>{t("formatValidate.validationDesc")}</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("formatValidate.supportedFormatsTitle")}
            </Title>
            <StyledContentBody>
              <Text>{t("formatValidate.supportedFormatsDesc")}</Text>
              <div>
                <Text fw={600} mt="md" mb="xs">
                  {t("formatValidate.jsonTitle")}
                </Text>
                <Text>• {t("formatValidate.jsonFeature1")}</Text>
                <Text>• {t("formatValidate.jsonFeature2")}</Text>
                <Text>• {t("formatValidate.jsonFeature3")}</Text>
                <Text>• {t("formatValidate.jsonFeature4")}</Text>
              </div>
              <div>
                <Text fw={600} mt="md" mb="xs">
                  {t("formatValidate.yamlTitle")}
                </Text>
                <Text>• {t("formatValidate.yamlFeature1")}</Text>
                <Text>• {t("formatValidate.yamlFeature2")}</Text>
                <Text>• {t("formatValidate.yamlFeature3")}</Text>
                <Text>• {t("formatValidate.yamlFeature4")}</Text>
              </div>
              <div>
                <Text fw={600} mt="md" mb="xs">
                  {t("formatValidate.csvTitle")}
                </Text>
                <Text>• {t("formatValidate.csvFeature1")}</Text>
                <Text>• {t("formatValidate.csvFeature2")}</Text>
                <Text>• {t("formatValidate.csvFeature3")}</Text>
                <Text>• {t("formatValidate.csvFeature4")}</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("formatValidate.howToUseTitle")}
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="xs">
                  {t("formatValidate.autoFormattingTitle")}
                </Text>
                <Text>
                  {t("formatValidate.autoFormatStep1")}{" "}
                  <StyledLink href="/editor">{t("common.editor")}</StyledLink>
                </Text>
                <Text>{t("formatValidate.autoFormatStep2")}</Text>
                <Text>{t("formatValidate.autoFormatStep3")}</Text>
                <Text>{t("formatValidate.autoFormatStep4")}</Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  {t("formatValidate.realtimeValidationTitle")}
                </Text>
                <Text>{t("formatValidate.realtimeStep1")}</Text>
                <Text>{t("formatValidate.realtimeStep2")}</Text>
                <Text>{t("formatValidate.realtimeStep3")}</Text>
                <Text>{t("formatValidate.realtimeStep4")}</Text>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  {t("formatValidate.errorNavigationTitle")}
                </Text>
                <Text>{t("formatValidate.errorNavStep1")}</Text>
                <Text>{t("formatValidate.errorNavStep2")}</Text>
                <Text>{t("formatValidate.errorNavStep3")}</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("formatValidate.commonErrorsTitle")}
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="md">
                  JSON Errors
                </Text>

                <div>
                  <Alert icon={<VscError size={20} />} color="red" variant="light" mb="md">
                    <Text fw={600}>{t("formatValidate.missingComma")}</Text>
                  </Alert>
                  <Text mb="xs">{t("formatValidate.invalid")}</Text>
                  <CodeBlock
                    code={`{
  "name": "John"
  "age": 30
}`}
                  />
                  <Alert icon={<VscPass size={20} />} color="green" variant="light" mt="md" mb="md">
                    <Text fw={600}>{t("formatValidate.valid")}</Text>
                  </Alert>
                  <CodeBlock
                    code={`{
  "name": "John",
  "age": 30
}`}
                  />
                </div>

                <Divider my="md" />

                <div>
                  <Alert icon={<VscError size={20} />} color="red" variant="light" mb="md">
                    <Text fw={600}>{t("formatValidate.trailingComma")}</Text>
                  </Alert>
                  <Text mb="xs">{t("formatValidate.invalid")}</Text>
                  <CodeBlock
                    code={`{
  "name": "John",
  "age": 30,
}`}
                  />
                  <Alert icon={<VscPass size={20} />} color="green" variant="light" mt="md" mb="md">
                    <Text fw={600}>{t("formatValidate.valid")}</Text>
                  </Alert>
                  <CodeBlock
                    code={`{
  "name": "John",
  "age": 30
}`}
                  />
                </div>

                <Divider my="md" />

                <div>
                  <Alert icon={<VscError size={20} />} color="red" variant="light" mb="md">
                    <Text fw={600}>{t("formatValidate.unquotedKeys")}</Text>
                  </Alert>
                  <Text mb="xs">{t("formatValidate.invalid")}</Text>
                  <CodeBlock
                    code={`{
  name: "John",
  age: 30
}`}
                  />
                  <Alert icon={<VscPass size={20} />} color="green" variant="light" mt="md" mb="md">
                    <Text fw={600}>{t("formatValidate.valid")}</Text>
                  </Alert>
                  <CodeBlock
                    code={`{
  "name": "John",
  "age": 30
}`}
                  />
                </div>

                <Divider my="md" />

                <div>
                  <Alert icon={<VscError size={20} />} color="red" variant="light" mb="md">
                    <Text fw={600}>{t("formatValidate.singleQuotes")}</Text>
                  </Alert>
                  <Text mb="xs">{t("formatValidate.invalid")}</Text>
                  <CodeBlock
                    code={`{
  'name': 'John',
  'age': 30
}`}
                  />
                  <Alert icon={<VscPass size={20} />} color="green" variant="light" mt="md" mb="md">
                    <Text fw={600}>{t("formatValidate.valid")}</Text>
                  </Alert>
                  <CodeBlock
                    code={`{
  "name": "John",
  "age": 30
}`}
                  />
                </div>
              </div>

              <Divider my="xl" />

              <div>
                <Text fw={600} mb="md">
                  YAML Errors
                </Text>

                <div>
                  <Alert icon={<VscError size={20} />} color="red" variant="light" mb="md">
                    <Text fw={600}>{t("formatValidate.inconsistentIndentation")}</Text>
                  </Alert>
                  <Text mb="xs">{t("formatValidate.invalid")}</Text>
                  <CodeBlock
                    code={`person:
  name: John
   age: 30`}
                  />
                  <Alert icon={<VscPass size={20} />} color="green" variant="light" mt="md" mb="md">
                    <Text fw={600}>{t("formatValidate.valid")}</Text>
                  </Alert>
                  <CodeBlock
                    code={`person:
  name: John
  age: 30`}
                  />
                </div>

                <Divider my="md" />

                <div>
                  <Alert icon={<VscError size={20} />} color="red" variant="light" mb="md">
                    <Text fw={600}>{t("formatValidate.missingSpaceAfterColon")}</Text>
                  </Alert>
                  <Text mb="xs">{t("formatValidate.invalid")}</Text>
                  <CodeBlock
                    code={`name:John
age:30`}
                  />
                  <Alert icon={<VscPass size={20} />} color="green" variant="light" mt="md" mb="md">
                    <Text fw={600}>{t("formatValidate.valid")}</Text>
                  </Alert>
                  <CodeBlock
                    code={`name: John
age: 30`}
                  />
                </div>
              </div>

              <Divider my="xl" />

              <div>
                <Text fw={600} mb="md">
                  CSV Errors
                </Text>

                <div>
                  <Alert icon={<VscError size={20} />} color="red" variant="light" mb="md">
                    <Text fw={600}>{t("formatValidate.inconsistentColumnCount")}</Text>
                  </Alert>
                  <Text mb="xs">{t("formatValidate.invalid")}</Text>
                  <CodeBlock
                    code={`name,age,city
John,30,New York
Jane,25`}
                  />
                  <Alert icon={<VscPass size={20} />} color="green" variant="light" mt="md" mb="md">
                    <Text fw={600}>{t("formatValidate.valid")}</Text>
                  </Alert>
                  <CodeBlock
                    code={`name,age,city
John,30,New York
Jane,25,Boston`}
                  />
                </div>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("formatValidate.formattingOptionsTitle")}
            </Title>
            <StyledContentBody>
              <Text>{t("formatValidate.formattingOptionsDesc")}</Text>
              <div>
                <Text fw={600} mt="md" mb="xs">
                  {t("formatValidate.indentationTitle")}
                </Text>
                <Text>• {t("formatValidate.indentOption1")}</Text>
                <Text>• {t("formatValidate.indentOption2")}</Text>
                <Text>• {t("formatValidate.indentOption3")}</Text>
              </div>
              <div>
                <Text fw={600} mt="md" mb="xs">
                  {t("formatValidate.lineBreaksTitle")}
                </Text>
                <Text>• {t("formatValidate.lineBreak1")}</Text>
                <Text>• {t("formatValidate.lineBreak2")}</Text>
              </div>
              <div>
                <Text fw={600} mt="md" mb="xs">
                  {t("formatValidate.sortingTitle")}
                </Text>
                <Text>• {t("formatValidate.sorting1")}</Text>
                <Text>• {t("formatValidate.sorting2")}</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("formatValidate.tipsTitle")}
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600}>{t("formatValidate.tip1")}</Text>
                <Text>{t("formatValidate.tip1Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>{t("formatValidate.tip2")}</Text>
                <Text>{t("formatValidate.tip2Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>{t("formatValidate.tip3")}</Text>
                <Text>{t("formatValidate.tip3Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>{t("formatValidate.tip4")}</Text>
                <Text>{t("formatValidate.tip4Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>{t("formatValidate.tip5")}</Text>
                <Text>
                  {t("formatValidate.tip5Desc")}{" "}
                  <StyledLink href="/docs/json-schema">JSON Schema</StyledLink>{" "}
                  {t("formatValidate.tip5Desc2")}
                </Text>
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

export default FormatValidateDocs;
