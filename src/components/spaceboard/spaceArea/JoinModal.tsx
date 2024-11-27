/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import ModalOverlay from '../../common/modal/ModalOverlay';
import ModalContainer from '../../common/modal/ModalContainer';
import BoardTitle from '../../common/board/BoardTitle';
import CustomBtn from '../../common/CustomBtn';
import { useState } from 'react';
import InputLabel from '../../common/InputLabel';

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
          <InputLabel
            label="Space Name"
            value={spaceName}
            placeholder="enter space name"
            onChange={(e) => setSpaceName(e.target.value)}
          />

          <InputLabel
            label="Entry Password"
            value={entryPassword}
            placeholder="enter entry password"
            type="password"
            onChange={(e) => setEntryPassword(e.target.value)}
          />
          <InputLabel
            label="Self Introduction"
            value={selfIntro}
            placeholder="write a short introduction of yourself"
            onChange={(e) => setSelfIntro(e.target.value)}
          />
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
