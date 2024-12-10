import BotBlock from './BotBlock';
import { Spacer } from '../../common/Spacer';
import smartSummarizeImg from '/assets/images/smart_summarize.png';
import positiveFeedbackImg from '/assets/images/positive_feedback.png';
import attendanceCheckerImg from '/assets/images/attendance_checker.png';
import negativeFeedbackImg from '/assets/images/negative_feedback.png';

export type BotType =
  | 'Smart Summarize'
  | 'Positive Feedback'
  | 'Attendance Checker'
  | 'Negative Feedback';

type BotSettingsProps = {
  botStates: Record<BotType, boolean>;
  onToggle: (botType: BotType) => void;
};

const botImages: Record<BotType, string> = {
  'Smart Summarize': smartSummarizeImg,
  'Positive Feedback': positiveFeedbackImg,
  'Attendance Checker': attendanceCheckerImg,
  'Negative Feedback': negativeFeedbackImg,
};

export const BotSettings = ({ botStates, onToggle }: BotSettingsProps) => {
  return (
    <>
      {Object.keys(botStates).map((botType) => (
        <BotBlock
          key={botType}
          isActive={botStates[botType as BotType]}
          imageUrl={botImages[botType as BotType]}
          botType={botType as BotType}
          description={`Gives ${botType.split(' ')[0]} Feedback`}
          onToggle={() => onToggle(botType as BotType)}
        />
      ))}
      <Spacer height={36} />
    </>
  );
};

export default BotSettings;
