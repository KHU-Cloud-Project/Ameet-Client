/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { HTMLAttributes, ReactNode } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: number | [number, number] | [number, number, number, number];
  backgroundColor?: string;
  borderRadius?: number;
  width?: string | number;
  height?: string | number;
}

/**
 * @param padding - number 또는 배열로 padding을 지정
 * @param backgroundColor - 배경색 지정
 * @param borderRadius - 모서리의 둥근 정도 지정
 * @param width - 컨테이너 가로 크기
 * @param height - 컨테이너 세로 크기
 */
export const Container = ({
  children,
  padding = 0,
  backgroundColor = 'transparent',
  borderRadius = 0,
  width = 'auto',
  height = 'auto',
  ...props
}: ContainerProps) => (
  <div
    css={css`
      padding: ${typeof padding === 'number'
        ? `${padding}px`
        : padding.length === 2
          ? `${padding[0]}px ${padding[1]}px`
          : `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`};
      background-color: ${backgroundColor};
      border-radius: ${borderRadius}px;
      width: ${typeof width === 'number' ? `${width}px` : width};
      height: ${typeof height === 'number' ? `${height}px` : height};
      box-sizing: border-box;
    `}
    {...props}
  >
    {children}
  </div>
);
