import { useEffect, useRef } from 'react';

export const useWebRTC = (
  localVideoRef: React.RefObject<HTMLVideoElement>,
  remoteVideoRef: React.RefObject<HTMLVideoElement>,
  userId: number,
  meetingId: number,
  teamId: number,
) => {
  const isInitialized = useRef(false);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const rtcSocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!localVideoRef.current || !remoteVideoRef.current) {
      console.error('Local or remote video refs are not attached.');
      return;
    }

    if (isInitialized.current) return;
    isInitialized.current = true;

    const rtcSocket = new WebSocket(import.meta.env.VITE_WEBRTC_ENDPOINT);
    const iceServers = [{ urls: 'stun:stun.l.google.com:19302' }];
    const peerConnection = new RTCPeerConnection({ iceServers });

    rtcSocketRef.current = rtcSocket;
    peerConnectionRef.current = peerConnection;

    rtcSocket.onopen = () => {
      console.log('WebRTC WebSocket connected');
      rtcSocket.send(JSON.stringify({ userId, meetingId, teamId }));
    };

    rtcSocket.onmessage = async (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'OFFER') {
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription(message.offer),
          );
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          rtcSocket.send(JSON.stringify({ type: 'ANSWER', answer }));
        } else if (message.type === 'ANSWER') {
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription(message.answer),
          );
        } else if (message.type === 'ICE_CANDIDATE') {
          const candidate = new RTCIceCandidate(message.candidate);
          peerConnection.addIceCandidate(candidate).catch(console.error);
        }
      } catch (error) {
        console.log('Non-JSON message received:', event.data);
      }
    };

    const startMediaStream = async () => {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }

        // Check signalingState before adding tracks
        if (peerConnection.signalingState !== 'closed') {
          localStream
            .getTracks()
            .forEach((track) => peerConnection.addTrack(track, localStream));
        } else {
          console.warn('Cannot add tracks: RTCPeerConnection is closed.');
        }

        peerConnection.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        rtcSocket.send(
          JSON.stringify({ type: 'ICE_CANDIDATE', candidate: event.candidate }),
        );
      }
    };

    peerConnection.onconnectionstatechange = () => {
      console.log('Connection state:', peerConnection.connectionState);
    };

    peerConnection.onsignalingstatechange = () => {
      console.log('Signaling state:', peerConnection.signalingState);
    };

    startMediaStream();

    return () => {
      rtcSocket.close();
      peerConnection.close();

      isInitialized.current = false; // Reset on cleanup
    };
  }, [localVideoRef, remoteVideoRef, userId, meetingId, teamId]);
};
