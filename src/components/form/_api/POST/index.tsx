import { privateBase } from "@/util/api";
import { ICategoryRequest } from "@/types/request/category";

/**
 * @brief 폼 관련 POST API
 */

export const postFormApi = {
    // 카테고리 생성
    postGenerateCategory: async (category: ICategoryRequest) =>
        await (
            await privateBase.post(`/v3/api/category`, category)
        ).data.data,
}