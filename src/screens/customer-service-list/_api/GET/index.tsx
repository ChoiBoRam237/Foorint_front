import { privateBase } from "@/util/api";

/**
 * @brief 고객센터 채팅 리스트 관련 GET API
 */

export const getCustomerListApi = {
    // 고객센터 채팅 목록 조회 (관리자 전용)
    getCustomerRoom: async () =>
        await (
            await privateBase.get(`/v3/api/customer/room`)
        ).data.data,
}