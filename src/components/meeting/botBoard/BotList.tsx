import styled from '@emotion/styled';

type BotListProps = {
  imageUrl: string; // 봇 이미지 경로
  botType: string; // 봇 유형
  color: string; // 봇 테두리 색상
  selectedBot: string | null; // 선택된 봇
  botName: string;
  onSelectBot: (botType: string) => void; // 클릭 핸들러
};

const BotContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 좌우로 공간을 균등하게 분배 */
  padding: 0 4px; /* 좌우 여백 추가 */
  margin-bottom: 12px;
  //   gap: 15px;
  //   justify-content: center;
  //   margin-bottom: 20px;
`;

const BotImage = styled.img`
  height: 60px;
  width: auto;
  object-fit: cover;
  border-radius: 8px;
`;

//
const BotCircle = styled.div<{ isSelected: boolean }>`
  width: 100px;
  height: 82px;
  border: 1.8px solid ${({ color }) => color};
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  // transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1); /* 호버 시 확대 효과 */
  }
`;

const BotName = styled.span`
  margin-top: 5px;
  text-align: center;
  color: ${(props) => props.theme.colors.textGray};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
`;

function BotList({
  imageUrl,
  botType,
  color,
  selectedBot,
  botName,
  onSelectBot,
}: BotListProps) {
  return (
    <BotContainer>
      <BotCircle
        isSelected={selectedBot === botType}
        color={color}
        onClick={() => onSelectBot(botType)}
      >
        <BotImage src={imageUrl} alt={botType} />
      </BotCircle>
      <BotName>{botName}</BotName>
    </BotContainer>
  );
}

export default BotList;
