// /** @jsxImportSource @emotion/react */
// import styled from '@emotion/styled';

// type Bot = {
//   id: string;
//   icon: string; // 이미지 경로 또는 아이콘 이름
//   name: string;
// };

// const bots: Bot[] = [
//   { id: 'bot1', icon: '💧', name: 'WaterBot' },
//   { id: 'bot2', icon: '🔄', name: 'LoopBot' },
//   { id: 'bot3', icon: '⚡', name: 'EnergyBot' },
// ];

// const BotContainer = styled.div`
//   display: flex;
//   gap: 20px;
//   justify-content: center;
//   padding: 10px;
// `;

// const BotButton = styled.button<{ isSelected: boolean }>`
//   width: 60px;
//   height: 60px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 1.5rem;
//   border-radius: 50%;
//   border: 2px solid ${(props) => (props.isSelected ? props.theme.colors.primary : props.theme.colors.lightGray)};
//   background-color: ${(props) => props.theme.colors.white};
//   cursor: pointer;
//   box-shadow: ${(props) => (props.isSelected ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none')};
// `;

// type BotListProps = {
//   selectedBot: string | null;
//   onSelectBot: (botId: string) => void;
// };

// function BotList({ selectedBot, onSelectBot }: BotListProps) {
//   return (
//     <BotContainer>
//       {bots.map((bot) => (
//         <BotButton
//           key={bot.id}
//           isSelected={selectedBot === bot.id}
//           onClick={() => onSelectBot(bot.id)}
//         >
//           {bot.icon}
//         </BotButton>
//       ))}
//     </BotContainer>
//   );
// }

// export default BotList;

import styled from '@emotion/styled';

type BotListProps = {
  selectedBot: string | null;
  onSelectBot: (botId: string) => void;
};

const BotContainer = styled.div`
  display: flex;
  justify-content: space-between; /* 좌우로 공간을 균등하게 분배 */
  padding: 0 20px; /* 좌우 여백 추가 */
  margin-bottom: 20px;
//   gap: 15px;
//   justify-content: center;
//   margin-bottom: 20px;
`;

const BotCircle = styled.div<{ color: string; isSelected: boolean }>`
width: 70px; /* 크기 확대 */
  height: 70px; /* 크기 확대 */
  background-color: ${({ isSelected }) => (isSelected ? '#f9f9f9' : 'transparent')}; /* 선택된 경우 배경색 추가 */
  border: 3px solid ${({ color }) => color}; /* 테두리 색상 */
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1); /* 호버 시 약간 확대 효과 */
  }  
// width: 40px;
//   height: 40px;
//   background-color: ${({ color }) => color};
//   border-radius: 50%;
//   border: ${({ isSelected }) => (isSelected ? '3px solid #666' : 'none')};
//   cursor: pointer;
`;

const bots = [
  { id: 'bot1', color: '#4CAF93' }, // 청록색
  { id: 'bot2', color: '#8C4CBF' }, // 보라색
  { id: 'bot3', color: '#FFC107' }, // 노란색
];

function BotList({ selectedBot, onSelectBot }: BotListProps) {
  return (
    <BotContainer>
      {bots.map((bot) => (
        <BotCircle
          key={bot.id}
          color={bot.color}
          isSelected={selectedBot === bot.id}
          onClick={() => onSelectBot(bot.id)}
        />
      ))}
    </BotContainer>
  );
}

export default BotList;