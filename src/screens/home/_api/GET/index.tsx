import { privateBase } from "@/util/api";

/**
 * @brief 홈화면 관련 GET API
 */

export const getHomeApi = {
    // 월별 발자국 목록 조회
    getFoorintMonth: async (startDate: Date) =>
        await (
            await privateBase.get(`/v3/api/foorint/month`, {
                params: { startDate }
            })
        ).data.data,

    // 일별 발자국 목록 조회
    getFoorintDay: async (startDate: Date) =>
        await (
            await privateBase.get(`/v3/api/foorint/day`, {
                params: { startDate }
            })
        ).data.data,
}