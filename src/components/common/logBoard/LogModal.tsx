/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import ModalOverlay from '../modal/ModalOverlay';
import ModalContainer from '../modal/ModalContainer';
import { formatLength } from '../../../utils/dateUtils';

type Log = {
  id: string;
  name: string;
  date: string;
  length: number;
  participants: { nickname: string }[];
};

type LogModalProps = {
  log: Log;
  onClose: () => void;
};

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalTitle = styled.h2`
  font-size: ${(props) => props.theme.typography.fontSize.large};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const Content = styled.div`
  font-size: ${(props) => props.theme.typography.fontSize.medium};
  color: ${(props) => props.theme.colors.textBlack};
`;

function LogModal({ log, onClose }: LogModalProps) {
  return (
    <ModalOverlay onClose={onClose}>
      <ModalContainer onClose={onClose}>
        <ModalHeader>
          <ModalTitle>{log.name}</ModalTitle>
          <CloseButton onClick={onClose}>✖️</CloseButton>
        </ModalHeader>
        <Content>
          <p>Date: {log.date}</p>
          <p>Length: {formatLength(log.length)}</p>
          <h3>Agenda:</h3>
          <p>[Dummy content for agenda goes here]</p>
        </Content>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default LogModal;
