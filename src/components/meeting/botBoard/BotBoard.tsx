import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import BotList from './BotList';
import BotResponses from './BotResponses';
import Divider from '../../common/Divider';
import { theme } from '../../../styles/theme';
import {
  getNegativeBotApi,
  getPositiveBotApi,
  getSummaryBotApi,
  uploadFileToMeetingPresignedUrl,
} from '../../../api/meetingApi';
import { getBaseUrl } from '../../../utils/meetingUtils';

const BoardContainer = styled.div`
  display: flex;
  flex: 4;
  flex-direction: column;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  max-height: 85%;
`;

const BoardTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* 아이템 간 간격 */
`;

const BotContainer = styled.div`
  display: flex;
  justify-content: space-between; /* 가로로 균등 분배 */
  align-items: center; /* 세로 중앙 정렬 */
  gap: 20px; /* 각 봇 간격 */
  margin-bottom: 0;
`;

const bots = [
  {
    name: 'Summarize',
    imageUrl: '/src/assets/images/positive_colored.png',
    botType: 'Summary',
    color: '#B585F6', // 청록색
  },
  {
    name: 'Positive',
    imageUrl: '/src/assets/images/attendacne_checker_colored.png',
    botType: 'Positive Feedback',
    color: '#90D4AB', // 보라색
  },
  {
    name: 'Negative',
    imageUrl: '/src/assets/images/summary_colored.png',
    botType: 'Attendance Checker',
    color: '#F096A7', // 노란색
  },
];

// const responsesMap: { [botType: string]: string } = {
//   'Positive Feedback':
//     'Stay hydrated during your meeting!Stay hydrated during your meeting!Stay hydrated during your meeting!Stay hydrated during your meeting!',
//   'Attendance Checker':
//     'll keep track of your tasks!ll keep track of your tasks!ll keep track of your tasks!ll keep track of your tasks!ll keep track of your tasks!',
//   Summary:
//     'Let’s boost the productivity!testtesttesttesttestLet’s boost the productivity!testtesttesttesttestLet’s boost the productivity!testtesttesttesttest',
// };

type BotBoardProps = {
  meetingId: number;
  presignedUrl: string | undefined | null;
  getRecordingFile: (chunks: Blob[]) => Blob;
  stopRecording: () => Promise<Blob>;
};

function BotBoard({ meetingId, presignedUrl, stopRecording }: BotBoardProps) {
  const [selectedBot, setSelectedBot] = useState<string | null>(null);
  const [responses, setResponses] = useState<
    { botType: string; text: string }[]
  >([]);

  useEffect(() => {
    if (!presignedUrl) {
      console.warn('Missing presignedUrl.');
      return;
    }
  });

  const FileUpload = async (presignedUrl: string, file: File) => {
    try {
      console.log('Uploading file to S3...');
      await uploadFileToMeetingPresignedUrl(presignedUrl, file);
    } catch (error) {
      console.error('Failed to upload file:', error);
    }
  };

  const handleSelectBot = async (botType: string) => {
    if (!presignedUrl) {
      console.error('Presigned URL is not available');
      return;
    }

    try {
      const recording = await stopRecording();
      console.log('Recording received from stopRecording:', recording);

      if (recording.size === 0) {
        console.error('The recording file is empty. Aborting upload.');
        return;
      }

      const file = new File([recording], 'meeting_recording.webm', {
        type: 'audio/webm',
      });

      console.log('Uploading file size:', file.size);
      await FileUpload(getBaseUrl(presignedUrl), file);

      let responseText;
      if (botType === 'Positive Feedback') {
        responseText = await getPositiveBotApi(meetingId);
      } else if (botType === 'Attendance Checker') {
        responseText = await getNegativeBotApi(meetingId);
      } else if (botType === 'Summary') {
        responseText = await getSummaryBotApi(meetingId);
      }
      const newResponse = { botType, text: responseText.text };
      setResponses((prev) => [...prev, newResponse]);
      setSelectedBot(botType);
    } catch (error) {
      console.error('Error handling bot selection:', error);
    }
  };

  // await FileUpload(getBaseUrl(presignedUrl, 'DUMMY_FILE'));
  // const response = await getSummaryBotApi(meetingId); // this is the actual 'new response'
  // const newResponse = { botType, text: responsesMap[botType] }; // this is dummy data
  // setResponses((prev) => [...prev, newResponse]);
  // setSelectedBot(botType);
  // };

  const botColorsAndImages = bots.reduce(
    (acc, bot) => {
      acc[bot.botType] = { color: bot.color, imageUrl: bot.imageUrl };
      return acc;
    },
    {} as { [botType: string]: { color: string; imageUrl: string } },
  );

  return (
    <BoardContainer>
      <BoardTitleContainer>
        <BotContainer>
          {bots.map((bot) => (
            <BotList
              key={bot.botType}
              imageUrl={bot.imageUrl}
              botType={bot.botType}
              color={bot.color}
              selectedBot={selectedBot}
              onSelectBot={handleSelectBot}
              botName={bot.name}
            />
          ))}
        </BotContainer>
        <Divider color={theme.colors.lineGray} />
        <BotResponses responses={responses} bots={botColorsAndImages} />
      </BoardTitleContainer>
    </BoardContainer>
  );
}

export default BotBoard;
