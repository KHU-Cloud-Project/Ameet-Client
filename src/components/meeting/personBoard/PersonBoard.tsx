/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import CustomMemberBlock from './CustomMemberBlock'; // MemberBlock을 import
import { getParticipantLayout } from './LayoutUtils';
// import { Participant } from './types'; // Participant 타입 정의가 필요하면 여기에 추가

type Participant = {
  imageUrl: string;
  nickname: string;
  authority: string;
  introduction: string;
  isAdmin: boolean;
  };

const participants: Participant[] = [
  {
    imageUrl: 'https://picsum.photos/201',
    nickname: 'Sumin',
    authority: 'Admin',
    introduction: 'I love cloud ☁️ 🌹💘💘',
    isAdmin: true,
  },
  {
    imageUrl: 'https://picsum.photos/202',
    nickname: 'SaY',
    authority: 'Member',
    introduction: 'backend developer',
    isAdmin: false,
  },
  {
    imageUrl: 'https://picsum.photos/203',
    nickname: 'Cherrie',
    authority: 'Member',
    introduction: 'Sujin so cute',
    isAdmin: false,
  },
  {
    imageUrl: 'https://picsum.photos/204',
    nickname: 'Sujin',
    authority: 'Member',
    introduction: 'I AM MZ',
    isAdmin: false,
  },
  {
    imageUrl: 'https://picsum.photos/205',
    nickname: 'Gyeongtaek',
    authority: 'Member',
    introduction: 'I AM ZM',
    isAdmin: false,
  },
  // {
  //   imageUrl: 'https://picsum.photos/205',
  //   nickname: 'Gyeongtaek',
  //   authority: 'Member',
  //   introduction: 'I AM ZM',
  //   isAdmin: false,
  // },
  // {
  //   imageUrl: 'https://picsum.photos/205',
  //   nickname: 'Gyeongtaek',
  //   authority: 'Member',
  //   introduction: 'I AM ZM',
  //   isAdmin: false,
  // },
  // {
  //   imageUrl: 'https://picsum.photos/205',
  //   nickname: 'Gyeongtaek',
  //   authority: 'Member',
  //   introduction: 'I AM ZM',
  //   isAdmin: false,
  // },
];

const PersonContainer = styled.div`
  display: flex;
  flex: 2.2;
  height: 100%;
  flex-direction: column;
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

const GridContainer = styled.div`
  display: grid;
  gap: 20px;
  justify-items: center;
  align-items: center;
  width: 100%;
  margin-bottom: 5px;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

function PersonBoard() {
  const renderLayout = () => {
    if (participants.length === 1) {
      return (
        <FlexContainer>
          {participants.map((participant) => (
            <CustomMemberBlock
              key={participant.nickname}
              imageUrl={participant.imageUrl}
              nickname={participant.nickname}
              authority={participant.authority}
              introduction={participant.introduction}
              isAdmin={participant.isAdmin}
            />
          ))}
        </FlexContainer>
      );
    } else if (participants.length === 2) {
      return (
        <FlexContainer>
          {participants.map((participant) => (
            <CustomMemberBlock
              key={participant.nickname}
              imageUrl={participant.imageUrl}
              nickname={participant.nickname}
              authority={participant.authority}
              introduction={participant.introduction}
              isAdmin={participant.isAdmin}
            />
          ))}
        </FlexContainer>
      );
    } else if (participants.length === 3) {
      return (
        <>
          <GridContainer style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {participants.slice(0, 2).map((participant) => (
              <CustomMemberBlock
                key={participant.nickname}
                imageUrl={participant.imageUrl}
                nickname={participant.nickname}
                authority={participant.authority}
                introduction={participant.introduction}
                isAdmin={participant.isAdmin}
              />
            ))}
          </GridContainer>
          <FlexContainer>
            {participants.slice(2).map((participant) => (
              <CustomMemberBlock
                key={participant.nickname}
                imageUrl={participant.imageUrl}
                nickname={participant.nickname}
                authority={participant.authority}
                introduction={participant.introduction}
                isAdmin={participant.isAdmin}
              />
            ))}
          </FlexContainer>
        </>
      );
    } else if (participants.length === 4) {
      return (
        <GridContainer style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          {participants.map((participant) => (
            <CustomMemberBlock
              key={participant.nickname}
              imageUrl={participant.imageUrl}
              nickname={participant.nickname}
              authority={participant.authority}
              introduction={participant.introduction}
              isAdmin={participant.isAdmin}
            />
          ))}
        </GridContainer>
      );
    } else if (participants.length === 5) {
      return (
        <>
          <GridContainer style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {participants.slice(0, 3).map((participant) => (
              <CustomMemberBlock
                key={participant.nickname}
                imageUrl={participant.imageUrl}
                nickname={participant.nickname}
                authority={participant.authority}
                introduction={participant.introduction}
                isAdmin={participant.isAdmin}
              />
            ))}
          </GridContainer>
          <FlexContainer>
            {participants.slice(3).map((participant) => (
              <CustomMemberBlock
                key={participant.nickname}
                imageUrl={participant.imageUrl}
                nickname={participant.nickname}
                authority={participant.authority}
                introduction={participant.introduction}
                isAdmin={participant.isAdmin}
              />
            ))}
          </FlexContainer>
        </>
      );
    } else if (participants.length === 6) {
      return (
        <GridContainer style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {participants.map((participant) => (
            <CustomMemberBlock
              key={participant.nickname}
              imageUrl={participant.imageUrl}
              nickname={participant.nickname}
              authority={participant.authority}
              introduction={participant.introduction}
              isAdmin={participant.isAdmin}
            />
          ))}
        </GridContainer>
      );
    } else if (participants.length === 7) {
      return (
        <>
          <GridContainer style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {participants.slice(0, 2).map((participant) => (
              <CustomMemberBlock
                key={participant.nickname}
                imageUrl={participant.imageUrl}
                nickname={participant.nickname}
                authority={participant.authority}
                introduction={participant.introduction}
                isAdmin={participant.isAdmin}
              />
            ))}
          </GridContainer>
          <GridContainer style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {participants.slice(2, 5).map((participant) => (
              <CustomMemberBlock
                key={participant.nickname}
                imageUrl={participant.imageUrl}
                nickname={participant.nickname}
                authority={participant.authority}
                introduction={participant.introduction}
                isAdmin={participant.isAdmin}
              />
            ))}
          </GridContainer>
          <FlexContainer>
            {participants.slice(5).map((participant) => (
              <CustomMemberBlock
                key={participant.nickname}
                imageUrl={participant.imageUrl}
                nickname={participant.nickname}
                authority={participant.authority}
                introduction={participant.introduction}
                isAdmin={participant.isAdmin}
              />
            ))}
          </FlexContainer>
        </>
      );
    } else if (participants.length === 8) {
      return (
        <>
          <GridContainer style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {participants.slice(0, 3).map((participant) => (
              <CustomMemberBlock
                key={participant.nickname}
                imageUrl={participant.imageUrl}
                nickname={participant.nickname}
                authority={participant.authority}
                introduction={participant.introduction}
                isAdmin={participant.isAdmin}
              />
            ))}
          </GridContainer>
          <GridContainer style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {participants.slice(3, 5).map((participant) => (
              <CustomMemberBlock
                key={participant.nickname}
                imageUrl={participant.imageUrl}
                nickname={participant.nickname}
                authority={participant.authority}
                introduction={participant.introduction}
                isAdmin={participant.isAdmin}
              />
            ))}
          </GridContainer>
          <GridContainer style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {participants.slice(5).map((participant) => (
              <CustomMemberBlock
                key={participant.nickname}
                imageUrl={participant.imageUrl}
                nickname={participant.nickname}
                authority={participant.authority}
                introduction={participant.introduction}
                isAdmin={participant.isAdmin}
              />
            ))}
          </GridContainer>
        </>
      );
    }
    return null; // 기본 값
  };

  return <PersonContainer>{renderLayout()}</PersonContainer>;
}

export default PersonBoard;
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