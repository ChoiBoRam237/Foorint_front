import { Text, Pressable, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useUserInfo } from "@/hooks/useUserInfo";
import { useCustomerRoom } from "@/hooks/_api/useCustomerRoom";
import Airplane from "@/assets/images/airplane.svg";
import { colors } from "@/styles/colors";
import { UserRole } from "@/types/enum";
import { mainHeaderStyles } from "./indexStyles"

/**
 * @brief 메인 헤더 컴포넌트
 */

export const MainHeaderComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const { userRole, customerRoomCode } = useUserInfo();
    const {
        onGenerateCustomerRoom
    } = useCustomerRoom({ 
        onSuccess: 
            (customerRoomCode: number) => 
                navigation.navigate("Chat", { code: customerRoomCode })
    });

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
                    if (userRole === UserRole.ADMIN) {
                        navigation.navigate("ChatList");
                    } else {
                        if (customerRoomCode) navigation.navigate("Chat", { code: customerRoomCode });
                        else onGenerateCustomerRoom();
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