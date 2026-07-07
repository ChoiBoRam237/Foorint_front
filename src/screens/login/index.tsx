import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CloudComponent } from "@/components/cloud";
import { Google, Kakao } from "@/assets/images";
import { cloudList } from "./index.constants";
import { styles } from "./indexStyles";

/**
 * @brief 로그인
 */

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.wrapper}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>foorint</Text>
                    <Text style={styles.subTitle}>여행의 모든 순간을 발자국으로 남기자</Text>
                </View>

                <View style={styles.cloudContainer}>
                    <View style={styles.cloudWrapper}>
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

                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        style={styles.googleButton}
                        activeOpacity={0.8}
                        onPress={() => {}}
                    >
                        <Google />
                        <Text style={styles.buttonText}>구글로 시작하기</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.kakaoButton}
                        activeOpacity={0.8}
                        onPress={() => {}}
                    >
                        <Kakao />
                        <Text style={styles.buttonText}>카카오로 시작하기</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}