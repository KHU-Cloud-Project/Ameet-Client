import styled from '@emotion/styled';
import React, { useState } from 'react';
import BotList from './BotList';
import BotResponses from './BotResponses';
import Divider from './Divider';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 8px;
`;

const BoardTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px; /* 아이템 간 간격 */
`;

const bots = {
    bot1: '#4CAF93', // 청록색
    bot2: '#8C4CBF', // 보라색
    bot3: '#FFC107', // 노란색
  };

const responsesMap: { [key: string]: string } = {
    bot1: 'WaterBot: Stay hydrated during your meeting!',
    bot2: 'LoopBot: I’ll keep track of your tasks!',
    bot3: 'EnergyBot: Let’s boost the productivity!testtesttesttesttest',
  };

function BotBoard() {
    const [responses, setResponses] = useState<{ botId: string; text: string }[]>(
        []
      );

    const handleSelectBot = (botId: string) => {
      const newResponse = { botId, text: responsesMap[botId] };
      setResponses((prev) => [...prev, newResponse]); // 새로운 응답 추가
    };

  return (
    <BoardContainer>
      <BoardTitleContainer>
      <BotList selectedBot={null} onSelectBot={handleSelectBot} />
      <Divider />
      <BotResponses responses={responses} bots={bots}/>
      </BoardTitleContainer>
    </BoardContainer>
  );
}

export default BotBoard;

