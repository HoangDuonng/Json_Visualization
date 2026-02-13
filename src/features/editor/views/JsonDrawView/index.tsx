import React from "react";
import { Box, LoadingOverlay } from "@mantine/core";
import styled from "styled-components";
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
  React.useEffect(() => {
    const api = jsonDrawAPIRef.current;
    if (!api || nodes.length === 0) return;

    const elements = jsonToJsonDrawElements(nodes, edges);
    api.updateScene({ elements });

    // Scroll to content after a frame
    requestAnimationFrame(() => {
      setTimeout(() => {
        api.scrollToContent(undefined, { fitToViewport: true, viewportZoomFactor: 0.9 });
      }, 50);
    });
  }, [nodes, edges]);

  const handleJsonDrawAPI = React.useCallback(
    (api: any) => {
      jsonDrawAPIRef.current = api;

      // Set initial elements after API mount
      if (nodes.length > 0 && !hasInitialized.current) {
        hasInitialized.current = true;
        const elements = jsonToJsonDrawElements(nodes, edges);

        // Use requestAnimationFrame to let JsonDraw fully initialize
        requestAnimationFrame(() => {
          api.updateScene({ elements });
          setTimeout(() => {
            api.scrollToContent(undefined, { fitToViewport: true, viewportZoomFactor: 0.9 });
          }, 300);
        });
      }
    },
    [nodes, edges]
  );

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
      <StyledJsonDrawWrapper>
        <div className="jsondraw-wrapper">
          <JsonDraw
            jsondrawAPI={handleJsonDrawAPI}
            viewModeEnabled={false}
            zenModeEnabled={false}
            gridModeEnabled={false}
            theme={darkmodeEnabled ? "dark" : "light"}
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
