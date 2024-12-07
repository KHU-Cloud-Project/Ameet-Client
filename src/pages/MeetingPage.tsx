import MeetingPageLayout from '../components/meeting/meetingPageLayout/MeetingPageLayout';
import Meeting from '../components/meeting/Meeting';
import { useLocation, useParams } from 'react-router';
import { useFetchMeetingDetail } from '../hooks/useFetchMeetings';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '../recoil/atoms/userAtom';
import { useStomp } from '../hooks/useStomp';

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

  // STOMP connection
  const { sendMessage, subscribe, connected } = useStomp({
    onConnect: () => {
      if (meetingId) {
        subscribe(
          `/topic/meeting/${meetingId}/participants`,
          (participants) => {
            console.log('Participants:', participants);
          },
        );
        sendMessage(`/api/v1/meeting/enter`, { userId: user!.id });
      }
    },
  });

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
      {/* <video ref={localVideoRef} autoPlay muted style={{ width: '30%' }} />
      <video ref={remoteVideoRef} autoPlay style={{ width: '30%' }} /> */}
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
