import { Log } from '../models/Log';
import { UserForTeam } from '../recoil/atoms/userAtom';
import axiosInstance from './axiosInstance';

// Fetch Meeting Logs
export const fetchTeamMeetingLogsApi = async (
  teamId: number,
  page: number,
  size: number,
): Promise<{
  content: Log[];
  totalPages: number;
  totalElements: number;
}> => {
  const response = await axiosInstance.get('/api/v1/meeting/log', {
    params: { teamId, page, size },
  });

  if (response.status === 200 && response.data.success) {
    const { content, totalPages, totalElements } = response.data.data;

    const parseISODuration = (isoDuration: string): number => {
      const match = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/.exec(
        isoDuration,
      );
      if (!match) return 0;

      const hours = parseFloat(match[1] || '0');
      const minutes = parseFloat(match[2] || '0');
      const seconds = parseFloat(match[3] || '0');

      return hours * 3600 + minutes * 60 + seconds;
    };

    return {
      content: content.map(
        (log: any): Log => ({
          meetingId: log.meetingId,
          title: log.title,
          date: new Date(log.startedAt).toLocaleString(),
          duration: parseISODuration(log.duration),
          participants: log.participantList?.map(
            (participant: UserForTeam) => ({
              userTeamId: participant.userTeamId,
              userId: participant.userId,
              nickname: participant.nickname,
              role: 'MEMBER',
            }),
          ),
        }),
      ),
      totalPages,
      totalElements,
    };
  }

  throw new Error('Failed to fetch meeting logs');
};

export const fetchMyMeetingLogsApi = async (
  userId: number,
  page: number,
  size: number,
): Promise<{
  content: Log[];
  totalPages: number;
  totalElements: number;
}> => {
  const response = await axiosInstance.get('/api/v1/meeting/myLog', {
    params: { userId, page, size },
  });

  if (response.status === 200 && response.data.success) {
    const { content, totalPages, totalElements } = response.data.data;

    const parseISODuration = (isoDuration: string): number => {
      const match = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/.exec(
        isoDuration,
      );
      if (!match) return 0;

      const hours = parseFloat(match[1] || '0');
      const minutes = parseFloat(match[2] || '0');
      const seconds = parseFloat(match[3] || '0');

      return hours * 3600 + minutes * 60 + seconds;
    };

    return {
      content: content.map(
        (log: any): Log => ({
          meetingId: log.meetingId,
          title: log.title,
          date: new Date(log.startedAt).toLocaleString(),
          duration: parseISODuration(log.duration),
          participants: log.participantList?.map(
            (participant: UserForTeam) => ({
              userTeamId: participant.userTeamId,
              userId: participant.userId,
              nickname: participant.nickname,
              role: 'MEMBER',
            }),
          ),
        }),
      ),
      totalPages,
      totalElements,
    };
  }

  throw new Error('Failed to fetch meeting logs');
};
