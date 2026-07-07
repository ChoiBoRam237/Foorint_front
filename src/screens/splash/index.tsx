import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CloudComponent } from "@/components/cloud";
import { cloudList } from "./index.constants";
import { styles } from "./indexStyles";

/**
 * @brief 스플래시
 */

export default function SplashScreen() {
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