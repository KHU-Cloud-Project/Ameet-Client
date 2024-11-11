/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useMemo } from 'react';
import { useTheme } from '@emotion/react';

type MemberBlockProps = {
  imageUrl: string;
  nickname: string;
  authority: string;
  introduction: string;
  isAdmin: boolean;
  onRemove?: () => void;
};

const BlockContainer = styled.div<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 16px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  width: 180px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
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
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  color: ${(props) => props.theme.colors.textGray};
  cursor: pointer;
`;

function MemberBlock({
  imageUrl,
  nickname,
  authority,
  introduction,
  isAdmin,
  onRemove,
}: MemberBlockProps) {
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
    <BlockContainer backgroundColor={backgroundColor}>
      {isAdmin && <CloseButton onClick={onRemove}>×</CloseButton>}
      <ProfileImage src={imageUrl} alt={nickname} />
      <Nickname>{nickname}</Nickname>
      <Authority>{authority}</Authority>
      <Introduction>{introduction}</Introduction>
    </BlockContainer>
  );
}

export default MemberBlock;
