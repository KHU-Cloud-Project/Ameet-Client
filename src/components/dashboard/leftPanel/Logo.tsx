/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

const LogoContainer = styled.div`
  font-size: ${(props) => props.theme.typography.fontSize.large};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.textBlack};
  display: flex;
  align-items: start;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 8px;
  align-content: center;
`;

function Logo() {
  return (
    <LogoContainer>
      <LogoIcon>✈️</LogoIcon>
      A-meet
    </LogoContainer>
  );
}

export default Logo;
