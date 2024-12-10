/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import defaultProfileImage from '/assets/images/profile.png';

type ProfileProps = {
  nickname: string;
  email: string;
  profileImage?: string | null;
};

const ProfileAreaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileName = styled.div`
  font-size: ${(props) => props.theme.typography.fontSize.medium};
  color: ${(props) => props.theme.colors.textBlack};
`;

const ProfileEmail = styled.div`
  font-size: ${(props) => props.theme.typography.fontSize.small};
  color: ${(props) => props.theme.colors.primary};
`;

function ProfileArea({ nickname, email, profileImage }: ProfileProps) {
  return (
    <ProfileAreaContainer>
      <ProfileImage src={profileImage || defaultProfileImage} alt="Profile" />
      <div>
        <ProfileName>{nickname ?? 'no'}</ProfileName>
        <ProfileEmail>{email}</ProfileEmail>
      </div>
    </ProfileAreaContainer>
  );
}

export default ProfileArea;
