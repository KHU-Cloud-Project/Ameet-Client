/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import EtcBoard from './etcBoard/EtcBoard';
import BotBoard from './botBoard/BotBoard';
import { useRecoilState } from 'recoil';
import { userAtom, UserForTeam } from '../../recoil/atoms/userAtom';
import BoardHeader from '../common/board/header/BoardHeader';
import { Meeting as MeetingType } from '../../models/Meeting';
import PersonBoard from './personBoard/PersonBoard';
import { useEffect, useRef, useState } from 'react';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

type MeetingProps = {
  meeting: MeetingType | null;
  loading: boolean;
  error: string | null;
  teamName: string;
  teamId: number;
};

const MeetingBody = styled.div`
  display: flex;
  flex: 1;
  padding: 28px 15px 28px 15px; // TRBL
  overflow: hidden;
`;

const BlockWrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 26px;
  overflow: hidden;
`;

const BlockColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 18px;
  overflow: hidden;
`;

const Meeting = ({ meeting, teamName, teamId }: MeetingProps) => {
  const [user] = useRecoilState(userAtom);
  const [participants, setParticipants] = useState<UserForTeam[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [connections, setConnections] = useState<{
    [key: string]: RTCPeerConnection;
  }>({});
  const stompClientRef = useRef<Client | null>(null);
  const rtcSocketRef = useRef<WebSocket | null>(null);

  const handleNonJSONMessage = (message: string) => {
    console.warn('Non-JSON WebSocket message received:', message);
  };

  if (!user || !user.id) {
    throw new Error('User data is not present.');
  }

  useEffect(() => {
    if (!meeting?.meetingId) {
      console.warn('Missing user or meeting details.');
      return;
    }

    if (!stompClientRef.current) {
      console.log('Initializing STOMP client...');
      const stompClient = new Client({
        webSocketFactory: () => new SockJS('https://localhost:8443/ws'),
        debug: (str) => console.log(str),
        reconnectDelay: 5000,
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,
      });

      stompClient.onConnect = () => {
        console.log('Connected to STOMP');

        stompClient.subscribe(
          `/topic/meeting/participants`,
          (message: Message) => {
            try {
              const participantsList = JSON.parse(
                message.body,
              ) as UserForTeam[];
              console.log('Participants received:', participantsList);

              // Deduplicate participants by `userId`
              const uniqueParticipants = Array.from(
                new Map(
                  participantsList.map((participant) => [
                    participant.userId,
                    participant,
                  ]),
                ).values(),
              );

              setParticipants(uniqueParticipants);
            } catch (error) {
              console.error('Error parsing participants message:', error);
            }
          },
        );

        stompClient.publish({
          destination: '/api/v1/meeting/enter',
          body: JSON.stringify(user.id),
        });

        initializeWebRTC();
      };

      stompClient.onStompError = (frame) => {
        console.error('STOMP Error:', frame.headers['message']);
      };

      stompClient.activate();
      stompClientRef.current = stompClient;
    }

    return () => {
      if (stompClientRef.current) {
        console.log('Deactivating STOMP client...');
        stompClientRef.current.deactivate();
      }
      disconnectWebRTC();
    };
  }, [meeting?.meetingId, teamId, user]);

  const initializeWebRTC = async () => {
    if (!rtcSocketRef.current && meeting?.meetingId && user?.id && teamId) {
      console.log('Initializing WebRTC...');
      const rtcSocket = new WebSocket(
        'wss://localhost:8443/api/v1/meeting/join',
      );
      rtcSocketRef.current = rtcSocket;

      rtcSocket.onopen = async () => {
        console.log('WebRTC WebSocket connected');
        rtcSocket.send(
          JSON.stringify({
            userId: user.id,
            meetingId: meeting.meetingId,
            teamId,
          }),
        );

        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          setLocalStream(stream);

          const connection = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
          });

          connection.onicecandidate = (event) => {
            if (event.candidate) {
              rtcSocket.send(
                JSON.stringify({
                  type: 'ICE_CANDIDATE',
                  candidate: event.candidate,
                }),
              );
            }
          };

          connection.ontrack = (event) => {
            console.log('Remote track received:', event.streams[0]);

            // Play remote stream only
            const remoteStream = event.streams[0];
            const audioElement = document.createElement('audio');
            audioElement.srcObject = remoteStream;
            audioElement.autoplay = true;
            document.body.appendChild(audioElement);
          };

          // Send your local audio tracks to the peer but don't play them locally
          stream
            .getTracks()
            .forEach((track) => connection.addTrack(track, stream));
          setConnections((prev) => ({
            ...prev,
            [meeting?.meetingId || 'unknown']: connection,
          }));

          const offer = await connection.createOffer();
          await connection.setLocalDescription(offer);

          rtcSocket.send(
            JSON.stringify({
              type: 'OFFER',
              offer,
            }),
          );
        } catch (error) {
          console.error('Error initializing WebRTC:', error);
        }
      };

      rtcSocket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log('WebRTC Signal received:', message);

          const connection = connections[meeting?.meetingId || 'unknown'];
          if (!connection) return;

          if (message.type === 'ANSWER') {
            connection.setRemoteDescription(
              new RTCSessionDescription(message.answer),
            );
          } else if (message.type === 'ICE_CANDIDATE') {
            connection.addIceCandidate(new RTCIceCandidate(message.candidate));
          }
        } catch (error) {
          handleNonJSONMessage(event.data);
        }
      };

      rtcSocket.onclose = () => {
        console.log('WebRTC WebSocket disconnected');
      };

      rtcSocket.onerror = (error) => {
        console.error('WebRTC WebSocket error:', error);
      };
    }
  };

  const disconnectWebRTC = () => {
    if (rtcSocketRef.current) {
      console.log('Disconnecting WebRTC...');
      rtcSocketRef.current.close();
      rtcSocketRef.current = null;
    }

    Object.values(connections).forEach((connection) => {
      connection.close();
    });
    setConnections({});
  };

  const leaveMeeting = () => {
    if (stompClientRef.current) {
      stompClientRef.current.publish({
        destination: '/api/v1/meeting/leave',
        body: JSON.stringify(user.id),
      });
    }
    disconnectWebRTC();
  };

  if (!meeting) {
    return <div></div>;
  }

  return (
    <>
      <BoardHeader
        title={teamName}
        description={meeting?.participants?.join(', ') || '-'}
        hasSearchbar={false}
        user={user}
        hasLogo={true}
      />
      <MeetingBody>
        <BlockWrapper>
          <PersonBoard participants={participants} localStream={localStream} />
          <BlockColumn>
            <EtcBoard
              meetingId={meeting?.meetingId ?? 0}
              leaveMeeting={leaveMeeting}
            />
            <BotBoard presignedUrl={meeting.presignedUrl} />
          </BlockColumn>
        </BlockWrapper>
      </MeetingBody>
    </>
  );
};

export default Meeting;

{
  /* <section>
        <h2>Participants</h2>
        <ul>
          {participants.map((participant) => (
            <li key={participant.userId}>
              {participant.nickname}, {participant.role}
            </li>
          ))}
        </ul>
      </section> */
}
