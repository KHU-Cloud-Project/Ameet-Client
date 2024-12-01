import { useRecoilState } from 'recoil';
import axiosInstance from '../api/axiosInstance';
import { teamsAtom, teamsLoadingAtom } from '../recoil/atoms/teamAtom';

export const useFetchTeams = (userId: number) => {
  const [teams, setTeams] = useRecoilState(teamsAtom);
  const [teamsLoading, setTeamsLoading] = useRecoilState(teamsLoadingAtom);

  const fetchTeams = async () => {
    try {
      setTeamsLoading(true);
      console.log('Fetching teams with user ID:', userId);

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
      setTeamsLoading(false);
    }
  };

  return { teams, fetchTeams, teamsLoading };
};
