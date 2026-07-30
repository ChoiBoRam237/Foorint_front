import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { format } from "date-fns";
import { RootStackParamList } from "@/navigation/types";
import { commonStyles } from "@/styles/common";
import { ArrowHeaderComponent } from "@/components/arrow-header";
import { chatListStyles } from "./indexStyles";

/**
 * @brief 고객센터 채팅 리스트
 */

const data = [
    {
        code: 1,
        user: {
            code: 1,
            name: "홍길동",
            profileImgUrl: "aa.png",
        },
        lastMessage: "이미지 업로드가 안됩니다ㅜ",
        lastMessageDate: new Date(2026, 7, 29),
        unreadMessageCount: 2
    },
    {
        code: 2,
        user: {
            code: 2,
            name: "홍길순",
            profileImgUrl: "aa.png",
        },
        lastMessage: "사진 업로드가 안되는데 왜 그런건가요? 사진 업로드가 안되는데 왜 그런건가요?",
        lastMessageDate: new Date(2026, 7, 30),
        unreadMessageCount: 0
    },
]

export default function CustomerServiceChatListScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView style={commonStyles.container}>
            <ArrowHeaderComponent title="고객센터 관리자" />

            <FlatList
                key={"1"}
                style={[
                    chatListStyles.list,
                    { paddingTop: insets.top + 60 + 20 }
                ]}
                contentContainerStyle={{ gap: 8 }}
                keyExtractor={item => item.code.toString()}
                data={data}
                numColumns={1}
                renderItem={({ item }) => (
                    <Pressable
                        style={({ pressed }) => [
                            chatListStyles.item,
                            pressed && { backgroundColor: "#B7EBFF" }
                        ]}
                        onPress={() => navigation.navigate("Chat", { code: item.code })}
                    >
                        <Image
                            style={chatListStyles.itemProfile}
                            src={item.user.profileImgUrl}
                        />

                        <View style={chatListStyles.itemInfo}>
                            <View style={chatListStyles.itemLeft}>
                                <Text style={chatListStyles.itemUserName}>{item.user.name}</Text>
                                <Text
                                    style={chatListStyles.itemLastMessage}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {item.lastMessage}
                                </Text>
                            </View>

                            <View style={chatListStyles.itemRight}>
                                <Text style={chatListStyles.itemDate}>
                                    {format(item.lastMessageDate, "yyyy.MM.dd")}
                                </Text>

                                {item.unreadMessageCount > 0 && (
                                    <View style={chatListStyles.itemMessageCount}>
                                        <Text style={chatListStyles.itemMessageCountText}>{item.unreadMessageCount}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </Pressable>
                )}
            />
        </SafeAreaView>
    )
}