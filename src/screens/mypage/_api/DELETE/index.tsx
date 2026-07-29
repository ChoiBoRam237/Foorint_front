import { privateBase } from "@/util/api";

/**
 * @brief 마이페이지 관련 DELETE API
 */

export const deleteMypageApi = {
    // 계정 탈퇴
    deleteUser: async (userCode: number) =>
        await (
            await privateBase.delete(`/v3/api/user/${userCode}`)
        ).data.data,
}