import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { format } from "date-fns";
import { RootStackParamList } from "@/navigation/types";
import { commonStyles } from "@/styles/common";
import { ArrowHeaderComponent } from "@/components/arrow-header";
import { LoadingComponent } from "@/components/loading";
import { NoDataComponent } from "@/components/no-data";
import { chatListStyles } from "./indexStyles";
import { useControlCustomerList } from "./index.control";

/**
 * @brief 고객센터 채팅 리스트
 */

export default function CustomerServiceListScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const controller = useControlCustomerList();

    return (
        <SafeAreaView style={commonStyles.container}>
            <ArrowHeaderComponent title="고객센터 관리자" />

            {!controller.isLoading ? (
                <>
                    {controller.customerList.length > 0 ? (
                        <FlatList
                            key={"1"}
                            style={[
                                chatListStyles.list,
                                { paddingTop: insets.top + 60 + 20 }
                            ]}
                            contentContainerStyle={{ gap: 8 }}
                            keyExtractor={item => item.code.toString()}
                            data={controller.customerList}
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
                                        source={{ uri: item.user.profileImgUrl }}
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
                                                {format(item.lastMessageCreatedAt, "yyyy.MM.dd")}
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
                    ) : (
                        <NoDataComponent text="아직 문의 내역이 없습니다." />
                    )}
                </>
            ) : (
                <LoadingComponent />
            )}
        </SafeAreaView>
    )
}