/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import EtcBoard from './etcBoard/EtcBoard';
import BotBoard from './botBoard/BotBoard';
import PersonBoard from './personBoard/PersonBoard';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../recoil/atoms/userAtom';
import BoardHeader from '../common/board/header/BoardHeader';
import { Meeting as MeetingType } from '../../models/Meeting';

type MeetingProps = {
  meeting: MeetingType | null;
  loading: boolean;
  error: string | null;
  teamName: string;
};

const MeetingBody = styled.div`
  display: flex;
  flex: 1;
  padding: 28px 15px 28px 15px; // TRBL
  overflow: hidden;
`;

// const DummyBoard = styled.div`
//   display: flex;
//   flex: 2.2;
//   gap: 26px;
//   overflow: hidden;
// `;

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

const Meeting = ({ meeting, loading, error, teamName }: MeetingProps) => {
  const [user] = useRecoilState(userAtom);

  if (!user || !user.id) {
    throw new Error('User data is not present.');
  }

  return (
    <>
      <BoardHeader
        title={teamName}
        hasSearchbar={false}
        user={user}
        hasLogo={true}
      />
      <MeetingBody>
        <BlockWrapper>
          <PersonBoard />
          <BlockColumn>
            <EtcBoard />
            <BotBoard />
          </BlockColumn>
        </BlockWrapper>
      </MeetingBody>
    </>
  );
};

export default Meeting;
