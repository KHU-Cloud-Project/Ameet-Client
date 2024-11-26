/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

const ModalContainer = styled.div<{ width?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto; // 스크롤
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: 34px 20px;
  width: ${(props) => props.width || '38%'};
  min-width: 380px;
  max-width: 90%;
`;

export default ModalContainer;
