import { useParams } from 'react-router';
import PageLayout from '../components/common/PageLayout';
import Dashboard from '../components/dashboard/Dashboard';
import { useEffect } from 'react';
import { useFetchTeamDetail } from '../hooks/useFetchTeams';

function DashboardPage() {
  const { teamId } = useParams();
  const { teamDetail, fetchTeamDetail, loading, error } = useFetchTeamDetail();

  useEffect(() => {
    if (teamId) {
      fetchTeamDetail(Number(teamId));
    }
  }, [teamId, fetchTeamDetail]);

  return (
    <PageLayout>
      <Dashboard team={teamDetail} loading={loading} error={error} />
    </PageLayout>
  );
}

export default DashboardPage;
