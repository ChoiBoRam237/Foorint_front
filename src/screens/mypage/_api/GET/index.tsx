import { privateBase } from "@/util/api";

/**
 * @brief 마이페이지 관련 GET API
 */

export const getMypageApi = {
    // 특정 유저 정보 조회
    getUser: async (userCode: number) =>
        await (
            await privateBase.get(`/v3/api/user/${userCode}`)
        ).data.data,
}