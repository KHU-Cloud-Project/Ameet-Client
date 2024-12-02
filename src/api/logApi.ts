import { Log } from '../models/Log';
import { UserForTeam } from '../recoil/atoms/userAtom';
import axiosInstance from './axiosInstance';

// Fetch Meeting Logs
export const fetchMeetingLogsApi = async (
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

    return {
      content: content.map(
        (log: any): Log => ({
          meetingId: log.meetingId,
          title: log.title,
          date: new Date(log.startedAt).toLocaleString(),
          duration: log.duration?.seconds || 0,
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
