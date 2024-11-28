/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import BoardHeader from '../common/board/BoardHeader';
import MemberBoard from './memberBoard/MemberBoard';
import MeetingSettingBoard from './meetingSettingBoard/MeetingSettingBoard';
import LogBoard from '../common/logBoard/LogBoard';
import { dummyLogs } from '../../models/Log';

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

function Dashboard() {
  const dummyHasSearchbar = true;
  const dummyIsAdmin = true;

  const handleRemoveMember = (nickname: string) => {
    console.log(`Remove member: ${nickname}`);
  };

  return (
    <>
      <BoardHeader
        title={dummyTitle}
        hasSearchbar={dummyHasSearchbar}
        hasDescription={true}
        user={dummyUser}
      />
      <DashboardBody>
        <BlockWrapper>
          <BlockColumn>
            <MemberBoard
              members={dummyMembers}
              isAdmin={dummyIsAdmin}
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

const dummyTitle = 'Space 1';
const dummyUser = {
  name: 'Cherrie',
  role: 'Member',
  profileImage: 'https://picsum.photos/200',
};

const dummyMembers = [
  {
    imageUrl: 'https://picsum.photos/201',
    nickname: 'Sumin',
    authority: 'Admin',
    introduction: 'I love cloud ☁️ 🌹💘💘',
  },
  {
    imageUrl: 'https://picsum.photos/202',
    nickname: 'SaY',
    authority: 'Member',
    introduction: 'backend developer',
  },
  {
    imageUrl: 'https://picsum.photos/203',
    nickname: 'Cherrie',
    authority: 'Member',
    introduction: 'Sujin so cute',
  },
  {
    imageUrl: 'https://picsum.photos/204',
    nickname: 'Sujin',
    authority: 'Member',
    introduction: 'I AM MZ',
  },
  {
    imageUrl: 'https://picsum.photos/205',
    nickname: 'Gyeongtaek',
    authority: 'Member',
    introduction: 'I AM ZM',
  },
];
