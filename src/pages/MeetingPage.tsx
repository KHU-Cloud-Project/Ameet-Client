import MeetingPageLayout from '../components/meeting/meetingPageLayout/MeetingPageLayout';
import Meeting from '../components/meeting/Meeting';
import { useLocation, useParams } from 'react-router';
import { useFetchMeetingDetail } from '../hooks/useFEtchMeetings';
import { useEffect } from 'react';

function MeetingPage() {
  const { meetingId } = useParams();
  const location = useLocation();

  const { teamName } = location.state || {};
  const { meetingDetail, fetchMeetingDetail, loading, error } =
    useFetchMeetingDetail();

  useEffect(() => {
    if (meetingId) {
      fetchMeetingDetail(Number(meetingId));
    }
  }, [meetingId, fetchMeetingDetail]);

  if (!meetingId) {
    return <div>Meeting ID is missing</div>;
  }

  return (
    <MeetingPageLayout>
      <Meeting
        meeting={meetingDetail}
        loading={loading}
        error={error}
        teamName={teamName}
      />
    </MeetingPageLayout>
  );
}

export default MeetingPage;
