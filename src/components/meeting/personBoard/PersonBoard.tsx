import styled from '@emotion/styled';

type Participant = {
  id: string;
  name: string;
  role: string;
  image: string;
  introduction: string;
};

const PersonContainer = styled.div`
  display: flex;
  gap: 20px; /* 좌우 간격 */
  height: 100%; /* 화면에 꽉 차게 설정 */
  flex: 2.2;
`;

const participants: Participant[] = [
  { id: '1', name: 'Sumin', role: 'Admin', image: 'path/to/image1.png', introduction: 'I love cloud ☁️' },
  { id: '2', name: 'SaY', role: 'Member', image: 'path/to/image2.png', introduction: 'Backend developer' },
  { id: '3', name: 'Cherrie', role: 'Member', image: 'path/to/image3.png', introduction: 'Sujin so cute' },
  { id: '4', name: 'Sujin', role: 'Member', image: 'path/to/image4.png', introduction: 'I AM MZ' },
  { id: '5', name: 'Sujin2', role: 'Member', image: 'path/to/image4.png', introduction: 'I AM MZ' },
  // 필요한 만큼 추가
];

// const ParticipantGrid = styled.div<{ count: number }>`
//   display: grid;
//   gap: 20px;
//   padding: 20px;
//   grid-template-columns: repeat(${(props) => Math.min(props.count, 4)}, 1fr); /* 최대 4열 */
//   grid-template-rows: auto;
//   justify-items: center;

//   @media (max-width: 768px) {
//     grid-template-columns: repeat(${(props) => Math.min(props.count, 2)}, 1fr); /* 작은 화면에서는 최대 2열 */
//   }
// `;

const ParticipantGrid = styled.div<{ count: number }>`
  display: grid;
  gap: 20px;
  padding: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* 최소 200px, 최대 균등 분배 */
  grid-auto-rows: minmax(200px, auto); /* 최소 높이 200px, 필요시 자동 확장 */
  justify-items: center; /* 각 카드 중앙 정렬 */
  align-items: center; /* 세로로 중앙 정렬 */
  width: 100%; /* 그리드 너비를 부모에 맞춤 */
  max-width: 1000px; /* 그리드 최대 너비 제한 */
  margin: 0 auto; /* 그리드를 중앙으로 정렬 */
`;

const ParticipantCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 10px;
  }

  .name {
    font-size: 1rem;
    font-weight: bold;
    color: ${(props) => props.theme.colors.primary};
  }

  .role {
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.secondary};
  }

  .introduction {
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.textGray};
    margin-top: 10px;
    text-align: center;
  }
`;

function PersonBoard() {
  return (
    <PersonContainer>
        <ParticipantGrid count={participants.length}>
      {participants.map((participant) => (
        <ParticipantCard key={participant.id}>
          <img src={participant.image} alt={participant.name} />
          <div className="name">{participant.name}</div>
          <div className="role">{participant.role}</div>
          <div className="introduction">{participant.introduction}</div>
        </ParticipantCard>
      ))}
    </ParticipantGrid>
    </PersonContainer>
  );
}

export default PersonBoard;