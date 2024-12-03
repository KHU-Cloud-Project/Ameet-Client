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
import BoardTitle from '../board/BoardTitle';
import { theme } from '../../../styles/theme';
import { FiUsers } from 'react-icons/fi';
import Divider from '../Divider';
// import { BiGroup } from 'react-icons/bi';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  white-space: nowrap;
`;

const Participants = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${(props) => props.theme.typography.fontSize.small};
  color: ${(props) => props.theme.colors.textDarkGray};
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  span {
    font-size: ${(props) => props.theme.typography.fontSize.small};
    color: ${(props) => props.theme.colors.textDarkGray};
    white-space: nowrap;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  padding: 0 10px;
  font-size: ${(props) => props.theme.typography.fontSize.medium};

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: ${(props) => props.theme.colors.textGray};

    &:hover {
      color: ${(props) => props.theme.colors.secondary};
    }

    &:focus {
      outline: none;
    }
  }
`;

const ContentHeader = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Toggle = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  background-color: ${(props) => props.theme.colors.lineGray};
  border-radius: 8px;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  width: 128px;
  margin: 2px;
  background-color: ${(props) =>
    props.active ? props.theme.colors.white : 'transparent'};
  font-weight: ${(props) =>
    props.active
      ? props.theme.typography.fontWeight.semibold
      : props.theme.typography.fontWeight.regular};
  padding: 4px 20px;
  color: ${(props) =>
    props.active ? props.theme.colors.textBlack : props.theme.colors.textGray};
  font-size: ${(props) => props.theme.typography.fontSize.xSmall};
  border-radius: 6px;
  cursor: pointer;
`;

const EditButton = styled.button`
  position: absolute;
  background-color: red;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.textGray};

  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }
`;

const ContentBody = styled.div`
  margin-top: 20px;
  padding: 16px 12px 40px 12px; // TRBL
  height: 100%;
  width: 90%;
  overflow-y: auto;
  min-height: 200px;
  background-color: ${(props) => props.theme.colors.darkWhite};
  font-size: ${(props) => props.theme.typography.fontSize.default};
  color: ${(props) => props.theme.colors.textBlack};
  white-space: pre-wrap;
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
      <ModalContainer
        onClose={onClose}
        width="50%"
        minWidth="400px"
        height="60%"
        justifyContent="start"
      >
        <Header>
          <div>
            <BoardTitle
              marginBottom={5}
              fontSize={theme.typography.fontSize.mediumLarge}
            >
              {log.title}
            </BoardTitle>
            <Participants>
              <FiUsers />
              {/* {log.participants.map((p) => p.nickname).join(', ')} */}
            </Participants>
          </div>
          <HeaderInfo>
            <span>{log.date}</span>
            <span>{formatDuration(log.duration)}</span>
            <ActionButtons>
              <button>
                <AiOutlineDownload />
              </button>
              <button>
                <AiOutlineDelete />
              </button>
            </ActionButtons>
          </HeaderInfo>
        </Header>
        <Divider marginBottom="16px" marginTop="16px" />
        <ContentHeader>
          <div />
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
          </Toggle>
          <EditButton>
            <AiOutlineEdit />
          </EditButton>
        </ContentHeader>
        <ContentBody>
          {toggleView === 'AI Summary' ? log.aiSummary : log.originalContent}
        </ContentBody>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default LogModal;
