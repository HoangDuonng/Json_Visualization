import React, { useState, useCallback, useEffect } from "react";
import Head from "next/head";
import { Text, TextInput, CopyButton, ActionIcon, Tooltip } from "@mantine/core";
import styled from "styled-components";
import { ref, set } from "firebase/database";
import { nanoid } from "nanoid";
import { generateNextSeo } from "next-seo/pages";
import { IoLink, IoCopyOutline, IoCheckmark, IoOpenOutline } from "react-icons/io5";
import { toast } from "sonner";
import { SEO, SITE_URL } from "../constants/seo";
import Layout from "../layout/PageLayout";
import { PublicContainer, PublicEyebrow, PublicToolHeader } from "../layout/PageLayout/PublicPage";
import { getDb } from "../lib/db";

const StyledWorkspace = styled.section`
  padding-block: clamp(2rem, 5vw, 4rem);
  border-bottom: 1px solid var(--public-border);
`;

const StyledForm = styled.div`
  width: 100%;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--public-border);

  @media (max-width: 600px) {
    padding-bottom: 1.5rem;
  }
`;

const StyledInputGroup = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const StyledShortenButton = styled.button`
  background: var(--public-accent);
  color: var(--public-accent-contrast);
  border: 1px solid var(--public-accent);
  border-radius: var(--public-radius-sm);
  padding: 10px 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  height: 42px;
  font-family: inherit;

  &:hover:not(:disabled) {
    background: var(--public-accent-hover);
    border-color: var(--public-accent-hover);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledResultCard = styled.div`
  padding-top: 2rem;
`;

const StyledShortUrl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-top: 1px solid var(--public-border-strong);
  border-bottom: 1px solid var(--public-border-strong);
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  color: var(--public-text);
  word-break: break-all;
`;

const StyledOriginalUrl = styled(Text)<any>`
  word-break: break-all;
`;

const StyledHistorySection = styled.div`
  padding-block: 2.5rem;
`;

const StyledHistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 1rem 0;
  border-bottom: 1px solid var(--public-border);
`;

const StyledHistoryUrl = styled.div`
  flex: 1;
  min-width: 0;
`;

const StyledHistoryShort = styled.a`
  color: var(--public-text);
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
    text-decoration-color: var(--public-accent);
    text-decoration-thickness: 1px;
  }
`;

const StyledHistoryOriginal = styled(Text)<any>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface ShortenResult {
  code: string;
  shortUrl: string;
  originalUrl: string;
  createdAt: number;
}

const HISTORY_KEY = "jsonviz_shorten_history";

const getHistory = (): ShortenResult[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveHistory = (items: ShortenResult[]) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, 20)));
};

const isValidUrl = (str: string): boolean => {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const ShortenPage = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ShortenResult | null>(null);
  const [history, setHistory] = useState<ShortenResult[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleShorten = useCallback(async () => {
    const trimmed = url.trim();
    if (!trimmed) {
      toast.error("Please enter a URL.");
      return;
    }

    const normalizedUrl = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;

    if (!isValidUrl(normalizedUrl)) {
      toast.error("Invalid URL format.");
      return;
    }

    setLoading(true);
    try {
      const db = getDb();
      const code = nanoid(7);
      const record = {
        url: normalizedUrl,
        createdAt: Date.now(),
      };

      await set(ref(db, `shortlinks/${code}`), record);

      const origin = typeof window !== "undefined" ? window.location.origin : SITE_URL;
      const shortUrl = `${origin}/s?c=${code}`;
      const newResult: ShortenResult = {
        code,
        shortUrl,
        originalUrl: normalizedUrl,
        createdAt: Date.now(),
      };

      setResult(newResult);
      setUrl("");

      const updated = [newResult, ...history.filter(h => h.originalUrl !== normalizedUrl)];
      setHistory(updated);
      saveHistory(updated);

      toast.success("Short link created!");
    } catch (error: any) {
      console.error("Shorten error:", error);
      toast.error(
        error?.message?.includes("Database configuration")
          ? "URL shortener is not configured. Please set up Database."
          : "Failed to create short link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [url, history]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleShorten();
    }
  };

  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: "URL Shortener - JSON Visualization",
          description:
            "Shorten long URLs for free. Create short, shareable links powered by JSON Visualization.",
          canonical: "https://jsonviz.online/shorten",
        })}
      </Head>

      <PublicContainer>
        <PublicToolHeader>
          <div>
            <PublicEyebrow>Utility</PublicEyebrow>
            <h1>URL Shortener</h1>
            <p>Shorten long URLs into clean, shareable links.</p>
          </div>
        </PublicToolHeader>
        <StyledWorkspace>
          <StyledForm>
            <StyledInputGroup>
              <TextInput
                flex={1}
                placeholder="Paste your long URL here..."
                value={url}
                onChange={e => setUrl(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
                leftSection={<IoLink size={18} />}
                size="md"
                styles={{
                  input: {
                    borderColor: "var(--public-border-strong)",
                    background: "var(--public-surface)",
                    color: "var(--public-text)",
                  },
                }}
              />
              <StyledShortenButton onClick={handleShorten} disabled={loading}>
                {loading ? "Shortening..." : "Shorten"}
              </StyledShortenButton>
            </StyledInputGroup>

            {result && (
              <StyledResultCard>
                <Text size="xs" c="dimmed" mb={8} tt="uppercase" fw={600}>
                  Your short link
                </Text>
                <StyledShortUrl>
                  <span style={{ flex: 1 }}>{result.shortUrl}</span>
                  <CopyButton value={result.shortUrl}>
                    {({ copied, copy }) => (
                      <Tooltip label={copied ? "Copied!" : "Copy"}>
                        <ActionIcon
                          variant="subtle"
                          color={copied ? "teal" : "gray"}
                          onClick={copy}
                        >
                          {copied ? <IoCheckmark size={18} /> : <IoCopyOutline size={18} />}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                  <Tooltip label="Open">
                    <ActionIcon
                      variant="subtle"
                      color="blue"
                      component="a"
                      href={result.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IoOpenOutline size={18} />
                    </ActionIcon>
                  </Tooltip>
                </StyledShortUrl>
                <StyledOriginalUrl size="xs" c="dimmed" mt={8}>
                  {result.originalUrl}
                </StyledOriginalUrl>
              </StyledResultCard>
            )}
          </StyledForm>

          {history.length > 0 && (
            <StyledHistorySection>
              <Text size="sm" fw={600} c="dark" mb="sm">
                Recent links
              </Text>
              {history.map(item => (
                <StyledHistoryItem key={item.code}>
                  <StyledHistoryUrl>
                    <StyledHistoryShort
                      href={item.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.shortUrl}
                    </StyledHistoryShort>
                    <StyledHistoryOriginal size="xs" c="dimmed">
                      {item.originalUrl}
                    </StyledHistoryOriginal>
                  </StyledHistoryUrl>
                  <CopyButton value={item.shortUrl}>
                    {({ copied, copy }) => (
                      <Tooltip label={copied ? "Copied!" : "Copy"}>
                        <ActionIcon
                          variant="subtle"
                          color={copied ? "teal" : "gray"}
                          onClick={copy}
                          size="sm"
                        >
                          {copied ? <IoCheckmark size={16} /> : <IoCopyOutline size={16} />}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                </StyledHistoryItem>
              ))}
            </StyledHistorySection>
          )}
        </StyledWorkspace>
      </PublicContainer>
    </Layout>
  );
};

export default ShortenPage;
