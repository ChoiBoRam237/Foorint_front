import { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { CloudComponent } from "@/components/cloud";
import { cloudList } from "./index.constants";
import { splashStyles } from "./indexStyles";
import { keychain } from "@/util/keychain";

/**
 * @brief 스플래시
 */

export default function SplashScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const credentials = await keychain.getKeychain();
                const tokenInfo = credentials && JSON.parse(credentials.password);
    
                setTimeout(() => {
                    if (tokenInfo) {
                        navigation.replace("List");
                    } else {
                        navigation.replace("Login");
                    }
                }, 3000);
            } catch (error) {
                navigation.replace("Login");
            }
        };
    
        checkToken();
    }, [navigation]);

    return (
        <View style={splashStyles.container}>
            <SafeAreaView style={splashStyles.wrapper}>
                <Text style={splashStyles.title}>foorint</Text>

                <View style={splashStyles.cloudContainer}>
                    <View style={splashStyles.cloudWrapper}>
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