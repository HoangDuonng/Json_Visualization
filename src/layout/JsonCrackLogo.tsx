import React from "react";
import localFont from "next/font/local";
import Link from "next/link";
import { Image } from "@mantine/core";
import styled from "styled-components";

const monaSans = localFont({
  src: "../assets/fonts/Mona-Sans.woff2",
  variable: "--mona-sans",
  display: "swap",
  fallback: ["Futura, Helvetica, sans-serif", "Tahoma, Verdana, sans-serif"],
});

const StyledLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.TEXT_NORMAL};
`;

const StyledTitle = styled.span<{ fontSize: string }>`
  font-weight: 400;
  margin: 0;
  font-family: "Playfair Display", "Sagittaire Display", serif;
  font-size: ${({ fontSize }) => fontSize};
  white-space: nowrap;
  z-index: 10;
  vertical-align: middle;
  color: currentColor;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  letter-spacing: -0.02em;
`;

interface LogoProps extends React.ComponentPropsWithoutRef<"div"> {
  fontSize?: string;
  hideLogo?: boolean;
  hideText?: boolean;
}

export const JSONCrackLogo = ({ fontSize = "1.2rem", hideText, hideLogo, ...props }: LogoProps) => {
  const handleLogoClick = React.useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === "undefined") return;
    if (!window.location.href.includes("widget")) return;

    event.preventDefault();
    window.open("/", "_blank", "noopener,noreferrer");
  }, []);

  return (
    <Link href="/" prefetch={false} target="_self" onClick={handleLogoClick}>
      <StyledLogoWrapper>
        {/* {!hideLogo && (
          <Image
            src="/assets/192.png"
            loading="eager"
            width={parseFloat(fontSize) * 18}
            height={parseFloat(fontSize) * 18}
            alt="logo"
            radius={4}
            mb="2"
          />
        )} */}
        {!hideText && (
          <StyledTitle fontSize={fontSize} {...props}>
            JSON VIZ
          </StyledTitle>
        )}
      </StyledLogoWrapper>
    </Link>
  );
};
