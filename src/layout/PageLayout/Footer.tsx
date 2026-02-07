import React from "react";
import Link from "next/link";
import { Anchor, Container, Divider, Flex, Stack, Text, ThemeIcon } from "@mantine/core";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GithubButton } from "../../components/GithubButton";
import { JSONCrackLogo } from "../JsonCrackLogo";

interface FooterProps {
  stars?: number;
}

export const Footer: React.FC<FooterProps> = ({ stars = 0 }) => {
  return (
    <Container w="100%" mt={60} px={60} pb="xl" bg="black" fluid>
      <Divider color="gray.3" mb="xl" mx={-60} />
      <Flex justify="space-between">
        <Stack gap={4} visibleFrom="sm">
          <JSONCrackLogo style={{ color: "white" }} />
          <Anchor href="mailto:hoangduong@nguuyen.io.vn" fz="xs" c="dimmed">
            hoangduong@nguuyen.io.vn
          </Anchor>
        </Stack>
        <Flex gap={60} visibleFrom="sm">
          <Stack gap="xs">
            <Text fz="sm" c="white">
              Product
            </Text>
            <Anchor
              href="https://github.com/HoangDuonng/Json_Visualization"
              fz="sm"
              c="gray.5"
              target="_blank"
              rel="noopener"
            >
              Open Source
            </Anchor>
            <GithubButton
              stars={stars}
              href="https://github.com/HoangDuonng/Json_Visualization"
            />
          </Stack>
          <Stack gap="xs">
            <Text fz="sm" c="white">
              Resources
            </Text>
            <Anchor component={Link} prefetch={false} fz="sm" c="gray.5" href="/#faq">
              FAQ
            </Anchor>
            <Anchor component={Link} prefetch={false} fz="sm" c="gray.5" href="/docs">
              Docs
            </Anchor>
          </Stack>
          <Stack gap="xs">
            <Text fz="sm" c="white">
              Social
            </Text>
            <Flex gap="xs">
              <Anchor
                aria-label="LinkedIn"
                href="https://www.linkedin.com/in/hoangduonng/"
                fz="sm"
                rel="noopener"
              >
                <ThemeIcon variant="transparent" color="gray.5">
                  <FaLinkedin size={20} />
                </ThemeIcon>
              </Anchor>
              <Anchor aria-label="X" fz="sm" href="https://x.com/HoanggDuonng" rel="noopener">
                <ThemeIcon variant="transparent" color="gray.5">
                  <FaXTwitter size={20} />
                </ThemeIcon>
              </Anchor>
              <Anchor
                aria-label="GitHub"
                href="https://github.com/HoangDuonng"
                fz="sm"
                rel="noopener"
              >
                <ThemeIcon variant="transparent" color="gray.5">
                  <FaGithub size={20} />
                </ThemeIcon>
              </Anchor>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
      <Flex gap="xl">
        <Text fz="sm" c="dimmed">
          © {new Date().getFullYear()} JSON Visualization
        </Text>
        <Anchor component={Link} prefetch={false} fz="sm" c="dimmed" href="/legal/terms">
          <Text fz="sm" c="dimmed">
            Terms
          </Text>
        </Anchor>
        <Anchor component={Link} prefetch={false} fz="sm" c="dimmed" href="/legal/privacy">
          <Text fz="sm" c="dimmed">
            Privacy
          </Text>
        </Anchor>
      </Flex>
    </Container>
  );
};
