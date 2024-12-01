import axiosInstance from './axiosInstance';

// Fetch Teams
export const fetchTeamsApi = async (userId: number) => {
  const response = await axiosInstance.put(
    `/api/v1/team/myTeamList?userId=${userId}`,
  );
  return response.data?.data || [];
};

// Create Team
export const createTeamApi = async (teamData: {
  userId: number;
  teamName: string;
  description?: string;
  teamPassword: string;
  maxPeople: number;
  selfIntro?: string;
}) => {
  try {
    const response = await axiosInstance.post('/api/v1/team', teamData);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
