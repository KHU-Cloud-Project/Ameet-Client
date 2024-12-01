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
