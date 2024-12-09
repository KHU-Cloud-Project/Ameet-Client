import BotBlock from './BotBlock';
import { Spacer } from '../../common/Spacer';

export type BotType =
  | 'Smart Summarize'
  | 'Positive Feedback'
  | 'Attendance Checker'
  | 'Negative Feedback';

type BotSettingsProps = {
  botStates: Record<BotType, boolean>;
  onToggle: (botType: BotType) => void;
};

export const BotSettings = ({ botStates, onToggle }: BotSettingsProps) => {
  return (
    <>
      {Object.keys(botStates).map((botType) => (
        <BotBlock
          key={botType}
          isActive={botStates[botType as BotType]}
          imageUrl={`/src/assets/images/${botType
            .toLowerCase()
            .replace(' ', '-')}.png`}
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
