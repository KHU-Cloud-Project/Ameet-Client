/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const LogoContainer = styled.div`
  font-size: ${(props) => props.theme.typography.fontSize.large};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.textBlack};
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 8px;
  text-align: center;
  align-content: center;
  justify-content: center;
`;

function Logo() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <LogoContainer onClick={handleClick}>
      <LogoIcon>✈️</LogoIcon>
      A-meet
    </LogoContainer>
  );
}

export default Logo;
