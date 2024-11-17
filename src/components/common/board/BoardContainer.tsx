import React from 'react';
import styled from '@emotion/styled';

type BoardContainerProps = {
  children: React.ReactNode;
  className?: string;
  padding?: string;
  flex?: number | string;
};

const StyledBoardContainer = styled.div<{
  padding?: string;
  flex?: number | string;
}>`
  padding: ${(props) => props.padding || '20px'};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: ${(props) => props.theme.shadows.section};
  display: flex;
  flex-direction: column;
  flex: ${(props) => (props.flex !== undefined ? props.flex : 1)};
`;

const BoardContainer = ({
  children,
  className,
  padding,
  flex,
}: BoardContainerProps) => {
  return (
    <StyledBoardContainer className={className} padding={padding} flex={flex}>
      {children}
    </StyledBoardContainer>
  );
};

export default BoardContainer;
