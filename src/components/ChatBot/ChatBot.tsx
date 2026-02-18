import React from "react";
import { Modal, Stack, Text, ScrollArea } from "@mantine/core";
import styled, { keyframes } from "styled-components";
import { IoSend, IoStopCircleOutline } from "react-icons/io5";
import { MdPerson } from "react-icons/md";
import { VscSparkle } from "react-icons/vsc";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { MONO_FONT_FAMILY } from "../../constants/globalStyle";
import { Loader } from "../Loader";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

const spinGlow = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulseGlow = keyframes`
  0%,
  100% {
    opacity: 0.65;
  }
  50% {
    opacity: 0.85;
  }
`;

const StyledChatContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 560px;
  border-radius: 18px;
  padding: 16px;
  border: 1px solid rgba(139, 92, 246, 0.25);
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.98) 0%,
    rgba(14, 11, 32, 0.98) 50%,
    rgba(2, 6, 23, 0.98) 100%
  );
  overflow: hidden;
  box-shadow:
    0 0 80px rgba(139, 92, 246, 0.25),
    0 20px 60px rgba(0, 0, 0, 0.35);
  transition: box-shadow 0.35s ease;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 2px;
    border-radius: 18px;
    background: conic-gradient(from 0deg, #7c3aed, #ec4899, #06b6d4, #7c3aed);
    opacity: 0.7;
    animation: ${spinGlow} 10s linear infinite;
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    mask-composite: exclude;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 6px;
    border-radius: 14px;
    background:
      radial-gradient(ellipse at 30% 20%, rgba(139, 92, 246, 0.18) 0%, transparent 55%),
      radial-gradient(ellipse at 70% 80%, rgba(236, 72, 153, 0.12) 0%, transparent 50%),
      linear-gradient(
        180deg,
        rgba(15, 23, 42, 0.9) 0%,
        rgba(30, 27, 75, 0.9) 60%,
        rgba(2, 6, 23, 0.95) 100%
      );
    pointer-events: none;
    animation: ${pulseGlow} 6s ease-in-out infinite;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const StyledMessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 4px 2px 12px;
`;

const StyledMessageRow = styled.div<{ isUser?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  justify-content: ${props => (props.isUser ? "flex-end" : "flex-start")};
`;

const StyledAvatar = styled.div<{ isUser?: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: ${props => (props.isUser ? "#f7c948" : "#f7c948")};
  color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  flex-shrink: 0;
`;

const StyledMessageBubble = styled.div<{ isUser?: boolean }>`
  max-width: 80%;
  background: ${props => (props.isUser ? "#f7f3e6" : "#ffffff")};
  color: #1a1a1a;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid #e8e4db;
  box-shadow: ${props => (props.isUser ? "none" : "0 6px 16px rgba(17, 17, 17, 0.06)")};

  p {
    margin: 0 0 8px 0;
    line-height: 1.6;

    &:last-child {
      margin-bottom: 0;
    }
  }

  code {
    background: rgba(0, 0, 0, 0.08);
    padding: 2px 6px;
    border-radius: 6px;
    font-family: ${MONO_FONT_FAMILY} !important;
    font-size: 0.9em;
  }

  code * {
    font-family: ${MONO_FONT_FAMILY} !important;
  }

  pre {
    background: rgba(0, 0, 0, 0.08);
    padding: 12px;
    border-radius: 10px;
    overflow-x: auto;
    margin: 8px 0;
    font-family: ${MONO_FONT_FAMILY} !important;

    code {
      background: none;
      padding: 0;
      font-family: ${MONO_FONT_FAMILY} !important;
    }
  }

  pre * {
    font-family: ${MONO_FONT_FAMILY} !important;
  }

  ul,
  ol {
    margin: 8px 0;
    padding-left: 20px;
  }

  li {
    margin: 4px 0;
  }

  strong {
    font-weight: 600;
  }

  em {
    font-style: italic;
  }

  blockquote {
    border-left: 3px solid rgba(0, 0, 0, 0.1);
    padding-left: 12px;
    margin: 8px 0;
    color: rgba(0, 0, 0, 0.7);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0;
    font-size: 0.9rem;
  }

  th,
  td {
    border: 1px solid #e8e4db;
    padding: 8px 10px;
    text-align: left;
    vertical-align: top;
  }

  th {
    background: rgba(247, 243, 230, 0.8);
    font-weight: 600;
  }
`;

const StyledLoadingDots = styled.span`
  margin-left: 2px;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StyledTitle = styled(Text)`
  font-size: 1rem;
  font-weight: 600;
  color: #111111;
`;

const StyledSubtitle = styled(Text)`
  font-size: 0.8rem;
  color: #6b7280;
`;

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

interface ChatBotProps {
  opened: boolean;
  onClose: () => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({ opened, onClose }) => {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I help you with JSON Visualization?",
      isUser: false,
    },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);

  const placeholders = [
    "How do I convert JSON to CSV?",
    "What is JSON Schema validation?",
    "How to use JSONPath queries?",
    "Explain jq query syntax",
    "How to export visualization as image?",
  ];

  React.useEffect(() => {
    if (!viewportRef.current) return;
    requestAnimationFrame(() => {
      if (!viewportRef.current) return;
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: "auto",
      });
    });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    // Create placeholder for streaming
    const botMessageId = (Date.now() + 1).toString();
    const botMessage: Message = {
      id: botMessageId,
      text: "",
      isUser: false,
    };
    setMessages(prev => [...prev, botMessage]);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_CHAT_API_URL || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CHAT_API_KEY}`,
        },
        body: JSON.stringify({
          model: "thinhphoenix/nobody",
          messages: [
            {
              role: "system",
              content:
                "You are the official assistant for JSON Visualization (JsonViz). Help users with how-to questions about the app: pasting/importing JSON, formatting/pretty-printing, Graph/Tree/JsonDraw views, search, JSONPath, jq, schema validation, conversions (JSON/YAML/CSV/XML), exporting, sharing, and troubleshooting errors. Explain JsonDraw as the freeform drawing canvas built from the JSON graph (autosaves locally; use Clear Drawing to reload from JSON). Use concise, friendly answers and format responses in markdown. If a question is outside JsonViz or general data/JSON tooling, politely say you only support JsonViz-related questions and ask them to rephrase around JsonViz.",
            },
            {
              role: "user",
              content: currentInput,
            },
          ],
          stream: true,
        }),
      });

      if (!response.ok || !response.body) throw new Error("Failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulatedText = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                accumulatedText += content;
                setMessages(prev =>
                  prev.map(msg =>
                    msg.id === botMessageId ? { ...msg, text: accumulatedText } : msg
                  )
                );
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }

      if (!accumulatedText) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === botMessageId ? { ...msg, text: "Sorry, I couldn't process that." } : msg
          )
        );
      }
    } catch {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === botMessageId
            ? { ...msg, text: "Sorry, there was an error connecting to the chat service." }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      radius="md"
      title={
        <StyledHeader>
          <StyledTitle>JsonViz Assistant</StyledTitle>
          <StyledSubtitle>Ask about formatting, queries, conversions, or exports.</StyledSubtitle>
        </StyledHeader>
      }
      styles={{
        header: { paddingBottom: 12, borderBottom: "1px solid #e8e4db" },
        body: { paddingTop: 16 },
      }}
    >
      <StyledChatContainer>
        <ScrollArea viewportRef={viewportRef} style={{ flex: 1 }} mb="md">
          <StyledMessageList>
            {messages.map(msg => (
              <StyledMessageRow key={msg.id} isUser={msg.isUser}>
                {!msg.isUser && (
                  <StyledAvatar>
                    <VscSparkle size={16} />
                  </StyledAvatar>
                )}
                <StyledMessageBubble isUser={msg.isUser}>
                  {msg.isUser ? (
                    <Text size="sm" c="dark">
                      {msg.text}
                    </Text>
                  ) : msg.text ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          flexShrink: 0,
                          alignSelf: "center",
                        }}
                      >
                        <Loader />
                      </div>
                      <Text size="sm" c="dimmed" style={{ lineHeight: 1 }}>
                        Thinking<StyledLoadingDots>...</StyledLoadingDots>
                      </Text>
                    </div>
                  )}
                </StyledMessageBubble>
                {msg.isUser && (
                  <StyledAvatar isUser>
                    <MdPerson size={16} />
                  </StyledAvatar>
                )}
              </StyledMessageRow>
            ))}
            <div ref={messagesEndRef} />
          </StyledMessageList>
        </ScrollArea>

        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          value={input}
          onChange={e => setInput(e.target.value)}
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          disabled={loading}
          loading={loading}
          sendIcon={<IoSend size={18} />}
          stopIcon={<IoStopCircleOutline size={20} />}
        />
      </StyledChatContainer>
    </Modal>
  );
};
