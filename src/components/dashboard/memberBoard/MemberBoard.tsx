/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import MemberBlock from './MemberBlock';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import BoardTitle from '../../common/board/BoardTitle';
import BoardContainer from '../../common/board/BoardContainer';
import { UserForTeam } from '../../../recoil/atoms/userAtom';

type MemberBoardProps = {
  members: UserForTeam[];
  maxMembers: number;
  loading: boolean;
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

function MemberBoard({
  members,
  maxMembers,
  loading,
  onRemoveMember,
}: MemberBoardProps) {
  return (
    // <BoardContainer flex="none">
    <BoardContainer flex={0.6}>
      {/* todo: flex 설정값 정리하기 */}
      <BoardTitle>
        Members{' '}
        <MemberCount>
          ({loading ? 'Loading...' : `${members.length}/${maxMembers}`})
        </MemberCount>
      </BoardTitle>
      <ScrollableMemberList>
        {/* <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}> */}
        <ScrollMenu>
          <MemberListContainer>
            {loading ? (
              <></>
            ) : (
              members.map((member) => (
                <MemberBlock
                  key={member.userTeamId || member.nickname}
                  member={member}
                  onRemove={() =>
                    onRemoveMember && onRemoveMember(member.nickname)
                  }
                />
              ))
            )}
          </MemberListContainer>
        </ScrollMenu>
      </ScrollableMemberList>
    </BoardContainer>
  );
}

export default MemberBoard;
