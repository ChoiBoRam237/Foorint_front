import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { CloudComponent } from "@/components/cloud";
import Google from "@/assets/images/google.svg";
import Kakao from "@/assets/images/kakao.svg";
import { cloudList } from "./index.constants";
import { loginStyles } from "./indexStyles";

/**
 * @brief 로그인
 */

export default function LoginScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const onClick = () => {
        navigation.navigate("Generate");
    }

    return (
        <View style={loginStyles.container}>
            <SafeAreaView style={loginStyles.wrapper}>
                <View style={loginStyles.titleWrapper}>
                    <Text style={loginStyles.title}>foorint</Text>
                    <Text style={loginStyles.subTitle}>여행의 모든 순간을 발자국으로 남기자</Text>
                </View>

                <View style={loginStyles.cloudContainer}>
                    <View style={loginStyles.cloudWrapper}>
                        {cloudList.map((cloud, index) => (
                            <CloudComponent
                                key={index}
                                target={cloud.target}
                                width={cloud.width}
                                height={cloud.height}
                                position={cloud.position}
                            />
                        ))}
                    </View>
                </View>

                <View style={loginStyles.buttonWrapper}>
                    <TouchableOpacity
                        style={loginStyles.googleButton}
                        activeOpacity={0.8}
                        onPress={onClick}
                    >
                        <Google width={20} height={20} />
                        <Text style={loginStyles.buttonText}>구글로 시작하기</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={loginStyles.kakaoButton}
                        activeOpacity={0.8}
                        onPress={onClick}
                    >
                        <Kakao width={20} height={20} />
                        <Text style={loginStyles.buttonText}>카카오로 시작하기</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}