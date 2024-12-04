import { Team } from '../models/Team';
import { mapTeamDetailResponse, mapTeamListResponse } from '../utils/teamUtils';
import axiosInstance from './axiosInstance';

// Fetch Teams
export const fetchTeamsApi = async (userId: number): Promise<Team[]> => {
  const response = await axiosInstance.put(
    `/api/v1/team/myTeamList?userId=${userId}`,
  );
  return mapTeamListResponse(response.data?.data || []);
};

// Fetch details of a single team
export const fetchTeamDetailApi = async (teamId: number) => {
  const response = await axiosInstance.get(`/api/v1/team`, {
    params: { teamId },
  });

  if (response.data?.success && response.status === 200) {
    return response.data;
  }

  throw new Error('Failed to fetch team details');
};

// Create Team
export const createTeamApi = async (teamData: {
  userId: number;
  teamName: string;
  description?: string;
  teamPassword: string;
  maxPeople: number;
  selfIntro?: string;
}): Promise<number> => {
  const response = await axiosInstance.post('/api/v1/team', teamData);
  if (response.data?.success && response.status === 201) {
    return response.data.data;
  }
  throw new Error('Failed to create team');
};

// Update user introduction
export const updateUserIntroductionApi = async (data: {
  userTeamId: number;
  introduction: string;
}): Promise<void> => {
  const response = await axiosInstance.patch(
    '/api/v1/userTeam/introduction',
    data,
  );
  if (response.status !== 200) {
    throw new Error('Failed to update introduction');
  }
};
