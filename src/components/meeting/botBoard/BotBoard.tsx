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
;`

const BoardTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* 아이템 간 간격 */
;`

const BotContainer = styled.div`
  display: flex;
  justify-content: space-between; /* 가로로 균등 분배 */
  align-items: center; /* 세로 중앙 정렬 */
  gap: 20px; /* 각 봇 간격 */
  margin-bottom: 0;
`;
const bots = [
  {
    imageUrl: '/src/assets/images/positive bot.png',
    botType: 'Positive Feedback',
    description: 'Stay hydrated!Stay hydrated!Stay hydrated!Stay hydrated!Stay hydrated!Stay hydrated!Stay hydrated!Stay hydrated!',
    color: '#4CAF93', // 청록색
  },
  {
    imageUrl: '/src/assets/images/attendance checker.png',
    botType: 'Attendance Checker',
    description: 'Track your tasks.Track your tasks.Track your tasks.Track your tasks.Track your tasks.Track your tasks.Track your tasks.Track your tasks.',
    color: '#8C4CBF', // 보라색
  },
  {
    imageUrl: '/src/assets/images/negative bot.png',
    botType: 'Negative Feedback',
    description: 'Boost productivity!Boost productivity!Boost productivity!Boost productivity!Boost productivity!Boost productivity!Boost productivity!Boost productivity!',
    color: '#FFC107', // 노란색
  },
];

const responsesMap: { [botType: string]: string } = {
    'Positive Feedback': 'Stay hydrated during your meeting!',
    'Attendance Checker': 'll keep track of your tasks!',
    'Negative Feedback': 'Let’s boost the productivity!testtesttesttesttest',
  };

function BotBoard() {
  const [selectedBot, setSelectedBot] = useState<string | null>(null);

    const [responses, setResponses] = useState<{ botType: string; text: string }[]>(
        []
      );

    const handleSelectBot = (botType: string) => {
      console.log('Selected bot:', botType);
      console.log('Responses:', responses);
      const newResponse = { botType, text: responsesMap[botType] };
      setResponses((prev) => [...prev, newResponse]); // 새로운 응답 추가
      setSelectedBot(botType);
    };

    const botColorsAndImages = bots.reduce((acc, bot) => {
      acc[bot.botType] = { color: bot.color, imageUrl: bot.imageUrl };
      return acc;
    }, {} as { [botType: string]: { color: string; imageUrl: string } });
  

  return (
    <BoardContainer>
      <BoardTitleContainer>
        <BotContainer>
          {bots.map((bot) => (
            <BotList
              imageUrl={bot.imageUrl}
              botType={bot.botType}
              description={bot.description}
              color={bot.color}
              selectedBot={selectedBot}
              onSelectBot={handleSelectBot}
            />
          ))}
        </BotContainer>
      <Divider />
      <BotResponses responses={responses} bots={botColorsAndImages} />
      </BoardTitleContainer>
    </BoardContainer>
  );
}

export default BotBoard;