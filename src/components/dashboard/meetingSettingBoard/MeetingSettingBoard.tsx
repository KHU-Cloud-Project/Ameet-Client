/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import DashboardTimer from './DashboardTimer';
import Divider from '../../common/Divider';
import { Spacer } from '../../common/Spacer';
import { theme } from '../../../styles/theme';
import BoardTitle from '../../common/board/BoardTitle';
import BoardContainer from '../../common/board/BoardContainer';
import { useState } from 'react';
import { createMeetingApi } from '../../../api/meetingApi';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../../recoil/atoms/userAtom';
import BotSettings, { BotType } from './BotSetting';

const SectionTitle = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.textBlack};
`;

const Button = styled.button`
  padding: 20px;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.white};
  font-size: 18px;
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  border-radius: ${(props) => props.theme.borderRadius.large};
  cursor: pointer;
`;

const InputField = styled.input`
  padding: 8px 12px;
  border: 1px solid ${(props) => props.theme.colors.lineGray};
  font-size: ${(props) => props.theme.typography.fontSize.small};
  border-radius: ${(props) => props.theme.borderRadius.small};
  margin-bottom: 10px;
  width: 100%;

  &::placeholder {
    color: ${(props) => props.theme.colors.textGray};
  }

  &:focus {
    outline: none;
  }
`;

const MeetingSettingBoard = ({
  teamId,
  teamName,
  meetingId,
}: {
  teamId: number;
  teamName?: string;
  meetingId?: number;
}) => {
  const [user] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [botStates, setBotStates] = useState({
    'Smart Summarize': true,
    'Positive Feedback': true,
    'Attendance Checker': true,
    'Negative Feedback': false,
  });

  const navigate = useNavigate();

  const isMeetingInProgress = meetingId !== null && meetingId !== undefined;

  const handleToggleBot = (botType: BotType) => {
    setBotStates((prevStates) => ({
      ...prevStates,
      [botType]: !prevStates[botType],
    }));
    console.log(`${botType} toggled: ${!botStates[botType]}`);
  };

  const handleCreateMeeting = async () => {
    const title = meetingTitle;
    try {
      setLoading(true);
      const meetingData = await createMeetingApi({
        teamId: teamId,
        title,
      });
      console.log('Meeting created:', meetingData);
      console.log('Meeting ID:', meetingData.meetingId);

      handleJoinMeeting(meetingData.meetingId);

      navigate(`/meeting/${meetingData.meetingId}`, {
        state: { teamName },
      });
    } catch (error) {
      console.error('[MeetingSettingBoard] Failed to create meeting:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinMeeting = async (meetingId: number) => {
    try {
    } catch (error) {}
  };

  const handleButtonClick = () => {
    if (isMeetingInProgress) {
      handleJoinMeeting(meetingId);
    } else {
      handleCreateMeeting();
    }
  };

  return (
    <BoardContainer flex="none" padding="20px 20px 18px">
      <BoardTitle
        children="Meeting Settings"
        fontSize={theme.typography.fontSize.mediumLarge}
        marginBottom={18}
      />
      <SectionTitle>Bots</SectionTitle>
      <Divider marginTop="4px" marginBottom="4px" />
      <BotSettings botStates={botStates} onToggle={handleToggleBot} />
      <Spacer height={36} />
      <SectionTitle>Set Timer</SectionTitle>
      <Divider marginTop="4px" marginBottom="8px" />
      <DashboardTimer />
      <Spacer height={36} />
      <SectionTitle>Meeting Title</SectionTitle>
      <Divider marginTop="4px" marginBottom="8px" />
      <InputField
        type="text"
        value={meetingTitle}
        onChange={(e) => setMeetingTitle(e.target.value)}
        placeholder="Enter meeting title (optional)"
      />
      <div style={{ flex: 1 }} />
      <Button onClick={handleButtonClick} disabled={loading}>
        {isMeetingInProgress ? 'Join Meeting' : 'Create Meeting'}
      </Button>
    </BoardContainer>
  );
};

export default MeetingSettingBoard;
