import { Pressable, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import DeviceInfo from "react-native-device-info";
import Animated from "react-native-reanimated";
import { ArrowHeaderComponent } from "@/components/arrow-header";
import { commonStyles } from "@/styles/common";
import { colors } from "@/styles/colors";
import { useControlSetting } from "./index.control";
import { settingStyles } from "./indexStyles";

/**
 * @brief 설정
 */

export default function SettingScreen() {
    const insets = useSafeAreaInsets();
    const controller = useControlSetting();
    const version = DeviceInfo.getVersion();

    return (
        <SafeAreaView style={commonStyles.container}>
            <ArrowHeaderComponent title="설정" />

            <View
                style={[
                    settingStyles.container,
                    { paddingTop: insets.top + 60 + 24 }
                ]}
            >
                <View style={settingStyles.item}>
                    <Text style={settingStyles.itemText}>푸시 알림</Text>
                    <Pressable
                        style={[
                            settingStyles.track,
                            controller.notificationEnabled && { backgroundColor: colors.thirdDark }
                        ]}
                        onPress={async () => {
                            await controller.onUpdatePushNotification();
                        }}
                    >
                        <Animated.View
                            style={[
                                settingStyles.thumb,
                                { transform: [{ translateX: controller.translateX }] },
                            ]}
                        />
                    </Pressable>
                </View>
                
                <View style={settingStyles.item}>
                    <Text style={settingStyles.itemText}>버전</Text>
                    <Text style={settingStyles.itemText}>v.{version}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}