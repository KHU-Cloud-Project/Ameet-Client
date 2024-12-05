/** @jsxImportSource @emotion/react */
import TimerComponent from './TimeLeft';
import QuitBtn from './QuitBtn';
import BoardContainer from '../../common/board/BoardContainer';
import BoardTitle from '../../common/board/BoardTitle';
import { endMeetingApi } from '../../../api/meetingApi';

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
    <BoardContainer flex="none">
      <BoardTitle>
        <TimerComponent initialTime={meetingDuration} />
        <QuitBtn onExit={handleExit} onQuitMeeting={handleQuitMeeting} />
      </BoardTitle>
    </BoardContainer>
  );
}

export default EtcBoard;
