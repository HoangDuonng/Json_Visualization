import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Group, Paper, Stack, Text, Title, ThemeIcon, SimpleGrid } from "@mantine/core";
import styled from "styled-components";
import { generateNextSeo } from "next-seo/pages";
import { FaBolt, FaToolbox } from "react-icons/fa";
import { IoImages } from "react-icons/io5";
import { MdOutlineFormatIndentIncrease, MdOutlineGeneratingTokens } from "react-icons/md";
import { TbTransformFilled } from "react-icons/tb";
import { VscJson } from "react-icons/vsc";
import { SEO } from "../constants/seo";
import Layout from "../layout/PageLayout";

const StyledContentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  line-height: 1.7;
`;

const StyledFeatureCard = styled(Paper)`
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  background: white;
  color: black;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
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

const features = [
  {
    title: "Visualization",
    description: "Transform JSON, YAML, CSV, XML into interactive graphs or tree views",
    icon: <FaBolt size={24} />,
    color: "#fab005",
    link: "/editor",
  },
  {
    title: "Format Conversion",
    description: "Convert between JSON, YAML, CSV, XML, and TOML formats seamlessly",
    icon: <TbTransformFilled size={24} />,
    color: "#fd7e14",
    link: "/converter/json-to-yaml",
  },
  {
    title: "Format & Validate",
    description: "Beautify and validate JSON, YAML, CSV with real-time error detection",
    icon: <MdOutlineFormatIndentIncrease size={24} />,
    color: "#51cf66",
    link: "/editor",
  },
  {
    title: "Type Generation",
    description: "Generate TypeScript, Go, Rust, Kotlin types from your data",
    icon: <MdOutlineGeneratingTokens size={24} />,
    color: "#cc5de8",
    link: "/type/json-to-typescript",
  },
  {
    title: "JSON Schema",
    description: "Generate schema, validate data, and create mock data",
    icon: <VscJson size={24} />,
    color: "#22b8cf",
    link: "/tools/json-schema",
  },
  {
    title: "Query Tools",
    description: "Execute jq and JSONPath queries to filter and transform data",
    icon: <FaToolbox size={24} />,
    color: "#20c997",
    link: "/editor",
  },
  {
    title: "Export Images",
    description: "Download visualizations as PNG, JPEG, or SVG images",
    icon: <IoImages size={24} />,
    color: "#339af0",
    link: "/editor",
  },
];

const Docs = () => {
  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: "Documentation - JSON Visualization",
          description: "Learn about JSON Visualization features and how to use them.",
          canonical: "https://jsonvisualization.nguuyen.io.vn/docs",
        })}
      </Head>
      <Container size="xl" py={60}>
        <Stack gap="xl">
          <Group mb="lg">
            <Title order={1} c="dark">
              Documentation
            </Title>
          </Group>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              Welcome to JSON Visualization
            </Title>
            <StyledContentBody>
              <Text size="lg">
                JSON Visualization is a powerful tool for visualizing, editing, and transforming
                JSON data. All processing happens in your browser - your data never leaves your
                device.
              </Text>
              <Text>
                Get started by exploring our features below or jump straight to the{" "}
                <StyledLink href="/editor">Editor</StyledLink>.
              </Text>
            </StyledContentBody>
          </Paper>

          <div>
            <Title mb="lg" order={2} c="dark">
              Features
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
              {features.map(feature => (
                <Link
                  key={feature.title}
                  href={feature.link}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <StyledFeatureCard p="lg" radius="md" withBorder>
                    <Group mb="md">
                      <ThemeIcon size={48} radius="md" color={feature.color} variant="light">
                        {feature.icon}
                      </ThemeIcon>
                    </Group>
                    <Title order={4} mb="xs" c="dark">
                      {feature.title}
                    </Title>
                    <Text size="sm" c="dimmed">
                      {feature.description}
                    </Text>
                  </StyledFeatureCard>
                </Link>
              ))}
            </SimpleGrid>
          </div>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              Quick Start
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="xs">
                  1. Open the Editor
                </Text>
                <Text>
                  Visit the <StyledLink href="/editor">Editor</StyledLink> and paste your JSON,
                  YAML, CSV, or XML data.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  2. Visualize Your Data
                </Text>
                <Text>
                  See your data transform into an interactive graph. Use Graph View for exploring
                  relationships or Tree View for hierarchical structure.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  3. Use Tools
                </Text>
                <Text>
                  Access powerful tools from the toolbar: convert formats, generate types, validate
                  with JSON Schema, or query with jq/JSONPath.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  4. Export & Share
                </Text>
                <Text>
                  Download your visualization as an image or export your transformed data.
                </Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              Supported Formats
            </Title>
            <StyledContentBody>
              <Text>JSON Visualization supports the following data formats:</Text>
              <SimpleGrid cols={{ base: 2, sm: 3 }} spacing="md">
                <Text>• JSON</Text>
                <Text>• YAML</Text>
                <Text>• CSV</Text>
                <Text>• XML</Text>
                <Text>• TOML</Text>
              </SimpleGrid>
              <Text size="sm" c="dimmed" mt="md">
                All formats can be visualized, validated, and converted to other formats.
              </Text>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              Privacy & Security
            </Title>
            <StyledContentBody>
              <Text>
                Your privacy is our priority. All data processing happens entirely in your browser.
                We never store, transmit, or have access to your data.
              </Text>
              <Text size="sm" c="dimmed">
                You can use JSON Visualization offline once the page is loaded.
              </Text>
            </StyledContentBody>
          </Paper>
        </Stack>
      </Container>
    </Layout>
  );
};

export default Docs;
