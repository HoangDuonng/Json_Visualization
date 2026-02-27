import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Flex, Group } from "@mantine/core";
import { useSessionStorage } from "@mantine/hooks";
import styled from "styled-components";
import toast from "react-hot-toast";
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineLayout } from "react-icons/ai";
import { FaGithub } from "react-icons/fa6";
import { ViewMode } from "../../../constants/enumData";
import { JSONCrackLogo } from "../../../layout/JsonCrackLogo";
import useGraph from "../views/GraphView/stores/useGraph";
import { ThemeToggle } from "./ThemeToggle";
import { ToolsMenu } from "./ToolsMenu";
import { ViewMenu } from "./ViewMenu";
import { StyledToolElement } from "./styles";

const StyledTools = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 4px;
  justify-content: space-between;
  height: 45px;
  padding: 6px 12px;
  background: ${({ theme }) => theme.TOOLBAR_BG};
  color: ${({ theme }) => theme.SILVER};
  z-index: 36;
  border-bottom: 1px solid ${({ theme }) => theme.SILVER_DARK};

  @media only screen and (max-width: 320px) {
    display: none;
  }
`;

function fullscreenBrowser() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {
      toast.error("Unable to enter fullscreen mode.");
    });
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

export const Toolbar = () => {
  const router = useRouter();
  const isDrawView = router.pathname === "/draw";
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [, setViewMode] = useSessionStorage({
    key: "viewMode",
    defaultValue: ViewMode.Graph,
  });

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    handleFullscreenChange();
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleEditorClick = () => {
    setViewMode(ViewMode.Graph);
    router.push("/editor");
  };

  const handleDrawClick = () => {
    setViewMode(ViewMode.JsonDraw);
    router.push("/draw");
  };

  return (
    <StyledTools>
      <Group gap="xs" justify="left" w="100%" style={{ flexWrap: "nowrap" }}>
        <StyledToolElement title="JSON Visualization">
          <Flex gap="xs" align="center" justify="center">
            <JSONCrackLogo fontSize="14px" hideLogo />
          </Flex>
        </StyledToolElement>
        <ViewMenu />
        <ToolsMenu />
        <StyledToolElement title="Editor" $highlight={!isDrawView} onClick={handleEditorClick}>
          Editor
        </StyledToolElement>
        <StyledToolElement title="Draw" $highlight={isDrawView} onClick={handleDrawClick}>
          Draw
        </StyledToolElement>
        <StyledToolElement
          title="Toggle Editor"
          onClick={() => useGraph.getState().toggleFullscreen(!useGraph.getState().fullscreen)}
        >
          <AiOutlineLayout size="20" />
        </StyledToolElement>
      </Group>
      <Group gap="xs" justify="right" w="100%" style={{ flexWrap: "nowrap" }}>
        <ThemeToggle />
        <Link href="https://github.com/HoangDuonng" rel="noopener" target="_blank">
          <StyledToolElement title="GitHub">
            <FaGithub size="20" />
          </StyledToolElement>
        </Link>
        <StyledToolElement
          title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          onClick={fullscreenBrowser}
        >
          {isFullscreen ? <AiOutlineFullscreenExit size="20" /> : <AiOutlineFullscreen size="20" />}
        </StyledToolElement>
      </Group>
    </StyledTools>
  );
};
