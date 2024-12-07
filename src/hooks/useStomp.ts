import { useRef, useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

type StompProps = {
  onConnect?: () => void;
  onMessage?: (message: any) => void;
};

export const useStomp = ({ onConnect }: StompProps) => {
  const clientRef = useRef<Client | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const stompEndpoint = import.meta.env.VITE_STOMP_ENDPOINT;
    const socket = new SockJS(stompEndpoint);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      onConnect: () => {
        setConnected(true);
        onConnect?.();
      },
      heartbeatIncoming: 0,
      heartbeatOutgoing: 0,
      onStompError: (error) => {
        console.error('STOMP Error:', error);
      },
    });

    stompClient.activate();
    clientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, [onConnect]);

  const sendMessage = (destination: string, body: any) => {
    if (connected && clientRef.current) {
      clientRef.current.publish({
        destination,
        body: JSON.stringify(body),
      });
    }
  };

  const subscribe = (destination: string, callback: (message: any) => void) => {
    if (connected && clientRef.current) {
      return clientRef.current.subscribe(destination, (msg) => {
        const data = msg.body;
        try {
          // atemt to parse as JSON
          const parsedData = JSON.parse(data);
          callback(parsedData);
        } catch (error) {
          console.log('Non-JSON message received:', data);
        }
      });
    }
    return null;
  };

  return { sendMessage, subscribe, connected };
};
