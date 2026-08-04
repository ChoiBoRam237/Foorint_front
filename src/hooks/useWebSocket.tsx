import { useRef } from "react";
import { Client } from "@stomp/stompjs";
import { WEBSOCKET_URL } from "@env";

/**
 * @brief 웹소켓 Hook
 */

export const useWebSocket = () => {
    const clientRef = useRef<Client | null>(null);
    console.log(WEBSOCKET_URL)

    const connect = (accessToken: string, onConnected: () => void) => {
        if (clientRef.current?.active) return;

        try {
            const client = new Client({
                webSocketFactory: () => 
                    new WebSocket(WEBSOCKET_URL, ["v12.stomp"]),

                connectHeaders: {
                    Authorization: `Bearer ${accessToken}`,
                },
                forceBinaryWSFrames: true,
                reconnectDelay: 5000,
    
                debug: (msg) => {
                    console.debug("STOMP", msg);
                },
    
                onConnect: () => {
                    console.debug("WebSocket connect");
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