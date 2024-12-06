/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import TimerComponent from './TimeLeft';
import QuitBtn from './QuitBtn';
import BoardContainer from '../../common/board/BoardContainer';
import BoardTitle from '../../common/board/BoardTitle';
import { endMeetingApi } from '../../../api/meetingApi';

const FixedHeightContainer = styled(BoardContainer)`
  height: 140px; /* 고정된 높이 */
  flex: none; /* 부모 flex 속성 무시 */
`;

function EtcBoard({ meetingId }: { meetingId: number }) {
  const meetingDuration = 5400; // 예: 1시간 30분 (초 단위)

  const handleExit = () => {
    console.log('Exit button clicked');
  };

  const handleQuitMeeting = async () => {
    try {
      const meetingData = await endMeetingApi(meetingId);
      console.log('Meeting ended successfully:', meetingData);
    } catch (error) {
      console.error('Failed to end the meeting:', error);
    }
  };

  return (
    <FixedHeightContainer>
      <BoardTitle>
        <TimerComponent initialTime={meetingDuration} />
        <QuitBtn onExit={handleExit} onQuitMeeting={handleQuitMeeting} />
      </BoardTitle>
    </FixedHeightContainer>
  );
}

export default EtcBoard;
