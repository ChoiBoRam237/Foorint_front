import { PermissionsAndroid, Platform } from 'react-native';
import { getMessaging, getToken, deleteToken } from '@react-native-firebase/messaging';

/**
 * @brief FCM 토큰 발급 Hook
 */

export const useFcmToken = () => {
    // FCM 토큰 발급
    const register = async () => {
        let notificationEnabled = true;

        if (Platform.OS === "android" && Platform.Version >= 33) {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            );

            notificationEnabled = granted === PermissionsAndroid.RESULTS.GRANTED;

            if (!notificationEnabled) {
                return {
                    token: "",
                    notificationEnabled: false,
                };
            }
        }
        
        const messaging = getMessaging();
        const token = await getToken(messaging);

        return {
            token,
            notificationEnabled: true,
        };
    };

    return { register };
}