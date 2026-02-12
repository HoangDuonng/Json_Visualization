import React from "react";
import styled from "styled-components";

const StyledInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 50px 12px 16px;
  border: 1px solid #e8e4db;
  border-radius: 8px;
  font-size: 14px;
  background: #fefcf7;
  color: #1a1a1a;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #37ff8b;
    box-shadow: 0 0 0 3px rgba(55, 255, 139, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const StyledSendButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: #37ff8b;
  border: none;
  border-radius: 6px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #1a1a1a;

  &:hover:not(:disabled) {
    background: #2ee67c;
    transform: translateY(-50%) scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledPlaceholder = styled.span<{ visible: boolean }>`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  pointer-events: none;
  transition: opacity 0.3s ease;
  opacity: ${props => (props.visible ? 1 : 0)};
`;

interface PlaceholdersAndVanishInputProps {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  disabled?: boolean;
  loading?: boolean;
  sendIcon?: React.ReactNode;
  stopIcon?: React.ReactNode;
}

export const PlaceholdersAndVanishInput: React.FC<PlaceholdersAndVanishInputProps> = ({
  placeholders,
  onChange,
  onSubmit,
  value,
  disabled,
  loading,
  sendIcon,
  stopIcon,
}) => {
  const [currentPlaceholder, setCurrentPlaceholder] = React.useState(0);

  React.useEffect(() => {
    if (value) return;

    const interval = setInterval(() => {
      setCurrentPlaceholder(prev => (prev + 1) % placeholders.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [placeholders.length, value]);

  return (
    <form onSubmit={onSubmit} style={{ width: "100%" }}>
      <StyledInputWrapper>
        <StyledPlaceholder visible={!value}>{placeholders[currentPlaceholder]}</StyledPlaceholder>
        <StyledInput
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder=" "
        />
        <StyledSendButton type="submit" disabled={!value.trim() && !loading}>
          {loading ? stopIcon : sendIcon}
        </StyledSendButton>
      </StyledInputWrapper>
    </form>
  );
};
