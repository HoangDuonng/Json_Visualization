import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Loader, Stack, Text, Title } from "@mantine/core";
import styled from "styled-components";
import { ref, get } from "firebase/database";
import { getDb } from "../lib/db";
import Layout from "../layout/PageLayout";

const StyledCard = styled.div`
  background: white;
  border: 1px solid #e8e4db;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
`;

const StyledLink = styled.a`
  color: #228be6;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const RedirectPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    const code = router.query.c as string | undefined;

    if (!code) {
      setError("not_found");
      return;
    }

    const resolve = async () => {
      try {
        const db = getDb();
        const snapshot = await get(ref(db, `shortlinks/${code}`));

        if (!snapshot.exists()) {
          setError("not_found");
          return;
        }

        const data = snapshot.val();
        window.location.replace(data.url);
      } catch {
        setError("server_error");
      }
    };

    resolve();
  }, [router.isReady, router.query.c]);

  if (error) {
    return (
      <Layout>
        <Head>
          <title>Link Not Found | JSON Visualization</title>
        </Head>
        <Container size="sm" py={80}>
          <Stack align="center" gap="xl">
            <StyledCard>
              <Title order={2} mb="md" c="dark">
                {error === "not_found" ? "Link Not Found" : "Something went wrong"}
              </Title>
              <Text c="dimmed" mb="xl">
                {error === "not_found"
                  ? "This short link does not exist or has expired."
                  : "An error occurred while resolving this link."}
              </Text>
              <Link href="/shorten" passHref legacyBehavior>
                <StyledLink>Create a new short link</StyledLink>
              </Link>
            </StyledCard>
          </Stack>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Redirecting... | JSON Visualization</title>
      </Head>
      <Container size="sm" py={80}>
        <Stack align="center" gap="md">
          <Loader color="#f7c948" size="lg" />
          <Text c="dimmed">Redirecting...</Text>
        </Stack>
      </Container>
    </Layout>
  );
};

export default RedirectPage;
