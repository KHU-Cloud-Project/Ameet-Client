/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import ModalOverlay from '../../common/modal/ModalOverlay';
import ModalContainer from '../../common/modal/ModalContainer';
import BoardTitle from '../../common/board/BoardTitle';
import CustomBtn from '../../common/CustomBtn';
import { useState } from 'react';

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  margin-bottom: 28px;

  span {
    margin-bottom: 8px;
    color: ${(props) => props.theme.colors.textDarkGray};
    font-size: ${(props) => props.theme.typography.fontSize.medium};
    font-weight: ${(props) => props.theme.typography.fontWeight.regular};
  }

  input {
    padding: 9px 12px;
    border: 1px solid ${(props) => props.theme.colors.lineGray};
    font-size: ${(props) => props.theme.typography.fontSize.default};
    border-radius: ${(props) => props.theme.borderRadius.small};
    min-width: 270px;

    &::placeholder {
      color: ${(props) => props.theme.colors.textGray};
    }

    &:focus {
      outline: none;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 80%;
  max-width: 80%;
  margin: 0 auto;
`;

const JoinModal = ({ onClose }: { onClose: () => void }) => {
  const [spaceName, setSpaceName] = useState('');
  const [entryPassword, setEntryPassword] = useState('');
  const [selfIntro, setSelfIntro] = useState('');

  return (
    <ModalOverlay onClose={onClose}>
      <ModalContainer onClose={onClose}>
        <BoardTitle marginBottom={52}>Join Space</BoardTitle>
        <Content>
          <InputLabel>
            <span>Space Name</span>
            <input
              value={spaceName}
              onChange={(e) => setSpaceName(e.target.value)}
              type="text"
              placeholder="enter space name"
            />
          </InputLabel>
          <InputLabel>
            <span>Entry Password</span>
            <input
              type="password"
              value={entryPassword}
              onChange={(e) => setEntryPassword(e.target.value)}
              placeholder="enter entry password"
            />
          </InputLabel>
          <InputLabel>
            <span>Self Introduction</span>
            <input
              value={selfIntro}
              onChange={(e) => setSelfIntro(e.target.value)}
              type="text"
              placeholder="write a short introduction of yourself"
            />
          </InputLabel>
        </Content>
        <div style={{ height: '12px' }}></div>
        <CustomBtn
          text="Join"
          padding="14px 28px"
          onClick={() => {
            console.log('Joining with:', {
              spaceName,
              entryPassword,
              selfIntro,
            });
          }}
          disabled={!spaceName || !entryPassword || !selfIntro}
        />
      </ModalContainer>
    </ModalOverlay>
  );
};

export default JoinModal;
