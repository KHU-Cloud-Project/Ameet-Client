import React, { useState } from 'react';
import styled from '@emotion/styled';

const TimerContainer = styled.div`
  display: flex;
  gap: 5px;
  // justify-content: space-around;
  justify-content: space-evenly;
  align-items: center;
`;

const EachTimeBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimerInput = styled.input`
  width: 42px;
  padding: 5px;
  font-size: 24px;
  text-align: center;
  border: 0.25px solid ${(props) => props.theme.colors.textLightGray};
  border-radius: 2px;
  font-family: 'DigitalNumbers', sans-serif;
`;

const TimerLabel = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.textLightGray};
  text-align: center;
`;

const DashboardTimer: React.FC = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  return (
    <div>
      <TimerContainer>
        <EachTimeBlock>
          <TimerInput
            type="number"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />
          <TimerLabel>HOURS</TimerLabel>
        </EachTimeBlock>
        <EachTimeBlock>
          <TimerInput
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
          />
          <TimerLabel>MINS</TimerLabel>
        </EachTimeBlock>
        <EachTimeBlock>
          <TimerInput
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
          />
          <TimerLabel>SECS</TimerLabel>
        </EachTimeBlock>
      </TimerContainer>
    </div>
  );
};

export default DashboardTimer;
