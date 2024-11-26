/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

const ModalContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  padding: 24px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 90%;
  max-height: 90%;
  overflow: auto; // 스크롤
`;

export default ModalContainer;
