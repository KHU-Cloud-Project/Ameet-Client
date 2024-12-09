/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import CustomMemberBlock from './CustomMemberBlock';
import ButtonModule from './ButtonModule'; // MemberBlock을 import
import { UserForTeam } from '../../../recoil/atoms/userAtom';
// import { getParticipantLayout } from './LayoutUtils';
// import { Participant } from './types'; // Participant 타입 정의가 필요하면 여기에 추가

const PersonContainer = styled.div`
  position: relative;
  display: flex;
  flex: 2.2;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const RecordingIndicator = styled.div`
  position: absolute;
  top: 130px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;

  .dot {
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
  }

  .text {
    font-size: 0.8rem;
    color: red;
    font-weight: 400;
  }
`;

const DynamicGridContainer = styled.div<{ columns: number }>`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  justify-items: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
`;

const calculateGrid = (
  numParticipants: number,
): { columns: number; rows: number } => {
  if (numParticipants === 1) return { columns: 1, rows: 1 };
  if (numParticipants <= 4)
    return { columns: 2, rows: Math.ceil(numParticipants / 2) };
  if (numParticipants <= 6)
    return { columns: 3, rows: Math.ceil(numParticipants / 3) };

  const columns = Math.ceil(numParticipants / 3);
  return { columns, rows: 3 };
};

type PersonBoardProps = {
  participants?: UserForTeam[];
};

function PersonBoard({ participants = [] }: PersonBoardProps) {
  // function PersonBoard({ participants = dummy_participants }) {
  const renderParticipants = () => {
    const { columns } = calculateGrid(participants.length);

    return (
      <DynamicGridContainer columns={columns}>
        {participants.map((participant) => (
          <CustomMemberBlock
            key={participant.nickname}
            imageUrl={participant.profile ?? ''}
            nickname={participant.nickname}
            authority={participant.role ?? ''}
          />
        ))}
      </DynamicGridContainer>
    );
  };

  return (
    <PersonContainer>
      <RecordingIndicator>
        <div className="dot"></div>
        <div className="text">recording..</div>
      </RecordingIndicator>
      {participants.length === 0 ? (
        <div>No user in meeting</div>
      ) : (
        renderParticipants()
      )}
      <ButtonModule />
    </PersonContainer>
  );
}
export default PersonBoard;

// const renderLayout = () => {
//   if (participants.length === 0) {
//     return <div>No user in meeting</div>;
//   } else if (participants.length === 1) {
//     return (
//       <FlexContainer>
//         {participants.map((participant) => (
//           <CustomMemberBlock
//             key={participant.nickname}
//             imageUrl={participant.profile ?? ''}
//             nickname={participant.nickname}
//             authority={participant.role ?? ''}
//           />
//         ))}
//       </FlexContainer>
//     );
//   } else if (participants.length === 2) {
//     return (
//       <FlexContainer>
//         {participants.map((participant) => (
//           <CustomMemberBlock
//             key={participant.nickname}
//             imageUrl={participant.profile ?? ''}
//             nickname={participant.nickname}
//             authority={participant.role ?? ''}
//           />
//         ))}
//       </FlexContainer>
//     );
//   } else if (participants.length === 3) {
//     return (
//       <>
//         <GridContainer style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
//           {participants.slice(0, 2).map((participant) => (
//             <CustomMemberBlock
//               key={participant.nickname}
//               imageUrl={participant.profile ?? ''}
//               nickname={participant.nickname}
//               authority={participant.role ?? ''}
//             />
//           ))}
//         </GridContainer>
//         <FlexContainer>
//           {participants.slice(2).map((participant) => (
//             <CustomMemberBlock
//               key={participant.nickname}
//               imageUrl={participant.profile ?? ''}
//               nickname={participant.nickname}
//               authority={participant.role ?? ''}
//             />
//           ))}
//         </FlexContainer>
//       </>
//     );
//   } else if (participants.length === 4) {
//     return (
//       <GridContainer style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
//         {participants.map((participant) => (
//           <CustomMemberBlock
//             key={participant.nickname}
//             imageUrl={participant.profile ?? ''}
//             nickname={participant.nickname}
//             authority={participant.role ?? ''}
//           />
//         ))}
//       </GridContainer>
//     );
//   } else if (participants.length === 5) {
//     return (
//       <>
//         <GridContainer style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
//           {participants.slice(0, 3).map((participant) => (
//             <CustomMemberBlock
//               key={participant.nickname}
//               imageUrl={participant.profile ?? ''}
//               nickname={participant.nickname}
//               authority={participant.role ?? ''}
//             />
//           ))}
//         </GridContainer>
//         <FlexContainer>
//           {participants.slice(3).map((participant) => (
//             <CustomMemberBlock
//               key={participant.nickname}
//               imageUrl={participant.profile ?? ''}
//               nickname={participant.nickname}
//               authority={participant.role ?? ''}
//             />
//           ))}
//         </FlexContainer>
//       </>
//     );
//   } else if (participants.length === 6) {
//     return (
//       <GridContainer style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
//         {participants.map((participant) => (
//           <CustomMemberBlock
//             key={participant.nickname}
//             imageUrl={participant.profile ?? ''}
//             nickname={participant.nickname}
//             authority={participant.role ?? ''}
//           />
//         ))}
//       </GridContainer>
//     );
//   } else if (participants.length === 7) {
//     return (
//       <>
//         <GridContainer style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
//           {participants.slice(0, 2).map((participant) => (
//             <CustomMemberBlock
//               key={participant.nickname}
//               imageUrl={participant.profile ?? ''}
//               nickname={participant.nickname}
//               authority={participant.role ?? ''}
//             />
//           ))}
//         </GridContainer>
//         <GridContainer style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
//           {participants.slice(2, 5).map((participant) => (
//             <CustomMemberBlock
//               key={participant.nickname}
//               imageUrl={participant.profile ?? ''}
//               nickname={participant.nickname}
//               authority={participant.role ?? ''}
//             />
//           ))}
//         </GridContainer>
//         <FlexContainer>
//           {participants.slice(5).map((participant) => (
//             <CustomMemberBlock
//               key={participant.nickname}
//               imageUrl={participant.profile ?? ''}
//               nickname={participant.nickname}
//               authority={participant.role ?? ''}
//             />
//           ))}
//         </FlexContainer>
//       </>
//     );
//   } else if (participants.length === 8) {
//     return (
//       <>
//         <GridContainer style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
//           {participants.slice(0, 3).map((participant) => (
//             <CustomMemberBlock
//               key={participant.nickname}
//               imageUrl={participant.profile ?? ''}
//               nickname={participant.nickname}
//               authority={participant.role ?? ''}
//             />
//           ))}
//         </GridContainer>
//         <GridContainer style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
//           {participants.slice(3, 5).map((participant) => (
//             <CustomMemberBlock
//               key={participant.nickname}
//               imageUrl={participant.profile ?? ''}
//               nickname={participant.nickname}
//               authority={participant.role ?? ''}
//             />
//           ))}
//         </GridContainer>
//         <GridContainer style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
//           {participants.slice(5).map((participant) => (
//             <CustomMemberBlock
//               key={participant.nickname}
//               imageUrl={participant.profile ?? ''}
//               nickname={participant.nickname}
//               authority={participant.role ?? ''}
//             />
//           ))}
//         </GridContainer>
//       </>
//     );
//   }
//   return null; // 기본 값
// };

// return (
//   <PersonContainer>
//     <RecordingIndicator>
//       <div className="dot"></div>
//       <div className="text">recording..</div>
//     </RecordingIndicator>
//     {renderLayout()}
//     <ButtonModule />
//   </PersonContainer>
// );
// }

// const GridContainer = styled.div`
//   display: grid;
//   gap: 20px;
//   justify-items: center;
//   align-items: center;
//   width: 100%;
//   margin-bottom: 5px;
// `;

// const FlexContainer = styled.div`
//   display: flex;
//   gap: 20px;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
// `;

// function PersonBoard() {
//     const rows = calculateRows(participants.length);

//   return (
//     <PersonContainer>
//       <RecordingIndicator>
//         <div className="dot"></div>
//         <div className="text">recording..</div>
//       </RecordingIndicator>
//       <ParticipantGrid rows={rows}>
//       {participants.map((participant, _) => (
//           <CustomMemberBlock
//             imageUrl={participant.imageUrl}
//             nickname={participant.nickname}
//             authority={participant.authority}
//             introduction={participant.introduction}
//             isAdmin={participant.authority === 'Admin'} // Admin 여부 확인
//             // onRemove={() => alert(${participant.name} removed!)} // Admin인 경우에만 삭제 버튼 표시
//           />
//         ))}
//       </ParticipantGrid>
//     </PersonContainer>
//   );
// }

// export default PersonBoard;

// UI 쉽게 테스트 하려고 만들어둔 더미데이터
// 사용시 function PersonBoard({ participants = dummy_participants }) { 로 두고 하면 됨
const dummy_participants: UserForTeam[] = [
  {
    userId: 1,
    userTeamId: 1,
    profile: 'https://picsum.photos/201',
    nickname: 'Sumin',
    role: 'OWNER',
    introduction: 'I love cloud ☁️ 🌹💘💘',
  },
  {
    userId: 2,
    userTeamId: 2,
    profile: 'https://picsum.photos/202',
    nickname: 'Sumin',
    role: 'MEMBER',
    introduction: 'Backend developer for everyone',
  },
  {
    userId: 3,
    userTeamId: 3,
    profile: 'https://picsum.photos/203',
    nickname: 'Alex',
    role: 'MEMBER',
    introduction: 'Frontend wizard, always looking for pixel perfection.',
  },
  {
    userId: 4,
    userTeamId: 4,
    profile: 'https://picsum.photos/204',
    nickname: 'Jordan',
    role: 'MEMBER',
    introduction: 'Full-stack enthusiast 🌍🚀.',
  },
  {
    userId: 5,
    userTeamId: 5,
    profile: 'https://picsum.photos/205',
    nickname: 'Taylor',
    role: 'MEMBER',
    introduction: 'Data-driven decision maker 📊📈.',
  },
  {
    userId: 6,
    userTeamId: 6,
    profile: 'https://picsum.photos/206',
    nickname: 'Morgan',
    role: 'MEMBER',
    introduction: 'Design lover, making ideas come to life 🎨.',
  },
  {
    userId: 7,
    userTeamId: 7,
    profile: 'https://picsum.photos/207',
    nickname: 'Chris',
    role: 'MEMBER',
    introduction: 'Cloud infrastructure and DevOps fanatic ☁️💻.',
  },
  {
    userId: 8,
    userTeamId: 8,
    profile: 'https://picsum.photos/208',
    nickname: 'Sam',
    role: 'MEMBER',
    introduction: 'AI and ML geek 🤖✨.',
  },
];
