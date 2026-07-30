import { ScrollView, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { format, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import { commonStyles } from "@/styles/common";
import { ArrowHeaderComponent } from "@/components/arrow-header";
import { ChatInput } from "./_components/chat-input";
import { MyChat } from "./_components/my-chat";
import { YourChat } from "./_components/your-chat";
import { useControlChat } from "./index.control";
import { chatStyles } from "./indexStyles";

/**
 * @brief 고객센터 채팅
 */

const data = [
    {
        code: 1,
        user: {
            code: 1,
            name: "홍길동",
            profileImgUrl: "aa.png",
            customerServiceCode: 1,
            email: "aaa@gmail.com",
            loginType: "KAKAO",
            userType: "USER",
        },
        message: "지금 뭐하세요?",
        createdAt: new Date(2026, 7, 29, 9, 10),
    },
    {
        code: 2,
        user: {
            code: 1,
            name: "홍길동",
            profileImgUrl: "aa.png",
            customerServiceCode: 1,
            email: "aaa@gmail.com",
            loginType: "KAKAO",
            userType: "USER",
        },
        message: "지금 뭐하세요?",
        createdAt: new Date(2026, 7, 29, 9, 10),
    },
    {
        code: 3,
        user: {
            code: 2,
            name: "최보람",
            profileImgUrl: "aa.png",
            email: "aaa@gmail.com",
            loginType: "KAKAO",
            userType: "ADMIN",
        },
        message: "지금 일하고있습니다.",
        createdAt: new Date(2026, 7, 30, 13, 31),
    },
];

export default function CustomerServiceChatScreen() {
    const insets = useSafeAreaInsets();
    const controller = useControlChat();

    return (
        <SafeAreaView style={commonStyles.container}>
            <ArrowHeaderComponent title="고객센터" />

            <View
                style={[
                    chatStyles.container,
                    {
                        paddingTop: insets.top + 60 + 20,
                        paddingBottom: insets.bottom + 80,
                    }
                ]}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ gap: 24 }}
                >
                    {data.map((chat, index) => {
                        const prev = data[index - 1];
                        const next = data[index + 1];

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

            <ChatInput
                value={controller.chatValue}
                setValue={controller.setChatValue}
                onSubmit={() => {}}
            />
        </SafeAreaView>
    )
}