import { Global, css, Theme } from '@emotion/react';
import reset from 'emotion-reset';

export const GlobalStyles = () => (
  <Global
    styles={(theme: Theme) => css`
      ${reset}

      html, body, textarea {
        padding: 0;
        margin: 0;
        font-family: ${theme.typography.fontFamily};
      }

      * {
        box-sizing: border-box;
      }

      a {
        cursor: pointer;
        text-decoration: none;
        transition: 0.25s;
        color: ${theme.colors.textBlack};
      }

      ol,
      ul {
        list-style: none;
      }

      body {
        background-color: ${theme.colors.background};
        color: ${theme.colors.textBlack};
        font-size: ${theme.typography.fontSize.default};
      }
    `}
  />
);
