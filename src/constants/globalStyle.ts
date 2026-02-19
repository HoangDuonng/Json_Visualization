import { createGlobalStyle } from "styled-components";

export const MONO_FONT_FAMILY = '"JetBrains Mono", "Fira Code", "Consolas", "Monaco", monospace';

const GlobalStyle = createGlobalStyle`
  html, body {
    background: #ffffff;
    overscroll-behavior: none;
    -webkit-font-smoothing: subpixel-antialiased !important;
    font-family: "Playfair Display", serif;
  }

  *,
  *::before,
  *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      scroll-behavior: smooth !important;
      -webkit-tap-highlight-color: transparent;
      -webkit-font-smoothing: never;
  }

  .hide {
    display: none;
  }

  svg {
    vertical-align: text-top;
  }

  a {
    color: unset;
    text-decoration: none;
  }

  button {
    border: none;
    outline: none;
    background: transparent;
    width: fit-content;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
`;

export default GlobalStyle;
