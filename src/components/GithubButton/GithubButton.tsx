import React from "react";
import { Flex } from "@mantine/core";
import styled from "styled-components";
import { FaGithub, FaStar } from "react-icons/fa6";

const StyledWrapper = styled.div`
  .codepen-button {
    display: block;
    cursor: pointer;
    color: white;
    margin: 0 auto;
    position: relative;
    text-decoration: none;
    font-weight: 600;
    border-radius: 4px;
    overflow: hidden;
    padding: 2px;
    isolation: isolate;
  }

  .codepen-button::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 400%;
    height: 100%;
    background: linear-gradient(115deg, #4fcf70, #fad648, #a767e5, #12bcfe, #44ce7b);
    background-size: 25% 100%;
    animation: border-animation 0.75s linear infinite;
    animation-play-state: paused;
    translate: -5% 0%;
    transition: translate 0.25s ease-out;
  }

  .codepen-button:hover::before {
    animation-play-state: running;
    transition-duration: 0.75s;
    translate: 0% 0%;
  }

  @keyframes border-animation {
    to {
      transform: translateX(-25%);
    }
  }

  .codepen-button span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.25rem 0.5rem;
    font-size: 0.65rem;
    background: #000;
    border-radius: 2px;
    height: 100%;
    gap: 0.25rem;
  }
`;

interface GithubButtonProps {
  stars?: number;
  href: string;
}

export const GithubButton: React.FC<GithubButtonProps> = ({ stars = 0, href }) => {
  return (
    <StyledWrapper>
      <a className="codepen-button" href={href} target="_blank" rel="noopener">
        <span>
          <Flex align="center" gap="4">
            <FaGithub size="10" />
            GitHub
          </Flex>
          <Flex align="center" gap="2" style={{ opacity: 0.7 }}>
            <FaStar size="8" />
            {stars.toLocaleString("en-US")}
          </Flex>
        </span>
      </a>
    </StyledWrapper>
  );
};
