import styled from '@emotion/styled';

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

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  padding: 24px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  width: 600px;
  max-width: 90%;
`;

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
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
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
    </ModalBackground>
  );
}

function formatLength(lengthInSeconds: number) {
  const hours = Math.floor(lengthInSeconds / 3600);
  const minutes = Math.floor((lengthInSeconds % 3600) / 60);
  const seconds = lengthInSeconds % 60;
  return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default LogModal;
