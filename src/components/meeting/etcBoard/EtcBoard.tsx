/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import BoardTitle from '../../common/BoardTitle';
import BoardContainer from '../../common/BoardContainer';
import TimerComponent from './TimeLeft';
import QuitBtn from './QuitBtn'



function EtcBoard() {
  const meetingDuration = 5400; // 예: 1시간 30분 (초 단위)

  const handleExit = () => {
    console.log('Exit button clicked');
  };

  const handleQuitMeeting = () => {
    console.log('Quit Meeting button clicked');
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
