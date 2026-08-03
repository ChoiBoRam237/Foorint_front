import { useEffect, useState } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";

/**
 * @brief 설정 컨트롤
 */

export const useControlSetting = () => {
    const [isPushNotification, setIsPushNotification] = useState<boolean>(false);
    const translateX = useSharedValue<number>(0);

    useEffect(() => {
        translateX.value = withTiming(
            isPushNotification ? 20 : 0,
            {
                duration: 200,
            }
        );
    }, [isPushNotification]);

    return {
        isPushNotification, setIsPushNotification,
        translateX,
    }
}