/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import BoardHeader from '../common/board/BoardHeader';
import SpaceArea from './spaceArea/SpaceArea';
import LogBoard from '../common/logBoard/LogBoard';
import CreateArea from './rightArea/CreateArea';
import UseAdvancedArea from './rightArea/UseAdvancedArea';
import { dummyLogs } from '../../models/Log';

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

const BlockColumn = styled.div<{
  flex?: string;
  firstChildFlex: string;
  lastChildFlex: string;
}>`
  display: flex;
  flex-direction: column;
  flex: ${(props) => props.flex || '1'};
  gap: 18px;
  overflow: hidden;

  & > div:first-of-type {
    flex: ${(props) => props.firstChildFlex};
    max-height: 50%;
    overflow: auto;
  }

  & > div:last-of-type {
    flex: ${(props) => props.lastChildFlex};
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
          <BlockColumn firstChildFlex="content" lastChildFlex="80">
            <SpaceArea spaces={dummySpaces} />
            <LogBoard
              logs={dummyLogs}
              itemsPerPage={4}
              title="All Meeting Logs"
            />
          </BlockColumn>
          <BlockColumn
            flex="none"
            // firstChildFlex="content"
            // lastChildFlex="1000"
            firstChildFlex="1.01"
            lastChildFlex="1"
          >
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
