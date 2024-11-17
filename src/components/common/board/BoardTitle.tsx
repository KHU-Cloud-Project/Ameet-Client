import React from 'react';
import styled from '@emotion/styled';

type BoardTitleProps = {
  children: React.ReactNode;
  actionComponent?: React.ReactNode;
  marginBottom?: number;
  fontSize?: string;
};

const Container = styled.div<{ marginBottom?: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) =>
    props.marginBottom !== undefined ? `${props.marginBottom}px` : '30px'};
`;

const Title = styled.h1<{ fontSize?: string }>`
  font-size: ${(props) =>
    props.fontSize || props.theme.typography.fontSize.large};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.textBlack};
  display: flex;
  align-items: center;
`;

function BoardTitle({
  children,
  actionComponent,
  marginBottom,
  fontSize,
}: BoardTitleProps) {
  return (
    <Container marginBottom={marginBottom}>
      <Title fontSize={fontSize}>{children}</Title>
      {actionComponent}
    </Container>
  );
}

export default BoardTitle;
