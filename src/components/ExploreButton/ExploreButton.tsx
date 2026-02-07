import React from "react";
import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa6";

const StyledWrapper = styled.div`
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: inherit;
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    color: #7e97b8;
    background-color: #e0e8ef;
    border-style: solid;
    border-width: 2px 2px 2px 2px;
    border-color: rgba(255, 255, 255, 0.333);
    border-radius: 40px 40px 40px 40px;
    padding: 12px 20px 12px 22px;
    transform: translate(0px, 0px) rotate(0deg);
    transition: 0.2s;
    box-shadow:
      -4px -2px 16px 0px #ffffff,
      4px 2px 16px 0px rgb(95 157 231 / 48%);
    cursor: pointer;
  }

  button:hover {
    color: #516d91;
    background-color: #e5edf5;
    box-shadow:
      -2px -1px 8px 0px #ffffff,
      2px 1px 8px 0px rgb(95 157 231 / 48%);
  }

  button:active {
    box-shadow: none;
  }
`;

interface ExploreButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export const ExploreButton: React.FC<ExploreButtonProps> = ({ onClick, children }) => {
  return (
    <StyledWrapper>
      <button onClick={onClick}>
        {children}
        <FaChevronRight size={14} />
      </button>
    </StyledWrapper>
  );
};
