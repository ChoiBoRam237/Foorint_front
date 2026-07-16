import { Text, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CloudComponent } from "@/components/cloud";
import Google from "@/assets/images/google.svg";
import Kakao from "@/assets/images/kakao.svg";
import { cloudList } from "./index.constants";
import { loginStyles } from "./indexStyles";
import { useControlLogin } from "./index.control";

/**
 * @brief 로그인
 */

export default function LoginScreen() {
    const controller = useControlLogin();

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
                    <Pressable
                        style={({ pressed }) => [
                            loginStyles.googleButton,
                            pressed && loginStyles.activeGoogleButton
                        ]}
                        disabled={controller.loginLoading}
                        onPress={controller.onGoogleLogin}
                    >
                        <Google width={20} height={20} />
                        <Text style={loginStyles.buttonText}>구글로 시작하기</Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            loginStyles.kakaoButton,
                            pressed && loginStyles.activeKakaoButton
                        ]}
                        disabled={controller.loginLoading}
                        onPress={controller.onKakaoLogin}
                    >
                        <Kakao width={20} height={20} />
                        <Text style={loginStyles.buttonText}>카카오로 시작하기</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </View>
    )
}