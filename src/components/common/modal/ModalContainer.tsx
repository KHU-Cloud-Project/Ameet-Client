/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { AiOutlineClose } from 'react-icons/ai';

const ModalContainerWrapper = styled.div<{ width?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: 34px 20px;
  width: ${(props) => props.width || '38%'};
  min-width: 380px;
  max-width: 90%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 19px;
  color: ${(props) => props.theme.colors.textGray};
  cursor: pointer;
`;

const ModalContainer = ({
  children,
  onClose,
  width,
}: {
  children: React.ReactNode;
  onClose: () => void;
  width?: string;
}) => {
  return (
    <ModalContainerWrapper width={width} onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={onClose}>
        <AiOutlineClose />
      </CloseButton>
      {children}
    </ModalContainerWrapper>
  );
};

export default ModalContainer;
