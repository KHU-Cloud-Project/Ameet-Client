import React from 'react';
import styled from '@emotion/styled';
import BotBlock from './BotBlock';
import DashboardTimer from './DashboardTimer';
import Divider from '../../common/Divider';
import { Spacer } from '../../common/Spacer';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 16px 18px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadows.section};
  height: 100%;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.textBlack};
  margin-bottom: 28px;
`;

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
    <BoardContainer>
      <Title>Meeting Settings</Title>
      <SectionTitle>Bots</SectionTitle>
      <Divider marginTop="6px" marginBottom="4px" />
      <BotBlock
        isActive={true}
        imageUrl="/src/assets/images/dashboard/dummy1.jpg"
        botType="Smart Summarize"
        description="Gives summary"
        onToggle={() => handleToggle('Smart Summarize')}
      />
      <BotBlock
        isActive={true}
        imageUrl="/src/assets/images/dashboard/dummy2.jpg"
        botType="Positive Feedback"
        description="Gives Feedback"
        onToggle={() => handleToggle('Positive Feedback')}
      />
      <BotBlock
        isActive={true}
        imageUrl="/src/assets/images/dashboard/dummy3.jpg"
        botType="Attendance Checker"
        description="Gives Feedback"
        onToggle={() => handleToggle('Attendance Checker')}
      />
      <BotBlock
        isActive={false}
        imageUrl="/src/assets/images/dashboard/dummy4.png"
        botType="Negative Feedback"
        description="Gives Feedback"
      />
      <BotBlock
        isActive={false}
        imageUrl="/src/assets/images/dashboard/dummy5.jpeg"
        botType="Negative Feedback"
        description="Gives Feedback"
      />
      <BotBlock
        isActive={false}
        imageUrl="/src/assets/images/dashboard/dummy6.jpeg"
        botType="Negative Feedback"
        description="Gives Feedback"
      />
      <Spacer height={40} />
      <SectionTitle>Set Timer</SectionTitle>
      <Divider marginTop="6px" marginBottom="12px" />
      <DashboardTimer />
      <ExpandSpacer />
      <Button>Start Meeting</Button>
    </BoardContainer>
  );
};

export default MeetingSettingBoard;
