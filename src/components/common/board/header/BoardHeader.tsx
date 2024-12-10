/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { Spacer } from '../../Spacer';
import BoardTitle from '../BoardTitle';
import { theme } from '../../../../styles/theme';
import ProfileArea from './ProfileArea';
import { User } from '../../../../recoil/atoms/userAtom';
import CuttedLogo from '../../../meeting/meetingHeader/CuttedLogo';
import AlarmIcon from '../../../../assets/icons/dashboard/alarm.png';
import SearchIconImage from '../../../../assets/icons/dashboard/searchIcon.png';
import { useState } from 'react';
import { useSearchMeetings } from '../../../../hooks/useFetchMeetings';
import { SearchMeetingResponse } from '../../../../models/Meeting';
import { Log } from '../../../../models/Log';
import LogModal from '../../logBoard/LogModal';
import { fetchLogDetailsApi } from '../../../../api/logApi';

type HeaderProps = {
  title: string;
  hasSearchbar: boolean;
  description?: string | null | '';
  user: User;
  teamId: number;
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
  max-width: 480px;
  flex: 1;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.darkWhite};
  padding: 12px 22px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  margin-left: auto;
`;

const SearchIcon = styled.span`
  margin-right: 8px;
  color: ${(props) => props.theme.colors.secondary};
`;

const SearchIconImg = styled.img`
  width: 24px;
  height: 24px;
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

const SearchResults = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 12px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  max-width: 458px;
  margin-left: auto;
`;

const SearchResultItem = styled.div`
  padding: 10px 12px;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGray};
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: ${(props) => props.theme.colors.darkWhite};
    cursor: pointer;
  }
  font-size: ${(props) => props.theme.typography.fontSize.small};
  line-height: 1.5;
`;

const MeetingTitle = styled.div`
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  margin-bottom: 4px;
`;

const MeetingDate = styled.div`
  color: ${(props) => props.theme.colors.textGray};
  font-size: ${(props) => props.theme.typography.fontSize.medium};
  margin-bottom: 4px;
`;

const MeetingParticipants = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.typography.fontSize.small};
`;

function BoardHeader({
  title,
  hasSearchbar,
  description,
  user,
  teamId,
  hasLogo,
}: HeaderProps) {
  const { searchMeetings } = useSearchMeetings();
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<SearchMeetingResponse>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [, setSelectedMeetingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async () => {
    if (!teamId) {
      console.error('No team selected');
      return;
    }

    if (keyword.trim()) {
      try {
        const results = await searchMeetings(teamId, keyword);

        // 결과를 SearchMeetingResponse와 일치하도록 포맷팅
        const formattedResults = results.map((meeting) => ({
          meetingId: meeting.meetingId,
          title: meeting.title,
          startedAt: meeting.startedAt,
          duration: meeting.duration || {
            seconds: 0,
            zero: true,
            nano: 0,
            negative: false,
            units: [],
          },
          participants: meeting.participants ?? [],
          presignedUrl: meeting.presignedUrl || '',
        }));

        setSearchResults(formattedResults);
      } catch (e) {
        console.error('Search failed:', e);
        setSearchResults([]);
      }
    }
  };
  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
      setSearchResults([]);
    }, 100);
  };

  const handleLogClick = async (meetingId: number) => {
    setSelectedMeetingId(meetingId);
    const log = await fetchLogDetailsApi(meetingId);
    setSelectedLog(log);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMeetingId(null);
  };

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <HeaderContainer>
      {hasLogo && <CuttedLogo />}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <BoardTitle
          children={title}
          fontSize={theme.typography.fontSize.xLarge}
          marginBottom={description ? 10 : 0}
        />
        {description && <SpaceDescText>{description}</SpaceDescText>}
      </div>
      {hasSearchbar && (
        <div style={{ position: 'relative', width: '100%' }}>
          <SearchBar>
            <SearchIcon>
              <SearchIconImg src={SearchIconImage} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search for meeting logs"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              onFocus={() => setIsFocused(true)}
              onBlur={handleBlur}
            />
          </SearchBar>
          {isFocused && searchResults.length > 0 && (
            <SearchResults>
              {searchResults.map((result) => (
                <SearchResultItem
                  onClick={() => handleLogClick(result.meetingId)}
                  key={result.meetingId}
                >
                  <MeetingTitle>Meeting Name: {result.title}</MeetingTitle>
                  <MeetingDate>
                    Date: {formatDate(result.startedAt)}
                  </MeetingDate>
                  <MeetingParticipants>
                    Participants: {result.participants?.join(', ') || 'None'}
                  </MeetingParticipants>
                </SearchResultItem>
              ))}
            </SearchResults>
          )}
        </div>
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
      {isModalOpen && selectedLog && (
        <LogModal log={selectedLog} onClose={handleModalClose} />
      )}
    </HeaderContainer>
  );
}

export default BoardHeader;
