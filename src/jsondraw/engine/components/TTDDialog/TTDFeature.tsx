import React from "react";

import { TTDDialog } from "./TTDDialog";
import { TTDDialogTrigger } from "./TTDDialogTrigger";
import type { TTDPersistenceAdapter, TTTDDialog } from "./types";

const TTD_STORAGE_KEY = "jsonviz-ttd-chats";

const ttdPersistenceAdapter: TTDPersistenceAdapter = {
  async loadChats() {
    if (typeof window === "undefined") {
      return [];
    }
    try {
      const raw = window.localStorage.getItem(TTD_STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [];
    } catch {
      return [];
    }
  },
  async saveChats(chats) {
    if (typeof window === "undefined") {
      return;
    }
    try {
      window.localStorage.setItem(TTD_STORAGE_KEY, JSON.stringify(chats));
    } catch {
      // ignore persistence errors
    }
  },
};

const CHAT_API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL;
const CHAT_API_KEY = process.env.NEXT_PUBLIC_CHAT_API_KEY;

const sanitizeMermaid = (text: string): string => {
  if (!text) {
    return "";
  }

  let cleaned = text;

  // Prefer content inside a ```mermaid ``` fenced block if present
  const fencedMatch = cleaned.match(/```(?:mermaid)?([\s\S]*?)```/i);
  if (fencedMatch && fencedMatch[1]) {
    cleaned = fencedMatch[1];
  } else {
    // Otherwise, just strip generic backticks / mermaid fences if they appear
    cleaned = cleaned.replace(/```mermaid/gi, "").replace(/```/g, "");
  }

  // Some models prefix a standalone "mermaid" line
  cleaned = cleaned.replace(/^\s*mermaid\s*\n/i, "");

  return cleaned.trim();
};

const handleTtdTextSubmit: TTTDDialog.onTextSubmit = async ({
  messages,
  onChunk,
  onStreamCreated,
  signal,
}) => {
  if (!CHAT_API_URL || !CHAT_API_KEY) {
    return {
      generatedResponse: "",
      rateLimit: null,
      rateLimitRemaining: null,
      error: {
        name: "ConfigError",
        message: "Chat API is not configured.",
        status: 500,
      } as any,
    };
  }

  try {
    const response = await fetch(CHAT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CHAT_API_KEY}`,
      },
      body: JSON.stringify({
        model: "thinhphoenix/nobody",
        messages: [
          {
            role: "system",
            content:
              "You are an assistant that converts natural language descriptions into valid Mermaid diagrams for JsonViz's JsonDraw canvas. Respond ONLY with Mermaid code, with NO markdown fences (no ```), no surrounding text, and do not include a standalone 'mermaid' line.",
          },
          ...messages.map(message => ({
            role: message.role,
            content: message.content,
          })),
        ],
        stream: true,
      }),
      signal,
    });

    if (!response.ok || !response.body) {
      return {
        generatedResponse: "",
        rateLimit: null,
        rateLimitRemaining: null,
        error: {
          name: "RequestError",
          message: `Request failed with status ${response.status}`,
          status: response.status,
        } as any,
      };
    }

    onStreamCreated?.();

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let accumulated = "";
    let buffer = "";

    // Stream OpenAI-style SSE chunks
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) {
          continue;
        }
        const data = line.slice(6);
        if (data === "[DONE]") {
          continue;
        }
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            accumulated += content;
            onChunk?.(content);
          }
        } catch {
          // ignore malformed JSON chunks
        }
      }
    }

    const generatedResponse = sanitizeMermaid(accumulated);

    return {
      generatedResponse,
      rateLimit: null,
      rateLimitRemaining: null,
      error: null,
    };
  } catch (error: any) {
    if (signal?.aborted) {
      return {
        generatedResponse: "",
        rateLimit: null,
        rateLimitRemaining: null,
        error: {
          name: "AbortError",
          message: "Aborted",
          status: 499,
        } as any,
      };
    }

    return {
      generatedResponse: "",
      rateLimit: null,
      rateLimitRemaining: null,
      error: {
        name: "RequestError",
        message: error?.message || "Request failed",
        status: 500,
      } as any,
    };
  }
};

export const TTDFeature: React.FC = () => {
  return (
    <>
      <TTDDialogTrigger />
      <TTDDialog onTextSubmit={handleTtdTextSubmit} persistenceAdapter={ttdPersistenceAdapter} />
    </>
  );
};

