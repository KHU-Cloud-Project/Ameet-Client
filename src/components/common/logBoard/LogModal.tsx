/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import ModalOverlay from '../modal/ModalOverlay';
import ModalContainer from '../modal/ModalContainer';
import {
  AiOutlineEdit,
  AiOutlineDownload,
  AiOutlineDelete,
} from 'react-icons/ai';
import { useState } from 'react';
import { Log } from '../../../models/Log';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0;
`;

const Participants = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.textGray};
  margin: 0;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TimeInfo = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colors.textGray};
`;

const Duration = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colors.primary};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: ${(props) => props.theme.colors.textGray};

    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

const Content = styled.div`
  font-size: ${(props) => props.theme.typography.fontSize.medium};
  color: ${(props) => props.theme.colors.textBlack};
`;

const Toggle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  background-color: ${(props) =>
    props.active ? props.theme.colors.primary : 'transparent'};
  color: ${(props) =>
    props.active ? props.theme.colors.white : props.theme.colors.textGray};
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${(props) =>
      props.active
        ? props.theme.colors.primary
        : props.theme.colors.background};
  }
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.textGray};

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const ContentBody = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.lineGray};
  border-radius: 4px;
  padding: 16px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.textBlack};
  white-space: pre-wrap; /* Preserve line breaks in text */
`;

type LogModalProps = {
  log: Log;
  onClose: () => void;
};

function LogModal({ log, onClose }: LogModalProps) {
  const [toggleView, setToggleView] = useState<'AI Summary' | 'Original'>(
    'AI Summary',
  );

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <ModalOverlay onClose={onClose}>
      <ModalContainer onClose={onClose} width="700px">
        <Header>
          <div>
            <Title>{log.name}</Title>
            <Participants>
              {log.participants.map((p) => p.nickname).join(', ')}
            </Participants>
          </div>
          <Info>
            <TimeInfo>{log.date}</TimeInfo>
            <Duration>{formatDuration(log.length)}</Duration>
            <ActionButtons>
              <button>
                <AiOutlineDownload size={18} />
              </button>
              <button>
                <AiOutlineDelete size={18} />
              </button>
            </ActionButtons>
          </Info>
        </Header>
        <Content>
          <Toggle>
            <ToggleButton
              active={toggleView === 'AI Summary'}
              onClick={() => setToggleView('AI Summary')}
            >
              AI Summary
            </ToggleButton>
            <ToggleButton
              active={toggleView === 'Original'}
              onClick={() => setToggleView('Original')}
            >
              Original
            </ToggleButton>
            <EditButton>
              <AiOutlineEdit size={18} />
            </EditButton>
          </Toggle>
          <ContentBody>
            {toggleView === 'AI Summary' ? log.aiSummary : log.originalContent}
          </ContentBody>
        </Content>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default LogModal;
