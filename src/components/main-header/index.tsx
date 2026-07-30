import { Text, Pressable, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Airplane from "@/assets/images/airplane.svg";
import { colors } from "@/styles/colors";
import { mainHeaderStyles } from "./indexStyles"
import { useUserInfo } from "@/hooks/useUserInfo";

/**
 * @brief 메인 헤더 컴포넌트
 */

export const MainHeaderComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const { userType, customerServiceCode } = useUserInfo();

    return (
        <View
            style={[
                mainHeaderStyles.container,
                { top: insets.top }
            ]}    
        >
            {/* 홈으로 이동 */}
            <Pressable 
                style={mainHeaderStyles.logoWrapper}
                onPress={() => navigation.navigate("Home")}
            >
                <Airplane
                    width={65}
                    height={40}
                    style={mainHeaderStyles.logoImg}
                />
                <Text style={mainHeaderStyles.logoTitle}>foorint</Text>
            </Pressable>

            <Pressable
                onPress={() => {
                    if (userType === "ADMIN") {
                        navigation.navigate("ChatList");
                    } else {
                        if (customerServiceCode) navigation.navigate("Chat", { code: customerServiceCode });
                        // TODO: 없을 경우 채팅방 새로 생성 후 채팅방으로 접속
                    }
                }}
            >
                <AntDesign
                    name="customerservice"
                    color={colors.thirdDark}
                    size={24}
                />
            </Pressable>
        </View>
    )
}