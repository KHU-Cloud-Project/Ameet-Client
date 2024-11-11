/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import LeftPanel from './leftPanel/LeftPanel';
import Header from './header/Header';
import MemberBoard from './memberBoard/MemberBoard';

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// 추후 Modularize

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
`;

const BlockColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2.9;
  gap: 18px;
`;

// const Block1 = styled.div`
//   background-color: ${(props) => props.theme.colors.pastelYellow};
//   padding: 16px;
//   border-radius: ${(props) => props.theme.borderRadius.small};
//   overflow-x: auto;
//   white-space: nowrap;
//   flex: 1;
// `;

const Block2 = styled.div`
  background-color: ${(props) => props.theme.colors.pastelGreen};
  padding: 16px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  flex: 2;
`;

const Block3 = styled.div`
  background-color: ${(props) => props.theme.colors.pastelPurple};
  padding: 16px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  flex: 1;
`;

function Dashboard() {
  const dummyHasSearchbar = true;
  const dummyIsAdmin = true;

  const handleRemoveMember = (nickname: string) => {
    console.log(`Remove member: ${nickname}`);
  };

  return (
    <DashboardContainer>
      <LeftPanel />
      <ContentWrapper>
        <Header
          title={dummyTitle}
          hasSearchbar={dummyHasSearchbar}
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
              <Block2>Block 2</Block2>
            </BlockColumn>
            <Block3>Block 3</Block3>
          </BlockWrapper>
        </DashboardBody>
      </ContentWrapper>
    </DashboardContainer>
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
