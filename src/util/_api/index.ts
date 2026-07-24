import { AxiosRequestConfig } from "axios";
import { privateBase, publicBase } from "../api";

/**
 * @brief 공통 API
 */

export const commonApi = {
    // 액세스 토큰 재발급
    getRefreshToken: async (config: AxiosRequestConfig<any>) =>
        await (
            await publicBase.get(`/v3/api/token/refresh`, config)
        ).data.data,

    // 내가 만든 카테고리 조회
    getCategory: async (includeAllOption?: boolean) =>
        await (
            await privateBase.get(`/v3/api/category`, {
                params: { includeAllOption }
            })
        ).data.data,

    // 발자국 목록 조회
    getFoorintList: async (categoryCode: number, keyword?: string, year?: number) => 
        await (
            await privateBase.get(`/v3/api/foorint`, {
                params: {
                    year,
                    categoryCode,
                    keyword
                },
            })
        ).data.data,
}