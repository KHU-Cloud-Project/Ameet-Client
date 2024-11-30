// /** @jsxImportSource @emotion/react */
// import styled from '@emotion/styled';

// const ResponseContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   margin-top: 16px;
//   padding: 10px;
//   background-color: ${(props) => props.theme.colors.textLightGray};
//   border-radius: 8px;
//   max-height: 200px;
//   overflow-y: auto; /* 응답이 많아질 경우 스크롤 활성화 */
// `;

// const ResponseItem = styled.div`
//   padding: 10px;
//   background-color: ${(props) => props.theme.colors.white};
//   border: 1px solid ${(props) => props.theme.colors.lightGray};
//   border-radius: 8px;
//   color: ${(props) => props.theme.colors.textBlack};
// `;

// type BotResponsesProps = {
//   responses: string[];
// };

// function BotResponses({ responses }: BotResponsesProps) {
//   return (
//     <ResponseContainer>
//       {responses.map((response, index) => (
//         <ResponseItem key={index}>{response}</ResponseItem>
//       ))}
//     </ResponseContainer>
//   );
// }

// export default BotResponses;

import styled from '@emotion/styled';

type BotResponsesProps = {
  responses: { botId: string; text: string }[];
  bots: { [key: string]: string }; // 봇 색상 정보
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
  font-size: 1rem;
  display: flex;
  align-items: center; /* 봇 아이콘과 텍스트 정렬 */
  gap: 10px;
`;

const BotIcon = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
`;

function BotResponses({ responses, bots }: BotResponsesProps) {
  return (
    <ResponsesContainer>
      {responses.map((response, index) => (
        <ResponseBubble key={index} color={bots[response.botId]}>
          <BotIcon color={bots[response.botId]} />
          {response.text}
        </ResponseBubble>
      ))}
    </ResponsesContainer>
  );
}

export default BotResponses;