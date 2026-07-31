import { useRef } from "react";
import { Client } from "@stomp/stompjs";
import { BASE_URL } from "@env";
import { useTokenInfo } from "./useTokenInfo";

/**
 * @brief 웹소켓 Hook
 */

export const useWebSocket = () => {
    const tokenInfo = useTokenInfo();

    const clientRef = useRef<Client | null>(null);

    const connect = (onConnected: () => void) => {
        if (clientRef.current?.active) return;

        const client = new Client({
            brokerURL: `ws://${BASE_URL}/ws`,
            connectHeaders: {
                Authorization: `Bearer ${tokenInfo.accessToken}`,
            },

            reconnectDelay: 5000,

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

        client.activate();
        clientRef.current = client;
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