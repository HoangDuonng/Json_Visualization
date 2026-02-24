import React from "react";
import { Box, Modal, Text, Stack, Button, TextInput, ActionIcon } from "@mantine/core";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { FiCopy, FiCheck, FiLock, FiX } from "react-icons/fi";
import HamsterLoader from "../../../../jsondraw/packages/jsondraw/components/ui/HamsterLoader";
import { saveAsJSON } from "../../../../jsondraw/packages/jsondraw/data";
import {
  restoreAppState,
  restoreElements,
} from "../../../../jsondraw/packages/jsondraw/data/restore";
import useConfig from "../../../../store/useConfig";
import { useDrawingSync } from "../../../collab/useDrawingSync";
import useGraph from "../GraphView/stores/useGraph";
import { LoadFromLinkDialog } from "./LoadFromLinkDialog";
import { jsonToJsonDrawElements } from "./jsonToJsonDraw";
import {
  createShareLink,
  loadFromShareLink,
  isBackendShareLink,
  decodeDataFromUrlHash,
} from "./shareLinkUtils";

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

  // Share Modal states
  const [showShareModal, setShowShareModal] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState("");
  const [justCopied, setJustCopied] = React.useState(false);
  const [isSharing, setIsSharing] = React.useState(false);
  const copyTimerRef = React.useRef<number | null>(null);

  // Load from link dialog states
  const [showLoadFromLinkDialog, setShowLoadFromLinkDialog] = React.useState(false);
  const pendingShareDataRef = React.useRef<{ elements: any[]; appState: any } | null>(null);
  const isHandlingShareRef = React.useRef(false);
  const lastHandledHashRef = React.useRef<string | null>(null);

  // Bind drawing collab sync via Socket.IO
  const { broadcastDrawingChanges, broadcastPointer } = useDrawingSync(jsonDrawAPIRef);

  // Auto-save to localStorage and emit drawing updates
  const handleChange = React.useCallback(
    (elements: any, appState: any) => {
      hasUserDrawing.current = true;

      // Emit changes across WS
      broadcastDrawingChanges(elements);

      try {
        localStorage.setItem(
          "jsondraw-autosave",
          JSON.stringify({ elements, appState: { theme: appState.theme, zoom: appState.zoom } })
        );
      } catch (error) {
        console.warn("Failed to save to localStorage:", error);
      }
    },
    [broadcastDrawingChanges]
  );

  // Set font asset path before loading JsonDraw
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.JSONDRAW_ASSET_PATH = "/";
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

  // Apply shared data to the scene (called after user confirms or if canvas is empty)
  const applySharedData = React.useCallback(
    (data: { elements: any[]; appState: any }) => {
      const api = jsonDrawAPIRef.current;
      if (!api) return;

      hasUserDrawing.current = true;
      hasInitialized.current = true;
      setDrawReady(false);

      const restoredElements = restoreElements(data.elements, null);
      const restoredAppState = {
        ...restoreAppState(data.appState, api.getAppState()),
        isLoading: false,
      };

      requestAnimationFrame(() => {
        api.updateScene({ elements: restoredElements, appState: restoredAppState });
        scrollToContent(api, 120);
      });

      // Clean up the URL hash without reloading
      window.history.replaceState({}, "", window.location.pathname);
    },
    [scrollToContent]
  );

  // Handle replace action from LoadFromLinkDialog
  const handleReplaceContent = React.useCallback(() => {
    const data = pendingShareDataRef.current;
    if (!data) return;

    applySharedData(data);
    pendingShareDataRef.current = null;
    setShowLoadFromLinkDialog(false);
    toast.success("Drawing loaded from shared link!");
  }, [applySharedData]);

  // Handle save to disk
  const handleSaveToDisk = React.useCallback(async () => {
    const api = jsonDrawAPIRef.current;
    if (!api) return;

    try {
      const elements = api.getSceneElementsIncludingDeleted();
      const appState = api.getAppState();
      const files = api.getFiles();
      const name = api.getName?.() || appState.name;
      await saveAsJSON(elements, appState, files, name);
      toast.success("Drawing saved to disk!");
    } catch (error) {
      toast.error("Failed to save drawing.");
    }
  }, []);

  // Helper: Initialize from localStorage or JSON data
  const initFromLocalOrJson = React.useCallback(
    (api: any) => {
      // Try to restore from localStorage first
      const saved = localStorage.getItem("jsondraw-autosave");
      if (saved) {
        try {
          const { elements, appState } = JSON.parse(saved);
          const restoredElements = restoreElements(elements, null);
          const restoredAppState = {
            ...restoreAppState(appState, api.getAppState()),
            isLoading: false,
          };
          hasUserDrawing.current = true;
          setDrawReady(false);
          requestAnimationFrame(() => {
            api.updateScene({ elements: restoredElements, appState: restoredAppState });
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
        const elements = restoreElements(jsonToJsonDrawElements(nodes, edges) as any, null);
        setDrawReady(false);

        requestAnimationFrame(() => {
          api.updateScene({ elements, appState: { isLoading: false } });
          scrollToContent(api, 200);
        });
      }
    },
    [nodes, edges, scrollToContent]
  );

  const hasExistingContent = React.useCallback(() => {
    const saved = localStorage.getItem("jsondraw-autosave");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.elements) && parsed.elements.length > 0) {
          return true;
        }
      } catch (error) {
        console.warn("Failed to parse autosave data:", error);
        return true;
      }
    }

    const api = jsonDrawAPIRef.current;
    if (!api) return false;
    const elements = api.getSceneElementsIncludingDeleted();
    return Array.isArray(elements) && elements.length > 0;
  }, []);

  const handleShareLinkFromHash = React.useCallback(
    async (hash: string) => {
      if (typeof window === "undefined") return false;
      if (!hash) return false;
      if (!isBackendShareLink(hash) && !hash.startsWith("#data=")) return false;

      const api = jsonDrawAPIRef.current;
      if (!api) return false;

      if (hash === lastHandledHashRef.current || isHandlingShareRef.current) return true;

      lastHandledHashRef.current = hash;
      isHandlingShareRef.current = true;
      setDrawReady(false);

      try {
        if (isBackendShareLink(hash)) {
          const data = await loadFromShareLink(hash);
          if (!data || !data.elements) {
            toast.error("Could not load shared drawing. The link may be invalid or expired.");
            initFromLocalOrJson(api);
            return true;
          }

          if (hasExistingContent()) {
            pendingShareDataRef.current = data;
            setShowLoadFromLinkDialog(true);
            initFromLocalOrJson(api);
          } else {
            applySharedData(data);
          }
          return true;
        }

        const decoded = decodeDataFromUrlHash(hash);
        if (decoded && decoded.elements) {
          if (hasExistingContent()) {
            pendingShareDataRef.current = decoded;
            setShowLoadFromLinkDialog(true);
            initFromLocalOrJson(api);
          } else {
            applySharedData(decoded);
          }
          return true;
        }

        initFromLocalOrJson(api);
        return true;
      } catch (error) {
        console.error("Failed to load share link:", error);
        toast.error("Failed to load shared drawing.");
        initFromLocalOrJson(api);
        return true;
      } finally {
        isHandlingShareRef.current = false;
      }
    },
    [applySharedData, hasExistingContent, initFromLocalOrJson]
  );

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

      if (typeof window === "undefined") return;

      const hash = window.location.hash;

      handleShareLinkFromHash(hash).then(handled => {
        if (!handled) {
          initFromLocalOrJson(api);
        }
      });
    },
    [handleShareLinkFromHash, initFromLocalOrJson]
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHashChange = () => {
      const hash = window.location.hash;
      handleShareLinkFromHash(hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [handleShareLinkFromHash]);

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

  const handleShareClick = React.useCallback(async () => {
    const api = jsonDrawAPIRef.current;
    if (!api) return;

    setIsSharing(true);
    try {
      const elements = api.getSceneElementsIncludingDeleted();
      const appState = api.getAppState();

      const url = await createShareLink(elements, appState);
      setShareUrl(url);
      setShowShareModal(true);
    } catch (error: any) {
      console.error("Share failed:", error);
      toast.error("Failed to create share link. Please try again.");
    } finally {
      setIsSharing(false);
    }
  }, []);

  if (!JsonDrawModule) {
    return (
      <Box pos="relative" h="100%" w="100%">
        <Box pos="absolute" inset={0} style={{ display: "grid", placeItems: "center" }}>
          <HamsterLoader />
        </Box>
      </Box>
    );
  }

  const { JsonDraw } = JsonDrawModule;

  return (
    <Box pos="relative" h="100%" w="100%">
      {!drawReady && (
        <Box pos="absolute" inset={0} style={{ display: "grid", placeItems: "center" }}>
          <HamsterLoader />
        </Box>
      )}

      {/* Clear Drawing Modal */}
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

      {/* Share Link Modal */}
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
              <FiLock size={16} /> Data is end-to-end encrypted. Only people with the link can view.
            </Text>
          </Box>
        </Stack>
      </Modal>

      {/* Load from Link Confirmation Dialog */}
      <LoadFromLinkDialog
        opened={showLoadFromLinkDialog}
        darkMode={darkmodeEnabled}
        onReplace={handleReplaceContent}
        onClose={() => {
          setShowLoadFromLinkDialog(false);
          pendingShareDataRef.current = null;
          // Clean URL
          window.history.replaceState({}, "", window.location.pathname);
        }}
        onSaveToDisk={handleSaveToDisk}
      />

      <StyledJsonDrawWrapper $ready={drawReady}>
        <div className="jsondraw-wrapper">
          <JsonDraw
            jsondrawAPI={handleJsonDrawAPI}
            onChange={handleChange}
            onPointerUpdate={(payload: {
              pointer: { x: number; y: number; tool: string };
              button: string;
            }) => {
              if (payload.pointer) {
                broadcastPointer(payload);
              }
            }}
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
                  loading={isSharing}
                  onClick={handleShareClick}
                  title="Tạo link chia sẻ miễn phí (mã hóa đầu-cuối)"
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
