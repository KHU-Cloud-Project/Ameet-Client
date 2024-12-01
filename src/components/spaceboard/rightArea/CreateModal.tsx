/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import ModalOverlay from '../../common/modal/ModalOverlay';
import ModalContainer from '../../common/modal/ModalContainer';
import CustomBtn from '../../common/CustomBtn';
import { useState } from 'react';
import InputLabel from '../../common/InputLabel';
import { useRecoilState } from 'recoil';
import { teamsAtom } from '../../../recoil/atoms/teamAtom';
import { createTeamApi } from '../../../api/teamApi';
import { userAtom } from '../../../recoil/atoms/userAtom';

type CreateModalProps = {
  onClose: () => void;
  spaceName: string;
  spaceDescription: string;
  maxMembers: number;
  entryPassword: string;
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
  maxMembers,
  entryPassword,
}: CreateModalProps) => {
  const [selfIntro, setSelfIntro] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [teams, setTeams] = useRecoilState(teamsAtom);
  const [user] = useRecoilState(userAtom);

  const handleCreate = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user || !user.id) {
        throw new Error('User is not logged in.');
      }

      const teamData = {
        userId: user.id,
        teamName: spaceName,
        description: spaceDescription,
        teamPassword: entryPassword,
        maxPeople: maxMembers,
        selfIntro,
      };

      console.log('createTeamApi 호출 전');
      const teamId = await createTeamApi(teamData);
      console.log('createTeamApi 호출 후');

      const newTeam = {
        teamId,
        name: teamData.teamName,
        description: teamData.description,
        password: teamData.teamPassword,
        maxPeople: teamData.maxPeople,
        selfIntro: teamData.selfIntro,
        userId: teamData.userId,
      };

      setTeams((prev) => [...prev, newTeam]);

      alert('Team created successfully!');

      onClose();
    } catch (err) {
      console.error('Error creating team:', err);
      setError('Failed to create the team. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay onClose={onClose}>
      <ModalContainer onClose={onClose}>
        <TitleArea>
          <span>Create and Join: </span>
          <span>{spaceName}</span>
        </TitleArea>
        <Description>{spaceDescription}</Description>
        <InputLabel
          label="Self Introduction"
          value={selfIntro}
          placeholder="Write a short introduction of yourself"
          onChange={(e) => setSelfIntro(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <CustomBtn
          text={loading ? 'Creating...' : 'Create'}
          padding="14px 28px"
          onClick={handleCreate}
          disabled={loading}
        />
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CreateModal;
