import styled from "styled-components";

export const StyledToolElement = styled.button<{ $hide?: boolean; $highlight?: boolean }>`
  display: ${({ $hide }) => ($hide ? "none" : "flex")};
  align-items: center;
  gap: 4px;
  place-content: center;
  min-height: 34px;
  font-size: 12px;
  font-weight: 600;
  background: ${({ $highlight, theme }) => ($highlight ? theme.EDITOR_ACCENT_SOFT : "none")};
  color: ${({ $highlight, theme }) =>
    $highlight ? theme.EDITOR_ACCENT : theme.INTERACTIVE_NORMAL};
  padding: 7px 9px;
  border: 1px solid ${({ $highlight, theme }) => ($highlight ? theme.EDITOR_ACCENT : "transparent")};
  border-radius: 5px;
  white-space: nowrap;
  transition:
    color 140ms ease,
    background 140ms ease,
    border-color 140ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.EDITOR_BORDER_STRONG};
    background: ${({ theme }) => theme.EDITOR_PANEL_MUTED};
    color: ${({ theme }) => theme.INTERACTIVE_HOVER};
    opacity: 1;
    box-shadow: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.EDITOR_ACCENT};
    outline-offset: 2px;
  }
`;
