/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import MemberBlock from './MemberBlock';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
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

const BoardContainer = styled.div`
  padding: 20px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: ${(props) => props.theme.shadows.section};
  // flex: 1;
`;

const Title = styled.h2`
  font-size: ${(props) => props.theme.typography.fontSize.large};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.textBlack};
  margin-bottom: 20px;
`;

const MemberCount = styled.span`
  font-size: ${(props) => props.theme.typography.fontSize.large};
  color: ${(props) => props.theme.colors.textGray};
`;

const ScrollableMemberList = styled.div`
  display: flex;
  overflow-x: auto;
  // overflow-x: scroll;
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
  return (
    <BoardContainer>
      <Title>
        Members <MemberCount>({members.length})</MemberCount>
      </Title>
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
