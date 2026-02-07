import React from "react";
import styled from "styled-components";
import { FaArrowRightLong } from "react-icons/fa6";

const StyledWrapper = styled.div`
  button {
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    cursor: pointer;
  }

  button {
    --primary-color: #111;
    --hovered-color: #37ff8b;
    position: relative;
    display: flex;
    font-weight: 600;
    font-size: 16px;
    gap: 0.5rem;
    align-items: center;
  }

  button p {
    margin: 0;
    position: relative;
    font-size: 16px;
    color: var(--primary-color);
  }

  button::after {
    position: absolute;
    content: "";
    width: 0;
    left: 0;
    bottom: -7px;
    background: var(--hovered-color);
    height: 2px;
    transition: 0.3s ease-out;
  }

  button:hover::after {
    width: 100%;
  }

  button:hover svg {
    transform: translateX(4px);
    color: var(--hovered-color);
  }

  button svg {
    color: var(--primary-color);
    transition: 0.2s;
    position: relative;
    width: 15px;
    transition-delay: 0.2s;
  }
`;

interface AnimatedLinkButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const AnimatedLinkButton: React.FC<AnimatedLinkButtonProps> = ({ children, onClick }) => {
  return (
    <StyledWrapper>
      <button onClick={onClick}>
        <p>{children}</p>
        <FaArrowRightLong />
      </button>
    </StyledWrapper>
  );
};
