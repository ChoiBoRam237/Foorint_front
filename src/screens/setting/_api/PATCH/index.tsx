import { privateBase } from "@/util/api";

/**
 * @brief 설정 관련 PATCH API
 */

export const patchSettingApi = {
    // 푸시 알림 수신 여부 업데이트
    patchPushNotification: async (notificationEnabled: boolean) =>
        await (
            await privateBase.patch(`/v3/api/user/update/notification`, null, {
                params: {
                    notificationEnabled,
                },
            })
        ).data.data,
}