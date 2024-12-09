import MeetingPageLayout from '../components/meeting/meetingPageLayout/MeetingPageLayout';
import Meeting from '../components/meeting/Meeting';
import { useLocation, useParams } from 'react-router';
import { useFetchMeetingDetail } from '../hooks/useFetchMeetings';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '../recoil/atoms/userAtom';

function MeetingPage() {
  // const { meetingId } = useParams();
  const { meetingId } = useParams<{ meetingId: string }>();
  const location = useLocation();
  const { teamName, teamId } = location.state || {};
  const [user] = useRecoilState(userAtom);

  const { meetingDetail, fetchMeetingDetail, loading, error } =
    useFetchMeetingDetail();

  useEffect(() => {
    if (meetingId) {
      fetchMeetingDetail(Number(meetingId));
    }
  }, [meetingId, fetchMeetingDetail]);

  if (!user || !user.id) {
    return <div>User data is missing. Please log in.</div>;
  }

  if (!meetingId) {
    return <div>Meeting ID is missing.</div>;
  }

  useEffect(() => {
    if (meetingId) {
      fetchMeetingDetail(Number(meetingId));
    }
  }, [meetingId, fetchMeetingDetail]);

  if (!user || !user.id) {
    return <div>User data is missing. Please log in.</div>;
  }

  if (!meetingId) {
    return <div>Meeting ID is missing.</div>;
  }

  return (
    <MeetingPageLayout>
      <Meeting
        meeting={meetingDetail}
        loading={loading}
        error={error}
        teamName={teamName}
        teamId={teamId}
      />
      <p>
        {loading
          ? 'Loading meeting details...'
          : error
            ? 'Error loading meeting.'
            : ''}
      </p>
    </MeetingPageLayout>
  );
}

export default MeetingPage;
