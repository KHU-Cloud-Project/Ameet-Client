/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import ModalOverlay from '../../common/modal/ModalOverlay';
import ModalContainer from '../../common/modal/ModalContainer';
import { AiOutlineClose } from 'react-icons/ai';
import CustomBtn from '../../common/CustomBtn';
import { useState } from 'react';

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

const TitleArea = styled.div`
  display: inline-block;
  font-size: ${(props) => props.theme.typography.fontSize.large};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  margin-bottom: 22px;
  text-align: center;

  span:first-child {
    color: ${(props) => props.theme.colors.textGray};
  }

  span:last-child {
    color: ${(props) => props.theme.colors.textBlack};
  }
`;

const Description = styled.div`
  text-align: center;
  color: ${(props) => props.theme.colors.textGray};
  font-size: ${(props) => props.theme.typography.fontSize.medium};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  margin-bottom: 46px;
`;

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 80%;
  margin-bottom: 46px;

  span {
    margin-bottom: 8px;
    color: ${(props) => props.theme.colors.textGray};
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

const CreateModal = ({
  onClose,
  spaceName,
  spaceDescription,
}: {
  onClose: () => void;
  spaceName: string;
  spaceDescription: string;
}) => {
  const [selfIntro, setSelfIntro] = useState('');

  return (
    <ModalOverlay onClose={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <AiOutlineClose />
        </CloseButton>
        <TitleArea>
          <span>Join </span>
          <span>{spaceName}</span>
        </TitleArea>
        <Description>{spaceDescription}</Description>
        <InputLabel>
          <span>Self Introduction</span>
          <input
            value={selfIntro}
            onChange={(e) => setSelfIntro(e.target.value)}
            type="text"
            placeholder="write a short introduction of yourself"
          />
        </InputLabel>
        <CustomBtn
          text="Create"
          padding="14px 28px"
          onClick={() => {
            console.log('Joining with intro:', selfIntro);
          }}
        />
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CreateModal;
