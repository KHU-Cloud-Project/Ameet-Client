/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import ModalOverlay from '../../common/modal/ModalOverlay';
import ModalContainer from '../../common/modal/ModalContainer';
import CustomBtn from '../../common/CustomBtn';
import { useState } from 'react';
import InputLabel from '../../common/InputLabel';

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
      <ModalContainer onClose={onClose}>
        <TitleArea>
          <span>Join </span>
          <span>{spaceName}</span>
        </TitleArea>
        <Description>{spaceDescription}</Description>
        <InputLabel
          label="Self Introduction"
          value={selfIntro}
          placeholder="write a short introduction of yourself"
          onChange={(e) => setSelfIntro(e.target.value)}
        />
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
