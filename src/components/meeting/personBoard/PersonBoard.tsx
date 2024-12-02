/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import CustomMemberBlock from './CustomMemberBlock'; // MemberBlock을 import
// import { Participant } from './types'; // Participant 타입 정의가 필요하면 여기에 추가

type Participant = {
  imageUrl: string;
  nickname: string;
  authority: string;
  introduction: string;
  };

const participants: Participant[] = [
  {
    imageUrl: 'https://picsum.photos/201',
    nickname: 'Sumin',
    authority: 'Admin',
    introduction: 'I love cloud ☁️ 🌹💘💘',
  },
  {
    imageUrl: 'https://picsum.photos/202',
    nickname: 'SaY',
    authority: 'Member',
    introduction: 'backend developer',
  },
  {
    imageUrl: 'https://picsum.photos/203',
    nickname: 'Cherrie',
    authority: 'Member',
    introduction: 'Sujin so cute',
  },
  {
    imageUrl: 'https://picsum.photos/204',
    nickname: 'Sujin',
    authority: 'Member',
    introduction: 'I AM MZ',
  },
  // {
  //   imageUrl: 'https://picsum.photos/205',
  //   nickname: 'Gyeongtaek',
  //   authority: 'Member',
  //   introduction: 'I AM ZM',
  // },
  // {
  //   imageUrl: 'https://picsum.photos/205',
  //   nickname: 'Gyeongtaek',
  //   authority: 'Member',
  //   introduction: 'I AM ZM',
  // },
];

const PersonContainer = styled.div`
  display: flex;
  flex: 2.2;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px;
;`

const RecordingIndicator = styled.div`
  position: absolute;
  top: 130px; /* 헤더 바로 아래로 */
  left: 20px; /* 왼쪽 여백 */
  display: flex;
  align-items: center;
  gap: 8px; /* 원과 텍스트 간 간격 */

  .dot {
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%; /* 동그란 모양 */
  }

  .text {
    font-size: 0.8rem;
    color: red;
    font-weight: 400;
  }
`;

const ParticipantGrid = styled.div<{ rows: number[] }>`
  display: grid;
  gap: 20px;
  grid-template-rows: ${(props) => props.rows.map(() => '1fr').join(' ')};
  grid-template-columns: ${(props) =>
    `repeat(${Math.max(...props.rows)}, 1fr)`};
  justify-items: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  height: 100%;
;`

// const ParticipantGrid = styled.div<{ rows: number[] }>`
//   display: grid;
//   gap: 20px;

//   /* 동적으로 열과 행 설정 */
//   grid-template-rows: ${(props) =>
//     props.rows.map(() => '1fr').join(' ')};
//   grid-template-columns: ${(props) =>
//     props.rows.length === 1 && props.rows[0] === 1
//       ? 'auto'
//       : repeat(${Math.max(...props.rows)}, 1fr)};

//   justify-items: center; /* 카드 가로 중앙 정렬 */
//   align-items: center; /* 카드 세로 중앙 정렬 */
//   width: 100%;
//   max-width: 1200px;
//   height: 100%;
// `;

// 참여자 배치 계산 함수
const calculateRows = (count: number): number[] => {
    switch (count) {
      case 1:
        return [1];
      case 2:
        return [2];
      case 3:
        return [2, 1];
      case 4:
        return [2, 2];
      case 5:
        return [3, 2];
      case 6:
        return [3, 3];
      case 7:
        return [2, 3, 2];
      case 8:
        return [3, 2, 3];
      default:
        return []; // 기본 값
    }
  };

function PersonBoard() {
    const rows = calculateRows(participants.length);

  return (
    <PersonContainer>
      <RecordingIndicator>
        <div className="dot"></div>
        <div className="text">recording..</div>
      </RecordingIndicator>
      <ParticipantGrid rows={rows}>
      {participants.map((participant, _) => (
          <CustomMemberBlock
            imageUrl={participant.imageUrl}
            nickname={participant.nickname}
            authority={participant.authority}
            introduction={participant.introduction}
            isAdmin={participant.authority === 'Admin'} // Admin 여부 확인
            // onRemove={() => alert(${participant.name} removed!)} // Admin인 경우에만 삭제 버튼 표시
          />
        ))}
      </ParticipantGrid>
    </PersonContainer>
  );
}

export default PersonBoard;