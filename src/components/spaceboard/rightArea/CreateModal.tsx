/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import ModalOverlay from '../../common/modal/ModalOverlay';
import ModalContainer from '../../common/modal/ModalContainer';
import CustomBtn from '../../common/CustomBtn';
import { useState } from 'react';
import InputLabel from '../../common/InputLabel';
import { updateUserIntroductionApi } from '../../../api/teamApi';

type CreateModalProps = {
  onClose: () => void;
  spaceName: string;
  spaceDescription: string;
  maxMembers: number;
  userTeamId: number;
};

const TitleArea = styled.div`
  display: inline-block;
  font-size: ${(props) => props.theme.typography.fontSize.large};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  margin-bottom: 22px;
  text-align: center;

  span:first-of-type {
    color: ${(props) => props.theme.colors.textGray};
  }

  span:last-of-type {
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
  userTeamId,
}: CreateModalProps) => {
  const [selfIntro, setSelfIntro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await updateUserIntroductionApi({ userTeamId, introduction: selfIntro });

      alert('Introduction updated successfully!');
      onClose();
    } catch (err) {
      console.error('Error updating introduction:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay onClose={onClose}>
      <ModalContainer onClose={onClose}>
        <TitleArea>
          <span>Write self-intro for: </span>
          <span>{spaceName}</span>
        </TitleArea>
        <Description>{spaceDescription}</Description>
        <InputLabel
          label="Self Introduction"
          value={selfIntro}
          placeholder="Write a short introduction of yourself"
          onChange={(e) => setSelfIntro(e.target.value)}
        />
        <CustomBtn
          text={loading ? 'Submitting...' : 'Submit'}
          padding="14px 28px"
          onClick={handleSubmit}
          disabled={loading || !selfIntro.trim()}
        />
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CreateModal;
