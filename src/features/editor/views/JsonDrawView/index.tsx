import React from "react";
import {
  Box,
  LoadingOverlay,
  Modal,
  Text,
  Stack,
  Button,
  TextInput,
  ActionIcon,
} from "@mantine/core";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { FiCopy, FiCheck, FiLock, FiX } from "react-icons/fi";
import useConfig from "../../../../store/useConfig";
import useGraph from "../GraphView/stores/useGraph";
import { jsonToJsonDrawElements } from "./jsonToJsonDraw";
import { encodeDataToUrlHash, decodeDataFromUrlHash } from "./shareLinkUtils";

const StyledJsonDrawWrapper = styled.div<{ $ready: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  opacity: ${({ $ready }) => ($ready ? 1 : 0)};
  transition: opacity 0.2s ease;

  .jsondraw-wrapper {
    width: 100%;
    height: 100%;
  }
`;

export const JsonDrawView = () => {
  const nodes = useGraph(state => state.nodes);
  const edges = useGraph(state => state.edges);
  const darkmodeEnabled = useConfig(state => state.darkmodeEnabled);

  const [JsonDrawModule, setJsonDrawModule] = React.useState<{
    JsonDraw: React.ComponentType<any>;
  } | null>(null);
  const [drawReady, setDrawReady] = React.useState(false);

  const jsonDrawAPIRef = React.useRef<any>(null);
  const hasInitialized = React.useRef(false);
  const hasUserDrawing = React.useRef(false);
  const [showClearModal, setShowClearModal] = React.useState(false);
  const [hasImage, setHasImage] = React.useState(false);

  // Share Modal states
  const [showShareModal, setShowShareModal] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState("");
  const [justCopied, setJustCopied] = React.useState(false);
  const copyTimerRef = React.useRef<number | null>(null);

  // Auto-save to localStorage
  const handleChange = React.useCallback((elements: any, appState: any, files: any) => {
    hasUserDrawing.current = true;

    const imgExists = elements.some((el: any) => el.type === "image" && !el.isDeleted);
    setHasImage(prev => (prev !== imgExists ? imgExists : prev));

    try {
      localStorage.setItem(
        "jsondraw-autosave",
        JSON.stringify({ elements, appState: { theme: appState.theme, zoom: appState.zoom } })
      );
    } catch (error) {
      console.warn("Failed to save to localStorage:", error);
    }
  }, []);

  // Set font asset path before loading JsonDraw
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.JSONDRAW_ASSET_PATH = "/jsondraw-fonts/"; // Keep asset path for now as fonts are there
    }
  }, []);

  // Dynamic import to avoid SSR issues (Canvas API is client-only)
  React.useEffect(() => {
    import("../../../../jsondraw").then(mod => {
      setJsonDrawModule({ JsonDraw: mod.JsonDraw });
      setDrawReady(false);
    });
  }, []);

  const scrollToContent = React.useCallback((api: any, delay = 120) => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        api.scrollToContent(undefined, { fitToViewport: true, viewportZoomFactor: 0.8 });
        setDrawReady(true);
      }, delay);
    });
  }, []);

  // Update scene elements when nodes/edges change AFTER API is ready
  // BUT only if user hasn't drawn anything yet
  React.useEffect(() => {
    const api = jsonDrawAPIRef.current;
    if (!api || nodes.length === 0 || hasUserDrawing.current) return;

    const elements = jsonToJsonDrawElements(nodes, edges);
    api.updateScene({ elements });
    scrollToContent(api, 80);
  }, [nodes, edges, scrollToContent]);

  const handleJsonDrawAPI = React.useCallback(
    (api: any) => {
      jsonDrawAPIRef.current = api;

      // Check URL for share link first
      if (typeof window !== "undefined" && window.location.hash.startsWith("#data=")) {
        const decoded = decodeDataFromUrlHash(window.location.hash);
        if (decoded && decoded.elements) {
          hasUserDrawing.current = true;
          hasInitialized.current = true;
          setDrawReady(false);
          requestAnimationFrame(() => {
            api.updateScene({ elements: decoded.elements, appState: decoded.appState });
            scrollToContent(api, 120);
          });
          return;
        }
      }

      // Try to restore from localStorage first
      const saved = localStorage.getItem("jsondraw-autosave");
      if (saved) {
        try {
          const { elements, appState } = JSON.parse(saved);
          hasUserDrawing.current = true;
          setDrawReady(false);
          requestAnimationFrame(() => {
            api.updateScene({ elements, appState });
            scrollToContent(api, 120);
          });
          return;
        } catch (error) {
          console.warn("Failed to restore from localStorage:", error);
        }
      }

      // Set initial elements from JSON only if no saved drawing
      if (nodes.length > 0 && !hasInitialized.current) {
        hasInitialized.current = true;
        const elements = jsonToJsonDrawElements(nodes, edges);
        setDrawReady(false);

        requestAnimationFrame(() => {
          api.updateScene({ elements });
          scrollToContent(api, 200);
        });
      }
    },
    [nodes, edges, scrollToContent]
  );

  const handleClearDrawing = React.useCallback(() => {
    if (!jsonDrawAPIRef.current) return;

    localStorage.removeItem("jsondraw-autosave");
    hasUserDrawing.current = false;
    hasInitialized.current = false;

    const elements = jsonToJsonDrawElements(nodes, edges);
    jsonDrawAPIRef.current.updateScene({ elements });
    setDrawReady(false);
    scrollToContent(jsonDrawAPIRef.current, 120);

    setShowClearModal(false);
    toast.success("Drawing cleared! Loaded JSON visualization.");
  }, [nodes, edges, scrollToContent]);

  const handleCopyLink = React.useCallback(() => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setJustCopied(true);
        if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
        copyTimerRef.current = window.setTimeout(() => setJustCopied(false), 3000) as any;
      })
      .catch(() => toast.error("Failed to copy link."));
  }, [shareUrl]);

  const handleShareClick = React.useCallback(() => {
    const api = jsonDrawAPIRef.current;
    if (!api) return;

    const elements = api.getSceneElementsIncludingDeleted();
    const appState = api.getAppState();

    // Create compressed URL hash
    const hash = encodeDataToUrlHash(elements, appState);
    const url = `${window.location.origin}${window.location.pathname}${hash}`;

    setShareUrl(url);
    setShowShareModal(true);

    // Warn if length is over 8000
    if (url.length > 8000) {
      toast.error("Shareable link is too large! Trình duyệt có thể sẽ không mở được đầy đủ.", {
        duration: 5000,
      });
    }
  }, []);

  if (!JsonDrawModule) {
    return (
      <Box pos="relative" h="100%" w="100%">
        <LoadingOverlay visible />
      </Box>
    );
  }

  const { JsonDraw } = JsonDrawModule;

  return (
    <Box pos="relative" h="100%" w="100%">
      <LoadingOverlay visible={!drawReady} />
      <Modal
        opened={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Clear Drawing Session"
        centered
      >
        <Stack gap="md">
          <Text>
            This will <strong>permanently delete</strong> your current drawing session and load a
            fresh visualization from the JSON data.
          </Text>
          <Text c="dimmed" size="sm">
            Make sure to save your work first. Your current drawing will be lost and cannot be
            recovered.
          </Text>
          <Box style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
            <Button variant="default" onClick={() => setShowClearModal(false)}>
              Cancel
            </Button>
            <Button color="red" onClick={handleClearDrawing}>
              Clear & Load JSON
            </Button>
          </Box>
        </Stack>
      </Modal>

      <Modal
        opened={showShareModal}
        onClose={() => setShowShareModal(false)}
        title={null}
        withCloseButton={false}
        centered
        size="md"
        padding="xl"
        radius="lg"
        styles={{
          content: {
            backgroundColor: darkmodeEnabled ? "#121212" : "#ffffff",
          },
        }}
      >
        <Stack gap="lg">
          <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Text fw={700} size="xl" style={{ fontFamily: "Assistant, sans-serif" }}>
              Shareable link
            </Text>
            <ActionIcon variant="subtle" color="gray" onClick={() => setShowShareModal(false)}>
              <FiX size={20} />
            </ActionIcon>
          </Box>
          <Box style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
            <TextInput
              label="Link"
              readOnly
              value={shareUrl}
              style={{ flex: 1 }}
              styles={{
                input: {
                  backgroundColor: darkmodeEnabled ? "rgba(255,255,255,0.05)" : "#f3f4f6",
                  border: "none",
                  boxShadow: "none",
                  height: 40,
                },
                label: {
                  marginBottom: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  color: darkmodeEnabled ? "#a3a3a3" : "#4b5563",
                },
              }}
              onClick={e => (e.target as HTMLInputElement).select()}
            />
            <Button
              size="md"
              leftSection={justCopied ? <FiCheck size={18} /> : <FiCopy size={18} />}
              color={justCopied ? "teal" : "violet"}
              onClick={handleCopyLink}
              style={{
                height: 40,
                minWidth: 120,
                transition: "background-color 0.2s",
              }}
            >
              Copy link
            </Button>
          </Box>
          <Box
            style={{
              borderTop: `1px solid ${darkmodeEnabled ? "#333" : "#e5e7eb"}`,
              paddingTop: 16,
            }}
          >
            <Text
              size="sm"
              c="dimmed"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <FiLock size={16} /> Dữ liệu được nén và bảo mật trong URL
            </Text>
          </Box>
        </Stack>
      </Modal>

      <StyledJsonDrawWrapper $ready={drawReady}>
        <div className="jsondraw-wrapper">
          <JsonDraw
            jsondrawAPI={handleJsonDrawAPI}
            onChange={handleChange}
            viewModeEnabled={false}
            zenModeEnabled={false}
            gridModeEnabled={false}
            theme={darkmodeEnabled ? "dark" : "light"}
            UIOptions={{
              canvasActions: {
                export: { saveFileToDisk: true },
                clearDrawing: () => setShowClearModal(true),
              },
            }}
            initialData={{
              appState: {
                activeTool: {
                  type: "hand",
                  customType: null,
                  lastActiveTool: null,
                  locked: false,
                  fromSelection: false,
                },
              },
            }}
            renderTopRightUI={(isMobile: boolean) => (
              <Box px="md">
                <Button
                  size="sm"
                  color="violet"
                  disabled={hasImage}
                  onClick={handleShareClick}
                  title={
                    hasImage
                      ? "Can't share locally when an image is present due to URL size limits."
                      : "Tạo link chia sẻ miễn phí qua URL"
                  }
                >
                  Share View
                </Button>
              </Box>
            )}
          />
        </div>
      </StyledJsonDrawWrapper>
    </Box>
  );
};
