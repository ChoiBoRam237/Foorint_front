import { useRef } from "react";
import { Client } from "@stomp/stompjs";

/**
 * @brief 웹소켓 Hook
 */

export const useWebSocket = () => {
    const clientRef = useRef<Client | null>(null);

    const connect = (accessToken: string, onConnected: () => void) => {
        if (clientRef.current?.active) return;

        try {
            const client = new Client({
                webSocketFactory: () => 
                    new WebSocket("ws://192.168.219.108:8080/ws", ["v12.stomp"]),

                connectHeaders: {
                    Authorization: `Bearer ${accessToken}`,
                },
                forceBinaryWSFrames: true,
                reconnectDelay: 5000,
    
                debug: (msg) => {
                    console.log("STOMP", msg);
                },
    
                onConnect: () => {
                    console.log("WebSocket connect");
                    onConnected();
                },
    
                onStompError: (frame) => {
                    console.error("Broker Error", frame);
                },
    
                onWebSocketError: (event) => {
                    console.error("WebSocket Error", event);
                },
            });

            clientRef.current = client;
            client.activate();
        } catch(e) {
            console.error("STOMP 생성 에러", e);
        }
    };

    const disconnect = () => {
        if (clientRef.current?.active) {
            clientRef.current.deactivate();
        }

        clientRef.current = null;
    };

    const getClient = () => clientRef.current;

    return {
        connect,
        disconnect,
        getClient,
    };
}