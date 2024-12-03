/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

type ModalOverlayProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

function ModalOverlay({ onClose, children }: ModalOverlayProps) {
  return <Overlay onClick={onClose}>{children}</Overlay>;
}

export default ModalOverlay;
