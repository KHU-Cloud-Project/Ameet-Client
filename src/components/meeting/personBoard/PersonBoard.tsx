// import styled from '@emotion/styled';

// type Participant = {
//     id: string;
//     name: string;
//     role: string;
//     image: string;
//     introduction: string;
//   };

// const participants: Participant[] = [
//   { id: '1', name: 'Sumin', role: 'Admin', image: 'path/to/image1.png', introduction: 'I love cloud ☁️' },
//   { id: '2', name: 'SaY', role: 'Member', image: 'path/to/image2.png', introduction: 'Backend developer' },
// //   { id: '3', name: 'Cherrie', role: 'Member', image: 'path/to/image3.png', introduction: 'Sujin so cute' },
// //   { id: '4', name: 'Sujin', role: 'Member', image: 'path/to/image4.png', introduction: 'I AM MZ' },
// //   { id: '2', name: 'SaY', role: 'Member', image: 'path/to/image2.png', introduction: 'Backend developer' },
// //   { id: '3', name: 'Cherrie', role: 'Member', image: 'path/to/image3.png', introduction: 'Sujin so cute' },
// //   { id: '4', name: 'Sujin', role: 'Member', image: 'path/to/image4.png', introduction: 'I AM MZ' },
  
// ];

// // 컨테이너 스타일
// const PersonContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   flex: 2.2;
//   padding: 20px;
// `;

// // 그리드 스타일
// const ParticipantGrid = styled.div<{ rows: number[] }>`
//   display: grid;
//   gap: 20px;
//   grid-template-rows: ${(props) =>
//     props.rows.map((numCards) => `calc(100% / ${props.rows.length})`).join(' ')};
//   grid-template-columns: ${(props) =>
//     `repeat(${Math.max(...props.rows)}, calc(100% / ${Math.max(...props.rows)}))`};
//   justify-items: center;
//   align-items: center;
//   width: 100%;
//   height: 100%;
// `;

// // 카드 스타일
// const ParticipantCard = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background-color: ${(props) => props.theme.colors.background};
//   border-radius: 12px;
//   padding: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   width: 100%;
//   max-width: 100%; /* 컨테이너 크기에 따라 자동 조정 */
//   aspect-ratio: 1.2; /* 가로와 세로 길이를 동일하게 설정 */
//   img {
//     width: 80%;
//     max-width: 120px;
//     height: auto;
//     border-radius: 50%;
//     object-fit: cover;
//     margin-bottom: 10px;
//   }

//   .name {
//     font-size: 1rem;
//     font-weight: bold;
//     color: ${(props) => props.theme.colors.primary};
//   }

//   .role {
//     font-size: 0.9rem;
//     color: ${(props) => props.theme.colors.secondary};
//   }

//   .introduction {
//     font-size: 0.8rem;
//     color: ${(props) => props.theme.colors.textGray};
//     margin-top: 5px;
//     text-align: center;
//   }
// `;

// // 참여자 배치 계산 함수
// const calculateRows = (count: number): number[] => {
//   switch (count) {
//     case 1:
//       return [1];
//     case 2:
//       return [2];
//     case 3:
//       return [2, 1];
//     case 4:
//       return [2, 2];
//     case 5:
//       return [3, 2];
//     case 6:
//       return [3, 3];
//     case 7:
//       return [2, 3, 2];
//     case 8:
//       return [3, 2, 3];
//     default:
//       return []; // 기본 값
//   }
// };

// function PersonBoard() {
//   const rows = calculateRows(participants.length);

//   return (
//     <PersonContainer>
//       <ParticipantGrid rows={rows}>
//         {participants.map((participant) => (
//           <ParticipantCard key={participant.id}>
//             <img src={participant.image} alt={participant.name} />
//             <div className="name">{participant.name}</div>
//             <div className="role">{participant.role}</div>
//             <div className="introduction">{participant.introduction}</div>
//           </ParticipantCard>
//         ))}
//       </ParticipantGrid>
//     </PersonContainer>
//   );
// }

// export default PersonBoard;


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import CustomMemberBlock from './CustomMemberBlock'; // MemberBlock을 import
// import { Participant } from './types'; // Participant 타입 정의가 필요하면 여기에 추가

type Participant = {
    id: string;
    name: string;
    role: string;
    image: string;
    introduction: string;
  };

const participants: Participant[] = [
  {
    id: '1',
    name: 'Sumin',
    role: 'Admin',
    image: 'path/to/image1.png',
    introduction: 'I love cloud ☁️',
  },
  {
    id: '2',
    name: 'SaY',
    role: 'Member',
    image: 'path/to/image2.png',
    introduction: 'Backend developer',
  },
  {
    id: '3',
    name: 'Cherrie',
    role: 'Member',
    image: 'path/to/image3.png',
    introduction: 'Sujin so cute',
  },
  {
    id: '4',
    name: 'Sujin',
    role: 'Member',
    image: 'path/to/image4.png',
    introduction: 'I AM MZ',
  },
  {
    id: '5',
    name: 'Another Member',
    role: 'Member',
    image: 'path/to/image5.png',
    introduction: 'Loves coding!',
  },
  {
    id: '6',
    name: 'Another Member',
    role: 'Member',
    image: 'path/to/image5.png',
    introduction: 'Loves coding!',
  },
  {
    id: '7',
    name: 'Another Member',
    role: 'Member',
    image: 'path/to/image5.png',
    introduction: 'Loves coding!',
  },
];

const PersonContainer = styled.div`
  display: flex;
  flex: 2.2;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

// const ParticipantGrid = styled.div<{ count: number }>`
//   display: grid;
//   gap: 20px;
//   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//   justify-content: center;
//   align-items: center;
//   width: 100%;
// `;

// 그리드 스타일
// const ParticipantGrid = styled.div<{ rows: number[] }>`
//   display: grid;
//   gap: 20px;
//   grid-template-rows: ${(props) =>
//     props.rows.map(() => 'auto').join(' ')}; /* 각 행의 높이 자동 */
//   grid-template-columns: ${(props) =>
//     `repeat(${Math.max(...props.rows)}, calc(100% / ${Math.max(...props.rows)}))`};
//   justify-items: center;
//   align-items: center;
//   width: 100%;
//   height: 100%;
// `;

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
`;


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
      <ParticipantGrid rows={rows}>
      {participants.map((participant, _) => (
          <CustomMemberBlock
            key={participant.id}
            imageUrl={participant.image}
            nickname={participant.name}
            authority={participant.role}
            introduction={participant.introduction}
            isAdmin={participant.role === 'Admin'} // Admin 여부 확인
            // onRemove={() => alert(`${participant.name} removed!`)} // Admin인 경우에만 삭제 버튼 표시
          />
        ))}
      </ParticipantGrid>
    </PersonContainer>
  );
}

export default PersonBoard;