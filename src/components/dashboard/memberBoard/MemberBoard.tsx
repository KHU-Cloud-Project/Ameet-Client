/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import MemberBlock from './MemberBlock';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import BoardTitle from '../../common/BoardTitle';
import BoardContainer from '../../common/BoardContainer';
// import { LeftArrow, RightArrow } from './ScrollArrows';

type Member = {
  imageUrl: string;
  nickname: string;
  authority: string;
  introduction: string;
};

type MemberBoardProps = {
  members: Member[];
  isAdmin: boolean;
  onRemoveMember?: (nickname: string) => void;
};

const MemberCount = styled.span`
  padding-left: 8px;
  font-size: ${(props) => props.theme.typography.fontSize.mediumLarge};
  color: ${(props) => props.theme.colors.textGray};
`;

const ScrollableMemberList = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  max-width: 100%;
`;

const MemberListContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: row;
  align-items: center;
`;

function MemberBoard({ members, isAdmin, onRemoveMember }: MemberBoardProps) {
  const dummyMaxMembers = 8;

  return (
    <BoardContainer flex="none">
      <BoardTitle>
        Members{' '}
        <MemberCount>
          ({members.length}/{dummyMaxMembers})
        </MemberCount>
      </BoardTitle>
      <ScrollableMemberList>
        {/* <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}> */}
        <ScrollMenu>
          <MemberListContainer>
            {members.map((member) => (
              <MemberBlock
                key={member.nickname}
                imageUrl={member.imageUrl}
                nickname={member.nickname}
                authority={member.authority}
                introduction={member.introduction}
                isAdmin={isAdmin}
                onRemove={() =>
                  onRemoveMember && onRemoveMember(member.nickname)
                }
              />
            ))}
          </MemberListContainer>
        </ScrollMenu>
      </ScrollableMemberList>
    </BoardContainer>
  );
}

export default MemberBoard;
