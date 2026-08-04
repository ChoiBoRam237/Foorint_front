import { useEffect, useState } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFcmToken } from "@/hooks/useFcmToken";
import { useUserInfo } from "@/hooks/useUserInfo";
import { asyncStorage } from "@/util/asyncStorage";
import { patchSettingApi } from "./_api/PATCH";

/**
 * @brief 설정 컨트롤
 */

export const useControlSetting = () => {
    const fcmToken = useFcmToken();
    const { notificationEnabled } = useUserInfo();
    const translateX = useSharedValue<number>(0);

    // 푸시 알림 수신 여부 업데이트 api
    const patchPushNotification = useMutation({
        mutationFn: (notificationEnabled: boolean) => patchSettingApi.patchPushNotification(notificationEnabled),
        onSuccess: async (data, variables) => {
            const userInfo = await asyncStorage.getAsyncStorage("userInfo");

            if (userInfo) {
                await asyncStorage.setAsyncStorage(
                    "userInfo",
                    JSON.stringify({
                        ...userInfo,
                        notificationEnabled: variables,
                    })
                );
            }
        },
        onError: (error: AxiosError) => {
            console.error("푸시 알림 수신 여부 업데이트 에러 : ", error);
        },
    });

    const onUpdatePushNotification = async () => {
        const fcmTokenValue = await fcmToken.register();
        patchPushNotification.mutate(fcmTokenValue.notificationEnabled);
    }

    useEffect(() => {
        translateX.value = withTiming(
            notificationEnabled ? 20 : 0,
            {
                duration: 200,
            }
        );
    }, [notificationEnabled]);

    return {
        notificationEnabled, translateX,
        onUpdatePushNotification,
    }
}