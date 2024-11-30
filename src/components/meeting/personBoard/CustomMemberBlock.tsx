/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useMemo } from 'react';
import { useTheme } from '@emotion/react';

type CustomMemberBlockProps = {
  imageUrl: string;
  nickname: string;
  authority: string;
  introduction: string;
  isAdmin: boolean;
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
  aspect-ratio: 1.2; /* 가로와 세로 길이를 동일하게 설정 */
`;

const ProfileImage = styled.img`
  width: 60px; /* 크기 조정 */
  height: 60px; /* 크기 조정 */
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 8px;
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

const Introduction = styled.div`
  font-size: ${(props) => props.theme.typography.fontSize.small};
  color: ${(props) => props.theme.colors.textBlue};
  margin-top: 4px;
  text-align: center;
`;

function CustomMemberBlock({
  imageUrl,
  nickname,
  authority,
  introduction,
  isAdmin,
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
      <ProfileImage src={imageUrl} alt={nickname} />
      <Nickname>{nickname}</Nickname>
      <Authority>{authority}</Authority>
      <Introduction>{introduction}</Introduction>
    </CustomBlockContainer>
  );
}

export default CustomMemberBlock;