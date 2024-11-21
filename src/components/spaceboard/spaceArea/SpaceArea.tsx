/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import BoardTitle from '../../common/board/BoardTitle';
import BoardContainer from '../../common/board/BoardContainer';
import SpaceBlock, { JoinSpaceBlock } from './SpaceBlock';
// import { LeftArrow, RightArrow } from './ScrollArrows';

type Space = {
  name: string;
  role: string;
};

type MemberBoardProps = {
  spaces: Space[];
};

const ScrollableSpaceList = styled.div`
  display: flex;
  overflow-y: auto;
  // white-space: nowrap;
  max-height: 100%;
  // max-width: 100%;
`;

const SpaceListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  // overflow-x: auto;
  // align-items: center;
`;

function SpaceArea({ spaces }: MemberBoardProps) {
  return (
    <BoardContainer flex="none">
      <BoardTitle>Spaces</BoardTitle>
      <ScrollableSpaceList>
        {/* <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}> */}
        <ScrollMenu>
          <SpaceListContainer>
            <JoinSpaceBlock />
            {spaces.map((space) => (
              <SpaceBlock
                key={space.name}
                name={space.name}
                role={space.role}
              />
            ))}
          </SpaceListContainer>
        </ScrollMenu>
      </ScrollableSpaceList>
    </BoardContainer>
  );
}

export default SpaceArea;
