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

  if (loading) {
    return <div>Loading team details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!teamDetail) {
    return <div>Team not found</div>;
  }

  return (
    <PageLayout>
      <Dashboard team={teamDetail} />
    </PageLayout>
  );
}

export default DashboardPage;
