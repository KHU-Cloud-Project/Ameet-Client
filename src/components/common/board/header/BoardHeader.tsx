/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { Spacer } from '../../Spacer';
import BoardTitle from '../BoardTitle';
import { theme } from '../../../../styles/theme';
import ProfileArea from './ProfileArea';
import { User } from '../../../../recoil/atoms/userAtom';
import CuttedLogo from '../../../meeting/meetingHeader/CuttedLogo';
import AlarmIcon from '../../../../assets/icons/dashboard/alarm.png';

type HeaderProps = {
  title: string;
  hasSearchbar: boolean;
  description?: string | null | '';
  user: User;
  hasLogo?: boolean;
};

const HeaderContainer = styled.div`
  display: flex;
  // flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background-color: ${(props) => props.theme.colors.white};
  // border-bottom: 1px solid ${(props) => props.theme.colors.lightGray};
`;

const HeaderRightSideWrapper = styled.div`
  display: flex;
`;

const SearchBar = styled.div`
  max-width: 458px;
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

const SpaceDescText = styled.span`
  color: ${(props) => props.theme.colors.textGray};
  font-size: ${(props) => props.theme.typography.fontSize.default};
  font-weight: ${(props) => props.theme.typography.fontWeight.regular};
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  font-size: ${(props) => props.theme.typography.fontSize.medium};
  color: ${(props) => props.theme.colors.textBlack};

  &:focus {
    outline: none;
  }
`;

const IconImage = styled.img`
  width: 48px; 
  height: 48px;
`;

// const LanguageSelector = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   cursor: pointer;
//   color: ${(props) => props.theme.colors.textBlack};
// `;

// const LanguageFlag = styled.span`
//   font-size: ${(props) => props.theme.typography.fontSize.large};
// `;

const NotificationIcon = styled.div`
  font-size: ${(props) => props.theme.typography.fontSize.large};
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

function BoardHeader({
  title,
  hasSearchbar,
  description,
  user,
  hasLogo,
}: HeaderProps) {
  return (
    <HeaderContainer>
      {hasLogo && <CuttedLogo />}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <BoardTitle
          children={title}
          fontSize={theme.typography.fontSize.xLarge}
          marginBottom={description ? 10 : 0}
        />
        {description && <SpaceDescText>{description}</SpaceDescText>}
      </div>
      {hasSearchbar && (
        <SearchBar>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput type="text" placeholder="Search for meeting logs" />
        </SearchBar>
      )}
      <HeaderRightSideWrapper>
        {/* <LanguageSelector>
          <LanguageFlag>🇺🇸</LanguageFlag>
          <span>Eng (US)</span>
        </LanguageSelector> */}
        <Spacer width={48} />
        <NotificationIcon>
          <IconImage src={AlarmIcon} alt="alarm" />
          <NotificationDot />
        </NotificationIcon>
        <Spacer width={26} />
        <ProfileArea
          nickname={user.nickname}
          email={user.email}
          profileImage={user.profile}
        />
      </HeaderRightSideWrapper>
    </HeaderContainer>
  );
}

export default BoardHeader;
