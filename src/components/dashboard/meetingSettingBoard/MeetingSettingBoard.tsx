import React from 'react';
import styled from '@emotion/styled';
import BotBlock from './BotBlock';
import DashboardTimer from './DashboardTimer';
import Divider from '../../common/Divider';
import { Spacer } from '../../common/Spacer';
import { theme } from '../../../styles/theme';
import BoardTitle from '../../common/board/BoardTitle';
import BoardContainer from '../../common/board/BoardContainer';

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

const MeetingSettingBoard: React.FC = () => {
  const handleToggle = (botType: string) => {
    console.log(`${botType} toggled`);
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
      <Button>Start Meeting</Button>
    </BoardContainer>
  );
};

export default MeetingSettingBoard;
