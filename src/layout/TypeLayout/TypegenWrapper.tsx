import React, { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { Box, Container, Flex, Paper, Title, Text } from "@mantine/core";
import { Editor } from "@monaco-editor/react";
import { generateNextSeo } from "next-seo/pages";
import { JetBrains_Mono } from "next/font/google";
import styled from "styled-components";
import { LuCheck, LuCircleX } from "react-icons/lu";
import { ArrowButton } from "../../components/ArrowButton";
import { ExploreButton } from "../../components/ExploreButton";
import { SEO } from "../../constants/seo";
import { type FileFormat, formats, type TypeLanguage, typeOptions } from "../../enums/file.enum";
import { editorOptions } from "../../layout/ConverterLayout/options";
import Layout from "../../layout/PageLayout";
import { generateType } from "../../lib/utils/generateType";
import { PageLinks } from "./PageLinks";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const StyledEditorWrapper = styled.div`
  * {
    font-family: ${jetbrainsMono.style.fontFamily}, monospace !important;
  }
`;

interface ConverterPagesProps {
  from: FileFormat;
  to: TypeLanguage;
}

export const TypegenWrapper = ({ from, to }: ConverterPagesProps) => {
  const editorRef = useRef<any>(null);
  const [contentHasError, setContentHasError] = React.useState(false);
  const [originalContent, setOriginalContent] = React.useState("");
  const [convertedContent, setConvertedContent] = React.useState("");

  const fromLabel = formats.find(({ value }) => value === from)?.label;
  const toLabel = typeOptions.find(({ value }) => value === to)?.label;

  useEffect(() => {
    if (!originalContent.length) return;

    (async () => {
      try {
        const type = await generateType(originalContent, from, to);
        setConvertedContent(type);
        setContentHasError(false);
      } catch {
        setContentHasError(true);
        setConvertedContent("");
      }
    })();
  }, [from, originalContent, to]);

  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: `${fromLabel} to ${toLabel} | JSON Visualization`,
          canonical: `https://jsonvisualization.nguuyen.io.vn/converter/${from}-to-${to}`,
          description: `Instantly generate ${toLabel} from ${fromLabel} using this free online tool. Paste your ${fromLabel} and get the generated ${toLabel} instantly.`,
        })}
      </Head>
      <Container mt="xl" mb="xl" pb="xl" size="xl">
        <Title c="black" mb="lg">
          {fromLabel} to {toLabel} Converter
        </Title>
        
        <Flex justify="flex-start" mb="xl">
          <Link href="/editor">
            <ExploreButton>Open JSON Visualization</ExploreButton>
          </Link>
        </Flex>

        <PageLinks />
        
        <Flex pt="xl" gap="40" align="center">
          <Paper mah="600px" withBorder flex="1" style={{ overflow: "hidden" }}>
            <Box p="xs" style={{ backgroundColor: "#f7f3e6" }}>
              <Flex justify="space-between" align="center">
                <Text c="#1a1a1a">{fromLabel}</Text>
                {contentHasError && !!originalContent ? (
                  <LuCircleX color="red" />
                ) : (
                  <LuCheck color="lightgreen" />
                )}
              </Flex>
            </Box>
            <StyledEditorWrapper>
              <Editor
                value={originalContent}
                onChange={value => setOriginalContent(value || "")}
                language={from}
                height={500}
                options={editorOptions}
              />
            </StyledEditorWrapper>
          </Paper>
          
          <ArrowButton />
          
          <Paper mah="600px" withBorder flex="1" style={{ overflow: "hidden" }}>
            <Box p="xs" style={{ backgroundColor: "#f7f3e6" }}>
              <Text c="#1a1a1a">{toLabel}</Text>
            </Box>
            <StyledEditorWrapper>
              <Editor
                value={convertedContent}
                language={to}
                height={500}
                options={{
                  ...editorOptions,
                  readOnly: true,
                }}
                onMount={editor => {
                  editorRef.current = editor;
                }}
              />
            </StyledEditorWrapper>
          </Paper>
        </Flex>
      </Container>
    </Layout>
  );
};
