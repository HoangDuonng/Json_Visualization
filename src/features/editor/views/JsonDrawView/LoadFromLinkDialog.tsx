import React from "react";
import { Modal, Box, Text, Button, Stack } from "@mantine/core";
import styled from "styled-components";
import { FiAlertTriangle, FiDownload } from "react-icons/fi";

const WarningBanner = styled.div<{ $dark: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.75rem 2rem;
  border-radius: 0.5rem;
  background: ${({ $dark }) => ($dark ? "rgba(220, 38, 38, 0.12)" : "#fef2f2")};
  color: ${({ $dark }) => ($dark ? "#fca5a5" : "#991b1b")};

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
`;

const IconWrapper = styled.div<{ $dark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${({ $dark }) => ($dark ? "rgba(220, 38, 38, 0.2)" : "#fee2e2")};

  svg {
    width: 1.4rem;
    height: 1.4rem;
    color: ${({ $dark }) => ($dark ? "#f87171" : "#dc2626")};
  }
`;

const ActionCard = styled.div<{ $dark: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  gap: 0.75rem;
  text-align: center;

  h4 {
    margin: 0;
    font-weight: 700;
    font-size: 1.125rem;
    color: ${({ $dark }) => ($dark ? "#e5e5e5" : "#1f2937")};
  }

  p {
    margin: 0;
    font-size: 0.875rem;
    color: ${({ $dark }) => ($dark ? "#a3a3a3" : "#6b7280")};
    line-height: 1.5;
  }
`;

const WarningText = styled.div<{ $dark: boolean }>`
  flex: 1;
  min-width: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${({ $dark }) => ($dark ? "#fca5a5" : "#991b1b")};

  strong {
    color: ${({ $dark }) => ($dark ? "#f87171" : "#dc2626")};
  }

  @media (max-width: 600px) {
    text-align: center;
  }
`;

interface LoadFromLinkDialogProps {
  opened: boolean;
  darkMode: boolean;
  onReplace: () => void;
  onClose: () => void;
  onSaveToDisk: () => void;
}

export const LoadFromLinkDialog: React.FC<LoadFromLinkDialogProps> = ({
  opened,
  darkMode,
  onReplace,
  onClose,
  onSaveToDisk,
}) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={null}
      withCloseButton={false}
      centered
      size={700}
      padding="xl"
      radius="lg"
      styles={{
        content: {
          backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
        },
        overlay: {
          backgroundColor: darkMode ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <Stack gap="lg">
        {/* Title */}
        <Text
          fw={700}
          size="xl"
          style={{
            fontFamily: "Assistant, sans-serif",
            fontSize: "1.3rem",
            color: darkMode ? "#e5e5e5" : "#111827",
          }}
        >
          Load from link
        </Text>

        {/* Warning Banner + Replace Button */}
        <WarningBanner $dark={darkMode}>
          <IconWrapper $dark={darkMode}>
            <FiAlertTriangle />
          </IconWrapper>
          <WarningText $dark={darkMode}>
            Loading external drawing will <strong>replace your existing content</strong>. You can
            back up your drawing first by using one of the options below.
          </WarningText>
          <Button color="red" size="md" onClick={onReplace} style={{ flexShrink: 0 }}>
            Replace my content
          </Button>
        </WarningBanner>

        {/* Save to disk action */}
        <ActionCard $dark={darkMode}>
          <h4>Save to disk</h4>
          <p>Export the scene data to a file from which you can import later.</p>
          <Button
            variant="outline"
            color="gray"
            size="md"
            fullWidth
            leftSection={<FiDownload size={16} />}
            onClick={onSaveToDisk}
            styles={{
              root: {
                maxWidth: 300,
                borderColor: darkMode ? "#404040" : "#d1d5db",
                color: darkMode ? "#d4d4d4" : "#374151",
              },
            }}
          >
            Save to disk
          </Button>
        </ActionCard>
      </Stack>
    </Modal>
  );
};
