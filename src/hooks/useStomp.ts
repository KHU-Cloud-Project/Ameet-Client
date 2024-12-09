import { useRef, useEffect, useState } from 'react';
import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

type StompProps = {
  onConnect?: () => void;
  onMessage?: (message: any) => void;
};

type UseStompReturn = {
  sendMessage: (destination: string, body: any) => void;
  subscribe: (
    destination: string,
    callback: (message: any) => void,
  ) => StompSubscription | null;
  connected: boolean;
};

export const useStomp = ({ onConnect }: StompProps): UseStompReturn => {
  const clientRef = useRef<Client | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const stompEndpoint = import.meta.env.VITE_STOMP_ENDPOINT;
    if (!clientRef.current) {
      const socket = new SockJS(stompEndpoint);
      const stompClient = new Client({
        webSocketFactory: () => socket,
        debug: (str) => console.log(str),
        onConnect: () => {
          console.log('STOMP connected');
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
    }

    return () => {
      clientRef.current?.deactivate();
      clientRef.current = null;
    };
  }, [onConnect]);

  // const sendMessage_prev = (destination: string, body: any) => {
  //   if (connected && clientRef.current) {
  //     clientRef.current.publish({
  //       destination,
  //       body: JSON.stringify(body),
  //     });
  //   }
  // };

  const sendMessage = (destination: string, body: any) => {
    if (connected && clientRef.current) {
      console.log('Sending Message:', { destination, body });
      clientRef.current.publish({
        destination,
        body: JSON.stringify(body),
      });
    } else {
      console.warn(
        'Attempted to send message before STOMP connection is ready',
      );
    }
  };

  const subscribedTopics = useRef(new Set<string>());

  const subscribe = (destination: string, callback: (message: any) => void) => {
    if (
      connected &&
      clientRef.current &&
      !subscribedTopics.current.has(destination)
    ) {
      subscribedTopics.current.add(destination); // Add topic to the set
      return clientRef.current.subscribe(destination, (msg) => {
        const rawMessage = msg.body;
        console.log('Message Received:', rawMessage);
        try {
          const parsedData = JSON.parse(rawMessage);
          callback(parsedData);
        } catch (error) {
          console.error('Error parsing message:', rawMessage);
        }
      });
    }
    if (!connected) {
      console.warn('Attempted to subscribe before STOMP connection is ready');
    }
    return null;
  };

  return { sendMessage, subscribe, connected };
};
