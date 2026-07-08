import { Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Airplane from "@/assets/images/airplane.svg";
import { colors } from "@/styles/colors";
import { mainHeaderStyles } from "./indexStyles"

/**
 * @brief 메인 헤더 컴포넌트
 */

export const MainHeader = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                mainHeaderStyles.container,
                { top: insets.top }
            ]}    
        >
            <TouchableOpacity 
                style={mainHeaderStyles.logoWrapper}
                onPress={() => navigation.navigate("Home")}
            >
                <Airplane
                    width={65}
                    height={40}
                    style={mainHeaderStyles.logoImg}
                />
                <Text style={mainHeaderStyles.logoTitle}>foorint</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <AntDesign
                    name="customerservice"
                    color={colors.thirdDark}
                    size={24}
                />
            </TouchableOpacity>
        </View>
    )
}