import styled from '@emotion/styled';

type BotListProps = {
  imageUrl: string; // 봇 이미지 경로
  botType: string; // 봇 유형
  description: string; // 봇 설명
  color: string;
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

const BotImage = styled.img`
  width: 70px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
`;

// 
const BotCircle = styled.div<{ isSelected: boolean }>`
  width: 90px;
  height: 80px;
  background-color: ${({ isSelected }) => (isSelected ? '#f9f9f9' : 'transparent')};
  border: 2px solid ${({ isSelected }) => (isSelected ? '#4CAF93' : '#ccc')}; /* 선택 여부에 따라 테두리 색상 변경 */
  border-radius: 12px; /* 둥근 정사각형 */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1); /* 호버 시 확대 효과 */
  }
`;



function BotList({
  imageUrl,
  botType,
  description,
  color,
  selectedBot,
  onSelectBot,
}: BotListProps) {
  return (
    <BotContainer>
      <BotCircle
      color={color}
        isSelected={selectedBot === botType}
        onClick={() => onSelectBot(botType)}
      >
        <BotImage src={imageUrl} alt={botType} />
      </BotCircle>
      {/* <BotDescription>{description}</BotDescription> */}
    </BotContainer>
  );
}


export default BotList;