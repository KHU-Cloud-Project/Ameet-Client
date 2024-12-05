import styled from '@emotion/styled';

type BotResponsesProps = {
  responses: { botType: string; text: string }[];
  bots: { [botType: string]: { color: string; imageUrl: string } }; // 봇 정보 (색상, 이미지)
};

const ResponsesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;

  /* 스크롤 가능 설정 */
  max-height: 400px; /* 스크롤 영역의 최대 높이 설정 */
  overflow-y: auto;
  padding-right: 10px;

  /* 스크롤바 스타일 (웹 브라우저마다 다를 수 있음) */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
`;

const ResponseBubble = styled.div<{ color: string }>`
  max-width: 100%;
  background-color: white;
  border: 0.5px solid ${({ color }) => color}; /* 테두리 색상 */
  padding: 10px 15px;
  border-radius: 12px;
  font-size: 0.7rem;
  display: flex;
  font-size: ${(props) => props.theme.typography.fontSize.default};
  color: ${(props) => props.theme.colors.textDarkGray};
  align-items: center; /* 봇 아이콘과 텍스트 정렬 */
  gap: 10px;
`;

const BotIcon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-position: center; /* 이미지 중앙 정렬 */
  border-radius: 12px; /* 동그란 모양 유지 */
`;

function BotResponses({ responses, bots }: BotResponsesProps) {
  return (
    <ResponsesContainer>
      {responses.map((response, index) => {
        const bot = bots[response.botType];
        return (
          <ResponseBubble key={index} color={bot.color}>
            <BotIcon src={bot.imageUrl} alt={response.botType} />
            {response.text}
          </ResponseBubble>
        );
      })}
    </ResponsesContainer>
  );
}

export default BotResponses;
