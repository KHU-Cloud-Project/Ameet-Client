/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import Header from './meetingHeader/MeetingHeader';
import MemberBoard from '../dashboard/memberBoard/MemberBoard';
import MeetingSettingBoard from '../dashboard/meetingSettingBoard/MeetingSettingBoard';
import LogBoard from '../dashboard/logBoard/LogBoard';

// const DashboardBody = styled.div`
//   display: flex;
//   flex: 1;
//   padding: 28px 38px 34px 28px; // TRBL
//   overflow: hidden;
// `;

// const BlockWrapper = styled.div`
//   display: flex;
//   flex: 1;
//   gap: 26px;
//   overflow: hidden;
// `;

// const BlockColumn = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex: 1;
//   gap: 18px;
//   overflow: hidden;
// `;

function Meeting() {
  const dummyHasSearchbar = true;
  const dummyIsAdmin = true;

  const handleRemoveMember = (nickname: string) => {
    console.log(`Remove member: ${nickname}`);
  };

  return (
    <>
      <Header
        title={dummyTitle}
        hasSearchbar={dummyHasSearchbar}
        user={dummyUser}
      />
      {/* <DashboardBody>
        <BlockWrapper>
          <BlockColumn>
            <MemberBoard
              members={dummyMembers}
              isAdmin={dummyIsAdmin}
              onRemoveMember={handleRemoveMember}
            />
            <LogBoard />
          </BlockColumn>
          <MeetingSettingBoard />
        </BlockWrapper>
      </DashboardBody> */}
    </>
  );
}

export default Meeting;

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
