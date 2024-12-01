/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useMemo } from 'react';
import { useTheme } from '@emotion/react';
import { UserForTeam } from '../../../recoil/atoms/userAtom';

type MemberBlockProps = {
  member: UserForTeam;
  isOwner: boolean;
  onRemove?: () => void;
};

const BlockContainer = styled.div<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 16px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  width: 180px;
  height: 142px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 18px;
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

function MemberBlock({ member, isOwner, onRemove }: MemberBlockProps) {
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
      {isOwner && <CloseButton onClick={onRemove}>×</CloseButton>}
      <ProfileImage
        src={member.profile || '/src/assets/images/profile.png'}
        alt={member.nickname}
        onError={(e) => {
          e.currentTarget.src = '/src/assets/images/profile.png';
        }}
      />
      <Nickname>{member.nickname}</Nickname>
      <Authority>{member.role}</Authority>
      <Introduction>{member.introduction || ''}</Introduction>
    </BlockContainer>
  );
}

export default MemberBlock;
