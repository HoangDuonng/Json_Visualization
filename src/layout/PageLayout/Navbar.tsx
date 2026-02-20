import React from "react";
import Link from "next/link";
import { Button } from "@mantine/core";
import styled from "styled-components";
import { GlassSurface } from "../../components/GlassSurface";
import { JSONCrackLogo } from "../JsonCrackLogo";

const StyledNavbarWrapper = styled.div`
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  z-index: 100;
  transition: all 0.3s ease;
  padding: 0 24px;
  display: flex;
  justify-content: center;
`;

const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 4px 12px;
  gap: 16px;
  position: relative;

  @media only screen and (max-width: 768px) {
    padding: 8px 12px;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const Right = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  white-space: nowrap;
  position: relative;
  z-index: 1;

  button {
    color: #1a1a1a !important;
  }
`;

const Center = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  white-space: nowrap;
  justify-content: center;
  position: relative;
  z-index: 1;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const StyledButton = styled(Button)<any>`
  &:hover {
    background: transparent !important;
  }

  background: transparent !important;
`;

export const Navbar = () => {
  return (
    <StyledNavbarWrapper className="navbar">
      <GlassSurface
        blur={18}
        opacity={0.04}
        borderRadius={24}
        padding="8px 24px"
        style={{ margin: 0 }}
      >
        <StyledNavbar>
          <Left>
            <JSONCrackLogo fontSize="1.2rem" />
          </Left>
          <Center>
            <StyledButton
              component={Link}
              prefetch={false}
              href="/converter/json-to-yaml"
              variant="subtle"
              color="black"
              size="md"
              radius="md"
            >
              Converter
            </StyledButton>
            <StyledButton
              component={Link}
              prefetch={false}
              href="/type/json-to-rust"
              variant="subtle"
              color="black"
              size="md"
              radius="md"
            >
              Generate Types
            </StyledButton>
            <StyledButton
              component={Link}
              prefetch={false}
              href="/tools/json-schema"
              variant="subtle"
              color="black"
              size="md"
              radius="md"
            >
              JSON Schema
            </StyledButton>
          </Center>
          <Right>
            <StyledButton
              component={Link}
              prefetch={false}
              href="/editor"
              variant="subtle"
              color="black"
              size="md"
              radius="md"
            >
              Editor
            </StyledButton>
            <StyledButton
              component={Link}
              prefetch={false}
              href="/draw"
              variant="subtle"
              color="black"
              size="md"
              radius="md"
            >
              Draw
            </StyledButton>
          </Right>
        </StyledNavbar>
      </GlassSurface>
    </StyledNavbarWrapper>
  );
};
