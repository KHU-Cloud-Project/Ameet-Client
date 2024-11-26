/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import ModalOverlay from '../../common/modal/ModalOverlay';
import ModalContainer from '../../common/modal/ModalContainer';
import BoardTitle from '../../common/board/BoardTitle';
import { AiOutlineClose } from 'react-icons/ai';
import CustomBtn from '../../common/CustomBtn';

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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 80%;
  max-width: 80%;
  margin: 0 auto;

  label {
    display: flex;
    flex-direction: column;
    color: ${(props) => props.theme.colors.textDarkGray};
    font-size: ${(props) => props.theme.typography.fontSize.medium};
    margin-bottom: 28px;

    input {
      margin-top: 8px;
      padding: 10px 12px;
      border: 1px solid ${(props) => props.theme.colors.lineGray};
      font-size: ${(props) => props.theme.typography.fontSize.default};
      border-radius: ${(props) => props.theme.borderRadius.small};
      min-width: 270px;

      &::placeholder {
        color: ${(props) => props.theme.colors.textGray};
      }
    }
  }
`;

const JoinModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <ModalOverlay onClose={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <AiOutlineClose />
        </CloseButton>
        <BoardTitle marginBottom={52}>Join Space</BoardTitle>
        <Content>
          <label>
            Space Name
            <input type="text" placeholder="enter space name" />
          </label>
          <label>
            Entry Password
            <input type="password" placeholder="enter entry password" />
          </label>
          <label>
            Self Introduction
            <input placeholder="write a short introduction of yourself" />
          </label>
        </Content>
        <div style={{ height: '12px' }}></div>
        <CustomBtn
          text="Join"
          padding="12px 26px"
          onClick={() => {
            console.log('Join 누름');
          }}
        />
      </ModalContainer>
    </ModalOverlay>
  );
};

export default JoinModal;
