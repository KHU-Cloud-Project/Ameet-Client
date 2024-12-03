/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const BigContainer = styled.div`
  width: clamp(220px, 18vw, 260px);
  background-color: ${(props) => props.theme.colors.white};
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  // border-right: 1px solid ${(props) => props.theme.colors.lightGray};
  white-space: nowrap;
`;

const LogoContainer = styled.div`
  font-size: ${(props) => props.theme.typography.fontSize.large};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.textBlack};
  display: flex;
  width: 175.94px;
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

function CuttedLogo() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <BigContainer>
      <LogoContainer onClick={handleClick}>
      <LogoIcon>✈️</LogoIcon>
      A-meet
      </LogoContainer>
    </BigContainer>
  );
}

export default CuttedLogo;
