import React from "react";
import { JetBrains_Mono } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { Box, Container, Flex, Paper, Title, Text } from "@mantine/core";
import styled from "styled-components";
import { Editor, type OnMount } from "@monaco-editor/react";
import { JSONSchemaFaker } from "json-schema-faker";
import { generateNextSeo } from "next-seo/pages";
import { toast } from "react-hot-toast";
import { LuCheck, LuCircleX } from "react-icons/lu";
import { ArrowButton } from "../../components/ArrowButton";
import { ExploreButton } from "../../components/ExploreButton";
import { GenerateButton } from "../../components/GenerateButton";
import { Tooltip } from "../../components/Tooltip";
import { FileFormat, TypeLanguage } from "../../constants/enumData";
import { SEO } from "../../constants/seo";
import { editorOptions } from "../../layout/ConverterLayout/options";
import Layout from "../../layout/PageLayout";
import { generateType } from "../../lib/utils/generateType";
import { jsonToContent } from "../../lib/utils/jsonAdapter";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const StyledEditorWrapper = styled.div`
  * {
    font-family: ${jetbrainsMono.style.fontFamily}, monospace !important;
  }
`;

const StyledPaper = styled(Paper)<any>`
  transition: outline 0.3s ease;

  &[data-tooltip] {
    position: relative;
  }

  &[data-tooltip]::before {
    content: attr(data-tooltip);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(26, 26, 26, 0.95);
    color: #fff;
    padding: 16px 20px;
    border-radius: 8px;
    font-size: 0.95rem;
    white-space: normal;
    max-width: 280px;
    text-align: center;
    z-index: 1000;
    pointer-events: none;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
`;

const JSONSchemaTool = () => {
  const monacoRef = React.useRef<Parameters<OnMount>[1] | null>(null);
  const [jsonError, setJsonError] = React.useState(false);
  const [jsonSchemaError, setJsonSchemaError] = React.useState(false);
  const [json, setJson] = React.useState("");
  const [jsonSchema, setJsonSchema] = React.useState("");

  React.useEffect(() => {
    monacoRef.current?.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      allowComments: true,
      enableSchemaRequest: true,
      ...(jsonSchema && {
        schemas: [
          {
            uri: "",
            fileMatch: ["*"],
            schema: jsonSchema,
          },
        ],
      }),
    });
  }, [jsonSchema]);

  const generateJsonSchema = async () => {
    if (jsonError) {
      toast.error("Please fix JSON syntax errors first!");
      return;
    }
    try {
      const jsonSchema = await generateType(json, FileFormat.JSON, TypeLanguage.JSON_SCHEMA);
      setJsonSchema(jsonSchema);
      toast.success("JSON Schema generated successfully!");
    } catch (error) {
      toast.error("Failed to generate JSON Schema!");
    }
  };

  const generateJson = async () => {
    if (jsonSchemaError) {
      toast.error("Please fix JSON Schema syntax errors first!");
      return;
    }
    try {
      if (!jsonSchema || !jsonSchema.trim()) {
        return;
      }
      const randomJson = await JSONSchemaFaker.resolve(JSON.parse(jsonSchema));
      const contents = await jsonToContent(JSON.stringify(randomJson, null, 2), FileFormat.JSON);
      setJson(contents);
      toast.success("Mock JSON generated successfully!");
    } catch (error) {
      toast.error("Failed to generate JSON!");
    }
  };

  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: "JSON Schema Validator & Generator",
          description:
            "Use our JSON Schema Validator & Generator tool to easily validate and generate JSON schemas, and generate data from JSON schemas. Simply input your JSON data, generate the corresponding schema, and validate your data with ease.",
          canonical: "https://jsonviz.online/tools/json-schema",
        })}
      </Head>
      <Container mt="xl" mb="xl" pb="xl" size="xl">
        <Title c="black" mb="lg">
          JSON Schema Validator & Generator
        </Title>

        <Flex justify="flex-start" mb="xl">
          <Link href="/editor">
            <ExploreButton>Open JSON Visualization</ExploreButton>
          </Link>
        </Flex>

        <Flex pt="lg" gap="lg" mb="xl">
          <Tooltip
            content={
              jsonError
                ? "Please fix JSON syntax errors first"
                : !json.length
                  ? "Please enter JSON data first"
                  : ""
            }
            targetId="json-editor"
          >
            <GenerateButton onClick={generateJsonSchema} disabled={!json.length || jsonError}>
              Generate JSON Schema
            </GenerateButton>
          </Tooltip>
          <Tooltip
            content={
              jsonSchemaError
                ? "Please fix JSON Schema syntax errors first"
                : !jsonSchema.length
                  ? "Please enter JSON Schema first"
                  : ""
            }
            targetId="schema-editor"
          >
            <GenerateButton onClick={generateJson} disabled={!jsonSchema.length || jsonSchemaError}>
              Generate JSON
            </GenerateButton>
          </Tooltip>
        </Flex>

        <Flex pt="xl" gap="40" align="center">
          <StyledPaper
            id="json-editor"
            mah="600px"
            withBorder
            flex="1"
            style={{ overflow: "hidden" }}
          >
            <Box p="xs" style={{ backgroundColor: "#f7f3e6" }}>
              <Flex justify="space-between" align="center">
                <Text c="#1a1a1a">JSON</Text>
                {jsonError ? <LuCircleX color="red" /> : <LuCheck color="lightgreen" />}
              </Flex>
            </Box>
            <StyledEditorWrapper>
              <Editor
                value={json}
                onChange={value => setJson(value || "")}
                onValidate={errors => setJsonError(!!errors.length)}
                language="json"
                height={500}
                options={editorOptions}
                onMount={(_editor, monaco) => (monacoRef.current = monaco)}
              />
            </StyledEditorWrapper>
          </StyledPaper>

          <ArrowButton />

          <StyledPaper
            id="schema-editor"
            mah="600px"
            withBorder
            flex="1"
            style={{ overflow: "hidden" }}
          >
            <Box p="xs" style={{ backgroundColor: "#f7f3e6" }}>
              <Flex justify="space-between" align="center">
                <Text c="#1a1a1a">JSON Schema</Text>
                {jsonSchemaError ? <LuCircleX color="red" /> : <LuCheck color="lightgreen" />}
              </Flex>
            </Box>
            <StyledEditorWrapper>
              <Editor
                value={jsonSchema}
                onChange={value => setJsonSchema(value || "")}
                onValidate={errors => setJsonSchemaError(!!errors.length)}
                language="json"
                height={500}
                options={editorOptions}
              />
            </StyledEditorWrapper>
          </StyledPaper>
        </Flex>
      </Container>
    </Layout>
  );
};

export default JSONSchemaTool;
