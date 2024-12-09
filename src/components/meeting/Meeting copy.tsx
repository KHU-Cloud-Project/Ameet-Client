/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import EtcBoard from './etcBoard/EtcBoard';
import BotBoard from './botBoard/BotBoard';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../recoil/atoms/userAtom';
import BoardHeader from '../common/board/header/BoardHeader';
import { Meeting as MeetingType } from '../../models/Meeting';
import { useRef } from 'react';
import { useWebRTC } from '../../hooks/useWebRTC';
import { useStomp } from '../../hooks/useStomp';
import PersonBoard from './personBoard/PersonBoard';

type MeetingProps = {
  meeting: MeetingType | null;
  loading: boolean;
  error: string | null;
  teamName: string;
  teamId: number;
};

const MeetingBody = styled.div`
  display: flex;
  flex: 1;
  padding: 28px 15px 28px 15px; // TRBL
  overflow: hidden;
`;

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

const Meeting = ({ meeting, teamName, teamId }: MeetingProps) => {
  const [user] = useRecoilState(userAtom);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  if (!user || !user.id) {
    throw new Error('User data is not present.');
  }

  // const participantsList = meeting?.participants?.join(', ') || '-';

  const { sendMessage, subscribe } = useStomp({
    onConnect: () => {
      console.log(
        'STOMP connected, subscribing to /topic/meeting/participants',
      );

      subscribe('/topic/meeting/participants', (participants) => {
        console.log('Participants:', participants);
      });

      console.log('Sending join message to /api/v1/meeting/enter');
      sendMessage('/api/v1/meeting/enter', user.id);
    },
  });

  useWebRTC(
    localVideoRef,
    remoteVideoRef,
    user.id,
    meeting?.meetingId ?? 0,
    teamId ?? 0,
  );

  return (
    <>
      <BoardHeader
        title={teamName}
        description={meeting?.participants?.join(', ') || '-'}
        hasSearchbar={false}
        user={user}
        hasLogo={true}
      />
      <MeetingBody>
        <BlockWrapper>
          <PersonBoard participants={meeting?.participants} />
          {/* <PersonBoard /> */}
          {/* <div>
            <video
              ref={localVideoRef}
              autoPlay
              muted
              style={{ width: '30%' }}
            />
            <video ref={remoteVideoRef} autoPlay style={{ width: '30%' }} />
          </div> */}
          <BlockColumn>
            <EtcBoard meetingId={meeting?.meetingId ?? 0} />
            <BotBoard />
          </BlockColumn>
        </BlockWrapper>
      </MeetingBody>
    </>
  );
};

export default Meeting;
