import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { CloudComponent } from "@/components/cloud";
import { cloudList } from "./index.constants";
import { styles } from "./indexStyles";
import { useEffect } from "react";

/**
 * @brief 스플래시
 */

export default function SplashScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate("Login");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.wrapper}>
                <Text style={styles.title}>foorint</Text>

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
            </SafeAreaView>
        </View>
    )
}