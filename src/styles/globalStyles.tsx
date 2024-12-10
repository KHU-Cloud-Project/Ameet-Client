import { Global, css, Theme } from '@emotion/react';
import reset from 'emotion-reset';

export const GlobalStyles = () => (
  <Global
    styles={(theme: Theme) => css`
      ${reset}

      @font-face {
        font-family: 'DigitalNumbers';
        src: url('/assets/fonts/DigitalNumbers-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }

      html,
      body,
      textarea {
        padding: 0;
        margin: 0;
        font-family: ${theme.typography.fontFamily};
        height: 100%;
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

      button {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:focus {
          outline: none;
        }
      }
    `}
  />
);
