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

const JsonSchemaDocs = () => {
  const { t } = useTranslation("docs");

  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: `${t("jsonSchema.title")} Documentation - JSON Visualization`,
          description: t("jsonSchema.subtitle"),
          canonical: "https://jsonvisualization.nguuyen.io.vn/docs/json-schema",
        })}
      </Head>
      <Container size="lg" py={60}>
        <Stack gap="xl">
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
          >
            <div>
              <Title order={1} c="dark" mb="sm">
                {t("jsonSchema.title")}
              </Title>
              <Text size="lg" c="dimmed">
                {t("jsonSchema.subtitle")}
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
            {t("jsonSchema.alert")}
          </Alert>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("jsonSchema.whatIsTitle")}
            </Title>
            <StyledContentBody>
              <Text>{t("jsonSchema.whatIsDesc")}</Text>
              <Text>{t("jsonSchema.whatIsUsage")}</Text>
              <Text>• {t("jsonSchema.usage1")}</Text>
              <Text>• {t("jsonSchema.usage2")}</Text>
              <Text>• {t("jsonSchema.usage3")}</Text>
              <Text>• {t("jsonSchema.usage4")}</Text>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("jsonSchema.howToUseTitle")}
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="xs">
                  {t("jsonSchema.step1")}
                </Text>
                <Text>
                  {t("jsonSchema.step1Desc")}{" "}
                  <StyledLink href="/editor">{t("common.editor")}</StyledLink>.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("jsonSchema.step2")}
                </Text>
                <Text>{t("jsonSchema.step2Desc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("jsonSchema.step3")}
                </Text>
                <Text>{t("jsonSchema.step3Desc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("jsonSchema.step4")}
                </Text>
                <Text>{t("jsonSchema.step4Desc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("jsonSchema.step5")}
                </Text>
                <Text>{t("jsonSchema.step5Desc")}</Text>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("jsonSchema.basicSchemaTitle")}
            </Title>
            <StyledContentBody>
              <Text>{t("jsonSchema.basicSchemaDesc")}</Text>
              <StyledCodeBlock>
                {`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Product",
  "description": "A product from the catalog",
  "type": "object",
  "properties": {
    "id": {
      "description": "The unique identifier for a product",
      "type": "integer"
    },
    "name": {
      "description": "Name of the product",
      "type": "string"
    },
    "price": {
      "description": "The price of the product",
      "type": "number",
      "minimum": 0
    }
  },
  "required": ["id", "name", "price"]
}`}
              </StyledCodeBlock>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("jsonSchema.commonKeywordsTitle")}
            </Title>
            <StyledContentBody>
              <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>{t("jsonSchema.tableKeyword")}</Table.Th>
                    <Table.Th>{t("jsonSchema.tableDescription")}</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>$schema</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.schemaKeywordDesc")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>title</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.titleKeywordDesc")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>description</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.descriptionKeywordDesc")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>type</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.typeKeywordDesc")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>properties</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.propertiesKeywordDesc")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>required</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.requiredKeywordDesc")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>enum</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.enumKeywordDesc")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>minimum</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.minimumKeywordDesc")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>maximum</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.maximumKeywordDesc")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>minLength</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Minimum length for strings</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>maxLength</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Maximum length for strings</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>pattern</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Regular expression pattern for strings</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>items</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Schema for array items</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>minItems</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Minimum number of items in array</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>maxItems</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>Maximum number of items in array</Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("jsonSchema.practicalExamplesTitle")}
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="xs">
                  Example 1: Simple User Schema
                </Text>
                <StyledCodeBlock>
                  {`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "User",
  "type": "object",
  "properties": {
    "username": {
      "type": "string",
      "minLength": 3,
      "maxLength": 20
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 120
    }
  },
  "required": ["username", "email"]
}`}
                </StyledCodeBlock>
                <Text c="dimmed" size="sm" mt="xs">
                  Valid JSON:
                </Text>
                <StyledCodeBlock>
                  {`{
  "username": "john_doe",
  "email": "john@example.com",
  "age": 30
}`}
                </StyledCodeBlock>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 2: Product with Enum
                </Text>
                <StyledCodeBlock>
                  {`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Product",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "category": {
      "type": "string",
      "enum": ["electronics", "clothing", "food", "books"]
    },
    "price": {
      "type": "number",
      "minimum": 0
    },
    "inStock": {
      "type": "boolean"
    }
  },
  "required": ["name", "category", "price"]
}`}
                </StyledCodeBlock>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 3: Array of Objects
                </Text>
                <StyledCodeBlock>
                  {`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Users List",
  "type": "object",
  "properties": {
    "users": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer"
          },
          "name": {
            "type": "string"
          }
        },
        "required": ["id", "name"]
      },
      "minItems": 1
    }
  },
  "required": ["users"]
}`}
                </StyledCodeBlock>
                <Text c="dimmed" size="sm" mt="xs">
                  Valid JSON:
                </Text>
                <StyledCodeBlock>
                  {`{
  "users": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ]
}`}
                </StyledCodeBlock>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 4: Nested Objects
                </Text>
                <StyledCodeBlock>
                  {`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Person",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "address": {
      "type": "object",
      "properties": {
        "street": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "zipCode": {
          "type": "string",
          "pattern": "^[0-9]{5}$"
        }
      },
      "required": ["street", "city", "zipCode"]
    }
  },
  "required": ["name", "address"]
}`}
                </StyledCodeBlock>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 5: String Pattern Validation
                </Text>
                <StyledCodeBlock>
                  {`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Contact",
  "type": "object",
  "properties": {
    "phone": {
      "type": "string",
      "pattern": "^\\\\+?[1-9]\\\\d{1,14}$",
      "description": "Phone number in E.164 format"
    },
    "website": {
      "type": "string",
      "format": "uri"
    }
  }
}`}
                </StyledCodeBlock>
              </div>

              <Divider my="md" />

              <div>
                <Text fw={600} mb="xs">
                  Example 6: Advanced Schema with Definitions
                </Text>
                <Text c="dimmed" size="sm" mb="xs">
                  {t("jsonSchema.example6Desc")}
                </Text>
                <StyledCodeBlock>
                  {`{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Vehicle",
  "type": "object",
  "properties": {
    "vehicle": {
      "$ref": "#/definitions/VehicleType"
    }
  },
  "definitions": {
    "VehicleType": {
      "type": "object",
      "description": "A conveyance designed to carry an operator, passengers and/or cargo",
      "properties": {
        "identification": {
          "$ref": "#/definitions/IdentificationType"
        },
        "msrpAmount": {
          "$ref": "#/definitions/AmountType"
        },
        "axleQuantity": {
          "type": "integer",
          "minimum": 0,
          "description": "Number of axles"
        }
      },
      "required": ["identification"]
    },
    "IdentificationType": {
      "type": "object",
      "description": "A unique identification",
      "properties": {
        "id": {
          "type": "string",
          "description": "An identifier"
        }
      },
      "required": ["id"]
    },
    "AmountType": {
      "type": "object",
      "description": "An amount of money",
      "properties": {
        "amount": {
          "type": "number",
          "minimum": 0
        },
        "currency": {
          "type": "string",
          "enum": ["USD", "EUR", "GBP"],
          "description": "Currency code"
        }
      },
      "required": ["amount", "currency"]
    }
  }
}`}
                </StyledCodeBlock>
                <Text c="dimmed" size="sm" mt="xs">
                  Valid JSON:
                </Text>
                <StyledCodeBlock>
                  {`{
  "vehicle": {
    "identification": {
      "id": "VIN123456789"
    },
    "msrpAmount": {
      "amount": 25000,
      "currency": "USD"
    },
    "axleQuantity": 2
  }
}`}
                </StyledCodeBlock>
              </div>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              Using Definitions and References
            </Title>
            <StyledContentBody>
              <Text>
                {t("jsonSchema.definitionsDesc1")} <StyledInlineCode>definitions</StyledInlineCode>{" "}
                {t("jsonSchema.definitionsDesc2")} <StyledInlineCode>$ref</StyledInlineCode>.
              </Text>
              <Text fw={600} mt="md" mb="xs">
                Benefits:
              </Text>
              <Text>• {t("jsonSchema.benefit1Def")}</Text>
              <Text>• {t("jsonSchema.benefit2Def")}</Text>
              <Text>• {t("jsonSchema.benefit3Def")}</Text>
              <Text>• {t("jsonSchema.benefit4Def")}</Text>
              <Text fw={600} mt="md" mb="xs">
                Example:
              </Text>
              <StyledCodeBlock>
                {`{
  "definitions": {
    "Address": {
      "type": "object",
      "properties": {
        "street": { "type": "string" },
        "city": { "type": "string" }
      }
    }
  },
  "properties": {
    "billingAddress": {
      "$ref": "#/definitions/Address"
    },
    "shippingAddress": {
      "$ref": "#/definitions/Address"
    }
  }
}`}
              </StyledCodeBlock>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("jsonSchema.dataTypesTitle")}
            </Title>
            <StyledContentBody>
              <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>{t("jsonSchema.tableType")}</Table.Th>
                    <Table.Th>{t("jsonSchema.tableDescription")}</Table.Th>
                    <Table.Th>{t("jsonSchema.tableExample")}</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>string</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.stringTypeDesc")}</Table.Td>
                    <Table.Td>
                      <StyledInlineCode>&quot;hello&quot;</StyledInlineCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>number</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.numberTypeDesc")}</Table.Td>
                    <Table.Td>
                      <StyledInlineCode>42</StyledInlineCode>,{" "}
                      <StyledInlineCode>3.14</StyledInlineCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>integer</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.integerTypeDesc")}</Table.Td>
                    <Table.Td>
                      <StyledInlineCode>42</StyledInlineCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>boolean</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.booleanTypeDesc")}</Table.Td>
                    <Table.Td>
                      <StyledInlineCode>true</StyledInlineCode>,{" "}
                      <StyledInlineCode>false</StyledInlineCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>object</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.objectTypeDesc")}</Table.Td>
                    <Table.Td>
                      <StyledInlineCode>{'{"key": "value"}'}</StyledInlineCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>array</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.arrayTypeDesc")}</Table.Td>
                    <Table.Td>
                      <StyledInlineCode>[1, 2, 3]</StyledInlineCode>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>null</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.nullTypeDesc")}</Table.Td>
                    <Table.Td>
                      <StyledInlineCode>null</StyledInlineCode>
                    </Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("jsonSchema.stringFormatsTitle")}
            </Title>
            <StyledContentBody>
              <Text mb="md">{t("jsonSchema.stringFormatsDesc")}</Text>
              <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>{t("jsonSchema.tableFormat")}</Table.Th>
                    <Table.Th>{t("jsonSchema.tableDescription")}</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>date-time</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.dateTimeFormatDesc")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>date</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.dateFormatDesc")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>time</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.timeFormatDesc")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>email</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.emailFormatDesc")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>uri</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.uriFormatDesc")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>hostname</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.hostnameFormatDesc")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>ipv4</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.ipv4FormatDesc")}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <StyledInlineCode>ipv6</StyledInlineCode>
                    </Table.Td>
                    <Table.Td>{t("jsonSchema.ipv6FormatDesc")}</Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </StyledContentBody>
          </Paper>

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("jsonSchema.tipsTitle")}
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600}>{t("jsonSchema.tip0")}</Text>
                <Text>{t("jsonSchema.tip0Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>{t("jsonSchema.tipUseDesc")}</Text>
                <Text>
                  {t("jsonSchema.tipUseDescText1")} <StyledInlineCode>description</StyledInlineCode>{" "}
                  {t("jsonSchema.tipUseDescText2")}
                </Text>
              </div>
              <div>
                <Text fw={600}>{t("jsonSchema.tip1")}</Text>
                <Text>{t("jsonSchema.tip1Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>{t("jsonSchema.tip2")}</Text>
                <Text>{t("jsonSchema.tip2Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>{t("jsonSchema.tip3")}</Text>
                <Text>{t("jsonSchema.tip3Desc")}</Text>
              </div>
              <div>
                <Text fw={600}>{t("jsonSchema.tip4")}</Text>
                <Text>{t("jsonSchema.tip4Desc")}</Text>
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

export default JsonSchemaDocs;
