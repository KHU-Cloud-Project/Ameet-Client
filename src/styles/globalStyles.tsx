import { Global, css, Theme } from '@emotion/react';
import reset from 'emotion-reset';

export const GlobalStyles = () => (
  <Global
    styles={(theme: Theme) => css`
      ${reset}

      /* 기본 폰트 설정 */
      html, body, textarea {
        padding: 0;
        margin: 0;
        font-family:
          'Poppins',
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          Oxygen,
          Ubuntu,
          Cantarell,
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
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
        background-color: ${theme.colors.background};
        color: ${theme.colors.text};
      }
    `}
  />
);
