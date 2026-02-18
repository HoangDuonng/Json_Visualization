import React from "react";
import styled from "styled-components";

interface ChatButtonProps {
  onClick?: () => void;
}

const StyledChatButton = styled.button`
  position: relative;
  padding: 10px 24px;
  background: #e6f3ff;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  border: 2px solid #b7dcff;
  border-radius: 8px;
  box-shadow: 0 0 0 rgba(183, 220, 255, 0.6);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  line-height: 1;

  &:hover {
    background: #fae09a;
    color: #1a1a1a;
    border-color: #fae09a;
    box-shadow: 0 0 25px rgba(250, 224, 154, 0.5);
  }

  .star-1,
  .star-2,
  .star-3,
  .star-4,
  .star-5,
  .star-6 {
    position: absolute;
    height: auto;
    filter: drop-shadow(0 0 0 rgba(26, 26, 26, 0.2));
    z-index: -5;
  }

  .star-1 {
    top: 20%;
    left: 20%;
    width: 20px;
    transition: all 1s cubic-bezier(0.05, 0.83, 0.43, 0.96);
  }

  .star-2 {
    top: 45%;
    left: 45%;
    width: 12px;
    transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
  }

  .star-3 {
    top: 40%;
    left: 40%;
    width: 4px;
    transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
  }

  .star-4 {
    top: 20%;
    left: 40%;
    width: 7px;
    transition: all 0.8s cubic-bezier(0, 0.4, 0, 1.01);
  }

  .star-5 {
    top: 25%;
    left: 45%;
    width: 12px;
    transition: all 0.6s cubic-bezier(0, 0.4, 0, 1.01);
  }

  .star-6 {
    top: 5%;
    left: 50%;
    width: 4px;
    transition: all 0.8s ease;
  }

  &:hover .star-1 {
    top: -80%;
    left: -30%;
    width: 20px;
    filter: drop-shadow(0 0 10px rgba(26, 26, 26, 0.3));
    z-index: 2;
  }

  &:hover .star-2 {
    top: -25%;
    left: 10%;
    width: 12px;
    filter: drop-shadow(0 0 10px rgba(26, 26, 26, 0.3));
    z-index: 2;
  }

  &:hover .star-3 {
    top: 55%;
    left: 25%;
    width: 4px;
    filter: drop-shadow(0 0 10px rgba(26, 26, 26, 0.3));
    z-index: 2;
  }

  &:hover .star-4 {
    top: 30%;
    left: 80%;
    width: 7px;
    filter: drop-shadow(0 0 10px rgba(26, 26, 26, 0.3));
    z-index: 2;
  }

  &:hover .star-5 {
    top: 25%;
    left: 115%;
    width: 12px;
    filter: drop-shadow(0 0 10px rgba(26, 26, 26, 0.3));
    z-index: 2;
  }

  &:hover .star-6 {
    top: 5%;
    left: 60%;
    width: 4px;
    filter: drop-shadow(0 0 10px rgba(26, 26, 26, 0.3));
    z-index: 2;
  }

  .fil0 {
    fill: #fae09a;
  }
`;

const Star = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    version="1.1"
    viewBox="0 0 784.11 815.53"
  >
    <g>
      <path
        className="fil0"
        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
      />
    </g>
  </svg>
);

export const ChatButton = ({ onClick }: ChatButtonProps) => {
  return (
    <StyledChatButton onClick={onClick} type="button">
      Assistant
      <div className="star-1">
        <Star />
      </div>
      <div className="star-2">
        <Star />
      </div>
      <div className="star-3">
        <Star />
      </div>
      <div className="star-4">
        <Star />
      </div>
      <div className="star-5">
        <Star />
      </div>
      <div className="star-6">
        <Star />
      </div>
    </StyledChatButton>
  );
};
