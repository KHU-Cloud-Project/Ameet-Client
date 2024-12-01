import { useRecoilState } from 'recoil';
import axiosInstance from '../api/axiosInstance';
import { teamsAtom } from '../recoil/atoms/teamAtom';
import React from 'react';

export const useFetchTeams = (userId: number) => {
  const [teams, setTeams] = useRecoilState(teamsAtom);
  const [teamsLoading, setLoading] = React.useState(true);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      console.log('Fetching team with userID:', userId);

      const response = await axiosInstance.put(
        `/api/v1/team/myTeamList?userId=${userId}`,
      );

      const teamsData = response.data?.data || [];
      console.log('API Teams Data:', teamsData);

      setTeams(teamsData);
    } catch (error) {
      console.error('[useFetchTeams] Failed to fetch teams:', error);
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  return { teams, fetchTeams, teamsLoading };
};
