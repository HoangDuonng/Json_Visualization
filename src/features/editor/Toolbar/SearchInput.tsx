import React from "react";
import { Flex, Text, TextInput } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { useOs } from "@mantine/hooks";
import { AiOutlineSearch } from "react-icons/ai";
import { useFocusNode } from "../../../hooks/useFocusNode";

export const SearchInput = () => {
  const [searchValue, setValue, skip, nodeCount, currentNode] = useFocusNode();
  const os = useOs();

  const coreKey = os === "macos" ? "⌘" : "Ctrl";

  return (
    <TextInput
      variant="unstyled"
      type="search"
      size="xs"
      id="search-node"
      w="clamp(140px, 18vw, 220px)"
      value={searchValue}
      onChange={e => setValue(e.currentTarget.value)}
      placeholder={`Find node · ${coreKey} F`}
      autoComplete="off"
      autoCorrect="off"
      onKeyDown={getHotkeyHandler([["Enter", skip]])}
      leftSection={<AiOutlineSearch />}
      rightSection={
        searchValue && (
          <Flex h={30} align="center">
            <Text size="xs" c="dimmed" pr="md">
              {searchValue && `${nodeCount}/${nodeCount > 0 ? currentNode + 1 : "0"}`}
            </Text>
          </Flex>
        )
      }
      styles={{
        input: {
          height: 30,
          minHeight: 30,
          border: "1px solid var(--editor-border)",
          borderRadius: 4,
          background: "var(--editor-panel-muted)",
          fontSize: 10,
        },
      }}
    />
  );
};
