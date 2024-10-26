import { Global, css, Theme } from '@emotion/react';
import reset from 'emotion-reset';

export const GlobalStyles = () => (
  <Global
    styles={(theme: Theme) => css`
      ${reset}

      html, body, textarea {
        padding: 0;
        margin: 0;
        font-family:
          -apple-system,
          BlinkMacSystemFont,
          Segoe UI,
          Roboto,
          Oxygen,
          Ubuntu,
          Cantarell,
          Fira Sans,
          Droid Sans,
          Helvetica Neue,
          sans-serif;
      }

      * {
        box-sizing: border-box;
      }

      a {
        cursor: pointer;
        text-decoration: none;
        transition: 0.25s;
        color: #000;
      }

      ol,
      ul {
        list-style: none;
      }

      body {
        // font-family: Arial, sans-serif;
        background-color: ${theme.colors.background};
        color: ${theme.colors.text};
      }
    `}
  />
);
