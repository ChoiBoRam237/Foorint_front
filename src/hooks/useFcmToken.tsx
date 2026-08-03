import { PermissionsAndroid, Platform } from 'react-native';
import { getMessaging, getToken, deleteToken } from '@react-native-firebase/messaging';

/**
 * @brief FCM 토큰 발급 Hook
 */

export const useFcmToken = () => {
    const register = async () => {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            );
        
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                return null;
            }
        }
        
        const messaging = getMessaging();
        const token = await getToken(messaging);

        return token;
    };

    const unregister = async () => {
        const messaging = getMessaging();
        await deleteToken(messaging);
        return "";
    };

    return { register, unregister };
}