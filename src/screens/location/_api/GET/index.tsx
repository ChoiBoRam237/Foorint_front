import { privateBase } from "@/util/api";

/**
 * @brief 여행 장소 관련 GET API
 */

export const getLocationApi = {
    // 여행 장소 목록 조회
    getUserLocation: async (year: number) =>
        await (
            await privateBase.get(`/v3/api/user/location`, {
                params: { year }
            })
        ).data.data,
}