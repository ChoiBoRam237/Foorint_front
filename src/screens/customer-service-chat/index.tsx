import { Keyboard, ScrollView, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { format, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import { commonStyles } from "@/styles/common";
import { ArrowHeaderComponent } from "@/components/arrow-header";
import { LoadingComponent } from "@/components/loading";
import { ChatInput } from "./_components/chat-input";
import { MyChat } from "./_components/my-chat";
import { YourChat } from "./_components/your-chat";
import { useControlChat } from "./index.control";
import { chatStyles } from "./indexStyles";
import { useEffect, useState } from "react";

/**
 * @brief 고객센터 채팅
 */

export default function CustomerServiceChatScreen() {
    const insets = useSafeAreaInsets();
    const controller = useControlChat();
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

    useEffect(() => {
        const show = Keyboard.addListener(
            "keyboardDidShow",
            e => {
                setKeyboardHeight(e.endCoordinates.height);
            }
        );

        const hide = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                setKeyboardHeight(0);
            }
        );

        return () => {
            show.remove();
            hide.remove();
        };
    }, []);

    return (
        <SafeAreaView style={commonStyles.container}>
            <ArrowHeaderComponent title="고객센터" />

            {!controller.isLoading ? (
                <>
                    <View
                        style={[
                            chatStyles.container,
                            { paddingTop: insets.top + 60 + 20 }
                        ]}
                    >
                        <ScrollView
                            ref={controller.scrollViewRef}
                            style={{ flex: 1 }}
                            contentContainerStyle={{ 
                                gap: 24,
                                paddingBottom: keyboardHeight,
                            }}
                            onContentSizeChange={controller.scrollBottom}
                        >
                            {controller.messages.map((chat, index) => {
                                const prev = controller.messages[index - 1];
                                const next = controller.messages[index + 1];

                                // 프로필 숨기기
                                const hiddenProfile = 
                                    (prev?.user?.code === chat.user.code)
                                    && (format(prev.createdAt, "HH:mm") === format(chat.createdAt, "HH:mm"));

                                // 시간 숨기기
                                const hiddenTime =
                                    (next?.user?.code === chat.user.code)
                                    && (format(next.createdAt, "HH:mm") === format(chat.createdAt, "HH:mm"));

                                // 날짜 구분선
                                const showDate = !prev || !isSameDay(prev.createdAt, chat.createdAt);

                                return (
                                    <View
                                        key={index}
                                        style={{ flex: 1, gap: 24 }}
                                    >
                                        {showDate && (
                                            <View style={chatStyles.dateWrapper}>
                                                <View style={chatStyles.date}>
                                                    <Text style={chatStyles.dateText}>
                                                        {format(chat.createdAt, "yyyy년 MM월 dd일 EEEE", { locale: ko })}
                                                    </Text>
                                                </View>
                                            </View>
                                        )}

                                        {chat.user.code === controller.userCode ? (
                                            <MyChat
                                                message={chat.message}
                                                createdAt={chat.createdAt}
                                                showTime={!hiddenTime}
                                            />
                                        ) : (
                                            <YourChat
                                                user={chat.user}
                                                message={chat.message}
                                                createdAt={chat.createdAt}
                                                showTime={!hiddenTime}
                                                showProfile={!hiddenProfile}
                                            />
                                        )}
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>

                    <KeyboardStickyView>
                        <ChatInput
                            value={controller.chatValue}
                            setValue={controller.setChatValue}
                            onSubmit={controller.onSend}
                        />
                    </KeyboardStickyView>
                </>
            ) : (
                <LoadingComponent />
            )}
        </SafeAreaView>
    )
}