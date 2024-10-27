/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { HTMLAttributes } from 'react';

interface SpacerProps extends HTMLAttributes<HTMLDivElement> {
  width?: number; // 가로 여백 크기
  height?: number; // 세로 여백 크기
}

export const Spacer = ({ width = 0, height = 0, ...props }: SpacerProps) => (
  <div
    css={css`
      width: ${width}px;
      height: ${height}px;
      flex-shrink: 0;
    `}
    {...props}
  />
);
