import React from "react";
import { Box, LoadingOverlay, Modal, Text, Stack, Button } from "@mantine/core";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import useConfig from "../../../../store/useConfig";
import useGraph from "../GraphView/stores/useGraph";
import { jsonToJsonDrawElements } from "./jsonToJsonDraw";

const StyledJsonDrawWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

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

  const jsonDrawAPIRef = React.useRef<any>(null);
  const hasInitialized = React.useRef(false);
  const hasUserDrawing = React.useRef(false);
  const [showClearModal, setShowClearModal] = React.useState(false);

  // Auto-save to localStorage
  const handleChange = React.useCallback((elements: any, appState: any, files: any) => {
    hasUserDrawing.current = true;
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
    });
  }, []);

  // Update scene elements when nodes/edges change AFTER API is ready
  // BUT only if user hasn't drawn anything yet
  React.useEffect(() => {
    const api = jsonDrawAPIRef.current;
    if (!api || nodes.length === 0 || hasUserDrawing.current) return;

    const elements = jsonToJsonDrawElements(nodes, edges);
    api.updateScene({ elements });

    // Scroll to content after a frame
    requestAnimationFrame(() => {
      setTimeout(() => {
        api.scrollToContent(undefined, { fitToViewport: true, viewportZoomFactor: 0.8 });
      }, 50);
    });
  }, [nodes, edges]);

  const handleJsonDrawAPI = React.useCallback(
    (api: any) => {
      jsonDrawAPIRef.current = api;

      // Try to restore from localStorage first
      const saved = localStorage.getItem("jsondraw-autosave");
      if (saved) {
        try {
          const { elements, appState } = JSON.parse(saved);
          hasUserDrawing.current = true;
          requestAnimationFrame(() => {
            api.updateScene({ elements, appState });
            setTimeout(() => {
              api.scrollToContent(undefined, { fitToViewport: true, viewportZoomFactor: 0.8 });
            }, 100);
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

        requestAnimationFrame(() => {
          api.updateScene({ elements });
          setTimeout(() => {
            api.scrollToContent(undefined, { fitToViewport: true, viewportZoomFactor: 0.8 });
          }, 300);
        });
      }
    },
    [nodes, edges]
  );

  const handleClearDrawing = React.useCallback(() => {
    if (!jsonDrawAPIRef.current) return;

    localStorage.removeItem("jsondraw-autosave");
    hasUserDrawing.current = false;
    hasInitialized.current = false;

    const elements = jsonToJsonDrawElements(nodes, edges);
    jsonDrawAPIRef.current.updateScene({ elements });

    setTimeout(() => {
      jsonDrawAPIRef.current.scrollToContent(undefined, {
        fitToViewport: true,
        viewportZoomFactor: 0.8,
      });
    }, 100);

    setShowClearModal(false);
    toast.success("Drawing cleared! Loaded JSON visualization.");
  }, [nodes, edges]);

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

      <StyledJsonDrawWrapper>
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
          />
        </div>
      </StyledJsonDrawWrapper>
    </Box>
  );
};
