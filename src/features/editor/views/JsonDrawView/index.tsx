import React from "react";
import {
  Box,
  Modal,
  Text,
  Stack,
  Button,
  TextInput,
  ActionIcon,
  Menu,
  PasswordInput,
  Group,
  Badge,
} from "@mantine/core";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import {
  FiCopy,
  FiCheck,
  FiLock,
  FiX,
  FiShare2,
  FiUsers,
  FiLogOut,
  FiPlay,
  FiKey,
  FiUserX,
} from "react-icons/fi";
import HamsterLoader from "../../../../jsondraw/packages/jsondraw/components/ui/HamsterLoader";
import { saveAsJSON } from "../../../../jsondraw/packages/jsondraw/data";
import {
  restoreAppState,
  restoreElements,
} from "../../../../jsondraw/packages/jsondraw/data/restore";
import useConfig from "../../../../store/useConfig";
import { useCollab } from "../../../collab/Collab";
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

  // Collab States
  const {
    isCollaborating,
    roomId: activeRoomId,
    startCollaboration,
    stopCollaboration,
    collaborators,
    currentUserId,
    isRoomOwner,
    maxCollaborators,
    kickCollaborator,
    passwordRequiredRoom,
    setPasswordRequiredRoom,
    waitingForApproval,
    pendingRequests,
    approveJoin,
    rejectJoin,
    submitRoomPassword,
  } = useCollab();
  const [showCollabModal, setShowCollabModal] = React.useState(false);
  const [collabPasswordInput, setCollabPasswordInput] = React.useState("");
  const [joinPasswordInput, setJoinPasswordInput] = React.useState("");

  // Load from link dialog states
  const [showLoadFromLinkDialog, setShowLoadFromLinkDialog] = React.useState(false);
  const pendingShareDataRef = React.useRef<{
    elements: any[];
    appState: any;
    files?: Record<string, any>;
  } | null>(null);
  const isHandlingShareRef = React.useRef(false);
  const lastHandledHashRef = React.useRef<string | null>(null);

  // Bind drawing collab sync via Socket.IO
  const { broadcastDrawingChanges, broadcastPointer } = useDrawingSync(jsonDrawAPIRef);

  // Auto-save to localStorage and emit drawing updates
  const handleChange = React.useCallback(
    (elements: any, appState: any, files?: Record<string, any>) => {
      hasUserDrawing.current = true;

      // Emit changes across WS
      broadcastDrawingChanges(elements);

      try {
        const sceneFiles = files ?? jsonDrawAPIRef.current?.getFiles?.() ?? null;
        localStorage.setItem(
          "jsondraw-autosave",
          JSON.stringify({
            elements,
            files: sceneFiles,
            appState: { theme: appState.theme, zoom: appState.zoom },
          })
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

    // Auto-join collab room if URL has it
    if (typeof window !== "undefined") {
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const rId = hashParams.get("collabRoomId");
      if (rId && !activeRoomId) {
        startCollaboration(rId, undefined, { asOwner: false });
      }
    }
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
    (data: { elements: any[]; appState: any; files?: Record<string, any> }) => {
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
        if (data.files && Object.keys(data.files).length > 0) {
          api.addFiles(data.files);
        }
        api.updateScene({
          elements: restoredElements,
          appState: restoredAppState,
        });
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
          const { elements, appState, files } = JSON.parse(saved);
          const restoredElements = restoreElements(elements, null);
          const restoredAppState = {
            ...restoreAppState(appState, api.getAppState()),
            isLoading: false,
          };
          hasUserDrawing.current = true;
          setDrawReady(false);
          requestAnimationFrame(() => {
            if (files && Object.keys(files).length > 0) {
              api.addFiles(files);
            }
            api.updateScene({
              elements: restoredElements,
              appState: restoredAppState,
            });
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

  const prevPendingRequestsLength = React.useRef(pendingRequests?.length || 0);
  React.useEffect(() => {
    if (pendingRequests && pendingRequests.length > prevPendingRequestsLength.current) {
      const latestReq = pendingRequests[pendingRequests.length - 1];
      toast(`${latestReq.username} wants to join the room!`, { icon: "👋" });
    }
    prevPendingRequestsLength.current = pendingRequests?.length || 0;
  }, [pendingRequests]);

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
      const files = api.getFiles();

      const url = await createShareLink(elements, appState, files);
      setShareUrl(url);
      setShowShareModal(true);
    } catch (error: any) {
      console.error("Share failed:", error);
      toast.error("Failed to create share link. Please try again.");
    } finally {
      setIsSharing(false);
    }
  }, []);

  const handleStartLiveCollab = React.useCallback(() => {
    if (!activeRoomId) {
      // Create new session if none is active
      const genId = Math.random().toString(36).substring(2, 10);
      startCollaboration(genId, collabPasswordInput, { asOwner: true });
    }
  }, [activeRoomId, collabPasswordInput, startCollaboration]);

  const handleJoinWithPassword = React.useCallback(() => {
    if (passwordRequiredRoom) {
      submitRoomPassword(joinPasswordInput);
      setPasswordRequiredRoom(null);
      setJoinPasswordInput("");
    }
  }, [passwordRequiredRoom, joinPasswordInput, submitRoomPassword, setPasswordRequiredRoom]);

  const handleCancelJoin = React.useCallback(() => {
    setPasswordRequiredRoom(null);
    setJoinPasswordInput("");
    if (typeof window !== "undefined") {
      window.location.hash = "";
    }
  }, [setPasswordRequiredRoom]);

  const getCollabShareUrl = () => {
    if (typeof window !== "undefined" && activeRoomId) {
      const url = new URL(window.location.href);
      url.search = ""; // clear query params
      const hashParams = new URLSearchParams();
      hashParams.set("collabRoomId", activeRoomId);
      url.hash = hashParams.toString();
      return url.toString();
    }
    return "";
  };

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

      {/* Waiting for Approval Modal */}
      <Modal
        opened={waitingForApproval}
        onClose={() => {}}
        withCloseButton={false}
        centered
        size="sm"
        radius="lg"
        padding="xl"
        styles={{
          content: {
            backgroundColor: darkmodeEnabled ? "#121212" : "#ffffff",
          },
        }}
      >
        <Stack gap="md" align="center">
          <Text fw={700} size="lg" style={{ fontFamily: "Assistant, sans-serif" }}>
            Waiting for Approval
          </Text>
          <HamsterLoader />
          <Text size="sm" c="dimmed" ta="center">
            Please wait while the room owner approves your request to join...
          </Text>
        </Stack>
      </Modal>

      {/* Password Required Modal */}
      <Modal
        opened={!!passwordRequiredRoom}
        onClose={handleCancelJoin}
        title={
          <Text fw={700} size="xl" style={{ fontFamily: "Assistant, sans-serif" }}>
            Room Password Required
          </Text>
        }
        centered
        size="md"
        radius="lg"
        padding="xl"
        styles={{
          content: {
            backgroundColor: darkmodeEnabled ? "#121212" : "#ffffff",
          },
        }}
      >
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            This live collaboration room is protected by a password. Please enter the password to
            join.
          </Text>

          <PasswordInput
            label="Password"
            placeholder="Enter room password"
            value={joinPasswordInput}
            onChange={e => setJoinPasswordInput(e.currentTarget.value)}
            leftSection={<FiKey size={14} />}
            styles={{
              input: {
                backgroundColor: darkmodeEnabled ? "rgba(255,255,255,0.05)" : "#f3f4f6",
                border: "none",
              },
            }}
            data-autofocus
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleJoinWithPassword();
              }
            }}
          />

          <Box style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: 10 }}>
            <Button variant="default" onClick={handleCancelJoin}>
              Cancel
            </Button>
            <Button color="blue" onClick={handleJoinWithPassword}>
              Join Room
            </Button>
          </Box>
        </Stack>
      </Modal>

      {/* Live Collab Modal */}
      <Modal
        opened={showCollabModal}
        onClose={() => setShowCollabModal(false)}
        title={
          <Text fw={700} size="xl" style={{ fontFamily: "Assistant, sans-serif" }}>
            Live Collaboration
          </Text>
        }
        centered
        size="md"
        radius="lg"
        padding="xl"
        styles={{
          content: {
            backgroundColor: darkmodeEnabled ? "#121212" : "#ffffff",
          },
        }}
      >
        <Stack gap="md">
          {isCollaborating && activeRoomId ? (
            <>
              <Text size="sm" c="dimmed">
                You are live. Anyone with this link can join and draw in real-time.
              </Text>

              <Group
                gap="apart"
                style={{
                  background: darkmodeEnabled ? "rgba(255,255,255,0.05)" : "#f8f9fa",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                <Box>
                  <Text size="sm" fw={600}>
                    Room ID: {activeRoomId}
                  </Text>
                  <Badge color="green" variant="light" size="sm">
                    Online ({collaborators.length}/{maxCollaborators} users)
                  </Badge>
                </Box>
                <Button
                  color="red"
                  variant="subtle"
                  size="xs"
                  leftSection={<FiLogOut />}
                  onClick={stopCollaboration}
                >
                  Stop Session
                </Button>
              </Group>

              <Box style={{ display: "flex", gap: "12px", alignItems: "flex-end", marginTop: 10 }}>
                <TextInput
                  label="Collab Link"
                  readOnly
                  value={getCollabShareUrl()}
                  style={{ flex: 1 }}
                  styles={{
                    input: {
                      backgroundColor: darkmodeEnabled ? "rgba(255,255,255,0.05)" : "#f3f4f6",
                      border: "none",
                    },
                  }}
                  onClick={e => (e.target as HTMLInputElement).select()}
                />
                <Button
                  leftSection={justCopied ? <FiCheck size={18} /> : <FiCopy size={18} />}
                  color={justCopied ? "teal" : "blue"}
                  onClick={() => {
                    navigator.clipboard.writeText(getCollabShareUrl());
                    setJustCopied(true);
                    if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
                    copyTimerRef.current = window.setTimeout(
                      () => setJustCopied(false),
                      3000
                    ) as any;
                  }}
                >
                  Copy
                </Button>
              </Box>

              {pendingRequests && pendingRequests.length > 0 && (
                <Box
                  style={{
                    marginTop: 12,
                    borderRadius: 8,
                    padding: 10,
                    background: darkmodeEnabled ? "rgba(255,165,0,0.1)" : "#fff5e6",
                    border: `1px solid ${darkmodeEnabled ? "rgba(255,165,0,0.3)" : "#ffe0b2"}`,
                  }}
                >
                  <Text size="xs" c="orange" fw={600} mb={8}>
                    Pending Requests ({pendingRequests.length})
                  </Text>
                  <Stack gap={6}>
                    {pendingRequests.map(req => (
                      <Group key={req.userId} justify="space-between" wrap="nowrap">
                        <Group gap={8}>
                          <Box
                            w={10}
                            h={10}
                            style={{ borderRadius: "50%", background: req.color || "#ccc" }}
                          />
                          <Text size="sm" fw={500} truncate>
                            {req.username}
                          </Text>
                        </Group>
                        <Group gap={4}>
                          <Button
                            size="compact-xs"
                            color="teal"
                            onClick={() => approveJoin(req.userId)}
                          >
                            Approve
                          </Button>
                          <Button
                            size="compact-xs"
                            color="red"
                            variant="subtle"
                            onClick={() => rejectJoin(req.userId)}
                          >
                            Reject
                          </Button>
                        </Group>
                      </Group>
                    ))}
                  </Stack>
                </Box>
              )}

              <Box
                style={{
                  marginTop: 12,
                  borderRadius: 8,
                  padding: 10,
                  background: darkmodeEnabled ? "rgba(255,255,255,0.04)" : "#f8f9fa",
                }}
              >
                <Text size="xs" c="dimmed" mb={8}>
                  Participants
                </Text>
                <Stack gap={6}>
                  {collaborators.map(user => {
                    const isMe = user.id === currentUserId;

                    return (
                      <Group key={user.id} justify="space-between" wrap="nowrap">
                        <Text size="sm" fw={500} truncate>
                          {user.username || user.id}
                          {isMe ? " (You)" : ""}
                          {user.isOwner ? " (Owner)" : ""}
                        </Text>

                        {isRoomOwner && !isMe ? (
                          <ActionIcon
                            color="red"
                            variant="light"
                            aria-label="Kick user"
                            onClick={() => kickCollaborator(user.id)}
                          >
                            <FiUserX size={14} />
                          </ActionIcon>
                        ) : null}
                      </Group>
                    );
                  })}
                </Stack>
              </Box>
            </>
          ) : (
            <>
              <Text size="sm" c="dimmed">
                Create a real-time multiplayer room to draw with others. You can optionally set a
                password.
              </Text>

              <PasswordInput
                label="Room Password (Optional)"
                placeholder="Leave blank for public room"
                value={collabPasswordInput}
                onChange={e => setCollabPasswordInput(e.currentTarget.value)}
                leftSection={<FiKey size={14} />}
                styles={{
                  input: {
                    backgroundColor: darkmodeEnabled ? "rgba(255,255,255,0.05)" : "#f3f4f6",
                    border: "none",
                  },
                }}
              />

              <Button
                size="md"
                color="blue"
                leftSection={<FiPlay size={16} />}
                onClick={handleStartLiveCollab}
                style={{ marginTop: 10 }}
              >
                Start Session
              </Button>
            </>
          )}
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
                <Menu shadow="md" width={200} position="bottom-end">
                  <Menu.Target>
                    <Button
                      size="sm"
                      color={isCollaborating ? "green" : "violet"}
                      loading={isSharing}
                      leftSection={isCollaborating ? <FiUsers size={16} /> : <FiShare2 size={16} />}
                      title="Share canvas"
                    >
                      {isCollaborating ? "Live" : "Share"}
                    </Button>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>Export Options</Menu.Label>
                    <Menu.Item leftSection={<FiCopy size={14} />} onClick={handleShareClick}>
                      Share Link (Snapshot)
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Label>Realtime</Menu.Label>
                    <Menu.Item
                      color={isCollaborating ? "green" : "blue"}
                      leftSection={isCollaborating ? <FiUsers size={14} /> : <FiPlay size={14} />}
                      onClick={() => setShowCollabModal(true)}
                    >
                      {isCollaborating ? "Manage Collab Session" : "Start Live Collab"}
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Box>
            )}
          />
        </div>
      </StyledJsonDrawWrapper>
    </Box>
  );
};
