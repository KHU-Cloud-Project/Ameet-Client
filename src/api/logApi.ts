import { Log } from '../models/Log';
import { UserForTeam } from '../recoil/atoms/userAtom';
import axiosInstance from './axiosInstance';

// Fetch Meeting Logs of a specific team
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

    return {
      content: content.map(
        (log: any): Log => ({
          meetingId: log.meetingId,
          noteId: log.noteId,
          title: log.title,
          summary: log.summary || '',
          script: log.script,
          members: log.members || null,
          presignedUrl: log.presignedUrl || null,
          createdAt: log.createdAt,
          startedAt: log.startedAt,
          duration: log.duration,
          participants: log.participantList?.map(
            (participant: UserForTeam) => ({
              userTeamId: participant.userTeamId,
              userId: participant.userId,
              nickname: participant.nickname,
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

// Fetch all Meeting Logs of a specific user
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

    return {
      content: content.map(
        (log: any): Log => ({
          meetingId: log.meetingId,
          noteId: log.noteId,
          title: log.title,
          summary: log.summary || '',
          script: log.script,
          members: log.members || null,
          presignedUrl: log.presignedUrl || null,
          createdAt: log.createdAt,
          startedAt: log.startedAt,
          duration: log.duration,
          participants: log.participantList?.map(
            (participant: UserForTeam) => ({
              userTeamId: participant.userTeamId,
              userId: participant.userId,
              nickname: participant.nickname,
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
