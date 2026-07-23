import { privateBase } from "@/util/api";

/**
 * @brief 폼 관련 GET API
 */

export const getFormApi = {
    // 내가 만든 카테고리 조회
    getCategory: async () =>
        await (
            await privateBase.get(`/v3/api/category`)
        ).data.data,
}