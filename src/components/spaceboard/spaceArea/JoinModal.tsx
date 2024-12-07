/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import ModalOverlay from '../../common/modal/ModalOverlay';
import ModalContainer from '../../common/modal/ModalContainer';
import BoardTitle from '../../common/board/BoardTitle';
import CustomBtn from '../../common/CustomBtn';
import { useState } from 'react';
import InputLabel from '../../common/InputLabel';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../../recoil/atoms/userAtom';
import { joinTeamApi } from '../../../api/teamApi';

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
  const [teamPassword, setTeamPassword] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [user] = useRecoilState(userAtom);

  const handleJoin = async () => {
    try {
      setLoading(true);

      if (!user || !user.id) {
        throw new Error('User is not logged in.');
      }

      const teamData = {
        userId: user.id,
        teamName: spaceName,
        description: description,
        teamPassword: teamPassword,
      };

      await joinTeamApi(teamData);

      alert(`Joined ${teamData.teamName} successfully!`);
      onClose();
    } catch (err) {
      console.error('Error joining team:', err);
      alert('Failed to join the team. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            value={teamPassword}
            placeholder="enter entry password"
            type="password"
            onChange={(e) => setTeamPassword(e.target.value)}
          />
          <InputLabel
            label="Self Introduction"
            value={description}
            placeholder="write a short introduction of yourself"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Content>
        <div style={{ height: '12px' }}></div>
        <CustomBtn
          text={loading ? 'Joining...' : 'Join'}
          padding="14px 28px"
          onClick={() => {
            handleJoin();
          }}
          disabled={!spaceName || !teamPassword}
        />
      </ModalContainer>
    </ModalOverlay>
  );
};

export default JoinModal;
