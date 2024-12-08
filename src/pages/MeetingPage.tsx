import MeetingPageLayout from '../components/meeting/meetingPageLayout/MeetingPageLayout';
import Meeting from '../components/meeting/Meeting';
import { useLocation, useParams } from 'react-router';
import { useFetchMeetingDetail } from '../hooks/useFetchMeetings';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '../recoil/atoms/userAtom';
// import { useStomp } from '../hooks/useStomp';

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
  // const { sendMessage, subscribe, connected } = useStomp({
  //   onConnect: () => {
  //     if (meetingId) {
  //       // 구독 설정
  //       // subscribe(`/topic/meeting/participants`, (participants: any) => {
  //       subscribe(`/topic/meeting/participants`, (participants: any) => {
  //         console.log('Parsed Participants:', participants); // 전체 데이터 로깅

  //         // 참가자 데이터를 렌더링
  //         const participantsList = document.getElementById('participantsList');
  //         if (participantsList) {
  //           participantsList.innerHTML = ''; // 기존 목록 초기화

  //           participants.forEach((participant: any) => {
  //             const li = document.createElement('li');
  //             li.innerHTML = `
  //             <div>
  //               <strong>Nickname:</strong> ${participant.nickname} <br>
  //               <strong>Role:</strong> ${participant.role} <br>
  //               <strong>Profile:</strong>
  //               <img src="${participant.profile}" alt="${participant.nickname}'s profile" width="50" />
  //             </div>
  //           `;
  //             participantsList.appendChild(li);
  //           });
  //         }
  //       });

  //       // 참가자 입장 메시지 전송
  //       sendMessage(`/api/v1/meeting/enter`, { userId: user!.id });
  //     }
  //   },
  // });

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
