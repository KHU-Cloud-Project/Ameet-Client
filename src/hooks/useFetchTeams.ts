import { useRecoilState } from 'recoil';
import { teamsAtom, teamsLoadingAtom } from '../recoil/atoms/teamAtom';
import { fetchTeamsApi, fetchTeamDetailApi } from '../api/teamApi';
import { useCallback, useState } from 'react';
import { Team } from '../models/Team';
import { mapTeamDetailResponse } from '../utils/teamUtils';

export const useFetchTeams = (userId: number) => {
  const [teams, setTeams] = useRecoilState(teamsAtom);
  const [teamsLoading, setTeamsLoading] = useRecoilState(teamsLoadingAtom);

  const fetchTeams = async () => {
    try {
      setTeamsLoading(true);
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

export const useFetchTeamDetail = () => {
  const [teamDetail, setTeamDetail] = useState<Team | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTeamDetail = useCallback(async (teamId: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchTeamDetailApi(teamId);
      const team = mapTeamDetailResponse(response.data);
      setTeamDetail(team);
    } catch (err: any) {
      console.error('[useFetchTeamDetail] Failed to fetch team detail:', err);
      setError(err.message || 'Failed to fetch team detail');
    } finally {
      setLoading(false);
    }
  }, []);

  return { teamDetail, fetchTeamDetail, loading, error };
};
