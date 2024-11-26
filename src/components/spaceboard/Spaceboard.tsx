/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import BoardHeader from '../common/board/BoardHeader';
import SpaceArea from './spaceArea/SpaceArea';
import LogBoard, { Log } from '../common/logBoard/LogBoard';
import CreateArea from './rightArea/CreateArea';
import UseAdvancedArea from './rightArea/UseAdvancedArea';

const SpaceboardBody = styled.div`
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

const BlockColumn = styled.div<{ flex?: string }>`
  display: flex;
  flex-direction: column;
  flex: ${(props) => props.flex || '1'};
  gap: 18px;
  overflow: hidden;

  & > div:first-of-type {
    flex: 1.3;
  }

  & > div:last-of-type {
    flex: 1;
  }
`;

function Spaceboard() {
  return (
    <>
      <BoardHeader
        title="Manage Space"
        hasSearchbar={dummyHasSearchbar}
        hasDescription={false}
        user={dummyUser}
      />
      <SpaceboardBody>
        <BlockWrapper>
          <BlockColumn>
            <SpaceArea spaces={dummySpaces} />
            <LogBoard
              logs={dummyLogs}
              itemsPerPage={4}
              title="All Meeting Logs"
            />
          </BlockColumn>
          <BlockColumn flex="none">
            <CreateArea />
            <UseAdvancedArea />
          </BlockColumn>
        </BlockWrapper>
      </SpaceboardBody>
    </>
  );
}

export default Spaceboard;

// 더미데이터

const dummyHasSearchbar = false;
const dummyUser = {
  name: 'Cherrie',
  role: 'Member',
  profileImage: 'https://picsum.photos/200',
};

const dummySpaces = [
  {
    name: 'Sumin',
    role: 'OWNER',
  },
  {
    name: '영통먹짱들우하핫하하최고',
    role: 'MEMBER',
  },
  {
    name: 'Capstone',
    role: 'MEMBER',
  },
  {
    name: '수진팬클럽',
    role: 'OWNER',
  },
  {
    name: 'Cloud Project',
    role: 'OWNER',
  },
  {
    name: 'AUSG',
    role: 'MEMBER',
  },
  {
    name: '학생회',
    role: 'MEMBER',
  },
  {
    name: 'Startup Project',
    role: 'OWNER',
  },
  {
    name: '디닷임원진',
    role: 'OWNER',
  },
];

const dummyLogs: Log[] = Array.from({ length: 130 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Meeting ${i + 1}`,
  date: `2024-09-01 23:00:01`,
  length: 3799 + i * 10,
  participants: [
    { nickname: 'Say' },
    { nickname: 'Sumin' },
    { nickname: 'User3' },
    { nickname: 'User4' },
  ],
}));
