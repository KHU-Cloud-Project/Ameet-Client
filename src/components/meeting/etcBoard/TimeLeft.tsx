import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  // background: #FAFBFC;
`;

const TimerLabel = styled.div`
  font-size: 1rem; /* 작고 얇게 설정 */
  font-weight: 400;
  color: #666;
  margin-bottom: 10px;
`;

const TimerDisplay = styled.div`
  font-size: 1.15rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.textDarkGray};
  padding: 6px 16px;
  border: 1.2px solid ${(props) => props.theme.colors.lineGray};
  border-radius: 8px;
  letter-spacing: 0.25em;
  width: 144px;
  text-align: center;
`;

type TimerComponentProps = {
  initialTime: number; // 초 단위로 전달받는 초기 시간
};

function TimerComponent({ initialTime }: TimerComponentProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime); // props로 초기값 설정

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)); // 0초 이하로 내려가지 않도록 설정
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <TimerContainer>
      <TimerLabel>Time Left</TimerLabel>
      <TimerDisplay>{formatTime(timeLeft)}</TimerDisplay>
    </TimerContainer>
  );
}

export default TimerComponent;
