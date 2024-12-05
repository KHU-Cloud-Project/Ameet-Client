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

const ExpandSpacer = styled.div`
  flex-grow: 1;
`;

const MeetingSettingBoard = ({
  teamId,
  teamName,
}: {
  teamId: number;
  teamName: string;
}) => {
  const [, setMeeting] = useRecoilState(meetingStateAtom);
  const [isMeetingInProgress, setMeetingInProgress] = useRecoilState(
    isMeetingInProgressAtom,
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleToggle = (botType: string) => {
    console.log(`${botType} toggled`);
  };

  const handleCreateMeeting = async () => {
    const dummyMeetingTitle = 'Dummy Title';
    try {
      setLoading(true);
      const meetingData = await createMeetingApi({
        teamId: teamId,
        title: dummyMeetingTitle,
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
      <BotBlock
        isActive={true}
        imageUrl="/src/assets/images/summary bot.png"
        botType="Smart Summarize"
        description="Gives summary"
        onToggle={() => handleToggle('Smart Summarize')}
      />
      <BotBlock
        isActive={true}
        imageUrl="/src/assets/images/positive bot.png"
        botType="Positive Feedback"
        description="Gives Feedback"
        onToggle={() => handleToggle('Positive Feedback')}
      />
      <BotBlock
        isActive={true}
        imageUrl="/src/assets/images/attendance checker.png"
        botType="Attendance Checker"
        description="Gives Feedback"
        onToggle={() => handleToggle('Attendance Checker')}
      />
      <BotBlock
        isActive={false}
        imageUrl="/src/assets/images/negative bot.png"
        botType="Negative Feedback"
        description="Gives Feedback"
      />
      <BotBlock
        isActive={false}
        imageUrl="/src/assets/images/negative bot.png"
        botType="Negative Feedback"
        description="Gives Feedback"
      />
      <BotBlock
        isActive={false}
        imageUrl="/src/assets/images/negative bot.png"
        botType="Negative Feedback"
        description="Gives Feedback"
      />
      <Spacer height={36} />
      <SectionTitle>Set Timer</SectionTitle>
      <Divider marginTop="4px" marginBottom="8px" />
      <DashboardTimer />
      <Spacer height={36} />
      <SectionTitle>Set Meeting Title</SectionTitle>
      <ExpandSpacer />
      <Button onClick={handleButtonClick} disabled={loading}>
        {isMeetingInProgress ? 'Join Meeting' : 'Create Meeting'}
      </Button>
    </BoardContainer>
  );
};

export default MeetingSettingBoard;
