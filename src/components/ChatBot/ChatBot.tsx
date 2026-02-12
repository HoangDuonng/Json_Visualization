import React from "react";
import { Modal, Stack, Text, ScrollArea } from "@mantine/core";
import styled from "styled-components";
import { IoSend, IoStopCircleOutline } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import { MONO_FONT_FAMILY } from "../../constants/globalStyle";
import { Loader } from "../Loader";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

const StyledChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
`;

const StyledMessageBubble = styled.div<{ isUser?: boolean }>`
  max-width: 80%;
  align-self: ${props => (props.isUser ? "flex-end" : "flex-start")};
  background: ${props => (props.isUser ? "#37ff8b" : "#f7f3e6")};
  color: #1a1a1a;
  padding: 12px;
  border-radius: 8px;

  p {
    margin: 0 0 8px 0;
    line-height: 1.6;

    &:last-child {
      margin-bottom: 0;
    }
  }

  code {
    background: rgba(0, 0, 0, 0.05);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: ${MONO_FONT_FAMILY};
    font-size: 0.9em;
  }

  pre {
    background: rgba(0, 0, 0, 0.05);
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
    margin: 8px 0;

    code {
      background: none;
      padding: 0;
      font-family: ${MONO_FONT_FAMILY};
    }
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
`;

const StyledLoadingDots = styled.span`
  margin-left: 2px;
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

  const placeholders = [
    "How do I convert JSON to CSV?",
    "What is JSON Schema validation?",
    "How to use JSONPath queries?",
    "Explain jq query syntax",
    "How to export visualization as image?",
  ];

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
                "You are a helpful assistant for JSON Visualization documentation. Help users understand features and answer questions about JSON, YAML, CSV visualization and conversion. Format your responses in markdown.",
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
    <Modal opened={opened} onClose={onClose} title="Chat Assistant" size="lg">
      <StyledChatContainer>
        <ScrollArea style={{ flex: 1 }} mb="md">
          <Stack gap="sm">
            {messages.map(msg => (
              <StyledMessageBubble key={msg.id} isUser={msg.isUser}>
                {msg.isUser ? (
                  <Text size="sm">{msg.text}</Text>
                ) : msg.text ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                    <div
                      style={{ width: "16px", height: "16px", flexShrink: 0, alignSelf: "center" }}
                    >
                      <Loader />
                    </div>
                    <Text size="sm" c="dimmed" style={{ lineHeight: 1 }}>
                      Thinking<StyledLoadingDots>...</StyledLoadingDots>
                    </Text>
                  </div>
                )}
              </StyledMessageBubble>
            ))}
            <div ref={messagesEndRef} />
          </Stack>
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
