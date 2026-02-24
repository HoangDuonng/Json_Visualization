import { useEffect } from "react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { JetBrains_Mono } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMantineColorScheme } from "@mantine/core";
import "@mantine/dropzone/styles.css";
import { useSessionStorage } from "@mantine/hooks";
import styled, { ThemeProvider } from "styled-components";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { generateNextSeo } from "next-seo/pages";
import { SEO } from "../constants/seo";
import { darkTheme, lightTheme } from "../constants/theme";
import { ViewMode } from "../enums/viewMode.enum";
import { CollabProvider, useCollab } from "../features/collab/Collab";
import { BottomBar } from "../features/editor/BottomBar";
import { FullscreenDropzone } from "../features/editor/FullscreenDropzone";
import { Toolbar } from "../features/editor/Toolbar";
import useGraph from "../features/editor/views/GraphView/stores/useGraph";
import useConfig from "../store/useConfig";
import useFile from "../store/useFile";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
});

const ModalController = dynamic(() => import("../features/modals/ModalController"));
const ExternalMode = dynamic(() => import("../features/editor/ExternalMode"));

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  font-family: ${jetbrainsMono.style.fontFamily}, monospace !important;

  * {
    font-family: ${jetbrainsMono.style.fontFamily}, monospace !important;
  }

  @media only screen and (max-width: 320px) {
    height: 100vh;
  }
`;

const StyledEditorWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const StyledEditor = styled(Allotment)`
  position: relative !important;
  display: flex;
  background: ${({ theme }) => theme.BACKGROUND_SECONDARY};

  @media only screen and (max-width: 320px) {
    height: 100vh;
  }
`;

const StyledTextEditor = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TextEditor = dynamic(() => import("../features/editor/TextEditor"), {
  ssr: false,
});

const LiveEditor = dynamic(() => import("../features/editor/LiveEditor"), {
  ssr: false,
});

const DrawPage = () => {
  const { query, isReady } = useRouter();
  const { setColorScheme } = useMantineColorScheme();
  const checkEditorSession = useFile(state => state.checkEditorSession);
  const darkmodeEnabled = useConfig(state => state.darkmodeEnabled);
  const fullscreen = useGraph(state => state.fullscreen);
  const [, setViewMode] = useSessionStorage({
    key: "viewMode",
    defaultValue: ViewMode.JsonDraw,
  });

  useEffect(() => {
    if (isReady) checkEditorSession(query?.json);
  }, [checkEditorSession, isReady, query]);

  useEffect(() => {
    setViewMode(ViewMode.JsonDraw);
  }, [setViewMode]);

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
          title: "JsonDraw | JSON Visualization",
          description:
            "JsonDraw is a freeform canvas built from your JSON graph for layout, annotation, and presentation.",
          canonical: "https://jsonviz.online/draw",
        })}
      </Head>
      <ThemeProvider theme={darkmodeEnabled ? darkTheme : lightTheme}>
        <CollabProvider>
          <ExternalMode />
          <ModalController />
          <StyledEditorWrapper>
            <StyledPageWrapper>
              <Toolbar />
              <StyledEditorWrapper>
                <StyledEditor proportionalLayout={false}>
                  <Allotment.Pane
                    preferredSize={450}
                    minSize={fullscreen ? 0 : 300}
                    maxSize={800}
                    visible={!fullscreen}
                  >
                    <StyledTextEditor>
                      <TextEditor />
                      <BottomBar />
                    </StyledTextEditor>
                  </Allotment.Pane>
                  <Allotment.Pane minSize={0}>
                    <LiveEditor />
                  </Allotment.Pane>
                </StyledEditor>
                <FullscreenDropzone />
              </StyledEditorWrapper>
            </StyledPageWrapper>
          </StyledEditorWrapper>
        </CollabProvider>
      </ThemeProvider>
    </>
  );
};

export default DrawPage;
