import { useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMantineColorScheme } from "@mantine/core";
import "@mantine/dropzone/styles.css";
import { useMediaQuery, useSessionStorage } from "@mantine/hooks";
import styled, { ThemeProvider } from "styled-components";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { generateNextSeo } from "next-seo/pages";
import { ViewMode } from "../constants/enumData";
import { MONO_FONT_FAMILY } from "../constants/globalStyle";
import { SEO } from "../constants/seo";
import { darkTheme, lightTheme } from "../constants/theme";
import { BottomBar } from "../features/editor/BottomBar";
import { FullscreenDropzone } from "../features/editor/FullscreenDropzone";
import { Toolbar } from "../features/editor/Toolbar";
import { SearchInput } from "../features/editor/Toolbar/SearchInput";
import { ViewMenu } from "../features/editor/Toolbar/ViewMenu";
import useGraph from "../features/editor/views/GraphView/stores/useGraph";
import useConfig from "../store/useConfig";
import useFile from "../store/useFile";

const ModalController = dynamic(() => import("../features/modals/ModalController"));
const ExternalMode = dynamic(() => import("../features/editor/ExternalMode"));

export const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.EDITOR_BG};
  color: ${({ theme }) => theme.TEXT_NORMAL};
  font-family: ${MONO_FONT_FAMILY} !important;
  --editor-border: ${({ theme }) => theme.EDITOR_BORDER};
  --editor-panel-muted: ${({ theme }) => theme.EDITOR_PANEL_MUTED};

  * {
    font-family: ${MONO_FONT_FAMILY} !important;
  }

  @media only screen and (max-width: 320px) {
    height: 100vh;
  }
`;

export const StyledEditorWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const StyledEditor = styled(Allotment)`
  position: relative !important;
  display: flex;
  padding: 10px;
  background: ${({ theme }) => theme.EDITOR_BG};
  --focus-border: ${({ theme }) => theme.EDITOR_ACCENT};
  --separator-border: transparent;

  .sash-container .sash {
    transition: background 140ms ease;
  }

  .sash-container .sash:hover,
  .sash-container .sash.active {
    background: ${({ theme }) => theme.EDITOR_ACCENT_SOFT};
  }

  @media only screen and (max-width: 820px) {
    padding: 6px;
  }
`;

const StyledPanel = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.EDITOR_BORDER};
  border-radius: 8px;
  background: ${({ theme }) => theme.EDITOR_PANEL};
`;

const StyledPanelHeader = styled.header`
  display: flex;
  min-height: 46px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 7px 10px 7px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.EDITOR_BORDER};
  background: ${({ theme }) => theme.EDITOR_PANEL};
  flex: 0 0 auto;
`;

const StyledPanelIdentity = styled.div`
  display: flex;
  min-width: 0;
  align-items: baseline;
  gap: 10px;

  strong {
    color: ${({ theme }) => theme.TEXT_NORMAL};
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  span {
    overflow: hidden;
    color: ${({ theme }) => theme.EDITOR_TEXT_MUTED};
    font-size: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media only screen and (max-width: 560px) {
    span {
      display: none;
    }
  }
`;

const StyledVisualizationControls = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  @media only screen and (max-width: 560px) {
    gap: 6px;

    #search-node {
      width: 110px;
    }
  }
`;

const VisualizationHeader = () => {
  const [viewMode] = useSessionStorage({
    key: "viewMode",
    defaultValue: ViewMode.Graph,
  });

  return (
    <StyledPanelHeader>
      <StyledPanelIdentity>
        <strong>Visualization</strong>
        <span>Explore the structure</span>
      </StyledPanelIdentity>
      <StyledVisualizationControls>
        {viewMode === ViewMode.Graph && <SearchInput />}
        <ViewMenu />
      </StyledVisualizationControls>
    </StyledPanelHeader>
  );
};

const TextEditor = dynamic(() => import("../features/editor/TextEditor"), {
  ssr: false,
});

const LiveEditor = dynamic(() => import("../features/editor/LiveEditor"), {
  ssr: false,
});

const EditorPage = () => {
  const { query, isReady } = useRouter();
  const { setColorScheme } = useMantineColorScheme();
  const checkEditorSession = useFile(state => state.checkEditorSession);
  const darkmodeEnabled = useConfig(state => state.darkmodeEnabled);
  const fullscreen = useGraph(state => state.fullscreen);
  const format = useFile(state => state.format);
  const stackPanes = useMediaQuery("(max-width: 820px)");

  useEffect(() => {
    if (isReady) checkEditorSession(query?.json);
  }, [checkEditorSession, isReady, query]);

  useEffect(() => {
    useGraph.getState().toggleFullscreen(false);
  }, []);

  useEffect(() => {
    setColorScheme(darkmodeEnabled ? "dark" : "light");
    return () => {
      setColorScheme("light");
    };
  }, [darkmodeEnabled, setColorScheme]);

  return (
    <>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: "Editor | JSON Visualization",
          description:
            "JSON Visualization Editor is a tool for visualizing into graphs, analyzing, editing, formatting, querying, transforming and validating JSON, CSV, YAML, XML, and more.",
          canonical: "https://jsonviz.online/editor",
        })}
      </Head>
      <ThemeProvider theme={darkmodeEnabled ? darkTheme : lightTheme}>
        <ExternalMode />
        <ModalController />
        <StyledEditorWrapper>
          <StyledPageWrapper>
            {/* {process.env.NEXT_PUBLIC_DISABLE_EXTERNAL_MODE === "true" ? null : <Banner />} */}
            <Toolbar />
            <StyledEditorWrapper>
              <StyledEditor proportionalLayout={false} vertical={stackPanes}>
                <Allotment.Pane
                  preferredSize={450}
                  minSize={fullscreen ? 0 : stackPanes ? 180 : 300}
                  maxSize={800}
                  visible={!fullscreen}
                >
                  <StyledPanel>
                    <StyledPanelHeader>
                      <StyledPanelIdentity>
                        <strong>Source</strong>
                        <span>{format.toUpperCase()} · Editable input</span>
                      </StyledPanelIdentity>
                    </StyledPanelHeader>
                    <TextEditor />
                    <BottomBar />
                  </StyledPanel>
                </Allotment.Pane>
                <Allotment.Pane minSize={0}>
                  <StyledPanel>
                    <VisualizationHeader />
                    <LiveEditor />
                  </StyledPanel>
                </Allotment.Pane>
              </StyledEditor>
              <FullscreenDropzone />
            </StyledEditorWrapper>
          </StyledPageWrapper>
        </StyledEditorWrapper>
      </ThemeProvider>
    </>
  );
};

export default EditorPage;
