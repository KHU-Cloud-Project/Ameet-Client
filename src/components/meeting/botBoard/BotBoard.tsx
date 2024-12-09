import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import BotList from './BotList';
import BotResponses from './BotResponses';
import Divider from '../../common/Divider';
import { theme } from '../../../styles/theme';

const BoardContainer = styled.div`
  display: flex;
  flex: 4;
  flex-direction: column;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  max-height: 85%;
`;

const BoardTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* 아이템 간 간격 */
`;

const BotContainer = styled.div`
  display: flex;
  justify-content: space-between; /* 가로로 균등 분배 */
  align-items: center; /* 세로 중앙 정렬 */
  gap: 20px; /* 각 봇 간격 */
  margin-bottom: 0;
`;
const bots = [
  {
    name: 'Summarize',
    imageUrl: '/src/assets/images/positive_colored.png',
    botType: 'Positive Feedback',
    color: '#B585F6', // 청록색
  },
  {
    name: 'Positive',
    imageUrl: '/src/assets/images/attendacne_checker_colored.png',
    botType: 'Attendance Checker',
    color: '#90D4AB', // 보라색
  },
  {
    name: 'Negative',
    imageUrl: '/src/assets/images/summary_colored.png',
    botType: 'Summary',
    color: '#F096A7', // 노란색
  },
];

const responsesMap: { [botType: string]: string } = {
  'Positive Feedback':
    'Stay hydrated during your meeting!Stay hydrated during your meeting!Stay hydrated during your meeting!Stay hydrated during your meeting!',
  'Attendance Checker':
    'll keep track of your tasks!ll keep track of your tasks!ll keep track of your tasks!ll keep track of your tasks!ll keep track of your tasks!',
  Summary:
    'Let’s boost the productivity!testtesttesttesttestLet’s boost the productivity!testtesttesttesttestLet’s boost the productivity!testtesttesttesttest',
};

type BotBoardProps = {
  presignedUrl: string | undefined | null;
};

function BotBoard({ presignedUrl }: BotBoardProps) {
  const [selectedBot, setSelectedBot] = useState<string | null>(null);
  const [responses, setResponses] = useState<
    { botType: string; text: string }[]
  >([]);

  useEffect(() => {
    if (!presignedUrl) {
      console.warn('Missing presignedUrl.');
      return;
    }
  });

  const handleSelectBot = (botType: string) => {
    const newResponse = { botType, text: responsesMap[botType] };
    setResponses((prev) => [...prev, newResponse]); // 새로운 응답 추가
    setSelectedBot(botType);
  };

  const botColorsAndImages = bots.reduce(
    (acc, bot) => {
      acc[bot.botType] = { color: bot.color, imageUrl: bot.imageUrl };
      return acc;
    },
    {} as { [botType: string]: { color: string; imageUrl: string } },
  );

  return (
    <BoardContainer>
      <BoardTitleContainer>
        <BotContainer>
          {bots.map((bot) => (
            <BotList
              key={bot.botType}
              imageUrl={bot.imageUrl}
              botType={bot.botType}
              color={bot.color}
              selectedBot={selectedBot}
              onSelectBot={handleSelectBot}
              botName={bot.name}
            />
          ))}
        </BotContainer>
        <Divider color={theme.colors.lineGray} />
        <BotResponses responses={responses} bots={botColorsAndImages} />
      </BoardTitleContainer>
    </BoardContainer>
  );
}

export default BotBoard;
