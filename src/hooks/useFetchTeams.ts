import { useRecoilState } from 'recoil';
import { teamsAtom, teamsLoadingAtom } from '../recoil/atoms/teamAtom';
import { fetchTeamsApi } from '../api/teamApi';

export const useFetchTeams = (userId: number) => {
  const [teams, setTeams] = useRecoilState(teamsAtom);
  const [teamsLoading, setTeamsLoading] = useRecoilState(teamsLoadingAtom);

  const fetchTeams = async () => {
    try {
      setTeamsLoading(true);
      // console.log('Fetching teams with user ID:', userId);

      const teamsData = await fetchTeamsApi(userId);
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
