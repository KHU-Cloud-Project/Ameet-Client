/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { User } from '../../../models/User';
import { Spacer } from '../../common/Spacer';

type HeaderProps = {
  title: string;
  hasSearchbar: boolean;
  user: User;
};

const HeaderContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 24px 38px;
  background-color: ${(props) => props.theme.colors.white};
  // border-bottom: 1px solid ${(props) => props.theme.colors.lightGray};
`;

const HeaderRightSideWrapper = styled.div`
  display: flex;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.typography.fontSize.xLarge};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.textBlack};
  margin-right: 20px;
`;

const SearchBar = styled.div`
  max-width: 480px;
  flex: 1;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.darkWhite};
  padding: 12px 22px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
`;

const SearchIcon = styled.span`
  margin-right: 8px;
  color: ${(props) => props.theme.colors.secondary};
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  font-size: ${(props) => props.theme.typography.fontSize.medium};
  color: ${(props) => props.theme.colors.red};

  &:focus {
    outline: none;
  }
`;

const LanguageSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.textBlack};
`;

const LanguageFlag = styled.span`
  font-size: ${(props) => props.theme.typography.fontSize.large};
`;

const NotificationIcon = styled.div`
  margin-left: 20px;
  font-size: ${(props) => props.theme.typography.fontSize.large};
  color: ${(props) => props.theme.colors.red};
  position: relative;
  cursor: pointer;
`;

const NotificationDot = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.red};
  width: 8px;
  height: 8px;
  border-radius: 50%;
`;

const ProfileArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 20px;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const ProfileName = styled.div`
  font-size: ${(props) => props.theme.typography.fontSize.medium};
  color: ${(props) => props.theme.colors.textBlack};
`;

const ProfileRole = styled.div`
  font-size: ${(props) => props.theme.typography.fontSize.small};
  color: ${(props) => props.theme.colors.primary};
`;

function Header({ title, hasSearchbar, user }: HeaderProps) {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
      {hasSearchbar && (
        <SearchBar>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput type="text" placeholder="Search for meeting logs" />
        </SearchBar>
      )}
      <HeaderRightSideWrapper>
        <LanguageSelector>
          <LanguageFlag>🇺🇸</LanguageFlag>
          <span>Eng (US)</span>
        </LanguageSelector>
        <Spacer width={30} />
        <NotificationIcon>
          🔔
          <NotificationDot />
        </NotificationIcon>
        <Spacer width={18} />
        <ProfileArea>
          <ProfileImage src={user.profileImage} alt="Profile" />
          <div>
            <ProfileName>{user.name}</ProfileName>
            <ProfileRole>{user.role}</ProfileRole>
          </div>
        </ProfileArea>
      </HeaderRightSideWrapper>
    </HeaderContainer>
  );
}

export default Header;
