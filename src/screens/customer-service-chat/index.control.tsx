import { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { RootStackParamList } from "@/navigation/types";
import { ICustomerMessage } from "@/types/response/customer-service";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useWebSocket } from "@/hooks/useWebSocket";
import { getCustomerChatApi } from "./_api/GET";

/**
 * @brief 고객센터 채팅 컨트롤
 */

type DetailRouteProp = RouteProp<RootStackParamList, "Chat">;

export const useControlChat = () => {
    const route = useRoute<DetailRouteProp>();
    const { userCode } = useUserInfo();
    const { accessToken } = useTokenInfo();
    const client = useWebSocket();
    const [chatValue, setChatValue] = useState<string>("");
    const [messages, setMessages] = useState<ICustomerMessage[]>([]);
    const scrollViewRef = useRef<ScrollView>(null);

    // 이전 채팅 내용 조회 api
    const getCustomerMessages = useMutation({
        mutationFn: () => getCustomerChatApi.getCustomerMessages(route.params.code),
        onSuccess: (data) => {
            setMessages(data);

            if (data.length > 0) {
                requestAnimationFrame(() => {
                    scrollBottom();
                });
            }
        },
        onError: (error: AxiosError) => {
            console.error("이전 채팅 내용 조회 에러 : ", error);
        }
    });

    // 메시지 전송
    const onSend = () => {
        // 메시지 전송 호출
        client.getClient()?.publish({
            destination: `/pub/send/${route.params.code}`,
            body: JSON.stringify({
                userCode,
                message: chatValue,
            }),
        });
        setChatValue("");
    }

    // 메시지 보내면 화면 맨 아래로 스크롤
    const scrollBottom = () => {
        requestAnimationFrame(() => {
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({
                    animated: true,
                });
            }, 100);
        });
    };

    useEffect(() => {
        getCustomerMessages.mutate();
    }, []);

    useEffect(() => {
        if (!accessToken) return;
        
        // socket 연결
        client.connect(accessToken, () => {
            client.getClient()?.subscribe(`/sub/room/${route.params.code}`, (msg) => {
                const message = JSON.parse(msg.body);
                setMessages(prev => [...prev, message]);
            });
        });

        return () => client.disconnect();
    }, [accessToken]);
    
    return {
        userCode,
        isLoading: getCustomerMessages.isPending,
        scrollViewRef,
        messages,
        chatValue, setChatValue,
        scrollBottom, onSend,
    }
}