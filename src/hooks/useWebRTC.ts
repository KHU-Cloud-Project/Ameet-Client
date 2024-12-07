import { useEffect, useRef } from 'react';

export const useWebRTC = (
  rtcSocketUrl: string,
  localVideoRef: React.RefObject<HTMLVideoElement>,
  remoteVideoRef: React.RefObject<HTMLVideoElement>,
  userId: number,
  meetingId: number,
  teamId: number,
) => {
  const rtcSocketRef = useRef<WebSocket | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!localVideoRef.current || !remoteVideoRef.current) {
      console.error('Local or remote video refs are not attached.');
      return;
    }

    const rtcSocket = new WebSocket(rtcSocketUrl);
    const iceServers = [{ urls: 'stun:stun.l.google.com:19302' }];
    const peerConnection = new RTCPeerConnection({ iceServers });

    // WebSocket Event Handlers
    rtcSocket.onopen = () => {
      console.log('WebRTC WebSocket connected');
      rtcSocket.send(JSON.stringify({ userId, meetingId, teamId }));
    };

    rtcSocket.onmessage = async (event) => {
      const data = event.data;
      try {
        const message = JSON.parse(data);

        if (message.type === 'OFFER') {
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription(message.offer),
          );
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          rtcSocket.send(
            JSON.stringify({
              type: 'ANSWER',
              answer: peerConnection.localDescription,
            }),
          );
        } else if (message.type === 'ANSWER') {
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription(message.answer),
          );
        } else if (message.type === 'ICE_CANDIDATE') {
          const candidate = new RTCIceCandidate(message.candidate);
          peerConnection.addIceCandidate(candidate).catch(console.error);
        }
      } catch (error) {
        console.log('Non-JSON message received:', data);
      }
    };

    rtcSocket.onerror = (error) => console.error('WebRTC Socket Error:', error);
    rtcSocket.onclose = (event) =>
      console.warn('WebRTC WebSocket Closed:', event);

    rtcSocketRef.current = rtcSocket;
    peerConnectionRef.current = peerConnection;

    // Start Local Media Stream
    const startMediaStream = async () => {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localStreamRef.current = localStream;

        // Bind local stream to video ref
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }

        // Add local tracks to peer connection
        localStream
          .getTracks()
          .forEach((track) => peerConnection.addTrack(track, localStream));

        // Handle remote stream
        peerConnection.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    // ICE Candidate Handling
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        rtcSocket.send(
          JSON.stringify({ type: 'ICE_CANDIDATE', candidate: event.candidate }),
        );
      }
    };

    startMediaStream();

    // Cleanup on Component Unmount
    return () => {
      rtcSocket.close();
      peerConnection.close();
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      console.log('WebRTC and WebSocket connections closed');
    };
  }, [rtcSocketUrl, localVideoRef, remoteVideoRef, userId, meetingId, teamId]);
};
