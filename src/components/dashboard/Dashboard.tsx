/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import BoardHeader from '../common/board/header/BoardHeader';
import MemberBoard from './memberBoard/MemberBoard';
import MeetingSettingBoard from './meetingSettingBoard/MeetingSettingBoard';
import LogBoard from '../common/logBoard/LogBoard';
import { dummyLogs } from '../../models/Log';
import { Team } from '../../models/Team';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../recoil/atoms/userAtom';

type DashboardProps = {
  team: Team;
};

const DashboardBody = styled.div`
  display: flex;
  flex: 1;
  padding: 28px 38px 34px 28px; // TRBL
  overflow: hidden;
`;

const BlockWrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 26px;
  overflow: hidden;
`;

const BlockColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 18px;
  overflow: hidden;
`;

function Dashboard({ team }: DashboardProps) {
  const dummyHasSearchbar = true;
  const [user] = useRecoilState(userAtom);

  if (!user || !user.id) {
    throw new Error('User data is not present.');
  }

  const handleRemoveMember = (nickname: string) => {
    console.log(`Remove member: ${nickname}`);
  };

  console.log('asdfasdfasdfasdfasdfasd', team.role);

  return (
    <>
      <BoardHeader
        title={team.name}
        hasSearchbar={dummyHasSearchbar}
        description={team.description}
        user={user}
      />
      <DashboardBody>
        <BlockWrapper>
          <BlockColumn>
            <MemberBoard
              members={team.memberList || []}
              maxMembers={team.maxPeople || 0}
              onRemoveMember={handleRemoveMember}
            />
            <LogBoard logs={dummyLogs} />
          </BlockColumn>
          <MeetingSettingBoard />
        </BlockWrapper>
      </DashboardBody>
    </>
  );
}

export default Dashboard;
