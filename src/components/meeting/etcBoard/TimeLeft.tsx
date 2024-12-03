import React, { useState, useEffect } from "react";
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
  font-size: 1.0rem; /* 작고 얇게 설정 */
  font-weight: 400;
  color: #666;
  margin-bottom: 10px;
`;

const TimerDisplay = styled.div`
  font-size: 1.2rem; /* 시간 표시 크기 조정 */
  font-weight: 500; /* 굵기 약간 얇게 */
  color: #333;
  padding: 6px 16px;
  background: #FFFFFF;
  border: 1px solid #ddd;
  border-radius: 8px;
  letter-spacing: 0.3em; /* 시간, 분, 초 사이에 띄어쓰기 추가 */
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