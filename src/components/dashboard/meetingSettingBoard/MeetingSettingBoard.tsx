/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import BotBlock from './BotBlock';
import DashboardTimer from './DashboardTimer';
import Divider from '../../common/Divider';
import { Spacer } from '../../common/Spacer';
import { theme } from '../../../styles/theme';
import BoardTitle from '../../common/board/BoardTitle';
import BoardContainer from '../../common/board/BoardContainer';
import { useRecoilState } from 'recoil';
import {
  isMeetingInProgressAtom,
  meetingStateAtom,
} from '../../../recoil/atoms/meetingAtom';
import { useState } from 'react';
import { createMeetingApi } from '../../../api/meetingApi';
import { useNavigate } from 'react-router';

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
}: {
  teamId: number;
  teamName: string;
}) => {
  type BotType =
    | 'Smart Summarize'
    | 'Positive Feedback'
    | 'Attendance Checker'
    | 'Negative Feedback';

  const [, setMeeting] = useRecoilState(meetingStateAtom);
  const [isMeetingInProgress, setMeetingInProgress] = useRecoilState(
    isMeetingInProgressAtom,
  );
  const [loading, setLoading] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [botStates, setBotStates] = useState({
    'Smart Summarize': true,
    'Positive Feedback': true,
    'Attendance Checker': true,
    'Negative Feedback': false,
  });

  const navigate = useNavigate();

  const handleToggle = (botType: BotType) => {
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

      setMeeting(meetingData);
      setMeetingInProgress(true);

      console.log('Meeting created:', meetingData);
      console.log('Meeting ID:', meetingData.meetingId);
      navigate(`/meeting/${meetingData.meetingId}`, {
        state: { teamName },
      });
    } catch (error) {
      console.error('[MeetingSettingBoard] Failed to create meeting:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (isMeetingInProgress) {
      console.log('Joining meeting...');
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
      {Object.keys(botStates).map((botType) => (
        <BotBlock
          key={botType}
          isActive={botStates[botType as BotType]}
          imageUrl={`/src/assets/images/${botType.toLowerCase().replace(' ', '-')}.png`}
          botType={botType}
          description={`Gives ${botType.split(' ')[0]} Feedback`}
          onToggle={() => handleToggle(botType as BotType)}
        />
      ))}
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
