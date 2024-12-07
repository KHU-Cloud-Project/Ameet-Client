/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useMemo } from 'react';
import { useTheme } from '@emotion/react';

export type CustomMemberBlockProps = {
  imageUrl: string;
  nickname: string;
  authority: string;
};

const CustomBlockContainer = styled.div<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 10px; /* Padding 조정 */
  border-radius: ${(props) => props.theme.borderRadius.medium};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0; /* 그리드 간격에 맞게 간격 제거 */
  width: 100%; /* 부모 그리드에 맞게 */
  aspect-ratio: 1.5; /* 가로와 세로 길이를 동일하게 설정 */
`;

const ProfileImage = styled.img`
  width: 50%; /* 크기 조정 */
  height: auto; /* 크기 조정 */
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: auto;
  margin-top: auto;
`;

const Nickname = styled.h3`
  font-size: ${(props) => props.theme.typography.fontSize.medium};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0;
`;

const Authority = styled.div`
  font-size: ${(props) => props.theme.typography.fontSize.small};
  color: ${(props) => props.theme.colors.textGray};
`;

const HeadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* 부모의 전체 너비 사용 */
  padding: 0 10px; /* 좌우 여백 추가 */
  margin-bottom: 8px;
  margin-top: 12px;
`;

// const Introduction = styled.div`
//   font-size: ${(props) => props.theme.typography.fontSize.small};
//   color: ${(props) => props.theme.colors.textBlue};
//   bottom: 10px; /* 아래에서 10px */
//   margin-right: auto; /* 왼쪽에서 10px */
//   text-align: left; /* 텍스트 왼쪽 정렬 */
// `;

function CustomMemberBlock({
  imageUrl,
  nickname,
  authority,
}: CustomMemberBlockProps) {
  const theme = useTheme();

  const backgroundColor = useMemo(() => {
    const colors = [
      theme.colors.pastelYellow,
      theme.colors.pastelPink,
      theme.colors.pastelBlue,
      theme.colors.pastelGreen,
      theme.colors.pastelPurple,
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, [theme.colors]);

  return (
    <CustomBlockContainer backgroundColor={backgroundColor}>
      <HeadContainer>
        <Nickname>{nickname}</Nickname>
        <Authority>{authority}</Authority>
      </HeadContainer>
      <ProfileImage src={imageUrl} alt={nickname} />
    </CustomBlockContainer>
  );
}

export default CustomMemberBlock;
