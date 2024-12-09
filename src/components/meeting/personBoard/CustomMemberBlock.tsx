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
  padding: 14px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  margin-bottom: 8px;
  gap: 8px;
`;

const Nickname = styled.span`
  font-size: ${(props) => props.theme.typography.fontSize.mediumLarge};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.textDarkGray};
`;

const Authority = styled.span`
  font-size: ${(props) => props.theme.typography.fontSize.default};
  color: ${(props) => props.theme.colors.textGray};
  margin-bottom: 2px;
`;

const ProfileImage = styled.img`
  width: 50%;
  aspect-ratio: 1;
  border-radius: 100%;
  object-fit: cover;
  margin: 10px;
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
