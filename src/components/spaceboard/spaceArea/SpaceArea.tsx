/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import BoardTitle from '../../common/board/BoardTitle';
import BoardContainer from '../../common/board/BoardContainer';
import SpaceBlock, { JoinSpaceBlock } from './SpaceBlock';
import { Team } from '../../../models/Team';
// import { LeftArrow, RightArrow } from './ScrollArrows';

type MemberBoardProps = {
  spaces: Team[];
};

const ScrollableSpaceList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 12px;
  // white-space: nowrap;
  // max-width: 100%;
`;

const SpaceListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  // width: 100%;
  // overflow-x: auto;
  // align-items: center;
`;

const SpaceArea = ({ spaces }: MemberBoardProps) => {
  return (
    // <BoardContainer flex="none">
    <BoardContainer padding="20px 8px 20px 20px">
      <BoardTitle>Spaces</BoardTitle>
      <ScrollableSpaceList>
        {/* <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}> */}
        <ScrollMenu>
          <SpaceListContainer>
            <JoinSpaceBlock />
            {spaces.map((space) => (
              // <SpaceBlock key={space.teamId} name={name} role={space.role ?? ''} />
              <SpaceBlock key={space.teamId} team={space} />
            ))}
          </SpaceListContainer>
        </ScrollMenu>
      </ScrollableSpaceList>
    </BoardContainer>
  );
};

export default SpaceArea;
