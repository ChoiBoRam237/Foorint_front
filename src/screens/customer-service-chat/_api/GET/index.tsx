import { privateBase } from "@/util/api";

/**
 * @brief 고객센터 채팅 관련 GET API
 */

export const getCustomerChatApi = {
    // 이전 채팅 내용 조회
    getCustomerMessages: async (customerRoomCode: number) =>
        await (
            await privateBase.get(`/v3/api/customer/messages/${customerRoomCode}`)
        ).data.data,
}